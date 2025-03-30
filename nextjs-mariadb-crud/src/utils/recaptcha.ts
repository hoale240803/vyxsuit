// src/utils/recaptcha.ts
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler } from "@/utils/withErrorHandler";
/**
 * Verifies a Google reCAPTCHA token with Google's verification API
 * 
 * @param token The reCAPTCHA token from client-side
 * @param remoteIp Optional IP address of the user
 * @returns Object containing success status and optional error message
 */
export async function verifyRecaptcha(token: string, remoteIp?: string): Promise<{
  success: boolean;
  score?: number;
  error?: string;
}> {
  if (!token) {
    return { success: false, error: 'Missing reCAPTCHA token' };
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not configured');
      return { success: false, error: 'reCAPTCHA is not properly configured' };
    }

    const params = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    if (remoteIp) {
      params.append('remoteip', remoteIp);
    }

    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify', 
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const { success, score, 'error-codes': errorCodes } = response.data;

    if (!success) {
      return { 
        success: false, 
        error: errorCodes ? errorCodes.join(', ') : 'reCAPTCHA verification failed' 
      };
    }

    // For reCAPTCHA v3, check score (typically threshold is 0.5)
    if (score !== undefined && score < 0.5) {
      return { success: false, score, error: 'reCAPTCHA score too low' };
    }

    return { success: true, score };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, error: 'Internal server error during reCAPTCHA verification' };
  }
}

// Define handler type for better type safety
type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void | NextApiResponse>;

/**
 * Middleware-style function for API routes to verify reCAPTCHA
 * Integrates with the existing withErrorHandler
 */
export function withRecaptcha(handler: ApiHandler): ApiHandler {
  // Create a recaptcha-checking middleware
  const recaptchaMiddleware = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const token = req.body?.recaptchaToken as string;
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
    
    const verification = await verifyRecaptcha(token, ip);
    
    if (!verification.success) {
      res.status(400).json({ 
        success: false, 
        error: verification.error || 'CAPTCHA verification failed'
      });
      return;
    }
    
    // Proceed to the actual API handler if verification was successful
    await handler(req, res);
  };
  
  // Wrap with error handler for consistent error handling
  return withErrorHandler(recaptchaMiddleware);
}