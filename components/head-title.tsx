import Head from 'next/head'

export default function HeadTitle({
  title,
  desc,
}: {
  title?: string
  desc?: string
}) {
  const fullTitle = `KEI${title ? ` • ${title}` : ''}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta property="og:title" content={fullTitle} />
    </Head>
  )
}
