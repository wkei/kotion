import { Client } from '@notionhq/client'
import type {
  QueryDatabaseParameters,
  GetPageParameters,
  GetBlockParameters,
} from '@notionhq/client/build/src/api-endpoints.d'

import { getNotionObjectProperty } from '../utils'

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export async function getDB(params: QueryDatabaseParameters) {
  const res = await notion.databases.query(params)
  return res.results
}

export function getPage(params: GetPageParameters) {
  return notion.pages.retrieve(params)
}

export async function getBlocks(params: GetBlockParameters) {
  const res = await notion.blocks.children.list(params)
  return res.results
}

// ------------------------------------------------------------

export function getPublishedList(database_id: string) {
  return getDB({
    database_id,
    filter: {
      checkbox: {
        equals: true,
      },
      property: 'Published',
      type: 'checkbox',
    },
  })
}

export async function getPageBlocksBySlug(database_id: string, slug: string) {
  const list = await getDB({
    database_id,
    filter: {
      rich_text: {
        is_not_empty: true,
      },
      property: 'Slug',
    },
  })
  const page: any = list.find(
    (item: any) => getNotionObjectProperty(item, 'Slug') === slug
  )
  return {
    page,
    blocks: await getBlocks({ block_id: page.id }),
  }
}
