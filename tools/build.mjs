/**
 * 组装可安装的 client.js = ziwei-engine.iife.js + src/client.js
 *
 * src/client.js 是唯一手写源码（client-hmr 迭代它）；client.js 是构建产物、
 * 也是 DSH ModuleLoader 实际加载的文件。两者都留在仓库里，保证
 * 「克隆即安装」不需要先跑构建。
 *
 * 用法：
 *   node tools/build.mjs          # 先跑 build-engine（必要时），再拼 client.js
 *   node tools/build.mjs --check  # 只校验 client.js 是否与源码+引擎一致，不写文件
 */
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const src = path.join(root, 'src', 'client.js')
const engine = path.join(root, 'ziwei-engine.iife.js')
const out = path.join(root, 'client.js')

const glue = '\n;\n/* ——— 以下是 src/client.js 手写源码（tools/build.mjs 拼接，勿直接改 client.js）——— */\n'

function assemble() {
  const engineCode = fs.readFileSync(engine, 'utf8').trimEnd()
  const skinCode = fs.readFileSync(src, 'utf8').trimEnd()
  return engineCode + glue + skinCode + '\n'
}

if (process.argv.includes('--check')) {
  const expected = assemble()
  const actual = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : ''
  if (expected !== actual) {
    console.error('[build] client.js 与 src/client.js + 引擎不一致，请运行 `npm run build`')
    process.exit(1)
  }
  console.log('[build] client.js 与源码一致（%d bytes）', Buffer.byteLength(actual))
  process.exit(0)
}

// 引擎产物缺失或比引擎源码旧时重建。
const engineInputs = [
  path.join(root, 'vendor', 'ziwei'),
  path.join(here, 'engine-entry.ts'),
]
let engineStale = !fs.existsSync(engine)
if (!engineStale) {
  const built = fs.statSync(engine).mtimeMs
  for (const dir of engineInputs) {
    const stack = fs.statSync(dir)
    if (stack.mtimeMs > built) {
      engineStale = true
      break
    }
  }
}
if (engineStale) {
  console.log('[build] 引擎产物缺失或过期，先跑 tools/build-engine.mjs')
  const res = spawnSync(process.execPath, [path.join(here, 'build-engine.mjs')], { stdio: 'inherit' })
  if (res.status !== 0) process.exit(res.status ?? 1)
}

fs.writeFileSync(out, assemble())
console.log('[build] client.js %d bytes（引擎 %d + 源码 %d）', fs.statSync(out).size, fs.statSync(engine).size, fs.statSync(src).size)
