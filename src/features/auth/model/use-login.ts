import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { email, object, string } from "zod";
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
  const { login } = useSession();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: () => {
      // TODO: REMOVE MOCK TOKEN
      login(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.j9agH1qsjVlohO10oie8Wv37y-v68PCprfqB3YTEInM"
      );
      navigate({ to: "/" });
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    form,
    showPassword,
    togglePasswordVisibility,
  };
};
