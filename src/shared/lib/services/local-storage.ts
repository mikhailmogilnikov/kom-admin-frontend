import TypedLocalStore from "typed-local-store";

import type { Token } from "@/features/auth/lib/decode-token";

export type LocalStorageSchema = {
  theme: string;
  access_token: Token;
};

export const LocalStorageService = new TypedLocalStore<LocalStorageSchema>({
  storage: "localStorage",
});
