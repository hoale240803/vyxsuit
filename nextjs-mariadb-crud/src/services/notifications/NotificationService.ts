// src/services/NotificationService.ts
import { EmailOptions } from '../notifications/EmailProviderInterface';
import { NotificationServiceFactory } from './NotificationServiceFactory';

export class NotificationService {
  /**
   * Send a test email to verify configuration
   */
  public static async sendTestEmail(recipientEmail: string = 'orders@vyxlyfstyles.shop'): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a2a3a;">Hello World!</h1>
        <p>This is a test email from the VyxSuit Order System.</p>
        <p>If you're receiving this, your email configuration is working correctly.</p>
        <p>Provider: ${NotificationServiceFactory.getDefaultEmailProvider().getProviderName()}</p>
        <p>Time sent: ${new Date().toLocaleString()}</p>
      </div>
    `;
    
    const options: EmailOptions = {
      to: recipientEmail,
      subject: 'VyxSuit Email Test',
      html: html
    };
    
    return await NotificationServiceFactory.getDefaultEmailProvider().sendEmail(options);
  }
}