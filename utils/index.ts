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

export function getNotionImgUrl(url: string, id: string, entity = false) {
  return [
    `https://notion.so/image/${encodeURIComponent(url)}?table=block`,
    `id=${id}`,
    `cache=v2`,
  ].join(entity ? '&amp;' : '&')
}

export function wrapBlockImgUrl(content: any[]): any[] {
  return content.map((block: any) => {
    if (block.type === 'image') {
      block.image.file.url = getNotionImgUrl(
        block.image.file.url,
        block.id,
        true
      )
      return block
    }
    return block
  })
}
