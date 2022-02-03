import Head from "next/head";
import HeadTitle from "./head-title";

export default function DocumentHead() {
  return (
    <>
      <HeadTitle />
      <Head>
        <meta name="description" content="Kei's corner" />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:url" content="https://keiw.xyz" />
        <meta property="og:title" content="KEI" />
        <meta property="og:description" content="Kei's corner" />
      </Head>
    </>
  );
}
