import { AuthButton } from "@/features/authButton";
import { City } from "@/features/city";
import { Logotype } from "@/features/logotype";
import { SwitchLanguage } from "@/features/switchLanguage";
import { NAV_LINKS } from "@/root/constants/nav.constant";
import { Container } from "@/shared/ui/container";
import { TabCategory } from "@/shared/ui/tabs";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="pb-5">
      <div className="border-b border-b-foreground/20 py-2">
        <Container className="flex justify-between items-center">
          <ul className="flex gap-5">
            {NAV_LINKS.map(({ href, title }) => (
              <li key={title} className="hover:text-primary duration-100">
                <Link href={href}>{title}</Link>
              </li>
            ))}
          </ul>
          <SwitchLanguage />
        </Container>
      </div>
      <Container className="py-5 flex justify-between items-center">
        <div className="flex gap-10">
          <Logotype />
          <div className="flex flex-col">
            <span className="font-bold">
              Доставка пиццы <City />
            </span>
            <span>30 мин</span>
          </div>
        </div>
        <AuthButton />
      </Container>
      <Container>
        <TabCategory />
      </Container>
    </header>
  );
};
