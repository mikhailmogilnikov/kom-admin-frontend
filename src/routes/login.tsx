import { createFileRoute, Link } from "@tanstack/react-router";

const LoginComponent = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="w-full max-w-md space-y-6 rounded-lg bg-card p-8 shadow-lg">
      <div className="space-y-2">
        <h1 className="text-center font-bold text-2xl">Вход в систему</h1>
        <p className="text-center text-muted-foreground text-sm">
          Введите свои учетные данные для доступа
        </p>
      </div>
      <form className="space-y-4">
        <div>
          <label className="mb-1 block font-medium text-sm" htmlFor="email">
            Email
          </label>
          <input
            className="w-full rounded-md border px-3 py-2"
            id="email"
            placeholder="example@email.com"
            type="email"
          />
        </div>
        <div>
          <label className="mb-1 block font-medium text-sm" htmlFor="password">
            Пароль
          </label>
          <input
            className="w-full rounded-md border px-3 py-2"
            id="password"
            placeholder="••••••••"
            type="password"
          />
        </div>
        <button
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          type="submit"
        >
          Войти
        </button>
      </form>
      <div className="text-center">
        <Link
          className="text-muted-foreground text-sm hover:text-foreground"
          to="/"
        >
          ← Вернуться на главную
        </Link>
      </div>
    </div>
  </div>
);

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});
