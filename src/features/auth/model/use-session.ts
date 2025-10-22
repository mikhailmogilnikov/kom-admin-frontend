import { createGStore } from "create-gstore";
import { useState } from "react";
import { LocalStorage } from "@/shared/lib/services/local-storage";
import { decodeToken, type Token } from "../lib/decode-token";

export const useSession = createGStore(() => {
  const [token, setToken] = useState<string | null>(
    LocalStorage.getItem("access_token", "safe") ?? null
  );

  const login = (newToken: Token) => {
    if (!newToken) {
      return;
    }

    setToken(newToken);
    LocalStorage.setItem("access_token", newToken);
  };

  const logout = () => {
    setToken(null);
    LocalStorage.removeItem("access_token");
  };

  const session = token ? decodeToken(token) : null;

  return { login, logout, session };
});
