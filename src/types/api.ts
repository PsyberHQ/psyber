// Common response types
export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface ValidationError {
  detail: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
}

// User types
export interface UserSignupRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  image_url?: string;
}

export interface WalletData {
  user_id: number;
  address: string;
  type: 'primary' | 'secondary';
  chain: 'ethereum' | 'solana';
  created_at?: string;
  updated_at?: string;
  id?: number;
}

export interface UserData {
  onboardingCompleted: any;
  name: string;
  username: string;
  email: string;
  id: number;
  is_active: boolean;
  image_url?: string;
  level: number;
  xp: number;
  wallet?: WalletData;
}

// Quiz types
export interface QuizOption {
  content: string;
  id: number;
}

export interface QuizQuestion {
  question: string;
  correct_option_id: number;
  id: number;
  options: QuizOption[];
}

export interface LessonContent {
  type: 'text' | 'image';
  heading?: string;
  content: string;
  image?: string;
  id: number;
}

export interface Lesson {
  title: string;
  special_image?: string;
  id: number;
  content: LessonContent[];
}

export interface Task {
  title: string;
  description: string;
  learning_tip: string;
  reward: string;
  type: 'task_with_lesson_quiz';
  id: number;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

// Wallet types
export interface WalletCreateRequest {
  address: string;
  type: 'primary' | 'secondary';
  chain: 'ethereum' | 'solana';
}