    function ZiweiTuningControls({ useInput, inputActions, sessionId, useWorkspaces }) {
      const workspaceId = useWorkspaceIdMaybe(useWorkspaces, sessionId)
      const scopeKey = ziweiScopeKey('session', sessionId)
      const key = 'hermes-ziwei-tuning:' + scopeKey
      const [enabled, setEnabled] = React.useState(() => readZiweiStored(key, 'off') === 'on')
      const [revision, refresh] = React.useReducer(n => n + 1, 0)
      const draft = useInput(s => typeof s?.draft === 'string' ? s.draft : '')
      React.useEffect(() => {
        setEnabled(readZiweiStored(key, 'off') === 'on')
        const sync = () => refresh()
        window.addEventListener(ZIWEI_EVENT, sync)
        return () => window.removeEventListener(ZIWEI_EVENT, sync)
      }, [key])
      const profile = React.useMemo(() => {
        const resolved = resolveZiweiBirth(sessionBirthChain(sessionId, workspaceId))
        return resolved ? tuningFromChart(computeZiwei(resolved.birth).chart) : null
      }, [sessionId, workspaceId, revision])
      React.useEffect(() => {
        const next = withTuning(draft, enabled ? profile : null)
        if (next !== draft) inputActions.setDraft(next)
      }, [draft, enabled, profile, inputActions])
      const toggle = () => {
        if (!profile) { openZiwei({ kind: 'session', sessionId, workspaceId, focus: 'birth' }); return }
        writeZiweiStored(key, enabled ? 'off' : 'on')
        setEnabled(!enabled)
        inputActions.setDraft(withTuning(draft, !enabled ? profile : null))
      }
      return h('div', { className: 'hermes-tuning' },
        h('button', { type: 'button', className: 'hermes-ziwei-pill', onClick: toggle, 'aria-pressed': enabled, title: '按命盘映射温度与输出长度，随消息交给宿主应用' }, '命理调参'),
        h('details', { className: 'hermes-tuning-details' },
          h('summary', null, profile ? (enabled ? '随消息应用 · ' : '预览 · ') + '温度 ' + profile.temperature + ' / ' + profile.maxTokens + ' tokens' : '先保存生辰'),
          profile && h('div', { className: 'hermes-tuning-explanation' },
            h('strong', null, profile.label),
            profile.reasons.map((reason, i) => h('p', { key: i }, reason)),
            h('p', null, '文化交互预设，可随时关闭。宿主插件在本轮请求应用 temperature / maxTokens；具体支持和上限由模型决定。'))))
    }
