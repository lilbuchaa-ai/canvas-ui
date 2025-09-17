import type {
  HoroscopeResponse,
  TarotResponse,
  AstroPersonalResponse,
  TarotPersonalResponse,
  ProviderSearchResponse,
  AuthRequestPayload,
  AuthVerifyPayload,
  AuthResponse,
  ApiError
} from '~/types/api';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    const config = useRuntimeConfig();
    this.baseURL = config.public.apiBase as string;
    
    // Initialize token from localStorage on client-side
    if (process.client) {
      this.token = localStorage.getItem('auth_token');
    }
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  setToken(token: string | null) {
    this.token = token;
    if (process.client) {
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await $fetch<T>(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });
      
      return response;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.message || 'An error occurred',
        code: error.statusCode?.toString(),
        details: error.data,
      };
      throw apiError;
    }
  }

  // HOROSCOPE endpoints
  async getSigns(): Promise<string[]> {
    return this.request<string[]>('/horoscope/signs');
  }

  async getPeriods(): Promise<string[]> {
    return this.request<string[]>('/horoscope/periods');
  }

  async getHoroscope(
    period: string,
    sign: string,
    date?: string
  ): Promise<HoroscopeResponse> {
    const params = date ? `?date=${date}` : '';
    return this.request<HoroscopeResponse>(`/horoscope/${period}/${sign}${params}`);
  }

  // TAROT endpoints
  async getTarotDaily(): Promise<TarotResponse[]> {
    return this.request<TarotResponse[]>('/tarot/daily');
  }

  async drawTarot(count: number): Promise<TarotResponse[]> {
    return this.request<TarotResponse[]>(`/tarot/draw?count=${count}`);
  }

  async postTarotPersonal(payload: any): Promise<TarotPersonalResponse> {
    return this.request<TarotPersonalResponse>('/ai/tarot-personal', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // AI HOROSCOPE endpoints
  async postAstroPersonal(payload: any): Promise<AstroPersonalResponse> {
    return this.request<AstroPersonalResponse>('/ai/horoscope-personal', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // PROVIDER SEARCH endpoints
  async searchProvider(query: string): Promise<ProviderSearchResponse> {
    return this.request<ProviderSearchResponse>(`/provider/search?q=${encodeURIComponent(query)}`);
  }

  // AUTH endpoints
  async requestCode(payload: AuthRequestPayload): Promise<void> {
    await this.request('/auth/request_code', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async verifyCode(payload: AuthVerifyPayload): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/verify_code', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    
    // Store token after successful verification
    this.setToken(response.access_token);
    
    return response;
  }

  logout() {
    this.setToken(null);
  }
}

// Global instance
const apiClient = new ApiClient();

// Composable hooks
export const useApi = () => apiClient;

// Direct export functions for convenience
export const getSigns = () => apiClient.getSigns();
export const getPeriods = () => apiClient.getPeriods();
export const getHoroscope = (period: string, sign: string, date?: string) => 
  apiClient.getHoroscope(period, sign, date);
export const getTarotDaily = () => apiClient.getTarotDaily();
export const drawTarot = (count: number) => apiClient.drawTarot(count);
export const postTarotPersonal = (payload: any) => apiClient.postTarotPersonal(payload);
export const postAstroPersonal = (payload: any) => apiClient.postAstroPersonal(payload);
export const searchProvider = (query: string) => apiClient.searchProvider(query);
export const requestCode = (payload: AuthRequestPayload) => apiClient.requestCode(payload);
export const verifyCode = (payload: AuthVerifyPayload) => apiClient.verifyCode(payload);