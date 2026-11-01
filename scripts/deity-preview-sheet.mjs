// Local review evidence; no runtime dependency or image generation here.
import fs from 'node:fs'
import sharp from 'sharp'
const catalog=JSON.parse(fs.readFileSync('assets/deities/catalog.json'))
const layers=[]
for(const [i,d] of catalog.entries()){
  const left=(i%4)*320,top=Math.floor(i/4)*410
  layers.push({input:await sharp(`assets/deities/${d.id}.webp`).resize(300,338).toBuffer(),left:left+10,top:top+10})
  const label=`<svg width="320" height="52"><text x="160" y="30" text-anchor="middle" font-size="21" font-family="Microsoft YaHei" fill="#383344">${d.name}</text></svg>`
  layers.push({input:Buffer.from(label),left,top:top+350})
}
await sharp({create:{width:1280,height:820,channels:3,background:'#f8f5ee'}}).composite(layers).png().toFile('output/v3-eight-deities.png')
console.log('Saved output/v3-eight-deities.png')
