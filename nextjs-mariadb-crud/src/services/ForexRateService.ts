import { ThirdPartyApiService, ApiServiceConfig } from './ThirdPartyApiService';
import NodeCache from 'node-cache';
import fs from 'fs';
import path from 'path';

// Define types for the API response
interface ForexRateResponse {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
}

export class ForexRateService extends ThirdPartyApiService {
  private cache: NodeCache;
  private cacheFile: string;
  private cacheDuration: number = 24 * 60 * 60; // 24 hours in seconds
  
  constructor(config: ApiServiceConfig) {
    super(config);
    this.cache = new NodeCache({ stdTTL: this.cacheDuration });
    this.cacheFile = path.join(process.cwd(), 'cache', 'forex_rates.json');
    this.initializeCache();
  }

  private initializeCache(): void {
    try {
      // Create cache directory if it doesn't exist
      const cacheDir = path.dirname(this.cacheFile);
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }

      // Load cache from file if it exists
      if (fs.existsSync(this.cacheFile)) {
        const cacheData = JSON.parse(fs.readFileSync(this.cacheFile, 'utf8'));
        const now = Date.now() / 1000;
        
        // Check if cache is still valid (less than 24 hours old)
        if (cacheData.timestamp && (now - cacheData.timestamp) < this.cacheDuration) {
          this.cache.set('rates', cacheData);
          console.log('Loaded forex rates from cache file');
        } else {
          console.log('Cache file exists but is expired');
        }
      }
    } catch (error) {
      console.error('Error initializing cache:', error);
    }
  }

  private saveToCache(data: ForexRateResponse): void {
    try {
      // Save to memory cache
      this.cache.set('rates', data);
      
      // Save to file cache
      fs.writeFileSync(this.cacheFile, JSON.stringify(data));
      console.log('Saved forex rates to cache');
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }

  public async getExchangeRates(baseCurrency: string = 'USD'): Promise<ForexRateResponse> {
    // Try to get from cache first
    const cachedRates = this.cache.get<ForexRateResponse>('rates');
    if (cachedRates && cachedRates.base === baseCurrency) {
      console.log('Using cached forex rates');
      return cachedRates;
    }

    // If not in cache or different base currency, fetch from API
    try {
      console.log('Fetching forex rates from API');
      const endpoint = `/v1/rates?base=${baseCurrency}`;
      const queryParams = {
        apikey: this.apiKey
      };

      const response = await this.get<ForexRateResponse>(endpoint, queryParams);
      
      // Add current timestamp if not provided by API
      if (!response.timestamp) {
        response.timestamp = Math.floor(Date.now() / 1000);
      }
      
      // Save to cache
      this.saveToCache(response);
      
      return response;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      
      // If API call fails but we have cached data (even if expired), use it
      if (cachedRates) {
        console.log('Using expired cached rates due to API error');
        return cachedRates;
      }
      
      throw error;
    }
  }
}