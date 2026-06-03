import { createRouter } from "@tanstack/react-router";

import { routeTree } from "@/routeTree.gen";

import type { RouterContext } from "./router-context";

export const router = createRouter({
  routeTree,
  context: {
    session: null,
  } satisfies RouterContext,
});

declare module "@tanstack/react-router" {
  // biome-ignore lint/nursery/useConsistentTypeDefinitions: biome does not support this
  interface Register {
    router: typeof router;
  }
}
