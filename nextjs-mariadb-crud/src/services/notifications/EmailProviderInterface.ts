// src/services/notifications/EmailProviderInterface.ts
export interface EmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
    from?: string;
    cc?: string | string[];
    bcc?: string | string[];
    attachments?: Array<{
      filename: string;
      path?: string;
      content?: Buffer;
      contentType?: string;
    }>;
  }
  
  export interface EmailProviderInterface {
    sendEmail(options: EmailOptions): Promise<boolean>;
    getProviderName(): string;
  }