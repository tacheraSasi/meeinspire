export const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080/api/v1/";

export const DEFAULT_THEME = "light";
export const SUPPORTED_THEMES = ["light", "dark"] as const;

export const ENABLE_DYNAMIC_THEME = false;
