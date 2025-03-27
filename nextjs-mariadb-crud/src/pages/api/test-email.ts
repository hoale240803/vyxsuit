// src/pages/api/test-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NotificationService } from '../../services/notifications/NotificationService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const recipient = req.body.email || 'orders@vyxlyfstyles.shop';
    
    debugger
    const emailSent = await NotificationService.sendTestEmail(recipient);

    if (!emailSent) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send test email' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: `Test email sent to ${recipient}` 
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}