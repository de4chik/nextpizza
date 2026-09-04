"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { errorHandling } from "../api/api";

export const ApiProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            onError: errorHandling,
          },
          mutations: {
            onError: errorHandling,
          },
        },
      }),
  );
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
