import * as nodemailer from 'nodemailer';
import { emailConfig } from './config';

const transporter = nodemailer.createTransport({
  // host: 'smtp.googlemail.com',
  // port: emailConfig.port,
  // secure: emailConfig.secure,
  service: emailConfig.service,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.password,
  },
});

export async function sendMail(recipient: string, subject: string, htmlContent: string) {
  return await transporter.sendMail({
    from: `"${emailConfig.senderName}" ${emailConfig.senderEmail}`,
    to: recipient,
    subject: subject,
    html: htmlContent,
  });
}
