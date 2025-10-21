import { createGStore } from "create-gstore";
import { useState } from "react";
import { LocalStorageService } from "@/shared/lib/services/local-storage";
import { decodeToken, type Token } from "../lib/decode-token";

export const useSession = createGStore(() => {
  const [token, setToken] = useState<string | null>(
    LocalStorageService.getItem("access_token", "safe") ?? null
  );

  const login = (newToken: Token) => {
    if (!newToken) {
      return;
    }

    setToken(newToken);
    LocalStorageService.setItem("access_token", newToken);
  };

  const logout = () => {
    setToken(null);
    LocalStorageService.removeItem("access_token");
  };

  const session = token ? decodeToken(token) : null;

  return { login, logout, session };
});
