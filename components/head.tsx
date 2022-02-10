import Script from 'next/script'
import HeadTitle from './head-title'
import SEO from './seo'

export default function Head() {
  return (
    <>
      <SEO
        title="Kei"
        desc="Kei's corner"
        url="https://keiw.xyz"
        image="https://github.com/wkei.png"
        icon="https://github.com/wkei.png?size=48"
      />
      <HeadTitle />
      <Script
        async
        defer
        data-website-id="b2d3d034-3a16-46dc-8365-ba80b1676203"
        src="https://umami-beta-tawny.vercel.app/umami.js"
      />
    </>
  )
}
