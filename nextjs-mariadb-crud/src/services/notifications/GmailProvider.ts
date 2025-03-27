// src/services/notifications/providers/GmailProvider.ts
import nodemailer from 'nodemailer';
import { EmailOptions, EmailProviderInterface } from './EmailProviderInterface';

export class GmailProvider implements EmailProviderInterface {
  private transporter: nodemailer.Transporter;
  
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      secure: true,
    });
  }
  
  public async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const info = await this.transporter.sendMail({
        from: options.from || `"VyxSuit Orders" <${process.env.EMAIL_USER}>`,
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        subject: options.subject,
        html: options.html,
        text: options.text,
        attachments: options.attachments
      });
      
      console.log(`[GmailProvider] Email sent: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error('[GmailProvider] Error sending email:', error);
      return false;
    }
  }
  
  public getProviderName(): string {
    return 'Gmail';
  }
}