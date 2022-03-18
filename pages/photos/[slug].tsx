import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next'

import { getNotionStaticPaths, getNotionObjectProperty } from '../../utils'
import { getPageBlocksBySlug } from '../../api/notion'
import config from '../../config'
import HeadTitle from '../../components/head-title'
import ImgBlock from '../../components/img-block'
import Article from '../../components/article'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getNotionStaticPaths(config.notion.photos)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { page, blocks } = await getPageBlocksBySlug(
    config.notion.photos,
    context.params?.slug as string
  )

  return {
    props: { page, blocks },
  }
}

const Album: NextPage = ({
  page,
  blocks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = getNotionObjectProperty(page, 'Name')

  return (
    <>
      <HeadTitle title={title} />
      <header className="mb-12">
        <h2 className="text-center text-2xl font-bold">{title}</h2>
      </header>
      <Article>
        {blocks.map((block: any) => (
          <ImgBlock block={block} key={block.id} />
        ))}
      </Article>
    </>
  )
}

export default Album
