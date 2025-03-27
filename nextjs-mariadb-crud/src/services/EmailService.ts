import nodemailer from 'nodemailer';
import { OrderDetails } from '../types/OrderTypes';
import { EmailTemplateService } from './EmailTemplateService';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  cc?: string;
  bcc?: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;
  
  constructor() {
    // Create reusable transporter using Gmail SMTP
    this.transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Use app-specific password
      },
      secure: true,
    });
  }
  
  /**
   * Send an email using the configured transporter
   */
  public async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"VyxSuit" <${process.env.GMAIL_USER}>`,
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        subject: options.subject,
        html: options.html,
      };
      
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
  
  /**
   * Send order confirmation email to customer
   */
  public async sendOrderConfirmation(orderDetails: OrderDetails): Promise<boolean> {
    const { customer, order } = orderDetails;
    
    const emailHtml = EmailTemplateService.generateOrderConfirmationTemplate(orderDetails);
    
    return this.sendEmail({
      to: customer.Email,
      subject: `Order Confirmation: ${order.SalesOrderNumber}`,
      html: emailHtml,
      bcc: process.env.ORDER_NOTIFICATIONS_EMAIL, // Optional: BCC for internal records
    });
  }
}