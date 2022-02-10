import { getPublishedList } from '../api/notion'
import config from '../config'

export async function getNotionStaticPaths(databaseId: string) {
  const list = await getPublishedList(databaseId)
  return list.map((item: any) => ({
    params: { slug: getNotionObjectProperty(item, 'Slug') },
  }))
}

export function getNotionObjectProperty(obj: any, porperty: string) {
  const data = obj.properties[porperty]
  const { type } = data
  if (type === 'date') {
    return data[type].start
  }
  if (type === 'checkbox') {
    return data.checkbox
  }
  return data[data.type][0]?.plain_text
}

export function getNotionImgUrl(url: string, id: string) {
  const encodedUrl = encodeURIComponent(url)
  return `//${config.notion.site}/image/${encodedUrl}?table=block&id=${id}&cache=v2`
}
