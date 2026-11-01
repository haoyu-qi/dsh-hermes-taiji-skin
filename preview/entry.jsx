import React from 'react'
import { createRoot } from 'react-dom/client'
import deities from '../assets/deities/catalog.json'
import { PlusCircle, PuzzlePiece, Clock, GridFour, MagnifyingGlass, SlidersHorizontal, Folder, ChatCircle, CaretDown, Microphone, Plus, Gear, UserCircle, SidebarSimple } from '@phosphor-icons/react'
const h = React.createElement
const previewDeity=id=>{const now=new Date();const day=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');localStorage.setItem('@local/dsh-hermes-skin/blessing-v3',JSON.stringify({day,id,accepted:false}));location.reload()}
let slots = new Map(), disposers = [], themeTokens = {}, directoryListeners = new Set()
let levels = 'three', reject = false
const initialCurrent = { provider: 'preview', model: 'demo', reasoningEffort: 'off' }
let modelState = { current: initialCurrent, groups: [], status:'idle',error:null }
const publish = patch => { modelState = {...modelState,...patch}; directoryListeners.forEach(fn=>fn()) }
function groups() { return [{id:'preview',models:[{id:'demo',reasoning:{defaultEffort:'off',efforts: levels === 'unknown' ? [{id:'custom',name:'厂商自定'}] : [{id:'off',name:'关闭思考'},{id:'high',name:'深度思考'}, ...(levels === 'three' ? [{id:'max',name:'高强度推理'}] : [])]}}]}] }
const directory = { store:{ subscribe(fn){directoryListeners.add(fn);return()=>directoryListeners.delete(fn)},getSnapshot(){return modelState} },
  async load(){publish({groups:groups(),status:'ready',error:null})},
  async select(selection){publish({status:'selecting'}); await new Promise(resolve=>setTimeout(resolve,120)); if(reject){publish({status:'error',error:'preview rejection'});throw new Error('rejected')};publish({current:selection,status:'ready',error:null})},
}
let plugin
window.__ModuleLoader__={load({factory}){plugin=factory(name=>{if(name==='react')return React;throw new Error(name)})}}
await import('./plugin.js')
const tokenStyle=document.createElement('style');document.head.append(tokenStyle)
function scheme(dark){tokenStyle.textContent=':root{'+Object.entries(themeTokens).map(([key,value])=>`${key}:${value[dark?'dark':'light']}`).join(';')+'}'}
const ctx={
  effect(fn){const cleanup=fn();if(typeof cleanup==='function')disposers.push(cleanup)},
  inject(names,fn){fn({...ctx,modelDirectories:{directoryFor(){return directory}},sessions:{subagentAddress(){return undefined}}})},
  theme:{overrideTokens(id,tokens){themeTokens=tokens;scheme(false);return()=>tokenStyle.remove()}},
  slots:{inject(name,fn){fn()},register(meta,component){slots.set(`${meta.name}/${meta.id||''}`,component);return()=>{}}},
}
plugin.apply(ctx)
const selectSlot=(name,id='',props={})=>{const Component=slots.get(`${name}/${id}`);return Component?h(Component,props):null}
function App(){
  const [dark,setDark]=React.useState(false),[panel,setPanel]=React.useState(false),[state,setState]=React.useState('idle'),[draft,setDraft]=React.useState(''),[layout,setLayout]=React.useState('hero'),[collapsed,setCollapsed]=React.useState(false),[enabled,setEnabled]=React.useState(true)
  const [,update]=React.useReducer(n=>n+1,0)
  const directorySnapshot=React.useSyncExternalStore(fn=>{directoryListeners.add(fn);return()=>directoryListeners.delete(fn)},()=>modelState)
  const session={sessionId:'preview',blank:layout==='hero',running:state!=='idle',partial:state==='output'?{blocks:[{kind:'text',text:'这是模型开始输出的正文。'}]}:state==='thinking'?{blocks:[{kind:'reasoning',text:'分析中'}]}:null,runningCalls:state==='tools'?[{}]:[],pending:state==='waiting'?[{}]:[]}
  const input={draft,phase:'plain'}
  const props={sessionId:'preview',session,input,useInput:selector=>selector(input)}
  const send=()=>{if(draft.trim()){setDraft('');setState('thinking');setLayout('chat')}}
  return <div className={'shell '+(collapsed?'collapsed':'')}>
    <div className="titlebar"><SidebarSimple size={21}/><span>应用</span><span>编辑</span><span>帮助</span><div/><small>乾坤问道 V3 · 本地预览</small></div>
    {enabled&&selectSlot('shell.overlay','hermes-ambient')}
    <aside data-slot="sidebar" className="sidebar">
      <button className="sidebar-toggle" onClick={()=>setCollapsed(!collapsed)} aria-label="折叠侧栏"><SidebarSimple size={20}/></button>
      <div className="brand">{selectSlot('sidebar.brand.mark')}<div>{selectSlot('sidebar.brand.name')}</div></div>
      <button className="new-session" onClick={()=>{setLayout('hero');setState('idle')}}><PlusCircle size={23}/><span>新会话</span></button>
      <nav><button><PuzzlePiece size={23}/><span>插件</span></button><button><Clock size={23}/><span>自动化任务</span></button><button><GridFour size={23}/><span>更多</span></button></nav>
      <div className="workspace-title"><span>工作区</span><MagnifyingGlass/><SlidersHorizontal/><Plus/></div>
      <div className="workspace"><Folder size={21}/><span>默认工作区</span><CaretDown size={16}/></div>
      <div className="history"><button className={layout==='hero'?'active':''} onClick={()=>{setLayout('hero');setState('idle')}}><ChatCircle size={21}/><span>新会话</span></button><button className={layout==='chat'?'active':''} onClick={()=>setLayout('chat')}><ChatCircle size={21}/><span>Session greeting</span><small>3分钟前</small></button><button onClick={()=>setLayout('chat')}><ChatCircle size={21}/><span>开场动画插件设计</span><small>21小时前</small></button></div>
      <div className="profile"><UserCircle size={36}/><span>问道者</span><button onClick={()=>setPanel(!panel)} aria-label="打开预览控制"><Gear size={20}/></button></div>
    </aside>
    <main className={layout==='chat'?'chat':''}>
      {layout==='chat'&&<article className="conversation"><p className="user-message">如何让复杂问题的分析更清晰？</p><h2>先分清目标，再拆解约束。</h2><p>将问题分成可验证的几个部分，明确每一步需要什么证据。</p><pre><code>{'const clarity = question => {\n  return { goal: question.goal, evidence: [] }\n}'}</code></pre><table><thead><tr><th>步骤</th><th>关注点</th></tr></thead><tbody><tr><td>定义</td><td>目标与边界</td></tr><tr><td>验证</td><td>事实与证据</td></tr></tbody></table><p className="state-label">{state==='thinking'?'推理中…':state==='output'?'正在输出…':state==='tools'?'工具执行中…':'思考已收敛'}</p></article>}
      <section className="composer-seat">
        {layout==='hero'&&<div className="hero"><h1>探索未至之境 <small>预览版</small></h1><p>问道 · 思考 · 创造 · 与更大的可能相遇</p></div>}
        <div data-slot="conversation.composer.bar"><div data-composer-card>
          <textarea aria-label="输入消息" placeholder="描述你想要构建的内容、调用指令、@ 文件或对话…" value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!e.nativeEvent.isComposing){e.preventDefault();send()}}}/>
          <div className="toolbar"><button aria-label="添加附件"><Plus size={21}/></button><button className="access"><Folder size={16}/>工作区内修改<CaretDown size={13}/></button><div className="depth-slot">{enabled&&selectSlot('conversation.input.left','qiankun-depth',props)}</div><div className="toolbar-spacer"/>{enabled&&selectSlot('conversation.input.right','qiankun-blessing-anchor',props)}<button className="model">GLM-5.3-Flash<CaretDown size={14}/></button><button aria-label="语音输入"><Microphone size={22}/></button><button className={'send '+(state==='idle'?'_primary':'')} aria-label={state==='idle'?'发送':'停止生成'} onClick={()=>state==='idle'?send():setState('idle')}>{state==='idle'?<svg width="24" height="24"><path d="M12 20V4M5 11L12 4L19 11" fill="none" stroke="currentColor" strokeWidth="2"/></svg>:<span className="stop"/>}</button></div>
        </div></div>
        <div className="dock">{enabled&&selectSlot('conversation.composer.dock','hermes-motto',props)}{enabled&&selectSlot('conversation.composer.dock','hermes-send-taiji',props)}</div>
      </section>
    </main>
    {enabled&&selectSlot('shell.overlay','hermes-fortune')}{enabled&&selectSlot('shell.overlay','qiankun-settings')}{enabled&&selectSlot('shell.overlay','qiankun-blessing')}{enabled&&selectSlot('shell.overlay','hermes-send-taiji')}{enabled&&selectSlot('shell.overlay','hermes-boot')}
    {panel&&<section className="lab" aria-label="预览控制"><strong>仿宿主测试控制</strong><p>以下只改变预览夹具，不会调用模型。</p><label>预览神明<select aria-label="预览神明" defaultValue="" onChange={e=>previewDeity(e.target.value)}><option value="" disabled>选择测试画像</option>{deities.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select></label><label>会话状态<select aria-label="预览会话状态" value={state} onChange={e=>setState(e.target.value)}><option value="idle">空闲</option><option value="thinking">思考中</option><option value="output">正文输出</option><option value="tools">工具执行</option><option value="waiting">等待确认</option></select></label><label>模型目录<select aria-label="预览模型目录" value={levels} onChange={e=>{levels=e.target.value;directory.load();update()}}><option value="three">三档 off/high/max</option><option value="two">两档 off/high</option><option value="unknown">未知厂商档位</option></select></label><label><input type="checkbox" checked={reject} onChange={e=>{reject=e.target.checked;update()}}/>模拟模型切换失败</label><button onClick={()=>{setDark(!dark);scheme(!dark)}}>切换{dark?'浅色':'深色'}</button><button onClick={()=>setLayout(layout==='hero'?'chat':'hero')}>切换长文阅读布局</button><button onClick={()=>setEnabled(!enabled)}>{enabled?'停用皮肤':'恢复皮肤'}</button><small>宿主档位：{directorySnapshot.current?.reasoningEffort}</small><button onClick={()=>setPanel(false)}>关闭预览控制</button></section>}
  </div>
}
createRoot(document.getElementById('app')).render(<App/> )
