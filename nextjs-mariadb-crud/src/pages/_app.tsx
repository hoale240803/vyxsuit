import Layout from "@/layouts/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import "../i18n";

import "@/styles/global.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
