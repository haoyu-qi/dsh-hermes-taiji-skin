import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import React,{act} from 'react'
import {createRoot} from 'react-dom/client'
import {Window} from 'happy-dom'
import {blessingDay,validBlessing,drawBlessing} from '../src/blessings.mjs'
const catalog=JSON.parse(fs.readFileSync('assets/deities/catalog.json'))
test('eight unique selectable deities have packaged portraits and real blessing copy',()=>{
  assert.equal(catalog.length,8);assert.equal(new Set(catalog.map(d=>d.id)).size,8)
  for(const [i,d]of catalog.entries()){
    assert.ok(fs.statSync(`assets/deities/${d.id}.webp`).size>1000)
    assert.ok(d.title&&d.wish&&d.note&&d.theme)
    assert.equal(drawBlessing(catalog,'2026-11-01',()=>i/8).id,d.id)
  }
})
test('daily blessing rejects stale dates and removed deities and validates acceptance',()=>{
  const date=blessingDay(new Date(2026,10,1,12))
  assert.equal(date,'2026-11-01')
  assert.equal(validBlessing({day:'2026-10-31',id:catalog[0].id},catalog,date),null)
  assert.equal(validBlessing({day:date,id:'missing'},catalog,date),null)
  assert.equal(validBlessing({day:date,id:catalog[0].id,accepted:'yes'},catalog,date).accepted,false)
})
test('native-card anchor, daily draw, reopen, persistence, disabled feature and cleanup',async()=>{
  const win=new Window({url:'http://localhost/'}),previous={window:globalThis.window,document:globalThis.document,IS_REACT_ACT_ENVIRONMENT:globalThis.IS_REACT_ACT_ENVIRONMENT}
  globalThis.window=win;globalThis.document=win.document;globalThis.IS_REACT_ACT_ENVIRONMENT=true
  win.requestAnimationFrame=()=>1;win.cancelAnimationFrame=()=>{}
  win.HTMLElement.prototype.getBoundingClientRect=function(){return this.hasAttribute('data-composer-card')?{left:100,top:400,right:800,bottom:600,width:700,height:200}:{left:0,top:0,right:0,bottom:0,width:0,height:0}}
  const slots=new Map(),cleanups=[],timers=new Map();let timerId=0,plugin
  win.localStorage.setItem('@local/dsh-hermes-skin/qiankun-v2',JSON.stringify({boot:false}))
  win.__ModuleLoader__={load({factory}){plugin=factory(()=>React)}}
  vm.runInNewContext(fs.readFileSync('client.js','utf8'),{window:win,document:win.document,localStorage:win.localStorage,sessionStorage:win.sessionStorage,ResizeObserver:win.ResizeObserver,Uint32Array,Date,setTimeout:(fn,delay)=>{timers.set(++timerId,{fn,delay});return timerId},clearTimeout:id=>timers.delete(id)})
  plugin.apply({effect(fn){const done=fn();if(typeof done==='function')cleanups.push(done)},theme:{overrideTokens:()=>()=>{}},slots:{inject(name,fn){fn()},register(meta,C){slots.set(meta.id||meta.name,C)}}})
  const node=win.document.createElement('div');win.document.body.append(node);const root=createRoot(node)
  const cardRef=node=>{if(node)node.getBoundingClientRect=()=>({left:100,top:400,right:800,bottom:600,width:700,height:200})}
  const ui=React.createElement(React.Fragment,null,React.createElement('div',{'data-composer-card':true,ref:cardRef},React.createElement('textarea'),React.createElement(slots.get('qiankun-blessing-anchor'))),React.createElement(slots.get('qiankun-blessing')),React.createElement(slots.get('qiankun-depth'),{}),React.createElement(slots.get('qiankun-settings')))
  try{
    await act(async()=>root.render(ui))
    const entry=win.document.querySelector('.qiankun-blessing-button');entry.focus()
    await act(async()=>entry.click())
    const first=JSON.parse(win.localStorage.getItem('@local/dsh-hermes-skin/blessing-v3'))
    assert.ok(catalog.some(d=>d.id===first.id));assert.equal(first.accepted,false)
    assert.match(win.document.querySelector('.qiankun-blessing-art').src,/^data:image\/webp;base64,/)
    const outside=new win.PointerEvent('pointerdown',{bubbles:true,cancelable:true})
    await act(async()=>win.document.querySelector('.qiankun-blessing-outside').dispatchEvent(outside))
    assert.equal(outside.defaultPrevented,true)
    assert.equal(win.document.activeElement,entry)
    await act(async()=>win.document.querySelector('.qiankun-blessing-button').click())
    assert.equal(JSON.parse(win.localStorage.getItem('@local/dsh-hermes-skin/blessing-v3')).id,first.id)
    await act(async()=>win.document.querySelector('.qiankun-blessing-accept').click())
    assert.equal(win.document.querySelector('.qiankun-blessing-card'),null)
    assert.equal(JSON.parse(win.localStorage.getItem('@local/dsh-hermes-skin/blessing-v3')).accepted,true)
    assert.ok(win.document.querySelector('.qiankun-blessing-badge'))
    await act(async()=>win.document.querySelector('.qiankun-blessing-badge').click())
    assert.equal(win.document.querySelector('.qiankun-blessing-accept').textContent,'回到问道')
    await act(async()=>win.document.querySelector('.qiankun-blessing-close').click())
    await act(async()=>win.document.querySelector('.qiankun-trigger').click())
    const option=[...win.document.querySelectorAll('.qiankun-options label')].find(l=>l.textContent==='神明加持').querySelector('input')
    await act(async()=>option.click())
    assert.equal(win.document.querySelector('.qiankun-blessing-entry'),null)
  }finally{
    await act(async()=>root.unmount());cleanups.reverse().forEach(fn=>fn());assert.equal(timers.size,0);await win.happyDOM.abort();Object.assign(globalThis,previous)
  }
})
