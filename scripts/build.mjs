import fs from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root = new URL('../', import.meta.url)
const read = path => fs.readFileSync(new URL(path, root), 'utf8')
const has = path => fs.existsSync(new URL(path, root))
const abs = path => fileURLToPath(new URL(path, root))

// ——— V3.1 · 紫微排盘引擎：tools/build-engine.mjs 打成 IIFE；缺了或旧了先重建 ———
const enginePath = 'ziwei-engine.iife.js'
const engineInputs = ['vendor/ziwei/', 'tools/engine-entry.ts']
let engineStale = !has(enginePath)
if (!engineStale) {
  const built = fs.statSync(new URL(enginePath, root)).mtimeMs
  engineStale = engineInputs.some(input => {
    const path = new URL(input, root)
    return fs.existsSync(path) && fs.statSync(path).mtimeMs > built
  })
}
if (engineStale) {
  console.log('[build] 引擎产物缺失或过期，先跑 tools/build-engine.mjs')
  const res = spawnSync(process.execPath, [abs('tools/build-engine.mjs')], { stdio: 'inherit' })
  if (res.status !== 0) process.exit(res.status ?? 1)
}
const engine = read(enginePath).trimEnd()

const art = 'data:image/webp;base64,' + fs.readFileSync(new URL('assets/ink-landscape.webp', root)).toString('base64')
const state = read('src/state.mjs').replace(/^export /gm, '')
const deities = JSON.parse(read('assets/deities/catalog.json'))
if (deities.length !== 8 || new Set(deities.map(d => d.id)).size !== 8) throw new Error('V3 requires eight unique deities')
const deityArt = Object.fromEntries(deities.map(d => [d.id, 'data:image/webp;base64,' + fs.readFileSync(new URL(`assets/deities/${d.id}.webp`, root)).toString('base64')]))
const blessingState = read('src/blessings.mjs').replace(/^export /gm, '')
const runtime = `const QIANKUN_ART = ${JSON.stringify(art)};\nconst QIANKUN_CSS = ${JSON.stringify(read('src/qiankun.css') + '\n' + read('src/blessing.css'))};\nconst ZIWEI_CSS = ${JSON.stringify(read('src/ziwei.css'))};\nconst DEITIES = ${JSON.stringify(deities)};\nconst DEITY_ART = ${JSON.stringify(deityArt)};\n${state}\n${blessingState}\n${read('src/qiankun.js')}\n${read('src/blessing-ui.js')}\n/* ——— V3.1 · 紫微斗数 ——— */\n${read('src/ziwei.js')}`
const skin = read('src/client.js').replace('    /* @qiankun-runtime */', () => runtime)

// 引擎 IIFE 必须在顶层（它自己挂 window.__HermesZiwei__），皮肤壳跟在后面。
const client = engine + '\n;\n' + skin
fs.writeFileSync(new URL('client.js', root), client)
console.log('Built self-contained Qiankun V3.1 client: eight blessing portraits + ziwei-doushu chart engine (%d bytes).', Buffer.byteLength(client))
