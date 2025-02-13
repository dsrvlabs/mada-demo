import { Provider as JotaiProvider } from "jotai";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store/store";
import "../../public/shared/styles/globals.css";
import "./styles.css";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <JotaiProvider>
      <ReduxProvider store={store}>
        <Head>
          <title>DSRV Payments</title>
        </Head>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </ReduxProvider>
    </JotaiProvider>
  );
};
export default CustomApp;
