import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { Window } from 'happy-dom'

/** V3.1 · 紫微斗数：引擎、槽位、命盘对话框、模型徽记、入盘链路。 */
test('ziwei engine and chart surfaces work inside the merged client', async () => {
  const win = new Window({ url: 'http://localhost/' })
  const previous = { window: globalThis.window, document: globalThis.document, IS_REACT_ACT_ENVIRONMENT: globalThis.IS_REACT_ACT_ENVIRONMENT }
  globalThis.window = win
  globalThis.document = win.document
  globalThis.IS_REACT_ACT_ENVIRONMENT = true

  const slots = new Map()
  const cleanups = []
  const ctx = {
    effect(fn) { const done = fn(); if (typeof done === 'function') cleanups.push(done) },
    inject(names, fn) { fn({ ...ctx, modelDirectories: { directoryFor: () => null }, sessions: { subagentAddress: () => undefined } }) },
    theme: { overrideTokens: () => () => {} },
    slots: { inject(name, fn) { fn() }, register(meta, component) { slots.set(meta.name + '/' + (meta.id || ''), component) } },
  }
  let plugin
  win.__ModuleLoader__ = { load({ factory }) { plugin = factory(() => React) } }
  // 引擎 IIFE 会自己挂 window.__HermesZiwei__；皮肤壳在其后注册模块。
  vm.runInNewContext(fs.readFileSync('client.js', 'utf8'), {
    window: win,
    document: win.document,
    localStorage: win.localStorage,
    sessionStorage: win.sessionStorage,
    ResizeObserver: win.ResizeObserver,
    CustomEvent: win.CustomEvent,
    Event: win.Event,
    setTimeout,
    clearTimeout,
    Date,
    performance,
  })
  try {
    // 1) 引擎金标准：1990-01-01 子时男 = 水二局 · 命主巨门。
    assert.ok(win.__HermesZiwei__, 'window.__HermesZiwei__ 未挂载')
    const chart = win.__HermesZiwei__.generateChart({ year: 1990, month: 1, day: 1, hour: 0, gender: 'male' })
    assert.equal(chart.wuxingJuName, '水二局')
    assert.equal(chart.mingZhu, '巨门')
    assert.equal(chart.palaces.length, 12)

    plugin.apply(ctx)

    // 2) 槽位：模型徽记（单槽）、会话头、侧栏行、命盘 overlay、推演条与回车监听。
    assert.ok(slots.has('conversation.input.model.label/'), 'model.label 槽位未注册')
    assert.ok(slots.has('conversation.session.header.utilities/hermes-ziwei'), '会话头入口未注册')
    assert.ok(slots.has('sidebar.workspaces.session.row.action/hermes-ziwei'), '侧栏行入口未注册')
    assert.ok(slots.has('shell.overlay/hermes-ziwei'), '命盘 overlay 未注册')
    assert.ok(slots.has('conversation.composer.dock/hermes-ziwei-dock'), '推演条未注册')
    assert.ok(slots.has('conversation.composer.dock/hermes-ziwei-send'), '自动带盘监听未注册')

    // 3) 命盘对话框：默认生辰排十二宫，中心显示水二局。
    const node = win.document.createElement('div')
    win.document.body.append(node)
    const root = createRoot(node)
    const Panel = slots.get('shell.overlay/hermes-ziwei')
    let openEvent
    await act(async () => { root.render(React.createElement(Panel)) })
    await act(async () => {
      openEvent = new win.CustomEvent('hermes-ziwei:open', { detail: { kind: 'session', sessionId: 's1', workspaceId: 'w1' } })
      win.dispatchEvent(openEvent)
    })
    assert.equal(win.document.querySelectorAll('.hermes-ziwei-cell').length, 12, '命盘应有 12 宫')
    assert.match(win.document.querySelector('.hermes-ziwei-center-ju').textContent, /水二局/)
    assert.equal(win.document.querySelectorAll('.hermes-ziwei-tab').length, 3)
    await act(async () => { win.document.querySelector('.hermes-ziwei-btn--ghost').click() })

    // 4) 模型徽记：推演开启 + 1017 复刻。
    win.localStorage.setItem('hermes-ziwei-mode:s:s1', 'on')
    const ModelLabel = slots.get('conversation.input.model.label/')
    const labelNode = win.document.createElement('div')
    win.document.body.append(labelNode)
    const labelRoot = createRoot(labelNode)
    await act(async () => {
      labelRoot.render(React.createElement(ModelLabel, {
        provider: { id: 'deepseek-official', name: 'DeepSeek' },
        model: { id: 'deepseek-flash', name: 'DeepSeek-V4.1-Flash' },
        placement: 'trigger',
        selected: true,
        sessionId: 's1',
      }))
    })
    assert.match(labelNode.textContent, /DeepSeek-V4\.1-Flash/)
    assert.equal(labelNode.querySelectorAll('.hermes-modelabel-1017').length, 1, '应复刻 1017 角标')
    assert.equal(labelNode.querySelectorAll('.hermes-modelabel-ziwei').length, 1, '推演开启应亮紫微徽记')

    // 5) 推演条与入盘：开关写键；入盘把档案 prepend 进草稿。
    win.localStorage.removeItem('hermes-ziwei-mode:s:s1') // 步骤 4 已手动点亮，这里从关闭态开始测开关
    win.localStorage.setItem('hermes-ziwei-birth:s:s1', JSON.stringify({ name: '', year: 1990, month: 1, day: 1, hour: 0, minute: 0, gender: 'male' }))
    let draft = '帮我看看今年事业'
    const Dock = slots.get('conversation.composer.dock/hermes-ziwei-dock')
    const dockNode = win.document.createElement('div')
    win.document.body.append(dockNode)
    const dockRoot = createRoot(dockNode)
    const draftListeners = new Set()
    const dockProps = {
      sessionId: 's1',
      useInput: (selector) => selector({ draft: React.useSyncExternalStore(fn => { draftListeners.add(fn); return () => draftListeners.delete(fn) }, () => draft) }),
      inputActions: { setDraft: (text) => { draft = String(text ?? ''); draftListeners.forEach(fn => fn()) } },
      useWorkspaces: (selector) => selector({ items: [{ workspaceId: 'w1', sessionIds: ['s1'] }] }),
    }
    await act(async () => { dockRoot.render(React.createElement(Dock, dockProps)) })
    assert.ok(dockNode.querySelector('.hermes-ziwei-pill'), '推演开关应渲染')
    await act(async () => { dockNode.querySelector('.hermes-ziwei-pill').click() })
    assert.equal(win.localStorage.getItem('hermes-ziwei-mode:s:s1'), 'on')
    const load = dockNode.querySelector('.hermes-ziwei-load')
    assert.ok(load, '推演开启后应出现「入盘」')
    await act(async () => { load.click() })
    assert.match(draft, /^【紫微命盘/, '入盘应把命盘档案放到草稿开头')
    assert.match(draft, /【\/紫微命盘】/)
    assert.match(draft, /五行局 水二局/)

    const tuning = dockNode.querySelector('.hermes-tuning .hermes-ziwei-pill')
    assert.equal(tuning.getAttribute('aria-pressed'), 'false')
    await act(async () => tuning.click())
    assert.match(draft, /^【紫微调参 v1 temperature=/)
    assert.match(draft, /事业/)
    await act(async () => tuning.click())
    assert.doesNotMatch(draft, /【紫微调参/)
    assert.match(draft, /【紫微命盘/)
    await act(async () => { root.unmount(); labelRoot.unmount(); dockRoot.unmount() })
  } finally {
    cleanups.reverse().forEach((fn) => fn())
    await win.happyDOM.abort()
    Object.assign(globalThis, previous)
  }
})
