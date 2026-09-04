import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .min(1, "Email обязателен для заполнения")
    .email("Неверный формат Email адреса")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(1, "Пароль обязателен для заполнения")
    .min(8, "Пароль должен содержать минимум 8 символов")
    .max(32, "Пароль не должен превышать 32 символа"),
});

export const useAuthForm = () => {
  return useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
};
