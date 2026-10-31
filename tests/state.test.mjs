import { test } from 'node:test'
import assert from 'node:assert/strict'
import { modelChoices, activityOf, effortMode, validPreferences } from '../src/state.mjs'
function catalog(ids,current='off') {return {current:{provider:'deepseek',model:'v4',reasoningEffort:current},groups:[{id:'deepseek',models:[{id:'v4',reasoning:{efforts:ids.map(id=>({id,name:id})),defaultEffort:'high'}}]}]}}
test('three genuine DeepSeek levels map to off / high / max',()=>{
  const choices=modelChoices(catalog(['off','high','max']))
  assert.equal(choices.quiet.effort.id,'off');assert.equal(choices.balanced.effort.id,'high');assert.equal(choices.immersive.effort.id,'max')
  assert.equal(choices.immersive.visualOnly,false)
})
test('two-level models expose immersive as a visual extension of actual deep thinking',()=>{
  const choices=modelChoices(catalog(['off','high']))
  assert.equal(choices.immersive.effort.id,'high');assert.equal(choices.immersive.visualOnly,true)
})
test('unknown opaque IDs and missing catalogs never invent a reasoning mapping',()=>{
  assert.equal(modelChoices(catalog(['fast-vendor','premium-vendor'])).quiet.effort,undefined)
  assert.equal(modelChoices(null).immersive.visualOnly,true)
  assert.equal(effortMode('premium-vendor'),null)
})
test('model reasoning defaults are used only when the host has not selected an effort',()=>{
  const snapshot=catalog(['off','high']);delete snapshot.current.reasoningEffort
  assert.equal(modelChoices(snapshot).effective,'high')
})
test('thinking yields to output, tools and human confirmation',()=>{
  assert.equal(activityOf({running:true,partial:{blocks:[{kind:'reasoning',text:'分析'}]}}),'thinking')
  assert.equal(activityOf({running:true,partial:{blocks:[{kind:'text',text:'正文'}]}}),'output')
  assert.equal(activityOf({running:true,runningCalls:[{}]}),'tools')
  assert.equal(activityOf({running:true,pending:[{}]}),'waiting')
  assert.equal(activityOf({running:false},true),'idle')
})
test('once text starts, later reasoning in the same running turn cannot reignite background motion',()=>{
  assert.equal(activityOf({running:true,partial:{blocks:[{kind:'reasoning',text:'又一轮分析'}]}},true),'output')
})
test('invalid persisted settings safely fall back and preserve explicit false switches',()=>{
  assert.equal(validPreferences({mode:'unknown',motion:false,fortune:false,bind:'yes'}).mode,'quiet')
  assert.equal(validPreferences({motion:false}).motion,false)
  assert.equal(validPreferences({bind:'yes'}).bind,true)
})
