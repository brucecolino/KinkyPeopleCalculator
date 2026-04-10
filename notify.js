// /api/notify.js — Vercel Serverless Function
// Riceve i dati del preventivo e notifica via Email (Resend) + Telegram Bot
// 
// ENV VARS RICHIESTE su Vercel:
//   RESEND_API_KEY     → da https://resend.com (gratis 100 email/giorno)
//   TELEGRAM_BOT_TOKEN → da @BotFather su Telegram
//   TELEGRAM_CHAT_ID   → il tuo chat_id personale (ottienilo con @userinfobot)
//   NOTIFY_EMAIL       → email destinatario (default: kinkypeopletribute@gmail.com)

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const {
      quoteId, format, venue, city, country, date, distance,
      locationType, service, extras, customer, total, pdfBase64
    } = req.body;

    if (!quoteId || !city) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const customerName = customer?.name || "N/D";
    const customerEmail = customer?.email || "N/D";
    const customerPhone = customer?.phone || "N/D";
    const customerOrg = customer?.org || "";

    // ═══════════════════════════════════════════
    // TELEGRAM NOTIFICATION
    // ═══════════════════════════════════════════
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      const tgMessage =
        `🎵 *NUOVO PREVENTIVO*\n\n` +
        `📋 *${quoteId}*\n\n` +
        `👤 ${customerName}${customerOrg ? " — " + customerOrg : ""}\n` +
        `📧 ${customerEmail}\n` +
        `📱 ${customerPhone}\n\n` +
        `🎶 ${format}\n` +
        `📍 ${city} — ${country}\n` +
        `📅 ${date}\n` +
        `🏢 ${venue}\n` +
        `🚗 ${distance} (${locationType})\n` +
        `🔊 ${service}\n` +
        `➕ ${extras || "Nessuno"}\n\n` +
        `💰 *TOTALE: ${total}*`;

      try {
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: tgMessage,
            parse_mode: "Markdown"
          })
        });

        // Se c'è il PDF, invialo come documento su Telegram
        if (pdfBase64) {
          const base64Data = pdfBase64.replace(/^data:application\/pdf;[^,]+,/, "");
          const pdfBuffer = Buffer.from(base64Data, "base64");

          const formData = new FormData();
          formData.append("chat_id", telegramChatId);
          formData.append("caption", `📄 ${quoteId} — ${customerName} — ${city}`);
          formData.append("document", new Blob([pdfBuffer], { type: "application/pdf" }), `${quoteId}.pdf`);

          await fetch(`https://api.telegram.org/bot${telegramToken}/sendDocument`, {
            method: "POST",
            body: formData
          });
        }
      } catch (tgErr) {
        console.error("Telegram error:", tgErr.message);
      }
    }

    // ═══════════════════════════════════════════
    // EMAIL NOTIFICATION (Resend)
    // ═══════════════════════════════════════════
    const resendKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.NOTIFY_EMAIL || "kinkypeopletribute@gmail.com";

    if (resendKey) {
      const htmlBody = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#111;color:#f5f5f5;padding:24px;border-radius:8px;">
          <div style="border-bottom:3px solid #D4A843;padding-bottom:16px;margin-bottom:20px;">
            <h1 style="color:#D4A843;margin:0;font-size:22px;">🎵 Nuovo Preventivo</h1>
            <p style="color:#888;margin:4px 0 0;font-size:14px;">${quoteId}</p>
          </div>
          
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#D4A843;width:120px;vertical-align:top;">Cliente</td><td style="padding:8px 0;">${customerName}${customerOrg ? " — " + customerOrg : ""}</td></tr>
            <tr><td style="padding:8px 0;color:#D4A843;">Email</td><td style="padding:8px 0;">${customerEmail}</td></tr>
            <tr><td style="padding:8px 0;color:#D4A843;">Telefono</td><td style="padding:8px 0;">${customerPhone}</td></tr>
            <tr><td colspan="2" style="border-top:1px solid #333;padding:12px 0 4px;"></td></tr>
            <tr><td style="padding:8px 0;color:#D4A843;">Formato</td><td style="padding:8px 0;">${format}</td></tr>
            <tr><td style="padding:8px 0;color:#D4A843;">Venue</td><td style="padding:8px 0;">${venue}</td></tr>
            <tr><td style="padding:8px 0;color:#D4A843;">Location</td><td style="padding:8px 0;">${city} — ${country}</td></tr>
            <tr><td style="padding:8px 0;color:#D4A843;">Data</td><td style="padding:8px 0;">${date}</td></tr>
            <tr><td style="padding:8px 0;color:#D4A843;">Distanza</td><td style="padding:8px 0;">${distance} (${locationType})</td></tr>
            <tr><td style="padding:8px 0;color:#D4A843;">Service</td><td style="padding:8px 0;">${service}</td></tr>
            <tr><td style="padding:8px 0;color:#D4A843;">Extra</td><td style="padding:8px 0;">${extras || "Nessuno"}</td></tr>
          </table>
          
          <div style="margin-top:20px;padding:16px;background:#D4A843;border-radius:6px;text-align:center;">
            <span style="font-size:13px;color:#111;font-weight:600;">TOTALE (IVA INCL.)</span><br/>
            <span style="font-size:24px;color:#111;font-weight:700;">${total}</span>
          </div>
          
          <p style="margin-top:20px;font-size:11px;color:#666;text-align:center;">
            Generato automaticamente da KPCost Calculator
          </p>
        </div>
      `;

      // Prepara attachment PDF se disponibile
      const attachments = [];
      if (pdfBase64) {
        const base64Data = pdfBase64.replace(/^data:application\/pdf;[^,]+,/, "");
        attachments.push({
          filename: `${quoteId}.pdf`,
          content: base64Data
        });
      }

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendKey}`
          },
          body: JSON.stringify({
            from: "KPCost <onboarding@resend.dev>",
            to: [notifyEmail],
            subject: `🎵 Preventivo ${quoteId} — ${customerName} — ${city}`,
            html: htmlBody,
            attachments
          })
        });
      } catch (emailErr) {
        console.error("Resend error:", emailErr.message);
      }
    }

    return res.status(200).json({ ok: true, quoteId });
  } catch (err) {
    console.error("Notify API error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
