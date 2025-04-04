// src/services/notifications/NotificationServiceFactory.ts
import { EmailProviderInterface } from "./EmailProviderInterface";
import { GmailProvider } from "./GmailProvider";
import { MailRelayProvider } from "./MailReplayProvider";

export type EmailProviderType = "gmail" | "sendgrid" | "mailrelay";

export class NotificationServiceFactory {
    private static emailProviders: Map<
        EmailProviderType,
        EmailProviderInterface
    > = new Map();

    /**
     * Get an email provider instance
     */
    public static getEmailProvider(
        type: EmailProviderType = "mailrelay"
    ): EmailProviderInterface {
        debugger;
        // Check if we already have an instance
        if (!this.emailProviders.has(type)) {
            // Create new instance based on type
            switch (type) {
                case "sendgrid":
                    // TODO: Implement SendGridProvider
                    break;
                case "mailrelay":
                    this.emailProviders.set(type, new MailRelayProvider());
                    break;
                case "gmail":

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
        const defaultProvider =
            (process.env.DEFAULT_EMAIL_PROVIDER as EmailProviderType) ||
            "mailrelay";
        return this.getEmailProvider(defaultProvider);
    }
}
