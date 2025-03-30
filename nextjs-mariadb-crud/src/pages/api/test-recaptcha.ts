// src/pages/api/test-recaptcha.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { withRecaptcha } from "@/utils/recaptcha";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  debugger;
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  debugger;
  // If we get here, reCAPTCHA has been verified successfully
  return res.status(200).json({
    success: true,
    message: "reCAPTCHA verification successful",
    data: {
      receivedAt: new Date().toISOString(),
      clientIp:
        (req.headers["x-forwarded-for"] as string) ||
        req.socket.remoteAddress ||
        "unknown",
    },
  });
}

export default withRecaptcha(handler);
