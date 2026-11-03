import nodemailer from 'nodemailer';
import { env } from '../config/env';

export interface ContactNotificationPayload {
  name: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  subject: string;
  message: string;
  createdAt?: Date;
}

/**
 * Escapes HTML characters to prevent XSS / HTML injection in generated emails.
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Creates and returns a Nodemailer transporter using environment variables.
 */
function createTransporter() {
  if (!env.SMTP_HOST || !env.SMTP_USER) {
    return null;
  }

  const isSecure = env.SMTP_PORT === 465;

  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: isSecure,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
    tls: {
      // Allow self-signed certs if testing or custom mail server
      rejectUnauthorized: env.NODE_ENV === 'production',
    },
  });
}

/**
 * Sends a notification email ONLY to the website owner when a contact form is submitted.
 *
 * Requirements:
 * - to: CONTACT_NOTIFICATION_EMAIL
 * - replyTo: Visitor's email (clicking reply in mailbox replies directly to visitor)
 * - from: MAIL_FROM
 * - Never throws unhandled error so DB record is never compromised.
 */
export async function sendContactNotificationEmail(payload: ContactNotificationPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const recipient = env.CONTACT_NOTIFICATION_EMAIL || env.MAIL_FROM;

  if (!env.SMTP_HOST || !env.SMTP_USER || !recipient) {
    console.warn('[MailService] SMTP is not configured. Notification email skipped.');
    return { success: false, error: 'SMTP not configured' };
  }

  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.warn('[MailService] Could not initialize SMTP transporter.');
      return { success: false, error: 'Transporter creation failed' };
    }

    const safeName = escapeHtml(payload.name);
    const safeEmail = escapeHtml(payload.email);
    const safePhone = payload.phone ? escapeHtml(payload.phone) : 'N/A';
    const safeOrg = payload.organization ? escapeHtml(payload.organization) : 'N/A';
    const safeSubject = escapeHtml(payload.subject || 'Academic Collaboration');
    const safeMessage = escapeHtml(payload.message).replace(/\n/g, '<br />');
    const timestamp = (payload.createdAt || new Date()).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const mailOptions = {
      from: env.MAIL_FROM || env.SMTP_USER,
      to: recipient,
      replyTo: payload.email, // Clicking Reply in your inbox replies directly to the visitor
      subject: `New Contact Inquiry: ${payload.subject || 'Website Inquiry'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
            .header { background: #5c0f1c; color: #ffffff; padding: 24px; text-align: left; }
            .header h2 { margin: 0 0 6px 0; font-size: 20px; font-weight: 600; }
            .header p { margin: 0; font-size: 13px; opacity: 0.9; }
            .content { padding: 24px; }
            .field-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .field-table td { padding: 8px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; vertical-align: top; }
            .field-label { width: 140px; font-weight: 600; color: #64748b; }
            .field-val { color: #0f172a; font-weight: 500; }
            .message-box { background: #f8fafc; border-left: 4px solid #5c0f1c; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #334155; margin-top: 12px; }
            .footer { background: #f1f5f9; padding: 16px 24px; font-size: 12px; color: #64748b; text-align: center; }
            .reply-hint { display: inline-block; margin-top: 16px; background: #eff6ff; color: #1d4ed8; padding: 8px 14px; border-radius: 6px; font-size: 13px; text-decoration: none; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Website Contact Inquiry</h2>
              <p>Submitted via Prof. (Dr.) Manoj Kumar's Official Portfolio</p>
            </div>
            <div class="content">
              <table class="field-table">
                <tr>
                  <td class="field-label">Sender Name:</td>
                  <td class="field-val"><strong>${safeName}</strong></td>
                </tr>
                <tr>
                  <td class="field-label">Email:</td>
                  <td class="field-val"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td class="field-label">Phone:</td>
                  <td class="field-val">${safePhone}</td>
                </tr>
                <tr>
                  <td class="field-label">Organization:</td>
                  <td class="field-val">${safeOrg}</td>
                </tr>
                <tr>
                  <td class="field-label">Subject / Purpose:</td>
                  <td class="field-val">${safeSubject}</td>
                </tr>
                <tr>
                  <td class="field-label">Date & Time:</td>
                  <td class="field-val">${timestamp}</td>
                </tr>
              </table>

              <div style="font-size: 13px; font-weight: 600; color: #475569; margin-top: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Message Content:</div>
              <div class="message-box">
                ${safeMessage}
              </div>

              <div style="margin-top: 20px; text-align: center;">
                <span class="reply-hint">💡 Tip: You can reply directly to this email to respond to ${safeName} (${safeEmail}).</span>
              </div>
            </div>
            <div class="footer">
              This is an automated notification from the Portfolio Website Secretariat API.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[MailService] Notification email sent successfully (MessageId: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('[MailService] Failed to send contact notification email:', error?.message || error);
    // Explicitly return failure status instead of throwing, preserving the caller workflow
    return { success: false, error: error?.message || 'SMTP sending failed' };
  }
}

