/**
 * 紫微排盘引擎的打包入口：只导出皮肤用得到的纯函数。
 *
 * 上游：https://github.com/Renhuai123/ziwei-doushu （MIT，vendor/ziwei/NOTICE.md）
 * 注意 history.ts / share.ts / db-analysis.ts 依赖应用层（React / BirthForm / 断语占位），
 * 不属于排盘内核，这里刻意不引入。
 */
export { generateChart, getLunarInfo } from '../vendor/ziwei/algorithm'
export { detectPatterns, getMingGongSummary } from '../vendor/ziwei/patterns'
export type { BirthInfo, ZiweiChart, Palace, Star, Pattern } from '../vendor/ziwei/types'
