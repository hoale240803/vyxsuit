## Overview

The Currency Exchange Rates API provides current foreign exchange rates for various currencies based on a specified base currency.

**Base URL**: `/api/rates`  
**Method**: GET  
**Content Type**: application/json

## Request Parameters

| Parameter    | Type   | Required | Default | Description                                                |
|--------------|--------|----------|---------|------------------------------------------------------------|
| base         | string | No       | USD     | Base currency code (e.g., USD, EUR, GBP)                   |
| currencies   | string | No       | *       | Comma-separated list of currency codes to include in results |

> **Note**: If no currencies are specified, the API will return rates for these popular currencies: EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR.

## Example Requests

### Get exchange rates with default parameters

```
GET /api/rates
```

### Get exchange rates with EUR as base currency

```
GET /api/rates?base=EUR
```

### Get specific currencies with USD as base

```
GET /api/rates?base=USD&currencies=EUR,JPY,GBP
```

## Response Format

### Success Response (200 OK)

```json
{
  "success": true,
  "base": "USD",
  "rates": {
    "EUR": 0.91,
    "GBP": 0.77,
    "JPY": 149.26,
    "CAD": 1.36,
    "AUD": 1.51,
    "CHF": 0.88,
    "CNY": 7.21,
    "INR": 82.93
  },
  "lastUpdated": "2025-03-27T14:30:45.000Z"
}
```

### Error Response (4xx/5xx)

```json
{
  "success": false,
  "error": "Failed to fetch currency rates"
}
```

## Response Fields

| Field       | Type    | Description                                           |
|-------------|---------|-------------------------------------------------------|
| success     | boolean | Whether the request was successful                    |
| base        | string  | The base currency used for the exchange rates         |
| rates       | object  | Key-value pairs of currency codes and exchange rates  |
| lastUpdated | string  | ISO timestamp indicating when rates were last updated |
| error       | string  | Error message (only present in error responses)       |

## Error Codes

| Status Code | Description                                          |
|-------------|------------------------------------------------------|
| 405         | Method not allowed (only GET requests are supported) |
| 500         | Server error when fetching rates from external API   |

## Caching

Exchange rates are cached for 24 hours to minimize external API calls. This means that multiple requests within the same day will likely return the same rates unless the cache is cleared or has expired.

## Rate Limits

This API is subject to the rate limits of the underlying Forex Rate API service. Please use responsibly.

## Example Usage (JavaScript)

```javascript
// Example frontend code to fetch exchange rates
async function fetchExchangeRates(baseCurrency = 'USD', currencies = []) {
  try {
    let url = `/api/rates?base=${baseCurrency}`;
    
    if (currencies.length > 0) {
      url += `&currencies=${currencies.join(',')}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch exchange rates');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
}
