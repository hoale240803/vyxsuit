import { ThirdPartyApiService, ApiServiceConfig } from './ThirdPartyApiService';
import NodeCache from 'node-cache';
import fs from 'fs';
import path from 'path';

/**
 * Interface for the ForexRate API response
 */
interface ForexRateResponse {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
}

/**
 * Configuration options for the ForexRateService
 */
interface ForexRateServiceOptions {
  /** Duration in seconds to cache forex rates (defaults to 24 hours) */
  cacheDuration?: number;
  /** Path to store persistent cache files (defaults to ./cache) */
  cachePath?: string;
  /** Whether to use persistent file caching (defaults to true) */
  usePersistentCache?: boolean;
  /** Number of retry attempts for failed API requests */
  maxRetries?: number;
}

/**
 * Service for fetching and caching foreign exchange rates
 */
export class ForexRateService extends ThirdPartyApiService {
  private cache: NodeCache;
  private cacheFile: string;
  private cacheDuration: number;
  private usePersistentCache: boolean;
  private maxRetries: number;
  
  /**
   * Create a new ForexRateService instance
   */
  constructor(
    config: ApiServiceConfig, 
    options: ForexRateServiceOptions = {}
  ) {
    super(config);
    
    this.cacheDuration = options.cacheDuration ?? 24 * 60 * 60; // 24 hours in seconds
    this.usePersistentCache = options.usePersistentCache ?? true;
    this.maxRetries = options.maxRetries ?? 1;
    
    this.cache = new NodeCache({ 
      stdTTL: this.cacheDuration,
      checkperiod: Math.min(this.cacheDuration / 10, 600) // Check expiration every 10% of cache duration or max 10 minutes
    });
    
    const cachePath = options.cachePath ?? path.join(process.cwd(), 'cache');
    this.cacheFile = path.join(cachePath, 'forex_rates.json');
    
    console.log('[ForexRateService] Initialized with:', {
      baseUrl: config.baseUrl,
      apiKeyProvided: !!config.apiKey,
      cacheDuration: `${this.cacheDuration}s (${Math.round(this.cacheDuration/3600)}h)`,
      persistentCache: this.usePersistentCache
    });
    
    if (this.usePersistentCache) {
      this.initializeCache();
    }
  }

  /**
   * Initialize cache from filesystem if available
   */
  private initializeCache(): void {
    try {
      // Create cache directory if it doesn't exist
      const cacheDir = path.dirname(this.cacheFile);
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
        console.log('[ForexRateService] Created cache directory:', cacheDir);
      }

      // Load cache from file if it exists
      if (fs.existsSync(this.cacheFile)) {
        const fileData = fs.readFileSync(this.cacheFile, 'utf8');
        const cacheData = JSON.parse(fileData);
        
        if (!cacheData || typeof cacheData !== 'object') {
          console.warn('[ForexRateService] Invalid cache file format, ignoring');
          return;
        }
        
        // Load each cached entry by currency
        let loadedCount = 0;
        
        for (const [key, data] of Object.entries(cacheData)) {
          const now = Math.floor(Date.now() / 1000);
          const entry = data as ForexRateResponse;
          
          // Only load if valid and not expired
          if (entry && entry.base && entry.rates && entry.timestamp && 
              (now - entry.timestamp) < this.cacheDuration) {
            this.cache.set(key, entry);
            loadedCount++;
          }
        }
        
        console.log(`[ForexRateService] Loaded ${loadedCount} currency rates from cache file`);
      } else {
        console.log('[ForexRateService] No cache file found, will create on first API call');
      }
    } catch (error) {
      console.error('[ForexRateService] Error initializing cache:', error);
    }
  }

  /**
   * Generate a cache key for the given parameters
   */
  private getCacheKey(baseCurrency: string, currencies: string[]): string {
    // Sort currencies to ensure consistent cache keys regardless of order
    const sortedCurrencies = [...currencies].sort().join(',');
    return `${baseCurrency}:${sortedCurrencies}`;
  }

  /**
   * Save forex rate data to both memory and file cache
   */
  private saveToCache(key: string, data: ForexRateResponse): void {
    try {
      // Save to memory cache
      this.cache.set(key, data);
      
      // Save to file cache if enabled
      if (this.usePersistentCache) {
        // Read existing cache file or create empty object
        let existingCache: Record<string, ForexRateResponse> = {};
        
        if (fs.existsSync(this.cacheFile)) {
          try {
            existingCache = JSON.parse(fs.readFileSync(this.cacheFile, 'utf8'));
          } catch (error) {
            console.error('[ForexRateService] Error parsing existing cache file:', error);
            console.warn('[ForexRateService] Could not parse existing cache file, creating new one');
          }
        }
        
        // Update with new data
        existingCache[key] = data;
        
        // Write back to file
        fs.writeFileSync(this.cacheFile, JSON.stringify(existingCache, null, 2));
        console.log('[ForexRateService] Updated forex rates in cache file');
      }
    } catch (error) {
      console.error('[ForexRateService] Error saving to cache:', error);
    }
  }

  /**
   * Fetch exchange rates for the specified base currency and target currencies
   * 
   * @param baseCurrency - The base currency code (e.g., 'USD')
   * @param currencies - Array of currency codes to fetch rates for
   * @param forceRefresh - Force refresh from API even if cache is valid
   * @returns Promise resolving to exchange rate data
   */
  public async getExchangeRates(
    baseCurrency: string = 'USD',
    currencies: string[] = [],
    forceRefresh: boolean = false
  ): Promise<ForexRateResponse> {
    const cacheKey = this.getCacheKey(baseCurrency, currencies);
    const now = Math.floor(Date.now() / 1000);
    
    // Try to get from cache first unless force refresh is requested
    if (!forceRefresh) {
      const cachedRates = this.cache.get<ForexRateResponse>(cacheKey);
      
      if (cachedRates && (now - cachedRates.timestamp) < this.cacheDuration) {
        console.log('[ForexRateService] Using cached forex rates for', baseCurrency);
        return cachedRates;
      }
      
      if (cachedRates) {
        console.log('[ForexRateService] Cache expired, refreshing data');
      }
    } else {
      console.log('[ForexRateService] Force refresh requested, bypassing cache');
    }

    // If not in cache, expired, or force refresh, fetch from API
    let retries = 0;
    let lastError: Error | null = null;
    
    while (retries <= this.maxRetries) {
      try {
        // Prepare request parameters
        const queryParams: Record<string, string> = {
          api_key: this.apiKey,
          base: baseCurrency
        };
        
        // Add currencies parameter if specified
        if (currencies && currencies.length > 0) {
          queryParams.currencies = currencies.join(',');
        }

        // Log the request (mask API key)
        console.log('[ForexRateService] Making API request:', {
          url: this.baseUrl,
          base: baseCurrency,
          currencies: currencies.join(',') || 'all',
          retry: retries > 0 ? `${retries}/${this.maxRetries}` : 'initial'
        });

        // Make the API request
        const response = await this.get<ForexRateResponse>('', queryParams);
        
        // Validate response
        if (!response || !response.rates || !response.base) {
          throw new Error('Invalid API response format');
        }
        
        // Add current timestamp if not provided by API
        if (!response.timestamp) {
          response.timestamp = now;
        }
        
        // Save to cache
        this.saveToCache(cacheKey, response);
        
        console.log('[ForexRateService] Successfully fetched forex rates:', {
          base: response.base,
          currencies: Object.keys(response.rates).length,
          updated: new Date(response.timestamp * 1000).toISOString()
        });
        
        return response;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        retries++;
        
        if (retries <= this.maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, retries - 1), 8000); // Exponential backoff (max 8s)
          console.warn(`[ForexRateService] Retry ${retries}/${this.maxRetries} after ${delay}ms:`, lastError.message);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    console.error('[ForexRateService] All API attempts failed:', lastError);
    debugger;
    // After all retries failed, try to use expired cache as fallback
    const cachedRates = this.cache.get<ForexRateResponse>(cacheKey);
    if (cachedRates) {
      console.warn('[ForexRateService] Using expired cached rates as fallback');
      return cachedRates;
    }
    
    // If no cached data available, throw the last error
    throw lastError || new Error('Failed to fetch exchange rates after multiple attempts');
  }

  /**
   * Clear all cached forex rates
   */
  public clearCache(): void {
    this.cache.flushAll();
    
    if (this.usePersistentCache && fs.existsSync(this.cacheFile)) {
      fs.unlinkSync(this.cacheFile);
    }
    
    console.log('[ForexRateService] Cache cleared');
  }
}