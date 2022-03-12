import Image from 'next/image'
import { getNotionImgUrl } from '../utils'

export default function ImgBlock({ block }: { block: any }) {
  if (block.type !== 'image') return null

  const caption = block.image?.caption[0]?.plain_text

  return (
    <figure>
      <Image
        src={getNotionImgUrl(block.image?.file?.url, block.id)}
        alt={caption}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
