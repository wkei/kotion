import Head from "next/head";

export default function HeadTitle({ title }: { title?: string }) {
  return (
    <Head>
      <title>KEI{title && ` • ${title}`}</title>
    </Head>
  );
}
