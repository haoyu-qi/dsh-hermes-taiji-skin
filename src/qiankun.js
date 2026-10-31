    // Shared state lives inside the plugin factory and is disposed with slot effects.
    const preferenceKey = PKG + '/qiankun-v2'
    let preferences = validPreferences(null)
    try { preferences = validPreferences(JSON.parse(localStorage.getItem(preferenceKey))) } catch {}
    const listeners = new Set()
    let visual = { mode: 'quiet', activity: 'idle', hasContent: false, connected: false }
    let modelResolver = null
    let resolverRevision = 0
    const notify = () => listeners.forEach(fn => fn())
    const subscribe = fn => { listeners.add(fn); return () => listeners.delete(fn) }
    function setPreferences(patch) {
      preferences = validPreferences({ ...preferences, ...patch })
      try { localStorage.setItem(preferenceKey, JSON.stringify(preferences)) } catch {}
      notify()
    }
    function usePreferences() {
      return React.useSyncExternalStore(subscribe, () => preferences)
    }
    function useVisual() { return React.useSyncExternalStore(subscribe, () => visual) }
    function connectModelDirectory(ctx) {
      // Optional integration: older hosts still get the full visual skin.
      if (typeof ctx.inject !== 'function') return
      ctx.inject(['modelDirectories', 'sessions'], scope => {
        const resolver = { models: scope.modelDirectories, sessions: scope.sessions }
        modelResolver = resolver; resolverRevision++; notify()
        scope.effect(() => () => {
          if (modelResolver === resolver) { modelResolver = null; resolverRevision++; notify() }
        }, 'qiankun: optional model directory bridge')
      })
    }
    const EMPTY_MODELS = { current: null, groups: [], status: 'idle', error: null }
    function useModelDirectory(sessionId) {
      const revision = React.useSyncExternalStore(subscribe, () => resolverRevision)
      const directory = React.useMemo(() => {
        try {
          if (!modelResolver || !sessionId || modelResolver.sessions.subagentAddress(sessionId) !== undefined) return null
          return modelResolver.models.directoryFor(sessionId)
        } catch { return null }
      }, [sessionId, revision])
      const store = directory?.store
      const snapshot = React.useSyncExternalStore(
        React.useCallback(fn => store ? store.subscribe(fn) : () => {}, [store]),
        React.useCallback(() => store ? store.getSnapshot() : EMPTY_MODELS, [store]),
      )
      React.useEffect(() => { if (directory) directory.load().catch(() => {}) }, [directory])
      return { directory, snapshot }
    }
    function useReducedMotion() {
      const [reduce, setReduce] = React.useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false)
      React.useEffect(() => {
        const query = window.matchMedia?.('(prefers-reduced-motion: reduce)')
        if (!query) return
        const update = () => setReduce(query.matches)
        query.addEventListener('change', update)
        return () => query.removeEventListener('change', update)
      }, [])
      return reduce
    }
    function useDialog(open, ref, close) {
      const closeRef = React.useRef(close); closeRef.current = close
      React.useEffect(() => {
        if (!open || !ref.current) return
        const node = ref.current
        const previous = document.activeElement
        const items = () => [...node.querySelectorAll('button:not(:disabled),input,select,[tabindex="0"]')]
        ;(items()[0] || node).focus()
        const key = e => {
          if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeRef.current(); return }
          if (e.key !== 'Tab') return
          const list = items(), first = list[0] || node, last = list.at(-1) || node
          if (e.shiftKey && (document.activeElement === first || !node.contains(document.activeElement))) { e.preventDefault(); last.focus() }
          else if (!e.shiftKey && (document.activeElement === last || !node.contains(document.activeElement))) { e.preventDefault(); first.focus() }
        }
        document.addEventListener('keydown', key, true)
        return () => { document.removeEventListener('keydown', key, true); if (previous?.isConnected) previous.focus() }
      }, [open])
    }
    const replayListeners = new Set()
    let settingsPanel = null
    const settingsListeners = new Set()
    const subscribeSettings = fn => { settingsListeners.add(fn); return () => settingsListeners.delete(fn) }
    const notifySettings = () => settingsListeners.forEach(fn => fn())
    function QiankunSettingsPublisher({ children, dialogRef, close }) {
      React.useLayoutEffect(() => { settingsPanel = { node: children, dialogRef, close }; notifySettings() }, [children])
      React.useEffect(() => () => { settingsPanel = null; notifySettings() }, [])
      return null
    }
    function QiankunSettingsLayer() {
      const value = React.useSyncExternalStore(subscribeSettings, () => settingsPanel)
      const fallback = React.useRef(null)
      useDialog(Boolean(value?.node), value?.dialogRef || fallback, () => value?.close())
      return value?.node || null
    }
    function QiankunControls({ sessionId, session, input }) {
      const prefs = usePreferences()
      const reduced = useReducedMotion()
      const { directory, snapshot } = useModelDirectory(sessionId || session?.sessionId)
      const choices = modelChoices(snapshot)
      const mode = prefs.follow ? effortMode(choices.effective) || prefs.mode : prefs.mode
      const [open, setOpen] = React.useState(false)
      const [error, setError] = React.useState('')
      const [busy, setBusy] = React.useState(false)
      const dialog = React.useRef(null)
      const request = React.useRef(0)
      const lastSession = React.useRef(null)
      const outputSeen = React.useRef(false)
      const sessionKey = sessionId || session?.sessionId
      if (lastSession.current !== sessionKey || !session?.running) { outputSeen.current = false; lastSession.current = sessionKey }
      const activity = activityOf(session, outputSeen.current)
      if (activity === 'output') outputSeen.current = true
      React.useEffect(() => {
        visual = { mode, activity, hasContent: session?.blank === false, connected: Boolean(session) }
        notify()
      }, [mode, activity, session?.blank, Boolean(session)])
      React.useEffect(() => () => { visual = { ...visual, activity: 'idle', connected: false }; notify() }, [])
      React.useEffect(() => { request.current++; setBusy(false); setError(''); return () => { request.current++ } }, [directory])
      const choose = async id => {
        if (busy || snapshot.status === 'selecting' || snapshot.status === 'loading') return
        const ticket = ++request.current
        const target = choices[id]
        setError('')
        if (prefs.bind && directory && target.effort && choices.current) {
          setBusy(true)
          try {
            await directory.select({ ...choices.current, reasoningEffort: target.effort.id })
            if (request.current !== ticket) return
          } catch {
            if (request.current === ticket) setError('推理设置未被接受，已保留原档位。请重试。')
            return
          } finally { if (request.current === ticket) setBusy(false) }
        }
        if (request.current === ticket) setPreferences({ mode: id, follow: Boolean(prefs.bind && directory && target.effort && !target.visualOnly) })
      }
      const selecting = busy || snapshot.status === 'selecting' || snapshot.status === 'loading'
      return h(React.Fragment, null,
        h('button', { className: 'qiankun-trigger', type: 'button', onClick: () => setOpen(true), 'aria-haspopup': 'dialog', title: '乾坤问道 · 思考与外观' },
          h('span', { className: 'qiankun-trigger-mark', 'aria-hidden': true }, h(TaijiMark, { size: 16 })), MODES.find(m => m.id === mode).title + (mode === 'immersive' && (!prefs.bind || !directory || choices.immersive.visualOnly) ? ' · 视觉' : '')),
        h(QiankunSettingsPublisher, { dialogRef: dialog, close: () => setOpen(false) }, open && h('div', { className: 'qiankun-dialog-backdrop', onPointerDown: e => { if (e.target === e.currentTarget) setOpen(false) } },
          h('section', { className: 'qiankun-settings', role: 'dialog', 'aria-modal': true, 'aria-label': '乾坤问道设置', ref: dialog, tabIndex: -1 },
            h('div', { className: 'qiankun-settings-head' }, h('div', null, h('small', null, 'DEEPSEEK / 乾坤问道'), h('h2', null, '动静之间，自有乾坤')), h('button', { type: 'button', className: 'qiankun-dismiss', onClick: () => setOpen(false), 'aria-label': '关闭设置' }, '×')),
            h('div', { className: 'qiankun-modes', role: 'group', 'aria-label': '思考深度' }, MODES.map(m => h('button', {
              key: m.id, type: 'button', className: 'qiankun-mode', disabled: selecting, 'aria-pressed': mode === m.id, onClick: () => choose(m.id),
            }, h('strong', null, m.title), h('span', null, m.note), h('small', null, prefs.bind && directory && choices[m.id].effort ? choices[m.id].visualOnly ? '视觉沉浸 · 沿用 ' + choices[m.id].effort.name : '模型推理 · ' + choices[m.id].effort.name : '仅视觉氛围')))),
            h('p', { className: 'qiankun-setting-note' }, directory ? '以模型实际支持的档位为准。正文输出后，动效自动收敛。' : '当前宿主未提供推理档位，切换只改变视觉氛围。'),
            error && h('p', { role: 'alert', className: 'qiankun-error' }, error),
            snapshot.status === 'error' && h('button', { type: 'button', className: 'qiankun-action', onClick: () => directory?.load().catch(() => {}) }, '重新获取模型档位'),
            h('div', { className: 'qiankun-options' },
              [['follow', '跟随实际模型档位'], ['bind', '切换时同步模型推理'], ['motion', '主题动态效果'], ['fortune', '每日卦象'], ['boot', '首次开场动画']].map(([key, label]) => h('label', { key }, h('input', { type: 'checkbox', checked: prefs[key], onChange: e => setPreferences({ [key]: e.target.checked }) }), label))),
            reduced && h('p', { className: 'qiankun-setting-note' }, '已遵从系统“减少动态效果”设置。'),
            h('div', { className: 'qiankun-settings-foot' }, h('button', { type: 'button', className: 'qiankun-action', disabled: !prefs.motion || reduced, onClick: () => { setOpen(false); replayListeners.forEach(fn => fn()) } }, '重看开场'), prefs.fortune && h('button', { type: 'button', className: 'qiankun-action', onClick: () => { setOpen(false); openFortune() } }, '今日一卦'), h('button', { type: 'button', className: 'qiankun-action qiankun-action--primary', onClick: () => setOpen(false) }, '回到问道'))))))
    }
    function QiankunStatus() {
      const value = useVisual()
      return h('span', { className: 'qiankun-status', role: 'status', 'aria-live': 'polite' },
        h('span', { className: 'qiankun-status-dot', 'aria-hidden': true }),
        { idle: '命运可见 · 智慧可行 · 自在而生', thinking: '阴阳流转 · 推演之中', output: '思绪成文 · 静阅其间', tools: '行有所依 · 工具执行中', waiting: '静候你的回应' }[value.activity])
    }
    function QiankunAmbient() {
      const prefs = usePreferences(), value = useVisual(), reduced = useReducedMotion()
      const ref = React.useRef(null)
      React.useEffect(() => {
        const root = document.documentElement
        const sidebar = document.querySelector('[data-slot="sidebar"]')
        const update = () => ref.current?.style.setProperty('--q-left', Math.max(0, sidebar?.getBoundingClientRect().right || 0) + 'px')
        update()
        const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(update) : null
        if (sidebar) observer?.observe(sidebar)
        window.addEventListener('resize', update)
        const attrs = ['data-qiankun', 'data-qiankun-mode', 'data-qiankun-state', 'data-qiankun-motion', 'data-qiankun-content', 'data-qiankun-fortune']
        const previous = attrs.map(name => root.getAttribute(name))
        return () => { observer?.disconnect(); window.removeEventListener('resize', update); attrs.forEach((name, i) => previous[i] === null ? root.removeAttribute(name) : root.setAttribute(name, previous[i])) }
      }, [])
      React.useEffect(() => {
        const root = document.documentElement
        root.dataset.qiankun = 'true'; root.dataset.qiankunMode = value.mode
        root.dataset.qiankunState = value.activity; root.dataset.qiankunMotion = prefs.motion && !reduced ? 'on' : 'off'
        root.dataset.qiankunContent = value.hasContent ? 'yes' : 'no'; root.dataset.qiankunFortune = prefs.fortune ? 'on' : 'off'
      }, [prefs, value, reduced])
      return h('div', { className: 'qiankun-ambient', 'aria-hidden': true, ref },
        h('div', { className: 'qiankun-landscape', style: { backgroundImage: `url("${QIANKUN_ART}")` } }),
        h('div', { className: 'qiankun-orb' }, h(BaguaPlate, { compact: true })),
        h('div', { className: 'qiankun-orb-echo' }, h(BaguaPlate, { compact: true })),
        h(Inscription),
        h('div', { className: 'qiankun-mist' }),
        STARS.slice(0, 8).map((s, i) => h('i', { key: i, className: 'qiankun-mote', style: { top: s.top, left: s.left, animationDelay: s.delay } })))
    }
    function QiankunFortune() {
      const prefs = usePreferences(), reduced = useReducedMotion()
      const motion = prefs.motion && !reduced
      const [reading, setReading] = React.useState(null)
      const [phase, setPhase] = React.useState('closed')
      const [accepted, setAccepted] = React.useState(null)
      const [casting, setCasting] = React.useState(null)
      const ref = React.useRef(null)
      const close = () => { setPhase('closed'); setReading(null) }
      useDialog(reading !== null, ref, close)
      React.useEffect(() => {
        const open = () => { if (!preferences.fortune) return; setReading(fortuneOfDay()); setPhase('rising') }
        fortuneOpeners.add(open)
        return () => fortuneOpeners.delete(open)
      }, [])
      React.useEffect(() => { if (!prefs.fortune) { close(); setAccepted(null); setCasting(null) } }, [prefs.fortune])
      React.useEffect(() => {
        if (phase !== 'rising') return
        const timer = setTimeout(() => setPhase('shown'), motion ? 900 : 20)
        return () => clearTimeout(timer)
      }, [phase, motion])
      React.useEffect(() => {
        if (!casting) return
        const timer = setTimeout(() => setCasting(null), motion ? 1700 : 200)
        return () => clearTimeout(timer)
      }, [casting, motion])
      React.useEffect(() => { if (phase === 'shown' || phase === 'reading') ref.current?.querySelector('[data-fortune-action]')?.focus() }, [phase])
      const accept = () => { setCasting({ ...reading, stamp: Date.now() }); setAccepted(reading); close() }
      if (!prefs.fortune) return null
      return h(React.Fragment, null,
        reading && h('div', { className: 'hermes-fortune qiankun-fortune', onPointerDown: e => { if (e.target === e.currentTarget) close() } },
          h('section', { className: 'qiankun-reading ' + (phase === 'reading' ? 'qiankun-reading--open' : 'qiankun-reading--slip'), role: 'dialog', 'aria-modal': true, 'aria-label': '今日卦象', tabIndex: -1, ref },
            h('div', { className: 'qiankun-reading-art', 'aria-hidden': true, style: { backgroundImage: `url("${QIANKUN_ART}")` } }),
            phase === 'reading' && h('div', { className: 'qiankun-reading-watermark', 'aria-hidden': true }, h(BaguaPlate, { compact: true })),
            h('header', { className: 'qiankun-reading-head' }, h('span', null, '今日占卜'), h('time', null, reading.dateText), h('button', { className: 'qiankun-dismiss', type: 'button', 'aria-label': '关闭卦象', onClick: close }, '×')),
            phase === 'reading' ? h(React.Fragment, null,
              h('div', { className: 'qiankun-reading-core' }, h(FortuneTrigram, { pattern: reading.pattern }), h('h2', null, reading.gua + '卦'), h('span', { className: 'hermes-fortune-grade' }, reading.grade)),
              h('div', { className: 'qiankun-poem' }, reading.poem.map((line, i) => h('p', { key: i }, line))),
              h('p', { className: 'qiankun-interpretation' }, reading.read),
              h('div', { className: 'qiankun-tags' }, h('span', null, h('b', null, '宜'), reading.good), h('span', null, h('b', null, '忌'), reading.bad)))
            : h('div', { className: 'qiankun-slip-stage', 'data-phase': phase },
              h('div', { className: 'qiankun-ritual-aura', 'aria-hidden': true }, h(BaguaPlate, { compact: true })),
              h('div', { className: 'qiankun-slip' }, h(HexagramGlyph, { pattern: reading.pattern }), h('strong', null, reading.gua), h('span', null, reading.grade)),
              h('p', { role: 'status' }, phase === 'rising' ? '起卦 · 静候一念' : '卦象已显，愿有所启。')),
            h('footer', { className: 'qiankun-reading-foot' }, h('span', null, '每日一签 · 图个心安'), h('button', { type: 'button', className: 'qiankun-action', 'data-fortune-action': true, disabled: phase === 'rising', onClick: phase === 'reading' ? accept : () => setPhase('reading') }, phase === 'reading' ? '收下' : phase === 'rising' ? '起卦中…' : '解卦')))),
        casting && h('div', { className: 'qiankun-cast' }, h(TalismanCast, { key: casting.stamp, reading: casting })),
        accepted && h('aside', { className: 'qiankun-stored', 'aria-label': '今日卦象' },
          h('button', { className: 'qiankun-stored-close', type: 'button', 'aria-label': '收起今日卦象', onClick: () => setAccepted(null) }, '×'),
          h('button', { type: 'button', className: 'qiankun-stored-open', onClick: () => { setReading(accepted); setPhase('reading') } },
            h('small', null, '今日卦象'), h(HexagramGlyph, { pattern: accepted.pattern }), h('strong', null, hexagramName(accepted)), h('span', null, accepted.grade))))
    }
    let bootPlayed = false
    function QiankunBoot() {
      const prefs = usePreferences(), reduced = useReducedMotion()
      // Session storage means once per renderer session, including reload/HMR. Replay is explicit.
      const [show, setShow] = React.useState(() => {
        if (bootPlayed || !prefs.boot || !prefs.motion || reduced) return false
        try { if (sessionStorage.getItem(PKG + '/qiankun-boot')) return false; sessionStorage.setItem(PKG + '/qiankun-boot', 'seen') } catch {}
        bootPlayed = true
        return true
      })
      const [replay, setReplay] = React.useState(0)
      const [stage, setStage] = React.useState('chaos')
      React.useEffect(() => {
        const open = () => { if (!preferences.motion || reduced) return; setReplay(n => n + 1); setShow(true) }
        replayListeners.add(open); return () => replayListeners.delete(open)
      }, [reduced])
      React.useEffect(() => { if (!prefs.motion || reduced) setShow(false) }, [prefs.motion, reduced])
      React.useEffect(() => {
        if (!show) return
        setStage('chaos')
        const stages = [setTimeout(() => setStage('taiji'), 700), setTimeout(() => setStage('bagua'), 1800), setTimeout(() => setStage('converge'), 3500)]
        const timer = setTimeout(() => setShow(false), 4200)
        return () => { clearTimeout(timer); stages.forEach(clearTimeout) }
      }, [show, replay])
      React.useEffect(() => {
        if (!show) return
        const key = e => { if (e.key === 'Escape' || e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); setShow(false) } }
        window.addEventListener('keydown', key, true)
        return () => window.removeEventListener('keydown', key, true)
      }, [show])
      const ref = React.useRef(null)
      React.useEffect(() => {
        if (!show) return
        const previous = document.activeElement
        ref.current?.focus()
        return () => { if (previous?.isConnected) previous.focus() }
      }, [show])
      if (!show) return null
      return h('div', { key: replay, className: 'qiankun-boot', 'data-stage': stage, role: 'dialog', 'aria-modal': true, 'aria-label': '乾坤问道开场', tabIndex: -1, ref, onClick: () => setShow(false), onKeyDown: e => { if (e.key === 'Tab') { e.preventDefault(); ref.current?.querySelector('button')?.focus() } } },
        h('div', { className: 'qiankun-boot-landscape', 'aria-hidden': true, style: { backgroundImage: `url("${QIANKUN_ART}")` } }),
        h('p', { className: 'qiankun-boot-top' }, BOOT_POEM.top),
        h('p', { className: 'qiankun-boot-bottom' }, BOOT_POEM.bottom),
        h('p', { className: 'qiankun-boot-left' }, BOOT_POEM.left),
        h('p', { className: 'qiankun-boot-right' }, BOOT_POEM.right),
        h('div', { className: 'qiankun-boot-core', 'aria-hidden': true }, h(BaguaPlate)),
        h('button', { className: 'qiankun-boot-skip', type: 'button', onClick: () => setShow(false) }, '跳过开场 · Esc'))
    }
