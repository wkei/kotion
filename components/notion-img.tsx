import { genNotionImageUrl } from '../utils/notion'
import Image from 'next/image'

type NotionImgProps = {
  src: string
  id: string
  alt?: string
  className?: string
}

export const NotionImg = ({ className, src, id, alt = '' }: NotionImgProps) => (
  <div className={className}>
    <Image
      alt={alt}
      src={src}
      loader={({ src }) => genNotionImageUrl(src, id)}
      layout="fill"
      className="!relative !h-auto"
    />
  </div>
)

export default NotionImg
