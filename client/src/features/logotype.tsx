import Image from "next/image";
import Link from "next/link";

export const Logotype = () => {
  return (
    <Link href={"/"} className="flex gap-5 items-center">
      <Image src="/logotype.png" alt="logotype" width={35} height={35} />
      <div className="flex flex-col">
        <span className="text-2xl font-black">NEXT PIZZA</span>
        <span className="text-sm text-foreground/50">вкусней уже некуда</span>
      </div>
    </Link>
  );
};
