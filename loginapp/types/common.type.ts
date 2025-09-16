// types/common.type.ts
export interface User {
  id: string;
  email: string;
  full_name: string;
  username: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  username: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  followers_count?: number;
  following_count?: number;
  posts_count?: number;
  created_at: string;
  updated_at: string;
}

export interface AuthError {
  message: string;
}