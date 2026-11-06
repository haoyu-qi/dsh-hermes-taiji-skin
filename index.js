import { parseTuning } from './src/tuning.mjs'

/** Host waterfall owns actual request config; no browser fetch interception. */
export function apply(ctx) {
  const turns = new WeakMap()
  const applied = new WeakMap()
  ctx.on('agent/pre-step', async (payload, next) => {
    const decision = await next()
    if (decision.kind !== 'enter') return decision
    const messages = decision.messages || []
    if (messages.length) {
      const last = messages.at(-1)
      const text = typeof last.content === 'string' ? last.content :
        (Array.isArray(last.content) ? last.content.filter(b => b.type === 'text').map(b => b.text).join('\n') : '')
      turns.set(payload.agent, { turn: payload.turn, profile: parseTuning(text) })
    }
    return decision
  })
  ctx.on('agent/request', async ({ agent, turn }, next) => {
    const seed = await next()
    const previous = applied.get(agent)
    let config = seed
    // Hermes seeds later requests from the logged header. Undo only our own
    // unchanged scalars before applying the next preset, preserving outside edits.
    if (previous) {
      for (const field of ['temperature', 'maxTokens']) {
        if (seed[field] !== previous.profile[field]) continue
        if (config === seed) config = { ...seed }
        if (seed.provider === previous.base.provider && seed.model === previous.base.model &&
            Object.hasOwn(previous.base, field)) config[field] = previous.base[field]
        else delete config[field]
      }
      applied.delete(agent)
    }
    const value = turns.get(agent)
    if (value?.turn !== turn || !value.profile) return config
    applied.set(agent, { base: config, profile: value.profile })
    return { ...config, ...value.profile }
  })
}
