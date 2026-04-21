import { NextRequest, NextResponse } from "next/server";

/**
 * Frame action handler for Farcaster/Warpcast integration.
 * Processes frame button interactions and returns updated frame state.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Extract frame data
    const { untrustedData } = body;
    const buttonIndex = untrustedData?.buttonIndex;
    const fid = untrustedData?.fid;

    // Frame response — redirect to app or show info
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://your-domain.com";

    return NextResponse.json(
      {
        frames: [
          {
            version: "vNext",
            image: `${appUrl}/api/frame/image`,
            buttons: [
              {
                label: "🌳 Plant a Tree for $5",
                action: "link",
                target: appUrl,
              },
              {
                label: "Learn More",
                action: "link",
                target: "https://www.planet-a-mor.org",
              },
            ],
            postUrl: `${appUrl}/api/frame`,
          },
        ],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Frame action error:", error);
    return NextResponse.json({ error: "Invalid frame action" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    name: "Planet-A-mor",
    description: "Plant real trees in the Peruvian Amazon. Built on Base.",
    version: "vNext",
  });
}
