import { publicFetchClient } from "@/shared/api/public-fetch";
import { LocalStorage } from "@/shared/lib/services/local-storage";

import type { LoginPayload } from "../model/session.type";

let refreshTokenPromise: Promise<LoginPayload | null> | null = null;

export const requestTokenRefresh = (): Promise<LoginPayload | null> => {
  const refreshToken = LocalStorage.getItem("refresh_token", "safe");

  if (!refreshToken) {
    return Promise.resolve(null);
  }

  refreshTokenPromise ??= publicFetchClient
    .POST("/user/refresh", {
      body: { refresh_token: refreshToken },
    })
    .then((response) => {
      if (response.error || !response.data) {
        return null;
      }

      return response.data;
    })
    .finally(() => {
      refreshTokenPromise = null;
    });

  return refreshTokenPromise;
};
