import fs from "fs";
import path from "path";
import { format } from "date-fns";

class Logger {
    private logDir: string;
    private currentLogFile: string;
    private readonly MAX_DAYS = 30;

    constructor() {
        // For production, use /var/log if available, otherwise fallback to local logs
        this.logDir =
            process.env.NODE_ENV === "production"
                ? "/var/log/nextjs-app" // You might need to adjust this path based on your production setup
                : path.join(process.cwd(), "logs");

        this.ensureLogDirectory();
        this.currentLogFile = this.getLogFileName();
        this.cleanupOldLogs();
    }

    private ensureLogDirectory() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    private getLogFileName(): string {
        const timestamp = format(new Date(), "yyyyMMdd_HHmmss");
        return path.join(this.logDir, `${timestamp}.txt`);
    }

    private cleanupOldLogs() {
        try {
            const files = fs.readdirSync(this.logDir);
            const now = new Date();

            files.forEach((file) => {
                const filePath = path.join(this.logDir, file);
                const stats = fs.statSync(filePath);
                const daysOld =
                    (now.getTime() - stats.mtime.getTime()) /
                    (1000 * 60 * 60 * 24);

                if (daysOld > this.MAX_DAYS) {
                    fs.unlinkSync(filePath);
                }
            });
        } catch (error) {
            logger.error("Error cleaning up old logs:", error);
        }
    }

    private formatMessage(level: string, message: string, meta?: any): string {
        const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
        const metaString = meta ? JSON.stringify(meta) : "";
        return `[${timestamp}] [${level}] ${message} ${metaString}\n`;
    }

    private writeToFile(message: string) {
        try {
            fs.appendFileSync(this.currentLogFile, message);
        } catch (error) {
            logger.error("Error writing to log file:", error);
        }
    }

    info(message: string, meta?: any) {
        const formattedMessage = this.formatMessage("INFO", message, meta);
        this.writeToFile(formattedMessage);
    }

    error(message: string, meta?: any) {
        const formattedMessage = this.formatMessage("ERROR", message, meta);
        this.writeToFile(formattedMessage);
    }

    warn(message: string, meta?: any) {
        const formattedMessage = this.formatMessage("WARN", message, meta);
        this.writeToFile(formattedMessage);
    }

    debug(message: string, meta?: any) {
        const formattedMessage = this.formatMessage("DEBUG", message, meta);
        this.writeToFile(formattedMessage);
    }
}

// Create a singleton instance
const logger = new Logger();
export default logger;
