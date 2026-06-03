import type { TokenPayload } from "@/features/auth/lib/decode-token";

export type RouterContext = {
  session: TokenPayload | null;
};
