import "./globals.css";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/shared/lib/hooks/use-theme";
import { routeTree } from "../routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  // biome-ignore lint/nursery/useConsistentTypeDefinitions: biome does not support this
  interface Register {
    router: typeof router;
  }
}

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
