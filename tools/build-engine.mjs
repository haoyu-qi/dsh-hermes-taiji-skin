/**
 * 把 vendor/ziwei 排盘引擎（含 iztro + lunar-javascript）打进一个 IIFE，
 * 挂到 window.__HermesZiwei__，供 client.js 的紫微组件调用。
 *
 * 产物：hermes-skin/ziwei-engine.iife.js（未压缩版不落盘；只保留 minified）
 * 用法：node tools/build-engine.mjs
 */
import { build } from 'esbuild'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const outfile = path.join(root, 'ziwei-engine.iife.js')

const result = await build({
  entryPoints: [path.join(here, 'engine-entry.ts')],
  bundle: true,
  format: 'iife',
  globalName: '__HermesZiwei__',
  minify: true,
  target: 'es2020',
  write: false,
  logLevel: 'silent',
  alias: { 'server-only': path.join(here, 'stub-server-only.ts') },
  legalComments: 'inline',
  banner: {
    js: [
      '/* hermes-skin · 紫微斗数排盘引擎（IIFE）',
      ' * 引擎：github.com/Renhuai123/ziwei-doushu（MIT，见 vendor/ziwei/LICENSE.upstream）',
      ' * 打包依赖：iztro（MIT）· lunar-javascript（MIT）',
      ' * 由 tools/build-engine.mjs 生成，勿手改。*/',
    ].join('\n'),
  },
})

fs.writeFileSync(outfile, result.outputFiles[0].text)
const bytes = fs.statSync(outfile).size
console.log(`[build-engine] ${path.relative(root, outfile)} ${bytes} bytes`)

// 与源码做一致性抽查：IIFE 必须能排盘（金标准样本 1990-01-01 子时男命 = 水二局）。
const sandbox = {}
new Function('globalThis', fs.readFileSync(outfile, 'utf8') + '\n;globalThis.Z = __HermesZiwei__;')(sandbox)
const chart = sandbox.Z.generateChart({ year: 1990, month: 1, day: 1, hour: 0, gender: 'male' })
if (chart.wuxingJuName !== '水二局' || chart.mingZhu !== '巨门' || chart.palaces.length !== 12) {
  throw new Error('[build-engine] 金标准命盘不符：' + JSON.stringify({ ju: chart.wuxingJuName, zhu: chart.mingZhu }))
}
console.log('[build-engine] 金标准通过：1990-01-01 子时男 = 水二局 · 命主巨门')

// esbuild 的 globalName 产物是顶层 `var __HermesZiwei__ = …`；被再打包进模块作用域时
// var 不会落到 window 上。这里显式包一层并挂到全局，保证任何加载方式都能取到。
const raw = fs.readFileSync(outfile, 'utf8')
const wrapped =
  '/* 显式挂全局：var 在模块/eval 作用域里不会自动成为 window 属性 */\n' +
  ';(function () {\n' +
  raw.trim() +
  '\n;(typeof window !== "undefined" ? window : globalThis).__HermesZiwei__ = __HermesZiwei__;\n' +
  '})();\n'
fs.writeFileSync(outfile, wrapped)
console.log('[build-engine] 已包全局挂载层：%d bytes', fs.statSync(outfile).size)
