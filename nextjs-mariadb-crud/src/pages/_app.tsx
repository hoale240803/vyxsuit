import React, { useEffect } from "react";
import Layout from "@/layouts/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import "../i18n";

import "@/styles/global.scss";
import { SuitBuilderContextProvider } from "@/context/suit-builder/suit-builder.provider";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);
  
  return (
    <SuitBuilderContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SuitBuilderContextProvider>
  );
}
