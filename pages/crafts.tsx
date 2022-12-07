import type { NextPage, GetStaticProps } from 'next'

import { getBlocks } from '../utils/notion'
import config from '../config'
import Article from '../components/article'
import HeadTitle from '../components/head-title'

type Props = {
  blocks: any[]
}

export const getStaticProps: GetStaticProps = async () => {
  const blocks = await getBlocks({ block_id: config.notion.crafts })
  return {
    props: { blocks },
  }
}

const Crafts: NextPage<Props> = ({ blocks }) => {
  return (
    <>
      <HeadTitle title="Crafts" />
      <Article blocks={blocks} />
    </>
  )
}

export default Crafts
