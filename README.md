# 深度求索 · 乾坤问道（DeepSeek Hermes Skin）

给 DSH Web GUI（DeepSeek Harness）穿的一套可安装皮肤。V2 把 V1.4「太极皮肤」的静态装饰改成一套**有反馈的视觉语言**；**V3 内嵌了紫微斗数开源排盘引擎**，让「命运可见」从装饰变成可用的能力：模型名旁多了一枚「紫微」徽记与**紫微推演**模式（一键把命盘档案带进提问），**每个对话、每个工作区、每台机器**各有一张十二宫**命理盘**。

- 版本：**3.0.0**（乾坤问道 V3 = V2 视觉语言 + 紫微命理盘）
- 包名：`@local/dsh-hermes-skin`，显示名「深度求索 · 乾坤问道」
- 安装形态：一个 Cordis **client** 插件；源码在 `src/client.js`，`client.js` 是构建产物（见「引擎与构建」）
- 仓库：<https://github.com/haoyu-qi/dsh-hermes-taiji-skin>
- 设计输入：`DeepSeek_乾坤问道主题皮肤_V2优化方案_图文版.docx`（本机 `~/Downloads/`，方案未随仓库分发）；V3 命理能力的需求来自 3.0 规划：「嵌入 ziwei-doushu 项目的能力，在模型边上加一个推理的功能，给每个对话和工作区加上命理盘」

一个插件装齐：

| 模块 | 一句话 | 落点 |
| --- | --- | --- |
| **紫微推演（V3）** | 输入框上沿「紫微推演」开关 + 「入盘」按钮：把命盘档案 prepend 进草稿，交给模型推演 | `conversation.input.dock` · `ZiweiDockControls` |
| **模型名徽记（V3）** | 推演开启时模型名旁亮「紫微」金徽（单槽位，非交互） | `conversation.input.model.label` · `ZiweiModelLabel` |
| **自动带盘（V3）** | 皮肤设置新增开关：回车发送前自动把命盘档案补进草稿 | `conversation.composer.dock` · `ZiweiSendWatch` |
| **命理盘（V3）** | 十二宫命盘对话框：出生表单、四柱/五行局/命主身主、格局判定、按「本对话/本工作区/常用」三档存档 | `shell.overlay` · `ZiweiPanel` |
| **命盘入口（V3）** | 会话头「紫微命盘」按钮 + 侧栏会话行悬停「斗」按钮 | `conversation.session.header.utilities` / `sidebar.workspaces.session.row.action` |
| 思考氛围 | 四枚药丸：浅思 / 深思 / 悟道 / 自动，只改装饰密度，不改模型参数 | `conversation.input.dock` · `SkinDock` |
| 思考态 | DOM 启发式检测「正在思考」，加速八卦、点亮「推演中」、加强输入框描边 | `shell.overlay` · `ThinkingWatcher` + `html[data-hermes-thinking]` |
| 皮肤设置 | `⋯` 弹层四开关：动效 / 开机动画 / 每日卦象 / **发送自动带盘** | `SkinDock` 内的 `.hermes-skin-menu` |
| 每日占卜 | 令牌 → 起卦签牌（900ms）→ 452px 签卡 → 收下符咒（1700ms）→ 右下角今日卦象 | `shell.overlay` · `FortunePanel` |
| 开机幕 | 四段时间轴 0 / 800 / 1800 / 3000ms，4.4s 淡出、5s 移除；减动时静态 2.4s | `shell.overlay` · `BootCurtain` |
| 主界面 | 输入框细金描边与呼吸、侧栏金色选中左缘、背景题字、山水渐隐、八卦水印缩小并内置太极 | CSS + `Ambient` |
| 旧有仪式 | 回车发送太极、发送键太极、侧栏太极印、字标、箴言 | 与 V1 一致，未改行为 |

> **边界先说清楚**：V2 的氛围药丸仍是**纯视觉**的（`aria-label` 里写着「仅视觉，不改变模型推理参数」）。V3 的「紫微推演」是**真功能**，但它改变的是**草稿文本**（把命盘档案明明白白插进你将要发送的消息开头），不写任何请求参数、不修改宿主请求管线；排盘全部在本机引擎完成，零网络请求。

## 安装

1. 克隆仓库：

   ```bash
   git clone https://github.com/haoyu-qi/dsh-hermes-taiji-skin.git
   ```

2. 在 DSH 里安装这个目录（走 `plugin_manager install_bundle`，会要求一次授权）：

   > 安装插件：`/绝对路径/dsh-hermes-taiji-skin`

   本机是把该目录以 `link:` 链进 `~/.dsh/profiles/desktop` 的，两种装法等价。

3. 首次安装后退出并重开一次 DeepSeek Harness（Desktop 启动时会缓存 boot 注入）；之后修改 `src/client.js` 后跑 `npm run build` 重建 `client.js`，由 `client-hmr` 热替换，刷新页面即可看到更新。**仓库里的 `client.js` 是构建产物且已提交**，只为安装即用；日常迭代请改 `src/client.js` 再构建。

4. 停用：设置 → 插件 → 「深度求索 · 乾坤问道」停用即整体还原；也可以在 `apply()` 里删掉对应的槽位注册。

**要求**：DSH Desktop 的 Web GUI（带 Cordis 插件系统）。

**字体**：行书优先 macOS 自带 `Xingkai SC`（华文行楷），其次 `Zhi Mang Xing`（志莽行书，可选安装）、`Hannotate SC`、`Kaiti SC`；没有这些字体的系统会退到系统楷体，观感略有差异。

包名沿用 `@local/dsh-hermes-skin`（Host 空壳 + Client 半，profile 级生效；仓库根目录本身即安装包）。仓库与显示名带 Taiji/乾坤问道，安装 id 为了不打断当前 profile 里既有安装而保持不变。

## 引擎与构建（V3 新增）

「命理盘」与「推演」的排盘内核来自开源项目 [Renhuai123/ziwei-doushu](https://github.com/Renhuai123/ziwei-doushu)（MIT，基于倪海厦《天纪》体系；运行时依赖 iztro 与 lunar-javascript，同为 MIT）。

- `vendor/ziwei/`：上游 `lib/ziwei/` 的原样快照（commit `495b79e`，见 `vendor/ziwei/NOTICE.md`），**不做本地修改**；升级时整目录替换并更新 NOTICE 里的 commit 号。未包含其 app 界面、13 维解读数据集（v3/v4，56GB 级）与断语库。
- `tools/build-engine.mjs`：esbuild 把 `vendor/ziwei`（入口 `tools/engine-entry.ts`，alias 掉 Next.js 的 `server-only`）连同 iztro / lunar-javascript 打成一个 IIFE，**显式挂到 `window.__HermesZiwei__`**（顶层 `var` 在 eval / 模块作用域不会自动成为 window 属性，所以包了一层全局挂载），并带金标准自检（1990-01-01 子时男命 = 水二局 · 命主巨门）。
- `tools/build.mjs`：拼接 `ziwei-engine.iife.js` + `src/client.js` → `client.js`；`--check` 校验产物与源码一致。
- `tools/test-engine.mjs`：引擎回归（金标准、确定性、非法日期抛错、格局与摘要）。

```bash
cd hermes-skin
npm install --cache ../preview/.npm-cache   # iztro / lunar-javascript / esbuild
npm test                                    # 构建 + 引擎回归 + 产物一致性
npm run build                               # 只重建 client.js
```

`ziwei-engine.iife.js` 是中间产物（已 gitignore），引擎始终内嵌在 `client.js` 里随插件分发，宿主不需要 Node、不需要网络。

### 归属与许可

- 排盘引擎：MIT，来源 <https://github.com/Renhuai123/ziwei-doushu>（`vendor/ziwei/LICENSE.upstream`）；命盘对话框页脚保留一行来源说明。
- 引擎打包进来的 iztro（MIT）与 lunar-javascript（MIT）随包分发，许可声明见 `vendor/ziwei/NOTICE.md`。
- 上游的 13 维解读数据集（CC BY 4.0）**没有被使用**：本皮肤只用排盘 + 格局判定，解读交给当前对话里的模型。

## 紫微推演（模型边上的「推理」功能）

### 模型名旁的徽记

`conversation.input.model.label` 是**单槽位**（priority 越低越优先）。皮肤以 priority -100 接管后渲染：

```
[DeepSeek-V3.2] [1017?] [紫微]      ← 触发器 / 菜单当前行 / 模型选项三处共用
```

- 官方 `ui-deepseek-model-label-1017` 包同槽位（priority 0）会被遮住；皮肤按其公开口径**复刻了同一颗 1017 角标**（provider ∈ {deepseek-official, deepseek-account} 且 model.id=deepseek-flash 且目录名恰为 `DeepSeek-V4.1-Flash`），保证接管后官方观感不丢失。上游若改口径，停用皮肤即整体还原。
- 槽位契约要求**非交互**，徽记只是状态显示；开关本体在输入框上沿。

### 推演模式与「入盘」

1. 输入框正上方、思考氛围药丸条旁边多一组「紫微推演」胶囊。点亮后：
   - 模型名旁亮「紫微」金徽（只对本对话生效，键 `hermes-ziwei-mode:s:<sessionId>`）；
   - 胶囊旁出现「**入盘**」按钮：把当前命盘档案以 `【紫微命盘·本对话】…【/紫微命盘】` 块**prepend 进草稿**，档案含公历/农历四柱、五行局、命主身主、十二宫星曜亮度四化、大限与格局。再次入盘会**替换**旧档案块，不叠加。
   - 没有生辰时点「入盘」直接打开命盘对话框并聚焦出生表单。
2. 草稿是明文可见的：你看到什么，模型就读到什么；删掉档案块再发送即回到普通对话。
3. 皮肤设置（`⋯`）新增第四开关「**发送自动带盘**」（默认关）：打开后，在推演模式开启、草稿非空且尚未带盘时，**回车发送前**自动补一次档案（capture 阶段监听，先于宿主键位表写入 Lexical 编辑器）。只拦回车路径，不拦发送按钮——想保证带上档案就点「入盘」。

## 命理盘（每个对话、每个工作区）

### 归属与解析链

出生信息（公历年月日时分 + 性别 + 可选姓名）按三档存 `localStorage`：

| 归属 | 键 | 生效范围 |
| --- | --- | --- |
| 本对话 | `hermes-ziwei-birth:s:<sessionId>` | 仅该会话 |
| 本工作区 | `hermes-ziwei-birth:w:<workspaceId>` | 该工作区里的会话（作兜底） |
| 常用 | `hermes-ziwei-birth:default` | 全局兜底 |

解析链固定为 **本对话 → 所属工作区 → 常用**：在会话头/侧栏行打开时自动带出最近一档已存的生辰，换个会话不用重填。工作区归属用宿主 `useWorkspaces` 快照解析（`workspaces.items.find(w => w.sessionIds.includes(sessionId))`，与宿主同口径）；解析失败只是少一档兜底，不影响其它功能。

### 对话框

会话头「紫微命盘」按钮或侧栏会话行悬停「斗」按钮打开（Esc / 点背景 / 「收起」关闭，焦点管理与签卡一致：自动聚焦、Tab 卡内循环、关闭后归还）：

- **出生表单**：姓名（可选）/ 年 / 月 / 日 / 时 / 分 / 性别，实时排盘；钟点按「23 点后归次日早子时」换算，表单下方实时显示对应时辰。
- **十二宫盘面**：传统 4×4 布局（上巳午未申、左辰卯寅、右酉戌亥、下寅丑子亥），命宫金框、身宫紫框；每宫宫名 + 地支 + 大限 + 主星（亮度小字）+ 辅/吉/煞星与四化色标（禄金/权朱/科紫/忌墨），空宫标注借对宫星。
- **中心摘要**：姓名性别、公历（含时辰）、农历 + 四柱、五行局、命主身主、命宫身宫落点、格局 chips（格局判定来自上游 1100+ 行规则库，级别 excellent/caution 分色，悬停见释义）。
- **页脚**：来源与免责一行（MIT 引擎 + 生辰只存本机 + 仅供文化参考）；按钮「入盘」（本对话页签才有）/「保存生辰」（存到当前页签的归属键）/「收起」。
- 生辰非法（如 2 月 30 日）引擎直接抛错，表单给出红条提示——上游 2026-10-03 起拒绝不存在的公历日期，本皮肤原样透传。

## 视觉系统

### 色板

方案给了六色，实现落点如下（浅色主题；深色「玄夜」用同一套语义令牌的另一组值）：

| 方案色 | 方案值 | 实现值与落点 | 状态 |
| --- | --- | --- | --- |
| 宣纸白 | `#F8F5EE` | `--dsw-alias-bg-base`（light） | 一致 |
| 暖米白 | `#F0EADF` | 侧栏实际用 `--dsw-specific-sidebar-fill: #F3EDE2`；层-2 `#F4EEE4`、气泡 `#F0E7D8` 也在同一色域，但 `#F0EADF` 没有逐字使用 | 近似 |
| 香槟金 | `#B58A43` | `--hermes-gold`（light）；UI 描边/焦点多用 `color-mix(in srgb, var(--hermes-gold) 26%~62%, …)`，很少整块铺满。11–13px 的小号金文字（今日占卜、签级、收下按钮）改用 `--hermes-gold-strong`（浅 `#8F6C2C` / 深 `#D9BE86`）保证 AA 对比度。V3 命盘的四化色标、格局 chips、模型徽记同走这套金/朱/紫/墨语义 | 一致 |
| 墨紫黑 | `#383344` | `--hermes-ink`（图形、题字、太极、符咒墨色）；**正文/标题**仍是 V1 的 `--dsw-alias-label-primary: #3A3342` | 近似 |
| 辅助灰紫 | `#766D7C` | `--dsw-alias-label-secondary`、`--hermes-art` | 一致 |
| 朱砂红 | `#A64B3C` | 签牌朱印（`#A64B3C` 直写）、符咒、`--dsw-alias-state-error-primary` 色域；V3 命盘「权」四化与煞星也用这一族 | 一致 |

深色主题「玄夜」：底 `#141118`、层-1 `#1C1822`、墨色 `#EFE6F2`、金 `#D9BE86`、正文 `#EFE9F1`、辅助 `#B7ACC0`。两套色板都通过 `ctx.theme.overrideTokens` 叠加（107 个 token，含 `--dsw-alias-*`、`--dsw-specific-*`、`--shiki-token-*` 与皮肤自用的 `--hermes-*`），跟随「设置 → 通用 → 外观」的浅色/深色/跟随系统，不强制改用户偏好。

小字与控件的对比度约定：小号金文字用 `--hermes-gold-strong`；页脚说明（每日一签 · 图个心安）用 `--dsw-alias-label-tertiary`；未选中的药丸、齿轮与卦象 `×` 用 `--dsw-alias-label-secondary`（比 tertiary 深一档，避免 10–11px 发灰）。

### 字体：两套规则，别越界

- **UI 一律系统无衬线**（`--dsw-font-family`：`-apple-system` / `PingFang SC` / `system-ui`）。药丸、菜单、按钮、日期、解签正文、命盘星曜列表都用它。
- **宋体 `SERIF` 只用于品牌与仪式**：`深度求索` 字标、签卡卦名、「收下/入盘/保存」按钮、符咒「敕令」、今日卦象签，以及 V3 的「紫微命盘」标题、宫名、命主姓名与「斗」字钮。
- **行楷 `BRUSH` 只用于纯装饰书法**：开机幕四句、背景题字。

不要把 14px 级正文或菜单换成衬线/书法字体——会发虚，方案里也明确要求「书法仅用于标题和仪式文案」。

## 思考氛围（四档药丸）

### 位置与 DOM

`SkinDock` 挂在 `conversation.input.dock`（order 20），落成 `.hermes-skindock`，位于输入框**正上方**；V3 起同一行还有「紫微推演」胶囊条（`.hermes-ziwei-bar`，见上文）；箴言仍由 `conversation.composer.dock` 挂在输入框下沿：

```
.hermes-skindock（输入框正上方）
├─ .hermes-depthbar        role="group" aria-label="思考氛围（仅视觉，不改变模型推理参数）"
│  ├─ button.hermes-mode-pill[data-mode=light|balanced|immersive|auto][aria-pressed]
│  ├─ span.hermes-thinking （思考中；role="status"，三点 + 「推演中」）
│  ├─ button.hermes-skin-gear（「⋯」）→ .hermes-skin-menu（四开关）
└─ .hermes-ziwei-bar       role="group" aria-label="紫微推演：把当前对话的命盘档案带入提问"
   ├─ button.hermes-ziwei-pill[aria-pressed]（紫微推演）
   └─ button.hermes-ziwei-load（入盘 / 已入盘，推演开启时出现）

.hermes-motto（输入框下沿）  ✦ 命运可见 · 智慧可行 · 自在而生
```

药丸条与紫微条都是 `padding:3px`、`border-radius:999px`、金 26% 描边、`backdrop-filter: blur(8px)`；选中态金 17% 底 + 内描边 + 点状金点。

### 四档到底改了什么

档位只写 `<html data-hermes-depth>`，由 CSS 变量切换装饰密度；**没有任何 JS 去改模型或请求**。

| 档位 | 药丸 | `data-mode` | 八卦水印不透明度 | 八卦旋转 | 星点 | 背景题字 | 山水 | 输入框 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 淡雅 · 浅思 | 浅思 | `light` | `.13` | 静止（`animation:none`） | 隐藏（`display:none`） | `.62` | `.07` | 基础细金描边，无呼吸 |
| 平衡 · 深思 | 深思 | `balanced` | `.25` | 150s 一圈 | `.5` | `.9` | `.10` | 金色 34% 描边 + 7.5s 呼吸 |
| 沉浸 · 悟道 | 悟道 | `immersive` | `.34` | 80s 一圈 | `.78` | `1` | `.13` | 金色 52% 描边 + 外发光 + 内金环 + 5.5s 呼吸 |
| 自动 | 自动 | `auto` | 空闲 `.25`；思考中 `.34` | 空闲 150s；思考中 80s | 空闲 `.5`；思考中 `.78` | 空闲 `.9`；思考中 `1` | 空闲 `.10`；思考中 `.13` | 空闲同深思；思考中同悟道 |

对应 CSS 变量（都在 `html[data-hermes-depth="…"]` 块里声明，改这里即可全局生效）：

| 变量 | 浅思 | 深思 | 悟道 | 自动（空闲 → 思考） |
| --- | --- | --- | --- | --- |
| `--hermes-orb-opacity` | .13 | .25 | .34 | .25 → .34 |
| `--hermes-orb-spin-duration` | `0s`（并 `animation:none`） | `150s` | `80s` | 150s → 80s |
| `--hermes-star-opacity` | `0`（且 `display:none`） | .5 | .78 | .5 → .78 |
| `--hermes-inscription-opacity` | .62 | .9 | 1 | .9 → 1 |
| `--hermes-ridges-opacity` | .07 | .10 | .13 | .10 → .13 |

额外的层次：

- 悟道档给水印加一圈缓慢收放的**光晕**（`.hermes-ambient-orb::after`，`hermes-orb-halo` 6s）。
- 自动档的「思考 = 沉浸」由 `html[data-hermes-depth="auto"][data-hermes-thinking="on"]` 这一条选择器完成，不需要 JS。
- 思考中会把水印投影从 34px 放到 48px 金 28%；内圈旋转压到 **28s**（`--hermes-orb-thinking-spin`，深思/悟道/自动档生效，浅思档内圈本就是 `animation:none`）。

**持久化**：`localStorage["hermes-depth"]`，默认 `balanced`；读到未知值也退回 `balanced`；改动会同步到 `<html data-hermes-depth>`。

**注意**：沉浸档/自动档在思考中会增加光晕和描边，但「自动」并不感知任务复杂度——它唯一的状态源就是下面的 thinking 启发式。想让它真正绑定模型推理档位，得等宿主提供正式的能力信号，本皮肤不会伪造。

## 思考态：「推演中」

### 检测（DOM 启发式）

`ThinkingWatcher` 挂在 `shell.overlay`（order -20），`isThinkingNow()` 依次看三组信号：

1. `[data-slot="conversation.composer.bar"]` 内是否存在
   `button[aria-label*="停止"]`、`button[title*="停止"]`、`button[aria-label*="中止"]`、`button[title*="中止"]`、`[data-state="running"]` 或 `[data-generating="true"]`；
2. 否则看 `[role="status"]` 或 `[aria-live="polite"]` 的可见文本是否匹配 `思考中|正在思考|推理中|生成中`；
3. 用 `MutationObserver` 监听 `body`（`childList`+`subtree`+`characterData`，属性只过滤 `aria-label`/`title`/`data-state`/`data-generating`/`class`），**160ms 节流**后重算。

结果写两处：`<html data-hermes-thinking="off|on">` 与 `window` 上的 `CustomEvent("hermes-skin:thinking", { detail: { thinking } })`。组件卸载时删除该属性并断开 observer。

### 界面反馈

- `.hermes-thinking` 药丸：金色 10px、字距 `.18em`，三个 3px 圆点以 `hermes-thinking-wave` 1.2s 错峰（0 / .16s / .32s），带 0.3s 入场。
- 八卦水印内圈 28s（浅思档不转，除外）、投影 48px 金 28%。
- 输入框：`html[data-hermes-thinking="on"]` 下描边金 24%、外发光 30px，自动/沉浸档再叠 52% 金边。
- 动效关时三个点不再跳动（`animation:none`）。

**这是启发式，不是契约**：DSH 改 composer 结构、换停止按钮文案、或状态文案改成英文，都可能漏判/误判；误判只会多点一支「推演中」，不影响任何功能。预览里用 `?thinking=1` 模拟（外壳注入停止按钮与「思考中」状态行），不是真实生成。

## 皮肤设置（⋯ 弹层）

`.hermes-skin-gear`（20px，`⋯`，`aria-expanded`）展开 `.hermes-skin-menu`：绝对定位在药丸条上方（`right:0; bottom:calc(100% + 10px)`），宽 196px，带向上小三角；`role="group"` + `aria-label="皮肤设置"`，标题「乾坤问道 · 皮肤」，下面四行 `button.hermes-skin-toggle[role="switch"][data-flag=…]`，右侧是 `[data-track]` 自绘开关。点外部（`pointerdown`）或按 Esc 关闭；齿轮自身的 `pointerdown` 会 `stopPropagation`，所以再点一次齿轮也能收起。

| 行 | `data-flag` | localStorage | 默认 | 关掉之后 |
| --- | --- | --- | --- | --- |
| 动效 | `motion` | `hermes-motion` = `on`/`off` | on | `<html data-hermes-motion="off">`：八卦/星点/光晕/输入框呼吸/思考点/药丸过渡全部停；签卡、遮罩、符咒、卦象、发送太极、签牌与金尘的动画也停，**起卦整段直接跳过**；符咒静态出现后按 1.7s 定时卸载；开机幕转静态 2.4s |
| 开机动画 | `boot` | `hermes-boot-play` = `on`/`off` | on | 下次载入不再放开机幕（本会话正在播的不会被打断） |
| 每日卦象 | `daily` | `hermes-daily` = `on`/`off` | on | 侧栏「占卜」令牌不再渲染；签卡、右下角卦象一并隐藏；本地 `hermes-fortune-day` 保留 |
| 发送自动带盘（V3） | `ziweiAuto` | `hermes-ziwei-auto` = `on`/`off` | **off** | 回车发送不再自动补命盘档案；「入盘」按钮不受影响 |

四个开关一起写 `localStorage`，并广播 `hermes-skin:settings` 与 `hermes-ziwei:change` 事件；`applyRootSettings()` 把 `data-hermes-depth` / `data-hermes-motion` 同步到 `<html>`。

注意：**动效关与系统「减少动态效果」都会跳过起卦**，差别在细节：动效关停掉动画但保留 900ms 的落卡定时与 1.7s 的符咒定时（符咒静止出现/卸载）；`prefers-reduced-motion` 下起卦层直接 `display:none`，符咒退化为 700ms 纯淡入淡出、签卡与卦象无入场动画。V3 命盘的宫格入场动画同样跟随这两条降级路径（`.hermes-ziwei-cell` 动画在 `prefers-reduced-motion` 下由既有媒体查询统一停用）。

## 今日占卜（V2 重塑）

### 入口

「深度求索」字标右侧一枚竖排**令牌** `.hermes-fortune-trigger`：17×24px、上圆下平、双金线框、顶部穿绳孔，`占`/`卜` 两字 8px 竖刻。`role="button"`、`tabIndex=0`，Enter/Space 可开；`aria-label="今日运势 · 占卜"`。每日卦象关掉时整枚令牌不渲染。

### 签卡

- 遮罩 `.hermes-fortune`：`fixed`、`z-index:8600`、`rgba(20,17,24,.4)` + `blur(2px)`；点背景关闭，Esc 关闭。
- 卡 `.hermes-fortune-card`：`width:min(452px, 100vw - 32px)`、`max-height:calc(100vh - 40px)`、18px 圆角、香槟金 58% 外框 + `inset 7px` 的第二道细金线，宣纸渐变纸面，`role="dialog" aria-modal="true" aria-label="今日运势"`，入场 `hermes-fortune-rise` 360ms。
- 纸面装饰 `.hermes-fortune-art`（opacity .6）：右上八卦水印环、底部两道水墨山脊 + 一线金水、左上松枝。
- 内容自上而下：`今日占卜` + 日期 → 三爻卦象 → 卦名 → 签级 → 两句签诗 → 菱形分隔线 → 解读 → 宜/忌 → `每日一签 · 图个心安` + 「收下」。

### 流程与时间

| 阶段 | 画面 | 时长 |
| --- | --- | --- |
| 起卦 | 签牌从右下浮起、翻转、定到中央，6 粒金色微尘 | `900ms` |
| 显卦 | 签牌退场，签卡升起 | 360ms 入场 |
| 解卦 | 静态阅读；Esc 或点背景收起 | — |
| 收签 | 朱砂符咒落下、停住、飞向右下 | `1700ms`（定时卸载） |
| 留签 | 右下角「今日卦象」小签（六爻、卦名、签级、`›`、`×`） | 入场延迟 1020/720ms |

- 同一天内反复点令牌结果固定：`fortuneOfDay()` 用 `YYYYMMDD` 做 seed 取模，8 支签中取一支。
- **持久化与跨日**：收下时写 `localStorage["hermes-fortune-day"] = YYYY-M-D`；刷新后若仍是当天则恢复小签；每 60s 轮询一次，跨日即清。`×` 清空该键。

## 开机动画

四拍时间轴 `hermes-boot--s0/s1/s2/s3`（混沌初开 → 太极初生 → 八卦归位 → 万象归一），0/800/1800/3000ms，4.4s 淡出、5s 卸载；四句行书（躲天意/顺天意/一朝悟道/世间枷锁）按 1750–2650ms 依次扫入。跳过：点按任意处、Esc 或 Enter（空格不参与）。只在每次页面载入播一次（`sessionStorage` + 模块级标记，client-hmr 热替换不重播）。动效关或 `prefers-reduced-motion` → 静态版 2400ms。

## 主界面抛光

- **输入框**：1px 金 34% 细描边、18px 圆角、`0 18px 46px -20px` 墨色柔影；聚焦金 62% + 3px 光环；深思/自动空闲 7.5s 呼吸，悟道/自动思考 5.5s 呼吸。
- **侧栏选中**：金色 15% 横向渐变 + 2px 金色内左缘。
- **背景题字/山水/八卦水印**：与 V2 一致（题字 `top:clamp(64px,11vh,124px); left:clamp(300px,26vw,520px)`，水印 `min(540px,42vw,60vh)` 内置小太极）。
- **字标与箴言**：`深度求索`/`DEEPSEEK` 双行锁定 + 占卜令牌；`✦ 命运可见 · 智慧可行 · 自在而生`。

## 与官方外壳的边界

V3 只在**新增槽位**上挂组件、只写**草稿文本**，以下是**故意不动**的：

- **模型选择行为**：`conversation.input.model`（选择器本体）不接管；`model.label` 只改标签展示，选择/请求逻辑仍是官方的。
- **请求管线**：不 fetch、不写请求参数、不接宿主事件；「推演」改变的是用户可见的草稿。
- **空白会话 hero 文案 / DOM**：不改官方节点，只注入 1 个 `<style>`、覆盖令牌、按槽位渲染组件。

槽位注册（`apply()`）：

| 槽位 | id / priority | order | 组件 |
| --- | --- | --- | --- |
| `shell.overlay` | `hermes-thinking` | -20 | `ThinkingWatcher`（无渲染） |
| `shell.overlay` | `hermes-ambient` | -10 | `Ambient` |
| `shell.overlay` | `hermes-fortune` | 40 | `FortunePanel` |
| `shell.overlay` | `hermes-ziwei` | 42 | `ZiweiPanel`（V3 命盘对话框） |
| `shell.overlay` | `hermes-send-taiji` | 45 | `SendTaijiOverlay` |
| `shell.overlay` | `hermes-boot` | 50 | `BootCurtain` |
| `conversation.input.dock` | `hermes-depthdock` | 20 | `SkinDock`（药丸条 + 紫微推演条 + 设置菜单） |
| `conversation.composer.dock` | `hermes-motto` | 20 | `Motto` |
| `conversation.composer.dock` | `hermes-send-taiji` | 21 | `SendTaijiTrigger` |
| `conversation.composer.dock` | `hermes-ziwei-send` | 22 | `ZiweiSendWatch`（回车自动带盘，V3） |
| `conversation.input.model.label` | priority -100（单槽） | — | `ZiweiModelLabel`（V3） |
| `conversation.session.header.utilities` | `hermes-ziwei` | 300 | `ZiweiHeaderButton`（V3） |
| `sidebar.workspaces.session.row.action` | `hermes-ziwei` | 150 | `ZiweiSessionRowAction`（V3） |
| `conversation.hero.brand.mark` | priority -100 | — | `NoHeroMark`（返回 null） |
| `sidebar.brand.mark` | priority -100 | — | `TaijiMark` |
| `sidebar.brand.name` | priority -100 | — | `BrandName`（字标 + 令牌） |

侧栏两个单槽位由官方品牌包以 priority 0 占用；单槽位规则是「priority 越低越优先」。V3 的 `model.label` 同理以 -100 接管（并复刻 1017 角标，见上）。

## 键位、缓存与自定义

| 存储 | 键 | 值 | 说明 |
| --- | --- | --- | --- |
| localStorage | `hermes-depth` | `light`/`balanced`/`immersive`/`auto` | 默认 `balanced` |
| localStorage | `hermes-motion` / `hermes-boot-play` / `hermes-daily` | `on`/`off` | 默认 on |
| localStorage | `hermes-ziwei-auto` | `on`/`off` | 发送自动带盘，默认 **off** |
| localStorage | `hermes-ziwei-mode:s:<sessionId>` | `on`/`off` | 推演模式，按对话；无会话时读 `hermes-ziwei-mode:default` |
| localStorage | `hermes-ziwei-birth:s/w:<id>` / `:default` | JSON `{name?,year,month,day,hour,minute,gender}` | 三档生辰（钟点制，23 点自动归次日） |
| localStorage | `hermes-fortune-day` | `YYYY-M-D`/空串 | 收下时写；`×` 清空；跨日失效 |
| sessionStorage | `hermes-boot` | `Math.round(performance.timeOrigin)` | 本页已开场标记 |
| `<html>` | `data-hermes-depth` / `-motion` / `-thinking` | — | CSS 与预览脚本钩子 |
| window 事件 | `hermes-skin:settings` / `hermes-skin:thinking` | — | 设置 / 思考态广播 |
| window 事件 | `hermes-ziwei:change` / `hermes-ziwei:open` | — | V3：模式/生辰/insert 指令 / 打开命盘指令 |

常用调参位置（都在 `src/client.js`）：

| 想改 | 改哪里 |
| --- | --- | --- |
| 命盘档案文本 | `ziweiDigest()`（每宫一行，`【紫微命盘…】` 标记与 `stripZiweiDigest` 配套） |
| 生辰解析链 | `sessionBirthChain()` / `resolveZiweiBirth()` |
| 钟点→时辰换算 | `clockToChartBirth()`（23 点换日规则） |
| 盘面布局 | `ZIWEI_GRID_BRANCHES`（4×4 地支矩阵） |
| 引擎导出面 | `tools/engine-entry.ts` |
| 引擎版本 | `vendor/ziwei/`（整目录替换 + 更新 NOTICE commit 号 + `npm test` 金标准） |
| 档位/水印/起卦/开机 | 同 V2（`html[data-hermes-depth]` 块、`FortunePanel` 定时器、`BOOT_*`） |
| 移除某块 | 删掉 `apply()` 里对应槽位注册 |

## 核验

以下是**本次 V3 提交时实际跑过**的（2026-11-02）：

1. `cd hermes-skin && npm test` → 构建通过；`tools/test-engine.mjs` 引擎回归全过（金标准 1990-01-01 子时男 = 水二局·命主巨门·农历己巳年腊月初五；女命口径；同输入恒同输出；2026-02-30 抛 RangeError；格局含府相朝垣；命宫摘要可用）。
2. `node --check client.js` → 通过；当前产物 sha256 `528cf63b4427b63331a016b962a2b37568f4bfe806ea87c77f495440b88a0c01`（1,077,897 bytes = 引擎 919,201 + 源码 158,579）；`tools/build.mjs --check` 确认产物与源码一致。
3. **预览构建与截图**：浅/深两套各 27 张、`blankScreenshots: []`、`consoleErrors: 0`、`pageErrors: 0`、`notes: []`；两套 `report.json` 的 `ziwei` 段均为 `engine: true, cells: 12, centerJu: "水二局 · 命主 巨门 · 身主 天机", chips: 3, tabs: [本对话, 本工作区, 常用], birthPersisted: true, modePersisted: "on", modelBadge: "紫微", draftHasDigest: true`。新增截图：`ziwei-panel.png`、`closeup-ziwei-board.png`、`closeup-model-label.png`、`ziwei-loaded-draft.png`（深色同名）。
4. **交互验收** `cd preview && node verify.mjs` → 退出码 0、**84 项全过**（V2 全量 + V3 新增 20 项）：引擎金标准、ziweiAuto 开关写键、命盘 12 宫/中心摘要/三页签、非法日期报错与恢复、三档生辰分别落键、Esc 收起、侧栏行「斗」按钮开盘、推演开关持久化、模型徽记、入盘（含重复入盘不叠加）、回车自动带盘（合成 keydown 命中 capture 监听）、推演关闭后回车不改写、深色 12 宫。
5. **没有核验的**：真实 DSH 宿主里的槽位挂载与 `client-hmr`（本轮用仿制外壳；V1 当时宿主结论见旧 README，V2/V3 未重跑）；真实模型生成中的思考态与真实 Lexical 编辑器上的回车自动带盘时序（预览用假 input store + 合成事件验证监听与写入逻辑，真实宿主首跑请先点「入盘」确认）；上游 1017 角标包在真实宿主里的并存观感（按公开口径复刻，未实测双包切换）。

> 预览产物只在本机用于迭代，不入仓库；改了 `src/client.js` 或 `preview/` 脚本后，请重跑 `npm run build`（hermes-skin）与 `node shot.mjs` / `node shot.mjs --theme=dark` / `node verify.mjs`（preview），并以新的 `clientSha` 为准。

## 现在应该看到

1. **启动/刷新**：V2 四拍开机照旧；输入框正上方多了一组「紫微推演」胶囊（默认未点亮）。
2. **会话头右侧**：「斗 · 紫微命盘」按钮；侧栏会话行悬停出现「斗」小按钮。点开 → 880px 命盘对话框：出生表单、十二宫（命宫金框、四化色标）、中心四柱/五行局/格局 chips。
3. **点「紫微推演」**：模型胶囊里的模型名旁亮起金色「紫微」徽记；旁边多出「入盘」按钮。
4. **点「入盘」**：草稿开头多出 `【紫微命盘·本对话】…【/紫微命盘】` 档案块（再次入盘会刷新不叠加）；开启「发送自动带盘」后，回车发送前自动补块。
5. V2 全部行为不变：四档氛围、推演中、每日占卜、符咒卦象、深色玄夜。

## 已知限制

1. **`model.label` 单槽位接管**：皮肤会遮住官方 `ui-deepseek-model-label-1017` 的角标，已按其公开口径复刻；上游口径变化时本皮肤的复刻不会自动跟随（停用皮肤即还原官方）。
2. **自动带盘只拦回车**：发送按钮、语音输入、队列补发等路径不自动补块；且 capture 写入依赖宿主在键位表里读到更新后的编辑器内容——真实宿主首跑请用「入盘」验证。合成输入法（isComposing/229）不触发。
3. **排盘口径**：引擎为上游快照（正月初一换年、闰月默认月中分界、亮度全书派）；上游改口径需手动升级 vendor 目录。六亲相关论断上游即自认偏弱，模型解读请在文化参考语境使用。
4. **思考检测仍是 DOM 启发式**；氛围药丸仍是纯视觉；「自动」只跟随思考态，不感知任务复杂度。
5. **没有按档位的粒子/光效风暴**；开机是「每页载入一次」；低性能自适应未实现（只有动效关与系统减动两条路径）。
6. **状态都在本机浏览器**：生辰、推演开关、卦象都不跨设备同步；隐私模式写失败退回默认。跨时区「今天」以本机为准。
7. **点按目标偏小**：药丸 18.5px、齿轮 20px、占卜令牌 17×24、侧栏「斗」钮 22×22，低于 WCAG 2.5.8 的 24×24；保持克制未扩热区。
8. **色板两处与方案不逐字一致**（正文 `#3A3342`、侧栏 `#F3EDE2`）；11–13px 小金字统一用 `--hermes-gold-strong` 保 AA。
9. **依赖官方 DOM/槽位契约**：`model.label` 的 ownerProps（provider/model/placement/selected）、`session.row.action` 的 `{sessionId, displayTitle}`、`useWorkspaces` 快照形状、composer bar 的 `data-slot` 选择器——DSH 改版时要同步。
10. **回车发送太极与真实宿主未核验**（预览无真实 `useInput` 供 V2 触发器使用；V3 的假 store 只覆盖皮肤自身逻辑）。

## 许可

[MIT](LICENSE) © 2026 Qijinchun (haoyu-qi)

字体不随仓库分发，只通过 `font-family` 引用系统已安装的字体；仓库里的 SVG、图形与文案均为本项目原创。**内嵌的紫微排盘引擎及其打包依赖另有归属**：引擎 MIT © Renhuai123/ziwei-doushu（`vendor/ziwei/LICENSE.upstream`），iztro / lunar-javascript 亦为 MIT（`vendor/ziwei/NOTICE.md`）。
