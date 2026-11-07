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
      '--dsw-alias-button-ghost-active-fill': { light: '#F3E9D2', dark: '#3A3020' },
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
      /* 小号金文字（11–13px）在纸上需要更深一档才能过 AA */
      '--hermes-gold-strong': { light: '#8F6C2C', dark: '#D9BE86' },
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
    /** 八经卦三爻（爻序自上而下）：卦名 → 爻，自然物 → 卦名。 */
    const TRI_BITS = { 乾: [1, 1, 1], 兑: [0, 1, 1], 离: [1, 0, 1], 震: [0, 0, 1], 巽: [1, 1, 0], 坎: [0, 1, 0], 艮: [1, 0, 0], 坤: [0, 0, 0] }
    const TRI_KEY = { 天: '乾', 泽: '兑', 火: '离', 雷: '震', 风: '巽', 水: '坎', 山: '艮', 地: '坤' }

    /** 六十四别卦签：[全名, 本名, 等级, 诗上句, 诗下句, 解辞, 宜, 忌]（按八宫序，宫首为纯卦）。 */
    const GUA64_LOTS = [
      ['乾为天', '乾', '上上签', '天行健，君子以自强不息；', '今日事，今日成。', '乾为天，刚健中正。势头在你这边，适合把搁置的事一次推到底。', '进取 · 签约 · 早起', '懒散 · 反复'],
      ['天风姤', '姤', '中平签', '不期而遇缘自来，', '风起青萍末上裁。', '姤者遇也。今日多意外相逢，先听后动，是缘是劫看过往功课。', '会面 · 倾听', '轻许 · 心浮'],
      ['天山遁', '遁', '中平签', '急流勇退非逃避，', '留得青山再出发。', '遁者退也。今日宜收不宜放，退半步整理行装，不是认输。', '复盘 · 止损', '硬撑 · 逞强'],
      ['天地否', '否', '下签', '天地不交万物静，', '闭门读书且养心。', '否者塞也。今日沟通易堵、诸事不畅，少做重大决定，静候气机流转。', '独处 · 读书', '争执 · 签约'],
      ['风地观', '观', '中吉签', '登高四望风云静，', '观人观己两分明。', '观者望也。今日宜多看少说，把局面看全再落子。', '调研 · 观察', '跟风 · 抢答'],
      ['山地剥', '剥', '下签', '果实落地非终结，', '剥极而复见真机。', '剥者落也。今日旧事收尾、冗余剥落，放手即轻身。', '断舍离 · 收尾', '贪多 · 翻旧账'],
      ['火地晋', '晋', '上吉签', '日出地上明四方，', '晋升之路上台阶。', '晋者进也。今日势头向上，宜拜见、宜展示、宜把方案递上去。', '述职 · 求荐', '藏拙 · 过谦'],
      ['火天大有', '大有', '上上签', '火在天上照万物，', '大有之年众自来。', '大有者丰也。今日资源汇聚，适合开口要人要资源。', '合作 · 分享', '独占 · 小气'],
      ['兑为泽', '兑', '上吉签', '喜气盈门人语笑，', '与君同醉一壶春。', '兑为泽，和悦而亨。今日人缘顺，宜见人、宜开口，好事常在饭桌上。', '社交 · 宴饮 · 约会', '口舌 · 赌气'],
      ['泽水困', '困', '下签', '泽中无水鱼难跃，', '守困待时心莫慌。', '困者窘也。今日处处掣肘，宜守不宜攻，困得住气才出得来。', '节流 · 静守', '借贷 · 冒进'],
      ['泽地萃', '萃', '上吉签', '泽上于地聚成湖，', '群贤毕至共一事。', '萃者聚也。今日宜开会、宜组团，人心可用。', '团建 · 结盟', '独行 · 猜忌'],
      ['泽山咸', '咸', '中吉签', '山上有泽气相通，', '心有灵犀一点通。', '咸者感也。今日直觉敏锐、情感交流顺遂，谈心胜过谈理。', '沟通 · 约会', '算计 · 冷漠'],
      ['水山蹇', '蹇', '下签', '山高水远路多艰，', '良朋相助渡险滩。', '蹇者难也。今日行路难，贵人可解，独自硬闯易翻车。', '求助 · 绕行', '逞强 · 抄近路'],
      ['地山谦', '谦', '上吉签', '地中有山藏不露，', '谦谦君子万人扶。', '谦者退而益广。今日低调反得人心，把功劳分出去，回报加倍。', '让功 · 请教', '炫耀 · 居功'],
      ['雷山小过', '小过', '中平签', '飞鸟宜下不宜上，', '小事可为大须防。', '小过者微越也。今日细节能出彩，大方向别乱动。', '打磨细节 · 修正', '大改 · 好高骛远'],
      ['雷泽归妹', '归妹', '中平签', '少女出阁有序列，', '名正言顺事乃成。', '归妹者归也。今日程序要对、名分要正，按规矩来就顺。', '按流程 · 正名', '越位 · 将就'],
      ['离为火', '离', '中吉签', '红日当空照九州，', '才华尽显在今朝。', '离为火，明两作离。今日宜表达与展示，光要打在你身上，别躲。', '表达 · 展示 · 发布', '急躁 · 争执'],
      ['火山旅', '旅', '中平签', '火在山上行无定，', '旅人处处可当家。', '旅者客也。今日奔波在路上，随遇而安、轻装简行。', '出行 · 出差', '恋战 · 拖泥带水'],
      ['火风鼎', '鼎', '上吉签', '木火生烟鼎中沸，', '调和五味成大羹。', '鼎者化也。今日宜整合资源、调和各方，破料重烹出新品。', '整合 · 上线 · 发布', '夹生 · 半途而废'],
      ['火水未济', '未济', '中平签', '火在水上势未成，', '渡口且系一叶舟。', '未济者待也。今日万事差最后一步，别急着收官。', '打磨 · 待时', '交卷心切 · 将就'],
      ['山水蒙', '蒙', '中平签', '山下出泉清见底，', '启蒙问道正当时。', '蒙者昧初也。今日有不懂的就问，低姿态换来真学问。', '提问 · 学习', '装懂 · 逞能'],
      ['风水涣', '涣', '中平签', '风行水上波纹散，', '涣然冰释前嫌消。', '涣者散也。今日宜化解积怨、拆解难题，把大化小。', '和解 · 拆解', '记仇 · 攒问题'],
      ['天水讼', '讼', '中下签', '天水违行起争端，', '讼不可成让为先。', '讼者争也。今日口舌易起，赢了道理输了和气，不值。', '和解 · 找中间人', '硬刚 · 投诉'],
      ['天火同人', '同人', '上吉签', '天与火同明相照，', '同人于野天下行。', '同人者亲也。今日找同道、拉同盟，敞开门做事。', '开源 · 社群 · 结伴', '小圈子 · 排他'],
      ['震为雷', '震', '中吉签', '一声雷动惊蛰后，', '万象更新自此时。', '震为雷，动而后安。今天适合开个头，但别把动静当成结果。', '开创 · 面试 · 破局', '冲动 · 熬夜'],
      ['雷地豫', '豫', '上吉签', '雷出地奋声先动，', '众乐之后事可图。', '豫者备也。今日士气高涨，鼓舞人心之后再布置任务。', '动员 · 庆功', '空欢 · 无备'],
      ['雷水解', '解', '中吉签', '雷雨大作涤旧气，', '解开心结天地宽。', '解者散也。今日宜解决问题、赦免小过，一解百解。', '解题 · 宽恕', '记过 · 拖延'],
      ['雷风恒', '恒', '中吉签', '雷风相与长流水，', '持之以恒事乃成。', '恒者久也。今日拼的不是爆发是续航，按住节奏。', '习惯 · 长线', '三天打鱼'],
      ['地风升', '升', '上吉签', '地中生木日日高，', '积小成高步步升。', '升者进也。今日稳步上行，宜汇报、宜晋升、宜加码。', '晋升 · 述职 · 加注', '跳跃 · 越级'],
      ['水风井', '井', '中吉签', '井水清冽养四方，', '守常不移自有功。', '井者养也。今日守好基本盘，口碑自来。', '维护 · 服务', '搬家 · 改道'],
      ['泽风大过', '大过', '中下签', '大梁压顶须警惕，', '减载方保栋不挠。', '大过者过重也。今日担子太重，先卸载再赶路。', '减负 · 求援', '硬扛 · 加码'],
      ['泽雷随', '随', '中吉签', '泽中有雷声暂息，', '随时而行顺水舟。', '随者从也。今日顺着大势走，跟对人事半功倍。', '跟随 · 借势', '逆行 · 特立独行'],
      ['巽为风', '巽', '中平签', '柔风入户无痕迹，', '润物无声自成蹊。', '巽为风，随风而入。今日宜沟通协调，顺着势头说话，事就成了。', '沟通 · 谈判 · 出行', '拖延 · 赌气'],
      ['风天小畜', '小畜', '中平签', '密云不雨且蓄力，', '小畜之后有滂沱。', '小畜者积也。今日宜攒不宜花，存力气存弹药。', '储蓄 · 备料', '孤注一掷 · 大开销'],
      ['风火家人', '家人', '上吉签', '风自火出暖入内，', '家人同心万事兴。', '家人者和也。今日宜顾家、宜团队内部对齐。', '家宴 · 对齐会', '后院起火 · 内耗'],
      ['风雷益', '益', '上吉签', '风雷相助益处广，', '利人利己两相成。', '益者益也。今日宜给予，帮人即帮己。', '分享 · 帮扶 · 投资', '索取 · 计较'],
      ['天雷无妄', '无妄', '中平签', '雷行天下守本分，', '无妄之灾不沾身。', '无妄者真也。今日别耍小聪明，实话实说最稳。', '守正 · 直说', '侥幸 · 捷径'],
      ['火雷噬嗑', '噬嗑', '中平签', '颐中有物阻咬合，', '除梗之后上下通。', '噬嗑者咬也。今日卡壳的事要敢下口，剔除梗阻。', '攻坚 · 清障', '和稀泥 · 绕着走'],
      ['山雷颐', '颐', '中吉签', '颐养之道在节制，', '慎言慎食福气长。', '颐者养也。今日宜养生慎言，管好进口。', '养生 · 少言', '暴食 · 口无遮拦'],
      ['山风蛊', '蛊', '中平签', '山下有风事生虫，', '整治旧弊焕新颜。', '蛊者坏也。今日宜翻旧账修旧疾，刮骨疗毒。', '修复 · 整改', '掩盖 · 拖延'],
      ['坎为水', '坎', '中平签', '水到渠成终有路，', '心平何惧浪千重。', '坎为水，习坎而孚。今日事有反复，守住节奏，不冒进就是赢。', '读书 · 复盘 · 守成', '冒险 · 轻信'],
      ['水泽节', '节', '中吉签', '泽上有水需有度，', '节以制度不伤财。', '节者度也。今日定规矩、限量、掐时间，有度反而快。', '预算 · 截止线', '放纵 · 无度'],
      ['水雷屯', '屯', '中平签', '云雷屯结万物始，', '创始维艰贵坚持。', '屯者始难也。今日开局艰难是常态，挺过去就生根。', '启动 · 播种', '求速成 · 自疑'],
      ['水火既济', '既济', '上吉签', '水火相济功已成，', '守成防患于未然。', '既济者成也。今日事成，但要留住成果，补好最后一针。', '收尾 · 复盘 · 备份', '大意 · 早庆'],
      ['泽火革', '革', '上吉签', '泽火相息革故旧，', '顺天应人立新规。', '革者变也。今日宜变革、宜改版、宜说再见。', '改版 · 断腕 · 立新规', '守旧 · 心软'],
      ['雷火丰', '丰', '上吉签', '雷电皆至声势壮，', '日中则斜且惜光。', '丰者大也。今日运势正盛，但盛极防衰，抓紧上午办大事。', '办大事 · 拜访', '挥霍 · 拖延'],
      ['地火明夷', '明夷', '下签', '明入地中光暂晦，', '用晦而明保其身。', '明夷者伤也。今日光而不耀，藏起锋芒护住心。', '低调 · 养精', '出风头 · 硬碰'],
      ['地水师', '师', '中吉签', '地中有水聚众行，', '师出有名纪律明。', '师者众也。今日带团队办事，名正则众随。', '带队 · 立规 · 出征', '无名之师 · 内乱'],
      ['艮为山', '艮', '中平签', '山重水复疑无路，', '静坐观心便是门。', '艮为山，止于当止。今日宜静不宜动，停一停，路自己会浮出来。', '静养 · 复盘 · 断舍离', '强求 · 赶路'],
      ['山火贲', '贲', '中吉签', '山下有火照纹彩，', '修饰门面事更成。', '贲者饰也。今日宜打磨呈现，包装也是生产力。', '美化 · 汇报', '过度包装 · 虚饰'],
      ['山天大畜', '大畜', '上吉签', '天藏山中蓄大力，', '养贤畜德待时飞。', '大畜者聚也。今日宜投入学习、囤积实力。', '进修 · 采购 · 积蓄', '倾囊而出'],
      ['山泽损', '损', '中吉签', '先舍后得真学问，', '减法做足路自宽。', '损者减也。今日做减法，舍弃冗余轻装行。', '放弃 · 优化', '什么都要'],
      ['火泽睽', '睽', '中下签', '上火下泽相背离，', '求同存异小事吉。', '睽者异也。今日分歧明显，别强求一致，各留空间。', '分工 · 存异', '强融 · 争对错'],
      ['天泽履', '履', '中吉签', '上天下泽辨上下，', '履虎尾而不咬人。', '履者礼也。今日守礼守序，如履薄冰也能过。', '守约 · 谨慎', '越界 · 冒犯'],
      ['风泽中孚', '中孚', '上吉签', '中心诚信如风行，', '豚鱼也感贵在真。', '中孚者信也。今日以诚待人，承诺即兑现。', '承诺 · 签约 · 立信', '敷衍 · 轻诺'],
      ['风山渐', '渐', '中吉签', '山上有木渐而高，', '循序渐进终成林。', '渐者缓也。今日不求速胜，一步一步来。', '渐进 · 计划 · 培育', '跳级 · 拔苗'],
      ['坤为地', '坤', '上吉签', '地势坤，君子以厚德载物；', '容得下，福气自会留下。', '坤为地，厚德载物。今日宜守宜和，慢一步反而走得更稳。', '守成 · 协作 · 纳福', '争强 · 催逼'],
      ['地雷复', '复', '上吉签', '雷在地中阳气复，', '一阳来复见天心。', '复者返也。今日转机初现，及时回头及时改。', '回头 · 恢复 · 重启', '将错就错'],
      ['地泽临', '临', '上吉签', '泽上有地临下宽，', '临事而惧谋而成。', '临者莅也。今日宜亲临一线，靠近才能看清。', '现场 · 走动', '遥控 · 听汇报'],
      ['地天泰', '泰', '上上签', '天地交而万物通，', '泰然自得事事顺。', '泰者通也。今日内外皆通，宜大步向前。', '谈判 · 上线 · 通关节', '自闭 · 设防'],
      ['雷天大壮', '大壮', '中吉签', '雷响天上阳气壮，', '仗势莫忘理先装。', '大壮者盛也。今日气盛，恃强易折，理直也别气壮。', '推进 · 展现实力', '恃强 · 激进'],
      ['泽天夬', '夬', '中吉签', '泽上于天决而和，', '果决除弊莫留情。', '夬者决也。今日该断则断，果断去掉拖累。', '决断 · 裁撤 · 了断', '犹豫 · 留患'],
      ['水天需', '需', '中平签', '云上于天待时降，', '饮食宴乐以俟之。', '需者待也。今日时机未到，先吃饭先练兵。', '等待 · 准备', '抢跑 · 催促'],
      ['水地比', '比', '上吉签', '地上有水亲无间，', '比之自内不失亲。', '比者亲也。今日宜结盟依附，找组织找靠山。', '结盟 · 拜师 · 抱团', '单打独斗'],
    ]

    /** 四十四灵签：[题名, 等级, 所属经卦, 诗上句, 诗下句, 解辞, 宜, 忌]。 */
    const LING44_LOTS = [
      ['枯木逢春', '上上签', '乾', '枯木忽逢春雨至，', '老树新枝次第开。', '绝处逢生之象。搁浅的事今日有转机，主动去撬一撬。', '重启 · 联系旧人', '放弃 · 断联'],
      ['明月当空', '上上签', '离', '明月当空照大千，', '万里山河一色天。', '心境澄明之象。今日判断力极佳，大事可决。', '决策 · 规划', '自欺 · 含糊'],
      ['旱苗得雨', '上吉签', '坎', '禾苗枯槁逢甘雨，', '一垄青青绿意回。', '及时雨之象。缺的资源今日可能到位，开口去要。', '申请 · 求援', '硬撑 · 死扛'],
      ['顺风行舟', '上吉签', '巽', '一帆风顺千江过，', '两岸青山送我行。', '借势而行之象。今日顺水推舟，少用力多成事。', '推进 · 发布', '逆势 · 改道'],
      ['金榜题名', '上上签', '离', '十年寒窗无人问，', '一朝题名天下知。', '功成显达之象。努力要被看见了，别躲。', '展示 · 应考 · 述职', '谦虚过度'],
      ['紫气东来', '上吉签', '震', '紫气东来盈门户，', '祥云捧日到山川。', '吉庆临门之象。好消息在路上，保持敞开。', '迎新 · 签约', '多疑 · 关门'],
      ['雪中送炭', '上吉签', '艮', '风雪夜归灯一点，', '炭火通红暖到心。', '得贵人援手之象。今日肯开口，就有人接。', '求助 · 感恩', '面子 · 独撑'],
      ['井泉逢源', '上吉签', '坎', '深井新泉源不断，', '清流自可济人田。', '源头活水之象。今日灵感与补给都在线。', '创作 · 学习', '枯守 · 重复'],
      ['鸿鹄高飞', '上吉签', '乾', '鸿鹄一举千里外，', '燕雀难量天地宽。', '志存高远之象。今日格局放大，敢想敢提。', '定目标 · 谈愿景', '自限 · 讥人'],
      ['丹凤朝阳', '上上签', '离', '丹凤朝阳鸣九天，', '百鸟率和庆明时。', '贵显之象。今日宜见大人物、上大场面。', '拜见 · 演讲', '怯场 · 推脱'],
      ['花开见佛', '上上签', '兑', '一花开放一世界，', '弹指之间见本心。', '顿悟之象。困扰已久的问题今日会突然想通。', '冥想 · 复盘', '钻角 · 硬磕'],
      ['青松傲雪', '中吉签', '艮', '大雪压枝枝愈挺，', '青松本色岁寒知。', '坚守之象。今日的压力是淬炼，站得住就成了。', '坚持 · 守则', '摇摆 · 妥协'],
      ['云开月出', '中吉签', '乾', '云翳散尽天如洗，', '月出东山分外明。', '迷雾渐散之象。悬而未决的事开始清晰。', '求证 · 摊牌', '拖延 · 回避'],
      ['江海朝宗', '上吉签', '坎', '百川东到终归海，', '海纳千流自浩深。', '众望所归之象。今日适合聚合人心。', '组局 · 招募', '清高 · 孤行'],
      ['麟趾呈祥', '上吉签', '坤', '麟趾呈祥家道盛，', '芝兰玉树满庭芳。', '添喜之象。家宅和顺，或有喜讯登门。', '团聚 · 报喜', '内耗 · 猜疑'],
      ['逆水行舟', '中平签', '坎', '逆水行舟不进退，', '一篙撑住即前程。', '知难之象。今日费力是常态，别松手。', '坚持 · 划水', '松劲 · 弃桨'],
      ['雾里看花', '中平签', '坎', '雾里看花花似近，', '风来雾散始知真。', '辨伪之象。今日信息真假掺半，多问一句。', '核实 · 多问', '轻信 · 拍脑袋'],
      ['孤舟遇风', '中下签', '坎', '孤舟夜渡风波恶，', '收帆守舵待天明。', '历练之象。今日宜收不宜进，天亮再走。', '守稳 · 求援', '夜航 · 冒险'],
      ['险渡危桥', '中下签', '坎', '危桥独木脚下响，', '不如绕道十里安。', '避险之象。今日捷径即险境，走大路。', '稳妥 · 合规', '抄近路 · 侥幸'],
      ['枯井生尘', '下签', '艮', '枯井生尘绳索断，', '另寻活水莫恋旧。', '舍旧之象。此路今日不通，换口井打水。', '转型 · 换道', '执念 · 内耗'],
      ['镜里观花', '中平签', '离', '镜中花影伸手散，', '看得见时摸不着。', '虚象之象。今日诱惑多是幻影，落袋为安。', '务实 · 落地', '追热点 · 空想'],
      ['水底捞月', '下签', '坎', '水底捞月月成碎，', '痴心错付一场空。', '徒劳之象。今日认错方向就回头，别加码。', '止损 · 清醒', '赌徒 · 补仓'],
      ['守株待兔', '下签', '艮', '守株待兔兔不至，', '林间猎户已空还。', '怠惰之象。等来的没有，找来的才是。', '主动 · 出击', '干等 · 拖延'],
      ['缘木求鱼', '下签', '巽', '缘木求鱼终无得，', '下水方知鱼在渊。', '方法错之象。今日换个打法，别拧着来。', '换方法 · 请教', '死磕 · 蛮干'],
      ['画蛇添足', '中平签', '离', '画蛇已成又添足，', '多此一举反为拙。', '过界之象。今日完成了就停手，别再加戏。', '收手 · 验收', '多事 · 加戏'],
      ['盲人摸象', '中平签', '坤', '摸得象耳言如簸，', '争执原是未见全。', '偏见之象。今日别急着下结论，先看全貌。', '调研 · 换位', '武断 · 抬杠'],
      ['塞翁失马', '中吉签', '震', '塞翁失马安知祸，', '得失原在一念间。', '祸福相倚之象。今日的坏事里藏着后手。', '转念 · 留后路', '狂喜 · 绝望'],
      ['破镜重圆', '上吉签', '兑', '破镜尘埃拭又满，', '重圆不改旧时光。', '复合之象。旧关系旧搭档今日可修复。', '和解 · 复联', '翻旧账 · 算旧仇'],
      ['沉疴得愈', '上吉签', '震', '沉疴一剂良方起，', '病树前头万木春。', '康复之象。顽疾问题今日有解。', '根治 · 体检', '讳疾 · 忌医'],
      ['石中藏玉', '中吉签', '艮', '顽石之中藏璞玉，', '肯凿方见夜光寒。', '潜力之象。人和事都不能只看表面。', '识人 · 打磨', '以貌取人'],
      ['蜻蜓点水', '中平签', '巽', '蜻蜓点水波纹散，', '浅尝辄止亦风景。', '广度之象。今日宜多线了解，不必深扎。', '调研 · 撒网', '浅薄误事 · 定论'],
      ['竹报平安', '中吉签', '巽', '爆竹一声辞旧岁，', '竹报平安入万户。', '安泰之象。今日家宅平安，给家人报个平安。', '问候 · 报平安', '失联 · 挂心'],
      ['春泥护花', '中吉签', '坤', '落红不是无情物，', '化作春泥更护花。', '成全之象。今日的退让在滋养后面的收成。', '让位 · 培养', '计较 · 争抢'],
      ['鹏程万里', '上上签', '乾', '大鹏一日同风起，', '扶摇直上九万里。', '远大之象。今日定的目标不妨高一点。', '立志 · 规划', '自限 · 自贬'],
      ['稳坐钓台', '中吉签', '艮', '任凭风浪起千遍，', '稳坐钓台意自闲。', '定力之象。今日乱局中不动者赢。', '守静 · 观察', '跟风 · 慌乱'],
      ['苦尽甘来', '上吉签', '兑', '苦尽甘来春日暖，', '回味方知蜜样甜。', '转甜之象。熬过的部分开始回甘。', '收获 · 展示', '诉苦 · 自怜'],
      ['桥头相逢', '中吉签', '兑', '桥头一笑相逢处，', '不问来路是故人。', '缘至之象。今日偶遇带来机会。', '社交 · 随喜', '拒人 · 冷场'],
      ['灯下夜读', '中平签', '离', '青灯黄卷夜将半，', '字里行间自有人。', '积累之象。今日独处充电胜过应酬。', '读书 · 早睡', '刷夜 · 应酬'],
      ['陌上花开', '中吉签', '离', '陌上花开缓缓归，', '一路春风一路香。', '从容之象。今日慢即是快，享受过程。', '散步 · 陪伴', '赶时间 · 焦虑'],
      ['大浪淘沙', '中吉签', '乾', '大浪淘沙沙去尽，', '留下的才是真金。', '筛汰之象。今日留存的关系统统是真的。', '甄别 · 聚焦', '挽留 · 不舍'],
      ['空谷传声', '中平签', '艮', '空谷传声声自远，', '一言既出驷马追。', '口碑之象。今日说什么都会被放大，慎言。', '发声 · 正面', '口角 · 负面'],
      ['老树盘根', '上吉签', '坤', '老树盘根三尺土，', '风来只是叶梢响。', '根基之象。今日底气在积累，风吹不动。', '深耕 · 固本', '追新 · 动摇'],
      ['拨云见日', '上吉签', '离', '拨开云雾重见日，', '阴晴原来一念间。', '释然之象。今日心结可解，宜想通宜放下。', '和解 · 放下', '钻角 · 记恨'],
      ['圆月当空', '上上签', '乾', '海上生明月一轮，', '天涯共此照归人。', '圆满之象。今日诸事可成，宜团圆宜收束。', '团圆 · 收官', '强求完美 · 挑刺'],
    ]

    /** 签池：六十四别卦 + 四十四灵签，共一百零八支；别卦上下卦按卦名自然物解析。 */
    const FORTUNE_LOTS = [
      ...GUA64_LOTS.map(([hex, gua, grade, line1, line2, read, good, bad]) => {
        const isPure = hex.length === 3 && hex[1] === '为'
        const upperName = isPure ? hex[0] : TRI_KEY[hex[0]]
        const lowerName = isPure ? hex[0] : TRI_KEY[hex[1]]
        return { gua, hexName: hex, pattern: TRI_BITS[lowerName], upper: TRI_BITS[upperName], grade, poem: [line1, line2], read, good, bad }
      }),
      ...LING44_LOTS.map(([title, grade, tri, line1, line2, read, good, bad]) => ({ gua: title.slice(0, 2), hexName: title, pattern: TRI_BITS[tri], upper: TRI_BITS[tri], grade, poem: [line1, line2], read, good, bad })),
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
      return PURE_HEXAGRAM[reading.gua] || reading.hexName || reading.gua + '卦'
    }

    /** 六爻重卦：上半为上卦（外），下半为下卦（内）；未传上卦时按纯卦上下同爻。 */
    function HexagramGlyph({ pattern, upper, className }) {
      const upperPattern = upper || pattern
      return h(
        'svg',
        { className: className || 'hermes-hexagram-glyph', width: 46, height: 54, viewBox: '0 0 46 54', fill: 'none', 'aria-hidden': 'true' },
        trigramLines(23, 4, 36, 2.8, 7, upperPattern),
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
          h(HexagramGlyph, { pattern: reading.pattern, upper: reading.upper, className: 'hermes-talisman-hex' }),
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
        h(HexagramGlyph, { pattern: reading.pattern, upper: reading.upper }),
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

    /* @qiankun-runtime */

    function apply(ctx) {
      ctx.effect(() => {
        const tag = document.createElement('style')
        tag.dataset.plugin = PKG
        tag.dataset.pluginCss = PKG + '/skin.css'
        tag.textContent = CSS + QIANKUN_CSS + ZIWEI_CSS
        document.head.appendChild(tag)
        return () => tag.remove()
      }, 'hermes-skin: skin stylesheet')

      connectModelDirectory(ctx)
      ctx.slots.inject('conversation.input.right', () =>
        ctx.slots.register({ name: 'conversation.input.right', id: 'qiankun-blessing-anchor', order: 90 }, QiankunBlessingAnchor),
      )
      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register({ name: 'shell.overlay', id: 'qiankun-blessing', order: 43 }, QiankunBlessingLayer),
      )

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
        // V3.1 · 紫微推演开关与「入盘」；自动带盘的回车监听。
        ctx.slots.register({ name: 'conversation.composer.dock', id: 'hermes-ziwei-dock', order: 22 }, ZiweiDockControls),
        ctx.slots.register({ name: 'conversation.composer.dock', id: 'hermes-ziwei-send', order: 23 }, ZiweiSendWatch),
      ])
      // V3.1 · 紫微命盘：模型名徽记 / 会话头与侧栏入口 / 命盘对话框。
      ctx.slots.inject('conversation.input.model.label', () =>
        ctx.slots.register({ name: 'conversation.input.model.label', priority: -100 }, ZiweiModelLabel),
      )
      ctx.slots.inject('conversation.session.header.utilities', () => [
        ctx.slots.register({ name: 'conversation.session.header.utilities', id: 'hermes-ziwei', order: 300 }, ZiweiHeaderButton),
        ctx.slots.register({ name: 'conversation.session.header.utilities', id: 'hermes-daily-poem' }, DailyPoem),
      ])
      ctx.slots.inject('sidebar.workspaces.session.row.action', () =>
        ctx.slots.register({ name: 'sidebar.workspaces.session.row.action', id: 'hermes-ziwei', order: 150 }, ZiweiSessionRowAction),
      )
      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register({ name: 'shell.overlay', id: 'hermes-ziwei', order: 44 }, ZiweiPanel),
      )
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
