import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import "../sass/style.scss";
import "react-toastify/dist/ReactToastify.min.css";

// 1. Crea una nueva instancia de QueryClient
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    // 2. Envuelve tu aplicación con QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
