"use client";
import { useGetProfileUser, useLogoutUser } from "@/shared/api/auth.api";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Input } from "@/shared/ui/input";

const Profile = () => {
  const { data: user } = useGetProfileUser();
  const { mutate: logout } = useLogoutUser();
  return (
    <Container>
      <span className="text-4xl font-black">Личные данные</span>
      <div className="max-w-1/3 py-10 flex flex-col gap-10">
        <Input
          title="Имя"
          placeholder={user?.name ? user.name : "Добавьте имя"}
        />

        <Input
          title="Номер телефона"
          placeholder={user?.phone ? user.phone : "Добавьте телефон"}
        />

        <Input
          disabled
          title="Электронная почта"
          placeholder={user?.email ? user.email : "Добавьте телефон"}
        />
        <Button>Сохранить изменения</Button>
      </div>
      <div className="flex justify-between items-center">
        <Button className="bg-foreground/10" onClick={() => logout()}>
          Выйти
        </Button>
        <Button className="bg-red-500/50 text-red-300">Удалить аккаунт</Button>
      </div>
    </Container>
  );
};

export default Profile;
