import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { subject, message, visitorEmail } = await request.json();

    if (!subject || !message || !visitorEmail) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const recipient = process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || "[EMAIL_ADDRESS]";
    const senderEmail = process.env.SENDER_EMAIL || "[EMAIL_ADDRESS]";
    const senderName = process.env.SENDER_NAME || "Ravi Karmakar Portfolio";

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey as string,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: senderName,
          email: senderEmail,
        },
        to: [
          {
            email: recipient,
            name: "Ravi Karmakar",
          },
        ],
        replyTo: {
          email: visitorEmail,
        },
        subject: `New Portfolio Message: ${subject}`,
        htmlContent: `
          <html>
            <body style="margin: 0; padding: 0;">
              <div style="font-family: sans-serif; padding: 40px; color: #333; background: #fafafa;">
                <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; border: 1px solid #eee;">
                  <h2 style="color: #00f0ff; margin-top: 0; font-size: 24px;">New Connection</h2>
                  
                  <div style="margin-bottom: 25px;">
                    <p style="margin: 0; font-size: 14px; color: #888;">From</p>
                    <p style="margin: 4px 0; font-size: 16px; font-weight: bold;">${visitorEmail}</p>
                  </div>

                  <div style="margin-bottom: 25px;">
                    <p style="margin: 0; font-size: 14px; color: #888;">Subject</p>
                    <p style="margin: 4px 0; font-size: 16px;">${subject}</p>
                  </div>
                  
                  <div style="margin-bottom: 25px;">
                    <p style="margin: 0; font-size: 14px; color: #888;">Message</p>
                    <div style="margin-top: 8px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #00f0ff; white-space: pre-wrap; line-height: 1.6;">${message}</div>
                  </div>

                  <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
                  
                  <p style="font-size: 12px; color: #aaa; text-align: center;">
                    Tips: You can click "Reply" in your email app to talk directly to this person.
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Brevo API Error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to send email", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, messageId: data.messageId });
  } catch (error) {
    console.error("Email API Route Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
