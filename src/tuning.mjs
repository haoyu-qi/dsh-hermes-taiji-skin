// Cultural interaction presets, not a claim that astrology improves model quality.
const ELEMENTS = { 水: [0.7, 6144, '灵活联想'], 木: [0.85, 6144, '生发探索'], 金: [0.35, 4096, '清晰收敛'], 土: [0.5, 4096, '稳健组织'], 火: [1, 8192, '开放创作'] }
const EXPLORERS = new Set(['天机', '贪狼', '破军', '廉贞'])
const ORGANIZERS = new Set(['紫微', '天府', '天相', '武曲', '天梁'])
export const TUNING_PREFIX = '【紫微调参 v1 '
const TUNING_PATTERN = /^【紫微调参 v1 temperature=(\d+(?:\.\d+)?) maxTokens=(\d+)】$/m
export function tuningFromChart(chart) {
  if (!chart || !Array.isArray(chart.palaces)) return null
  const base = ELEMENTS[String(chart.wuxingJuName || '')[0]]
  if (!base) return null
  const ming = chart.palaces.find(p => p.isMingGong || p.branch === chart.mingGongBranch)
  const majors = (ming?.stars || []).filter(s => s.type === 'major').map(s => s.name)
  const stars = majors.length ? majors : (ming?.borrowedStars || [])
  const delta = stars.reduce((n, name) => n + (EXPLORERS.has(name) ? 0.1 : ORGANIZERS.has(name) ? -0.1 : 0), 0)
  const stems = { 甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水' }
  const pillars = Array.isArray(chart.lunarInfo?.fourPillars) ? chart.lunarInfo.fourPillars : []
  const counts = pillars.reduce((out, p) => { const e = stems[String(p)[0]]; if (e) out[e] = (out[e] || 0) + 1; return out }, {})
  const dominant = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0]
  const balance = counts[dominant] >= 3 ? (dominant === '火' || dominant === '木' ? -0.05 : dominant === '金' || dominant === '土' ? 0.05 : 0) : 0
  const temperature = Number(Math.max(0.2, Math.min(1.2, base[0] + delta + balance)).toFixed(2))
  return { temperature, maxTokens: base[1], label: base[2], reasons: [chart.wuxingJuName + '：基础温度 ' + base[0], (majors.length ? '命宫' : '命宫借星') + '：' + (stars.join('、') || '无主星修正') + '，修正 ' + delta.toFixed(2), '四柱天干平衡修正 ' + balance.toFixed(2)] }
}
export function tuningMarker(profile) { return TUNING_PREFIX + 'temperature=' + profile.temperature + ' maxTokens=' + profile.maxTokens + '】' }
export function stripTuning(text) { return String(text || '').replace(/^【紫微调参 v1 [^\n]*】\n?/gm, '') }
export function withTuning(text, profile) {
  const rest = stripTuning(text)
  return rest.trim() && profile ? tuningMarker(profile) + '\n' + rest : rest
}
export function parseTuning(text) {
  if (typeof text !== 'string') return null
  const match = text.match(TUNING_PATTERN)
  if (!match) return null
  const temperature = Number(match[1]), maxTokens = Number(match[2])
  if (!Number.isFinite(temperature) || temperature < 0.2 || temperature > 1.2 || ![4096, 6144, 8192].includes(maxTokens)) return null
  return { temperature, maxTokens }
}
