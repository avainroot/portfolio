import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const sourceRoot = path.join(projectRoot, 'src', 'assets', 'images')
const outputRoot = path.join(projectRoot, 'public', 'images')

const supportedExtensions = new Set(['.svg', '.png', '.jpg', '.jpeg', '.webp'])

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)))
    } else if (entry.isFile()) {
      files.push(fullPath)
    }
  }

  return files
}

async function ensureDirectory(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function main() {
  await fs.rm(outputRoot, { recursive: true, force: true })
  await ensureDirectory(outputRoot)

  const files = await walk(sourceRoot)
  const imageFiles = files.filter((file) =>
    supportedExtensions.has(path.extname(file).toLowerCase()),
  )

  if (imageFiles.length === 0) {
    console.log('No source images found in src/assets/images.')
    return
  }

  for (const imagePath of imageFiles) {
    const relativePath = path.relative(sourceRoot, imagePath)
    const outputDir = path.join(outputRoot, path.dirname(relativePath))
    const ext = path.extname(relativePath)
    const fileName = path.basename(relativePath, ext)

    await ensureDirectory(outputDir)
    const outputFile = path.join(outputDir, `${fileName}.avif`)

    try {
      await sharp(imagePath).avif({ quality: 75, effort: 5 }).toFile(outputFile)
      console.log(`Generated ${path.relative(projectRoot, outputFile)}`)
    } catch (error) {
      console.error(`Failed to optimize ${relativePath}:`, error)
      throw error
    }
  }
}

void main().catch((error) => {
  console.error(error)
  process.exit(1)
})
