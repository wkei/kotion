import type { NextPage, GetStaticProps } from 'next'

import { getBlocks } from '../utils/notion'
import config from '../config'
import Article from '../components/article'

type Props = {
  blocks: any[]
}
export const getStaticProps: GetStaticProps<Props> = async () => {
  const blocks = await getBlocks({ block_id: config.notion.about })
  return {
    props: { blocks },
  }
}

const About: NextPage<Props> = ({ blocks }) => {
  return <Article blocks={blocks} />
}

export default About
