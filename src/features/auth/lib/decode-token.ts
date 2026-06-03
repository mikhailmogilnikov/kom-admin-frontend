import { jwtDecode } from "jwt-decode";

import type { components } from "@/shared/api/schema";

export type TokenPayload = {
  sub: string | number;
  exp: number;
  role?: components["schemas"]["EnumUserRoles"];
};

export type Token = string;

export function decodeToken(token: string) {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
}
