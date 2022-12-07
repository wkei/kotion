import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'

import config from '../../config'
import { getPublishedList, getNotionObjectProperty } from '../../utils/notion'
import HeadTitle from '../../components/head-title'
import { NotionImg } from '../../components/notion-img'

type Props = {
  list: any[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const list = await getPublishedList(config.notion.photos)
  return {
    props: { list },
  }
}

const Cover = ({ data }: { data: any }) => {
  const slug = getNotionObjectProperty(data, 'Slug')
  const name = getNotionObjectProperty(data, 'Name')
  return (
    <Link
      href={`/photos/${slug}`}
      className="transform-color text-stone-400 duration-300 hover:text-stone-700 focus:outline-dotted focus:outline-1"
    >
      <figure className="text-center">
        <div className="photo-cover pb-full relative w-full bg-stone-50 bg-cover bg-center">
          <NotionImg src={data.cover?.file.url} id={data.id} />
        </div>
        <figcaption className="my-2 uppercase">{name}</figcaption>
      </figure>
    </Link>
  )
}

export const Photos: NextPage<Props> = ({ list }) => {
  return (
    <>
      <HeadTitle title="Photos" />
      <div className="grid grid-cols-none gap-12 sm:grid-cols-2 select-none">
        {list.reverse().map((item: any) => (
          <Cover key={item.id} data={item} />
        ))}
        <figure>
          <div className="photo-cover pb-full relative w-full bg-stone-50 bg-cover bg-center">
            <span className="absolute text-stone-400 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
              Developing...
            </span>
          </div>
          <figcaption className="my-2 uppercase">&nbsp;</figcaption>
        </figure>
      </div>
    </>
  )
}

export default Photos
