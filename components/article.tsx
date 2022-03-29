import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser'
import htmlReactParser, { Element } from 'html-react-parser'
import Image from 'next/image'
import type { ImageData } from '../lib/cache-image'

const parser = NotionBlocksHtmlParser.getInstance({})

export default function Article({
  blocks,
  images,
}: {
  blocks?: any
  images?: ImageData[]
}) {
  let components = null
  if (blocks) {
    const html = parser.parse(blocks)
    components = htmlReactParser(html, {
      replace: (domNode) => {
        if (process.env.NODE_ENV !== 'production') {
          return domNode
        }
        if (domNode instanceof Element && domNode.attribs) {
          if (domNode.attribs.src) {
            const imageData = images?.find(
              (image) => image.originalUrl === domNode.attribs.src
            )
            if (imageData) {
              return (
                <Image
                  alt={domNode.attribs.alt}
                  src={imageData.path}
                  width={imageData.width}
                  height={imageData.height}
                  quality={100}
                />
              )
            }
          }
        }
        return domNode
      },
    })
  }
  return (
    <>
      <article className="prose">{components}</article>
      <div className="mt-20 select-none text-center text-stone-300">&bull;</div>
    </>
  )
}
