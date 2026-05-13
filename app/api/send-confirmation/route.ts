import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sql } from "@vercel/postgres";
import { getUserConfirmationEmail, getSamiNotificationEmail } from "@/lib/email-templates";
import { IMAGES } from "@/lib/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_FROM = process.env.EMAIL_FROM ?? "noreply@planetamor.dev";
const NOTIFY_TO = process.env.EMAIL_NOTIFICATION_TO ?? "sami@planet-a-mor.org";

interface RequestBody {
  email: string;
  consentMarketing: boolean;
  consentTerms: boolean;
  walletAddress?: string;
  txHash?: string;
  treeCount: number;
}

export async function POST(req: NextRequest) {
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, consentMarketing, consentTerms, walletAddress, txHash, treeCount } = body;

  // Validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }
  if (!consentTerms) {
    return NextResponse.json({ error: "You must accept the Terms & Conditions" }, { status: 400 });
  }
  if (typeof treeCount !== "number" || treeCount < 1) {
    return NextResponse.json({ error: "Invalid tree count" }, { status: 400 });
  }

  // Audit metadata
  const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? null;
  const userAgent = req.headers.get("user-agent") ?? null;

  // 1. Save consent (critical — must succeed)
  try {
    await sql`
      INSERT INTO consents (
        email, wallet_address, tx_hash, tree_count,
        consent_marketing, consent_terms,
        ip_address, user_agent
      )
      VALUES (
        ${email}, ${walletAddress ?? null}, ${txHash ?? null}, ${treeCount},
        ${consentMarketing}, ${consentTerms},
        ${ipAddress}, ${userAgent}
      )
    `;
  } catch (err) {
    console.error("Failed to save consent:", err);
    return NextResponse.json(
      { error: "Failed to record entry. Please try again." },
      { status: 500 }
    );
  }

  // 2. Build email contents
  const heroImageUrl =
    typeof IMAGES.hero === "string" && IMAGES.hero.startsWith("http")
      ? IMAGES.hero
      : undefined;

  const userHtml = getUserConfirmationEmail({
    email,
    treeCount,
    txHash,
    walletAddress,
    heroImageUrl,
  });

  const notifyHtml = getSamiNotificationEmail({
    email,
    treeCount,
    txHash,
    walletAddress,
    consentMarketing,
  });

  // 3. Send both emails in parallel — don't fail the request if these fail
  const results = await Promise.allSettled([
    resend.emails.send({
      from: `Planet-A-mor <${EMAIL_FROM}>`,
      to: email,
      subject: "Your tree has been planted 🌱",
      html: userHtml,
    }),
    resend.emails.send({
      from: `Planet-A-mor Signups <${EMAIL_FROM}>`,
      to: NOTIFY_TO,
      subject: `🌱 New signup: ${email}`,
      html: notifyHtml,
    }),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`${i === 0 ? "User" : "Notification"} email failed:`, r.reason);
    }
  });

  return NextResponse.json({ success: true });
}
