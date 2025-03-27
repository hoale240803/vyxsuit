// src/services/notifications/NotificationServiceFactory.ts
import { EmailProviderInterface } from './EmailProviderInterface';
import { GmailProvider } from './GmailProvider';

export type EmailProviderType = 'gmail' | 'sendgrid';

export class NotificationServiceFactory {
  private static emailProviders: Map<EmailProviderType, EmailProviderInterface> = new Map();
  
  /**
   * Get an email provider instance
   */
  public static getEmailProvider(type: EmailProviderType = 'gmail'): EmailProviderInterface {
    // Check if we already have an instance
    if (!this.emailProviders.has(type)) {
      // Create new instance based on type
      switch (type) {
        case 'sendgrid':
        // TODO: Implement SendGridProvider
        break;
        case 'gmail':
        default:
          this.emailProviders.set(type, new GmailProvider());
      }
    }
    
    // Return the provider instance
    return this.emailProviders.get(type)!;
  }
  
  /**
   * Get the default email provider based on configuration
   */
  public static getDefaultEmailProvider(): EmailProviderInterface {
    const defaultProvider = (process.env.DEFAULT_EMAIL_PROVIDER as EmailProviderType) || 'gmail';
    return this.getEmailProvider(defaultProvider);
  }
}