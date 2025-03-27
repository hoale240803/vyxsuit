import type { NextApiRequest, NextApiResponse } from "next";
import { ForexRateService } from "../../services/ForexRateService";

const forexService = new ForexRateService({
  baseUrl: "https://api.forexrateapi.com/v1/latest",
  apiKey: process.env.FOREX_RATE_API_KEY || "",
  timeout: 15000,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const baseCurrency = (req.query.base as string) || "USD";
    // Extract currencies from query parameters or use default popular currencies
    let currencies: string[] = [];
    if (
      typeof req.query.currencies === "string" &&
      req.query.currencies.trim() !== ""
    ) {
      currencies = req.query.currencies.split(",").map((c) => c.trim());
    } else {
      // Default to popular currencies if none specified
      currencies = ["EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR"];
    }

    console.log("Requesting rates with base currency:", baseCurrency);
    console.log("Requesting rates for currencies:", currencies.join(","));
    const rates = await forexService.getExchangeRates(baseCurrency, currencies);

    debugger;
    return res.status(200).json({
      success: true,
      base: rates.base,
      rates: rates.rates,
      lastUpdated: new Date(rates.timestamp * 1000).toISOString(),
    });
  } catch (error) {
    console.error("Currency rates API error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch currency rates",
    });
  }
}
