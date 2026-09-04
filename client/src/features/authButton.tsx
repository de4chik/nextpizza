"use client";
import { useGetProfileUser } from "@/shared/api/auth.api";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";

import { AuthDialog } from "@/widgets/authDialog";
import { ShoppingCart, UserIcon } from "lucide-react";
import Link from "next/link";

export const AuthButton: React.FC = () => {
  const { data: user } = useGetProfileUser();

  return !user ? (
    <Dialog>
      <DialogTrigger render={<Button className="">Войти</Button>} />
      <DialogContent>
        <AuthDialog />
      </DialogContent>
    </Dialog>
  ) : (
    <div className="flex items-center gap-2">
      <Button>
        <ShoppingCart size={16} />
        Корзина
      </Button>

      <Link href={"profile"}>
        <Button className="bg-foreground/10 p-5">
          <UserIcon size={16} />
        </Button>
      </Link>
    </div>
  );
};
