import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser'
import htmlReactParser from 'html-react-parser'

const parser = NotionBlocksHtmlParser.getInstance({})

export default function Article({ blocks }: { blocks?: any }) {
  const components = blocks ? htmlReactParser(parser.parse(blocks)) : null
  return (
    <>
      <article className="prose">{components}</article>
      <div className="mt-20 select-none text-center text-stone-300">&bull;</div>
    </>
  )
}
