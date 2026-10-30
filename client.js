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
      '--dsw-alias-bg-base': { light: '#F8F4EC', dark: '#141118' },
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
      '--dsw-alias-label-secondary': { light: '#6D6473', dark: '#B7ACC0' },
      '--dsw-alias-label-tertiary': { light: '#746A7A', dark: '#978CA3' },
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
      '--hermes-ink': { light: '#3A3342', dark: '#EFE6F2' },
      '--hermes-paper': { light: '#FDFAF4', dark: '#1C1822' },
      '--hermes-gold': { light: '#B08A46', dark: '#D9BE86' },
      '--hermes-violet': { light: '#8E7FA8', dark: '#C0A9DD' },
      '--hermes-art': { light: '#6D6473', dark: '#B7ACC0' },
      /* faint ink for the background-center inscription */
      '--hermes-inscription': { light: '#3A334226', dark: '#EFE6F22E' },
    }

    const CSS = `
.hermes-brand-lockup{display:inline-flex;flex-direction:column;justify-content:center;gap:0;min-width:0;line-height:1;overflow:hidden}
.hermes-brand-zh{font-family:${SERIF};font-size:17px;font-weight:500;line-height:17px;letter-spacing:.12em;color:var(--dsw-alias-label-primary);white-space:nowrap}
.hermes-brand-en{font-size:6.5px;font-weight:500;line-height:7px;letter-spacing:.34em;color:var(--hermes-gold);opacity:.95;white-space:nowrap;transform:translateX(.08em)}
.hermes-brand-row{display:inline-flex;align-items:center;gap:10px;min-width:0}
.hermes-fortune-trigger{display:inline-flex;align-items:center;justify-content:center;flex:none;height:22px;padding:0 8px;border:1px solid var(--hermes-gold);border-radius:11px;background:transparent;color:var(--hermes-gold);font-family:${SERIF};font-size:10px;line-height:1;letter-spacing:.16em;white-space:nowrap;cursor:pointer;user-select:none;transition:background-color .15s ease,color .15s ease}
.hermes-fortune-trigger:hover{background:var(--dsw-alias-interactive-bg-hover-accent);color:var(--dsw-alias-label-primary)}
.hermes-fortune-trigger:focus-visible{outline:2px solid var(--hermes-gold);outline-offset:2px}
.hermes-motto{display:inline-flex;align-items:center;gap:7px;color:var(--hermes-art);font-size:11px;line-height:16px;letter-spacing:.18em;opacity:.9;white-space:nowrap;user-select:none}
.hermes-motto-star{color:var(--hermes-gold);font-size:10px;line-height:1;opacity:.95}
.hermes-inscription{position:absolute;top:48%;left:50%;transform:translate(-50%,-50%);display:flex;flex-direction:row-reverse;align-items:flex-start;gap:.55em;color:var(--hermes-inscription);font-family:${BRUSH};font-weight:400;white-space:nowrap;user-select:none;pointer-events:none}
.hermes-inscription-line{display:block;writing-mode:vertical-rl;text-orientation:upright;font-size:clamp(20px,4.5vh,44px);line-height:1.2;letter-spacing:.16em;padding-top:.16em}
.hermes-ambient{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;user-select:none}
.hermes-ambient-orb{position:absolute;top:-6vh;right:-4vw;width:min(560px,46vw,62vh);height:auto;aspect-ratio:1;color:var(--hermes-gold);opacity:.22;animation:hermes-drift 34s ease-in-out infinite}
.hermes-ambient-ridges{position:absolute;left:0;right:0;bottom:0;width:100%;height:250px;color:var(--hermes-ink);opacity:.09}
.hermes-ambient-star{position:absolute;width:2px;height:2px;border-radius:50%;background:var(--hermes-gold);box-shadow:0 0 6px var(--hermes-gold);opacity:.55;animation:hermes-twinkle 9s ease-in-out infinite}
.hermes-ambient-star--violet{background:var(--hermes-violet);box-shadow:0 0 6px var(--hermes-violet)}
@keyframes hermes-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes hermes-glow{0%,100%{opacity:.35}50%{opacity:.8}}
@keyframes hermes-drift{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(-14px,10px,0)}}
@keyframes hermes-twinkle{0%,100%{opacity:.18}50%{opacity:.5}}
/* ——— 启动开机动画：五秒，中央八卦，上下左右四向行书箴言 ——— */
.hermes-boot{position:fixed;inset:0;z-index:9000;overflow:hidden;pointer-events:auto;cursor:default;user-select:none;color:var(--hermes-ink,#3A3342);background:radial-gradient(120% 82% at 50% 44%,rgba(176,138,70,.13),transparent 58%),radial-gradient(90% 62% at 50% 108%,rgba(114,97,140,.10),transparent 62%),var(--dsw-alias-bg-base,#F8F4EC);animation:hermes-boot-in 420ms ease both}
.hermes-boot--out{animation:hermes-boot-out 600ms cubic-bezier(.4,0,.6,1) both}
.hermes-boot-frame{position:absolute;inset:clamp(14px,2.4vh,28px);border:1px solid var(--hermes-gold,#B08A46);opacity:.2;pointer-events:none}
.hermes-boot-line{position:absolute;margin:0;padding:.35em 0;font-family:${BRUSH};font-weight:400;line-height:1.18;color:var(--hermes-ink,#3A3342);white-space:nowrap;text-shadow:0 0 20px rgba(176,138,70,.18);animation:hermes-boot-write-h 1100ms cubic-bezier(.22,.61,.36,1) both}
.hermes-boot-line--top{top:clamp(26px,8.5vh,104px);left:50%;transform:translateX(-50%);font-size:clamp(20px,min(4.5vh,3.4vw),48px);letter-spacing:.16em;animation-delay:420ms}
.hermes-boot-line--bottom{bottom:clamp(26px,8.5vh,104px);left:50%;transform:translateX(-50%);font-size:clamp(20px,min(4.5vh,3.4vw),48px);letter-spacing:.16em;animation-delay:1150ms}
.hermes-boot-rail{position:absolute;top:0;bottom:0;display:flex;align-items:center;pointer-events:none}
.hermes-boot-rail--left{left:clamp(14px,3vw,60px)}
.hermes-boot-rail--right{right:clamp(14px,3vw,60px)}
.hermes-boot-line--left,.hermes-boot-line--right{position:static;padding:0 .35em;writing-mode:vertical-rl;text-orientation:upright;font-size:clamp(17px,3.6vh,40px);letter-spacing:.2em;animation-name:hermes-boot-write-v}
.hermes-boot-line--left{animation-delay:800ms}
.hermes-boot-line--right{animation-delay:1500ms}
.hermes-boot-core{position:absolute;left:50%;top:50%;width:clamp(180px,37vh,400px);aspect-ratio:1;transform:translate(-50%,-50%);animation:hermes-boot-rise 1200ms cubic-bezier(.16,.84,.28,1) 80ms both}
/* 八卦盘：开机动画与发送动画共用 */
.hermes-bagua{display:block;width:100%;height:100%}
.hermes-bagua-ring{transform-box:view-box;transform-origin:100px 100px}
.hermes-bagua-glow{transform-origin:100px 100px}
.hermes-boot-core .hermes-bagua{filter:drop-shadow(0 0 28px rgba(176,138,70,.24))}
.hermes-boot-core .hermes-bagua-ring{animation:hermes-boot-turn 5000ms cubic-bezier(.2,.55,.3,1) both}
.hermes-boot-core .hermes-bagua-glow{animation:hermes-glow 6s ease-in-out infinite}
/* 回车发送时的一记太极：只闪一下，不挡操作 */
.hermes-send{position:fixed;inset:0;z-index:8500;display:flex;align-items:center;justify-content:center;overflow:hidden;pointer-events:none;user-select:none}
.hermes-send-plate{width:clamp(150px,23vh,250px);aspect-ratio:1;opacity:0;animation:hermes-send-plate 1300ms cubic-bezier(.22,.61,.36,1) both}
.hermes-send-plate .hermes-bagua{filter:drop-shadow(0 0 22px rgba(176,138,70,.35))}
.hermes-send-plate .hermes-bagua-ring{animation:hermes-send-turn 1180ms cubic-bezier(.16,.6,.24,1) both}
.hermes-send-plate .hermes-bagua-glow{animation:hermes-send-glow 1180ms ease-in-out both}
/* 发送键：曜金圆键上的一枚太极（白/金两仪）。只替换发送态（箭头 svg），停止态仍是方块。 */
[data-slot="conversation.composer.bar"] button:has(path[d^="M8.3125"]),
[data-slot="conversation.composer.bar"] button[class*="_primary"]:has(svg path){background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3Cmask id='m' maskUnits='userSpaceOnUse' x='0' y='0' width='32' height='32'%3E%3Crect width='32' height='32' fill='%23fff'/%3E%3Ccircle cx='16' cy='8.5' r='2.8' fill='%23000'/%3E%3C/mask%3E%3C/defs%3E%3Cpath mask='url(%23m)' d='M16 1a15 15 0 0 1 0 30 7.5 7.5 0 0 1 0-15 7.5 7.5 0 0 0 0-15Z' fill='%23FFFCF6'/%3E%3Ccircle cx='16' cy='23.5' r='2.8' fill='%23FFFCF6'/%3E%3C/svg%3E");background-position:center;background-size:100% 100%;background-repeat:no-repeat}
[data-slot="conversation.composer.bar"] button:has(path[d^="M8.3125"]) > svg,
[data-slot="conversation.composer.bar"] button[class*="_primary"]:has(svg path) > svg{display:none}
/* 今日占卜：侧栏品牌行的“占卜”按钮 + 居中签卡 */
.hermes-fortune{position:fixed;inset:0;z-index:8600;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(20,17,24,.34);animation:hermes-fortune-in 180ms ease both}
.hermes-fortune-card{position:relative;width:min(372px,100%);max-height:calc(100vh - 48px);overflow:auto;box-sizing:border-box;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--hermes-gold);border-radius:16px;padding:22px 24px 18px;color:var(--dsw-alias-label-primary);font-family:${SERIF};box-shadow:0 26px 70px rgba(20,17,24,.3);animation:hermes-fortune-rise 220ms cubic-bezier(.2,.8,.3,1) both}
.hermes-fortune-head{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding-bottom:10px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.hermes-fortune-kicker{font-size:11px;letter-spacing:.3em;color:var(--hermes-gold)}
.hermes-fortune-date{font-size:11px;letter-spacing:.08em;color:var(--dsw-alias-label-tertiary);font-family:var(--dsw-font-family)}
.hermes-fortune-core{display:flex;flex-direction:column;align-items:center;gap:6px;padding:16px 0 10px}
.hermes-fortune-trigram{display:block;color:var(--hermes-gold)}
.hermes-fortune-title{font-size:19px;letter-spacing:.16em;line-height:1.4}
.hermes-fortune-grade{font-size:11px;letter-spacing:.22em;color:var(--hermes-gold);padding:2px 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:999px}
.hermes-fortune-poem{margin:0;text-align:center;font-size:15px;line-height:1.95;letter-spacing:.1em}
.hermes-fortune-read{margin:12px 0 0;font-size:12px;line-height:1.85;letter-spacing:.04em;color:var(--dsw-alias-label-secondary);font-family:var(--dsw-font-family)}
.hermes-fortune-tags{display:flex;gap:8px;justify-content:center;margin-top:12px}
.hermes-fortune-tag{font-size:11px;line-height:1;letter-spacing:.1em;padding:6px 10px;border-radius:999px;border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary);font-family:var(--dsw-font-family)}
.hermes-fortune-tag--good{border-color:rgba(176,138,70,.55);color:var(--dsw-alias-state-warn-label)}
.hermes-fortune-tag--bad{border-color:rgba(114,97,140,.45);color:var(--dsw-alias-label-deep-diving)}
.hermes-fortune-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:16px;padding-top:12px;border-top:1px solid var(--dsw-alias-border-l1)}
.hermes-fortune-note{font-size:10px;letter-spacing:.14em;color:var(--dsw-alias-label-caption);font-family:var(--dsw-font-family)}
.hermes-fortune-close{cursor:pointer;background:transparent;border:1px solid var(--hermes-gold);border-radius:999px;color:var(--hermes-gold);font:inherit;font-size:11px;letter-spacing:.16em;padding:6px 14px;transition:background-color .15s ease,color .15s ease}
.hermes-fortune-close:hover{background:var(--dsw-alias-interactive-bg-hover-accent);color:var(--dsw-alias-label-primary)}
.hermes-boot-hint{position:absolute;right:clamp(20px,3vw,46px);bottom:clamp(14px,2.2vh,30px);font-size:11px;line-height:1.4;letter-spacing:.2em;color:var(--hermes-art,#6D6473);opacity:0;animation:hermes-boot-hint-in 700ms ease 2400ms both}
@keyframes hermes-boot-in{from{opacity:0}to{opacity:1}}
@keyframes hermes-boot-out{from{opacity:1}to{opacity:0}}
@keyframes hermes-boot-rise{0%{opacity:0;transform:translate(-50%,-50%) scale(.78)}100%{opacity:1;transform:translate(-50%,-50%) scale(1)}}
@keyframes hermes-boot-turn{from{transform:rotate(0deg)}to{transform:rotate(45deg)}}
@keyframes hermes-boot-write-h{0%{opacity:0;clip-path:inset(0 100% 0 0);filter:blur(4px)}12%{opacity:.92}100%{opacity:.92;clip-path:inset(0 0 0 0);filter:blur(0)}}
@keyframes hermes-boot-write-v{0%{opacity:0;clip-path:inset(0 0 100% 0);filter:blur(4px)}12%{opacity:.92}100%{opacity:.92;clip-path:inset(0 0 0 0);filter:blur(0)}}
@keyframes hermes-boot-hint-in{from{opacity:0;transform:translateY(4px)}to{opacity:.55;transform:translateY(0)}}
@keyframes hermes-send-plate{0%{opacity:0;transform:translateY(10px) scale(.82)}16%{opacity:.95;transform:translateY(0) scale(.97)}60%{opacity:.82;transform:translateY(-2px) scale(1.01)}100%{opacity:0;transform:translateY(-18px) scale(1.06)}}
@keyframes hermes-send-turn{from{transform:rotate(0deg)}to{transform:rotate(150deg)}}
@keyframes hermes-send-glow{0%{opacity:.12}28%{opacity:.42}100%{opacity:0}}
@keyframes hermes-send-fade{0%{opacity:0}22%,62%{opacity:.9}100%{opacity:0}}
@keyframes hermes-fortune-in{from{opacity:0}to{opacity:1}}
@keyframes hermes-fortune-rise{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion: reduce){.hermes-ambient-orb,.hermes-ambient-star,.hermes-bagua-ring,.hermes-bagua-glow{animation:none!important}.hermes-boot-core,.hermes-boot-line,.hermes-boot-hint{animation:none!important;filter:none!important;clip-path:none!important;opacity:1!important}.hermes-boot-core{transform:translate(-50%,-50%)!important}.hermes-boot-hint{opacity:.55!important}.hermes-send-plate{animation:hermes-send-fade 900ms ease both}.hermes-fortune,.hermes-fortune-card{animation:none!important}}
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

    /** Background-center inscription: 天行健 / 地势坤, drawn into the ambient artwork. */
    function Inscription() {
      return h(
        'div',
        { className: 'hermes-inscription' },
        h('span', { className: 'hermes-inscription-line' }, '天行健，君子以自强不息'),
        h('span', { className: 'hermes-inscription-line' }, '地势坤，君子以厚德载物'),
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
        { className: 'hermes-fortune-trigram', width: 46, height: 26, viewBox: '0 0 46 26', fill: 'none', 'aria-hidden': 'true' },
        trigramLines(23, 4, 32, 2.6, 7, pattern),
      )
    }

    /** The 「占卜」 chip beside the sidebar wordmark. */
    function FortuneTrigger() {
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
          title: '今日运势',
          'aria-label': '今日运势',
          onClick: open,
          onKeyDown,
          onPointerDown: (event) => event.stopPropagation(),
        },
        '占卜',
      )
    }

    /** Frame-level divination card: today's grade, lot poem, and 宜/忌. */
    function FortunePanel() {
      const [reading, setReading] = React.useState(null)

      React.useEffect(() => {
        const opener = () => setReading(fortuneOfDay())
        fortuneOpeners.add(opener)
        return () => {
          fortuneOpeners.delete(opener)
        }
      }, [])

      React.useEffect(() => {
        if (reading === null) return undefined
        const onKey = (event) => {
          if (event.key === 'Escape') setReading(null)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
      }, [reading])

      if (reading === null) return null
      const close = () => setReading(null)
      const keepOpen = (event) => event.stopPropagation()

      return h(
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
            onPointerDown: keepOpen,
          },
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
          h('p', { className: 'hermes-fortune-read' }, reading.read),
          h(
            'div',
            { className: 'hermes-fortune-tags' },
            h('span', { className: 'hermes-fortune-tag hermes-fortune-tag--good' }, '宜 ' + reading.good),
            h('span', { className: 'hermes-fortune-tag hermes-fortune-tag--bad' }, '忌 ' + reading.bad),
          ),
          h(
            'div',
            { className: 'hermes-fortune-foot' },
            h('span', { className: 'hermes-fortune-note' }, '每日一签 · 图个心安'),
            h('button', { type: 'button', className: 'hermes-fortune-close', onClick: close }, '收下'),
          ),
        ),
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
          'svg',
          { className: 'hermes-ambient-orb', viewBox: '0 0 600 600', fill: 'none', preserveAspectRatio: 'xMidYMid slice' },
          h(
            'g',
            null,
            h('circle', { cx: 300, cy: 300, r: 286, style: { stroke: 'currentColor' }, strokeWidth: 1.4, opacity: 0.6 }),
            h('circle', {
              cx: 300,
              cy: 300,
              r: 252,
              style: { stroke: 'currentColor' },
              strokeWidth: 1,
              opacity: 0.4,
              strokeDasharray: '1 7',
            }),
            h('circle', { cx: 300, cy: 300, r: 186, style: { stroke: 'currentColor' }, strokeWidth: 0.9, opacity: 0.35 }),
            h('circle', { cx: 300, cy: 300, r: 120, style: { stroke: 'currentColor' }, strokeWidth: 0.8, opacity: 0.3 }),
            TRIGRAMS.map((pattern, index) =>
              h(
                'g',
                { key: 'orb-trigram-' + index, transform: 'rotate(' + index * 45 + ' 300 300)' },
                trigramLines(300, 34, 30, 2.2, 4.4, pattern),
              ),
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
          style: { fill: 'var(--hermes-gold, #B08A46)', opacity: 0.1 },
        }),
        h(
          'g',
          { className: 'hermes-bagua-ring', style: { color: 'var(--hermes-gold, #B08A46)' } },
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
          BAGUA_TRIGRAMS.map((pattern, index) =>
            h(
              'g',
              { key: 'bagua-trigram-' + index, transform: 'rotate(' + index * 45 + ' 100 100)' },
              trigramLines(100, 13.1, 23, 2.2, 5.8, pattern),
            ),
          ),
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
        h('circle', { cx: 100, cy: 100, r: 59, style: { stroke: 'var(--hermes-gold, #B08A46)' }, strokeWidth: 0.5, opacity: 0.45 }),
        h('circle', { cx: 100, cy: 100, r: 57, style: { fill: 'var(--hermes-ink, #3A3342)' } }),
        h('path', {
          d: 'M100 43a57 57 0 0 1 0 114a28.5 28.5 0 0 1 0-57a28.5 28.5 0 0 0 0-57Z',
          style: { fill: 'var(--hermes-paper, #FDFAF4)' },
        }),
        h('circle', { cx: 100, cy: 71.5, r: 9.2, style: { fill: 'var(--hermes-ink, #3A3342)' } }),
        h('circle', { cx: 100, cy: 128.5, r: 9.2, style: { fill: 'var(--hermes-paper, #FDFAF4)' } }),
        h('circle', { cx: 100, cy: 100, r: 2, style: { fill: 'var(--hermes-gold, #B08A46)' } }),
      )
    }

    /** The five-second boot curtain: bagua plate in the middle, one brush line on each side. */
    function BootCurtain() {
      // 同一份文档（含 client-hmr 热替换）只放一次；刷新页面才重新开场。
      const [phase, setPhase] = React.useState(() => {
        if (bootSeen) return 'gone'
        try {
          const doc = String(Math.round(performance.timeOrigin))
          if (window.sessionStorage.getItem('hermes-boot') === doc) return 'gone'
          window.sessionStorage.setItem('hermes-boot', doc)
        } catch (error) {
          // 没有 sessionStorage 时退回模块级标记。
        }
        return 'on'
      })

      React.useEffect(() => {
        if (bootSeen) return undefined
        bootSeen = true
        const leave = setTimeout(() => setPhase('leaving'), BOOT_MS - BOOT_FADE_MS)
        const done = setTimeout(() => setPhase('gone'), BOOT_MS)
        return () => {
          clearTimeout(leave)
          clearTimeout(done)
        }
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

      return h(
        'div',
        {
          className: 'hermes-boot' + (phase === 'leaving' ? ' hermes-boot--out' : ''),
          role: 'presentation',
          'aria-hidden': 'true',
          onPointerDown: skip,
        },
        h('div', { className: 'hermes-boot-frame' }),
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
      ctx.slots.inject('conversation.composer.dock', () => [
        ctx.slots.register({ name: 'conversation.composer.dock', id: 'hermes-motto', order: 20 }, Motto),
        ctx.slots.register({ name: 'conversation.composer.dock', id: 'hermes-send-taiji', order: 21 }, SendTaijiTrigger),
      ])
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
