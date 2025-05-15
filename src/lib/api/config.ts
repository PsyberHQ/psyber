/**
 * API configuration for the Psyber backend
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://psyber.onrender.com';

export enum Endpoints {
  // Auth endpoints
  SIGNUP = '/api/auth/signup',
  LOGIN = '/api/auth/login',
  LOGOUT = '/api/auth/logout',
  REFRESH_TOKEN = '/api/auth/refresh-token',
  GOOGLE_LOGIN = '/api/auth/login-with-google',
  GOOGLE_CALLBACK = '/api/auth/google/callback',
  RESET_PASSWORD = '/api/auth/reset-password',
  SEND_OTP = '/api/auth/send-otp',
  VERIFY_OTP = '/api/auth/verify-otp',
  
  // User endpoints
  UPLOAD_FILE = '/api/user/file-upload',
  ME = '/api/user/me',
  UPDATE_ME = '/api/user/update/me',
  DELETE_ACCOUNT = '/api/user/delete-accnt',
  
  // Quiz endpoints
  INIT_QUIZ = '/api/init-quiz',
  FULL_TASKS = '/api/full-tasks',
  
  // Wallet endpoints
  CREATE_WALLET = '/api/wallet/create-wallet',
  CURRENT_WALLET = '/api/wallet/current-wallet',
}