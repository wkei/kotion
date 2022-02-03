import Head from "next/head";

export function HeadTitle({ title }: { title?: string }) {
  return (
    <Head>
      <title>KEI{title && ` • ${title}`}</title>
    </Head>
  );
}

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
