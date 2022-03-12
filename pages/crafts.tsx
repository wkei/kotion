import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'

import { getBlocks } from '../api/notion'
import config from '../config'
import Article from '../components/article'
import HeadTitle from '../components/head-title'

export const getStaticProps: GetStaticProps = async () => {
  const content = await getBlocks({ block_id: config.notion.crafts })
  return {
    props: { content },
  }
}

const Crafts: NextPage = ({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <HeadTitle title="Crafts" />
      <Article blocks={content} />
    </>
  )
}

export default Crafts
