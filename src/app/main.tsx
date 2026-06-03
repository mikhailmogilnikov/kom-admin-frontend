import "./globals.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { queryClient } from "@/shared/api/query-client";
import { ThemeProvider } from "@/shared/lib/hooks/use-theme";

import { App } from "./app";

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
