import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export interface ApiServiceConfig {
  baseUrl: string;
  apiKey: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export class ThirdPartyApiService {
  protected baseUrl: string;
  protected apiKey: string;
  protected defaultHeaders: Record<string, string>;
  protected timeout: number;

  constructor(config: ApiServiceConfig) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
    this.defaultHeaders = config.headers || {};
    this.timeout = config.timeout || 10000; // Default 10s timeout
  }

  protected async request<T, D = unknown>(
    method: string,
    endpoint: string,
    data?: D,
    additionalConfig?: Partial<AxiosRequestConfig>
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: AxiosRequestConfig = {
      method,
      url,
      headers: { ...this.defaultHeaders },
      timeout: this.timeout,
      ...additionalConfig
    };

    if (data && (method.toLowerCase() === 'post' || method.toLowerCase() === 'put' || method.toLowerCase() === 'patch')) {
      config.data = data;
    } else if (data) {
      config.params = data;
    }

    try {
      const response: AxiosResponse<T> = await axios(config);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('API request failed:', {
        url,
        status: axiosError.response?.status,
        data: axiosError.response?.data
      });
      
      throw this.handleApiError(axiosError);
    }
  }

  protected handleApiError(error: AxiosError): Error {
    if (error.response) {
      // The request was made and the server responded with a status code
      return new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      // The request was made but no response was received
      return new Error('API Error: No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      return new Error(`API Error: ${error.message}`);
    }
  }

  // Helper methods
  protected async get<T>(endpoint: string, params?: Record<string, unknown>, config?: Partial<AxiosRequestConfig>): Promise<T> {
    return this.request<T>('GET', endpoint, params, config);
  }

  protected async post<T, D = unknown>(endpoint: string, data?: D, config?: Partial<AxiosRequestConfig>): Promise<T> {
    return this.request<T>('POST', endpoint, data, config);
  }
}