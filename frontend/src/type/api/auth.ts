export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  token_type: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}