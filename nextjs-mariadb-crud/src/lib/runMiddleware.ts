import type { NextApiRequest, NextApiResponse } from "next";

export const runMiddleware = (
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
};
