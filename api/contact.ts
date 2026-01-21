/**
 * Vercel Serverless Function for Contact Form
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Inline schema to avoid import path issues
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(1, 'Message is required').max(2000),
});

// Email configuration
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.office365.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'noreply@areebb.com';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'a.abuhajer@areebb.com';

// Simple rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; message?: string } {
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 5;
  const now = Date.now();
  
  const entry = rateLimitStore.get(ip);
  
  if (!entry || entry.resetTime < now) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }
  
  entry.count++;
  
  if (entry.count > maxRequests) {
    return { 
      allowed: false, 
      message: 'Too many submissions. Please try again later.' 
    };
  }
  
  return { allowed: true };
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

// Fetch logo and create CID attachment (works in Vercel)
async function getLogoAttachment(): Promise<{ filename: string; content: Buffer; cid: string; contentType: string } | null> {
  try {
    const logoUrl = 'https://www.areebb.com/assets/Areeb_White-green_1768388319561-BwOiwix_.png';
    const response = await fetch(logoUrl);
    
    if (!response.ok) {
      console.error('Failed to fetch logo:', response.statusText);
      return null;
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    return {
      filename: 'areeb-logo.png',
      content: buffer,
      cid: 'areeb-logo', // Content-ID for inline images (industry standard)
      contentType: 'image/png',
    };
  } catch (error) {
    console.error('Error fetching logo:', error);
    return null;
  }
}

// Send notification email to company
async function sendNotification(data: { name: string; email: string; phone?: string; subject: string; message: string }) {
  if (!SMTP_USER || !SMTP_PASS) {
    console.log('SMTP not configured');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    tls: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: false,
    },
  });

  // Fetch and attach logo as CID (embedded image - won't be blocked)
  const logoAttachment = await getLogoAttachment();
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
        /* Optimized for email clients - using system fonts instead of external import */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
          line-height: 1.6; 
          color: #e2e8f0; 
          background: #0f172a;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .email-wrapper {
          background: #0f172a;
          padding: 20px;
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
    to: CONTACT_EMAIL,
    replyTo: data.email,
    subject: `New Contact Form Submission - ${data.subject}`,
    text,
    html,
  };

  // Add logo as attachment if available (embedded image - won't be blocked)
  if (logoAttachment) {
    mailOptions.attachments = [logoAttachment];
  }

  await transporter.sendMail(mailOptions);
}

// Send confirmation email to user
async function sendConfirmation(data: { name: string; email: string; subject: string }) {
  if (!SMTP_USER || !SMTP_PASS) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    tls: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: false,
    },
  });

  // Fetch and attach logo as CID (embedded image - won't be blocked)
  const logoAttachment = await getLogoAttachment();
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
        /* Optimized for email clients - using system fonts instead of external import */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
          line-height: 1.6; 
          color: #e2e8f0; 
          background: #0f172a;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .email-wrapper {
          background: #0f172a;
          padding: 20px;
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

  // Add logo as attachment if available (embedded image - won't be blocked)
  if (logoAttachment) {
    mailOptions.attachments = [logoAttachment];
  }

  await transporter.sendMail(mailOptions);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    // Rate limiting
    const clientIp = req.headers['x-forwarded-for']?.toString().split(',')[0] || 
                     req.headers['x-real-ip']?.toString() || 
                     'unknown';
    const rateLimitCheck = checkRateLimit(clientIp);
    if (!rateLimitCheck.allowed) {
      return res.status(429).json({
        success: false,
        message: rateLimitCheck.message || 'Too many requests',
      });
    }

    // Validate request body
    const validationResult = contactFormSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      return res.status(400).json({
        success: false,
        message: firstError?.message || 'Invalid form data',
      });
    }

    const formData = validationResult.data;

    // Send emails in parallel (non-blocking if one fails)
    await Promise.all([
      sendNotification(formData),
      sendConfirmation(formData).catch((err: unknown) => {
        console.error('Confirmation email failed:', err);
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Thank you for your message. We'll get back to you soon!",
    });

  } catch (error: unknown) {
    console.error('Contact form error:', error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to send message. Please try again later.';
    
    return res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
}
