import { CHAIN } from "./constants";

interface UserEmailParams {
  email: string;
  treeCount: number;
  txHash?: string;
  walletAddress?: string;
  heroImageUrl?: string;
}

interface NotificationEmailParams {
  email: string;
  treeCount: number;
  txHash?: string;
  walletAddress?: string;
  consentMarketing: boolean;
}

const shortHash = (s?: string, head = 10, tail = 8) =>
  s ? `${s.slice(0, head)}…${s.slice(-tail)}` : "—";

const shortAddr = (s?: string) =>
  s ? `${s.slice(0, 6)}…${s.slice(-4)}` : "";

/**
 * User-facing confirmation email.
 * Email-safe HTML: tables for layout, inline CSS, web-safe font fallbacks.
 */
export function getUserConfirmationEmail({
  email,
  treeCount,
  txHash,
  walletAddress,
  heroImageUrl,
}: UserEmailParams): string {
  const explorerLink = txHash ? `${CHAIN.explorer}/tx/${txHash}` : "#";
  const treesLabel = treeCount === 1 ? "tree" : "trees";
  const co2 = (treeCount * 22).toLocaleString();
  const area = (treeCount * 4).toLocaleString();

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your tree has been planted</title>
</head>
<body style="margin:0;padding:0;background-color:#F7F4ED;font-family:Helvetica,Arial,sans-serif;color:#1A1F1B;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#F7F4ED;">
  <tr><td align="center" style="padding:24px 12px;">

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background-color:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(27,34,24,0.08);">

      <!-- Brand header -->
      <tr><td align="center" style="padding:32px 32px 20px;border-bottom:1px solid rgba(27,34,24,0.06);">
        <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#1B2218;font-weight:500;letter-spacing:0.5px;">Planet-A-mor</p>
      </td></tr>

      ${heroImageUrl ? `
      <tr><td style="padding:0;">
        <img src="${heroImageUrl}" alt="" width="600" style="display:block;width:100%;max-width:600px;height:auto;">
      </td></tr>
      ` : ""}

      <!-- Body -->
      <tr><td style="padding:32px;">

        <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;color:#1A1F1B;font-weight:500;">
          Your tree has been <em style="color:#4A7C2E;font-style:italic;">planted.</em> 🌱
        </h1>

        <p style="margin:0 0 24px;font-size:14px;line-height:1.7;color:#4A5249;">
          Thank you for planting <strong>${treeCount} ${treesLabel}</strong> in the Peruvian Amazon. Your donation is now on-chain and your raffle entry is active. A Planet-A-mor NFT has been minted to your wallet as proof of your contribution.
        </p>

        <!-- Receipt card -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#F7F4ED;border-radius:12px;">
          <tr><td style="padding:20px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td width="50%" valign="top" style="padding-bottom:14px;">
                  <p style="margin:0 0 4px;font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#8B9189;">Trees</p>
                  <p style="margin:0;font-family:Georgia,serif;font-size:24px;color:#1B2218;font-weight:500;">${treeCount}</p>
                </td>
                <td width="50%" valign="top" style="padding-bottom:14px;">
                  <p style="margin:0 0 4px;font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#8B9189;">Donated</p>
                  <p style="margin:0;font-family:Georgia,serif;font-size:24px;color:#1B2218;font-weight:500;">$${treeCount * 5}</p>
                </td>
              </tr>
              ${txHash ? `
              <tr><td colspan="2" style="padding-top:12px;border-top:1px solid rgba(27,34,24,0.08);">
                <p style="margin:0 0 4px;font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#8B9189;">Transaction</p>
                <a href="${explorerLink}" target="_blank" style="font-family:Menlo,Monaco,'Courier New',monospace;font-size:12px;color:#4A7C2E;text-decoration:none;word-break:break-all;">${shortHash(txHash)} ↗</a>
              </td></tr>
              ` : ""}
              ${walletAddress ? `
              <tr><td colspan="2" style="padding-top:12px;">
                <p style="margin:0 0 4px;font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#8B9189;">Wallet</p>
                <p style="margin:0;font-family:Menlo,Monaco,'Courier New',monospace;font-size:12px;color:#4A5249;">${shortAddr(walletAddress)}</p>
              </td></tr>
              ` : ""}
            </table>
          </td></tr>
        </table>

        <!-- Raffle block -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;background-color:#FDF6E7;border-radius:12px;border-left:3px solid #C49B2A;">
          <tr><td style="padding:20px;">
            <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:17px;color:#1A1F1B;font-weight:500;">🎟️ Your raffle entry is active</p>
            <p style="margin:0;font-size:13px;line-height:1.65;color:#4A5249;">You're entered to win eco prizes plus an 11-day Amazon expedition. Winners announced Q1 2026 via Chainlink VRF.</p>
          </td></tr>
        </table>

        <!-- Impact block -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;background-color:#1B2218;border-radius:12px;">
          <tr><td align="center" style="padding:28px 24px;">
            <p style="margin:0 0 8px;font-size:10px;text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,0.6);">Your Impact</p>
            <p style="margin:0 0 8px;font-family:Georgia,serif;font-size:26px;color:#FFFFFF;font-weight:500;">Your forest is growing.</p>
            <p style="margin:0;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.7);">${co2} kg CO₂ offset · ${area} m² rainforest protected</p>
          </td></tr>
        </table>

        <!-- CTA -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:28px;">
          <tr><td align="center">
            <a href="https://www.planet-a-mor.org" target="_blank" style="display:inline-block;background-color:#1B2218;color:#FFFFFF;text-decoration:none;padding:12px 32px;border-radius:999px;font-size:14px;font-weight:500;">Visit planet-a-mor.org →</a>
          </td></tr>
        </table>

        <p style="margin:28px 0 0;font-size:12px;line-height:1.7;color:#8B9189;text-align:center;">
          Questions? Reply to this email or visit <a href="https://www.planet-a-mor.org" style="color:#4A7C2E;">planet-a-mor.org</a>.
        </p>

      </td></tr>

      <!-- Footer -->
      <tr><td align="center" style="padding:24px 32px;background-color:#FBFBFB;border-top:1px solid rgba(27,34,24,0.05);">
        <p style="margin:0 0 8px;font-family:Menlo,Monaco,'Courier New',monospace;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#8B9189;">B-Corp Certified</p>
        <p style="margin:0 0 4px;font-size:11px;color:#8B9189;">Planet-A-mor · Tournavista, Peru</p>
        <p style="margin:0;font-size:10px;color:rgba(139,145,137,0.7);">You received this email because you planted a tree with us.</p>
      </td></tr>

    </table>

  </td></tr>
</table>
</body>
</html>`;
}

/**
 * Internal notification email sent to the team when a signup happens.
 */
export function getSamiNotificationEmail({
  email,
  treeCount,
  txHash,
  walletAddress,
  consentMarketing,
}: NotificationEmailParams): string {
  const explorerLink = txHash ? `${CHAIN.explorer}/tx/${txHash}` : "";
  const now = new Date().toISOString();

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="font-family:Helvetica,Arial,sans-serif;padding:24px;color:#1A1F1B;max-width:600px;">
  <h2 style="font-family:Georgia,serif;margin:0 0 16px;">🌱 New Planet-A-mor signup</h2>
  <table cellpadding="8" cellspacing="0" border="0" style="border-collapse:collapse;font-size:14px;">
    <tr><td><strong>Email:</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
    <tr><td><strong>Trees:</strong></td><td>${treeCount}</td></tr>
    <tr><td><strong>Donation:</strong></td><td>$${treeCount * 5}</td></tr>
    <tr><td><strong>Wallet:</strong></td><td><code>${walletAddress || "—"}</code></td></tr>
    <tr><td><strong>Tx Hash:</strong></td><td><code style="font-size:11px;">${txHash || "—"}</code></td></tr>
    <tr><td><strong>Marketing consent:</strong></td><td>${consentMarketing ? "✓ Yes" : "✗ No"}</td></tr>
    <tr><td><strong>Time (UTC):</strong></td><td>${now}</td></tr>
  </table>
  ${explorerLink ? `<p style="margin-top:20px;"><a href="${explorerLink}" target="_blank">View transaction on BaseScan ↗</a></p>` : ""}
</body></html>`;
}
