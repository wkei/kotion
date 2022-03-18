import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser'
import { wrapBlockImgUrl } from '../utils'

const parser = NotionBlocksHtmlParser.getInstance()

export default function Article({
  blocks,
  children,
}: {
  blocks?: any
  children?: React.ReactNode
}) {
  const rawHtml = blocks
    ? {
        dangerouslySetInnerHTML: {
          __html: parser.parse(wrapBlockImgUrl(blocks)),
        },
      }
    : null
  return (
    <>
      <article className="prose" {...rawHtml}>
        {children}
      </article>
      <div className="mt-20 select-none text-center text-stone-300">&bull;</div>
    </>
  )
}
