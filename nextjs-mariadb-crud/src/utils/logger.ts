import { format } from "date-fns";

class Logger {
    private formatMessage(level: string, message: string, meta?: any): string {
        const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
        const metaString = meta ? JSON.stringify(meta) : "";
        return `[${timestamp}] [${level}] ${message} ${metaString}`;
    }

    private logToConsole(level: string, message: string, meta?: any) {
        const formattedMessage = this.formatMessage(level, message, meta);
        
        switch (level) {
            case "ERROR":
                console.error(formattedMessage);
                break;
            case "WARN":
                console.warn(formattedMessage);
                break;
            case "DEBUG":
                console.debug(formattedMessage);
                break;
            default:
                console.log(formattedMessage);
        }
    }

    info(message: string, meta?: any) {
        this.logToConsole("INFO", message, meta);
    }

    error(message: string, meta?: any) {
        this.logToConsole("ERROR", message, meta);
    }

    warn(message: string, meta?: any) {
        this.logToConsole("WARN", message, meta);
    }

    debug(message: string, meta?: any) {
        this.logToConsole("DEBUG", message, meta);
    }
}

// Create a singleton instance
const logger = new Logger();
export default logger;
