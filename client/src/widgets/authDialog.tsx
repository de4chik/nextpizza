import { useAuthForm } from "@/root/validation/auth.validation";
import { useLoginUser, useRegisterUser } from "@/shared/api/auth.api";
import { Button } from "@/shared/ui/button";
import { DialogCloseButton } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import Link from "next/link";
import { useState } from "react";

export const AuthDialog = () => {
  const [isReg, setIsReg] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useAuthForm();
  const { mutate: registerUser } = useRegisterUser();
  const { mutate: loginUser } = useLoginUser();
  return (
    <div className="p-4 rounded-2xl bg-muted-foreground relative">
      <header className="flex gap-20 items-start">
        <div className="flex flex-col">
          <span className="text-2xl font-black">Укажите почту и пароль</span>
          <span className="text-foreground/50">
            Что бы {isReg ? "Зарегестрироваться" : "войти в профиль"}
          </span>
        </div>
        <span
          className="text-sm text-foreground/50 underline cursor-pointer"
          onClick={() => setIsReg((prev) => !prev)}
        >
          {isReg ? "Войти" : "Зарегестрироваться"}
        </span>
      </header>
      <form
        id="auth"
        className="flex flex-col gap-2 my-5"
        onSubmit={handleSubmit((data) => {
          if (!isReg) {
            loginUser(data);
          } else {
            registerUser(data);
          }
        })}
      >
        <Input
          type="email"
          placeholder="Электронная почта"
          {...register("email")}
          errorMessage={errors.email?.message}
        />
        <Input
          type="password"
          placeholder="Пароль"
          {...register("password")}
          errorMessage={errors.password?.message}
        />
      </form>
      <span className="text-sm max-w-72 block text-center mx-auto mb-5 text-foreground/50">
        Продолжая, вы соглашаетесь с условиями наших{" "}
        <Link href={"/"} className="underline">
          юридических документов
        </Link>
      </span>
      <Button form="auth" className="w-full">
        {isReg ? "Зарегестрироваться" : "Войти"}
      </Button>
      <DialogCloseButton className="absolute bottom-full left-full" />
    </div>
  );
};
