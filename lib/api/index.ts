import { Alert } from "react-native";

import {
  AddCommentDto,
  ApiResponse,
  AuthResponse,
  CreatePostDto,
  ForgotPasswordDto,
  LoginDto,
  PlayPostDto,
  Post,
  PostComment,
  RefreshTokenResponse,
  RegisterDto,
  ResetPasswordDto,
  UpdatePostDto,
  UpdateUserDto,
  UploadResponse,
  User,
  UserInsights,
  VerifyOtpDto,
  VerifyResetCodeDto,
} from "@/lib/api/types";
import { clearCache, saveUser, setAuthToken } from "./authToken";
import api from "./config";

class Api {
  static async register(payload: RegisterDto): Promise<AuthResponse> {
    try {
      const res = await api(false).post("/register", payload);
      const responseData = res.data;

      console.log("Registration response:", responseData);

      // Handle actual backend response structure
      if (responseData.user) {
        await saveUser({
          id:
            responseData.user.id?.toString() ||
            responseData.user.ID?.toString(),
          name: responseData.user.name,
          email: responseData.user.email,
          role:
            responseData.user.role ||
            (responseData.user.roles?.length > 0
              ? responseData.user.roles[0]
              : "user"),
        });

        const normalizedResponse = {
          user: {
            id: responseData.user.id || responseData.user.ID,
            ID: responseData.user.id || responseData.user.ID,
            name: responseData.user.name,
            email: responseData.user.email,
            role:
              responseData.user.role ||
              (responseData.user.roles?.length > 0
                ? responseData.user.roles[0]
                : "user"),
            roles: responseData.user.roles || [
              responseData.user.role || "user",
            ],
            metadata: responseData.user.metadata || {},
            created_at:
              responseData.user.created_at || new Date().toISOString(),
            updated_at:
              responseData.user.updated_at || new Date().toISOString(),
            is_active: responseData.user.is_active ?? true,
            email_verified_at: responseData.user.email_verified_at || null,
          },
          message: responseData.message || "Registration successful",
          // No token for registration - user needs to login separately
        };

        return normalizedResponse as AuthResponse;
      } else {
        throw new Error("Invalid response structure from server");
      }
    } catch (error: any) {
      console.log("Registration error details:", error);

      // Handle network errors specifically
      if (error.code === "NETWORK_ERROR" || error.message === "Network Error") {
        throw new Error(
          "Cannot connect to server. Please check your internet connection and try again."
        );
      }

      // Handle server response errors
      if (error.response) {
        const message =
          error.response.data?.error ||
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
        throw new Error(message);
      }

      if (error.request) {
        throw new Error("Cannot reach server. Please check your connection.");
      }

      throw new Error(error.message || "Registration failed");
    }
  }

  static async login(payload: LoginDto): Promise<AuthResponse> {
    try {
      const res = await api(false).post("/login", payload);
      const responseData = res.data;

      console.log("Login response:", responseData);

      // Store tokens and user data
      if (responseData.token && responseData.user) {
        await setAuthToken({
          access: responseData.token,
          refresh: responseData.refresh_token || null,
        });

        await saveUser({
          id:
            responseData.user.id?.toString() ||
            responseData.user.ID?.toString(),
          name: responseData.user.name,
          email: responseData.user.email,
          role:
            responseData.user.role ||
            (responseData.user.roles?.length > 0
              ? responseData.user.roles[0]
              : "user"),
        });

        // Create a normalized response for the frontend
        const normalizedResponse = {
          user: {
            id: responseData.user.id || responseData.user.ID,
            ID: responseData.user.id || responseData.user.ID,
            name: responseData.user.name,
            email: responseData.user.email,
            role:
              responseData.user.role ||
              (responseData.user.roles?.length > 0
                ? responseData.user.roles[0]
                : "user"),
            roles: responseData.user.roles || [
              responseData.user.role || "user",
            ],
            metadata: responseData.user.metadata || {},
            created_at:
              responseData.user.created_at || new Date().toISOString(),
            updated_at:
              responseData.user.updated_at || new Date().toISOString(),
            is_active: responseData.user.is_active ?? true,
            email_verified_at: responseData.user.email_verified_at || null,
          },
          token: responseData.token,
          refresh_token: responseData.refresh_token,
          message: responseData.message || "Login successful",
        };

        return normalizedResponse as AuthResponse;
      } else {
        throw new Error("Invalid response structure from server");
      }
    } catch (error: any) {
      console.log("Login error details:", error);

      // Handle network errors specifically
      if (error.code === "NETWORK_ERROR" || error.message === "Network Error") {
        throw new Error(
          "Cannot connect to server. Please check your internet connection and try again."
        );
      }

      // Handle timeout errors
      if (error.code === "ECONNABORTED") {
        throw new Error("Request timeout. Please try again.");
      }

      // Handle server response errors
      if (error.response) {
        const message =
          error.response.data?.error ||
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
        throw new Error(message);
      }

      // Handle request setup errors
      if (error.request) {
        throw new Error("Cannot reach server. Please check your connection.");
      }

      // Generic error fallback
      throw new Error(error.message || "Login failed");
    }
  }

  static async logout(): Promise<void> {
    try {
      await api(true).post("/logout");
    } catch (error) {
      console.warn("Logout API call failed:", error);
    } finally {
      await clearCache();
    }
  }

  static async getCurrentUser(): Promise<any> {
    try {
      const res = await api(true).get("/users/me");
      const responseData = res.data;
      console.log("Current user data:", responseData);
      if (responseData.data && responseData.success) {
        return responseData.data;
      }

      return responseData;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch user data";
      throw new Error(message);
    }
  }

  static async updateCurrentUser(payload: UpdateUserDto): Promise<User> {
    try {
      const res = await api(true).put("/users/me/edit", payload);
      const responseData = res.data;
      console.log("Updated user data:", responseData);

      // Extract user data from wrapper if it exists
      const userData =
        responseData.data && responseData.success
          ? responseData.data
          : responseData;

      // Update stored user data if successful
      if (userData) {
        await saveUser({
          id: userData.id?.toString(),
          name: userData.name,
          email: userData.email,
          role: userData.role,
        });
      }

      return userData;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to update profile";
      throw new Error(message);
    }
  }

  static async refreshToken(): Promise<RefreshTokenResponse> {
    try {
      const res = await api(true).post("/auth/refresh");
      const responseData = res.data as RefreshTokenResponse;

      // Update stored tokens
      await setAuthToken({
        access: responseData.token,
        refresh: responseData.refresh_token,
      });

      return responseData;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Token refresh failed";
      throw new Error(message);
    }
  }

  // 5. Send Verification Email
  static async sendVerificationEmail(email: string): Promise<ApiResponse> {
    try {
      const res = await api(false).post("/auth/send-verification", { email });
      const responseData = res.data;

      return responseData;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to send verification email";
      throw new Error(message);
    }
  }

  // 6. Verify Account
  static async verifyAccount(payload: VerifyOtpDto): Promise<ApiResponse> {
    try {
      const res = await api(false).post("/auth/verify", payload);
      const responseData = res.data;

      Alert.alert(
        "Success",
        responseData.message || "Account verified successfully!"
      );
      return responseData;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Account verification failed";
      throw new Error(message);
    }
  }

  // 7. Forgot Password
  static async forgotPassword(
    payload: ForgotPasswordDto
  ): Promise<ApiResponse> {
    try {
      const res = await api(false).post("/auth/forgot-password", payload);
      const responseData = res.data;

      Alert.alert(
        "Success",
        responseData.message || "Password reset code sent to your email."
      );
      return responseData;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to send password reset code";
      throw new Error(message);
    }
  }

  // 8. Verify Reset Code
  static async verifyResetCode(
    payload: VerifyResetCodeDto
  ): Promise<ApiResponse> {
    try {
      const res = await api(false).post("/auth/verify-reset-code", payload);
      const responseData = res.data;

      Alert.alert(
        "Success",
        responseData.message || "Reset code verified successfully!"
      );
      return responseData;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Reset code verification failed";
      throw new Error(message);
    }
  }

  // 9. Reset Password
  static async resetPassword(payload: ResetPasswordDto): Promise<ApiResponse> {
    try {
      const res = await api(false).post("/auth/reset-password", payload);
      const responseData = res.data;

      Alert.alert(
        "Success",
        responseData.message || "Password reset successful!"
      );
      return responseData;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Password reset failed";
      throw new Error(message);
    }
  }

  // Post Methods
  static async createPost(payload: CreatePostDto): Promise<Post> {
    try {
      const res = await api(true).post("/posts", payload);
      return res.data;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to create post";
      throw new Error(message);
    }
  }

  static async updatePost(id: number, payload: UpdatePostDto): Promise<Post> {
    try {
      const res = await api(true).put(`/posts/${id}`, payload);
      return res.data;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to update post";
      throw new Error(message);
    }
  }

  static async deletePost(id: number): Promise<ApiResponse> {
    try {
      const res = await api(true).delete(`/posts/${id}`);
      return res.data;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to delete post";
      throw new Error(message);
    }
  }

  static async getPosts(params?: {
    limit?: number;
    offset?: number;
    sort?: string;
    user_id?: number;
    search?: string;
  }): Promise<Post[]> {
    try {
      const res = await api(true).get("/posts", { params });
      return res.data;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch posts";
      throw new Error(message);
    }
  }

  static async getPost(id: number): Promise<Post> {
    try {
      const res = await api(true).get(`/posts/${id}`);
      return res.data;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch post";
      throw new Error(message);
    }
  }

  // Additional Post Endpoints
  static async getTrendingPosts(): Promise<Post[]> {
    try {
      const res = await api(true).get("/posts/trending");
      return res.data;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch trending posts";
      throw new Error(message);
    }
  }

  static async getRecentPosts(): Promise<Post[]> {
    try {
      const res = await api(false).get("/posts/recent");
      return res.data;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch recent posts";
      throw new Error(message);
    }
  }

  static async getPostsByUser(userId: number): Promise<Post[]> {
    try {
      const res = await api(false).get(`/posts/user/${userId}`);
      return res.data;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch user posts";
      throw new Error(message);
    }
  }

  static async getPostStats(id: number): Promise<{
    post_id: number;
    like_count: number;
    comment_count: number;
    play_count: number;
    total_duration_played: number;
    unique_listeners: number;
  }> {
    try {
      const res = await api(false).get(`/posts/${id}/stats`);
      return res.data;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch post stats";
      throw new Error(message);
    }
  }

  static async searchPosts(
    query: string,
    limit = 20,
    offset = 0
  ): Promise<Post[]> {
    try {
      const res = await api(false).get("/search/posts", {
        params: { query, limit, offset },
      });
      return res.data;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to search posts";
      throw new Error(message);
    }
  }

  // Post Interactions
  static async addComment(
    postId: number,
    payload: AddCommentDto
  ): Promise<PostComment> {
    try {
      const res = await api(true).post(`/posts/${postId}/comments`, payload);
      return res.data;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to add comment";
      throw new Error(message);
    }
  }

  static async likePost(postId: number): Promise<ApiResponse> {
    try {
      const res = await api(true).post(`/posts/${postId}/like`);
      return res.data;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to like post";
      throw new Error(message);
    }
  }

  static async playPost(
    postId: number,
    payload: PlayPostDto
  ): Promise<ApiResponse> {
    try {
      const res = await api(true).post(`/posts/${postId}/play`, payload);
      return res.data;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to record play";
      throw new Error(message);
    }
  }

  // User Insights
  static async getUserInsights(): Promise<UserInsights> {
    try {
      const res = await api(true).get("/posts");
      const posts: Post[] = res.data;

      const totalPosts = posts.length;
      const totalPlays = posts.reduce((sum, post) => sum + post.play_count, 0);
      const totalLikes = posts.reduce((sum, post) => sum + post.like_count, 0);
      const totalComments = posts.reduce(
        (sum, post) => sum + post.comment_count,
        0
      );

      const sortedPosts = posts.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      const recentPosts = sortedPosts.slice(0, 5);

      // Get top posts by play count
      const topPosts = [...posts]
        .sort((a, b) => b.play_count - a.play_count)
        .slice(0, 5);

      const averagePlaysPerPost = totalPosts > 0 ? totalPlays / totalPosts : 0;
      const averageLikesPerPost = totalPosts > 0 ? totalLikes / totalPosts : 0;
      const averageCommentsPerPost =
        totalPosts > 0 ? totalComments / totalPosts : 0;

      const monthlyStats = [
        { month: "August", posts: 0, plays: 0, likes: 0, comments: 0 },
        { month: "September", posts: 0, plays: 0, likes: 0, comments: 0 },
        {
          month: "October",
          posts: totalPosts,
          plays: totalPlays,
          likes: totalLikes,
          comments: totalComments,
        },
      ];

      return {
        total_posts: totalPosts,
        total_plays: totalPlays,
        total_likes: totalLikes,
        total_comments: totalComments,
        total_listening_time: posts.reduce(
          (sum, post) => sum + (post.duration || 0),
          0
        ),
        recent_posts: recentPosts,
        top_posts: topPosts,
        engagement_stats: {
          average_plays_per_post: averagePlaysPerPost,
          average_likes_per_post: averageLikesPerPost,
          average_comments_per_post: averageCommentsPerPost,
        },
        monthly_stats: monthlyStats,
      };
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch insights";
      throw new Error(message);
    }
  }

  static async getUserPosts(): Promise<Post[]> {
    try {
      const res = await api(true).get("/users/posts");
      return res.data;
    } catch (error) {
      const err = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch user posts";
      throw new Error(message);
    }
  }

  // Media Upload
  static async uploadFile(
    fileUri: string,
    fileName: string,
    mimeType: string
  ): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: fileUri,
        name: fileName,
        type: mimeType,
      } as any);

      const res = await api(true).post("/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload response:", res.data);
      return res.data;
    } catch (error) {
      console.error("Upload error:", error);
      const err = error as {
        response?: {
          data?: { error?: string; message?: string; status?: string };
        };
      };

      return {
        status: "error",
        message:
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to upload file",
      };
    }
  }
}

export default Api;
