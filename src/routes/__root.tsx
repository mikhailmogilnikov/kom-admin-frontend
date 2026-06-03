import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import type { RouterContext } from "@/app/router-context";
import { useSession } from "@/features/auth/model/use-session";

const RootComponent = () => (
  <>
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    await useSession.getState().refreshToken();

    return {
      session: useSession.getState().session,
    };
  },
  component: RootComponent,
});
