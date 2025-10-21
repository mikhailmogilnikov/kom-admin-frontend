import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/features/auth/ui/login-form";

const LoginComponent = () => (
  <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
    <LoginForm />
  </div>
);

export const Route = createFileRoute("/_public/login")({
  component: LoginComponent,
});
