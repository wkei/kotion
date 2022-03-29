import cacheImage, { ImageData } from '../lib/cache-image'
export type { ImageData } from '../lib/cache-image'

export default async function cacheNotionImages(
  blocks: any[],
  path: string = ''
): Promise<ImageData[]> {
  const fetchImgTasks: Promise<ImageData>[] = []
  blocks.forEach((block) => {
    if (block.type === 'image' && block.image?.file?.url) {
      const { url } = block.image.file
      let filename = url.match(/[\w-]+\.(jpg|png|jpeg|webp)/)?.[0] || ''
      filename = filename.split('.').join(`-${block.id}.`)
      fetchImgTasks.push(cacheImage({ url, path, filename }))
    }
  })
  return await Promise.all(fetchImgTasks)
}
