// src/services/notifications/providers/GmailProvider.ts
import nodemailer from "nodemailer";
import { EmailOptions, EmailProviderInterface } from "./EmailProviderInterface";
import logger from "@/utils/logger";

export class MailRelayProvider implements EmailProviderInterface {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAILRELAY_HOST,
            port: Number(process.env.MAILRELAY_PORT),
            secure: false,
            tls: {
                rejectUnauthorized: false,
            },
            auth: {
                user: process.env.MAILRELAY_USER,
                pass: process.env.MAILRELAY_PASSWORD,
            },
        });
    }
    getProviderName(): string {
        return "mailRelay";
    }

    public async sendEmail(options: EmailOptions): Promise<boolean> {
        try {
            debugger;
            const info = await this.transporter.sendMail({
                from:
                    options.from ||
                    `"VyxSuit Orders" <${process.env.EMAIL_USER}>`,
                to: options.to,
                cc: options.cc,
                bcc: options.bcc,
                subject: options.subject,
                html: options.html,
                text: options.text,
                attachments: options.attachments,
            });

            console.log(`[GmailProvider] Email sent: ${info.messageId}`);
            return true;
        } catch (error) {
            logger.error("[GmailProvider] Error sending email:", error);
            return false;
        }
    }
}
