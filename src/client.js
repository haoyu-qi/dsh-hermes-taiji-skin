window.__ModuleLoader__.load({
  id: '@local/dsh-hermes-skin',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const PKG = '@local/dsh-hermes-skin'
    const SERIF = '"Songti SC", "STSong", "Source Han Serif SC", "Noto Serif SC", serif'
    // 行书毛笔字体栈：优先 macOS 自带的华文行楷（Xingkai SC），再退到志莽行书、手札体、楷体。
    const BRUSH = '"Xingkai SC", "STXingkai", "华文行楷", "Zhi Mang Xing", "Hannotate SC", "Kaiti SC", "STKaiti", "KaiTi", serif'

    /**
     * Alias-token overrides. `overrideTokens` stacks these over whichever
     * palette (light or dark) the reader chose, so the skin follows the
     * Appearance preference instead of forcing a scheme.
     */
    const TOKENS = {
      /* 月华白 / 玄夜 surfaces */
      '--dsw-alias-bg-base': { light: '#F8F5EE', dark: '#141118' },
      '--dsw-alias-bg-layer-1': { light: '#FDFAF4', dark: '#1C1822' },
      '--dsw-alias-bg-layer-2': { light: '#F4EEE4', dark: '#231E2B' },
      '--dsw-alias-bg-layer-3': { light: '#EFE7DB', dark: '#2A2433' },
      '--dsw-alias-bg-overlay': { light: '#FFFCF6', dark: '#2C2536' },
      '--dsw-alias-bg-module-platform': { light: '#F3ECE1', dark: '#241F2D' },
      '--dsw-alias-bg-multi-select': { light: '#F1EADD', dark: '#2A2433' },
      '--dsw-alias-bg-document-preview': { light: '#F1EADF', dark: '#1A1620' },
      '--dsw-alias-bg-document-selection': { light: 'rgba(176, 138, 70, 0.28)', dark: 'rgba(217, 190, 134, 0.30)' },
      '--dsw-alias-bg-skeleton': { light: '#E9DFD1', dark: '#FFFFFF14' },

      /* hairlines: 墨线 */
      '--dsw-alias-border-l1': { light: '#E9DFD0', dark: '#2C2637' },
      '--dsw-alias-border-l2': { light: '#DED1BF', dark: '#3A3247' },
      '--dsw-alias-border-l2-darkmode-thin': { light: '#E9DFD0', dark: '#3A3247' },
      '--dsw-alias-border-l3': { light: '#D2C3AC', dark: '#4A4058' },
      '--dsw-alias-border-l4': { light: '#C6B59A', dark: '#574B66' },

      /* 墨岩灰 / 月华白 text */
      '--dsw-alias-label-primary': { light: '#3A3342', dark: '#EFE9F1' },
      '--dsw-alias-label-secondary': { light: '#766D7C', dark: '#B7ACC0' },
      '--dsw-alias-label-tertiary': { light: '#7A7182', dark: '#978CA3' },
      '--dsw-alias-label-caption': { light: '#948B97', dark: '#7C7188' },
      '--dsw-alias-label-dimmed': { light: '#E7DED2', dark: '#3A3247' },
      '--dsw-alias-label-primary-dimmed': { light: '#262029', dark: '#F7F2FA' },
      '--dsw-alias-label-primary-foreground': { light: '#FFFCF6', dark: '#1A1620' },
      '--dsw-alias-label-primary-inverted': { light: '#FFFCF6', dark: '#1A1620' },
      '--dsw-alias-label-primary-bluish': { light: '#443A53', dark: '#E4D9F2' },
      '--dsw-alias-label-document-preview': { light: '#5A5163', dark: '#CFC5D7' },
      '--dsw-alias-label-deep-diving': { light: '#72618C', dark: '#C0A9DD' },
      '--dsw-alias-label-deep-diving-shimmer': { light: '#C6A15B', dark: '#D9BE86' },

      /* ink primary actions */
      '--dsw-alias-brand-primary': { light: '#3A3342', dark: '#E9DCC0' },
      '--dsw-alias-brand-primary-invert': { light: '#FFFCF6', dark: '#1A1620' },
      '--dsw-alias-brand-text': { light: '#3A3342', dark: '#E9DCC0' },
      '--dsw-alias-button-contrast-fill': { light: '#3A3342', dark: '#E9DCC0' },
      '--dsw-alias-button-elevated-fill': { light: '#FDFAF4', dark: '#2A2433' },
      '--dsw-alias-button-floating-fill': { light: '#FDFAF4', dark: '#241F2D' },
      '--dsw-alias-button-floating-hover': { light: '#F3ECE0', dark: '#302938' },
      '--dsw-alias-button-ghost-active-border': { light: '#B08A46', dark: '#D9BE86' },
      '--dsw-alias-button-ghost-active-fill': { light: '#F1E8DA', dark: '#332C3E' },
      '--dsw-alias-button-ghost-active-hover': { light: '#EBE0CF', dark: '#3A3247' },
      '--dsw-alias-button-primary-dimmed': { light: '#EDE4D4', dark: '#3A3247' },
      '--dsw-alias-button-primary-hover': { light: '#544A5E', dark: '#F4EBDD' },
      /* 曜金 send button; deep enough for the white glyph */
      '--dsw-alias-button-info-fill': { light: '#8F6C2C', dark: '#A2762E' },
      '--dsw-alias-button-info-hover': { light: '#A9823A', dark: '#B08A46' },

      /* hover / selection washes */
      '--dsw-alias-interactive-bg-hover': { light: '#3A33420F', dark: '#EFE9F114' },
      '--dsw-alias-interactive-bg-active': { light: '#3A334224', dark: '#EFE9F124' },
      '--dsw-alias-interactive-bg-hover-solid': { light: '#F0E8DB', dark: '#302938' },
      '--dsw-alias-interactive-bg-hover-accent': { light: '#B08A4626', dark: '#D9BE8629' },
      '--dsw-alias-interactive-bg-hover-danger': { light: '#A6473D14', dark: '#D98B7C1F' },

      '--dsw-alias-menu-icon': { light: '#6D6473', dark: '#B7ACC0' },
      '--dsw-alias-link': { light: '#72618C', dark: '#C0A9DD' },

      /* markdown: warm paper ink */
      '--dsw-alias-markdown-citation': { light: '#F2E9DC', dark: '#241F2D' },
      '--dsw-alias-markdown-code-block': { light: '#F4EEE4', dark: '#1A1620' },
      '--dsw-alias-markdown-code-block-banner': { light: '#EFE7DA', dark: '#221C2A' },
      '--dsw-alias-markdown-code-segment-selected': { light: '#FDFAF4', dark: '#2A2433' },
      '--dsw-alias-markdown-code-segment-unselected': { light: '#EFE7DA', dark: '#1A1620' },
      '--dsw-alias-markdown-inline-code': { light: '#F2EADC', dark: '#231E2B' },
      '--dsw-alias-markdown-placeholder': { light: '#E9DFD0', dark: '#2A2433' },
      '--dsw-alias-markdown-tag': { light: '#EFE6D7', dark: '#2A2433' },

      '--dsw-alias-scrollbar-bg-l1': { light: '#DCD0BC', dark: '#3A3247' },
      '--dsw-alias-scrollbar-bg-l2': { light: '#D5C7B0', dark: '#3E3450' },
      '--dsw-alias-scrollbar-hover-l1': { light: '#C9B99E', dark: '#4A4058' },
      '--dsw-alias-scrollbar-hover-l2': { light: '#C0AE90', dark: '#574B66' },

      /* state colours: ink-friendly, still semantic */
      '--dsw-alias-state-business-primary': { light: '#9C7833', dark: '#D9BE86' },
      '--dsw-alias-state-business-tertiary': { light: '#F2E3C9', dark: '#3A2E1B' },
      '--dsw-alias-state-error-primary': { light: '#A6473D', dark: '#D98B7C' },
      '--dsw-alias-state-error-secondary': { light: '#C2705F', dark: '#D98B7C' },
      '--dsw-alias-state-idle-primary': { light: '#C3B8AC', dark: '#6B6175' },
      '--dsw-alias-state-success-primary': { light: '#527557', dark: '#86B08A' },
      '--dsw-alias-state-success-secondary': { light: '#7F9E7E', dark: '#9CC29C' },
      '--dsw-alias-state-success-tertiary': { light: '#E8F0E4', dark: '#25332A' },
      '--dsw-alias-state-warn-primary': { light: '#B3802E', dark: '#D9A65B' },
      '--dsw-alias-state-warn-secondary': { light: '#C99B55', dark: '#E3B87A' },
      '--dsw-alias-state-warn-tertiary': { light: '#F7EBD6', dark: '#3A2E1B' },
      '--dsw-alias-state-warn-label': { light: '#94661F', dark: '#D9A65B' },

      '--dsw-alias-switch-thumb': { light: '#FFFCF6', dark: '#C9BDA3' },
      '--dsw-alias-toast-bg': { light: '#3A3342', dark: '#2C2536' },
      '--dsw-alias-toast-label': { light: '#FFFCF6', dark: '#F2EBF5' },
      '--dsw-alias-tooltip-bg': { light: '#3A3342', dark: '#2C2536' },
      '--dsw-alias-tooltip-key-bg': { light: '#5A5163', dark: '#453C52' },

      /* named surfaces */
      '--dsw-specific-bubble': { light: '#F0E7D8', dark: '#2A2433' },
      '--dsw-specific-bubble-highlight': { light: '#E7D9C4', dark: '#3A3247' },
      '--dsw-specific-input-major': { light: '#FDFAF4', dark: '#241F2D' },
      '--dsw-specific-login-input': { light: '#FBF7F0', dark: '#1A1620' },
      '--dsw-specific-menu': { light: '#FBF7F0F0', dark: '#262030F0' },
      '--dsw-specific-selector': { light: '#F1E9DC', dark: '#2A2433' },
      '--dsw-specific-sidebar-fill': { light: '#F3EDE2', dark: '#100D14' },
      '--dsw-specific-sidebar-nav-item-active': { light: '#EAE0CF', dark: '#2A2433' },
      '--dsw-specific-sidebar-nav-item-active-accent': { light: '#F0E2C6', dark: '#382D20' },
      '--dsw-specific-sidebar-nav-item-hover': { light: '#EFE7DA', dark: '#221C2A' },
      '--dsw-specific-tip': { light: '#F0E8DB', dark: '#241F2D' },
      '--dsw-alias-menu-group-header-fill': { light: '#F8F3EAF2', dark: '#201A28F0' },

      /* diffs stay legible, just warmed */
      '--dsw-alias-code-diff-added': { light: '#5275571F', dark: '#86B08A1F' },
      '--dsw-alias-code-diff-deleted': { light: '#A6473D1F', dark: '#D98B7C1F' },

      /* muted ink syntax palette for fenced code */
      '--shiki-token-constant': { light: '#7A5C2E', dark: '#D9BE86' },
      '--shiki-token-string': { light: '#527557', dark: '#9CC29C' },
      '--shiki-token-comment': { light: '#8B8291', dark: '#7C7188' },
      '--shiki-token-keyword': { light: '#9C4A5E', dark: '#E3A0B2' },
      '--shiki-token-parameter': { light: '#A05E2E', dark: '#E3B87A' },
      '--shiki-token-function': { light: '#6F5E8A', dark: '#C0A9DD' },
      '--shiki-token-string-expression': { light: '#4F7355', dark: '#9CC29C' },
      '--shiki-token-punctuation': { light: '#6D6473', dark: '#B7ACC0' },
      '--shiki-token-link': { light: '#72618C', dark: '#C0A9DD' },

      /* skin-only tokens consumed by the artwork */
      '--hermes-ink': { light: '#383344', dark: '#EFE6F2' },
      '--hermes-paper': { light: '#FDFAF4', dark: '#1C1822' },
      '--hermes-gold': { light: '#B58A43', dark: '#D9BE86' },
      /* small gold text needs a deeper tone on paper (AA at 11–13px) */
      '--hermes-gold-strong': { light: '#8F6C2C', dark: '#D9BE86' },
      '--hermes-violet': { light: '#8E7FA8', dark: '#C0A9DD' },
      '--hermes-art': { light: '#766D7C', dark: '#B7ACC0' },
      /* faint ink for the left-hand background inscription */
      '--hermes-inscription': { light: '#38334424', dark: '#EFE6F22E' },
    }

    const CSS = `
/* ——— V2 · 字标、占卜令牌、箴言 ——— */
.hermes-brand-lockup{display:inline-flex;flex-direction:column;justify-content:center;gap:0;min-width:0;line-height:1;overflow:hidden}
.hermes-brand-zh{font-family:${SERIF};font-size:17px;font-weight:500;line-height:17px;letter-spacing:.12em;color:var(--dsw-alias-label-primary);white-space:nowrap}
.hermes-brand-en{font-size:6.5px;font-weight:500;line-height:7px;letter-spacing:.34em;color:var(--hermes-gold);opacity:.95;white-space:nowrap;transform:translateX(.08em)}
.hermes-brand-row{display:inline-flex;align-items:center;gap:10px;min-width:0}
/* 占卜钮：一枚袖珍令牌——上圆下平、双金线框、顶部穿绳孔，占/卜 二字竖刻。 */
.hermes-fortune-trigger{position:relative;display:inline-flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;flex:none;box-sizing:border-box;width:17px;height:24px;padding:4px 0 1px;border:1px solid var(--hermes-gold);border-radius:6px 6px 2px 2px;background:linear-gradient(180deg,color-mix(in srgb,var(--hermes-gold) 24%,var(--dsw-alias-bg-layer-1)),var(--dsw-alias-bg-layer-1) 46%,var(--dsw-alias-bg-layer-2));color:var(--hermes-gold);font-family:${SERIF};font-size:8px;font-weight:500;line-height:1;letter-spacing:0;white-space:nowrap;cursor:pointer;user-select:none;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--hermes-gold) 26%,transparent),inset 0 -2px 4px color-mix(in srgb,var(--hermes-gold) 16%,transparent),0 1px 2px rgba(20,17,24,.14);transition:color .18s ease,box-shadow .18s ease}
.hermes-fortune-trigger::before{content:"";position:absolute;top:2.4px;left:50%;width:2px;height:2px;margin-left:-1px;border-radius:50%;background:color-mix(in srgb,var(--dsw-alias-bg-base) 70%,var(--hermes-gold));box-shadow:0 0 0 .6px color-mix(in srgb,var(--hermes-gold) 55%,transparent)}
.hermes-fortune-trigger-glyph{display:block;font-size:8px;line-height:8px}
.hermes-fortune-trigger:hover{color:var(--dsw-alias-label-primary);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--hermes-gold) 42%,transparent),0 0 10px color-mix(in srgb,var(--hermes-gold) 28%,transparent),0 2px 4px rgba(20,17,24,.16)}
.hermes-fortune-trigger:focus-visible{outline:2px solid var(--hermes-gold);outline-offset:2px}

/* ——— V2 · composer 下沿：思考氛围选择器 + 皮肤设置 + 箴言 ——— */
.hermes-skindock{position:relative;display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:8px;width:100%;margin:0 0 9px;padding:0;font-family:var(--dsw-font-family)}
.hermes-depthbar{position:relative;display:inline-flex;align-items:center;gap:2px;box-sizing:border-box;padding:3px;border:1px solid color-mix(in srgb,var(--hermes-gold) 26%,var(--dsw-alias-border-l1));border-radius:999px;background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 68%,transparent);box-shadow:0 2px 10px rgba(20,17,24,.06);backdrop-filter:blur(8px)}
.hermes-mode-pill{display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border:0;border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:10.5px;line-height:1;letter-spacing:.14em;cursor:pointer;transition:background-color .22s ease,color .22s ease,box-shadow .22s ease;white-space:nowrap}
.hermes-mode-pill:hover{color:var(--dsw-alias-label-primary);background:color-mix(in srgb,var(--hermes-gold) 10%,transparent)}
.hermes-mode-pill[aria-pressed="true"]{color:var(--dsw-alias-label-primary);background:color-mix(in srgb,var(--hermes-gold) 17%,var(--dsw-alias-bg-layer-1));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--hermes-gold) 46%,transparent),0 1px 3px rgba(20,17,24,.08)}
.hermes-mode-pill:focus-visible{outline:2px solid var(--hermes-gold);outline-offset:1px}
.hermes-mode-dot{width:4px;height:4px;border-radius:50%;background:currentColor;opacity:.5}
.hermes-mode-pill[aria-pressed="true"] .hermes-mode-dot{background:var(--hermes-gold);opacity:1;box-shadow:0 0 5px color-mix(in srgb,var(--hermes-gold) 70%,transparent)}
.hermes-thinking{display:inline-flex;align-items:center;gap:5px;margin-left:2px;padding:4px 8px;color:var(--hermes-gold);font-size:10px;line-height:1;letter-spacing:.18em;white-space:nowrap;animation:hermes-thinking-in .3s ease both}
.hermes-thinking-dot{width:3px;height:3px;border-radius:50%;background:currentColor;animation:hermes-thinking-wave 1.2s ease-in-out infinite}
.hermes-thinking-dot:nth-child(2){animation-delay:.16s}
.hermes-thinking-dot:nth-child(3){animation-delay:.32s}
.hermes-skin-gear{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;margin-left:1px;padding:0;border:0;border-radius:50%;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;line-height:1;cursor:pointer;transition:color .18s ease,background-color .18s ease}
.hermes-skin-gear:hover,.hermes-skin-gear[aria-expanded="true"]{color:var(--hermes-gold);background:color-mix(in srgb,var(--hermes-gold) 12%,transparent)}
.hermes-skin-gear:focus-visible{outline:2px solid var(--hermes-gold);outline-offset:1px}
.hermes-skin-menu{position:absolute;right:0;bottom:calc(100% + 10px);z-index:30;width:196px;box-sizing:border-box;padding:8px;border:1px solid color-mix(in srgb,var(--hermes-gold) 34%,var(--dsw-alias-border-l1));border-radius:12px;background:var(--dsw-alias-bg-overlay);box-shadow:0 18px 46px rgba(20,17,24,.2),0 0 0 1px rgba(255,252,246,.5) inset;animation:hermes-menu-in .18s ease both}
.hermes-skin-menu::after{content:"";position:absolute;right:14px;bottom:-5px;width:8px;height:8px;transform:rotate(45deg);border-right:1px solid color-mix(in srgb,var(--hermes-gold) 34%,var(--dsw-alias-border-l1));border-bottom:1px solid color-mix(in srgb,var(--hermes-gold) 34%,var(--dsw-alias-border-l1));background:var(--dsw-alias-bg-overlay)}
.hermes-skin-menu-label{padding:4px 8px 6px;color:var(--dsw-alias-label-caption);font-size:9.5px;line-height:1.2;letter-spacing:.22em}
.hermes-skin-toggle{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;box-sizing:border-box;padding:7px 8px;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:11px;line-height:1;letter-spacing:.08em;text-align:left;cursor:pointer}
.hermes-skin-toggle:hover{background:var(--dsw-alias-interactive-bg-hover)}
.hermes-skin-toggle [data-track]{position:relative;flex:none;width:26px;height:14px;border-radius:999px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);transition:background-color .2s ease,border-color .2s ease}
.hermes-skin-toggle [data-track]::after{content:"";position:absolute;top:1.5px;left:1.5px;width:9px;height:9px;border-radius:50%;background:var(--dsw-alias-label-caption);transition:transform .2s ease,background-color .2s ease}
.hermes-skin-toggle[aria-checked="true"]{color:var(--dsw-alias-label-primary)}
.hermes-skin-toggle[aria-checked="true"] [data-track]{border-color:color-mix(in srgb,var(--hermes-gold) 60%,transparent);background:color-mix(in srgb,var(--hermes-gold) 24%,var(--dsw-alias-bg-layer-1))}
.hermes-skin-toggle[aria-checked="true"] [data-track]::after{transform:translateX(11px);background:var(--hermes-gold)}
.hermes-motto{display:inline-flex;align-items:center;gap:7px;color:var(--hermes-art);font-size:11px;line-height:16px;letter-spacing:.18em;opacity:.86;white-space:nowrap;user-select:none}
.hermes-motto-star{color:var(--hermes-gold);font-size:10px;line-height:1;opacity:.95}

/* ——— V2 · 背景：题字、八卦星轮、水墨山川 ——— */
.hermes-inscription{position:absolute;top:clamp(64px,11vh,124px);left:clamp(300px,26vw,520px);display:flex;flex-direction:row-reverse;align-items:flex-start;gap:.72em;color:var(--hermes-inscription);font-family:${BRUSH};font-weight:400;white-space:nowrap;user-select:none;pointer-events:none;opacity:var(--hermes-inscription-opacity,.9);transition:opacity .6s ease}
.hermes-inscription-col{display:flex;flex-direction:column;align-items:flex-start;gap:.85em}
.hermes-inscription-col--stagger{margin-top:4.2em}
.hermes-inscription-line{display:block;writing-mode:vertical-rl;text-orientation:upright;font-size:clamp(20px,min(4.2vh,2.4vw),38px);line-height:1.2;letter-spacing:.16em;padding-top:.16em}
.hermes-ambient{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;user-select:none}
.hermes-ambient-orb{position:absolute;top:-9vh;right:-4vw;width:min(540px,42vw,60vh);aspect-ratio:1;color:var(--hermes-gold);opacity:var(--hermes-orb-opacity,.26);filter:drop-shadow(0 0 34px color-mix(in srgb,var(--hermes-gold) 14%,transparent));animation:hermes-drift 38s ease-in-out infinite;transition:opacity .8s ease,filter .8s ease;pointer-events:none}
.hermes-ambient-orb-svg{display:block;width:100%;height:100%}
.hermes-ambient-orb-inner{transform-box:view-box;transform-origin:300px 300px;animation:hermes-orb-spin var(--hermes-orb-spin-duration,150s) linear infinite}
.hermes-ambient-ridges{position:absolute;left:0;right:0;bottom:0;width:100%;height:260px;color:var(--hermes-ink);opacity:var(--hermes-ridges-opacity,.1);-webkit-mask-image:linear-gradient(to top,#000 24%,rgba(0,0,0,.55) 62%,transparent 100%);mask-image:linear-gradient(to top,#000 24%,rgba(0,0,0,.55) 62%,transparent 100%);transition:opacity .6s ease}
.hermes-ambient-star{position:absolute;width:2px;height:2px;border-radius:50%;background:var(--hermes-gold);box-shadow:0 0 6px var(--hermes-gold);opacity:var(--hermes-star-opacity,.55);animation:hermes-twinkle 9s ease-in-out infinite}
.hermes-ambient-star--violet{background:var(--hermes-violet);box-shadow:0 0 6px var(--hermes-violet)}

/* ——— V2 · 思考深度 → 装饰密度（淡雅 / 平衡 / 沉浸 / 自动） ——— */
html[data-hermes-depth="light"]{--hermes-orb-opacity:.13;--hermes-orb-spin-duration:0s;--hermes-star-opacity:0;--hermes-inscription-opacity:.62;--hermes-ridges-opacity:.07}
html[data-hermes-depth="balanced"]{--hermes-orb-opacity:.25;--hermes-orb-spin-duration:150s;--hermes-star-opacity:.5;--hermes-inscription-opacity:.9;--hermes-ridges-opacity:.1}
html[data-hermes-depth="immersive"]{--hermes-orb-opacity:.34;--hermes-orb-spin-duration:80s;--hermes-star-opacity:.78;--hermes-inscription-opacity:1;--hermes-ridges-opacity:.13}
html[data-hermes-depth="auto"]{--hermes-orb-opacity:.25;--hermes-orb-spin-duration:150s;--hermes-star-opacity:.5;--hermes-inscription-opacity:.9;--hermes-ridges-opacity:.1}
html[data-hermes-depth="auto"][data-hermes-thinking="on"]{--hermes-orb-opacity:.34;--hermes-orb-spin-duration:80s;--hermes-star-opacity:.78;--hermes-inscription-opacity:1;--hermes-ridges-opacity:.13}
html[data-hermes-depth="light"] .hermes-ambient-orb-inner{animation:none}
html[data-hermes-depth="light"] .hermes-ambient-star{display:none}
html[data-hermes-thinking="on"] .hermes-ambient-orb-inner{animation-duration:var(--hermes-orb-thinking-spin,28s)}
html[data-hermes-thinking="on"] .hermes-ambient-orb{filter:drop-shadow(0 0 48px color-mix(in srgb,var(--hermes-gold) 28%,transparent))}
html[data-hermes-depth="immersive"] .hermes-ambient-orb::after,
html[data-hermes-depth="auto"][data-hermes-thinking="on"] .hermes-ambient-orb::after{content:"";position:absolute;inset:18%;border-radius:50%;border:1px solid color-mix(in srgb,var(--hermes-gold) 24%,transparent);animation:hermes-orb-halo 6s ease-in-out infinite}

/* ——— V2 · 主界面：输入框、侧栏选中 ——— */
[data-slot="conversation.composer.bar"]{position:relative;border:1px solid color-mix(in srgb,var(--hermes-gold) 34%,var(--dsw-alias-border-l1))!important;border-radius:18px!important;background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 92%,transparent)!important;box-shadow:0 18px 46px -20px rgba(56,51,68,.28),0 2px 8px rgba(56,51,68,.05),inset 0 1px 0 rgba(255,252,246,.72)!important;transition:box-shadow .3s ease,border-color .3s ease}
[data-slot="conversation.composer.bar"]:focus-within{border-color:color-mix(in srgb,var(--hermes-gold) 62%,var(--dsw-alias-border-l2))!important;box-shadow:0 22px 52px -20px rgba(56,51,68,.3),0 0 0 3px color-mix(in srgb,var(--hermes-gold) 12%,transparent),inset 0 1px 0 rgba(255,252,246,.8)!important}
html[data-hermes-depth="balanced"] [data-slot="conversation.composer.bar"]{animation:hermes-composer-breath 7.5s ease-in-out infinite}
html[data-hermes-depth="immersive"] [data-slot="conversation.composer.bar"]{border-color:color-mix(in srgb,var(--hermes-gold) 52%,var(--dsw-alias-border-l2))!important;box-shadow:0 22px 54px -18px rgba(56,51,68,.32),0 0 0 1px color-mix(in srgb,var(--hermes-gold) 26%,transparent),0 0 26px -6px color-mix(in srgb,var(--hermes-gold) 30%,transparent),inset 0 1px 0 rgba(255,252,246,.8)!important;animation:hermes-composer-breath 5.5s ease-in-out infinite}
html[data-hermes-depth="auto"][data-hermes-thinking="on"] [data-slot="conversation.composer.bar"]{border-color:color-mix(in srgb,var(--hermes-gold) 52%,var(--dsw-alias-border-l2))!important;box-shadow:0 22px 54px -18px rgba(56,51,68,.32),0 0 0 1px color-mix(in srgb,var(--hermes-gold) 26%,transparent),0 0 26px -6px color-mix(in srgb,var(--hermes-gold) 30%,transparent)!important;animation:hermes-composer-breath 5.5s ease-in-out infinite}
html[data-hermes-thinking="on"] [data-slot="conversation.composer.bar"]{box-shadow:0 22px 54px -18px rgba(56,51,68,.32),0 0 0 1px color-mix(in srgb,var(--hermes-gold) 24%,transparent),0 0 30px -8px color-mix(in srgb,var(--hermes-gold) 34%,transparent),inset 0 1px 0 rgba(255,252,246,.8)!important}
[data-slot="sidebar.workspaces"] [aria-current="page"],
[data-slot="sidebar.workspaces"] [aria-selected="true"],
[data-slot="sidebar.workspaces"] [data-active="true"]{background:linear-gradient(90deg,color-mix(in srgb,var(--hermes-gold) 15%,var(--dsw-specific-sidebar-nav-item-active)),var(--dsw-specific-sidebar-nav-item-active) 78%)!important;box-shadow:inset 2px 0 0 var(--hermes-gold)!important}

/* ——— V2 · 启动：混沌初开 → 太极初生 → 八卦归位 → 万象归一 ——— */
.hermes-boot{position:fixed;inset:0;z-index:9000;overflow:hidden;pointer-events:auto;cursor:default;user-select:none;color:var(--hermes-ink,#383344);background:radial-gradient(120% 82% at 50% 44%,rgba(181,138,67,.13),transparent 58%),radial-gradient(90% 62% at 50% 108%,rgba(118,109,124,.10),transparent 62%),var(--dsw-alias-bg-base,#F8F5EE);animation:hermes-boot-in 520ms ease both}
.hermes-boot--out{animation:hermes-boot-out 620ms cubic-bezier(.4,0,.6,1) both}
.hermes-boot-frame{position:absolute;inset:clamp(14px,2.4vh,28px);border:1px solid var(--hermes-gold,#B58A43);opacity:.18;pointer-events:none}
.hermes-boot-ink{position:absolute;border-radius:50%;pointer-events:none;background:radial-gradient(circle at 50% 50%,color-mix(in srgb,var(--hermes-ink,#383344) 34%,transparent),color-mix(in srgb,var(--hermes-ink,#383344) 12%,transparent) 38%,transparent 68%);filter:blur(18px);opacity:0;animation:hermes-ink-bloom 1500ms cubic-bezier(.2,.6,.3,1) both}
.hermes-boot-ink--a{left:50%;top:50%;width:52vmin;height:52vmin;margin:-26vmin 0 0 -26vmin;animation-delay:40ms}
.hermes-boot-ink--b{left:32%;top:58%;width:30vmin;height:30vmin;margin:-15vmin 0 0 -15vmin;animation-delay:220ms}
.hermes-boot-ink--c{right:27%;top:36%;width:24vmin;height:24vmin;margin:-12vmin 0 0 -12vmin;animation-delay:380ms}
.hermes-boot-line{position:absolute;margin:0;padding:.35em 0;font-family:${BRUSH};font-weight:400;line-height:1.18;color:var(--hermes-ink,#383344);white-space:nowrap;text-shadow:0 0 20px rgba(181,138,67,.18);opacity:0;animation:hermes-boot-write-h 1100ms cubic-bezier(.22,.61,.36,1) both}
.hermes-boot-line--top{top:clamp(26px,8.5vh,104px);left:50%;transform:translateX(-50%);font-size:clamp(20px,min(4.5vh,3.4vw),48px);letter-spacing:.16em;animation-delay:1750ms}
.hermes-boot-line--bottom{bottom:clamp(26px,8.5vh,104px);left:50%;transform:translateX(-50%);font-size:clamp(20px,min(4.5vh,3.4vw),48px);letter-spacing:.16em;animation-delay:2350ms}
.hermes-boot-rail{position:absolute;top:0;bottom:0;display:flex;align-items:center;pointer-events:none}
.hermes-boot-rail--left{left:clamp(14px,3vw,60px)}
.hermes-boot-rail--right{right:clamp(14px,3vw,60px)}
.hermes-boot-line--left,.hermes-boot-line--right{position:static;padding:0 .35em;writing-mode:vertical-rl;text-orientation:upright;font-size:clamp(17px,3.6vh,40px);letter-spacing:.2em;animation-name:hermes-boot-write-v}
.hermes-boot-line--left{animation-delay:1950ms}
.hermes-boot-line--right{animation-delay:2650ms}
.hermes-boot-core{position:absolute;left:50%;top:50%;width:clamp(180px,37vh,400px);aspect-ratio:1;transform:translate(-50%,-50%);opacity:0;animation:hermes-boot-rise 1000ms cubic-bezier(.16,.84,.28,1) 260ms both}
.hermes-boot-core .hermes-bagua{filter:drop-shadow(0 0 30px rgba(181,138,67,.26))}
.hermes-boot--s0 .hermes-boot-core{opacity:0;animation:none}
.hermes-boot--s1 .hermes-boot-core{opacity:1}
.hermes-boot--s0 .hermes-bagua-rings,
.hermes-boot--s0 .hermes-bagua-trigrams,
.hermes-boot--s0 .hermes-bagua-markers,
.hermes-boot--s1 .hermes-bagua-rings,
.hermes-boot--s1 .hermes-bagua-trigrams,
.hermes-boot--s1 .hermes-bagua-markers{opacity:0}
.hermes-boot--s2 .hermes-bagua-rings,
.hermes-boot--s3 .hermes-bagua-rings,
.hermes-boot--s2 .hermes-bagua-trigrams,
.hermes-boot--s3 .hermes-bagua-trigrams,
.hermes-boot--s2 .hermes-bagua-markers,
.hermes-boot--s3 .hermes-bagua-markers{opacity:1}
.hermes-boot--s2 .hermes-boot-core .hermes-bagua-ring{animation:hermes-boot-turn 3200ms cubic-bezier(.2,.55,.3,1) both}
.hermes-boot--s2 .hermes-boot-core .hermes-bagua-glow{animation:hermes-glow 5s ease-in-out infinite}
.hermes-boot--s3 .hermes-boot-core .hermes-bagua-ring{animation:hermes-boot-turn 3200ms cubic-bezier(.2,.55,.3,1) both}
.hermes-boot--still .hermes-boot-core,
.hermes-boot--still .hermes-boot-line{animation:none!important;opacity:1!important;clip-path:none!important;filter:none!important}
.hermes-boot--still .hermes-boot-core .hermes-bagua-ring{animation:none!important}
/* 八卦逐组落位：--i 由组件按先天卦序写入 */
.hermes-boot--s0 .hermes-bagua-trigram,
.hermes-boot--s1 .hermes-bagua-trigram{opacity:0}
.hermes-boot--s2 .hermes-bagua-trigram{animation:hermes-trigram-in 520ms cubic-bezier(.2,.7,.3,1) both;animation-delay:calc(var(--i) * 85ms)}
.hermes-boot--s3 .hermes-bagua-trigram{opacity:1;animation:none}
.hermes-boot--still .hermes-bagua-trigram{opacity:1;animation:none!important}
.hermes-boot--s1 .hermes-bagua-taiji{animation:hermes-taiji-in 900ms cubic-bezier(.2,.7,.3,1) both}
.hermes-boot--s0 .hermes-bagua-taiji{opacity:0}
/* 八卦盘本体：开机、发送共用 */
.hermes-bagua{display:block;width:100%;height:100%}
.hermes-bagua-ring{transform-box:view-box;transform-origin:100px 100px}
.hermes-bagua-glow{transform-origin:100px 100px}
.hermes-send{position:fixed;inset:0;z-index:8500;display:flex;align-items:center;justify-content:center;overflow:hidden;pointer-events:none;user-select:none}
.hermes-send-plate{width:clamp(150px,23vh,250px);aspect-ratio:1;opacity:0;animation:hermes-send-plate 1300ms cubic-bezier(.22,.61,.36,1) both}
.hermes-send-plate .hermes-bagua{filter:drop-shadow(0 0 22px rgba(181,138,67,.35))}
.hermes-send-plate .hermes-bagua-ring{animation:hermes-send-turn 1180ms cubic-bezier(.16,.6,.24,1) both}
.hermes-send-plate .hermes-bagua-glow{animation:hermes-send-glow 1180ms ease-in-out both}
/* 发送键：曜金圆键上的一枚太极（白/金两仪）。 */
[data-slot="conversation.composer.bar"] button:has(path[d^="M8.3125"]),
[data-slot="conversation.composer.bar"] button[class*="_primary"]:has(svg path){background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3Cmask id='m' maskUnits='userSpaceOnUse' x='0' y='0' width='32' height='32'%3E%3Crect width='32' height='32' fill='%23fff'/%3E%3Ccircle cx='16' cy='8.5' r='2.8' fill='%23000'/%3E%3C/mask%3E%3C/defs%3E%3Cpath mask='url(%23m)' d='M16 1a15 15 0 0 1 0 30 7.5 7.5 0 0 1 0-15 7.5 7.5 0 0 0 0-15Z' fill='%23FFFCF6'/%3E%3Ccircle cx='16' cy='23.5' r='2.8' fill='%23FFFCF6'/%3E%3C/svg%3E");background-position:center;background-size:100% 100%;background-repeat:no-repeat}
[data-slot="conversation.composer.bar"] button:has(path[d^="M8.3125"]) > svg,
[data-slot="conversation.composer.bar"] button[class*="_primary"]:has(svg path) > svg{display:none}

/* ——— V2 · 今日占卜：宣纸细金框签卡 ——— */
.hermes-fortune{position:fixed;inset:0;z-index:8600;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(20,17,24,.4);animation:hermes-fortune-in 200ms ease both;backdrop-filter:blur(2px)}
.hermes-fortune-card{position:relative;width:min(452px,calc(100vw - 32px));max-height:calc(100vh - 40px);overflow:hidden;box-sizing:border-box;border:1px solid color-mix(in srgb,var(--hermes-gold) 58%,transparent);border-radius:18px;background:radial-gradient(122% 78% at 50% -12%,color-mix(in srgb,var(--dsw-alias-bg-layer-1) 78%,#FFFFFF) 0%,transparent 62%),linear-gradient(180deg,color-mix(in srgb,var(--dsw-alias-bg-layer-1) 94%,#FFFFFF) 0%,var(--dsw-alias-bg-layer-1) 52%,color-mix(in srgb,var(--dsw-alias-bg-layer-2) 88%,var(--dsw-alias-bg-layer-1)) 100%);color:var(--dsw-alias-label-primary);font-family:${SERIF};box-shadow:0 30px 84px rgba(20,17,24,.34),inset 0 0 0 1px rgba(255,252,246,.66);animation:hermes-fortune-rise 360ms cubic-bezier(.2,.8,.3,1) both}
.hermes-fortune-card::after{content:"";position:absolute;inset:7px;border:1px solid color-mix(in srgb,var(--hermes-gold) 26%,transparent);border-radius:12px;pointer-events:none;z-index:3}
.hermes-fortune-art{position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.6}
.hermes-fortune-inner{position:relative;z-index:2;display:flex;flex-direction:column;max-height:calc(100vh - 40px);overflow:auto;padding:24px 34px 20px;scrollbar-width:thin}
.hermes-fortune-head{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding-bottom:12px;border-bottom:1px solid color-mix(in srgb,var(--hermes-gold) 26%,var(--dsw-alias-border-l1))}
.hermes-fortune-kicker{display:inline-flex;align-items:center;gap:7px;font-size:12px;letter-spacing:.26em;color:var(--hermes-gold-strong)}
.hermes-fortune-kicker::before,.hermes-fortune-kicker::after{content:"◇";font-size:8px;opacity:.8;letter-spacing:0}
.hermes-fortune-date{font-size:11px;line-height:1.4;letter-spacing:.06em;color:var(--dsw-alias-label-tertiary);font-family:var(--dsw-font-family);text-align:right}
.hermes-fortune-core{display:flex;flex-direction:column;align-items:center;gap:8px;padding:20px 0 6px}
.hermes-fortune-trigram{display:block;color:var(--hermes-gold);filter:drop-shadow(0 2px 6px rgba(181,138,67,.18))}
.hermes-fortune-title{font-size:31px;font-weight:500;letter-spacing:.2em;text-indent:.2em;line-height:1.3}
.hermes-fortune-grade{position:relative;display:inline-flex;align-items:center;gap:8px;font-size:11.5px;letter-spacing:.24em;text-indent:.24em;color:var(--hermes-gold-strong);padding:3px 18px;border:1px solid color-mix(in srgb,var(--hermes-gold) 44%,transparent);border-radius:999px;background:color-mix(in srgb,var(--hermes-gold) 6%,transparent)}
.hermes-fortune-grade::before,.hermes-fortune-grade::after{content:"◇";position:absolute;top:50%;font-size:8px;line-height:1;transform:translateY(-50%);opacity:.75;text-indent:0}
.hermes-fortune-grade::before{left:-13px}
.hermes-fortune-grade::after{right:-13px}
.hermes-fortune-poem{margin:6px 0 0;text-align:center;font-size:19px;line-height:1.95;letter-spacing:.12em;color:var(--dsw-alias-label-primary)}
.hermes-fortune-rule{display:flex;align-items:center;gap:10px;margin:16px 0 12px;color:var(--hermes-gold);opacity:.65}
.hermes-fortune-rule::before,.hermes-fortune-rule::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,transparent,currentColor)}
.hermes-fortune-rule::after{background:linear-gradient(90deg,currentColor,transparent)}
.hermes-fortune-rule span{font-size:8px;line-height:1;transform:rotate(45deg);border:1px solid currentColor;width:5px;height:5px}
.hermes-fortune-read{margin:0;text-align:center;font-size:12.5px;line-height:1.9;letter-spacing:.04em;color:var(--dsw-alias-label-secondary);font-family:var(--dsw-font-family)}
.hermes-fortune-tags{display:flex;gap:10px;justify-content:center;margin-top:18px;flex-wrap:wrap}
.hermes-fortune-tag{display:inline-flex;align-items:center;gap:7px;font-size:12px;line-height:1;letter-spacing:.06em;padding:4px 14px 4px 4px;border-radius:999px;border:1px solid color-mix(in srgb,var(--hermes-gold) 42%,transparent);color:var(--dsw-alias-label-secondary);font-family:var(--dsw-font-family);background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 55%,transparent)}
.hermes-fortune-tag b{display:inline-flex;align-items:center;justify-content:center;width:21px;height:21px;border-radius:50%;background:#8F6C2C;color:#FFFCF6;font-family:${SERIF};font-size:12px;font-weight:500;letter-spacing:0}
.hermes-fortune-tag--bad{border-color:color-mix(in srgb,var(--hermes-violet) 56%,transparent)}
.hermes-fortune-tag--bad b{background:#6E5C85;color:#FFFCF6}
.hermes-fortune-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:18px;padding-top:14px;border-top:1px solid color-mix(in srgb,var(--hermes-gold) 22%,var(--dsw-alias-border-l1))}
.hermes-fortune-note{font-size:10.5px;letter-spacing:.18em;color:var(--dsw-alias-label-tertiary);font-family:var(--dsw-font-family)}
.hermes-fortune-close{cursor:pointer;min-width:88px;background:linear-gradient(180deg,color-mix(in srgb,var(--dsw-alias-bg-layer-1) 96%,var(--hermes-gold)),var(--dsw-alias-bg-layer-1));border:1px solid color-mix(in srgb,var(--hermes-gold) 50%,transparent);border-radius:11px;color:var(--hermes-gold-strong);font:inherit;font-family:${SERIF};font-size:13px;letter-spacing:.2em;text-indent:.2em;padding:8px 18px;box-shadow:0 3px 10px rgba(56,51,68,.08),inset 0 1px 0 rgba(255,252,246,.8);transition:background-color .16s ease,color .16s ease,box-shadow .16s ease}
.hermes-fortune-close:hover{background:var(--dsw-alias-interactive-bg-hover-accent);color:var(--dsw-alias-label-primary);box-shadow:0 4px 14px rgba(56,51,68,.12)}
.hermes-fortune-close:focus-visible{outline:2px solid var(--hermes-gold);outline-offset:2px}
/* 起卦：一纸签牌自右下浮起，落定后展开签卡 */
.hermes-fortune-draw{position:fixed;inset:0;z-index:8650;display:flex;align-items:center;justify-content:center;overflow:hidden;pointer-events:none;background:rgba(20,17,24,.32);animation:hermes-fade 260ms ease both}
.hermes-fortune-slip{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;width:104px;height:252px;box-sizing:border-box;padding:16px 10px;background:linear-gradient(180deg,#FBF3DC 0%,#F4E6C4 48%,#EEDAC1 100%);border:1px solid color-mix(in srgb,var(--hermes-gold) 62%,transparent);border-radius:4px;box-shadow:0 26px 70px rgba(20,17,24,.34),inset 0 0 0 3px rgba(255,252,246,.55),inset 0 0 34px rgba(181,138,67,.16);color:#383344;font-family:${SERIF};animation:hermes-slip-rise 900ms cubic-bezier(.22,.7,.28,1) both}
.hermes-fortune-slip::before,.hermes-fortune-slip::after{content:"";position:absolute;left:7px;right:7px;height:1px;background:color-mix(in srgb,var(--hermes-gold) 40%,transparent)}
.hermes-fortune-slip::before{top:9px}
.hermes-fortune-slip::after{bottom:9px}
.hermes-fortune-slip-zh{writing-mode:vertical-rl;text-orientation:upright;font-size:15px;letter-spacing:.32em;color:#383344}
.hermes-fortune-slip-seal{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;background:#A64B3C;color:#F8ECC9;font-size:14px;line-height:1;letter-spacing:0;box-shadow:inset 0 0 0 2px rgba(248,236,201,.32)}
.hermes-fortune-mote{position:absolute;width:3px;height:3px;border-radius:50%;background:var(--hermes-gold);box-shadow:0 0 8px var(--hermes-gold);opacity:0;animation:hermes-mote 1100ms ease-out both}
/* 收下：一纸朱砂符咒飞渡，落成右下角卦象 */
.hermes-talisman{position:fixed;inset:0;z-index:8700;display:flex;align-items:center;justify-content:center;overflow:hidden;pointer-events:none;user-select:none}
.hermes-talisman-sheet{position:relative;display:flex;flex-direction:column;align-items:center;gap:9px;width:140px;padding:18px 14px 15px;box-sizing:border-box;background:linear-gradient(180deg,#F8ECC9 0%,#F3E2B8 52%,#EED9A5 100%);color:#A64B3C;border:1px solid rgba(181,138,67,.6);border-radius:2px;box-shadow:0 22px 58px rgba(20,17,24,.32),inset 0 0 0 3px rgba(255,252,246,.55),inset 0 0 26px rgba(181,138,67,.18);font-family:${SERIF};animation:hermes-talisman-cast 1700ms cubic-bezier(.22,.7,.28,1) both}
.hermes-talisman-sheet::before,.hermes-talisman-sheet::after{content:"";position:absolute;left:6px;right:6px;height:1px;background:rgba(166,75,60,.28)}
.hermes-talisman-sheet::before{top:8px}
.hermes-talisman-sheet::after{bottom:8px}
.hermes-talisman-command{font-size:15px;line-height:1;letter-spacing:.22em;text-indent:.22em;color:#A64B3C;opacity:.92}
.hermes-talisman-rune{display:block;width:64px;height:80px;color:#A64B3C;opacity:.92}
.hermes-talisman-hex{display:block;width:56px;height:64px;color:#A64B3C}
.hermes-talisman-seal{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;margin-top:1px;background:#A64B3C;color:#F8ECC9;font-family:${SERIF};font-size:17px;line-height:1;box-shadow:inset 0 0 0 2px rgba(248,236,201,.35)}
.hermes-hexagram{position:fixed;right:24px;bottom:26px;z-index:8400;display:flex;flex-direction:column;align-items:center;gap:10px;width:112px;padding:17px 12px 14px;box-sizing:border-box;background:linear-gradient(180deg,color-mix(in srgb,var(--dsw-alias-bg-layer-1) 96%,var(--hermes-gold)),var(--dsw-alias-bg-layer-2));color:var(--dsw-alias-label-primary);font-family:${SERIF};border:1px solid color-mix(in srgb,var(--hermes-gold) 52%,var(--dsw-alias-border-l1));border-radius:14px;box-shadow:0 18px 44px rgba(20,17,24,.18),inset 0 1px 0 rgba(255,252,246,.6);pointer-events:none;animation:hermes-hexagram-in 720ms cubic-bezier(.2,.8,.3,1) 1020ms both}
.hermes-hexagram::before{content:"";position:absolute;top:7px;left:50%;width:2.6px;height:2.6px;margin-left:-1.3px;border-radius:50%;background:var(--hermes-gold);opacity:.55}
.hermes-hexagram-head{font-size:9.5px;letter-spacing:.24em;text-indent:.24em;color:var(--hermes-gold)}
.hermes-hexagram-glyph{display:block;color:var(--hermes-gold)}
.hermes-hexagram-name{font-size:14px;letter-spacing:.14em;text-indent:.14em;line-height:1.2}
.hermes-hexagram-grade{font-size:9.5px;letter-spacing:.18em;color:var(--dsw-alias-label-tertiary)}
.hermes-hexagram-close{position:absolute;top:4px;right:5px;display:flex;align-items:center;justify-content:center;width:18px;height:18px;padding:0;border:none;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;line-height:1;cursor:pointer;opacity:.3;pointer-events:auto;transition:opacity .15s ease,color .15s ease}
.hermes-hexagram:hover .hermes-hexagram-close{opacity:.75}
.hermes-hexagram-close:focus-visible,.hermes-hexagram-close:focus{opacity:1;outline:2px solid var(--hermes-gold);outline-offset:2px}
.hermes-hexagram-close:hover{color:var(--dsw-alias-label-primary);opacity:1}
.hermes-hexagram-arrow{position:absolute;right:-6px;top:50%;display:flex;align-items:center;justify-content:center;width:18px;height:18px;margin-top:-9px;border-radius:50%;background:var(--dsw-alias-bg-layer-1);border:1px solid color-mix(in srgb,var(--hermes-gold) 40%,transparent);color:var(--hermes-gold);font-size:11px;line-height:1;box-shadow:0 2px 6px rgba(20,17,24,.12)}
.hermes-boot-hint{position:absolute;right:clamp(20px,3vw,46px);bottom:clamp(14px,2.2vh,30px);font-size:11px;line-height:1.4;letter-spacing:.2em;color:var(--hermes-art,#766D7C);opacity:0;animation:hermes-boot-hint-in 700ms ease 2600ms both}

/* ——— 动效 ——— */
@keyframes hermes-orb-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes hermes-glow{0%,100%{opacity:.06}50%{opacity:.16}}
@keyframes hermes-drift{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(-14px,10px,0)}}
@keyframes hermes-twinkle{0%,100%{opacity:.18}50%{opacity:.5}}
@keyframes hermes-orb-halo{0%,100%{opacity:.25;transform:scale(1)}50%{opacity:.6;transform:scale(1.04)}}
@keyframes hermes-boot-in{from{opacity:0}to{opacity:1}}
@keyframes hermes-boot-out{from{opacity:1}to{opacity:0}}
@keyframes hermes-ink-bloom{0%{opacity:0;transform:scale(.6)}35%{opacity:.55}100%{opacity:0;transform:scale(1.15)}}
@keyframes hermes-boot-rise{0%{opacity:0;transform:translate(-50%,-50%) scale(.8)}100%{opacity:1;transform:translate(-50%,-50%) scale(1)}}
@keyframes hermes-taiji-in{0%{opacity:0;transform:scale(.5)}100%{opacity:1;transform:scale(1)}}
@keyframes hermes-trigram-in{0%{opacity:0;transform:translateY(-4px)}100%{opacity:1;transform:translateY(0)}}
@keyframes hermes-boot-turn{from{transform:rotate(0deg)}to{transform:rotate(45deg)}}
@keyframes hermes-boot-write-h{0%{opacity:0;clip-path:inset(0 100% 0 0);filter:blur(4px)}12%{opacity:.92}100%{opacity:.92;clip-path:inset(0 0 0 0);filter:blur(0)}}
@keyframes hermes-boot-write-v{0%{opacity:0;clip-path:inset(0 0 100% 0);filter:blur(4px)}12%{opacity:.92}100%{opacity:.92;clip-path:inset(0 0 0 0);filter:blur(0)}}
@keyframes hermes-boot-hint-in{from{opacity:0;transform:translateY(4px)}to{opacity:.55;transform:translateY(0)}}
@keyframes hermes-send-plate{0%{opacity:0;transform:translateY(10px) scale(.82)}16%{opacity:.95;transform:translateY(0) scale(.97)}60%{opacity:.82;transform:translateY(-2px) scale(1.01)}100%{opacity:0;transform:translateY(-18px) scale(1.06)}}
@keyframes hermes-send-turn{from{transform:rotate(0deg)}to{transform:rotate(150deg)}}
@keyframes hermes-send-glow{0%{opacity:.12}28%{opacity:.42}100%{opacity:0}}
@keyframes hermes-send-fade{0%{opacity:0}22%,62%{opacity:.9}100%{opacity:0}}
@keyframes hermes-composer-breath{0%,100%{box-shadow:0 18px 46px -20px rgba(56,51,68,.26),0 0 0 1px color-mix(in srgb,var(--hermes-gold) 12%,transparent),inset 0 1px 0 rgba(255,252,246,.72)}50%{box-shadow:0 20px 50px -18px rgba(56,51,68,.3),0 0 18px -4px color-mix(in srgb,var(--hermes-gold) 30%,transparent),inset 0 1px 0 rgba(255,252,246,.8)}}
@keyframes hermes-thinking-in{from{opacity:0;transform:translateX(-4px)}to{opacity:1;transform:none}}
@keyframes hermes-thinking-wave{0%,100%{opacity:.25;transform:translateY(0)}50%{opacity:1;transform:translateY(-2px)}}
@keyframes hermes-menu-in{from{opacity:0;transform:translateY(6px) scale(.98)}to{opacity:1;transform:none}}
@keyframes hermes-fade{from{opacity:0}to{opacity:1}}
@keyframes hermes-fortune-in{from{opacity:0}to{opacity:1}}
@keyframes hermes-fortune-rise{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}
@keyframes hermes-slip-rise{0%{opacity:0;transform:translate3d(34vw,32vh,0) rotate(15deg) scale(.42)}18%{opacity:1}62%{opacity:1;transform:translate3d(0,-6px,0) rotate(-2deg) scale(1.02)}82%{opacity:1;transform:translate3d(0,0,0) rotate(0) scale(1)}100%{opacity:0;transform:translate3d(0,-14px,0) rotate(0) scale(1.05)}}
@keyframes hermes-mote{0%{opacity:0;transform:translate3d(0,0,0) scale(.6)}25%{opacity:.9}100%{opacity:0;transform:translate3d(-30px,-70px,0) scale(1.3)}}
@keyframes hermes-talisman-cast{0%{opacity:0;transform:translate3d(0,-26px,0) rotate(-7deg) scale(.72)}12%{opacity:1;transform:translate3d(0,0,0) rotate(2.2deg) scale(1.02)}24%{transform:translate3d(0,0,0) rotate(-.8deg) scale(1)}58%{opacity:1;transform:translate3d(0,0,0) rotate(0) scale(1)}100%{opacity:0;transform:translate3d(36vw,30vh,0) rotate(9deg) scale(.32)}}
@keyframes hermes-hexagram-in{from{opacity:0;transform:translate3d(10px,10px,0) scale(.94)}to{opacity:1;transform:none}}

/* ——— 动效开关 & 减动偏好 ——— */
html[data-hermes-motion="off"] .hermes-ambient-orb,
html[data-hermes-motion="off"] .hermes-ambient-orb-inner,
html[data-hermes-motion="off"] .hermes-ambient-orb::after,
html[data-hermes-motion="off"] .hermes-ambient-star,
html[data-hermes-motion="off"] [data-slot="conversation.composer.bar"],
html[data-hermes-motion="off"] .hermes-thinking-dot{animation:none!important}
html[data-hermes-motion="off"] .hermes-fortune,
html[data-hermes-motion="off"] .hermes-fortune-card,
html[data-hermes-motion="off"] .hermes-fortune-draw,
html[data-hermes-motion="off"] .hermes-talisman-sheet,
html[data-hermes-motion="off"] .hermes-hexagram,
html[data-hermes-motion="off"] .hermes-send-plate,
html[data-hermes-motion="off"] .hermes-fortune-slip,
html[data-hermes-motion="off"] .hermes-fortune-mote{animation:none!important}
html[data-hermes-motion="off"] .hermes-mode-pill,
html[data-hermes-motion="off"] .hermes-skin-toggle [data-track],
html[data-hermes-motion="off"] .hermes-skin-toggle [data-track]::after,
html[data-hermes-motion="off"] .hermes-ambient-orb{transition:none!important}
@media (prefers-reduced-motion: reduce){
  .hermes-ambient-orb,.hermes-ambient-orb-inner,.hermes-ambient-orb::after,.hermes-ambient-star,.hermes-bagua-ring,.hermes-bagua-glow,[data-slot="conversation.composer.bar"]{animation:none!important}
  .hermes-boot-core,.hermes-boot-line,.hermes-boot-hint,.hermes-boot-ink{animation:none!important;filter:none!important;clip-path:none!important;opacity:1!important}
  .hermes-boot-ink{opacity:0!important}
  .hermes-boot-core{transform:translate(-50%,-50%)!important}
  .hermes-boot-hint{opacity:.55!important}
  .hermes-bagua-trigram{opacity:1!important;animation:none!important}
  .hermes-send-plate{animation:hermes-send-fade 900ms ease both}
  .hermes-fortune,.hermes-fortune-card{animation:none!important}
  .hermes-fortune-draw{display:none!important}
  .hermes-talisman-sheet{animation:hermes-talisman-fade 700ms ease both}
  .hermes-hexagram{animation:none!important;opacity:1!important}
  .hermes-thinking-dot{animation:none!important}
}
@keyframes hermes-talisman-fade{0%{opacity:0}18%,72%{opacity:1}100%{opacity:0}}
@keyframes hermes-ziwei-in{0%{opacity:0;transform:translateY(14px) scale(.985)}100%{opacity:1;transform:none}}
@keyframes hermes-ziwei-cell-in{0%{opacity:0;transform:scale(.96)}100%{opacity:1;transform:none}}

/* ——— V3 · 模型名旁的紫微徽记（conversation.input.model.label 单槽位，非交互） ——— */
.hermes-modelabel{display:inline-flex;align-items:center;gap:5px;min-width:0}
.hermes-modelabel-1017{display:inline-block;padding:1px 4px;border-radius:5px;background:var(--dsw-alias-state-business-tertiary,#F2E3C9);color:var(--dsw-alias-label-primary,#3A3342);font-size:9px;line-height:1.25;letter-spacing:.06em}
.hermes-modelabel-ziwei{display:inline-flex;align-items:center;gap:3px;padding:1px 5px;border-radius:999px;border:1px solid color-mix(in srgb,var(--hermes-gold) 55%,transparent);background:color-mix(in srgb,var(--hermes-gold) 16%,transparent);color:var(--hermes-gold-strong);font-size:9px;line-height:1.3;letter-spacing:.14em}
.hermes-modelabel-ziwei::before{content:"";width:3px;height:3px;border-radius:50%;background:var(--hermes-gold);box-shadow:0 0 4px color-mix(in srgb,var(--hermes-gold) 80%,transparent)}

/* ——— V3 · 输入框上沿：紫微推演开关与入盘（与思考氛围药丸条同排） ——— */
.hermes-ziwei-bar{display:inline-flex;align-items:center;gap:4px;padding:3px;border:1px solid color-mix(in srgb,var(--hermes-gold) 26%,var(--dsw-alias-border-l1));border-radius:999px;background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 68%,transparent);box-shadow:0 2px 10px rgba(20,17,24,.06);backdrop-filter:blur(8px)}
.hermes-ziwei-pill{display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border:0;border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:10.5px;line-height:1;letter-spacing:.14em;cursor:pointer;transition:background-color .22s ease,color .22s ease,box-shadow .22s ease;white-space:nowrap}
.hermes-ziwei-pill:hover{color:var(--dsw-alias-label-primary);background:color-mix(in srgb,var(--hermes-gold) 10%,transparent)}
.hermes-ziwei-pill[aria-pressed="true"]{color:var(--dsw-alias-label-primary);background:color-mix(in srgb,var(--hermes-gold) 17%,var(--dsw-alias-bg-layer-1));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--hermes-gold) 46%,transparent),0 1px 3px rgba(20,17,24,.08)}
.hermes-ziwei-pill:focus-visible{outline:2px solid var(--hermes-gold);outline-offset:1px}
.hermes-ziwei-pill .hermes-mode-dot{opacity:.5}
.hermes-ziwei-pill[aria-pressed="true"] .hermes-mode-dot{opacity:1}
.hermes-ziwei-load{display:inline-flex;align-items:center;padding:4px 10px;border:1px solid color-mix(in srgb,var(--hermes-gold) 40%,var(--dsw-alias-border-l1));border-radius:999px;background:color-mix(in srgb,var(--hermes-gold) 10%,transparent);color:var(--hermes-gold-strong);font:inherit;font-size:10px;line-height:1;letter-spacing:.16em;cursor:pointer;white-space:nowrap;transition:box-shadow .2s ease,background-color .2s ease}
.hermes-ziwei-load:hover{background:color-mix(in srgb,var(--hermes-gold) 18%,transparent);box-shadow:0 0 8px color-mix(in srgb,var(--hermes-gold) 30%,transparent)}
.hermes-ziwei-load:focus-visible{outline:2px solid var(--hermes-gold);outline-offset:1px}
.hermes-ziwei-load[disabled]{opacity:.45;cursor:default}

/* ——— V3 · 会话头与侧栏会话行的紫微入口 ——— */
.hermes-ziwei-headbtn{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;border:1px solid color-mix(in srgb,var(--hermes-gold) 34%,var(--dsw-alias-border-l1));border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:10.5px;line-height:1;letter-spacing:.12em;cursor:pointer;transition:color .18s ease,border-color .18s ease,background-color .18s ease;white-space:nowrap}
.hermes-ziwei-headbtn:hover{color:var(--hermes-gold-strong);border-color:color-mix(in srgb,var(--hermes-gold) 60%,transparent);background:color-mix(in srgb,var(--hermes-gold) 10%,transparent)}
.hermes-ziwei-headbtn:focus-visible{outline:2px solid var(--hermes-gold);outline-offset:2px}
.hermes-ziwei-glyph{font-family:${SERIF};font-size:11px;line-height:1;color:var(--hermes-gold)}
.hermes-ziwei-rowact{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;padding:0;border:0;border-radius:6px;background:transparent;color:var(--dsw-alias-label-secondary);font-family:${SERIF};font-size:12px;line-height:1;cursor:pointer;transition:color .15s ease,background-color .15s ease}
.hermes-ziwei-rowact:hover{color:var(--hermes-gold-strong);background:color-mix(in srgb,var(--hermes-gold) 14%,transparent)}
.hermes-ziwei-rowact:focus-visible{outline:2px solid var(--hermes-gold);outline-offset:1px}

/* ——— V3 · 紫微命盘对话框（十二宫 · 宣纸金墨） ——— */
.hermes-ziwei{position:fixed;inset:0;z-index:8500;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(20,17,24,.42);backdrop-filter:blur(2px);animation:hermes-menu-in .16s ease both}
.hermes-ziwei-card{position:relative;display:flex;flex-direction:column;width:min(880px,100vw - 32px);max-height:calc(100vh - 40px);box-sizing:border-box;border:1px solid color-mix(in srgb,var(--hermes-gold) 58%,transparent);border-radius:18px;background:linear-gradient(180deg,var(--dsw-alias-bg-layer-1),var(--dsw-alias-bg-base) 30%,var(--dsw-alias-bg-base));box-shadow:0 26px 80px rgba(20,17,24,.34),inset 0 0 0 1px rgba(255,252,246,.5);overflow:hidden;animation:hermes-ziwei-in .28s ease both;outline:none}
.hermes-ziwei-card::after{content:"";position:absolute;inset:7px;border:1px solid color-mix(in srgb,var(--hermes-gold) 34%,transparent);border-radius:13px;pointer-events:none}
.hermes-ziwei-card:focus-visible{box-shadow:0 26px 80px rgba(20,17,24,.34),0 0 0 2px var(--hermes-gold)}
.hermes-ziwei-head{display:flex;align-items:center;gap:10px;flex:none;padding:14px 18px 10px}
.hermes-ziwei-title{display:flex;align-items:baseline;gap:8px;color:var(--dsw-alias-label-primary);font-family:${SERIF};font-size:17px;letter-spacing:.1em}
.hermes-ziwei-title small{font-family:var(--dsw-font-family);font-size:10px;letter-spacing:.2em;color:var(--hermes-gold-strong)}
.hermes-ziwei-tabs{display:inline-flex;gap:2px;margin-left:auto;padding:2px;border:1px solid color-mix(in srgb,var(--hermes-gold) 24%,var(--dsw-alias-border-l1));border-radius:999px;background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 70%,transparent)}
.hermes-ziwei-tab{padding:4px 10px;border:0;border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:10px;line-height:1;letter-spacing:.12em;cursor:pointer;white-space:nowrap;transition:background-color .18s ease,color .18s ease}
.hermes-ziwei-tab[aria-selected="true"]{color:var(--dsw-alias-label-primary);background:color-mix(in srgb,var(--hermes-gold) 18%,var(--dsw-alias-bg-layer-1));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--hermes-gold) 40%,transparent)}
.hermes-ziwei-tab:focus-visible{outline:2px solid var(--hermes-gold);outline-offset:1px}
.hermes-ziwei-body{flex:1;min-height:0;overflow:auto;padding:4px 18px 14px}
.hermes-ziwei-form{display:flex;flex-wrap:wrap;align-items:flex-end;gap:8px 10px;padding:10px 12px;border:1px solid color-mix(in srgb,var(--hermes-gold) 22%,var(--dsw-alias-border-l1));border-radius:12px;background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 55%,transparent)}
.hermes-ziwei-field{display:flex;flex-direction:column;gap:4px}
.hermes-ziwei-field label{color:var(--dsw-alias-label-caption);font-size:9px;letter-spacing:.22em}
.hermes-ziwei-input,.hermes-ziwei-select{height:28px;box-sizing:border-box;padding:0 8px;border:1px solid color-mix(in srgb,var(--hermes-gold) 26%,var(--dsw-alias-border-l2));border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;color-scheme:light dark}
.hermes-ziwei-input:focus-visible,.hermes-ziwei-select:focus-visible{outline:2px solid var(--hermes-gold);outline-offset:1px}
.hermes-ziwei-input[type="number"]{width:74px}
.hermes-ziwei-input[data-field="year"]{width:86px}
.hermes-ziwei-input[data-field="name"]{width:120px}
.hermes-ziwei-hint{color:var(--dsw-alias-label-tertiary);font-size:10px;letter-spacing:.06em}
.hermes-ziwei-seg{display:inline-flex;padding:2px;border:1px solid color-mix(in srgb,var(--hermes-gold) 26%,var(--dsw-alias-border-l2));border-radius:999px;background:var(--dsw-alias-bg-layer-1)}
.hermes-ziwei-seg button{padding:4px 12px;border:0;border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:11px;line-height:1;cursor:pointer}
.hermes-ziwei-seg button[aria-pressed="true"]{color:var(--dsw-alias-label-primary);background:color-mix(in srgb,var(--hermes-gold) 18%,transparent)}
.hermes-ziwei-seg button:focus-visible{outline:2px solid var(--hermes-gold);outline-offset:1px}
.hermes-ziwei-error{margin:10px 2px 0;padding:8px 12px;border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 42%,transparent);border-radius:10px;background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent);color:var(--dsw-alias-state-error-primary);font-size:11.5px;line-height:1.7}
.hermes-ziwei-boardwrap{margin-top:12px}
.hermes-ziwei-board{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:repeat(4,minmax(74px,auto));gap:6px}
.hermes-ziwei-cell{position:relative;display:flex;flex-direction:column;gap:3px;box-sizing:border-box;min-height:74px;padding:7px 8px 6px;border:1px solid color-mix(in srgb,var(--hermes-gold) 24%,var(--dsw-alias-border-l1));border-radius:10px;background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 88%,transparent);animation:hermes-ziwei-cell-in .26s ease both}
.hermes-ziwei-cell--ming{border-color:color-mix(in srgb,var(--hermes-gold) 62%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--hermes-gold) 26%,transparent),0 0 12px color-mix(in srgb,var(--hermes-gold) 12%,transparent)}
.hermes-ziwei-cell--shen{border-color:color-mix(in srgb,var(--hermes-violet) 46%,transparent)}
.hermes-ziwei-cellhead{display:flex;align-items:baseline;gap:5px}
.hermes-ziwei-cellname{font-family:${SERIF};font-size:12px;letter-spacing:.08em;color:var(--dsw-alias-label-primary)}
.hermes-ziwei-cellname em{font-style:normal;font-family:var(--dsw-font-family);font-size:8.5px;color:var(--hermes-gold-strong);letter-spacing:.16em;margin-left:3px}
.hermes-ziwei-cellbranch{margin-left:auto;color:var(--hermes-gold-strong);font-size:10px}
.hermes-ziwei-daxian{position:absolute;top:6px;right:8px;color:var(--dsw-alias-label-tertiary);font-size:9px;letter-spacing:.06em}
.hermes-ziwei-stars{display:flex;flex-wrap:wrap;gap:2px 7px;margin-top:2px}
.hermes-ziwei-star{font-size:10.5px;line-height:1.5;color:var(--dsw-alias-label-primary)}
.hermes-ziwei-star small{font-size:9px;color:var(--dsw-alias-label-tertiary)}
.hermes-ziwei-star--minor{color:var(--dsw-alias-label-secondary);font-size:9.5px}
.hermes-ziwei-star--lucky{color:var(--hermes-gold-strong)}
.hermes-ziwei-star--sha{color:var(--dsw-alias-state-error-primary)}
.hermes-ziwei-si{display:inline-block;margin-left:1px;padding:0 2.5px;border-radius:4px;font-size:9px;line-height:1.4}
.hermes-ziwei-si--lu{background:color-mix(in srgb,var(--hermes-gold) 26%,transparent);color:var(--hermes-gold-strong)}
.hermes-ziwei-si--quan{background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 22%,transparent);color:var(--dsw-alias-state-error-primary)}
.hermes-ziwei-si--ke{background:color-mix(in srgb,var(--hermes-violet) 24%,transparent);color:var(--hermes-violet)}
.hermes-ziwei-si--ji{background:color-mix(in srgb,var(--dsw-alias-label-primary) 14%,transparent);color:var(--dsw-alias-label-secondary)}
.hermes-ziwei-empty{color:var(--dsw-alias-label-tertiary);font-size:9.5px;letter-spacing:.1em}
.hermes-ziwei-center{grid-column:2 / span 2;grid-row:2 / span 2;display:flex;flex-direction:column;gap:6px;justify-content:center;box-sizing:border-box;padding:10px 14px;border:1px solid color-mix(in srgb,var(--hermes-gold) 30%,var(--dsw-alias-border-l1));border-radius:10px;background:color-mix(in srgb,var(--hermes-gold) 5%,var(--dsw-alias-bg-layer-2) 60%)}
.hermes-ziwei-center-name{font-family:${SERIF};font-size:15px;letter-spacing:.12em;color:var(--dsw-alias-label-primary);text-align:center}
.hermes-ziwei-center-ju{text-align:center;color:var(--hermes-gold-strong);font-size:10.5px;letter-spacing:.2em}
.hermes-ziwei-center-rows{display:grid;grid-template-columns:auto 1fr;gap:2px 10px;font-size:10.5px;line-height:1.7;color:var(--dsw-alias-label-secondary)}
.hermes-ziwei-center-rows b{font-weight:400;color:var(--dsw-alias-label-caption);letter-spacing:.18em;white-space:nowrap}
.hermes-ziwei-center-rows span{color:var(--dsw-alias-label-primary)}
.hermes-ziwei-chips{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;margin-top:2px}
.hermes-ziwei-chip{padding:2px 8px;border:1px solid color-mix(in srgb,var(--hermes-gold) 40%,transparent);border-radius:999px;color:var(--hermes-gold-strong);font-size:9.5px;letter-spacing:.1em;white-space:nowrap}
.hermes-ziwei-chip--excellent{border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 45%,transparent);color:var(--dsw-alias-state-success-primary)}
.hermes-ziwei-chip--caution{border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 45%,transparent);color:var(--dsw-alias-state-warn-primary)}
.hermes-ziwei-foot{display:flex;flex-wrap:wrap;align-items:center;gap:8px;flex:none;padding:10px 18px 14px;border-top:1px solid color-mix(in srgb,var(--hermes-gold) 18%,transparent)}
.hermes-ziwei-note{margin-right:auto;color:var(--dsw-alias-label-tertiary);font-size:9.5px;letter-spacing:.08em;max-width:46ch;line-height:1.6}
.hermes-ziwei-btn{height:30px;padding:0 16px;border:1px solid color-mix(in srgb,var(--hermes-gold) 46%,transparent);border-radius:999px;background:color-mix(in srgb,var(--hermes-gold) 9%,transparent);color:var(--hermes-gold-strong);font-family:${SERIF};font-size:12px;letter-spacing:.14em;cursor:pointer;white-space:nowrap;transition:background-color .18s ease,box-shadow .18s ease}
.hermes-ziwei-btn:hover{background:color-mix(in srgb,var(--hermes-gold) 18%,transparent);box-shadow:0 0 10px color-mix(in srgb,var(--hermes-gold) 26%,transparent)}
.hermes-ziwei-btn:focus-visible{outline:2px solid var(--hermes-gold);outline-offset:2px}
.hermes-ziwei-btn[disabled]{opacity:.45;cursor:default;box-shadow:none}
.hermes-ziwei-btn--ghost{font-family:var(--dsw-font-family);font-size:11px;letter-spacing:.1em;color:var(--dsw-alias-label-secondary);border-color:var(--dsw-alias-border-l2);background:transparent}
.hermes-ziwei-btn--ghost:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover);box-shadow:none}
@media (max-width:720px){.hermes-ziwei-board{grid-template-rows:repeat(4,minmax(96px,auto));gap:4px}.hermes-ziwei-cell{padding:5px 6px}.hermes-ziwei-star{font-size:9.5px}.hermes-ziwei-center{padding:8px}}
`

    const TRIGRAMS = [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
      [1, 0, 0],
      [0, 1, 1],
      [0, 1, 0],
      [0, 0, 1],
      [0, 0, 0],
    ]

    /** Three horizontal strokes of one trigram, wrapped in the caller's group. */
    function trigramLines(cx, y, width, height, gap, pattern) {
      return pattern.map((solid, index) => {
        const lineY = y + index * gap
        if (solid) {
          return h('rect', {
            key: 'line-' + index,
            x: cx - width / 2,
            y: lineY,
            width,
            height,
            rx: height / 2,
            fill: 'currentColor',
          })
        }
        const segment = width / 2 - height
        return h(
          'g',
          { key: 'line-' + index },
          h('rect', { x: cx - width / 2, y: lineY, width: segment, height, rx: height / 2, fill: 'currentColor' }),
          h('rect', { x: cx + height, y: lineY, width: segment, height, rx: height / 2, fill: 'currentColor' }),
        )
      })
    }

    /** Small taiji-and-gold-ring mark used in the sidebar rail. */
    function TaijiMark({ size = 24 }) {
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          fill: 'none',
          'aria-hidden': 'true',
          style: { display: 'block', color: 'var(--hermes-ink)' },
        },
        h('circle', {
          cx: 12,
          cy: 12,
          r: 11,
          style: { stroke: 'var(--hermes-gold)' },
          strokeWidth: 0.9,
          opacity: 0.9,
        }),
        h('circle', { cx: 12, cy: 12, r: 9.4, fill: 'currentColor' }),
        h('path', {
          d: 'M12 2.6a9.4 9.4 0 0 1 0 18.8 4.7 4.7 0 0 1 0-9.4 4.7 4.7 0 0 0 0-9.4Z',
          style: { fill: 'var(--hermes-paper)' },
        }),
        h('circle', { cx: 12, cy: 7.3, r: 1.7, fill: 'currentColor' }),
        h('circle', { cx: 12, cy: 16.7, r: 1.7, style: { fill: 'var(--hermes-paper)' } }),
        h('circle', { cx: 12, cy: 12, r: 0.7, style: { fill: 'var(--hermes-gold)' } }),
      )
    }

    /* ——— V2 · 设置与思考深度 ———
       三个视觉档位 + 自动：只改装饰密度、动效强度与空间层次，不触碰模型的推理参数。
       设置与档位都写 localStorage，并通过自定义事件广播给各个槽位组件。 */
    const DEPTH_KEY = 'hermes-depth'
    const MOTION_KEY = 'hermes-motion'
    const DAILY_KEY = 'hermes-daily'
    const BOOT_KEY = 'hermes-boot-play'
    const FORTUNE_DAY_KEY = 'hermes-fortune-day'
    const SETTINGS_EVENT = 'hermes-skin:settings'
    const DEPTH_MODES = [
      { id: 'light', label: '浅思', title: '淡雅 · 浅思：大道至简，装饰最少，适合轻量问答' },
      { id: 'balanced', label: '深思', title: '平衡 · 深思：阴阳相济，八卦缓慢流转' },
      { id: 'immersive', label: '悟道', title: '沉浸 · 悟道：乾坤流转，多层光效与云雾' },
      { id: 'auto', label: '自动', title: '自动：空闲时保持平衡，思考时自然收敛为沉浸' },
    ]
    const DEPTH_IDS = DEPTH_MODES.map((mode) => mode.id)

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
      return readStored(ziweiModeKey(scopeKey), 'off') === 'on'
    }

    function writeZiweiMode(scopeKey, on) {
      writeStored(ziweiModeKey(scopeKey), on ? 'on' : 'off')
      emitZiweiChange({ scopeKey, kind: 'mode', on })
    }

    function ziweiAutoOn() {
      return readStored(ZIWEI_AUTO_KEY, 'off') === 'on'
    }

    function readZiweiBirth(scopeKey) {
      const raw = readStored(ZIWEI_BIRTH_PREFIX + (scopeKey || 'default'), '')
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
      writeStored(ZIWEI_BIRTH_PREFIX + (scopeKey || 'default'), JSON.stringify(birth))
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

    function readStored(key, fallback) {
      try {
        const value = window.localStorage.getItem(key)
        return value === null ? fallback : value
      } catch (error) {
        return fallback
      }
    }

    function writeStored(key, value) {
      try {
        window.localStorage.setItem(key, value)
      } catch (error) {
        /* 隐私模式下 localStorage 可能不可写，退回默认表现。 */
      }
    }

    function readDepth() {
      const value = readStored(DEPTH_KEY, 'balanced')
      return DEPTH_IDS.indexOf(value) >= 0 ? value : 'balanced'
    }

    function flagOn(key) {
      return readStored(key, 'on') !== 'off'
    }

    function readTodayKey() {
      const now = new Date()
      return now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
    }

    function emitSettings() {
      try {
        window.dispatchEvent(new Event(SETTINGS_EVENT))
      } catch (error) {
        /* 事件广播失败时组件仍会在下次挂载时读到 localStorage。 */
      }
    }

    function applyRootSettings() {
      const root = document.documentElement
      root.dataset.hermesDepth = readDepth()
      root.dataset.hermesMotion = flagOn(MOTION_KEY) ? 'on' : 'off'
    }

    function prefersReducedMotion() {
      try {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      } catch (error) {
        return false
      }
    }

    /** 用 DOM 上的三个信号粗判「正在思考」：停止键、运行态标记、可见状态文案。 */
    function isThinkingNow() {
      const bar = document.querySelector('[data-slot="conversation.composer.bar"]')
      if (bar) {
        const stop = bar.querySelector(
          'button[aria-label*="停止"],button[title*="停止"],button[aria-label*="中止"],button[title*="中止"],[data-state="running"],[data-generating="true"]',
        )
        if (stop) return true
      }
      const status = document.querySelector('[role="status"],[aria-live="polite"]')
      const text = status && typeof status.textContent === 'string' ? status.textContent : ''
      return /思考中|正在思考|推理中|生成中/.test(text)
    }

    function ThinkingWatcher() {
      React.useEffect(() => {
        let timer = null
        let last = null
        const update = () => {
          const on = isThinkingNow()
          document.documentElement.dataset.hermesThinking = on ? 'on' : 'off'
          if (on === last) return
          last = on
          try {
            window.dispatchEvent(new CustomEvent('hermes-skin:thinking', { detail: { thinking: on } }))
          } catch (error) {
            /* 事件不可用时降级为只写 data-*。 */
          }
        }
        const schedule = () => {
          if (timer !== null) return
          timer = setTimeout(() => {
            timer = null
            update()
          }, 160)
        }
        update()
        const observer = new MutationObserver(schedule)
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true,
          attributeFilter: ['aria-label', 'title', 'data-state', 'data-generating', 'class'],
        })
        return () => {
          observer.disconnect()
          if (timer !== null) clearTimeout(timer)
          delete document.documentElement.dataset.hermesThinking
        }
      }, [])
      return null
    }

    /** composer 下沿：思考氛围选择器 + 皮肤设置 + 箴言。
     *  V3：同排多了一组「紫微推演」开关（ZiweiDockControls），props 由
     *  conversation.input.dock 的标准 props 透传（sessionId / useInput / inputActions / useWorkspaces）。 */
    function SkinDock(props) {
      const [mode, setMode] = React.useState(readDepth)
      const [menu, setMenu] = React.useState(false)
      const [thinking, setThinking] = React.useState(false)
      const [flags, setFlags] = React.useState(() => ({
        motion: flagOn(MOTION_KEY),
        daily: flagOn(DAILY_KEY),
        boot: flagOn(BOOT_KEY),
        ziweiAuto: readStored(ZIWEI_AUTO_KEY, 'off') === 'on',
      }))

      React.useEffect(() => {
        document.documentElement.dataset.hermesDepth = mode
        writeStored(DEPTH_KEY, mode)
      }, [mode])

      React.useEffect(() => {
        const root = document.documentElement
        root.dataset.hermesMotion = flags.motion ? 'on' : 'off'
        writeStored(MOTION_KEY, flags.motion ? 'on' : 'off')
        writeStored(DAILY_KEY, flags.daily ? 'on' : 'off')
        writeStored(BOOT_KEY, flags.boot ? 'on' : 'off')
        writeStored(ZIWEI_AUTO_KEY, flags.ziweiAuto ? 'on' : 'off')
        emitSettings()
        emitZiweiChange({ kind: 'auto', on: flags.ziweiAuto })
      }, [flags])

      // 思考状态只用于界面反馈（旋转速度、推演指示），不参与任何模型调用。
      React.useEffect(() => {
        const sync = (event) => {
          if (event && event.detail && typeof event.detail.thinking === 'boolean') {
            setThinking(event.detail.thinking)
            return
          }
          setThinking(document.documentElement.dataset.hermesThinking === 'on')
        }
        sync()
        window.addEventListener('hermes-skin:thinking', sync)
        return () => window.removeEventListener('hermes-skin:thinking', sync)
      }, [])

      React.useEffect(() => {
        if (!menu) return undefined
        const close = () => setMenu(false)
        const onKey = (event) => {
          if (event.key === 'Escape') setMenu(false)
        }
        window.addEventListener('pointerdown', close)
        window.addEventListener('keydown', onKey)
        return () => {
          window.removeEventListener('pointerdown', close)
          window.removeEventListener('keydown', onKey)
        }
      }, [menu])

      const toggle = (flag, label) =>
        h(
          'button',
          {
            type: 'button',
            className: 'hermes-skin-toggle',
            role: 'switch',
            'aria-checked': flags[flag] ? 'true' : 'false',
            'data-flag': flag,
            onClick: () => setFlags((current) => ({ ...current, [flag]: !current[flag] })),
          },
          h('span', null, label),
          h('span', { 'data-track': '', 'aria-hidden': 'true' }),
        )

      return h(
        'div',
        { className: 'hermes-skindock' },
        h(
          'div',
          { className: 'hermes-depthbar', role: 'group', 'aria-label': '思考氛围（仅视觉，不改变模型推理参数）' },
          DEPTH_MODES.map((item) =>
            h(
              'button',
              {
                key: item.id,
                type: 'button',
                className: 'hermes-mode-pill',
                title: item.title,
                'data-mode': item.id,
                'aria-pressed': mode === item.id ? 'true' : 'false',
                onClick: () => setMode(item.id),
              },
              h('span', { className: 'hermes-mode-dot', 'aria-hidden': 'true' }),
              item.label,
            ),
          ),
          thinking
            ? h(
                'span',
                { className: 'hermes-thinking', role: 'status' },
                h('span', { className: 'hermes-thinking-dot', 'aria-hidden': 'true' }),
                h('span', { className: 'hermes-thinking-dot', 'aria-hidden': 'true' }),
                h('span', { className: 'hermes-thinking-dot', 'aria-hidden': 'true' }),
                '推演中',
              )
            : null,
          h(
            'button',
            {
              type: 'button',
              className: 'hermes-skin-gear',
              title: '皮肤设置',
              'aria-label': '皮肤设置',
              'aria-expanded': menu ? 'true' : 'false',
              onPointerDown: (event) => event.stopPropagation(),
              onClick: (event) => {
                event.stopPropagation()
                setMenu((current) => !current)
              },
            },
            '⋯',
          ),
          menu
            ? h(
                'div',
                {
                  className: 'hermes-skin-menu',
                  role: 'group',
                  'aria-label': '皮肤设置',
                  onPointerDown: (event) => event.stopPropagation(),
                },
                h('div', { className: 'hermes-skin-menu-label' }, '乾坤问道 · 皮肤'),
                toggle('motion', '动效'),
                toggle('boot', '开机动画'),
                toggle('daily', '每日卦象'),
                toggle('ziweiAuto', '发送自动带盘'),
              )
            : null,
        ),
        h(ZiweiDockControls, props),
      )
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

      return h(ZiweiDockBar, { useInput, inputActions, sessionId, useWorkspaces: props.useWorkspaces })
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

    /** Blank sessions stay mark-free: the taiji now belongs to the send animation only. */
    function NoHeroMark() {
      return null
    }

    /** Sidebar wordmark: 深度求索 / DEEPSEEK, with the daily-divination chip beside it. */
    function BrandName() {
      return h(
        'span',
        { className: 'hermes-brand-row' },
        h(
          'span',
          { className: 'hermes-brand-lockup' },
          h('span', { className: 'hermes-brand-zh' }, '深度求索'),
          h('span', { className: 'hermes-brand-en' }, 'DEEPSEEK'),
        ),
        h(FortuneTrigger),
      )
    }

    /** Composer-dock motto: 命运可见 · 智慧可行 · 自在而生. */
    function Motto() {
      return h(
        'span',
        { className: 'hermes-motto' },
        h('span', { className: 'hermes-motto-star', 'aria-hidden': 'true' }, '✦'),
        h('span', null, '命运可见 · 智慧可行 · 自在而生'),
      )
    }

    /**
     * Background inscription, pushed to the left: two vertical columns,
     * each split into 上句 / 下句, with the left column dropped lower so the
     * two columns are staggered instead of sitting on one baseline.
     */
    function Inscription() {
      return h(
        'div',
        { className: 'hermes-inscription' },
        h(
          'div',
          { className: 'hermes-inscription-col' },
          h('span', { className: 'hermes-inscription-line' }, '天行健'),
          h('span', { className: 'hermes-inscription-line' }, '君子以自强不息'),
        ),
        h(
          'div',
          { className: 'hermes-inscription-col hermes-inscription-col--stagger' },
          h('span', { className: 'hermes-inscription-line' }, '地势坤'),
          h('span', { className: 'hermes-inscription-line' }, '君子以厚德载物'),
        ),
      )
    }

    /* ——— 每日占卜：品牌字标旁的「占卜」按钮 + 今日一签 ——— */
    const FORTUNE_LOTS = [
      {
        gua: '乾',
        pattern: [1, 1, 1],
        grade: '上上签',
        poem: ['天行健，君子以自强不息；', '今日事，今日成。'],
        read: '乾为天，刚健中正。势头在你这边，适合把搁置的事一次推到底。',
        good: '进取 · 签约 · 早起',
        bad: '懒散 · 反复',
      },
      {
        gua: '坤',
        pattern: [0, 0, 0],
        grade: '上吉签',
        poem: ['地势坤，君子以厚德载物；', '容得下，福气自会留下。'],
        read: '坤为地，厚德载物。今日宜守宜和，慢一步反而走得更稳。',
        good: '守成 · 协作 · 纳福',
        bad: '争强 · 催逼',
      },
      {
        gua: '震',
        pattern: [0, 0, 1],
        grade: '中吉签',
        poem: ['一声雷动惊蛰后，', '万象更新自此时。'],
        read: '震为雷，动而后安。今天适合开个头，但别把动静当成结果。',
        good: '开创 · 面试 · 破局',
        bad: '冲动 · 熬夜',
      },
      {
        gua: '巽',
        pattern: [1, 1, 0],
        grade: '中平签',
        poem: ['柔风入户无痕迹，', '润物无声自成蹊。'],
        read: '巽为风，随风而入。今日宜沟通协调，顺着势头说话，事就成了。',
        good: '沟通 · 谈判 · 出行',
        bad: '拖延 · 赌气',
      },
      {
        gua: '坎',
        pattern: [0, 1, 0],
        grade: '中平签',
        poem: ['水到渠成终有路，', '心平何惧浪千重。'],
        read: '坎为水，习坎而孚。今日事有反复，守住节奏，不冒进就是赢。',
        good: '读书 · 复盘 · 守成',
        bad: '冒险 · 轻信',
      },
      {
        gua: '离',
        pattern: [1, 0, 1],
        grade: '中吉签',
        poem: ['红日当空照九州，', '才华尽显在今朝。'],
        read: '离为火，明两作离。今日宜表达与展示，光要打在你身上，别躲。',
        good: '表达 · 展示 · 发布',
        bad: '急躁 · 争执',
      },
      {
        gua: '艮',
        pattern: [1, 0, 0],
        grade: '中平签',
        poem: ['山重水复疑无路，', '静坐观心便是门。'],
        read: '艮为山，止于当止。今日宜静不宜动，停一停，路自己会浮出来。',
        good: '静养 · 复盘 · 断舍离',
        bad: '强求 · 赶路',
      },
      {
        gua: '兑',
        pattern: [0, 1, 1],
        grade: '上吉签',
        poem: ['喜气盈门人语笑，', '与君同醉一壶春。'],
        read: '兑为泽，和悦而亨。今日人缘顺，宜见人、宜开口，好事常在饭桌上。',
        good: '社交 · 宴饮 · 约会',
        bad: '口舌 · 赌气',
      },
    ]

    /** Frame-level open signal for the divination card (trigger lives in the sidebar). */
    const fortuneOpeners = new Set()
    function openFortune() {
      for (const opener of fortuneOpeners) opener()
    }

    /** Stable daily reading: the date picks today's lot, repeated clicks stay the same. */
    function fortuneOfDay() {
      const now = new Date()
      const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()
      const roll = (seed * 9301 + 49297) % 233280
      const lot = FORTUNE_LOTS[Math.floor((roll / 233280) * FORTUNE_LOTS.length)]
      const weekday = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()]
      return {
        ...lot,
        dateText: now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日 · 星期' + weekday,
      }
    }

    /** Small trigram glyph for the fortune card. */
    function FortuneTrigram({ pattern }) {
      return h(
        'svg',
        { className: 'hermes-fortune-trigram', width: 52, height: 30, viewBox: '0 0 52 30', fill: 'none', 'aria-hidden': 'true' },
        trigramLines(26, 4, 36, 3, 8, pattern),
      )
    }

    /** 签卡的纸面装饰：右上八卦水印、底部水墨山脊、左上松枝。 */
    function FortuneArt() {
      return h(
        'svg',
        { className: 'hermes-fortune-art', viewBox: '0 0 452 640', preserveAspectRatio: 'none', fill: 'none', 'aria-hidden': 'true' },
        h(
          'g',
          { style: { color: 'var(--hermes-gold)' }, opacity: 0.4 },
          h('circle', { cx: 372, cy: 96, r: 88, style: { stroke: 'currentColor' }, strokeWidth: 0.9 }),
          h('circle', { cx: 372, cy: 96, r: 70, style: { stroke: 'currentColor' }, strokeWidth: 0.7, strokeDasharray: '1 6' }),
          h('circle', { cx: 372, cy: 96, r: 44, style: { stroke: 'currentColor' }, strokeWidth: 0.6 }),
          h('circle', { cx: 372, cy: 96, r: 22, style: { fill: 'currentColor' }, opacity: 0.18 }),
          h('circle', { cx: 372, cy: 96, r: 5, style: { fill: 'currentColor' }, opacity: 0.5 }),
        ),
        h('path', {
          d: 'M0 556 C52 528 96 548 142 522 C190 494 232 534 284 512 C336 490 382 526 452 502 L452 640 L0 640 Z',
          style: { fill: 'var(--hermes-ink)' },
          opacity: 0.05,
        }),
        h('path', {
          d: 'M0 596 C64 574 118 598 176 582 C236 566 294 596 352 580 C396 568 428 582 452 574 L452 640 L0 640 Z',
          style: { fill: 'var(--hermes-ink)' },
          opacity: 0.07,
        }),
        h('path', {
          d: 'M0 604 C80 590 148 606 224 596 C300 586 376 604 452 592',
          style: { stroke: 'var(--hermes-gold)' },
          strokeWidth: 0.7,
          opacity: 0.35,
        }),
        h('path', {
          d: 'M38 22 C58 34 62 52 54 70 M54 44 C44 42 34 46 30 54 M56 58 C68 54 76 58 80 66 M38 22 C32 14 24 12 16 14',
          style: { stroke: 'var(--hermes-ink)' },
          strokeWidth: 0.9,
          strokeLinecap: 'round',
          opacity: 0.16,
        }),
        h('path', {
          d: 'M358 20 C348 34 344 46 348 60 M348 34 C358 30 366 32 372 38',
          style: { stroke: 'var(--hermes-ink)' },
          strokeWidth: 0.8,
          strokeLinecap: 'round',
          opacity: 0.12,
        }),
      )
    }

    /** 起卦：一纸签牌自右下浮起，金色微尘随行。 */
    function FortuneDraw() {
      const motes = [
        { top: '42%', left: '44%', delay: '120ms' },
        { top: '38%', left: '56%', delay: '220ms' },
        { top: '58%', left: '52%', delay: '60ms' },
        { top: '52%', left: '40%', delay: '300ms' },
        { top: '62%', left: '60%', delay: '180ms' },
        { top: '48%', left: '48%', delay: '360ms' },
      ]
      return h(
        'div',
        { className: 'hermes-fortune-draw', role: 'presentation', 'aria-hidden': 'true' },
        h(
          'div',
          { className: 'hermes-fortune-slip' },
          h('span', { className: 'hermes-fortune-slip-zh' }, '今日一签'),
          h('span', { className: 'hermes-fortune-slip-seal' }, '签'),
        ),
        motes.map((mote, index) =>
          h('span', {
            key: 'mote-' + index,
            className: 'hermes-fortune-mote',
            style: { top: mote.top, left: mote.left, animationDelay: mote.delay },
          }),
        ),
      )
    }

    /** 八正卦：同一三爻上下相叠，得乾为天、坤为地…… */
    const PURE_HEXAGRAM = {
      乾: '乾为天',
      坤: '坤为地',
      震: '震为雷',
      巽: '巽为风',
      坎: '坎为水',
      离: '离为火',
      艮: '艮为山',
      兑: '兑为泽',
    }

    function hexagramName(reading) {
      return PURE_HEXAGRAM[reading.gua] || reading.gua + '卦'
    }

    /** 六爻重卦：上卦、下卦同取今日三爻，落成一张卦象。 */
    function HexagramGlyph({ pattern, className }) {
      return h(
        'svg',
        { className: className || 'hermes-hexagram-glyph', width: 46, height: 54, viewBox: '0 0 46 54', fill: 'none', 'aria-hidden': 'true' },
        trigramLines(23, 4, 36, 2.8, 7, pattern),
        trigramLines(23, 33, 36, 2.8, 7, pattern),
      )
    }

    /** 收下时的一纸符咒：敕令、朱砂符纹、六爻与卦名朱印。 */
    function TalismanCast({ reading }) {
      return h(
        'div',
        { className: 'hermes-talisman', role: 'presentation', 'aria-hidden': 'true' },
        h(
          'div',
          { className: 'hermes-talisman-sheet' },
          h('span', { className: 'hermes-talisman-command' }, '敕令'),
          h(
            'svg',
            { className: 'hermes-talisman-rune', viewBox: '0 0 52 76', fill: 'none', 'aria-hidden': 'true' },
            h('path', {
              d: 'M26 3c5 5 1 9 6 13s7 9 2 14-11 5-12 13 7 10 7 16 4 8 4 8',
              stroke: 'currentColor',
              strokeWidth: 1.8,
              strokeLinecap: 'round',
            }),
            h('path', {
              d: 'M13 18c7 2 9 8 4 12s-9 4-7 11',
              stroke: 'currentColor',
              strokeWidth: 1.5,
              strokeLinecap: 'round',
              opacity: 0.8,
            }),
            h('path', {
              d: 'M39 18c-7 2-9 8-4 12s9 4 7 11',
              stroke: 'currentColor',
              strokeWidth: 1.5,
              strokeLinecap: 'round',
              opacity: 0.8,
            }),
            h('path', {
              d: 'M15 55c4-3 8-3 10 0s6 3 10 0',
              stroke: 'currentColor',
              strokeWidth: 1.4,
              strokeLinecap: 'round',
              opacity: 0.75,
            }),
            h('circle', { cx: 26, cy: 33, r: 1.8, fill: 'currentColor', opacity: 0.85 }),
          ),
          h(HexagramGlyph, { pattern: reading.pattern, className: 'hermes-talisman-hex' }),
          h('span', { className: 'hermes-talisman-seal' }, reading.gua),
        ),
        [
          { top: '36%', left: '34%', delay: '160ms' },
          { top: '44%', left: '66%', delay: '320ms' },
          { top: '56%', left: '42%', delay: '80ms' },
          { top: '62%', left: '60%', delay: '420ms' },
        ].map((mote, index) =>
          h('span', {
            key: 'talisman-mote-' + index,
            className: 'hermes-fortune-mote',
            style: { top: mote.top, left: mote.left, animationDelay: mote.delay },
          }),
        ),
      )
    }

    /** 收下后留在右下角的今日卦象签；悬停可点 × 收起。 */
    function StoredHexagram({ reading, onClose }) {
      return h(
        'aside',
        {
          className: 'hermes-hexagram',
          'aria-label': '今日卦象：' + hexagramName(reading) + ' ' + reading.grade,
        },
        h(
          'button',
          { type: 'button', className: 'hermes-hexagram-close', onClick: onClose, title: '收起卦象', 'aria-label': '收起卦象' },
          '×',
        ),
        h('span', { className: 'hermes-hexagram-head' }, '今日卦象'),
        h(HexagramGlyph, { pattern: reading.pattern }),
        h('span', { className: 'hermes-hexagram-name' }, hexagramName(reading)),
        h('span', { className: 'hermes-hexagram-grade' }, reading.grade),
        h('span', { className: 'hermes-hexagram-arrow', 'aria-hidden': 'true' }, '›'),
      )
    }

    /** The 「占卜」 token tablet beside the sidebar wordmark: two glyphs, carved vertically. */
    function FortuneTrigger() {
      const [enabled, setEnabled] = React.useState(() => flagOn(DAILY_KEY))

      React.useEffect(() => {
        const sync = () => setEnabled(flagOn(DAILY_KEY))
        window.addEventListener(SETTINGS_EVENT, sync)
        return () => window.removeEventListener(SETTINGS_EVENT, sync)
      }, [])

      if (!enabled) return null

      const open = (event) => {
        event.preventDefault()
        event.stopPropagation()
        openFortune()
      }
      const onKeyDown = (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        open(event)
      }
      return h(
        'span',
        {
          className: 'hermes-fortune-trigger',
          role: 'button',
          tabIndex: 0,
          title: '今日运势 · 占卜',
          'aria-label': '今日运势 · 占卜',
          onClick: open,
          onKeyDown,
          onPointerDown: (event) => event.stopPropagation(),
        },
        h('span', { className: 'hermes-fortune-trigger-glyph', 'aria-hidden': 'true' }, '占'),
        h('span', { className: 'hermes-fortune-trigger-glyph', 'aria-hidden': 'true' }, '卜'),
      )
    }

    /**
     * Frame-level divination card: today's grade, lot poem, and 宜/忌.
     * 「收下」 is not just a close: it casts the reading into a talisman that
     * flies to the bottom-right and settles there as today's hexagram slip.
     */
    /** 当天收下的卦象会留在右下角：跨刷新仍在，直到点 × 收起或跨日。 */
    function readAcceptedReading() {
      if (!flagOn(DAILY_KEY)) return null
      if (readStored(FORTUNE_DAY_KEY, '') !== readTodayKey()) return null
      return fortuneOfDay()
    }

    /**
     * Frame-level divination card: today's grade, lot poem, and 宜/忌.
     * 起卦（签牌浮起）→ 显卦（签卡展开）→ 解卦（签文/解读）→ 收签（符咒飞渡，
     * 右下角落成今日卦象）。
     */
    function FortunePanel() {
      const [reading, setReading] = React.useState(null)
      const [drawing, setDrawing] = React.useState(false)
      const [casting, setCasting] = React.useState(null)
      const [accepted, setAccepted] = React.useState(readAcceptedReading)
      const [daily, setDaily] = React.useState(() => flagOn(DAILY_KEY))
      const cardRef = React.useRef(null)
      const restoreFocusRef = React.useRef(null)

      const restoreFocus = () => {
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
        const opener = () => {
          if (!flagOn(DAILY_KEY)) return
          const active = document.activeElement
          restoreFocusRef.current =
            active && active !== document.body ? active : document.querySelector('.hermes-fortune-trigger')
          setReading(fortuneOfDay())
          // 动效关或系统减动都直接显卦，不演起卦签牌。
          setDrawing(!prefersReducedMotion() && flagOn(MOTION_KEY))
        }
        fortuneOpeners.add(opener)
        const sync = () => {
          const enabled = flagOn(DAILY_KEY)
          setDaily(enabled)
          if (!enabled) {
            setReading(null)
            setDrawing(false)
            setAccepted(null)
          } else {
            setAccepted(readAcceptedReading())
          }
        }
        window.addEventListener(SETTINGS_EVENT, sync)
        return () => {
          fortuneOpeners.delete(opener)
          window.removeEventListener(SETTINGS_EVENT, sync)
        }
      }, [])

      // 起卦演完、签卡落定后把焦点送进对话框；Tab 在卡内循环。
      React.useEffect(() => {
        if (reading === null || drawing) return undefined
        const card = cardRef.current
        if (card && typeof card.focus === 'function') card.focus()
        return undefined
      }, [reading, drawing])

      // 起卦只演 900ms；到点自动落到签卡。
      React.useEffect(() => {
        if (!drawing) return undefined
        const timer = setTimeout(() => setDrawing(false), 900)
        return () => clearTimeout(timer)
      }, [drawing])

      React.useEffect(() => {
        if (reading === null) return undefined
        const onKey = (event) => {
          if (event.key === 'Escape') {
            setReading(null)
            setDrawing(false)
            restoreFocus()
          }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
      }, [reading])

      // 符咒只演 1.7 秒；到点自行退场，卦象签已经留在右下角。
      React.useEffect(() => {
        if (casting === null) return undefined
        const timer = setTimeout(() => setCasting(null), 1700)
        return () => clearTimeout(timer)
      }, [casting])

      const close = () => {
        setReading(null)
        setDrawing(false)
        restoreFocus()
      }
      const accept = () => {
        if (reading === null) return
        setCasting({ ...reading, stamp: Date.now() })
        setAccepted(reading)
        writeStored(FORTUNE_DAY_KEY, readTodayKey())
        setReading(null)
        setDrawing(false)
        restoreFocus()
      }
      // 页面跨过零点后，昨天的卦象不再挂到现在。
      React.useEffect(() => {
        if (!daily) return undefined
        const timer = setInterval(() => {
          const stored = readStored(FORTUNE_DAY_KEY, '')
          if (stored !== '' && stored !== readTodayKey()) {
            setAccepted(null)
            writeStored(FORTUNE_DAY_KEY, '')
          }
        }, 60000)
        return () => clearInterval(timer)
      }, [daily])

      const dismissStored = () => {
        setAccepted(null)
        writeStored(FORTUNE_DAY_KEY, '')
      }
      const keepOpen = (event) => event.stopPropagation()
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

      const card =
        reading === null
          ? null
          : h(
              'div',
              {
                className: 'hermes-fortune',
                role: 'presentation',
                onPointerDown: (event) => {
                  if (event.target === event.currentTarget) close()
                },
              },
              h(
                'div',
                {
                  className: 'hermes-fortune-card',
                  role: 'dialog',
                  'aria-modal': 'true',
                  'aria-label': '今日运势',
                  tabIndex: -1,
                  ref: cardRef,
                  onPointerDown: keepOpen,
                  onKeyDown: trapCardFocus,
                },
                h(FortuneArt),
                h(
                  'div',
                  { className: 'hermes-fortune-inner' },
                  h(
                    'div',
                    { className: 'hermes-fortune-head' },
                    h('span', { className: 'hermes-fortune-kicker' }, '今日占卜'),
                    h('span', { className: 'hermes-fortune-date' }, reading.dateText),
                  ),
                  h(
                    'div',
                    { className: 'hermes-fortune-core' },
                    h(FortuneTrigram, { pattern: reading.pattern }),
                    h('span', { className: 'hermes-fortune-title' }, reading.gua + '卦'),
                    h('span', { className: 'hermes-fortune-grade' }, reading.grade),
                  ),
                  reading.poem.map((line, index) => h('p', { key: 'poem-' + index, className: 'hermes-fortune-poem' }, line)),
                  h('div', { className: 'hermes-fortune-rule', 'aria-hidden': 'true' }, h('span')),
                  h('p', { className: 'hermes-fortune-read' }, reading.read),
                  h(
                    'div',
                    { className: 'hermes-fortune-tags' },
                    h(
                      'span',
                      { className: 'hermes-fortune-tag hermes-fortune-tag--good' },
                      h('b', null, '宜'),
                      ' ' + reading.good,
                    ),
                    h(
                      'span',
                      { className: 'hermes-fortune-tag hermes-fortune-tag--bad' },
                      h('b', null, '忌'),
                      ' ' + reading.bad,
                    ),
                  ),
                  h(
                    'div',
                    { className: 'hermes-fortune-foot' },
                    h('span', { className: 'hermes-fortune-note' }, '每日一签 · 图个心安'),
                    h('button', { type: 'button', className: 'hermes-fortune-close', onClick: accept }, '收下'),
                  ),
                ),
              ),
            )

      if (!daily) return null
      if (card === null && casting === null && accepted === null) return null

      return h(
        React.Fragment,
        null,
        drawing && reading !== null ? h(FortuneDraw) : card,
        casting === null ? null : h(TalismanCast, { key: casting.stamp, reading: casting }),
        accepted === null ? null : h(StoredHexagram, { reading: accepted, onClose: dismissStored }),
      )
    }

    const STARS = [
      { top: '9%', left: '6%', delay: '0s' },
      { top: '19%', left: '23%', delay: '1.6s', violet: true },
      { top: '7%', left: '38%', delay: '3.1s' },
      { top: '31%', left: '12%', delay: '0.8s' },
      { top: '37%', left: '31%', delay: '2.4s' },
      { top: '47%', left: '4%', delay: '4.2s', violet: true },
      { top: '60%', left: '18%', delay: '1.1s' },
      { top: '67%', left: '30%', delay: '3.7s' },
      { top: '74%', left: '68%', delay: '0.4s' },
      { top: '80%', left: '77%', delay: '5.3s' },
      { top: '86%', left: '52%', delay: '2.9s', violet: true },
      { top: '63%', left: '88%', delay: '4.8s' },
    ]

    /** Frame-wide watermark: a bagua star-wheel in the top-right and ink ridges along the floor. */
    function Ambient() {
      return h(
        'div',
        { className: 'hermes-ambient', 'aria-hidden': 'true' },
        h(
          'div',
          { className: 'hermes-ambient-orb' },
          h(
            'svg',
            { className: 'hermes-ambient-orb-svg', viewBox: '0 0 600 600', fill: 'none', preserveAspectRatio: 'xMidYMid slice' },
            h(
              'g',
              { className: 'hermes-ambient-orb-inner' },
            h('circle', { cx: 300, cy: 300, r: 286, style: { stroke: 'currentColor' }, strokeWidth: 1.3, opacity: 0.55 }),
            h('circle', {
              cx: 300,
              cy: 300,
              r: 252,
              style: { stroke: 'currentColor' },
              strokeWidth: 0.9,
              opacity: 0.36,
              strokeDasharray: '1 7',
            }),
            h('circle', { cx: 300, cy: 300, r: 186, style: { stroke: 'currentColor' }, strokeWidth: 0.9, opacity: 0.3 }),
            h('circle', { cx: 300, cy: 300, r: 120, style: { stroke: 'currentColor' }, strokeWidth: 0.8, opacity: 0.26 }),
            TRIGRAMS.map((pattern, index) =>
              h(
                'g',
                { key: 'orb-trigram-' + index, transform: 'rotate(' + index * 45 + ' 300 300)' },
                trigramLines(300, 34, 30, 2.2, 4.4, pattern),
              ),
            ),
            h('circle', { cx: 300, cy: 300, r: 52, style: { stroke: 'currentColor' }, strokeWidth: 0.8, opacity: 0.55 }),
            h('circle', { cx: 300, cy: 300, r: 47, style: { fill: 'var(--hermes-gold)' }, opacity: 0.34 }),
            h('path', {
              d: 'M300 253a47 47 0 0 1 0 94a23.5 23.5 0 0 1 0-47a23.5 23.5 0 0 0 0-47Z',
              style: { fill: 'var(--hermes-paper)' },
            }),
            h('circle', { cx: 300, cy: 276.5, r: 7.5, style: { fill: 'var(--hermes-gold)' }, opacity: 0.6 }),
            h('circle', { cx: 300, cy: 323.5, r: 7.5, style: { fill: 'var(--hermes-paper)' } }),
            h('circle', { cx: 300, cy: 300, r: 1.8, style: { fill: 'var(--hermes-gold)' } }),
            ),
          ),
        ),
        h(
          'svg',
          {
            className: 'hermes-ambient-ridges',
            viewBox: '0 0 1440 250',
            preserveAspectRatio: 'none',
            fill: 'none',
          },
          h('path', {
            d: 'M0 214 C96 176 168 198 246 168 C330 136 402 178 486 152 C580 122 648 166 736 146 C824 126 900 172 992 150 C1084 128 1152 170 1244 150 C1330 132 1396 166 1440 156 L1440 250 L0 250 Z',
            style: { fill: 'currentColor' },
            opacity: 0.45,
          }),
          h('path', {
            d: 'M0 232 C120 208 208 224 318 210 C432 196 520 224 636 214 C752 204 848 228 964 216 C1080 204 1184 226 1296 218 C1360 214 1408 220 1440 216 L1440 250 L0 250 Z',
            style: { fill: 'currentColor' },
            opacity: 0.6,
          }),
          h('path', {
            d: 'M0 240 C188 228 344 242 520 234 C700 226 880 240 1054 232 C1210 225 1342 236 1440 230',
            style: { stroke: 'var(--hermes-gold)' },
            strokeWidth: 0.9,
            opacity: 0.55,
          }),
        ),
        STARS.map((star, index) =>
          h('span', {
            key: 'star-' + index,
            className: 'hermes-ambient-star' + (star.violet ? ' hermes-ambient-star--violet' : ''),
            style: { top: star.top, left: star.left, animationDelay: star.delay },
          }),
        ),
        h(Inscription),
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

    /* ——— 五秒开机动画：中央八卦，上下左右四向行书 ——— */
    const BOOT_POEM = {
      top: '躲天意，避因果，诸般枷锁困真我；',
      bottom: '顺天意，承因果，今日方知我是我；',
      left: '一朝悟道见真我，何惧昔日旧枷锁；',
      right: '世间枷锁本是梦，无形无相亦无我',
    }
    const BOOT_MS = 5000
    const BOOT_FADE_MS = 600
    let bootSeen = false

    /* 先天八卦，自正上方顺时针：乾、巽、坎、艮、坤、震、离、兑。
       爻线按「初爻朝内」排，绘制顺序为外→内（三爻、二爻、初爻）。 */
    const BAGUA_TRIGRAMS = [
      [1, 1, 1],
      [1, 1, 0],
      [0, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 1],
      [1, 0, 1],
      [0, 1, 1],
    ]
    const BAGUA_MARKERS = BAGUA_TRIGRAMS.map((_, index) => {
      const angle = ((index * 45 + 22.5) * Math.PI) / 180
      return { key: 'bagua-marker-' + index, cx: 100 + 90.5 * Math.sin(angle), cy: 100 - 90.5 * Math.cos(angle) }
    })

    /** 先天八卦盘：曜金三爻环 + 墨/月白太极，开机动画与发送动画共用。 */
    function BaguaPlate() {
      return h(
        'svg',
        { className: 'hermes-bagua', viewBox: '0 0 200 200', fill: 'none', 'aria-hidden': 'true' },
        h('circle', {
          className: 'hermes-bagua-glow',
          cx: 100,
          cy: 100,
          r: 96,
          style: { fill: 'var(--hermes-gold, #B58A43)', opacity: 0.1 },
        }),
        h(
          'g',
          { className: 'hermes-bagua-ring', style: { color: 'var(--hermes-gold, #B58A43)' } },
          h(
            'g',
            { className: 'hermes-bagua-rings' },
            h('circle', { cx: 100, cy: 100, r: 97, style: { stroke: 'currentColor' }, strokeWidth: 0.7, opacity: 0.45 }),
            h('circle', {
              cx: 100,
              cy: 100,
              r: 91,
              style: { stroke: 'currentColor' },
              strokeWidth: 0.38,
              strokeDasharray: '1 6',
              opacity: 0.26,
            }),
            h('circle', { cx: 100, cy: 100, r: 64, style: { stroke: 'currentColor' }, strokeWidth: 0.45, opacity: 0.28 }),
          ),
          h(
            'g',
            { className: 'hermes-bagua-trigrams' },
            BAGUA_TRIGRAMS.map((pattern, index) =>
              h(
                'g',
                {
                  key: 'bagua-trigram-' + index,
                  className: 'hermes-bagua-trigram',
                  style: { '--i': index },
                  transform: 'rotate(' + index * 45 + ' 100 100)',
                },
                trigramLines(100, 13.1, 23, 2.2, 5.8, pattern),
              ),
            ),
          ),
          h(
            'g',
            { className: 'hermes-bagua-markers' },
            BAGUA_MARKERS.map((marker) =>
              h('path', {
                key: marker.key,
                d:
                  'M' + marker.cx + ' ' + (marker.cy - 1.7) +
                  'L' + (marker.cx + 1.7) + ' ' + marker.cy +
                  'L' + marker.cx + ' ' + (marker.cy + 1.7) +
                  'L' + (marker.cx - 1.7) + ' ' + marker.cy + 'Z',
                style: { fill: 'currentColor' },
                opacity: 0.5,
              }),
            ),
          ),
        ),
        h(
          'g',
          { className: 'hermes-bagua-taiji' },
          h('circle', { cx: 100, cy: 100, r: 59, style: { stroke: 'var(--hermes-gold, #B58A43)' }, strokeWidth: 0.5, opacity: 0.45 }),
          h('circle', { cx: 100, cy: 100, r: 57, style: { fill: 'var(--hermes-ink, #383344)' } }),
          h('path', {
            d: 'M100 43a57 57 0 0 1 0 114a28.5 28.5 0 0 1 0-57a28.5 28.5 0 0 0 0-57Z',
            style: { fill: 'var(--hermes-paper, #FDFAF4)' },
          }),
          h('circle', { cx: 100, cy: 71.5, r: 9.2, style: { fill: 'var(--hermes-ink, #383344)' } }),
          h('circle', { cx: 100, cy: 128.5, r: 9.2, style: { fill: 'var(--hermes-paper, #FDFAF4)' } }),
          h('circle', { cx: 100, cy: 100, r: 2, style: { fill: 'var(--hermes-gold, #B58A43)' } }),
        ),
      )
    }

    /** 开机：混沌初开 → 太极初生 → 八卦归位 → 万象归一。 */
    function BootCurtain() {
      // 同一份文档（含 client-hmr 热替换）只放一次；刷新页面才重新开场。
      const still = React.useMemo(() => prefersReducedMotion() || !flagOn(MOTION_KEY), [])
      const bootMs = still ? 2400 : BOOT_MS
      const [phase, setPhase] = React.useState(() => {
        if (bootSeen) return 'gone'
        if (!flagOn(BOOT_KEY)) return 'gone'
        try {
          const doc = String(Math.round(performance.timeOrigin))
          if (window.sessionStorage.getItem('hermes-boot') === doc) return 'gone'
          window.sessionStorage.setItem('hermes-boot', doc)
        } catch (error) {
          // 没有 sessionStorage 时退回模块级标记。
        }
        return 'on'
      })
      const [stage, setStage] = React.useState(still ? 3 : 0)

      React.useEffect(() => {
        if (bootSeen) return undefined
        bootSeen = true
        if (phase === 'gone') return undefined
        const timers = []
        if (!still) {
          timers.push(setTimeout(() => setStage(1), 800))
          timers.push(setTimeout(() => setStage(2), 1800))
          timers.push(setTimeout(() => setStage(3), 3000))
        }
        timers.push(setTimeout(() => setPhase('leaving'), bootMs - BOOT_FADE_MS))
        timers.push(setTimeout(() => setPhase('gone'), bootMs))
        return () => timers.forEach((timer) => clearTimeout(timer))
        // 开场生命周期只在挂载时排一次；phase/stage 由这些定时器推进。
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      // 跳过键只在开场还看得见时生效；开场结束后必须摘掉监听，
      // 否则组件虽然渲染为 null，残留的监听仍会被空格/回车重新点亮一遍开场。
      const visible = phase !== 'gone'
      React.useEffect(() => {
        if (!visible) return undefined
        const onKey = (event) => {
          // 空格不参与：避免在输入框里敲空格时误触开场动画。
          if (event.key === 'Escape' || event.key === 'Enter') {
            setPhase((current) => (current === 'on' ? 'leaving' : current))
          }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
      }, [visible])

      React.useEffect(() => {
        if (phase !== 'leaving') return undefined
        const timer = setTimeout(() => setPhase('gone'), BOOT_FADE_MS + 80)
        return () => clearTimeout(timer)
      }, [phase])

      if (phase === 'gone') return null

      const skip = () => setPhase((current) => (current === 'on' ? 'leaving' : current))
      const stageClass = ' hermes-boot--s' + stage + (still ? ' hermes-boot--still' : '')

      return h(
        'div',
        {
          className: 'hermes-boot' + stageClass + (phase === 'leaving' ? ' hermes-boot--out' : ''),
          role: 'presentation',
          'aria-hidden': 'true',
          onPointerDown: skip,
        },
        h('div', { className: 'hermes-boot-frame' }),
        still ? null : h('div', { className: 'hermes-boot-ink hermes-boot-ink--a' }),
        still ? null : h('div', { className: 'hermes-boot-ink hermes-boot-ink--b' }),
        still ? null : h('div', { className: 'hermes-boot-ink hermes-boot-ink--c' }),
        STARS.map((star, index) =>
          h('span', {
            key: 'boot-star-' + index,
            className: 'hermes-ambient-star' + (star.violet ? ' hermes-ambient-star--violet' : ''),
            style: { top: star.top, left: star.left, animationDelay: star.delay },
          }),
        ),
        h('div', { className: 'hermes-boot-line hermes-boot-line--top' }, BOOT_POEM.top),
        h('div', { className: 'hermes-boot-line hermes-boot-line--bottom' }, BOOT_POEM.bottom),
        h(
          'div',
          { className: 'hermes-boot-rail hermes-boot-rail--left' },
          h('div', { className: 'hermes-boot-line hermes-boot-line--left' }, BOOT_POEM.left),
        ),
        h(
          'div',
          { className: 'hermes-boot-rail hermes-boot-rail--right' },
          h('div', { className: 'hermes-boot-line hermes-boot-line--right' }, BOOT_POEM.right),
        ),
        h('div', { className: 'hermes-boot-core' }, h(BaguaPlate)),
        h('div', { className: 'hermes-boot-hint' }, '轻触任意处 · 跳过'),
      )
    }

    /**
     * 回车发送的一记太极。
     * 触发条件：编辑器里的草稿非空 + 纯回车（否掉 Shift/Cmd/Ctrl/Alt 与输入法合成）
     * + 随后草稿被提交清空。空格输入、换行、空草稿回车、点发送按钮都不会闪。
     * 触发点在 composer dock，画面由 frame 级 overlay 承担，避免被局部容器裁切。
     */
    const sendBurstListeners = new Set()
    function emitSendBurst() {
      for (const listener of sendBurstListeners) listener()
    }

    function SendTaijiTrigger(props) {
      const useInput = props && props.useInput
      if (typeof useInput !== 'function') return null
      return h(SendTaijiKeywatch, { useInput })
    }

    function SendTaijiKeywatch({ useInput }) {
      const draft = useInput((state) => (state && typeof state.draft === 'string' ? state.draft : ''))
      const draftRef = React.useRef(draft)
      draftRef.current = draft
      const pending = React.useRef(null)

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
          const text = draftRef.current
          if (typeof text !== 'string' || text.trim() === '') return
          // 这里只是"预判"：草稿随即被提交清空才算真的发出去。
          pending.current = { at: Date.now() }
        }
        window.addEventListener('keydown', onKeyDown, true)
        return () => window.removeEventListener('keydown', onKeyDown, true)
      }, [])

      React.useEffect(() => {
        const waiting = pending.current
        if (!waiting) return undefined
        if (Date.now() - waiting.at > 1500) {
          pending.current = null
          return undefined
        }
        if (typeof draft === 'string' && draft.trim() === '') {
          pending.current = null
          emitSendBurst()
        }
        return undefined
      }, [draft])

      return null
    }

    /** Frame-level replayer for the send burst; listens to the composer's trigger. */
    function SendTaijiOverlay() {
      const [burst, setBurst] = React.useState(0)

      React.useEffect(() => {
        const listener = () => setBurst((current) => current + 1)
        sendBurstListeners.add(listener)
        return () => {
          sendBurstListeners.delete(listener)
        }
      }, [])

      React.useEffect(() => {
        if (burst === 0) return undefined
        const timer = setTimeout(() => setBurst(0), 1500)
        return () => clearTimeout(timer)
      }, [burst])

      if (burst === 0) return null
      return h(
        'div',
        { className: 'hermes-send', role: 'presentation', 'aria-hidden': 'true' },
        h('div', { className: 'hermes-send-plate', key: burst }, h(BaguaPlate)),
      )
    }

    function apply(ctx) {
      ctx.effect(() => {
        const tag = document.createElement('style')
        tag.dataset.plugin = PKG
        tag.dataset.pluginCss = PKG + '/skin.css'
        tag.textContent = CSS
        document.head.appendChild(tag)
        return () => tag.remove()
      }, 'hermes-skin: skin stylesheet')

      ctx.effect(() => ctx.theme.overrideTokens(PKG, TOKENS), 'hermes-skin: alias tokens')

      // 档位与动效开关落到 <html> 的 data-* 上，CSS 据此切换装饰密度。
      ctx.effect(() => {
        applyRootSettings()
        const sync = () => applyRootSettings()
        window.addEventListener(SETTINGS_EVENT, sync)
        return () => window.removeEventListener(SETTINGS_EVENT, sync)
      }, 'hermes-skin: root depth/motion attributes')

      // 思考状态观测：只读 DOM 信号，写 data-hermes-thinking 供样式联动。
      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register({ name: 'shell.overlay', id: 'hermes-thinking', order: -20 }, ThinkingWatcher),
      )
      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register({ name: 'shell.overlay', id: 'hermes-ambient', order: -10 }, Ambient),
      )
      // Boot curtain: five seconds on first paint, then it removes itself.
      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register({ name: 'shell.overlay', id: 'hermes-boot', order: 50 }, BootCurtain),
      )
      // 回车发送的太极闪屏：挂在 frame 级 overlay，避免被会话容器裁切。
      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register({ name: 'shell.overlay', id: 'hermes-send-taiji', order: 45 }, SendTaijiOverlay),
      )
      // 今日占卜签卡：由侧栏品牌行的小按钮触发，画面挂在 frame 级 overlay。
      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register({ name: 'shell.overlay', id: 'hermes-fortune', order: 40 }, FortunePanel),
      )
      // 空白会话不出太极：用空占位 shadow 掉官方品牌位，聊天里只在发送时闪太极。
      ctx.slots.inject('conversation.hero.brand.mark', () =>
        ctx.slots.register({ name: 'conversation.hero.brand.mark', priority: -100 }, NoHeroMark),
      )
      // 思考氛围药丸条放在输入框正上方（圆角卡片之上），箴言仍留在输入框下沿。
      ctx.slots.inject('conversation.input.dock', () =>
        ctx.slots.register({ name: 'conversation.input.dock', id: 'hermes-depthdock', order: 20 }, SkinDock),
      )
      ctx.slots.inject('conversation.composer.dock', () => [
        ctx.slots.register({ name: 'conversation.composer.dock', id: 'hermes-motto', order: 20 }, Motto),
        ctx.slots.register({ name: 'conversation.composer.dock', id: 'hermes-send-taiji', order: 21 }, SendTaijiTrigger),
        ctx.slots.register({ name: 'conversation.composer.dock', id: 'hermes-ziwei-send', order: 22 }, ZiweiSendWatch),
      ])
      // V3 · 紫微命盘对话框：frame 级 overlay，排在占卜签卡之下。
      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register({ name: 'shell.overlay', id: 'hermes-ziwei', order: 42 }, ZiweiPanel),
      )
      // V3 · 模型名旁的紫微徽记：单槽位，priority 压过官方品牌包（见 ZiweiModelLabel 注释）。
      ctx.slots.inject('conversation.input.model.label', () =>
        ctx.slots.register({ name: 'conversation.input.model.label', priority: -100 }, ZiweiModelLabel),
      )
      // V3 · 会话头右侧的命盘入口。
      ctx.slots.inject('conversation.session.header.utilities', () =>
        ctx.slots.register({ name: 'conversation.session.header.utilities', id: 'hermes-ziwei', order: 300 }, ZiweiHeaderButton),
      )
      // V3 · 侧栏会话行悬停按钮：与归档/置顶同一条操作带。
      ctx.slots.inject('sidebar.workspaces.session.row.action', () =>
        ctx.slots.register({ name: 'sidebar.workspaces.session.row.action', id: 'hermes-ziwei', order: 150 }, ZiweiSessionRowAction),
      )
      // The official brand bundle occupies both single slots at priority 0.
      // Single slots shadow by priority (lowest renders), so register below it
      // instead of clashing at the same rank.
      ctx.slots.inject('sidebar.brand.mark', () =>
        ctx.slots.register({ name: 'sidebar.brand.mark', priority: -100 }, TaijiMark),
      )
      ctx.slots.inject('sidebar.brand.name', () =>
        ctx.slots.register({ name: 'sidebar.brand.name', priority: -100 }, BrandName),
      )
    }

    return {
      inject: ['slots', 'theme'],
      apply,
    }
  },
})
