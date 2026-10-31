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
      '--dsw-alias-label-primary': { light: '#383344', dark: '#EFE9F1' },
      '--dsw-alias-label-secondary': { light: '#766D7C', dark: '#B7ACC0' },
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
      '--dsw-alias-brand-primary': { light: '#383344', dark: '#E9DCC0' },
      '--dsw-alias-brand-primary-invert': { light: '#FFFCF6', dark: '#1A1620' },
      '--dsw-alias-brand-text': { light: '#383344', dark: '#E9DCC0' },
      '--dsw-alias-button-contrast-fill': { light: '#383344', dark: '#E9DCC0' },
      '--dsw-alias-button-elevated-fill': { light: '#FDFAF4', dark: '#2A2433' },
      '--dsw-alias-button-floating-fill': { light: '#FDFAF4', dark: '#241F2D' },
      '--dsw-alias-button-floating-hover': { light: '#F3ECE0', dark: '#302938' },
      '--dsw-alias-button-ghost-active-border': { light: '#B58A43', dark: '#D9BE86' },
      '--dsw-alias-button-ghost-active-fill': { light: '#E9D7B4', dark: '#463721' },
      '--dsw-alias-button-ghost-active-hover': { light: '#EBE0CF', dark: '#3A3247' },
      '--dsw-alias-button-primary-dimmed': { light: '#EDE4D4', dark: '#3A3247' },
      '--dsw-alias-button-primary-hover': { light: '#544A5E', dark: '#F4EBDD' },
      /* 曜金 send button; deep enough for the white glyph */
      '--dsw-alias-button-info-fill': { light: '#8F6C2C', dark: '#A2762E' },
      '--dsw-alias-button-info-hover': { light: '#A9823A', dark: '#B58A43' },

      /* hover / selection washes */
      '--dsw-alias-interactive-bg-hover': { light: '#3833440F', dark: '#EFE9F114' },
      '--dsw-alias-interactive-bg-active': { light: '#38334424', dark: '#EFE9F124' },
      '--dsw-alias-interactive-bg-hover-solid': { light: '#F0E8DB', dark: '#302938' },
      '--dsw-alias-interactive-bg-hover-accent': { light: '#B58A4326', dark: '#D9BE8629' },
      '--dsw-alias-interactive-bg-hover-danger': { light: '#A64B3C14', dark: '#D98B7C1F' },

      '--dsw-alias-menu-icon': { light: '#766D7C', dark: '#B7ACC0' },
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
      '--dsw-alias-state-error-primary': { light: '#A64B3C', dark: '#D98B7C' },
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
      '--dsw-alias-toast-bg': { light: '#383344', dark: '#2C2536' },
      '--dsw-alias-toast-label': { light: '#FFFCF6', dark: '#F2EBF5' },
      '--dsw-alias-tooltip-bg': { light: '#383344', dark: '#2C2536' },
      '--dsw-alias-tooltip-key-bg': { light: '#5A5163', dark: '#453C52' },

      /* named surfaces */
      '--dsw-specific-bubble': { light: '#F0E7D8', dark: '#2A2433' },
      '--dsw-specific-bubble-highlight': { light: '#E7D9C4', dark: '#3A3247' },
      '--dsw-specific-input-major': { light: '#FDFAF4', dark: '#241F2D' },
      '--dsw-specific-login-input': { light: '#FBF7F0', dark: '#1A1620' },
      '--dsw-specific-menu': { light: '#FBF7F0F0', dark: '#262030F0' },
      '--dsw-specific-selector': { light: '#F1E9DC', dark: '#2A2433' },
      '--dsw-specific-sidebar-fill': { light: '#F3EDE2', dark: '#100D14' },
      '--dsw-specific-sidebar-nav-item-active': { light: '#E6D5B2', dark: '#423522' },
      '--dsw-specific-sidebar-nav-item-active-accent': { light: '#F0E2C6', dark: '#382D20' },
      '--dsw-specific-sidebar-nav-item-hover': { light: '#EFE7DA', dark: '#221C2A' },
      '--dsw-specific-tip': { light: '#F0E8DB', dark: '#241F2D' },
      '--dsw-alias-menu-group-header-fill': { light: '#F8F3EAF2', dark: '#201A28F0' },

      /* diffs stay legible, just warmed */
      '--dsw-alias-code-diff-added': { light: '#5275571F', dark: '#86B08A1F' },
      '--dsw-alias-code-diff-deleted': { light: '#A64B3C1F', dark: '#D98B7C1F' },

      /* muted ink syntax palette for fenced code */
      '--shiki-token-constant': { light: '#7A5C2E', dark: '#D9BE86' },
      '--shiki-token-string': { light: '#527557', dark: '#9CC29C' },
      '--shiki-token-comment': { light: '#8B8291', dark: '#7C7188' },
      '--shiki-token-keyword': { light: '#9C4A5E', dark: '#E3A0B2' },
      '--shiki-token-parameter': { light: '#A05E2E', dark: '#E3B87A' },
      '--shiki-token-function': { light: '#6F5E8A', dark: '#C0A9DD' },
      '--shiki-token-string-expression': { light: '#4F7355', dark: '#9CC29C' },
      '--shiki-token-punctuation': { light: '#766D7C', dark: '#B7ACC0' },
      '--shiki-token-link': { light: '#72618C', dark: '#C0A9DD' },

      /* skin-only tokens consumed by the artwork */
      '--hermes-ink': { light: '#383344', dark: '#EFE6F2' },
      '--hermes-paper': { light: '#FDFAF4', dark: '#1C1822' },
      '--hermes-gold': { light: '#B58A43', dark: '#D9BE86' },
      '--hermes-violet': { light: '#8E7FA8', dark: '#C0A9DD' },
      '--qiankun-landscape-filter': { light: 'none', dark: 'brightness(.48) saturate(.45)' },
      '--hermes-art': { light: '#766D7C', dark: '#B7ACC0' },
      /* faint ink for the left-hand background inscription */
      '--hermes-inscription': { light: '#38334426', dark: '#EFE6F22E' },
    }

    const CSS = `
.hermes-brand-lockup{display:inline-flex;flex-direction:column;justify-content:center;gap:0;min-width:0;line-height:1;overflow:hidden}
.hermes-brand-zh{font-family:${SERIF};font-size:17px;font-weight:500;line-height:17px;letter-spacing:.12em;color:var(--dsw-alias-label-primary);white-space:nowrap}
.hermes-brand-en{font-size:6.5px;font-weight:500;line-height:7px;letter-spacing:.34em;color:var(--hermes-gold);opacity:.95;white-space:nowrap;transform:translateX(.08em)}
.hermes-brand-row{display:inline-flex;align-items:center;gap:10px;min-width:0}
/* 占卜钮：一枚袖珍令牌——上圆下平、双金线框、顶部穿绳孔，占/卜 二字竖刻。
   侧栏品牌行只有 24px 高（官方 .brandName 固定 24px、外层 .brand overflow:hidden），
   所以令牌必须严格收在 24px 内，不能再高。 */
.hermes-fortune-trigger{position:relative;display:inline-flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;flex:none;box-sizing:border-box;width:17px;height:24px;padding:4px 0 1px;border:1px solid var(--hermes-gold);border-radius:6px 6px 2px 2px;background:var(--dsw-alias-bg-layer-1);background:linear-gradient(180deg,color-mix(in srgb,var(--hermes-gold) 24%,var(--dsw-alias-bg-layer-1)),var(--dsw-alias-bg-layer-1) 46%,var(--dsw-alias-bg-layer-2));color:var(--hermes-gold);font-family:${SERIF};font-size:8px;font-weight:500;line-height:1;letter-spacing:0;white-space:nowrap;cursor:pointer;user-select:none;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--hermes-gold) 26%,transparent),inset 0 -2px 4px color-mix(in srgb,var(--hermes-gold) 16%,transparent),0 1px 2px rgba(20,17,24,.14);transition:color .18s ease,transform .18s ease,box-shadow .18s ease}
.hermes-fortune-trigger::before{content:"";position:absolute;top:2.4px;left:50%;width:2px;height:2px;margin-left:-1px;border-radius:50%;background:color-mix(in srgb,var(--dsw-alias-bg-base) 70%,var(--hermes-gold));box-shadow:0 0 0 .6px color-mix(in srgb,var(--hermes-gold) 55%,transparent)}
.hermes-fortune-trigger-glyph{display:block;font-size:8px;line-height:8px}
.hermes-fortune-trigger:hover{color:var(--dsw-alias-label-primary);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--hermes-gold) 42%,transparent),0 0 10px color-mix(in srgb,var(--hermes-gold) 28%,transparent),0 2px 4px rgba(20,17,24,.16)}
.hermes-fortune-trigger:focus-visible{outline:2px solid var(--hermes-gold);outline-offset:2px}
.hermes-motto{display:inline-flex;align-items:center;gap:7px;color:var(--hermes-art);font-size:11px;line-height:16px;letter-spacing:.18em;opacity:.9;white-space:nowrap;user-select:none}
.hermes-motto-star{color:var(--hermes-gold);font-size:10px;line-height:1;opacity:.95}
/* 背景题字：偏左，两列；每列拆上句/下句，左列再落低一截与右列错开。 */
.hermes-inscription{position:absolute;top:46%;left:clamp(300px,24vw,500px);transform:translateY(-50%);display:flex;flex-direction:row-reverse;align-items:flex-start;gap:.72em;color:var(--hermes-inscription);font-family:${BRUSH};font-weight:400;white-space:nowrap;user-select:none;pointer-events:none}
.hermes-inscription-col{display:flex;flex-direction:column;align-items:flex-start;gap:.85em}
.hermes-inscription-col--stagger{margin-top:4.2em}
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
.hermes-boot{position:fixed;inset:0;z-index:9000;overflow:hidden;pointer-events:auto;cursor:default;user-select:none;color:var(--hermes-ink,#383344);background:radial-gradient(120% 82% at 50% 44%,rgba(176,138,70,.13),transparent 58%),radial-gradient(90% 62% at 50% 108%,rgba(114,97,140,.10),transparent 62%),var(--dsw-alias-bg-base,#F8F5EE);animation:hermes-boot-in 420ms ease both}
.hermes-boot--out{animation:hermes-boot-out 600ms cubic-bezier(.4,0,.6,1) both}
.hermes-boot-frame{position:absolute;inset:clamp(14px,2.4vh,28px);border:1px solid var(--hermes-gold,#B58A43);opacity:.2;pointer-events:none}
.hermes-boot-line{position:absolute;margin:0;padding:.35em 0;font-family:${BRUSH};font-weight:400;line-height:1.18;color:var(--hermes-ink,#383344);white-space:nowrap;text-shadow:0 0 20px rgba(176,138,70,.18);animation:hermes-boot-write-h 1100ms cubic-bezier(.22,.61,.36,1) both}
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
/* ——— 收下：一纸符咒落下来、飞向右下，落成一枚今日卦象签 ——— */
.hermes-talisman{position:fixed;inset:0;z-index:8700;display:flex;align-items:center;justify-content:center;overflow:hidden;pointer-events:none;user-select:none}
.hermes-talisman-sheet{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;width:116px;padding:15px 12px 13px;box-sizing:border-box;background:linear-gradient(180deg,#F8ECC9 0%,#F3E2B8 52%,#EED9A5 100%);color:#A64B3C;border:1px solid rgba(176,138,70,.6);border-radius:2px;box-shadow:0 20px 54px rgba(20,17,24,.3),inset 0 0 0 3px rgba(255,252,246,.55),inset 0 0 26px rgba(176,138,70,.18);font-family:${SERIF};animation:hermes-talisman-cast 1700ms cubic-bezier(.22,.7,.28,1) both}
.hermes-talisman-sheet::before,.hermes-talisman-sheet::after{content:"";position:absolute;left:6px;right:6px;height:1px;background:rgba(166,71,61,.28)}
.hermes-talisman-sheet::before{top:8px}
.hermes-talisman-sheet::after{bottom:8px}
.hermes-talisman-command{font-size:13px;line-height:1;letter-spacing:.22em;text-indent:.22em;color:#A64B3C;opacity:.92}
.hermes-talisman-rune{display:block;width:56px;height:70px;color:#A64B3C;opacity:.92}
.hermes-talisman-hex{display:block;width:50px;height:58px;color:#A64B3C}
.hermes-talisman-seal{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;margin-top:1px;background:#A64B3C;color:#F8ECC9;font-family:${SERIF};font-size:16px;line-height:1;box-shadow:inset 0 0 0 2px rgba(248,236,201,.35)}
/* 右下角落定的卦象签：一直留到点 × 收起或刷新 */
.hermes-hexagram{position:fixed;right:22px;bottom:24px;z-index:8400;display:flex;flex-direction:column;align-items:center;gap:9px;width:102px;padding:13px 10px 11px;box-sizing:border-box;background:linear-gradient(180deg,var(--dsw-alias-bg-layer-1),var(--dsw-alias-bg-layer-2));color:var(--dsw-alias-label-primary);font-family:${SERIF};border:1px solid color-mix(in srgb,var(--hermes-gold) 52%,var(--dsw-alias-border-l1));border-radius:12px;box-shadow:0 16px 40px rgba(20,17,24,.18);pointer-events:none;animation:hermes-hexagram-in 720ms cubic-bezier(.2,.8,.3,1) 1020ms both}
.hermes-hexagram::before{content:"";position:absolute;top:6px;left:50%;width:2.6px;height:2.6px;margin-left:-1.3px;border-radius:50%;background:var(--hermes-gold);opacity:.55}
.hermes-hexagram-head{font-size:9px;letter-spacing:.24em;text-indent:.24em;color:var(--hermes-gold)}
.hermes-hexagram-glyph{display:block;color:var(--hermes-gold)}
.hermes-hexagram-name{font-size:13px;letter-spacing:.14em;text-indent:.14em;line-height:1.2}
.hermes-hexagram-grade{font-size:9px;letter-spacing:.16em;color:var(--dsw-alias-label-tertiary)}
.hermes-hexagram-close{position:absolute;top:3px;right:4px;display:flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;border:none;background:transparent;color:var(--dsw-alias-label-caption);font:inherit;font-size:12px;line-height:1;cursor:pointer;opacity:.3;pointer-events:auto;transition:opacity .15s ease,color .15s ease}
.hermes-hexagram:hover .hermes-hexagram-close{opacity:.6}
.hermes-hexagram-close:hover{color:var(--dsw-alias-label-primary);opacity:1}
.hermes-boot-hint{position:absolute;right:clamp(20px,3vw,46px);bottom:clamp(14px,2.2vh,30px);font-size:11px;line-height:1.4;letter-spacing:.2em;color:var(--hermes-art,#766D7C);opacity:0;animation:hermes-boot-hint-in 700ms ease 2400ms both}
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
@keyframes hermes-talisman-cast{0%{opacity:0;transform:translate3d(0,-26px,0) rotate(-7deg) scale(.72)}12%{opacity:1;transform:translate3d(0,0,0) rotate(2.2deg) scale(1.02)}24%{transform:translate3d(0,0,0) rotate(-.8deg) scale(1)}58%{opacity:1;transform:translate3d(0,0,0) rotate(0) scale(1)}100%{opacity:0;transform:translate3d(36vw,30vh,0) rotate(9deg) scale(.32)}}
@keyframes hermes-talisman-fade{0%{opacity:0}18%,72%{opacity:1}100%{opacity:0}}
@keyframes hermes-hexagram-in{from{opacity:0;transform:translate3d(10px,10px,0) scale(.94)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion: reduce){.hermes-ambient-orb,.hermes-ambient-star,.hermes-bagua-ring,.hermes-bagua-glow{animation:none!important}.hermes-boot-core,.hermes-boot-line,.hermes-boot-hint{animation:none!important;filter:none!important;clip-path:none!important;opacity:1!important}.hermes-boot-core{transform:translate(-50%,-50%)!important}.hermes-boot-hint{opacity:.55!important}.hermes-send-plate{animation:hermes-send-fade 900ms ease both}.hermes-fortune,.hermes-fortune-card{animation:none!important}.hermes-talisman-sheet{animation:hermes-talisman-fade 700ms ease both}.hermes-hexagram{animation:none!important;opacity:1!important}}
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
        h(QiankunDailyGood),
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
        { className: 'hermes-fortune-trigram', width: 46, height: 26, viewBox: '0 0 46 26', fill: 'none', 'aria-hidden': 'true' },
        trigramLines(23, 4, 32, 2.6, 7, pattern),
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
      )
    }

    /** The 「占卜」 token tablet beside the sidebar wordmark: two glyphs, carved vertically. */
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
    function BaguaPlate({ compact = false } = {}) {
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
              { key: 'bagua-trigram-' + index, transform: 'rotate(' + index * 45 + ' 100 100)', style: { '--q-trigram-index': index } },
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
        h('g', { transform: compact ? 'translate(60 60) scale(.4)' : undefined },
        h('g', { className: 'hermes-taiji-flow' },
        h('circle', { cx: 100, cy: 100, r: 59, style: { stroke: 'var(--hermes-gold, #B58A43)' }, strokeWidth: 0.5, opacity: 0.45 }),
        h('circle', { cx: 100, cy: 100, r: 57, style: { fill: 'var(--hermes-ink, #383344)' } }),
        h('path', {
          d: 'M100 43a57 57 0 0 1 0 114a28.5 28.5 0 0 1 0-57a28.5 28.5 0 0 0 0-57Z',
          style: { fill: 'var(--hermes-paper, #FDFAF4)' },
        }),
        h('circle', { cx: 100, cy: 71.5, r: 9.2, style: { fill: 'var(--hermes-paper, #FDFAF4)' } }),
        h('circle', { cx: 100, cy: 128.5, r: 9.2, style: { fill: 'var(--hermes-ink, #383344)' } }),
        h('circle', { cx: 100, cy: 100, r: 2, style: { fill: 'var(--hermes-gold, #B58A43)' } }))),
      )
    }

    /** The five-second boot curtain: bagua plate in the middle, one brush line on each side. */
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

const QIANKUN_ART = "data:image/webp;base64,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";
const QIANKUN_CSS = "/* 乾坤问道 V2. Semantic surfaces stay owned by the DSH theme service. */\n[data-qiankun]{--q-border:color-mix(in srgb,var(--hermes-gold) 48%,transparent);--q-shadow:0 12px 40px #38334410;--q-art:.2;--q-orb:.12;--q-speed:60s}\n[data-qiankun] button{font-family:inherit}\n[data-qiankun] [data-composer-card]{border:1px solid var(--q-border);box-shadow:var(--q-shadow);transition:border-color .6s,box-shadow .6s;background:color-mix(in srgb,var(--hermes-paper) 96%,transparent)}\n[data-qiankun] [data-slot=\"sidebar.nav.item\"][aria-current=page]{background:var(--dsw-specific-sidebar-nav-item-active);color:var(--hermes-ink)}\n.qiankun-ambient{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;user-select:none}\n.qiankun-landscape,.qiankun-mist{position:absolute;inset:0;pointer-events:none}\n.qiankun-landscape{background-position:center bottom;background-repeat:no-repeat;background-size:cover;opacity:var(--q-art);filter:var(--qiankun-landscape-filter);mask-image:linear-gradient(transparent 10%,#000 70%);transition:opacity 1.4s ease}\n.qiankun-mist{background:linear-gradient(transparent 65%,color-mix(in srgb,var(--hermes-paper) 22%,transparent) 85%,transparent);opacity:0;transition:opacity 1.2s}\n.qiankun-orb,.qiankun-orb-echo{position:absolute;right:2vw;top:4vh;width:min(390px,29vw,44vh);aspect-ratio:1;opacity:var(--q-orb);color:var(--hermes-gold);transition:opacity 1.2s,filter 1.2s}\n.qiankun-orb .hermes-bagua-ring{transform-origin:100px 100px;animation:hermes-spin var(--q-speed) linear infinite;animation-play-state:paused}\n.qiankun-orb-echo{opacity:0;transform:scale(1.13);filter:blur(.3px)}\n.qiankun-orb-echo .hermes-bagua-ring{transform-origin:100px 100px;animation:hermes-spin 100s linear infinite reverse;animation-play-state:paused}\n.qiankun-ambient .hermes-inscription{left:clamp(270px,25vw,410px);top:42%;opacity:.45;font-size:clamp(18px,3.3vh,32px)}\n.qiankun-ambient .hermes-inscription-line{font-size:clamp(18px,3.3vh,32px)}\n.qiankun-mote{position:absolute;width:2px;height:2px;border-radius:50%;background:var(--hermes-gold);opacity:.1;animation:q-mote 8s ease-in-out infinite;animation-play-state:paused}\n[data-qiankun-mode=balanced]{--q-art:.3;--q-orb:.18;--q-speed:70s}\n[data-qiankun-mode=immersive]{--q-art:.36;--q-orb:.21;--q-speed:45s}\n[data-qiankun-state=thinking][data-qiankun-motion=on] [data-composer-card]{animation:q-input-breathe 4s ease-in-out infinite}\n[data-qiankun-state=thinking][data-qiankun-mode=balanced][data-qiankun-motion=on] .qiankun-orb .hermes-bagua-ring,\n[data-qiankun-state=thinking][data-qiankun-mode=immersive][data-qiankun-motion=on] .qiankun-orb .hermes-bagua-ring,\n[data-qiankun-state=thinking][data-qiankun-mode=immersive][data-qiankun-motion=on] .qiankun-orb-echo .hermes-bagua-ring{animation-play-state:running}\n[data-qiankun-state=thinking][data-qiankun-mode=balanced] .qiankun-orb{opacity:.25;filter:drop-shadow(0 0 8px color-mix(in srgb,var(--hermes-gold) 22%,transparent))}\n[data-qiankun-state=thinking][data-qiankun-mode=immersive] .qiankun-orb{opacity:.34;filter:drop-shadow(0 0 18px color-mix(in srgb,var(--hermes-gold) 35%,transparent))}\n[data-qiankun-state=thinking][data-qiankun-mode=immersive] .qiankun-orb-echo{opacity:.08}\n[data-qiankun-state=thinking][data-qiankun-mode=immersive] .qiankun-mist{opacity:.7}\n[data-qiankun-state=thinking][data-qiankun-mode=immersive][data-qiankun-motion=on] .qiankun-mote{animation-play-state:running}\n[data-qiankun-state=thinking][data-qiankun-mode=immersive][data-qiankun-motion=on] [data-composer-card]{animation:q-input-breathe 3s ease-in-out infinite;border-color:var(--hermes-gold)}\n[data-qiankun-content=yes]{--q-art:.1;--q-orb:.07}\n[data-qiankun-content=yes] .qiankun-ambient .hermes-inscription{opacity:.2}\n[data-qiankun-state=output] .qiankun-orb,[data-qiankun-state=tools] .qiankun-orb{opacity:.07;filter:none}\n[data-qiankun-state=output] .qiankun-landscape{opacity:.1}\n[data-qiankun-fortune=off] .hermes-fortune-trigger{display:none}\n.qiankun-trigger,.qiankun-action{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:30px;padding:5px 12px;box-sizing:border-box;border:1px solid var(--q-border);border-radius:99px;background:transparent;color:var(--hermes-ink);font:12px/1.4 system-ui;cursor:pointer;white-space:nowrap}\n.qiankun-trigger-mark{display:flex;align-items:center}\n.qiankun-trigger:hover,.qiankun-action:hover{background:color-mix(in srgb,var(--hermes-gold) 9%,transparent)}\n.qiankun-trigger:focus-visible,.qiankun-action:focus-visible,.qiankun-dismiss:focus-visible,.qiankun-stored button:focus-visible,.qiankun-mode:focus-visible{outline:2px solid var(--hermes-gold);outline-offset:3px}\n.qiankun-action:disabled,.qiankun-mode:disabled{opacity:.5;cursor:wait}\n.qiankun-action--primary{background:var(--hermes-ink);color:var(--hermes-paper);border-color:var(--hermes-ink)}\n.qiankun-action--primary:hover{background:var(--dsw-alias-button-primary-hover)}\n.qiankun-status{display:inline-flex;gap:8px;align-items:center;font:11px/1.5 system-ui;color:var(--hermes-art);letter-spacing:.1em;padding:2px 0;max-width:100%}\n.qiankun-status-dot{width:3px;height:3px;background:var(--hermes-gold);border-radius:50%}\n.qiankun-dialog-backdrop{position:fixed;inset:0;display:flex;justify-content:center;align-items:center;padding:20px;background:#14111845;backdrop-filter:blur(6px);z-index:8800;color:var(--hermes-ink)}\n.qiankun-settings{width:min(620px,100%);max-height:calc(100dvh - 40px);overflow:auto;border:1px solid var(--q-border);border-radius:18px;background:var(--hermes-paper);padding:28px;box-shadow:0 24px 80px #14111833}\n.qiankun-settings-head{display:flex;align-items:flex-start;gap:16px;justify-content:space-between}\n.qiankun-settings small{font:10px/1.6 system-ui;letter-spacing:.1em;color:var(--hermes-gold)}\n.qiankun-settings h2{font:24px/1.5 \"Songti SC\",\"STSong\",\"SimSun\",serif;font-weight:400;letter-spacing:.08em;margin:8px 0 24px}\n.qiankun-dismiss{flex:none;display:grid;place-items:center;width:30px;height:30px;background:transparent;color:var(--hermes-art);border:1px solid var(--dsw-alias-border-l1);border-radius:50%;font:20px/1 system-ui;cursor:pointer}\n.qiankun-modes{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}\n.qiankun-mode{display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:16px 12px;background:transparent;border:1px solid var(--dsw-alias-border-l1);color:var(--hermes-ink);border-radius:10px;cursor:pointer;text-align:left}\n.qiankun-mode strong{font:15px/1.5 system-ui;font-weight:500}\n.qiankun-mode>span{font:11px/1.6 system-ui;color:var(--hermes-art)}\n.qiankun-mode small{font-size:10px;letter-spacing:0}\n.qiankun-mode[aria-pressed=true]{border-color:var(--hermes-gold);background:color-mix(in srgb,var(--hermes-gold) 8%,transparent)}\n.qiankun-setting-note{font:11px/1.8 system-ui;color:var(--hermes-art);margin:15px 0}\n.qiankun-options{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:20px 0;border-top:1px solid var(--dsw-alias-border-l1);font:12px/1.5 system-ui}\n.qiankun-options label{display:flex;align-items:center;gap:8px;cursor:pointer}\n.qiankun-options input{accent-color:var(--hermes-gold);width:15px;height:15px;margin:0}\n.qiankun-settings-foot{display:flex;justify-content:space-between;gap:12px;padding-top:10px}\n.qiankun-error{color:var(--dsw-alias-state-error-primary);font:12px/1.6 system-ui}\n/* Daily reading: generous paper surface, real Chinese text, scroll on short windows. */\n.qiankun-fortune{background:#14111838;backdrop-filter:blur(5px);padding:24px}\n.qiankun-reading{position:relative;isolation:isolate;overflow:auto;box-sizing:border-box;max-height:calc(100dvh - 48px);width:min(720px,100%);border:1px solid var(--hermes-gold);border-radius:22px;background:var(--hermes-paper);color:var(--hermes-ink);padding:26px 36px;box-shadow:0 24px 80px #14111838;font-family:\"Songti SC\",\"STSong\",\"SimSun\",serif;animation:q-reading-in .35s ease both}\n.qiankun-reading-art{position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.15;background-position:center;background-size:cover;filter:var(--qiankun-landscape-filter)}\n.qiankun-reading-head{display:flex;align-items:center;gap:12px;justify-content:space-between;border-bottom:1px solid var(--q-border);padding:0 0 15px;font:12px/1.5 system-ui}\n.qiankun-reading-head>span{color:var(--hermes-gold);letter-spacing:.2em;font-family:inherit;font-size:15px}\n.qiankun-reading-head time{color:var(--hermes-art);margin-left:auto;font-size:11px;letter-spacing:.04em}\n.qiankun-reading-core{display:flex;align-items:center;flex-direction:column;gap:10px;padding:28px 0 18px}\n.qiankun-reading-core h2{font:36px/1.4 \"Songti SC\",\"STSong\",\"SimSun\",serif;font-weight:500;margin:0;letter-spacing:.16em;text-indent:.16em}\n.qiankun-reading-core .hermes-fortune-trigram{width:64px;height:36px}\n.qiankun-reading-core .hermes-fortune-grade{padding:4px 18px;font-size:13px;color:var(--hermes-gold);border-color:var(--q-border)}\n.qiankun-poem{text-align:center;padding:12px 0 20px}\n.qiankun-poem p{margin:0;font:clamp(20px,2.6vw,30px)/1.9 \"Songti SC\",\"STSong\",\"SimSun\",serif;letter-spacing:.12em}\n.qiankun-interpretation{text-align:center;font:16px/1.9 \"Songti SC\",\"STSong\",\"SimSun\",serif;letter-spacing:.06em;color:var(--dsw-alias-label-secondary);margin:0 0 20px}\n.qiankun-tags{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:24px}\n.qiankun-tags>span{display:flex;align-items:center;gap:10px;padding:7px 18px;border:1px solid var(--q-border);border-radius:999px;font-size:14px;color:var(--hermes-gold)}\n.qiankun-tags>span+span{color:var(--dsw-alias-label-deep-diving);border-color:color-mix(in srgb,var(--hermes-violet) 50%,transparent)}\n.qiankun-tags b{font-weight:400;padding-right:10px;border-right:1px solid currentColor}\n.qiankun-reading-foot{display:flex;justify-content:space-between;align-items:center;gap:15px;padding:16px 0 0;border-top:1px solid var(--q-border);font:12px/1.5 system-ui;color:var(--hermes-art)}\n.qiankun-reading-foot .qiankun-action{min-height:36px;min-width:88px;font:16px/1.4 \"Songti SC\",\"STSong\",\"SimSun\",serif;color:var(--hermes-gold)}\n.qiankun-reading--slip{width:min(420px,100%);padding:22px}\n.qiankun-slip-stage{display:flex;flex-direction:column;align-items:center;padding:28px 0 20px;gap:20px;overflow:hidden}\n.qiankun-slip{width:120px;height:260px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;background:color-mix(in srgb,var(--hermes-gold) 8%,var(--hermes-paper));border:1px solid var(--hermes-gold);outline:1px solid var(--q-border);outline-offset:-7px;border-radius:9px 9px 2px 2px;box-shadow:0 12px 40px #38334416;animation:q-slip-in .9s cubic-bezier(.22,.7,.28,1) both}\n.qiankun-slip .hermes-hexagram-glyph{color:var(--hermes-gold)}\n.qiankun-slip strong{font:32px/1.4 \"Songti SC\",\"SimSun\",serif}\n.qiankun-slip span{color:var(--hermes-gold);font:13px/1.5 system-ui;letter-spacing:.2em}\n.qiankun-slip-stage p{font:12px/1.7 system-ui;color:var(--hermes-art);margin:0}\n.qiankun-stored{position:fixed;z-index:8400;right:22px;bottom:22px;width:112px;box-sizing:border-box;border:1px solid var(--q-border);background:var(--hermes-paper);border-radius:12px;box-shadow:0 10px 30px #38334413;animation:q-reading-in .6s ease both}\n.qiankun-stored-open{display:flex;flex-direction:column;align-items:center;gap:9px;width:100%;padding:17px 12px 13px;border:0;background:none;cursor:pointer;color:var(--hermes-ink);border-radius:12px}\n.qiankun-stored-open small{font:10px/1.5 system-ui;color:var(--hermes-gold);letter-spacing:.16em}\n.qiankun-stored-open strong{font:14px/1.5 \"Songti SC\",\"SimSun\",serif;font-weight:400}\n.qiankun-stored-open>span{font:10px/1.5 system-ui;color:var(--hermes-art)}\n.qiankun-stored-close{position:absolute;z-index:1;right:0;top:0;width:24px;height:24px;border:0;background:transparent;color:var(--hermes-art);font:16px/1 system-ui;cursor:pointer;border-radius:4px}\n.qiankun-cast .hermes-talisman-sheet{width:120px;min-height:260px;justify-content:space-between;padding:18px 14px;border-color:var(--hermes-gold)}\n/* Four-part opening: mist, yin-yang, trigram ring, convergence. */\n.qiankun-boot{position:fixed;inset:0;z-index:9000;isolation:isolate;overflow:hidden;color:var(--hermes-ink);background:var(--dsw-alias-bg-base);animation:q-boot-screen 4.2s ease both;outline:none}\n.qiankun-boot-landscape{position:absolute;inset:0;background-size:cover;background-position:center bottom;opacity:.45;filter:var(--qiankun-landscape-filter);z-index:-1;animation:q-ink-gather 1.4s ease both}\n.qiankun-boot-core{position:absolute;width:min(40vh,34vw,440px);aspect-ratio:1;left:50%;top:50%;transform:translate(-50%,-50%);filter:drop-shadow(0 0 20px color-mix(in srgb,var(--hermes-gold) 35%,transparent));animation:q-taiji-form 1.6s ease both}\n.qiankun-boot-core .hermes-bagua-ring{transform-origin:100px 100px;animation:q-bagua-arrive 2.2s ease .5s both}\n.qiankun-boot-core .hermes-bagua-ring>g{animation:q-trigram 1.4s ease both}\n.qiankun-boot-core .hermes-bagua-ring>g:nth-of-type(2n){animation-delay:.4s}\n.qiankun-boot-core .hermes-bagua-ring>g:nth-of-type(2n+1){animation-delay:.8s}\n.qiankun-boot p{position:absolute;margin:0;font-family:\"Xingkai SC\",\"STXingkai\",\"华文行楷\",\"KaiTi\",serif;font-weight:400;line-height:1.5;letter-spacing:.16em;animation:q-ink-gather 1.2s ease .5s both}\n.qiankun-boot-top,.qiankun-boot-bottom{left:50%;transform:translateX(-50%);white-space:nowrap;font-size:clamp(17px,2.8vw,40px)}\n.qiankun-boot-top{top:9vh}.qiankun-boot-bottom{bottom:9vh}\n.qiankun-boot-left,.qiankun-boot-right{top:50%;transform:translateY(-50%);writing-mode:vertical-rl;font-size:clamp(16px,2.6vh,30px);max-height:70vh}\n.qiankun-boot-left{left:14vw}.qiankun-boot-right{right:14vw}\n.qiankun-boot-skip{position:absolute;right:24px;bottom:20px;padding:8px 12px;border:1px solid var(--q-border);border-radius:99px;color:var(--hermes-art);background:var(--hermes-paper);font:11px/1.4 system-ui;cursor:pointer}\n@keyframes q-input-breathe{0%,100%{box-shadow:0 8px 28px #3833440a}50%{box-shadow:0 0 22px color-mix(in srgb,var(--hermes-gold) 16%,transparent)}}\n@keyframes q-mote{0%,100%{opacity:.08;transform:translateY(0)}50%{opacity:.35;transform:translateY(-9px)}}\n@keyframes q-reading-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}\n@keyframes q-slip-in{from{opacity:0;transform:translate(25vw,25vh) scale(.3) rotate(8deg)}to{opacity:1;transform:none}}\n@keyframes q-ink-gather{from{opacity:0;filter:blur(8px)}to{opacity:1;filter:blur(0)}}\n@keyframes q-taiji-form{from{opacity:0;transform:translate(-50%,-50%) scale(.75);filter:blur(10px)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}\n@keyframes q-bagua-arrive{from{opacity:0;transform:rotate(-40deg) scale(.85)}to{opacity:1;transform:rotate(0) scale(1)}}\n@keyframes q-trigram{from{opacity:0}to{opacity:1}}\n@keyframes q-boot-screen{0%{opacity:0}12%,83%{opacity:1}100%{opacity:0}}\n@media(max-width:800px){.qiankun-ambient .hermes-inscription{display:none}.qiankun-orb,.qiankun-orb-echo{right:-12vw;width:55vw;top:5vh}.qiankun-reading{padding:20px;border-radius:16px}.qiankun-reading-head{gap:8px}.qiankun-reading-head time{font-size:9px;letter-spacing:0}.qiankun-reading-head>span{font-size:12px}.qiankun-reading-core h2{font-size:30px}.qiankun-interpretation{font-size:14px}.qiankun-poem p{font-size:22px}.qiankun-tags{gap:8px}.qiankun-tags>span{font-size:12px;padding:6px 12px}.qiankun-settings{padding:20px}.qiankun-settings h2{font-size:21px}.qiankun-modes{grid-template-columns:1fr}.qiankun-mode{gap:5px;padding:12px}.qiankun-mode strong{font-size:14px}.qiankun-options{grid-template-columns:1fr}.qiankun-boot-core{width:55vw}.qiankun-boot-left{left:3vw}.qiankun-boot-right{right:3vw}.qiankun-boot-top,.qiankun-boot-bottom{font-size:clamp(10px,2.6vw,21px);letter-spacing:.04em}.qiankun-stored{right:12px;bottom:12px;width:90px}.qiankun-stored-open{gap:5px;padding:14px 8px 10px}.qiankun-stored-open strong{font-size:12px}.qiankun-status{font-size:10px;letter-spacing:.02em}}\n[data-qiankun-motion=off] .qiankun-ambient *,[data-qiankun-motion=off] .qiankun-reading,[data-qiankun-motion=off] .qiankun-reading *,[data-qiankun-motion=off] .qiankun-stored,[data-qiankun-motion=off] [data-composer-card]{animation:none!important;transition:none!important}\n[data-qiankun-motion=off] .hermes-talisman-sheet{animation:none!important}\n[data-qiankun-motion=off] .hermes-send{display:none}\n@media(prefers-reduced-motion:reduce){.qiankun-ambient *,.qiankun-reading,.qiankun-reading *,.qiankun-stored,[data-qiankun] [data-composer-card]{animation:none!important;transition:none!important}.qiankun-boot,.hermes-send{display:none}}\n.qiankun-landscape{left:var(--q-left,0px)}\n.qiankun-ambient .hermes-inscription{left:calc(var(--q-left,0px) + 60px)}\r\n[data-qiankun]{--q-art:.34}\n[data-qiankun-mode=balanced]{--q-art:.44}\n[data-qiankun-mode=immersive]{--q-art:.5}\n[data-qiankun-content=yes]{--q-art:.1}\n.qiankun-orb,.qiankun-orb-echo{--hermes-ink:var(--hermes-gold)}\r\n.qiankun-slip-stage{position:relative;isolation:isolate}\n.qiankun-ritual-aura{position:absolute;z-index:-1;width:300px;height:300px;bottom:-64px;color:var(--hermes-gold);--hermes-ink:var(--hermes-gold);opacity:.18;transform:perspective(600px) rotateX(65deg);pointer-events:none}\n.qiankun-reading-head>span,.qiankun-reading-core .hermes-fortune-grade,.qiankun-reading-foot .qiankun-action,.qiankun-tags>span:first-child{color:var(--dsw-alias-state-warn-label)}\n.qiankun-poem p{font-family:\"KaiTi\",\"STKaiti\",\"Songti SC\",serif;font-weight:500}\r\n.qiankun-reading--open{display:flex;flex-direction:column;min-height:min(650px,calc(100dvh - 48px))}\n.qiankun-reading--open .qiankun-reading-foot{margin-top:auto}\n@media(max-width:800px){.qiankun-reading--open{min-height:0}}\r\n.qiankun-boot-left,.qiankun-boot-right{height:70vh;white-space:nowrap}\n.qiankun-boot-core{width:min(52vh,43vw,560px)}\n@media(max-width:800px){.qiankun-boot-core{width:55vw}.qiankun-boot-left,.qiankun-boot-right{font-size:clamp(13px,2.2vh,20px)}}\r\n.qiankun-boot-landscape{animation:q-landscape-gather 1.4s ease both}\n@keyframes q-landscape-gather{from{opacity:0}to{opacity:.5}}\n.qiankun-orb .hermes-taiji-flow{transform-origin:100px 100px;animation:hermes-spin 120s linear infinite reverse;animation-play-state:paused}\n[data-qiankun-state=thinking][data-qiankun-mode=balanced][data-qiankun-motion=on] .qiankun-orb .hermes-taiji-flow,\n[data-qiankun-state=thinking][data-qiankun-mode=immersive][data-qiankun-motion=on] .qiankun-orb .hermes-taiji-flow{animation-play-state:running}\r\n.qiankun-reading-art{background-size:100% auto;background-repeat:no-repeat;background-position:center 38%;opacity:.36}\n.qiankun-reading-watermark{position:absolute;z-index:-1;right:12px;top:70px;width:180px;aspect-ratio:1;opacity:.17;--hermes-ink:var(--hermes-gold);pointer-events:none}\n@media(min-width:801px){.qiankun-reading-core h2{font-size:44px;font-weight:600}.qiankun-poem p{font-size:34px;font-weight:600;line-height:1.8}.qiankun-interpretation{font-size:18px;max-width:600px;align-self:center}.qiankun-tags>span{font-size:16px;padding:8px 18px}.qiankun-tags b{display:grid;place-items:center;flex:none;width:28px;height:28px;padding:0;border:0;border-radius:50%;background:var(--hermes-gold);color:var(--hermes-paper)}.qiankun-tags>span+span b{background:var(--hermes-violet)}.qiankun-reading-head>span{font-size:17px}.qiankun-reading-head time{font-size:12px}}\n@media(max-width:800px){.qiankun-reading-watermark{width:120px;right:4px;opacity:.07}}\r\n.qiankun-reading-art{mask-image:linear-gradient(#000 0%,#000 53%,transparent 68%)}\n@media(min-width:801px){.qiankun-interpretation{max-width:520px}}\r\n.qiankun-ambient,.qiankun-cast{pointer-events:none!important}\n.qiankun-dialog-backdrop,.qiankun-fortune,.qiankun-boot,.qiankun-stored{pointer-events:auto}\r\n.qiankun-boot-core .hermes-bagua-ring>g{animation-delay:calc(var(--q-trigram-index,0) * 100ms + 400ms)!important}\n.qiankun-reading,.qiankun-settings{overscroll-behavior:contain}\r\n.qiankun-interpretation{text-wrap:balance}\r\n/* V2.0.1 — clearer controls and confirmed-effort motion. */\n[data-qiankun]{--q-border:color-mix(in srgb,var(--hermes-gold) 78%,var(--dsw-alias-border-l2))}\n[data-qiankun] [data-composer-card]{border-width:1.5px;box-shadow:0 7px 28px #38334414,inset 0 0 0 1px color-mix(in srgb,var(--hermes-gold) 8%,transparent)}\n[data-qiankun] [data-composer-card]:focus-within{border-color:var(--hermes-gold);box-shadow:0 0 0 3px color-mix(in srgb,var(--hermes-gold) 20%,transparent),0 10px 30px #38334414}\n.qiankun-mode{position:relative;border-width:2px}\n.qiankun-mode[aria-pressed=true]{border-color:var(--hermes-gold);background:color-mix(in srgb,var(--hermes-gold) 17%,var(--hermes-paper));box-shadow:inset 3px 0 0 var(--hermes-gold)}\n.qiankun-mode .qiankun-selected{font:10px/1.4 system-ui;color:var(--dsw-alias-state-warn-label);align-self:flex-end;border:1px solid var(--q-border);border-radius:4px;padding:1px 5px;margin-bottom:-5px}\n[data-qiankun] [role=option][aria-selected=true],[data-qiankun] [role=tab][aria-selected=true]{box-shadow:inset 0 -2px 0 var(--hermes-gold);background-color:var(--dsw-alias-button-ghost-active-fill)}\n.hermes-brand-row .hermes-brand-lockup{flex-shrink:0}\n.qiankun-daily-good{display:inline-flex;align-items:center;gap:4px;min-width:0;max-width:132px;flex-shrink:1;color:var(--dsw-alias-state-warn-label);font:10px/1.5 system-ui;white-space:nowrap;padding:2px 5px;border-left:1px solid var(--q-border)}\n.qiankun-daily-good b{font-weight:500;flex:none}\n.qiankun-daily-good>span{min-width:0;overflow:hidden;text-overflow:ellipsis}\n.qiankun-ambient{--q-ring-play:paused}\n[data-qiankun-rotating=on] .qiankun-ambient{--q-ring-play:running}\n.qiankun-orb .hermes-bagua-ring{animation-duration:var(--q-rotation-speed,90s)!important;animation-play-state:var(--q-ring-play)!important}\n.qiankun-orb .hermes-taiji-flow{animation-duration:calc(var(--q-rotation-speed,90s) * 1.8)!important;animation-play-state:var(--q-ring-play)!important}\n.qiankun-orb-echo .hermes-bagua-ring{animation-duration:calc(var(--q-rotation-speed,90s) * 1.6)!important;animation-play-state:var(--q-ring-play)!important}\n[data-qiankun-reasoning=immersive][data-qiankun-rotating=on] .qiankun-orb-echo{opacity:.07}\n.qiankun-cast .hermes-talisman-sheet{animation:q-edict-flight 2400ms cubic-bezier(.22,.7,.28,1) both;box-shadow:0 0 30px #b58a433d,0 18px 56px #38334430,inset 0 0 0 3px #fffaf166}\n.qiankun-cast .hermes-talisman-command{animation:q-edict-command 1.6s ease both;text-shadow:0 0 8px #b58a4366}\n.qiankun-cast .hermes-talisman-rune path{stroke-dasharray:160;animation:q-edict-write 1s ease both}\n.qiankun-edict-aura{position:fixed;z-index:8699;left:50%;top:50%;width:min(420px,75vw);aspect-ratio:1;transform:translate(-50%,-50%);color:var(--hermes-gold);--hermes-ink:var(--hermes-gold);opacity:0;filter:drop-shadow(0 0 12px #b58a4333);animation:q-edict-aura 2400ms ease both}\n.qiankun-edict-motes{position:fixed;z-index:8701;left:50%;top:50%;pointer-events:none}\n.qiankun-edict-motes i{position:absolute;width:3px;height:3px;border-radius:50%;background:var(--hermes-gold);box-shadow:0 0 6px var(--hermes-gold);--angle:calc(var(--mote-index) * 45deg);transform:rotate(var(--angle)) translateX(45px);animation:q-edict-mote 2400ms ease both}\n@keyframes q-edict-flight{0%{opacity:0;transform:translate3d(0,16px,0) scale(.78) rotate(-4deg)}16%{opacity:1;transform:translate3d(0,0,0) scale(1.02) rotate(1deg)}36%{transform:translate3d(0,-7px,0) scale(1) rotate(-1deg)}58%{opacity:1;transform:translate3d(0,0,0) scale(1) rotate(1deg)}72%{opacity:1;transform:translate3d(0,-4px,0) scale(1) rotate(0)}100%{opacity:0;transform:translate3d(36vw,30vh,0) scale(.3) rotate(8deg)}}\n@keyframes q-edict-command{0%{opacity:0;transform:scale(1.15)}30%,100%{opacity:1;transform:scale(1)}}\n@keyframes q-edict-write{from{stroke-dashoffset:160;opacity:.15}to{stroke-dashoffset:0;opacity:1}}\n@keyframes q-edict-aura{0%{opacity:0;transform:translate(-50%,-50%) scale(.7) rotate(-12deg)}20%,65%{opacity:.24}100%{opacity:0;transform:translate(-50%,-50%) scale(1.15) rotate(35deg)}}\n@keyframes q-edict-mote{0%{opacity:0}25%{opacity:.65}80%,100%{opacity:0;transform:rotate(var(--angle)) translateX(150px) translateY(-15px)}}\n[data-qiankun-motion=off] .qiankun-cast *{animation:none!important}\n[data-qiankun-motion=off] .qiankun-edict-aura,[data-qiankun-motion=off] .qiankun-edict-motes{display:none}\n@media(prefers-reduced-motion:reduce){.qiankun-cast *{animation:none!important}.qiankun-edict-aura,.qiankun-edict-motes{display:none}}\r\n.hermes-brand-row{max-width:100%}\r\n";
const MODES = [
  { id: 'quiet', title: '淡雅 · 浅思', short: '淡雅', note: '大道至简，静水流深' },
  { id: 'balanced', title: '平衡 · 深思', short: '平衡', note: '阴阳相济，动静相生' },
  { id: 'immersive', title: '沉浸 · 悟道', short: '沉浸', note: '观天地之象，悟万物之理' },
]
// Only map recognized semantics. Provider effort IDs are opaque; do not guess their order.
function effortMode(id) {
  if (['off', 'none', 'disabled', 'minimal', 'low'].includes(id)) return 'quiet'
  if (['medium', 'high', 'enabled', 'on'].includes(id)) return 'balanced'
  if (['max', 'xhigh', 'ultra'].includes(id)) return 'immersive'
  return null
}
// Idle speed follows the confirmed model effort, independently of the decorative theme.
function rotationOf(effort, activity, motion = true) {
  const level = effortMode(effort)
  if (!motion || !level || level === 'quiet' || ['output', 'waiting', 'tools'].includes(activity)) return { level: level || 'quiet', duration: '0s', rotating: false }
  return { level, duration: level === 'immersive' ? activity === 'thinking' ? '24s' : '48s' : activity === 'thinking' ? '55s' : '90s', rotating: true }
}
function modelChoices(snapshot) {
  const current = snapshot?.current
  const model = snapshot?.groups?.find(g => g.id === current?.provider)?.models?.find(m => m.id === current?.model)
  const efforts = model?.reasoning?.efforts || []
  const pick = names => names.map(name => efforts.find(e => e.id === name)).find(Boolean)
  const quiet = pick(['off', 'none', 'disabled', 'low', 'minimal'])
  const balanced = pick(['high', 'medium', 'enabled', 'on'])
  const immersive = pick(['max', 'xhigh', 'ultra'])
  return { current, effective: current?.reasoningEffort ?? model?.reasoning?.defaultEffort,
    quiet: { effort: quiet, visualOnly: !quiet },
    balanced: { effort: balanced, visualOnly: !balanced },
    immersive: { effort: immersive || balanced, visualOnly: !immersive } }
}
function activityOf(session, outputSeen = false) {
  if (!session || !session.running) return 'idle'
  if (session.pending?.length) return 'waiting'
  const blocks = session.partial?.blocks || []
  if (outputSeen || blocks.some(b => b.kind === 'text' && b.text?.trim())) return 'output'
  if (session.runningCalls?.length) return 'tools'
  return 'thinking'
}
const DEFAULT_PREFS = { mode: 'quiet', follow: true, bind: true, motion: true, fortune: true, boot: true }
function validPreferences(input) {
  const value = { ...DEFAULT_PREFS }
  if (input && MODES.some(m => m.id === input.mode)) value.mode = input.mode
  for (const name of ['follow', 'bind', 'motion', 'fortune', 'boot']) if (typeof input?.[name] === 'boolean') value[name] = input[name]
  return value
}

    // Shared state lives inside the plugin factory and is disposed with slot effects.
    const preferenceKey = PKG + '/qiankun-v2'
    let preferences = validPreferences(null)
    try { preferences = validPreferences(JSON.parse(localStorage.getItem(preferenceKey))) } catch {}
    const listeners = new Set()
    let visual = { mode: 'quiet', activity: 'idle', effort: null, hasContent: false, connected: false }
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
    function QiankunControls(props) {
      return typeof props.useSession === 'function' ? h(QiankunSessionControls, props) : h(QiankunControlsBody, props)
    }
    function QiankunSessionControls(props) {
      const session = props.useSession(value => value)
      return h(QiankunControlsBody, { ...props, session: props.session || session })
    }
    function QiankunControlsBody({ sessionId, session, input }) {
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
        visual = { mode, activity, effort: choices.effective || null, hasContent: session?.blank === false, connected: Boolean(session) }
        notify()
      }, [mode, activity, choices.effective, session?.blank, Boolean(session)])
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
            }, mode === m.id && h('span', { className: 'qiankun-selected' }, '已选'), h('strong', null, m.title), h('span', null, m.note), h('small', null, prefs.bind && directory && choices[m.id].effort ? choices[m.id].visualOnly ? '视觉沉浸 · 沿用 ' + choices[m.id].effort.name : '模型推理 · ' + choices[m.id].effort.name : '仅视觉氛围')))),
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
    function QiankunDailyGood() {
      const prefs = usePreferences()
      const [reading, setReading] = React.useState(fortuneOfDay)
      React.useEffect(() => {
        let timer
        const refresh = () => {
          setReading(fortuneOfDay())
          clearTimeout(timer)
          const now = new Date()
          timer = setTimeout(refresh, new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime() + 1000)
        }
        refresh()
        document.addEventListener('visibilitychange', refresh)
        return () => { clearTimeout(timer); document.removeEventListener('visibilitychange', refresh) }
      }, [])
      return prefs.fortune && h('span', { className: 'qiankun-daily-good', title: '今日宜：' + reading.good, 'aria-label': '今日宜：' + reading.good }, h('b', null, '今日宜'), h('span', null, reading.good))
    }
    function QiankunAmbient() {
      const prefs = usePreferences(), value = useVisual(), reduced = useReducedMotion()
      const rotation = rotationOf(value.effort, value.activity, prefs.motion && !reduced)
      const ref = React.useRef(null)
      React.useEffect(() => {
        const root = document.documentElement
        const sidebar = document.querySelector('[data-slot="sidebar"]')
        const update = () => ref.current?.style.setProperty('--q-left', Math.max(0, sidebar?.getBoundingClientRect().right || 0) + 'px')
        update()
        const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(update) : null
        if (sidebar) observer?.observe(sidebar)
        window.addEventListener('resize', update)
        const attrs = ['data-qiankun', 'data-qiankun-mode', 'data-qiankun-state', 'data-qiankun-motion', 'data-qiankun-content', 'data-qiankun-fortune', 'data-qiankun-rotating', 'data-qiankun-reasoning']
        const previous = attrs.map(name => root.getAttribute(name))
        return () => { observer?.disconnect(); window.removeEventListener('resize', update); attrs.forEach((name, i) => previous[i] === null ? root.removeAttribute(name) : root.setAttribute(name, previous[i])) }
      }, [])
      React.useEffect(() => {
        const root = document.documentElement
        root.dataset.qiankun = 'true'; root.dataset.qiankunMode = value.mode
        root.dataset.qiankunState = value.activity; root.dataset.qiankunMotion = prefs.motion && !reduced ? 'on' : 'off'
        root.dataset.qiankunContent = value.hasContent ? 'yes' : 'no'; root.dataset.qiankunFortune = prefs.fortune ? 'on' : 'off'
        root.dataset.qiankunRotating = rotation.rotating ? 'on' : 'off'; root.dataset.qiankunReasoning = rotation.level
      }, [prefs, value, reduced])
      return h('div', { className: 'qiankun-ambient', 'aria-hidden': true, ref, style: { '--q-rotation-speed': rotation.duration } },
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
        const timer = setTimeout(() => setCasting(null), motion ? 2400 : 200)
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
        casting && h('div', { className: 'qiankun-cast', key: casting.stamp },
          h('div', { className: 'qiankun-edict-aura', 'aria-hidden': true }, h(BaguaPlate, { compact: true })),
          h('div', { className: 'qiankun-edict-motes', 'aria-hidden': true }, STARS.slice(0, 8).map((star, i) => h('i', { key: i, style: { '--mote-index': i } }))),
          h(TalismanCast, { reading: casting })),
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


    function apply(ctx) {
      ctx.effect(() => {
        const tag = document.createElement('style')
        tag.dataset.plugin = PKG
        tag.dataset.pluginCss = PKG + '/skin.css'
        tag.textContent = CSS + QIANKUN_CSS
        document.head.appendChild(tag)
        return () => tag.remove()
      }, 'hermes-skin: skin stylesheet')

      connectModelDirectory(ctx)

      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register({ name: 'shell.overlay', id: 'qiankun-settings', order: 42 }, QiankunSettingsLayer),
      )

      ctx.effect(() => ctx.theme.overrideTokens(PKG, TOKENS), 'hermes-skin: alias tokens')

      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register({ name: 'shell.overlay', id: 'hermes-ambient', order: -10 }, QiankunAmbient),
      )
      // V2 opening: once per renderer session; replay is exposed in theme settings.
      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register({ name: 'shell.overlay', id: 'hermes-boot', order: 50 }, QiankunBoot),
      )
      // 回车发送的太极闪屏：挂在 frame 级 overlay，避免被会话容器裁切。
      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register({ name: 'shell.overlay', id: 'hermes-send-taiji', order: 45 }, SendTaijiOverlay),
      )
      // 今日占卜签卡：由侧栏品牌行的小按钮触发，画面挂在 frame 级 overlay。
      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register({ name: 'shell.overlay', id: 'hermes-fortune', order: 40 }, QiankunFortune),
      )
      // 空白会话不出太极：用空占位 shadow 掉官方品牌位，聊天里只在发送时闪太极。
      ctx.slots.inject('conversation.hero.brand.mark', () =>
        ctx.slots.register({ name: 'conversation.hero.brand.mark', priority: -100 }, NoHeroMark),
      )
      ctx.slots.inject('conversation.composer.dock', () => [
        ctx.slots.register({ name: 'conversation.composer.dock', id: 'hermes-motto', order: 20 }, QiankunStatus),
        ctx.slots.register({ name: 'conversation.composer.dock', id: 'hermes-send-taiji', order: 21 }, SendTaijiTrigger),
      ])
      ctx.slots.inject('conversation.input.left', () =>
        ctx.slots.register({ name: 'conversation.input.left', id: 'qiankun-depth', order: 30 }, QiankunControls),
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
