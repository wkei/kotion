import { getNotionImgUrl } from '../utils'

export default function ImgBlock({ block }: { block: any }) {
  if (block.type !== 'image') return null

  const caption = block.image?.caption[0]?.plain_text

  return (
    <figure>
      <img
        alt={caption}
        src={getNotionImgUrl(block.image?.file?.url, block.id)}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
