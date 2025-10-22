import TypedLocalStore from "typed-local-store";

import type { Token } from "@/features/auth/lib/decode-token";
import type { Theme } from "../hooks/use-theme.tsx";

export type LocalStorageSchema = {
  theme: Theme;
  access_token: Token;
};

export const LocalStorage = new TypedLocalStore<LocalStorageSchema>({
  storage: "localStorage",
});
