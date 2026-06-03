import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { email, object, string } from "zod";

import { fetchQuery } from "@/shared/api/fetch";
import { publicFetchQuery } from "@/shared/api/public-fetch";

import type { LoginPayload } from "./session.type";
import { useSession } from "./use-session";

const MIN_EMAIL_LENGTH = 1;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 50;

const formSchema = object({
  email: email("Введите корректный email адрес").min(
    MIN_EMAIL_LENGTH,
    "Email обязателен для заполнения"
  ),

  password: string()
    .min(MIN_PASSWORD_LENGTH, "Пароль должен содержать минимум 6 символов")
    .max(MAX_PASSWORD_LENGTH, "Пароль не должен превышать 50 символов"),
});

export const useLogin = () => {
  const { login, clearSession } = useSession();
  const navigate = useNavigate();

  const loginMutation = publicFetchQuery.useMutation(
    "post",
    "/user/email/login"
  );
  const meMutation = fetchQuery.useMutation("get", "/user/me");

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setAuthError(null);

      let tokens: LoginPayload;

      try {
        tokens = await loginMutation.mutateAsync({
          body: {
            email: value.email,
            password: value.password,
          },
        });
      } catch {
        setAuthError("Неверный email или пароль");
        return;
      }

      login(tokens);

      try {
        const me = await meMutation.mutateAsync({});

        if (me.role !== "admin") {
          clearSession();
          setAuthError("Доступ только для администраторов");
          return;
        }
      } catch {
        clearSession();
        setAuthError("Не удалось проверить доступ");
        return;
      }

      navigate({ to: "/" });
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isSubmitting = form.state.isSubmitting || loginMutation.isPending;

  return {
    form,
    showPassword,
    togglePasswordVisibility,
    authError,
    isSubmitting,
  };
};
