import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailService } from '../../../../services/EmailService';
import { getOrderDetails } from '../../../../services/OrderService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const orderId = parseInt(req.query.id as string);
    if (isNaN(orderId)) {
      return res.status(400).json({ success: false, error: 'Invalid order ID' });
    }

    // Get complete order details
    const orderDetails = await getOrderDetails(orderId);
    if (!orderDetails) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    // Initialize email service
    const emailService = new EmailService();
    
    // Send confirmation email
    const emailSent = await emailService.sendOrderConfirmation(orderDetails);
    
    if (!emailSent) {
      return res.status(500).json({ success: false, error: 'Failed to send confirmation email' });
    }

    return res.status(200).json({ success: true, message: 'Order confirmation email sent successfully' });
  } catch (error) {
    console.error('Error sending order confirmation:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}