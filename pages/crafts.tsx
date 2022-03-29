import type { NextPage, GetStaticProps } from 'next'

import { getBlocks } from '../lib/notion'
import config from '../config'
import Article from '../components/article'
import HeadTitle from '../components/head-title'
import cacheNotionImages, { ImageData } from '../utils/cache-notion-images'

type Props = {
  blocks: any[]
  images: ImageData[]
}

export const getStaticProps: GetStaticProps = async () => {
  const blocks = await getBlocks({ block_id: config.notion.crafts })
  const images = await cacheNotionImages(blocks, 'crafts')
  return {
    props: { blocks, images },
  }
}

const Crafts: NextPage<Props> = ({ blocks, images }) => {
  return (
    <>
      <HeadTitle title="Crafts" />
      <Article blocks={blocks} images={images} />
    </>
  )
}

export default Crafts
