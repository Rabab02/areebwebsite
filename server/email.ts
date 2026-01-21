import nodemailer from 'nodemailer';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Email configuration
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.office365.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'noreply@areebb.com';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'info@areebb.com';

// OAuth2 configuration (optional, for Microsoft 365)
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID || '';
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET || '';
const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN || '';
const OAUTH_TENANT_ID = process.env.OAUTH_TENANT_ID || 'common';

// Create transporter (supports basic auth and OAuth2)
let transporter: nodemailer.Transporter | null = null;

if (SMTP_USER) {
  // Check if using OAuth2 (Modern Auth) or basic auth
  if (OAUTH_CLIENT_ID && OAUTH_CLIENT_SECRET && OAUTH_REFRESH_TOKEN) {
    // OAuth2 configuration for Microsoft 365
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false, // STARTTLS
      auth: {
        type: 'OAuth2',
        user: SMTP_USER,
        clientId: OAUTH_CLIENT_ID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN,
        accessUrl: `https://login.microsoftonline.com/${OAUTH_TENANT_ID}/oauth2/v2.0/token`,
      },
      tls: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      },
    });
  } else if (SMTP_PASS) {
    // Basic authentication (fallback)
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false, // STARTTLS
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      },
    });
  } else {
    console.warn('SMTP credentials not configured. Email sending will be disabled.');
  }
} else {
  console.warn('SMTP credentials not configured. Email sending will be disabled.');
}

// Get logo as attachment for better email client support
function getLogoAttachment() {
  try {
    // Try dist folder first (production), then attached_assets (development)
    let logoPath = join(process.cwd(), 'dist', 'public', 'assets', 'Areeb_White-green_1768388319561-BwOiwix_.png');
    if (!existsSync(logoPath)) {
      // Fallback to source file in attached_assets
      logoPath = join(process.cwd(), 'attached_assets', 'Areeb_White-green_1768388319561.png');
    }
    const logoBuffer = readFileSync(logoPath);
    return {
      filename: 'areeb-logo.png',
      content: logoBuffer,
      cid: 'areeb-logo',
      contentType: 'image/png',
    };
  } catch (error) {
    console.error('Error reading logo file:', error);
    return null;
  }
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function sendContactNotification(data: ContactFormData): Promise<void> {
  if (!transporter) {
    console.log('Email not sent - SMTP not configured. Form data:', data);
    return;
  }
  const logoAttachment = getLogoAttachment();
  const logoHtml = logoAttachment 
    ? `<img src="cid:areeb-logo" alt="Areeb Logo" style="max-width: 150px; height: auto; margin: 0 auto 16px; display: block;" />`
    : '';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body { 
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
          line-height: 1.6; 
          color: #e2e8f0; 
          background: #0f172a;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .email-wrapper {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          padding: 40px 20px;
          min-height: 100vh;
        }
        .container { 
          max-width: 640px; 
          margin: 0 auto; 
          background: rgba(30, 41, 59, 0.8);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(132, 204, 22, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .content { 
          background: rgba(15, 23, 42, 0.4);
          padding: 40px 32px;
        }
        .email-header {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .sender-avatar {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(132, 204, 22, 0.3), rgba(132, 204, 22, 0.15));
          border: 2px solid rgba(132, 204, 22, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }
        .sender-info {
          flex: 1;
          padding-left: 8px;
        }
        .sender-name {
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .sender-email {
          color: #84cc22;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 8px;
        }
        .sender-email:hover {
          color: #a3d636;
          text-shadow: 0 0 8px rgba(132, 204, 22, 0.4);
        }
        .submission-number {
          color: #94a3b8;
          font-size: 13px;
          font-weight: 500;
          margin-top: 4px;
        }
        .email-subject {
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .email-body {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 28px;
          margin-top: 24px;
          border-left: 3px solid rgba(132, 204, 22, 0.5);
        }
        .message-text {
          color: #e2e8f0;
          line-height: 1.8;
          font-size: 16px;
          white-space: pre-wrap;
        }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(132, 204, 22, 0.3), transparent);
          margin: 32px 0;
        }
        .footer { 
          padding: 32px;
          background: rgba(15, 23, 42, 0.5);
          border-top: 1px solid rgba(132, 204, 22, 0.15);
          text-align: center;
        }
        .footer-text {
          font-size: 12px; 
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .timestamp {
          color: #64748b;
          font-size: 11px;
          font-weight: 500;
        }
        @media only screen and (max-width: 600px) {
          .email-wrapper {
            padding: 20px 10px;
          }
          .container {
            border-radius: 16px;
          }
          .content {
            padding: 24px 20px;
          }
          .email-header {
            gap: 12px;
            margin-bottom: 24px;
            padding-bottom: 20px;
          }
          .sender-avatar {
            width: 48px;
            height: 48px;
            font-size: 20px;
          }
          .sender-name {
            font-size: 18px;
          }
          .email-subject {
            font-size: 16px;
            margin-top: 12px;
            padding-top: 12px;
          }
          .email-body {
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="container">
          <div class="content">
            <div class="email-header">
              <div class="sender-avatar">👤</div>
              <div class="sender-info">
                <div class="sender-name">${escapeHtml(data.name)}</div>
                <a href="mailto:${escapeHtml(data.email)}" class="sender-email">${escapeHtml(data.email)}</a>
                ${data.phone ? `<div class="submission-number">Phone: ${escapeHtml(data.phone)}</div>` : ''}
                <div class="email-subject">${escapeHtml(data.subject)}</div>
              </div>
            </div>
            
            <div class="email-body">
              <div class="message-text">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            ${logoHtml}
            <p class="footer-text">This message was sent from the Areeb website contact form.</p>
            <div class="timestamp">Submitted at: ${new Date().toLocaleString()}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Subject: ${data.subject}

From: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}

Message:
${data.message}

---
This message was sent from the Areeb website contact form.
Submitted at: ${new Date().toLocaleString()}
  `;

  const mailOptions: any = {
    from: `"Areeb" <${SMTP_FROM}>`,
    to: CONTACT_EMAIL, // Notification email - will receive form submissions
    replyTo: data.email, // Reply-to address set to user's email
    subject: `New Contact Form Submission - ${data.subject}`,
    text,
    html,
  };

  // Add logo as attachment if available (for better email client support)
  if (logoAttachment) {
    mailOptions.attachments = [logoAttachment];
  }

  await transporter.sendMail(mailOptions);
}

export async function sendContactConfirmation(data: ContactFormData): Promise<void> {
  if (!transporter) {
    console.log('Email not sent - SMTP not configured. Form data:', data);
    return;
  }
  const logoAttachment = getLogoAttachment();
  const logoHtml = logoAttachment 
    ? `<img src="cid:areeb-logo" alt="Areeb Logo" style="max-width: 150px; height: auto; margin: 0 auto 16px; display: block;" />`
    : '';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body { 
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
          line-height: 1.6; 
          color: #e2e8f0; 
          background: #0f172a;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .email-wrapper {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          padding: 40px 20px;
          min-height: 100vh;
        }
        .container { 
          max-width: 640px; 
          margin: 0 auto; 
          background: rgba(30, 41, 59, 0.8);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(132, 204, 22, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .header { 
          background: linear-gradient(135deg, rgba(132, 204, 22, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%);
          padding: 40px 32px 32px;
          text-align: center;
          position: relative;
          border-bottom: 1px solid rgba(132, 204, 22, 0.2);
        }
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(132, 204, 22, 0.5), transparent);
        }
        .header h2 {
          color: #84cc22;
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .content { 
          background: rgba(15, 23, 42, 0.4);
          padding: 40px 32px;
        }
        .greeting {
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          line-height: 1.6;
        }
        .message-text {
          color: #cbd5e1;
          line-height: 1.8;
          font-size: 16px;
          margin: 0 0 32px 0;
        }
        .signature { 
          color: #ffffff;
          font-size: 16px;
          line-height: 1.8;
          margin-top: 32px;
        }
        .signature strong {
          color: #84cc22;
          font-size: 18px;
          font-weight: 700;
          display: block;
          margin-top: 8px;
        }
        .footer { 
          padding: 32px;
          background: rgba(15, 23, 42, 0.5);
          border-top: 1px solid rgba(132, 204, 22, 0.15);
          text-align: center;
        }
        .footer-text {
          font-size: 12px; 
          color: #94a3b8;
          line-height: 1.6;
          margin: 0;
        }
        @media only screen and (max-width: 600px) {
          .email-wrapper {
            padding: 20px 10px;
          }
          .container {
            border-radius: 16px;
          }
          .header {
            padding: 32px 24px 24px;
          }
          .content {
            padding: 24px 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="container">
          <div class="header">
            <h2>Confirmation Message</h2>
          </div>
          <div class="content">
            <p class="greeting">Dear ${escapeHtml(data.name)},</p>
            
            <p class="message-text">Thank you for contacting Areeb. We have received your message and will get back to you as soon as possible.</p>
            
            <div class="signature">
              Best Regards,<br>
              <strong>Areeb Company</strong>
            </div>
          </div>
          <div class="footer">
            ${logoHtml}
            <p class="footer-text">This is an automated confirmation email. Please do not reply to this message.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Dear ${data.name},

Thank you for contacting Areeb. We have received your message and will get back to you as soon as possible.

Best Regards,
Areeb Company

---
This is an automated confirmation email. Please do not reply to this message.
  `;

  const mailOptions: any = {
    from: `"Areeb" <${SMTP_FROM}>`,
    to: data.email,
    subject: `Thank you for contacting Areeb - ${data.subject}`,
    text,
    html,
  };

  // Add logo as attachment if available (for better email client support)
  if (logoAttachment) {
    mailOptions.attachments = [logoAttachment];
  }

  await transporter.sendMail(mailOptions);
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
