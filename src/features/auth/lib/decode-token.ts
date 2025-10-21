import { jwtDecode } from "jwt-decode";

export type TokenPayload = {
  sub: number;
  exp: number;
};

export type Token = string;

export function decodeToken(token: string) {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
}
