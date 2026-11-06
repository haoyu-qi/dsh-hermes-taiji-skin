/* ——— V3 · 紫微斗数运行时（注入 client.js 的 factory 作用域内）———
   排盘引擎由 tools/build-engine.mjs 打成 IIFE，挂在 window.__HermesZiwei__；
   本文件只做：模型名徽记、推演开关与入盘、会话/工作区命盘入口、命盘对话框。
   来源：github.com/Renhuai123/ziwei-doushu（MIT，见 vendor/ziwei/NOTICE.md）。 */

/* 与 V2 设置同一套 localStorage 约定；命名加前缀，避免与其它模块的键冲突。 */
function readZiweiStored(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value === null ? fallback : value
  } catch (error) {
    return fallback
  }
}

function writeZiweiStored(key, value) {
  try {
    window.localStorage.setItem(key, value)
  } catch (error) {
    /* 隐私模式下可能不可写，退回默认表现。 */
  }
}

    /* ——— V3 · 紫微斗数：存储、事件与纯函数 ———
       排盘引擎由 tools/build-engine.mjs 打进本文件头部（window.__HermesZiwei__），
       来源：github.com/Renhuai123/ziwei-doushu（MIT）。所有键都走 localStorage，
       与 V2 的设置一样只在本机浏览器内生效。 */
    const ZIWEI_EVENT = 'hermes-ziwei:change'
    const ZIWEI_OPEN_EVENT = 'hermes-ziwei:open'
    const ZIWEI_AUTO_KEY = 'hermes-ziwei-auto'
    const ZIWEI_BIRTH_PREFIX = 'hermes-ziwei-birth:'
    const ZIWEI_MODE_PREFIX = 'hermes-ziwei-mode:'
    const ZIWEI_DIGEST_BEGIN = '【紫微命盘'
    const ZIWEI_DIGEST_END = '【/紫微命盘】'
    const ZIWEI_BRANCH_NAMES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
    const ZIWEI_STEM_NAMES = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
    const ZIWEI_LUNAR_MONTHS = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月']
    const ZIWEI_LUNAR_DAYS = [
      '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
      '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
      '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十',
    ]
    /* 传统十二宫盘面：上巳午未申，左辰卯寅，右酉戌亥，下寅丑子亥（寅起左下、顺时针）。
       palaces 按地支 0–11 排序，这里给的是「网格位置 → 地支索引」。 */
    const ZIWEI_GRID_BRANCHES = [
      [5, 6, 7, 8],
      [4, -1, -1, 9],
      [3, -1, -1, 10],
      [2, 1, 0, 11],
    ]

    function getZiwei() {
      const engine = typeof window !== 'undefined' ? window.__HermesZiwei__ : null
      return engine && typeof engine.generateChart === 'function' ? engine : null
    }

    function ziweiScopeKey(kind, id) {
      if (kind === 'session') return 's:' + id
      if (kind === 'workspace') return 'w:' + id
      return 'default'
    }

    function ziweiModeKey(scopeKey) {
      return ZIWEI_MODE_PREFIX + (scopeKey || 'default')
    }

    function ziweiModeOn(scopeKey) {
      return readZiweiStored(ziweiModeKey(scopeKey), 'off') === 'on'
    }

    function writeZiweiMode(scopeKey, on) {
      writeZiweiStored(ziweiModeKey(scopeKey), on ? 'on' : 'off')
      emitZiweiChange({ scopeKey, kind: 'mode', on })
    }

    function ziweiAutoOn() {
      return readZiweiStored(ZIWEI_AUTO_KEY, 'off') === 'on'
    }

    function readZiweiBirth(scopeKey) {
      const raw = readZiweiStored(ZIWEI_BIRTH_PREFIX + (scopeKey || 'default'), '')
      if (raw === '') return null
      try {
        const value = JSON.parse(raw)
        if (
          !value || typeof value !== 'object' ||
          !Number.isInteger(value.year) || !Number.isInteger(value.month) || !Number.isInteger(value.day) ||
          !Number.isInteger(value.hour) || !Number.isInteger(value.minute) ||
          (value.gender !== 'male' && value.gender !== 'female')
        ) {
          return null
        }
        return value
      } catch (error) {
        return null
      }
    }

    function writeZiweiBirth(scopeKey, birth) {
      writeZiweiStored(ZIWEI_BIRTH_PREFIX + (scopeKey || 'default'), JSON.stringify(birth))
      emitZiweiChange({ scopeKey, kind: 'birth' })
    }

    /** 按链取出生信息：本对话 → 所属工作区 → 常用默认。 */
    function resolveZiweiBirth(scopeKeys) {
      for (const key of scopeKeys) {
        const birth = readZiweiBirth(key)
        if (birth) return { birth, scopeKey: key }
      }
      return null
    }

    function emitZiweiChange(detail) {
      try {
        window.dispatchEvent(new CustomEvent(ZIWEI_EVENT, { detail: detail || {} }))
      } catch (error) {
        /* 广播失败时组件在下次挂载仍会读到 localStorage。 */
      }
    }

    function openZiwei(payload) {
      try {
        window.dispatchEvent(new CustomEvent(ZIWEI_OPEN_EVENT, { detail: payload || {} }))
      } catch (error) {
        /* 同上，静默降级。 */
      }
    }

    /**
     * 钟点 → 引擎要的「排盘日 + 时辰序号」。
     * 23:00–23:59（晚子时）按次日排盘、时辰取 0；00:00–00:59（早子时）按当日、同样取 0。
     */
    function clockToChartBirth(birth) {
      let year = birth.year
      let month = birth.month
      let day = birth.day
      if (birth.hour === 23) {
        const next = new Date(Date.UTC(year, month - 1, day + 1))
        year = next.getUTCFullYear()
        month = next.getUTCMonth() + 1
        day = next.getUTCDate()
      }
      const branch = birth.hour <= 0 || birth.hour === 23 ? 0 : Math.floor((birth.hour + 1) / 2)
      return { year, month, day, hour: branch, gender: birth.gender }
    }

    function computeZiwei(birth) {
      const engine = getZiwei()
      if (!engine) return { error: 'engine' }
      let chart = null
      try {
        chart = engine.generateChart(clockToChartBirth(birth))
      } catch (error) {
        return { error: (error && error.message) || '排盘失败' }
      }
      let patterns = []
      try {
        patterns = engine.detectPatterns(chart) || []
      } catch (error) {
        patterns = []
      }
      return { chart, patterns }
    }

    function pad2(value) {
      return value < 10 ? '0' + value : String(value)
    }

    function lunarDateString(lunarInfo) {
      if (!lunarInfo) return ''
      const month = ZIWEI_LUNAR_MONTHS[(Math.abs(lunarInfo.lunarMonth) - 1 + 12) % 12] || ''
      const day = ZIWEI_LUNAR_DAYS[(lunarInfo.lunarDay - 1 + 30) % 30] || ''
      const year = (ZIWEI_STEM_NAMES[lunarInfo.yearStem] || '') + (ZIWEI_BRANCH_NAMES[lunarInfo.yearBranch] || '') + '年'
      return year + (lunarInfo.isLeapMonth ? '闰' : '') + month + day
    }

    function palaceStarText(star) {
      let text = star.name
      if (star.brightnessRaw) text += '(' + star.brightnessRaw + ')'
      return text
    }

    /** 命盘档案：插进草稿的纯文本块，模型据此「推演」。 */
    function ziweiDigest(birth, result, label) {
      const chart = result.chart
      if (!chart) return ''
      const lines = []
      lines.push(ZIWEI_DIGEST_BEGIN + '·' + (label || '命盘') + '】')
      lines.push(
        '公历 ' + birth.year + '-' + pad2(birth.month) + '-' + pad2(birth.day) + ' ' + pad2(birth.hour) + ':' + pad2(birth.minute) +
        ' · ' + (birth.gender === 'male' ? '男命' : '女命') +
        ' · ' + ZIWEI_BRANCH_NAMES[chart.birthInfo.hour] + '时（排盘按子时换日规则已归位）',
      )
      const li = chart.lunarInfo
      lines.push('农历 ' + lunarDateString(li) + (li.fourPillars ? ' · 四柱 ' + li.fourPillars.join(' ') : ''))
      lines.push('五行局 ' + chart.wuxingJuName + ' · 命主 ' + (chart.mingZhu || '—') + ' · 身主 ' + (chart.shenZhu || '—'))
      for (const palace of chart.palaces) {
        const majors = palace.stars.filter((star) => star.type === 'major').map(palaceStarText)
        const minors = palace.stars.filter((star) => star.type !== 'major').map((star) => star.name + (star.siHua || ''))
        const marks = []
        if (palace.isMingGong) marks.push('命宫')
        if (palace.isShenGong) marks.push('身宫')
        const range = Array.isArray(palace.daXianAge) ? palace.daXianAge.join('-') : ''
        lines.push(
          (marks.length > 0 ? '[' + marks.join('·') + '] ' : '') + palace.name +
          '(' + ZIWEI_BRANCH_NAMES[palace.branch] + ')' + (range ? '[' + range + ']' : '') +
          '：' + (majors.length > 0 ? majors.join(' ') : '空宫借对宫') +
          (minors.length > 0 ? '｜' + minors.slice(0, 8).join(' ') : ''),
        )
      }
      if (result.patterns && result.patterns.length > 0) {
        lines.push('格局：' + result.patterns.map((pattern) => pattern.name).join('、'))
      }
      lines.push('请以此盘为背景做紫微斗数推演，结合提问具体分析；引述宜谨慎，结论注明「仅供文化参考」。')
      lines.push(ZIWEI_DIGEST_END)
      return lines.join('\n')
    }

    function stripZiweiDigest(text) {
      if (typeof text !== 'string' || text.indexOf(ZIWEI_DIGEST_BEGIN) < 0) return text
      const start = text.indexOf(ZIWEI_DIGEST_BEGIN)
      const end = text.indexOf(ZIWEI_DIGEST_END, start)
      const tail = end >= 0 ? text.slice(end + ZIWEI_DIGEST_END.length) : ''
      return (text.slice(0, start) + tail).replace(/^\s+|\s+$/g, '')
    }

    function withZiweiDigest(draft, digest) {
      const rest = stripZiweiDigest(draft)
      return digest + (rest.trim() === '' ? '' : '\n\n' + rest)
    }

    /** 会话 → 工作区 的解析（宿主用 useWorkspaces 快照做同样的事）。 */
    function workspaceIdOfSession(useWorkspaces, sessionId) {
      if (typeof useWorkspaces !== 'function' || !sessionId) return null
      try {
        const snapshot = useWorkspaces((state) => state)
        const items = snapshot && Array.isArray(snapshot.items) ? snapshot.items : []
        const hit = items.find((item) => item && Array.isArray(item.sessionIds) && item.sessionIds.indexOf(sessionId) >= 0)
        return hit ? hit.workspaceId : null
      } catch (error) {
        return null
      }
    }

    function sessionBirthChain(sessionId, workspaceId) {
      const chain = []
      if (sessionId) chain.push(ziweiScopeKey('session', sessionId))
      if (workspaceId) chain.push(ziweiScopeKey('workspace', workspaceId))
      chain.push('default')
      return chain
    }

    /** useWorkspaces 的安全包装：宿主没给时退化为恒 null，避免条件调用 hook。 */
    function useWorkspaceIdMaybe(useWorkspaces, sessionId) {
      const hook = typeof useWorkspaces === 'function' ? useWorkspaces : (selector) => selector(null)
      return workspaceIdOfSession(hook, sessionId)
    }

    /**
     * 输入框上沿的「紫微推演」开关条：模型名旁徽记的状态源、入盘按钮、
     * 以及命盘对话框「入盘」指令的执行者（只有这里拿得到 inputActions）。
     * 宿主没提供 useInput / inputActions 时整条隐藏（真实会话里始终提供）。
     */
    function ZiweiDockControls(props) {
      const useInput = props && props.useInput
      const inputActions = props && props.inputActions
      const sessionId = props && props.sessionId
      if (
        typeof useInput !== 'function' ||
        !inputActions || typeof inputActions.setDraft !== 'function' ||
        !sessionId
      ) {
        return null
      }

      const shared = { useInput, inputActions, sessionId, useWorkspaces: props.useWorkspaces }
      return h(React.Fragment, null, h(ZiweiDockBar, shared), h(ZiweiTuningControls, shared))
    }

    function ZiweiDockBar({ useInput, inputActions, sessionId, useWorkspaces }) {
      const workspaceId = useWorkspaceIdMaybe(useWorkspaces, sessionId)
      const scopeKey = ziweiScopeKey('session', sessionId)
      const [on, setOn] = React.useState(() => ziweiModeOn(scopeKey))
      const [flash, setFlash] = React.useState(0)
      const draft = useInput((state) => (state && typeof state.draft === 'string' ? state.draft : ''))
      const draftRef = React.useRef(draft)
      draftRef.current = draft

      React.useEffect(() => {
        const sync = () => setOn(ziweiModeOn(scopeKey))
        window.addEventListener(ZIWEI_EVENT, sync)
        return () => window.removeEventListener(ZIWEI_EVENT, sync)
      }, [scopeKey])

      React.useEffect(() => {
        if (flash === 0) return undefined
        const timer = setTimeout(() => setFlash(0), 900)
        return () => clearTimeout(timer)
      }, [flash])

      const insertDigest = (digest) => {
        try {
          inputActions.setDraft(withZiweiDigest(draftRef.current, digest))
          setFlash(Date.now())
          return true
        } catch (error) {
          return false
        }
      }

      // 命盘对话框里的「入盘」按钮通过这个事件把档案交给这里执行。
      React.useEffect(() => {
        const onEvent = (event) => {
          const detail = event && event.detail
          if (!detail || detail.kind !== 'insert' || typeof detail.digest !== 'string') return
          insertDigest(detail.digest)
        }
        window.addEventListener(ZIWEI_EVENT, onEvent)
        return () => window.removeEventListener(ZIWEI_EVENT, onEvent)
        // insertDigest 闭包里的 draftRef/inputActions 均为稳定引用。
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      const loadChart = () => {
        const resolved = resolveZiweiBirth(sessionBirthChain(sessionId, workspaceId))
        if (!resolved) {
          openZiwei({ kind: 'session', sessionId, workspaceId, focus: 'birth' })
          return
        }
        const result = computeZiwei(resolved.birth)
        if (result.error || !result.chart) {
          openZiwei({ kind: 'session', sessionId, workspaceId, focus: 'birth', error: result.error })
          return
        }
        insertDigest(ziweiDigest(resolved.birth, result, '本对话'))
      }

      const label = on && flash !== 0 ? '已入盘' : '入盘'
      return h(
        'div',
        { className: 'hermes-ziwei-bar', role: 'group', 'aria-label': '紫微推演：把当前对话的命盘档案带入提问' },
        h(
          'button',
          {
            type: 'button',
            className: 'hermes-ziwei-pill',
            title: on
              ? '紫微推演已开启：模型名旁有徽记，可「入盘」把命盘档案带进草稿'
              : '开启紫微推演：在模型名旁亮起徽记，可一键把命盘档案带入提问',
            'aria-pressed': on ? 'true' : 'false',
            onClick: () => {
              writeZiweiMode(scopeKey, !ziweiModeOn(scopeKey))
              setOn(!on)
            },
          },
          h('span', { className: 'hermes-mode-dot', 'aria-hidden': 'true' }),
          '紫微推演',
        ),
        on
          ? h(
              'button',
              {
                type: 'button',
                className: 'hermes-ziwei-load',
                title: '把命盘档案插到草稿开头（再次入盘会刷新旧档案）',
                onClick: loadChart,
              },
              label,
            )
          : null,
      )
    }

    /* ——— V3 · 紫微斗数：模型名徽记 / 会话头与侧栏入口 / 回车自动带盘 / 命盘对话框 ——— */

    /**
     * conversation.input.model.label（单槽位，priority -100）：
     * 模型名旁的「紫微」徽记。该槽位契约要求**非交互**，所以这里只做状态展示；
     * 开关本体在输入框上沿的 ZiweiDockControls。
     * 接管单槽位会遮住官方 ui-deepseek-model-label-1017 的角标，这里按其公开口径
     * （provider/model 组合判定）复刻同一颗 1017，保证停用皮肤前的观感不丢失。
     */
    function ZiweiModelLabel(props) {
      const owner = props || {}
      const model = owner.model && typeof owner.model === 'object' ? owner.model : {}
      const modelName = typeof model.name === 'string' ? model.name : ''
      const sessionId = typeof owner.sessionId === 'string' && owner.sessionId ? owner.sessionId : null
      const scopeKey = sessionId ? ziweiScopeKey('session', sessionId) : 'default'
      const [on, setOn] = React.useState(() => ziweiModeOn(scopeKey))

      React.useEffect(() => {
        const sync = () => setOn(ziweiModeOn(scopeKey))
        window.addEventListener(ZIWEI_EVENT, sync)
        return () => window.removeEventListener(ZIWEI_EVENT, sync)
      }, [scopeKey])

      const providerId = owner.provider && typeof owner.provider.id === 'string' ? owner.provider.id : ''
      const replica1017 =
        (providerId === 'deepseek-official' || providerId === 'deepseek-account') &&
        model.id === 'deepseek-flash' &&
        modelName === 'DeepSeek-V4.1-Flash'

      return h(
        'span',
        { className: 'hermes-modelabel' },
        modelName,
        replica1017 ? h('span', { className: 'hermes-modelabel-1017' }, '1017') : null,
        on ? h('span', { className: 'hermes-modelabel-ziwei', title: '紫微推演已开启（仅本对话）' }, '紫微') : null,
      )
    }

    /** conversation.session.header.utilities：会话头右侧的「紫微命盘」入口。 */
    function ZiweiHeaderButton(props) {
      const sessionId = props && props.sessionId
      if (!sessionId) return null
      const workspaceId = useWorkspaceIdMaybe(props && props.useWorkspaces, sessionId)
      return h(
        'button',
        {
          type: 'button',
          className: 'hermes-ziwei-headbtn',
          title: '紫微命盘 · 本对话',
          'aria-label': '紫微命盘 · 本对话',
          onClick: () => openZiwei({ kind: 'session', sessionId, workspaceId }),
        },
        h('span', { className: 'hermes-ziwei-glyph', 'aria-hidden': 'true' }, '斗'),
        '紫微命盘',
      )
    }

    /** sidebar.workspaces.session.row.action：会话行悬停按钮（排在归档与置顶之间）。 */
    function ZiweiSessionRowAction(props) {
      const sessionId = props && props.sessionId
      if (!sessionId) return null
      const workspaceId = useWorkspaceIdMaybe(props && props.useWorkspaces, sessionId)
      return h(
        'button',
        {
          type: 'button',
          className: 'hermes-ziwei-rowact',
          title: '紫微命盘',
          'aria-label': '紫微命盘',
          onClick: () => openZiwei({ kind: 'session', sessionId, workspaceId }),
        },
        '斗',
      )
    }

    /**
     * conversation.composer.dock：回车自动带盘。
     * 条件全部满足时，在宿主读到编辑器内容之前（capture 阶段先于 Lexical 键位表）
     * 用 inputActions.setDraft 把命盘档案 prepend 进草稿；不满足时完全不介入。
     * 发送按钮路径不拦截——想保证带上档案，请点「入盘」。
     */
    function ZiweiSendWatch(props) {
      const useInput = props && props.useInput
      const inputActions = props && props.inputActions
      const sessionId = props && props.sessionId
      if (
        typeof useInput !== 'function' ||
        !inputActions || typeof inputActions.setDraft !== 'function' ||
        !sessionId
      ) {
        return null
      }
      return h(ZiweiSendInner, { useInput, inputActions, sessionId, useWorkspaces: props.useWorkspaces })
    }

    function ZiweiSendInner({ useInput, inputActions, sessionId, useWorkspaces }) {
      const workspaceId = useWorkspaceIdMaybe(useWorkspaces, sessionId)
      const scopeKey = ziweiScopeKey('session', sessionId)
      const draft = useInput((state) => (state && typeof state.draft === 'string' ? state.draft : ''))
      const draftRef = React.useRef(draft)
      draftRef.current = draft

      React.useEffect(() => {
        const onKeyDown = (event) => {
          if (event.key !== 'Enter' || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) return
          if (event.isComposing || event.keyCode === 229) return
          const path = typeof event.composedPath === 'function' ? event.composedPath() : []
          let editable = false
          for (const node of path) {
            if (!node || node.nodeType !== 1) continue
            if (node.isContentEditable === true || node.tagName === 'TEXTAREA') {
              editable = true
              break
            }
          }
          if (!editable) return
          if (!ziweiAutoOn() || !ziweiModeOn(scopeKey)) return
          const text = draftRef.current
          if (typeof text !== 'string' || text.trim() === '' || text.indexOf(ZIWEI_DIGEST_BEGIN) >= 0) return
          const resolved = resolveZiweiBirth(sessionBirthChain(sessionId, workspaceId))
          if (!resolved) return
          const result = computeZiwei(resolved.birth)
          if (result.error || !result.chart) return
          try {
            inputActions.setDraft(withZiweiDigest(text, ziweiDigest(resolved.birth, result, '本对话')))
          } catch (error) {
            /* setDraft 不可用时退回手动「入盘」。 */
          }
        }
        window.addEventListener('keydown', onKeyDown, true)
        return () => window.removeEventListener('keydown', onKeyDown, true)
      }, [scopeKey, sessionId, workspaceId, inputActions])

      return null
    }

    const ZIWEI_DEFAULT_BIRTH = { name: '', year: 1990, month: 1, day: 1, hour: 0, minute: 0, gender: 'male' }
    const ZIWEI_TABS = [
      { id: 'session', label: '本对话' },
      { id: 'workspace', label: '本工作区' },
      { id: 'default', label: '常用' },
    ]

    function ziweiScopeKeyForTab(tab, payload) {
      if (tab === 'session' && payload && payload.sessionId) return ziweiScopeKey('session', payload.sessionId)
      if (tab === 'workspace' && payload && payload.workspaceId) return ziweiScopeKey('workspace', payload.workspaceId)
      if (tab === 'default') return 'default'
      return null
    }

    function ziweiBirthChainForTab(tab, payload) {
      if (tab === 'session' && payload) return sessionBirthChain(payload.sessionId, payload.workspaceId)
      if (tab === 'workspace' && payload && payload.workspaceId) {
        return [ziweiScopeKey('workspace', payload.workspaceId), 'default']
      }
      return ['default']
    }

    /**
     * shell.overlay：紫微命盘对话框。出生信息按「本对话 / 本工作区 / 常用」三档
     * 分别存 localStorage；排盘全部在本机引擎完成，不发起任何网络请求。
     */
    function ZiweiPanel() {
      const [payload, setPayload] = React.useState(null)
      const [tab, setTab] = React.useState('session')
      const [birth, setBirth] = React.useState(ZIWEI_DEFAULT_BIRTH)
      const [savedAt, setSavedAt] = React.useState(0)
      const cardRef = React.useRef(null)
      const restoreFocusRef = React.useRef(null)

      const engineOn = React.useMemo(() => !!getZiwei(), [])

      React.useEffect(() => {
        const onOpen = (event) => {
          const detail = (event && event.detail) || {}
          const nextPayload = {
            kind: detail.kind === 'workspace' || detail.kind === 'default' ? detail.kind : 'session',
            sessionId: typeof detail.sessionId === 'string' ? detail.sessionId : null,
            workspaceId: typeof detail.workspaceId === 'string' ? detail.workspaceId : null,
            focus: detail.focus === 'birth' ? 'birth' : null,
            error: typeof detail.error === 'string' ? detail.error : null,
          }
          if (nextPayload.kind === 'session' && !nextPayload.sessionId) nextPayload.kind = 'default'
          if (nextPayload.kind === 'workspace' && !nextPayload.workspaceId) nextPayload.kind = 'default'
          const active = document.activeElement
          restoreFocusRef.current = active && active !== document.body ? active : null
          const chain =
            nextPayload.kind === 'session'
              ? sessionBirthChain(nextPayload.sessionId, nextPayload.workspaceId)
              : nextPayload.kind === 'workspace'
                ? [ziweiScopeKey('workspace', nextPayload.workspaceId), 'default']
                : ['default']
          const resolved = resolveZiweiBirth(chain)
          setPayload(nextPayload)
          setTab(nextPayload.kind)
          setBirth(resolved ? { ...ZIWEI_DEFAULT_BIRTH, ...resolved.birth } : { ...ZIWEI_DEFAULT_BIRTH })
          setSavedAt(0)
        }
        window.addEventListener(ZIWEI_OPEN_EVENT, onOpen)
        return () => window.removeEventListener(ZIWEI_OPEN_EVENT, onOpen)
      }, [])

      const close = () => {
        setPayload(null)
        const target = restoreFocusRef.current
        if (target && typeof target.focus === 'function') {
          try {
            target.focus()
          } catch (error) {
            /* 元素已卸载时忽略。 */
          }
        }
      }

      React.useEffect(() => {
        if (payload === null) return undefined
        const onKey = (event) => {
          if (event.key === 'Escape') close()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
        // close 只引用稳定的 ref。
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [payload !== null])

      React.useEffect(() => {
        if (payload === null) return undefined
        const timer = setTimeout(() => {
          const card = cardRef.current
          if (!card) return
          if (payload && payload.focus === 'birth') {
            const first = card.querySelector('.hermes-ziwei-input')
            if (first && typeof first.focus === 'function') {
              first.focus()
              return
            }
          }
          card.focus()
        }, 30)
        return () => clearTimeout(timer)
      }, [payload])

      const trapCardFocus = (event) => {
        if (event.key !== 'Tab') return
        const root = cardRef.current
        if (!root) return
        const nodes = root.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')
        const list = Array.prototype.filter.call(nodes, (node) => !node.disabled && node.offsetParent !== null)
        if (list.length === 0) {
          event.preventDefault()
          root.focus()
          return
        }
        const first = list[0]
        const last = list[list.length - 1]
        if (document.activeElement === root) {
          event.preventDefault()
          ;(event.shiftKey ? last : first).focus()
          return
        }
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }

      if (payload === null) return null

      const chartBirth = clockToChartBirth(birth)
      const result = computeZiwei(birth)
      const branchName = ZIWEI_BRANCH_NAMES[chartBirth.hour]
      const tabs = ZIWEI_TABS.filter((item) => ziweiScopeKeyForTab(item.id, payload) !== null)
      const activeScopeKey = ziweiScopeKeyForTab(tab, payload)
      const activeTabLabel = (ZIWEI_TABS.find((item) => item.id === tab) || {}).label || ''

      const update = (field, value) => {
        setBirth((current) => ({ ...current, [field]: value }))
        setSavedAt(0)
      }
      const numberInput = (field, label, min, max) =>
        h(
          'label',
          { className: 'hermes-ziwei-field', key: field },
          h('span', null, label),
          h('input', {
            className: 'hermes-ziwei-input',
            'data-field': field,
            type: 'number',
            min,
            max,
            value: birth[field],
            onChange: (event) => {
              const next = Number(event.target.value)
              update(field, Number.isFinite(next) ? Math.min(max, Math.max(min, next)) : min)
            },
          }),
        )

      const saveBirth = () => {
        if (!activeScopeKey) return
        writeZiweiBirth(activeScopeKey, birth)
        setSavedAt(Date.now())
      }
      const insertToDraft = () => {
        if (!result.chart || tab !== 'session') return
        emitZiweiChange({ kind: 'insert', digest: ziweiDigest(birth, result, '本对话') })
        close()
      }

      const cellOf = (palace) => {
        const majors = palace.stars.filter((star) => star.type === 'major')
        const minors = palace.stars.filter((star) => star.type !== 'major').slice(0, 8)
        const siChip = (siHua) =>
          h(
            'i',
            {
              className:
                'hermes-ziwei-si hermes-ziwei-si--' +
                (siHua === '禄' ? 'lu' : siHua === '权' ? 'quan' : siHua === '科' ? 'ke' : 'ji'),
              key: 'si-' + siHua,
            },
            siHua,
          )
        const starNode = (star, minor) =>
          h(
            'span',
            {
              key: star.name,
              className:
                'hermes-ziwei-star' +
                (minor
                  ? star.type === 'lucky'
                    ? ' hermes-ziwei-star--lucky'
                    : star.type === 'sha'
                      ? ' hermes-ziwei-star--sha'
                      : ' hermes-ziwei-star--minor'
                  : ''),
            },
            star.name,
            star.brightnessRaw ? h('small', { key: 'b' }, star.brightnessRaw) : null,
            star.siHua ? siChip(star.siHua) : null,
          )
        return h(
          'div',
          {
            key: 'palace-' + palace.branch,
            className:
              'hermes-ziwei-cell' +
              (palace.isMingGong ? ' hermes-ziwei-cell--ming' : '') +
              (palace.isShenGong && !palace.isMingGong ? ' hermes-ziwei-cell--shen' : ''),
          },
          Array.isArray(palace.daXianAge)
            ? h('span', { className: 'hermes-ziwei-daxian', 'aria-hidden': 'true' }, palace.daXianAge.join('-'))
            : null,
          h(
            'div',
            { className: 'hermes-ziwei-cellhead' },
            h(
              'span',
              { className: 'hermes-ziwei-cellname' },
              palace.name,
              palace.isMingGong ? h('em', null, '命') : null,
              palace.isShenGong && !palace.isMingGong ? h('em', null, '身') : null,
            ),
            h('span', { className: 'hermes-ziwei-cellbranch' }, ZIWEI_BRANCH_NAMES[palace.branch]),
          ),
          h(
            'div',
            { className: 'hermes-ziwei-stars' },
            majors.length > 0
              ? majors.map((star) => starNode(star, false))
              : h(
                  'span',
                  { className: 'hermes-ziwei-empty' },
                  '空宫' + (palace.borrowedStars && palace.borrowedStars.length > 0 ? ' · 借' + palace.borrowedStars.join('、') : ''),
                ),
            minors.map((star) => starNode(star, true)),
          ),
        )
      }

      const boardChildren = []
      ZIWEI_GRID_BRANCHES.forEach((row, rowIndex) => {
        row.forEach((branch, colIndex) => {
          if (branch < 0) {
            if (rowIndex === 1 && colIndex === 1 && result.chart) {
              const chart = result.chart
              const ming = chart.palaces.find((palace) => palace.branch === chart.mingGongBranch)
              const shen = chart.palaces.find((palace) => palace.branch === chart.shenGongBranch)
              boardChildren.push(
                h(
                  'div',
                  { className: 'hermes-ziwei-center', key: 'ziwei-center' },
                  h(
                    'div',
                    { className: 'hermes-ziwei-center-name' },
                    (birth.name && birth.name.trim() !== '' ? birth.name : '未命名') +
                      ' · ' +
                      (birth.gender === 'male' ? '男命' : '女命'),
                  ),
                  h('div', { className: 'hermes-ziwei-center-ju' }, chart.wuxingJuName + ' · 命主 ' + (chart.mingZhu || '—') + ' · 身主 ' + (chart.shenZhu || '—')),
                  h(
                    'div',
                    { className: 'hermes-ziwei-center-rows' },
                    h('b', null, '公历'),
                    h('span', null, birth.year + '-' + pad2(birth.month) + '-' + pad2(birth.day) + ' ' + pad2(birth.hour) + ':' + pad2(birth.minute) + '（' + branchName + '时）'),
                    h('b', null, '农历'),
                    h('span', null, lunarDateString(chart.lunarInfo) + (chart.lunarInfo.fourPillars ? ' · ' + chart.lunarInfo.fourPillars.join(' ') : '')),
                    h('b', null, '命宫'),
                    h('span', null, ming ? ming.name + ' · ' + ZIWEI_BRANCH_NAMES[chart.mingGongBranch] + '宫' : '—'),
                    h('b', null, '身宫'),
                    h('span', null, shen ? ZIWEI_BRANCH_NAMES[chart.shenGongBranch] + '宫' + (shen.isMingGong ? '（与命宫同宫）' : ' · ' + shen.name) : '—'),
                  ),
                  result.patterns.length > 0
                    ? h(
                        'div',
                        { className: 'hermes-ziwei-chips' },
                        result.patterns.slice(0, 6).map((pattern) =>
                          h(
                            'span',
                            {
                              key: 'pattern-' + pattern.name,
                              className:
                                'hermes-ziwei-chip' +
                                (pattern.level === 'excellent' ? ' hermes-ziwei-chip--excellent' : '') +
                                (pattern.level === 'caution' ? ' hermes-ziwei-chip--caution' : ''),
                              title: pattern.description || pattern.name,
                            },
                            pattern.name,
                          ),
                        ),
                      )
                    : null,
                ),
              )
            }
            return
          }
          if (!result.chart) return
          const palace = result.chart.palaces.find((item) => item.branch === branch)
          if (palace) boardChildren.push(cellOf(palace))
        })
      })

      return h(
        'div',
        {
          className: 'hermes-ziwei',
          role: 'presentation',
          onPointerDown: (event) => {
            if (event.target === event.currentTarget) close()
          },
        },
        h(
          'div',
          {
            className: 'hermes-ziwei-card',
            role: 'dialog',
            'aria-modal': 'true',
            'aria-label': '紫微命盘',
            tabIndex: -1,
            ref: cardRef,
            onKeyDown: trapCardFocus,
          },
          h(
            'div',
            { className: 'hermes-ziwei-head' },
            h('span', { className: 'hermes-ziwei-glyph', 'aria-hidden': 'true' }, '斗'),
            h(
              'span',
              { className: 'hermes-ziwei-title' },
              '紫微命盘',
              h('small', null, '本机排盘 · 十二宫'),
            ),
            h(
              'div',
              { className: 'hermes-ziwei-tabs', role: 'tablist', 'aria-label': '命盘归属' },
              tabs.map((item) =>
                h(
                  'button',
                  {
                    key: item.id,
                    type: 'button',
                    className: 'hermes-ziwei-tab',
                    role: 'tab',
                    'aria-selected': tab === item.id ? 'true' : 'false',
                    onClick: () => setTab(item.id),
                  },
                  item.label,
                ),
              ),
            ),
          ),
          h(
            'div',
            { className: 'hermes-ziwei-body' },
            h(
              'div',
              { className: 'hermes-ziwei-form' },
              h(
                'label',
                { className: 'hermes-ziwei-field' },
                h('span', null, '姓名'),
                h('input', {
                  className: 'hermes-ziwei-input',
                  'data-field': 'name',
                  type: 'text',
                  value: birth.name,
                  placeholder: '可选',
                  onChange: (event) => update('name', event.target.value.slice(0, 12)),
                }),
              ),
              numberInput('year', '年', 1900, 2026),
              numberInput('month', '月', 1, 12),
              numberInput('day', '日', 1, 31),
              numberInput('hour', '时', 0, 23),
              numberInput('minute', '分', 0, 59),
              h(
                'div',
                { className: 'hermes-ziwei-field' },
                h('span', null, '性别'),
                h(
                  'span',
                  { className: 'hermes-ziwei-seg', role: 'group', 'aria-label': '性别' },
                  h(
                    'button',
                    {
                      type: 'button',
                      'aria-pressed': birth.gender === 'male' ? 'true' : 'false',
                      onClick: () => update('gender', 'male'),
                    },
                    '男',
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      'aria-pressed': birth.gender === 'female' ? 'true' : 'false',
                      onClick: () => update('gender', 'female'),
                    },
                    '女',
                  ),
                ),
              ),
              h(
                'span',
                { className: 'hermes-ziwei-hint' },
                '钟点 ' + pad2(birth.hour) + ':' + pad2(birth.minute) + ' ≈ ' + branchName + '时 · 23 点后按次日早子时排盘',
              ),
            ),
            !engineOn
              ? h(
                  'div',
                  { className: 'hermes-ziwei-error' },
                  '排盘引擎未载入：client.js 顶部的紫微引擎 IIFE 缺失。重新运行 hermes-skin 的 npm run build 并刷新页面。',
                )
              : result.error && result.error !== 'engine'
                ? h('div', { className: 'hermes-ziwei-error' }, '排盘失败：' + result.error + '。请核对出生日期是否真实存在。')
                : null,
            payload.error && engineOn && !result.error
              ? h('div', { className: 'hermes-ziwei-error' }, '刚才「入盘」时排盘失败，请在本表单核对生辰后重试。')
              : null,
            result.chart
              ? h('div', { className: 'hermes-ziwei-boardwrap' }, h('div', { className: 'hermes-ziwei-board' }, boardChildren))
              : null,
          ),
          h(
            'div',
            { className: 'hermes-ziwei-foot' },
            h(
              'span',
              { className: 'hermes-ziwei-note' },
              '排盘引擎：紫微斗数开源排盘引擎（MIT · Renhuai123/ziwei-doushu）· 生辰只存本机浏览器 · 内容仅供文化参考',
            ),
            tab === 'session'
              ? h(
                  'button',
                  {
                    type: 'button',
                    className: 'hermes-ziwei-btn',
                    disabled: !result.chart,
                    onClick: insertToDraft,
                    title: '把这份命盘档案插到输入框草稿开头，发给模型即可推演',
                  },
                  '入盘',
                )
              : null,
            h(
              'button',
              {
                type: 'button',
                className: 'hermes-ziwei-btn',
                onClick: saveBirth,
                disabled: !activeScopeKey,
                title: activeScopeKey ? '把当前生辰保存到「' + activeTabLabel + '」' : '',
              },
              savedAt !== 0 ? '已保存' : '保存生辰',
            ),
            h(
              'button',
              { type: 'button', className: 'hermes-ziwei-btn hermes-ziwei-btn--ghost', onClick: close },
              '收起',
            ),
          ),
        ),
      )
    }
