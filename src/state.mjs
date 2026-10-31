export const MODES = [
  { id: 'quiet', title: '淡雅 · 浅思', short: '淡雅', note: '大道至简，静水流深' },
  { id: 'balanced', title: '平衡 · 深思', short: '平衡', note: '阴阳相济，动静相生' },
  { id: 'immersive', title: '沉浸 · 悟道', short: '沉浸', note: '观天地之象，悟万物之理' },
]
// Only map recognized semantics. Provider effort IDs are opaque; do not guess their order.
export function effortMode(id) {
  if (['off', 'none', 'disabled', 'minimal', 'low'].includes(id)) return 'quiet'
  if (['medium', 'high', 'enabled', 'on'].includes(id)) return 'balanced'
  if (['max', 'xhigh', 'ultra'].includes(id)) return 'immersive'
  return null
}
export function modelChoices(snapshot) {
  const current = snapshot?.current
  const model = snapshot?.groups?.find(g => g.id === current?.provider)?.models?.find(m => m.id === current?.model)
  const efforts = model?.reasoning?.efforts || []
  const pick = names => names.map(name => efforts.find(e => e.id === name)).find(Boolean)
  const quiet = pick(['off', 'none', 'disabled', 'low', 'minimal'])
  const balanced = pick(['high', 'medium', 'enabled', 'on'])
  const immersive = pick(['max', 'xhigh', 'ultra'])
  return { current, effective: current?.reasoningEffort ?? model?.reasoning?.defaultEffort,
    quiet: { effort: quiet, visualOnly: !quiet },
    balanced: { effort: balanced, visualOnly: !balanced },
    immersive: { effort: immersive || balanced, visualOnly: !immersive } }
}
export function activityOf(session, outputSeen = false) {
  if (!session || !session.running) return 'idle'
  if (session.pending?.length) return 'waiting'
  const blocks = session.partial?.blocks || []
  if (outputSeen || blocks.some(b => b.kind === 'text' && b.text?.trim())) return 'output'
  if (session.runningCalls?.length) return 'tools'
  return 'thinking'
}
export const DEFAULT_PREFS = { mode: 'quiet', follow: true, bind: true, motion: true, fortune: true, boot: true }
export function validPreferences(input) {
  const value = { ...DEFAULT_PREFS }
  if (input && MODES.some(m => m.id === input.mode)) value.mode = input.mode
  for (const name of ['follow', 'bind', 'motion', 'fortune', 'boot']) if (typeof input?.[name] === 'boolean') value[name] = input[name]
  return value
}
