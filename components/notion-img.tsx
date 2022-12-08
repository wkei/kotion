import { genNotionImageUrl } from '../utils/notion'

type NotionImgProps = {
  src: string
  id: string
  alt?: string
  className?: string
}

export const NotionImg = ({ className, src, id, alt = '' }: NotionImgProps) => (
  <div className={className}>
    <img src={genNotionImageUrl(src, id)} />
  </div>
)

export default NotionImg
