import { ApiProvider } from "@/root/providers/api.provicer";
import { Header } from "@/widgets/header";

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ApiProvider>
      <Header />
      {children}
    </ApiProvider>
  );
};

export default RootLayout;
