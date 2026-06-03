import { redirect } from "@tanstack/react-router";
import { createGStore } from "create-gstore";
import { useState } from "react";

import { LocalStorage } from "@/shared/lib/services/local-storage";

import { decodeToken } from "../lib/decode-token";
import { requestTokenRefresh } from "../lib/refresh-tokens";
import type { LoginPayload } from "./session.type";

const SECONDS_IN_MS = 1000;
const TOKEN_EXPIRY_BUFFER_SECONDS = 1;

let refreshTokenPromise: Promise<string | null> | null = null;

const persistTokens = (payload: LoginPayload) => {
  LocalStorage.setItem("access_token", payload.access_token);
  LocalStorage.setItem("refresh_token", payload.refresh_token);
};

const clearTokens = () => {
  LocalStorage.removeItem("access_token");
  LocalStorage.removeItem("refresh_token");
};

export const useSession = createGStore(() => {
  const [token, setToken] = useState<string | null>(
    () => LocalStorage.getItem("access_token", "safe") ?? null
  );

  const login = (payload: LoginPayload) => {
    persistTokens(payload);
    setToken(payload.access_token);
  };

  const clearSession = () => {
    clearTokens();
    setToken(null);
  };

  const logout = () => {
    clearSession();
    throw redirect({ to: "/login" });
  };

  const session = token ? decodeToken(token) : null;

  const refreshToken = async () => {
    if (!token) {
      return null;
    }

    const decoded = decodeToken(token);

    if (!decoded) {
      clearSession();
      return null;
    }

    const isTokenExpired =
      decoded.exp < Date.now() / SECONDS_IN_MS + TOKEN_EXPIRY_BUFFER_SECONDS;

    if (!isTokenExpired) {
      return token;
    }

    refreshTokenPromise ??= requestTokenRefresh()
      .then((tokens) => {
        if (tokens) {
          persistTokens(tokens);
          setToken(tokens.access_token);
          return tokens.access_token;
        }

        clearSession();
        return null;
      })
      .finally(() => {
        refreshTokenPromise = null;
      });

    return await refreshTokenPromise;
  };

  return {
    login,
    logout,
    clearSession,
    session,
    refreshToken,
    accessToken: token,
  };
});
