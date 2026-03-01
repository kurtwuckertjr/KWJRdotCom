import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, subject, message } = req.body ?? {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Name, email, subject, and message are required.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_APP_PASSWORD,
    },
  });

  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const htmlBody = `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${esc(name)}</p>
<p><strong>Email:</strong> ${esc(email)}</p>
<p><strong>Phone:</strong> ${esc(phone || 'Not provided')}</p>
<p><strong>Subject:</strong> ${esc(subject)}</p>
<hr />
<p>${esc(message).replace(/\n/g, '<br />')}</p>
  `.trim();

  try {
    await transporter.sendMail({
      from: `"${name} via kurtwuckertjr.com" <${process.env.SMTP_USER}>`,
      to: 'info@kurtwuckertjr.com',
      replyTo: email,
      subject: `[Contact] ${subject}`,
      html: htmlBody,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('SMTP error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
}
