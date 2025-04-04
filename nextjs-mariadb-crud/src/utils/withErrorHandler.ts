import { NextApiRequest, NextApiResponse } from "next";
import logger from "./logger";

// Hàm Higher-Order Function (HOF) để wrap API handlers
export function withErrorHandler(
    handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await handler(req, res);
        } catch (error) {
            logger.error(`[Global API Error] ${error}`);

            res.status(500).json({
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : "Unknown Error",
            });
        }
    };
}
