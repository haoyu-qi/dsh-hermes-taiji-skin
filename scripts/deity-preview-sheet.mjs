// Local review evidence; no runtime dependency or image generation here.
import fs from 'node:fs'
import sharp from 'sharp'
const catalog=JSON.parse(fs.readFileSync('assets/deities/catalog.json'))
fs.mkdirSync('output',{recursive:true})
const layers=[]
for(const [i,d] of catalog.entries()){
  const left=(i%6)*240,top=Math.floor(i/6)*330
  layers.push({input:await sharp(`assets/deities/${d.id}.webp`).resize(220,275).toBuffer(),left:left+10,top:top+10})
  const label=`<svg width="240" height="52"><text x="120" y="30" text-anchor="middle" font-size="21" font-family="Microsoft YaHei" fill="#383344">${d.name}</text></svg>`
  layers.push({input:Buffer.from(label),left,top:top+285})
}
await sharp({create:{width:1440,height:Math.ceil(catalog.length/6)*330,channels:3,background:'#f8f5ee'}}).composite(layers).png().toFile('output/v3.2-36-deities.png')
console.log('Saved output/v3.2-36-deities.png')
