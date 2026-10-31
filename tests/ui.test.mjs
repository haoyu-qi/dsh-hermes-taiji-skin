import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { Window } from 'happy-dom'

test('actual plugin reacts to external model changes, hook-only host snapshots and daily reading visibility', async () => {
  const win = new Window({ url:'http://localhost/' })
  const previous = {window:globalThis.window,document:globalThis.document,IS_REACT_ACT_ENVIRONMENT:globalThis.IS_REACT_ACT_ENVIRONMENT}
  globalThis.window=win;globalThis.document=win.document;globalThis.IS_REACT_ACT_ENVIRONMENT=true
  win.localStorage.setItem('@local/dsh-hermes-skin/qiankun-v2',JSON.stringify({mode:'quiet',follow:false,motion:true,fortune:true,boot:false}))
  const slots=new Map(), cleanups=[], subscribers=new Set()
  const timers=new Map();let timerId=0
  const later=(fn,delay)=>{timers.set(++timerId,{fn,delay});return timerId}
  const cancel=id=>timers.delete(id)
  const advance=delay=>{for(const [id,timer] of [...timers])if(timer.delay<=delay){timers.delete(id);timer.fn()}}
  let snapshot={current:{provider:'test',model:'model',reasoningEffort:'high'},groups:[{id:'test',models:[{id:'model',reasoning:{efforts:[{id:'off',name:'off'},{id:'high',name:'high'},{id:'max',name:'max'}]}}]}],status:'ready',error:null}
  let session={sessionId:'test',running:false,blank:true,partial:null}
  const directory={store:{getSnapshot:()=>snapshot,subscribe:fn=>{subscribers.add(fn);return()=>subscribers.delete(fn)}},load:async()=>{},select:async()=>{}}
  const ctx={effect(fn){const done=fn();if(typeof done==='function')cleanups.push(done)},inject(names,fn){fn({...ctx,modelDirectories:{directoryFor:()=>directory},sessions:{subagentAddress:()=>undefined}})},theme:{overrideTokens:()=>()=>{}},slots:{inject(name,fn){fn()},register(meta,component){slots.set(meta.id||meta.name,component)}}}
  let plugin
  win.__ModuleLoader__={load({factory}){plugin=factory(()=>React)}}
  vm.runInNewContext(fs.readFileSync('client.js','utf8'),{window:win,document:win.document,localStorage:win.localStorage,sessionStorage:win.sessionStorage,ResizeObserver:win.ResizeObserver,setTimeout:later,clearTimeout:cancel,Date})
  plugin.apply(ctx)
  const node=win.document.createElement('div');win.document.body.append(node);const root=createRoot(node)
  const render=()=>React.createElement(React.Fragment,null,React.createElement(slots.get('hermes-ambient')),React.createElement(slots.get('sidebar.brand.name')),React.createElement(slots.get('qiankun-depth'),{sessionId:'test',useSession:selector=>selector(session)}),React.createElement(slots.get('qiankun-settings')),React.createElement(slots.get('hermes-fortune')),React.createElement('div',{'data-composer-card':true}))
  try {
    await act(async()=>root.render(render()))
    assert.equal(win.document.documentElement.dataset.qiankunMode,'quiet')
    assert.equal(win.document.documentElement.dataset.qiankunReasoning,'balanced')
    assert.equal(win.document.documentElement.dataset.qiankunRotating,'on')
    const daily=win.document.querySelector('.qiankun-daily-good')
    assert.match(daily.textContent,/今日宜/)
    assert.match(daily.title,/今日宜：.+/)
    snapshot={...snapshot,current:{...snapshot.current,reasoningEffort:'max'}}
    await act(async()=>subscribers.forEach(fn=>fn()))
    assert.equal(win.document.documentElement.dataset.qiankunReasoning,'immersive')
    assert.match(win.document.querySelector('.qiankun-ambient').getAttribute('style'),/48s/)
    session={...session,running:true,blank:false,partial:{blocks:[{kind:'text',text:'正文'}]}}
    await act(async()=>root.render(render()))
    assert.equal(win.document.documentElement.dataset.qiankunState,'output')
    assert.equal(win.document.documentElement.dataset.qiankunRotating,'off')
    snapshot={...snapshot,current:{...snapshot.current,reasoningEffort:'off'}}
    await act(async()=>subscribers.forEach(fn=>fn()))
    assert.equal(win.document.documentElement.dataset.qiankunReasoning,'quiet')
    assert.equal(win.getComputedStyle(win.document.querySelector('[data-composer-card]')).borderTopWidth,'1.5px')
    await act(async()=>win.document.querySelector('.qiankun-trigger').click())
    assert.equal(win.document.querySelector('.qiankun-mode[aria-pressed=true] .qiankun-selected').textContent,'已选')
    await act(async()=>win.document.querySelector('.qiankun-settings .qiankun-dismiss').click())
    await act(async()=>win.document.querySelector('.hermes-fortune-trigger').click())
    await act(async()=>advance(900))
    await act(async()=>win.document.querySelector('[data-fortune-action]').click())
    const goodText=win.document.querySelector('.qiankun-tags>span').textContent.replace(/^宜/,'')
    assert.equal(daily.title,'今日宜：'+goodText)
    await act(async()=>win.document.querySelector('[data-fortune-action]').click())
    assert.equal(win.document.querySelectorAll('.qiankun-edict-aura').length,1)
    assert.equal(win.document.querySelectorAll('.qiankun-edict-motes i').length,8)
    await act(async()=>advance(2399))
    assert.ok(win.document.querySelector('.qiankun-cast'))
    await act(async()=>advance(2400))
    assert.equal(win.document.querySelector('.qiankun-cast'),null)
    assert.ok(win.document.querySelector('.qiankun-stored'))
  } finally {
    await act(async()=>root.unmount())
    cleanups.reverse().forEach(fn=>fn())
    assert.equal(win.document.documentElement.hasAttribute('data-qiankun-rotating'),false)
    assert.equal(subscribers.size,0)
    assert.equal(timers.size,0)
    await win.happyDOM.abort()
    Object.assign(globalThis,previous)
  }
})
