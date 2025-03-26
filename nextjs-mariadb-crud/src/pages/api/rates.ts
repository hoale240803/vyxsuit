import type { NextApiRequest, NextApiResponse } from 'next';
import { ForexRateService } from '../../services/ForexRateService';

const forexService = new ForexRateService({
  baseUrl: 'https://api.forexrateapi.com',
  apiKey: process.env.FOREX_RATE_API_KEY || '',
  timeout: 15000
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const baseCurrency = (req.query.base as string) || 'USD';
    const rates = await forexService.getExchangeRates(baseCurrency);
    
    return res.status(200).json({
      success: true,
      base: rates.base,
      rates: rates.rates,
      lastUpdated: new Date(rates.timestamp * 1000).toISOString()
    });
  } catch (error) {
    console.error('Currency rates API error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch currency rates' 
    });
  }
}