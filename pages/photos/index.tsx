import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import config from '../../config'
import { getPublishedList, getNotionObjectProperty } from '../../lib/notion'
import HeadTitle from '../../components/head-title'
import cacheImage, { ImageData } from '../../lib/cache-image'
import isProd from '../../utils/is-prod'

type Props = {
  list: any[]
  covers: ImageData[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const list = await getPublishedList(config.notion.photos)
  const covers = isProd
    ? await Promise.all(
        list.map(async (item: any) => {
          const filename =
            getNotionObjectProperty(item, 'Name').toLowerCase() + '.jpg'
          return await cacheImage({
            url: item?.cover?.file.url,
            path: 'photos',
            filename,
          })
        })
      )
    : []
  return {
    props: { list: [...list].reverse(), covers },
  }
}

const CoverImg = ({ data, covers }: { data: any; covers: ImageData[] }) => {
  const alt = getNotionObjectProperty(data, 'Name')
  if (!isProd) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={data.cover.file.url} alt={alt} />
  }
  const cover = covers.find((c) => c.originalUrl === data.cover.file.url)
  if (!cover) return null
  return (
    <Image
      src={cover.path}
      alt={alt}
      width={cover.width}
      height={cover.height}
      objectFit="cover"
    />
  )
}

const Photos: NextPage<Props> = ({ list, covers }) => {
  return (
    <>
      <HeadTitle title="Photos" />
      <div className="grid grid-cols-none gap-12 sm:grid-cols-2">
        {list.map((item: any) => (
          <Link
            key={item.id}
            href={`/photos/${getNotionObjectProperty(item, 'Slug')}`}
          >
            <a className="transform-color text-stone-400 duration-300 hover:text-stone-700 focus:outline-dotted focus:outline-1">
              <figure className="text-center">
                <div
                  className={`photo-cover pb-full relative w-full bg-stone-50 bg-cover bg-center`}
                >
                  <CoverImg covers={covers} data={item} />
                </div>
                <figcaption className="my-2 uppercase">
                  {getNotionObjectProperty(item, 'Name')}
                </figcaption>
              </figure>
            </a>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Photos
