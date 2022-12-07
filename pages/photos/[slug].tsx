import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'

import {
  getPageBlocksBySlug,
  getNotionStaticPaths,
  getNotionObjectProperty,
} from '../../utils/notion'
import config from '../../config'
import HeadTitle from '../../components/head-title'
import { NotionImg } from '../../components/notion-img'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getNotionStaticPaths(config.notion.photos)
  return { paths, fallback: false }
}

type Props = {
  page: any
  blocks: any[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = context.params?.slug as string

  if (!slug) {
    throw new Error('slug is required')
  }

  const { page, blocks } = await getPageBlocksBySlug(config.notion.photos, slug)

  return {
    props: { page, blocks },
  }
}

const Album: NextPage<Props> = ({ page, blocks }) => {
  const title = getNotionObjectProperty(page, 'Name')

  return (
    <>
      <HeadTitle title={title} />
      <header className="mb-12">
        <h2 className="text-center text-2xl font-bold">{title}</h2>
      </header>
      <article className="prose">
        {blocks.map((block) => {
          if (!block?.image) return null
          return (
            <figure className="photo" key={block.id}>
              <NotionImg
                className="relative"
                src={block.image.file.url}
                id={block.id}
              />
              {/* <figcaption></figcaption> */}
            </figure>
          )
        })}
      </article>
    </>
  )
}

export default Album
