import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'

import config from '../../config'
import { getPublishedList, notion } from '../../api/notion'
import { getNotionImgUrl, getNotionObjectProperty } from '../../utils'
import HeadTitle from '../../components/head-title'

export const getStaticProps: GetStaticProps = async () => {
  const list = await getPublishedList(config.notion.photos)
  return {
    props: { list: [...list].reverse() },
  }
}

const Photos: NextPage = ({
  list,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
                  className={`pb-full w-full bg-stone-50 bg-cover bg-center`}
                  style={{
                    backgroundImage: `url(${getNotionImgUrl(
                      item?.cover?.file.url,
                      item.id
                    )}`,
                  }}
                />
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
