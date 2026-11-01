import fs from 'node:fs'
import sharp from 'sharp'
const catalog=JSON.parse(fs.readFileSync('assets/deities/catalog.json'))
for(const [index,deity] of catalog.entries()){
  let image=sharp(`output/v3-deities/${deity.id}-${index<4?'draft':'source'}.png`)
  if(index<4) image=image.extract({left:56,top:96,width:912,height:900})
  await image.resize(640,720,{fit:'cover',position:'top',withoutEnlargement:true}).webp({quality:83,effort:6}).toFile(`assets/deities/${deity.id}.webp`)
}
console.log('Prepared eight independent deity portraits.')
