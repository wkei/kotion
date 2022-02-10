import NextHead from 'next/head'
import HeadTitle from './head-title'
import SEO from './seo'

export default function Head() {
  return (
    <>
      <HeadTitle />
      <NextHead>
        <SEO
          title="Kei"
          desc="Kei's corner"
          url="https://keiw.xyz"
          image="https://github.com/wkei.png"
          icon="https://github.com/wkei.png?size=48"
        />
      </NextHead>
    </>
  )
}
