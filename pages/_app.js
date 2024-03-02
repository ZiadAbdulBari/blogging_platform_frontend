import store from "@/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta charset="utf-8" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
