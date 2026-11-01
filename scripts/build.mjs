import fs from 'node:fs'
const root = new URL('../', import.meta.url)
const read = path => fs.readFileSync(new URL(path, root), 'utf8')
const art = 'data:image/webp;base64,' + fs.readFileSync(new URL('assets/ink-landscape.webp', root)).toString('base64')
const state = read('src/state.mjs').replace(/^export /gm, '')
const deities=JSON.parse(read('assets/deities/catalog.json'))
if(deities.length!==8||new Set(deities.map(d=>d.id)).size!==8)throw new Error('V3 requires eight unique deities')
const deityArt=Object.fromEntries(deities.map(d=>[d.id,'data:image/webp;base64,'+fs.readFileSync(new URL(`assets/deities/${d.id}.webp`,root)).toString('base64')]))
const blessingState=read('src/blessings.mjs').replace(/^export /gm,'')
const runtime = `const QIANKUN_ART = ${JSON.stringify(art)};\nconst QIANKUN_CSS = ${JSON.stringify(read('src/qiankun.css')+'\n'+read('src/blessing.css'))};\nconst DEITIES=${JSON.stringify(deities)};\nconst DEITY_ART=${JSON.stringify(deityArt)};\n${state}\n${blessingState}\n${read('src/qiankun.js')}\n${read('src/blessing-ui.js')}`
fs.writeFileSync(new URL('client.js', root), read('src/client.js').replace('    /* @qiankun-runtime */', () => runtime))
console.log('Built self-contained Qiankun V3 client with eight blessing portraits.')
