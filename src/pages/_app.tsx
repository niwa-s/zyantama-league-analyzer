import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { PaifuStoreProvider } from "@/lib/gameInfoProvider";
import { PlayerInfoProvider } from "@/lib/playerInfoProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayerInfoProvider>
      <PaifuStoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PaifuStoreProvider>
    </PlayerInfoProvider>
  );
}

export default MyApp;
