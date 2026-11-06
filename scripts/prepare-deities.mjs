import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
const catalog=JSON.parse(fs.readFileSync('assets/deities/catalog.json'))
const sourceDir=process.argv[2] || 'output/v3.2-deities'
for(const deity of catalog){
  const source=path.join(sourceDir,`${deity.id}.png`)
  if(!fs.existsSync(source)) throw new Error(`Missing generated portrait: ${source}`)
  await sharp(source).resize(640,800,{fit:'contain',background:'#F8F5EE'}).webp({quality:82,effort:6}).toFile(`assets/deities/${deity.id}.webp`)
}
console.log(`Prepared ${catalog.length} independent text-free deity portraits.`)
