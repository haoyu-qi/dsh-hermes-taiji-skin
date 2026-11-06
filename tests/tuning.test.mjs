import { test } from 'node:test'
import assert from 'node:assert/strict'
import { tuningFromChart, tuningMarker, parseTuning, withTuning } from '../src/tuning.mjs'
import { apply } from '../index.js'
const chart = { wuxingJuName: '火六局', palaces: [{ isMingGong: true, stars: [{ type:'major', name:'破军' }] }], lunarInfo: { fourPillars:['甲子','甲子','乙丑','丙寅'] } }
test('chart mapping is deterministic, bounded, explainable and handles missing data', () => {
  const profile = tuningFromChart(chart)
  assert.equal(profile.temperature, 1.05)
  assert.equal(profile.maxTokens, 8192)
  assert.equal(profile.reasons.length, 3)
  assert.equal(tuningFromChart(null), null)
  assert.equal(tuningFromChart({ palaces:[] }), null)
  assert.deepEqual(parseTuning(tuningMarker(profile)), { temperature:1.05, maxTokens:8192 })
  assert.equal(parseTuning('【紫微调参 v1 temperature=99 maxTokens=8192】'), null)
  assert.equal(parseTuning('【紫微调参 v1 temperature=0.5 maxTokens=999999】'), null)
  assert.equal(withTuning('问题', profile), withTuning(withTuning('问题', profile), profile))
  assert.equal(withTuning(withTuning('问题', profile), null), '问题')
  assert.equal(withTuning('', profile), '')
})
test('host applies real config for one agent turn, retains routing, and resets on plain input', async () => {
  const hooks = new Map(); apply({ on:(name, fn) => hooks.set(name, fn) })
  const a = {}, b = {}, config = Object.freeze({ provider:'p', model:'m', reasoningEffort:'high', temperature:0.3, maxTokens:2048 })
  const profile = tuningFromChart(chart)
  const pre = (agent, turn, content, kind='enter') => hooks.get('agent/pre-step')({agent, turn}, async () => ({kind, messages:content === null ? [] : [{role:'user',content:[{type:'text',text:content}]}]}))
  const request = (agent, turn) => hooks.get('agent/request')({agent, turn}, async()=>config)
  await pre(a, 1, withTuning('问题', profile))
  assert.deepEqual(await request(a,1), {...config, temperature:1.05, maxTokens:8192})
  assert.equal(await request(b,1), config)
  await pre(a,1,null)
  assert.equal((await request(a,1)).temperature,1.05)
  assert.equal(await request(a,2),config)
  await pre(a,1,'普通问题')
  assert.equal(await request(a,1),config)
  await pre(a,2,withTuning('问题',profile),'reject')
  assert.equal(await request(a,2),config)
})

test('logged-header seeds restore original scalars after tuning, and preserve outside edits', async () => {
  const hooks=new Map(); apply({on:(name,fn)=>hooks.set(name,fn)})
  const agent={}, base={provider:'p',model:'m',temperature:0.3,maxTokens:2048}
  const profile=tuningFromChart(chart)
  const pre=(turn,text)=>hooks.get('agent/pre-step')({agent,turn},async()=>({kind:'enter',messages:[{content:[{type:'text',text}]}]}))
  const request=(turn,seed)=>hooks.get('agent/request')({agent,turn},async()=>seed)
  await pre(1,withTuning('问题',profile))
  const tuned=await request(1,base)
  assert.deepEqual(await request(1,tuned),tuned)
  await pre(2,'普通问题')
  assert.deepEqual(await request(2,tuned),base)
  await pre(3,withTuning('问题',profile))
  const tunedAgain=await request(3,base)
  await pre(4,'普通问题')
  assert.deepEqual(await request(4,{...tunedAgain,temperature:0.8}),{...base,temperature:0.8})
  await pre(5,withTuning('问题',profile))
  const noScalars={provider:'p',model:'m'}
  const tunedDefaults=await request(5,noScalars)
  await pre(6,'普通问题')
  assert.deepEqual(await request(6,tunedDefaults),noScalars)
})
