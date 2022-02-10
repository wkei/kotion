import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'

import { getBlocks } from '../api/notion'
import config from '../config'
import Article from '../components/article'

export const getStaticProps: GetStaticProps = async () => {
  const content = await getBlocks({ block_id: config.notion.about })
  return {
    props: { content },
  }
}

const About: NextPage = ({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Article blocks={content} />
}

export default About
