import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Layout from "@/components/layout";
import { PlayerInfoProvider } from "@/lib/playerInfoProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <PlayerInfoProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </PlayerInfoProvider>
    </RecoilRoot>
  );
}

export default MyApp;
