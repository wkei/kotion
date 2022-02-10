type SeoProps = {
  title?: string
  desc?: string
  url?: string
  image?: string
  icon?: string
}

export default function SEO({ title, desc, url, image, icon }: SeoProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="shortcut icon" type="image/x-icon" href={icon} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary" />
    </>
  )
}
