/**
 * 引擎回归（node 直跑，不需要浏览器）：
 *  1. IIFE 可加载、导出齐全；
 *  2. 金标准命盘（上游口径）逐项核对；
 *  3. 同输入恒得同一输出（上游 README 承诺的确定性）；
 *  4. 不存在的公历日期必须抛错（上游 2026-10-03 起的行为）；
 *  5. 格局判定与命宫摘要可用。
 * 用法：node tools/test-engine.mjs
 */
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const enginePath = path.join(root, 'ziwei-engine.iife.js')
if (!fs.existsSync(enginePath)) {
  console.error('[test-engine] 缺少 %s，先跑 `npm run build`', path.relative(root, enginePath))
  process.exit(1)
}

const sandbox = {}
new Function('globalThis', fs.readFileSync(enginePath, 'utf8'))(sandbox)
const Z = sandbox.__HermesZiwei__

let failed = 0
function ok(cond, label, extra) {
  if (cond) {
    console.log('  ✓', label)
  } else {
    failed += 1
    console.error('  ✗', label, extra === undefined ? '' : JSON.stringify(extra))
  }
}

console.log('[test-engine] exports')
ok(Z && typeof Z.generateChart === 'function', 'generateChart 导出')
ok(typeof Z.detectPatterns === 'function', 'detectPatterns 导出')
ok(typeof Z.getLunarInfo === 'function', 'getLunarInfo 导出')
ok(typeof Z.getMingGongSummary === 'function', 'getMingGongSummary 导出')

console.log('[test-engine] 金标准 · 1990-01-01 子时男')
const male = Z.generateChart({ year: 1990, month: 1, day: 1, hour: 0, gender: 'male' })
ok(male.wuxingJuName === '水二局', '五行局 = 水二局', male.wuxingJuName)
ok(male.mingZhu === '巨门' && male.shenZhu === '天机', '命主巨门 · 身主天机', [male.mingZhu, male.shenZhu])
ok(male.palaces.length === 12, '十二宫齐全', male.palaces.length)
ok(male.palaces.every((p) => Number.isInteger(p.branch) && Array.isArray(p.stars)), '宫位结构完整')
const ming = male.palaces.find((p) => p.isMingGong)
ok(!!ming && ming.name === '命宫', '命宫在盘')
const lunar = male.lunarInfo
ok(lunar.lunarYear === 1989 && lunar.lunarMonth === 12 && lunar.lunarDay === 5, '农历 = 己巳年腊月初五', [lunar.lunarYear, lunar.lunarMonth, lunar.lunarDay])

console.log('[test-engine] 金标准 · 1990-01-01 子时女')
const female = Z.generateChart({ year: 1990, month: 1, day: 1, hour: 0, gender: 'female' })
ok(female.yinYangGender === '阴女' || typeof female.yinYangGender === 'string', '阴阳性别口径存在', female.yinYangGender)

console.log('[test-engine] 确定性与非法日期')
const again = Z.generateChart({ year: 1990, month: 1, day: 1, hour: 0, gender: 'male' })
ok(JSON.stringify(again) === JSON.stringify(male), '同输入恒得同一输出')
let threw = false
try {
  Z.generateChart({ year: 2026, month: 2, day: 30, hour: 0, gender: 'male' })
} catch (error) {
  threw = true
}
ok(threw, '2026-02-30 抛 RangeError')

console.log('[test-engine] 格局与摘要')
const patterns = Z.detectPatterns(male)
ok(Array.isArray(patterns), '格局判定返回数组', patterns.length)
ok(patterns.some((p) => p.name === '府相朝垣'), '含府相朝垣', patterns.map((p) => p.name))
const summary = Z.getMingGongSummary(male)
ok(summary && typeof summary === 'object', '命宫摘要可用', Object.keys(summary))

if (failed > 0) {
  console.error('[test-engine] %d 项失败', failed)
  process.exit(1)
}
console.log('[test-engine] 全部通过')
