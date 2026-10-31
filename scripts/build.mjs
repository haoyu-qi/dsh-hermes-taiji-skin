import fs from 'node:fs'
const root = new URL('../', import.meta.url)
const read = path => fs.readFileSync(new URL(path, root), 'utf8')
const art = 'data:image/webp;base64,' + fs.readFileSync(new URL('assets/ink-landscape.webp', root)).toString('base64')
const state = read('src/state.mjs').replace(/^export /gm, '')
const runtime = `const QIANKUN_ART = ${JSON.stringify(art)};\nconst QIANKUN_CSS = ${JSON.stringify(read('src/qiankun.css'))};\n${state}\n${read('src/qiankun.js')}`
fs.writeFileSync(new URL('client.js', root), read('src/client.js').replace('    /* @qiankun-runtime */', () => runtime))
console.log('Built self-contained Qiankun V2 client (no external art requests).')
