const DEFAULT_API_BASE_URL = "https://keysmoscowapi.ru/api";
const TRAILING_SLASH_PATTERN = /\/$/;

export const getApiBaseUrl = (): string => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;
  return baseUrl.replace(TRAILING_SLASH_PATTERN, "");
};
