export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface VerifyOtpDto {
  email: string;
  otp: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface VerifyResetCodeDto {
  email: string;
  otp: string;
}

export interface ResetPasswordDto {
  email: string;
  otp: string;
  new_password: string;
}

export interface UpdateUserDto {
  name?: string;
  display_name?: string;
  email?: string;
  metadata?: {
    username?: string;
    location?: string;
    website?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface UserMetadata {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  username?: string;
  location?: string;
  website?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  total_listens: number;
  total_likes: number;
  total_uploads: number;
  last_device?: string;
  last_ip?: string;
  last_location?: string;
  extra?: Record<string, any>;
}

export interface Role {
  id: number;
  name: string;
  is_active: boolean;
}

export interface User {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  display_name?: string;
  email: string;
  is_active: boolean;
  last_login?: string;
  roles?: Role[];
  role: string;
  metadata: UserMetadata;
}

export interface AuthResponse {
  message: string;
  user: User;
  token?: string;
  refresh_token?: string;
  metadata?: any;
}

export interface RefreshTokenResponse {
  token: string;
  refresh_token: string;
  refresh_token_expires_at: string;
}

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Post-related types
export interface Tag {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  type: string;
  text?: string;
  audio_url?: string;
  duration?: number;
  visibility: string;
  like_count: number;
  comment_count: number;
  play_count: number;
  user: User;
  tags?: Tag[];
}

export interface PostComment {
  id: number;
  created_at: string;
  post_id: number;
  user_id: number;
  text: string;
  post: Post;
  user: User;
}

export interface PostLike {
  id: number;
  created_at: string;
  post_id: number;
  user_id: number;
  post: Post;
  user: User;
}

export interface PostPlay {
  id: number;
  created_at: string;
  post_id: number;
  user_id: number;
  duration: number;
  post: Post;
  user: User;
}

// DTOs for creating/updating posts
export interface CreatePostDto {
  user_id: number; // Required: ID of the user creating the post
  type?: string; // Optional: "audio" or "text" (defaults to "audio")
  text?: string; // Optional: Post description/content
  audio_url?: string; // Optional: URL to audio file (for audio posts)
  duration?: number; // Optional: Audio duration in seconds (float)
  visibility?: string; // Optional: "public" or "private" (defaults to "public")
}

export interface UpdatePostDto {
  type?: string;
  text?: string;
  audio_url?: string;
  duration?: number;
  visibility?: string;
}

export interface AddCommentDto {
  text: string;
}

export interface PlayPostDto {
  duration: number;
}

// Analytics/Insights types
export interface UserInsights {
  total_posts: number;
  total_plays: number;
  total_likes: number;
  total_comments: number;
  total_listening_time: number;
  recent_posts: Post[];
  top_posts: Post[];
  engagement_stats: {
    average_plays_per_post: number;
    average_likes_per_post: number;
    average_comments_per_post: number;
  };
  monthly_stats: {
    month: string;
    posts: number;
    plays: number;
    likes: number;
    comments: number;
  }[];
}

export interface UploadResponse {
  status: "success" | "error";
  url?: string;
  message?: string;
  metadata?: {
    original_name: string;
    file_type: string;
    file_size: number;
    upload_time: string;
  };
}
