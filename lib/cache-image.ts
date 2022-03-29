import sizeOf from 'image-size'
import fs from 'fs'

export type ImageData = {
  originalUrl: string
  path: string
  width: number
  height: number
}

const PUBLIC_DIR = 'public'
const IMG_DIR = 'images'

const handlePath = (filename: string, path: string = '') => {
  const dirPath = `${PUBLIC_DIR}/${IMG_DIR}/${path}`.replace(/\/+/g, '/')
  const fullPath = `${dirPath}/${filename}`.replace(/\/+/g, '/')
  const publicPath = `/${IMG_DIR}/${path}/${filename}`.replace(/\/+/g, '/')

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }

  return {
    publicPath,
    fullPath,
    exists: fs.existsSync(fullPath),
  }
}

type FetchSaveImgParams = {
  url: string
  path?: string
  filename?: string
}
const fetchSaveImg = async ({
  url,
  path,
  filename,
}: FetchSaveImgParams): Promise<ImageData> => {
  if (!url) {
    throw new Error('url is required')
  }

  filename = filename || url.match(/[\w-]+\.(jpg|png|jpeg|webp)/)?.[0]

  if (!filename) {
    throw new Error('cannot get filename')
  }

  // check file exists or not & prepare folders
  const { exists, fullPath, publicPath } = handlePath(filename, path)

  // if file exists, return it
  if (exists) {
    const { width, height } = await sizeOf(fullPath)
    if (!width || !height) {
      throw new Error('cannot get image dimensions')
    }
    return {
      originalUrl: url,
      path: publicPath,
      width,
      height,
    }
  }

  // fetch and stream and save
  const fetchRes = await fetch(url)
  const fetchArrBuffer = await fetchRes.arrayBuffer()
  const buffer = Buffer.from(fetchArrBuffer)
  fs.writeFileSync(fullPath, buffer)
  const { width, height } = sizeOf(buffer)
  if (!width || !height) {
    throw new Error('cannot get image dimensions')
  }
  return {
    originalUrl: url,
    path: publicPath,
    width,
    height,
  }
}

export default fetchSaveImg
