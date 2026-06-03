import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import type { TokenPayload } from "@/features/auth/lib/decode-token";
import { Header } from "@/features/header/ui/header";

const PrivateLayoutComponent = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);

const isAdminSession = (session: TokenPayload | null): boolean => {
  if (!session) {
    return false;
  }

  if (!session.role) {
    return true;
  }

  return session.role === "admin";
};

export const Route = createFileRoute("/_private")({
  beforeLoad: ({ context: { session }, location }) => {
    if (!isAdminSession(session)) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: PrivateLayoutComponent,
});
