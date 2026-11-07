    function poemOfDay(date = new Date()) {
      const month = date.getMonth()
      const seasonal = POEM_EXCERPTS.filter(poem => poem.seasons.includes(month + 1))
      const pool = seasonal.length ? seasonal : POEM_EXCERPTS
      const day = Math.floor(Date.UTC(date.getFullYear(), month, date.getDate()) / 86400000)
      return pool[((day % pool.length) + pool.length) % pool.length]
    }

    function DailyPoem() {
      const marker = React.useRef(null)
      const [target, setTarget] = React.useState(null)
      const [poem, setPoem] = React.useState(poemOfDay)

      React.useLayoutEffect(() => {
        const header = marker.current?.closest('header')
        if (!header) return
        const mount = document.createElement('span')
        mount.className = 'hermes-daily-poem'
        let row = null
        const position = () => {
          if (!row) return
          const left = row.getBoundingClientRect().left
          const end = Math.max(left, ...Array.from(row.children)
            .filter(child => child !== mount)
            .map(child => child.getBoundingClientRect().right))
          mount.style.setProperty('--hermes-poem-tabs-end', Math.ceil(end - left + 20) + 'px')
        }
        const resize = new ResizeObserver(position)
        const attach = () => {
          resize.disconnect()
          const next = header.querySelector('[data-conversation-tabs]')?.parentElement || null
          if (next !== row) {
            mount.remove()
            row = next
            if (row) row.appendChild(mount)
            setTarget(row ? mount : null)
          }
          if (row) {
            resize.observe(row)
            for (const child of row.children) {
              if (child !== mount) resize.observe(child)
            }
          }
          position()
        }
        const mutation = new MutationObserver(attach)
        mutation.observe(header, { childList: true, subtree: true })
        attach()
        return () => {
          mutation.disconnect()
          resize.disconnect()
          mount.remove()
        }
      }, [])

      React.useEffect(() => {
        let timer
        const refresh = () => {
          const now = new Date()
          setPoem(poemOfDay(now))
          clearTimeout(timer)
          const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
          timer = setTimeout(refresh, midnight.getTime() - now.getTime())
        }
        refresh()
        document.addEventListener('visibilitychange', refresh)
        return () => {
          clearTimeout(timer)
          document.removeEventListener('visibilitychange', refresh)
        }
      }, [])

      const verse = poem.lines.join('，') + '。'
      const credit = poem.dynasty + ' · ' + poem.author + '《' + poem.title + '》'
      return h(React.Fragment, null,
        h('span', { ref: marker, hidden: true }),
        target && require('react-dom').createPortal(
          h('span', { className: 'hermes-daily-poem-content', title: verse + '  ' + credit },
            h('span', { className: 'hermes-daily-poem-verse', style: { fontFamily: BRUSH } }, verse),
            h('span', { className: 'hermes-daily-poem-credit' }, credit)),
          target))
    }
