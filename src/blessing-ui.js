    const blessingKey = PKG + '/blessing-v3'
    let blessingRecord = null
    try { blessingRecord = validBlessing(JSON.parse(localStorage.getItem(blessingKey)), DEITIES, blessingDay()) } catch {}
    function saveBlessing(value) {
      blessingRecord=value
      try { localStorage.setItem(blessingKey,JSON.stringify(value)) } catch {}
    }
    function blessingRandom() {
      try { const bytes=new Uint32Array(1);window.crypto.getRandomValues(bytes);return bytes[0]/4294967296 } catch { return Math.random() }
    }
    let blessingAnchor=null
    const blessingAnchorListeners=new Set()
    const subscribeBlessingAnchor=fn=>{blessingAnchorListeners.add(fn);return()=>blessingAnchorListeners.delete(fn)}
    const notifyBlessingAnchor=()=>blessingAnchorListeners.forEach(fn=>fn())
    // The native input remains untouched. A slot-local marker reports its real card bounds.
    function QiankunBlessingAnchor({ session }) {
      const marker=React.useRef(null)
      const token=React.useRef({})
      React.useLayoutEffect(()=>{
        const card=marker.current?.closest('[data-composer-card]')
        if(!card)return
        let raf=null,until=0
        const update=()=>{
          const rect=card.getBoundingClientRect()
          if(rect.width<=0||rect.height<=0){if(blessingAnchor?.token===token.current){blessingAnchor=null;notifyBlessingAnchor()}return}
          const next={token:token.current,left:rect.left,top:rect.top,right:rect.right,bottom:rect.bottom,width:rect.width}
          if(!blessingAnchor||['left','top','right','bottom','width'].some(k=>next[k]!==blessingAnchor[k])){blessingAnchor=next;notifyBlessingAnchor()}
        }
        const track=()=>{update();if(Date.now()<until)raf=window.requestAnimationFrame(track);else raf=null}
        const transition=()=>{until=Date.now()+500;if(raf===null)raf=window.requestAnimationFrame(track)}
        update();transition()
        const observer=typeof ResizeObserver==='function'?new ResizeObserver(update):null
        const layoutObserver=typeof MutationObserver==='function'?new MutationObserver(transition):null
        // A centered card can move without changing its own dimensions (e.g. sidebar collapse).
        for(let node=card;node;node=node.parentElement){
          observer?.observe(node)
          layoutObserver?.observe(node,{attributes:true})
          if(node===document.body)break
        }
        window.addEventListener('resize',update);window.addEventListener('scroll',update,true);document.addEventListener('transitionrun',transition,true)
        return()=>{observer?.disconnect();layoutObserver?.disconnect();if(raf!==null)window.cancelAnimationFrame(raf);window.removeEventListener('resize',update);window.removeEventListener('scroll',update,true);document.removeEventListener('transitionrun',transition,true);if(blessingAnchor?.token===token.current){blessingAnchor=null;notifyBlessingAnchor()}}
      },[session?.sessionId,session?.blank])
      return h('span',{className:'qiankun-blessing-anchor',ref:marker,'aria-hidden':true})
    }
    function QiankunBlessingLayer() {
      const prefs=usePreferences(),reduced=useReducedMotion()
      const anchor=React.useSyncExternalStore(subscribeBlessingAnchor,()=>blessingAnchor)
      const [record,setRecord]=React.useState(blessingRecord)
      const [open,setOpen]=React.useState(false)
      const [viewport,setViewport]=React.useState(()=>({width:window.innerWidth,height:window.innerHeight}))
      const ref=React.useRef(null)
      useDialog(open,ref,()=>setOpen(false))
      React.useEffect(()=>{
        const resize=()=>setViewport({width:window.innerWidth,height:window.innerHeight})
        window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize)
      },[])
      React.useEffect(()=>{
        let timer
        const refresh=()=>{
          const valid=validBlessing(blessingRecord,DEITIES,blessingDay())
          if(!valid){saveBlessing(null);setRecord(null);setOpen(false)}
          clearTimeout(timer);const now=new Date()
          timer=setTimeout(refresh,new Date(now.getFullYear(),now.getMonth(),now.getDate()+1).getTime()-now.getTime()+1000)
        }
        refresh();document.addEventListener('visibilitychange',refresh)
        return()=>{clearTimeout(timer);document.removeEventListener('visibilitychange',refresh)}
      },[])
      React.useEffect(()=>{if(!prefs.blessing||!anchor)setOpen(false)},[prefs.blessing,Boolean(anchor)])
      if(!anchor||!prefs.blessing)return null
      const deity=DEITIES.find(d=>d.id===record?.id)
      const show=()=>{
        const today=validBlessing(blessingRecord,DEITIES,blessingDay())||drawBlessing(DEITIES,blessingDay(),blessingRandom)
        saveBlessing(today);setRecord(today);setOpen(true)
      }
      const accept=()=>{const value={...record,accepted:true};saveBlessing(value);setRecord(value);setOpen(false)}
      const width=Math.min(340,viewport.width-24)
      const estimatedHeight=Math.min(550,viewport.height-24)
      const left=Math.max(12,Math.min(viewport.width-width-12,anchor.right-width))
      const top=anchor.top>estimatedHeight+24?anchor.top-estimatedHeight-10:Math.max(12,Math.min(viewport.height-estimatedHeight-12,anchor.top+50))
      return h('div',{className:'qiankun-blessing-layer','data-motion':prefs.motion&&!reduced?'on':'off'},
        h('div',{className:'qiankun-blessing-entry',style:{top:Math.max(8,anchor.top+12),right:Math.max(12,viewport.width-anchor.right+18),maxWidth:Math.max(95,anchor.width-32)}},
          record?.accepted&&deity&&h('button',{type:'button',className:'qiankun-blessing-badge',onClick:show,title:deity.name+' · '+deity.theme,'aria-label':'查看今日加持：'+deity.name},h('span',{className:'qiankun-blessing-seal','aria-hidden':true},deity.short),h('span',null,deity.theme)),
          h('button',{type:'button',className:'qiankun-blessing-button',onClick:show,title:'每天随机一位，当天结果固定','aria-haspopup':'dialog','aria-expanded':open,'aria-label':'随机神明加持'},h('span',{className:'qiankun-blessing-seal','aria-hidden':true},'祈'),'加持')),
        open&&deity&&h(React.Fragment,null,
          h('div',{className:'qiankun-blessing-outside',onPointerDown:e=>{e.preventDefault();setOpen(false)},'aria-hidden':true}),
          h('section',{className:'qiankun-blessing-card',ref,role:'dialog','aria-modal':true,'aria-label':deity.title,tabIndex:-1,style:{left,top,width,maxHeight:viewport.height-24}},
            h('button',{type:'button',className:'qiankun-dismiss qiankun-blessing-close',onClick:()=>setOpen(false),'aria-label':'关闭加持'},'×'),
            h('img',{className:'qiankun-blessing-art',src:DEITY_ART[deity.id],alt:deity.name+'工笔画像',width:640,height:720}),
            h('div',{className:'qiankun-blessing-copy'},h('span',{className:'qiankun-blessing-name'},deity.name),h('h2',null,deity.title),h('p',{className:'qiankun-blessing-wish'},deity.wish),h('p',{className:'qiankun-blessing-note'},deity.note),
              h('button',{type:'button',className:'qiankun-action qiankun-blessing-accept',onClick:accept},record.accepted?'回到问道':'收下祝愿'),
              h('small',null,'文化祝愿 · 不改变模型能力')))))
    }
