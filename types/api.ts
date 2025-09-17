export interface HoroscopeResponse {
  sign: string;
  date: string;
  message: string;
}

export interface TarotResponse {
  name: string;
  arcana?: string | null;
  orientation: 'upright' | 'reversed';
  fortune_telling: string[];
  meanings: string[];
  question: string;
  affirmation: string;
  img_url: string;
}

export interface AstroPersonalResponse {
  summary: string;
  chart: Record<string, any>;
  advice: Record<string, any>;
}

export interface TarotPersonalResponse {
  spread: any[];
  overview: string;
}

export interface ProviderSearchResponse {
  source: string;
  results: string[];
}

export interface AuthRequestPayload {
  method: 'email' | 'telegram';
  email?: string;
  tg_username?: string;
}

export interface AuthVerifyPayload {
  method: 'email' | 'telegram';
  contact: string;
  code: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: 'bearer';
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}