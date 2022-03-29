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
      fetchImgTasks.push(cacheImage({ url, path }))
    }
  })
  return await Promise.all(fetchImgTasks)
}
