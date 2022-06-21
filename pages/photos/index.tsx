import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'

import config from '../../config'
import { getPublishedList, getNotionObjectProperty } from '../../lib/notion'
import HeadTitle from '../../components/head-title'

type Props = {
  list: any[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const list = await getPublishedList(config.notion.photos)
  return {
    props: { list: [...list].reverse() },
  }
}

const Cover = ({ data }: { data: any }) => {
  const slug = getNotionObjectProperty(data, 'Slug')
  const name = getNotionObjectProperty(data, 'Name')
  const coverSrc = data.cover?.file.url
  return (
    <Link href={`/photos/${slug}`}>
      <a className="transform-color text-stone-400 duration-300 hover:text-stone-700 focus:outline-dotted focus:outline-1">
        <figure className="text-center">
          <div
            className={`photo-cover pb-full relative w-full bg-stone-50 bg-cover bg-center`}
          >
            <picture>
              <source srcSet={coverSrc} type="image/jpeg" />
              <img src={coverSrc} alt={name} />
            </picture>
          </div>
          <figcaption className="my-2 uppercase">{name}</figcaption>
        </figure>
      </a>
    </Link>
  )
}

const Photos: NextPage<Props> = ({ list }) => {
  return (
    <>
      <HeadTitle title="Photos" />
      <div className="grid grid-cols-none gap-12 sm:grid-cols-2">
        {list.map((item: any) => (
          <Cover key={item.id} data={item} />
        ))}
      </div>
    </>
  )
}

export default Photos
