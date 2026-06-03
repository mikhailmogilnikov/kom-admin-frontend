import { RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";

import { useSession } from "@/features/auth/model/use-session";

import { router } from "./router";

export const App = () => {
  const { session, accessToken } = useSession();

  // biome-ignore lint/correctness/useExhaustiveDependencies: invalidate routes when auth token changes
  useEffect(() => {
    let cancelled = false;

    router.invalidate().finally(() => {
      if (cancelled) {
        return;
      }
    });

    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  return <RouterProvider context={{ session }} router={router} />;
};
