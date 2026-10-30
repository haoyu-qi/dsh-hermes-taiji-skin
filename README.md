# 深度求索 · 皮肤（DeepSeek Skin）

给 DSH Web GUI 自己穿的一套皮肤：把参考图里的「月华白 / 曜金 / 烟紫 / 云藤紫 / 墨岩灰」、太极、八卦、星轨与山水，落成可安装的 Cordis 插件。启动时先落一张五秒钟的开场：中间八卦，上下左右四句行书。

一个插件装齐全部视觉：**五秒开机动画**（中央先天八卦盘 + 上/下/左/右四句行书）、**回车发送时的一记太极**、月华白/曜金/烟紫双主题、侧栏太极印、背景题字与山水星轨。

> 仓库：<https://github.com/haoyu-qi/dsh-hermes-skin>

## 安装

1. 克隆仓库：

   ```bash
   git clone https://github.com/haoyu-qi/dsh-hermes-skin.git
   ```

2. 在 DSH 里安装这个目录（走 `plugin_manager install_bundle`，会要求一次授权）：

   > 安装插件：`/绝对路径/dsh-hermes-skin`

   本机是把该目录以 `link:` 链进 `~/.dsh/profiles/desktop` 的，两种装法等价。

3. 首次安装后退出并重开一次 DeepSeek Harness（Desktop 启动时会缓存 boot 注入）；之后修改 `client.js` 由 `client-hmr` 热替换，刷新页面即可看到更新。
4. 停用：设置 → 插件 → 「深度求索 · 皮肤」停用即整体还原，也可在 `apply()` 里删掉对应槽位注册。

**要求**：DSH Desktop 的 Web GUI（带 Cordis 插件系统）。

**字体**：行书优先 macOS 自带 `Xingkai SC`（华文行楷），其次 `Zhi Mang Xing`（志莽行书，可选安装）、`Hannotate SC`、`Kaiti SC`；没有这些字体的系统会退到系统楷体，观感略有差异。

包名：`@local/dsh-hermes-skin`（Host 空壳 + Client 半，profile 级生效；本仓库根目录本身即安装包）。

## 视觉系统

| 元素 | 色值 | 落点 |
| --- | --- | --- |
| 月华白 | `#F8F4EC` / 卡片 `#FDFAF4` | `--dsw-alias-bg-base`、各层表面 |
| 曜金 | `#B08A46` | 品牌印记、焦点环、发送键、发丝线 |
| 烟紫 | `#8E7FA8` | 链接、思考中、次级星芒 |
| 云藤紫 | `#72618C` | 链接与深潜标签的可读色 |
| 墨岩灰 | `#3A3342` | 正文、主按钮、太极印 |

暗色主题「玄夜」使用同一套语义令牌的另一组值：墨底 `#141118`、月金 `#D9BE86`、浅檀 `#E9DCC0`。两套色板都通过 `ctx.theme.overrideTokens` 叠加，跟随「设置 → 通用 → 外观」的浅色/深色/跟随系统，不强制改用户的主题偏好。

## 落到界面上的东西

- **主题令牌**：约 90 个 `--dsw-alias-*` / `--dsw-specific-*` / `--shiki-token-*` 覆盖，含发丝线、悬停、代码块、滚动条、状态色、菜单材质。
- **太极印**：侧栏品牌位（24px）的 SVG；外圈曜金，阴阳随主题换墨/月白。空白会话标题前不再放太极印（空占位留白）。
- **八卦星轨**：整框右上角有一枚 22% 不透明度的八卦星轮水印。
- **五秒开机动画**：每次启动或刷新页面，先落一张满屏月华白开场——正中先天八卦盘：曜金外环、点线环、八组三爻（乾上、巽右上、坎右、艮右下、坤下、震左下、离左、兑左上）、八枚小菱形星点，以及带金环的墨/月白太极；八卦环在五秒内匀速转进 45°。上、下、左、右四向是同一墨色的行书毛笔字：
  - 上：躲天意，避因果，诸般枷锁困真我；
  - 下：顺天意，承因果，今日方知我是我；
  - 左：一朝悟道见真我，何惧昔日旧枷锁；（竖排）
  - 右：世间枷锁本是梦，无形无相亦无我。（竖排）
  四句按「上 → 下 → 左 → 右」依次以笔锋扫入（横向自左而右、竖排自上而下，起笔带一点虚焦），第 4.4 秒整幅淡出，5 秒整移除。点按任意处或 Esc／Enter 可提前跳过（空格不参与，也不会再误触）；`prefers-reduced-motion` 下不转不扫，只静态停留五秒。
- **发送太极**：只有在 composer 里按回车、且草稿非空并被真正提交清空时，frame 中央才闪一记太极——0.15s 内浮起，八卦环转 150°，1.3s 内上浮淡出；`pointer-events: none`，不挡任何操作。空格输入、Shift+Enter 换行、空草稿回车、点发送按钮都不会触发。
- **山水**：底部 9% 不透明度的水墨山脊与一线金水。
- **背景题字**：整页背景画正中，两列竖排行书——右起 `天行健，君子以自强不息`，左为 `地势坤，君子以厚德载物`；字号 `clamp(20px,4.5vh,44px)`、字距 `.16em`，墨色约 15%（深色约 18%），浮在八卦星轮与山水之上、随主题换墨，指针穿透。
- **箴言**：输入框下方 `✦ 命运可见 · 智慧可行 · 自在而生`。
- **字标**：`深度求索`（宋体）／`DEEPSEEK` 两行锁定。
- 尊重 `prefers-reduced-motion`：星轨、呼吸、闪烁全部停止。

## 核验

- `node --check client.js`、`index.js` 通过；`package.json` / locale JSON / icon SVG 均可解析。
- Host bundle 安装结果：`application: applied`，Loader 条目 `include:hermes-skin` 为 `active`。
- **Desktop 的启动图在应用启动时冻结**（Electron 主进程缓存 `boot injections`），首次安装后需要退出并重新打开 DeepSeek Harness 一次，Client 半才会挂载；之后修改 `client.js` 会由 `client-hmr` 热替换，无需再次重启。
- 侧栏单槽位：本包以 `priority: -100` shadow 官方品牌（官方 priority 0 显示 inactive）；`conversation.hero.brand.mark` 也以 `-100` 注册了一个返回 `null` 的占位，因此空白会话标题前不再出现任何太极印。
- 活体槽位：`conversation.composer.dock` 中 `hermes-motto`（order 20）与 `hermes-send-taiji`（order 21）均为 `active`；`shell.overlay` 中 `hermes-ambient`（order -10，内含中央背景题字）、`hermes-send-taiji`（order 45）与 `hermes-boot`（order 50）均为 `active`。
- 静态核验：以 `vm` + 伪 `React`/`document`/伪定时器触发 `apply()` 并渲染——`BaguaPlate` 输出 8 组三爻（每组 3 根）+ 8 枚菱形星点 + 太极金环；开机生命周期 0s 入场、4.4s 切淡出、5.0s 返回 `null`；发送太极只在「回车 + 草稿非空 + 随后草稿清空」时出现，空格、Shift+Enter、空草稿回车均为 `null`，1.5s 后自动收起；样式表花括号闭合、`${BRUSH}` 已内联。
- 视觉核验：本机没有浏览器控制能力，无法截图；以实际界面为准。

## 现在应该看到

1. 启动或刷新页面：先落五秒开机动画——正中先天八卦盘，八卦环缓转 45°，上/下/左/右四句行书依次扫入，4.4 秒开始淡出、5 秒整消失；点按任意处或 Esc／Enter 可提前跳过，空格不会触发。
2. 侧栏左上角：曜金细环的太极印 + 宋体「深度求索 / DEEPSEEK」字标。
3. 新建会话标题前：不再有太极印，只留标题与留白。
4. 输入框里打一句话、按回车发送：屏幕中央会闪一记八卦太极（约 1.3 秒），然后消失；打字时空格/换行/点发送按钮都不闪。
5. 输入框下沿：`✦ 命运可见 · 智慧可行 · 自在而生`。
6. 页面中央背景：极淡的两列竖排行书——右列 `天行健，君子以自强不息`，左列 `地势坤，君子以厚德载物`——作为整页背景画的一部分。
7. 整体：月华白纸面、墨色主按钮、曜金发送键、烟紫链接与次级文本；右上角 22% 的八卦星轮水印、底部 9% 水墨山脊与星点。
8. 切到深色（设置 → 通用 → 外观 → 深色）：玄夜墨底 + 月金 + 浅檀主按钮，同一套元素换色。

## 备注

- 侧栏两个单槽位由官方品牌包以 priority 0 占用；本皮肤注册 priority -100 来 shadow（单槽位规则：priority 越低越优先），所以官方品牌在检查器里显示为 inactive。
- 空白会话标题前的太极印已用 `NoHeroMark`（返回 `null`，priority -100）遮掉；想恢复成 34px 太极印，把 `apply()` 里 `conversation.hero.brand.mark` 的那条注册删掉，或换回原来的 `HeroMark` 组件即可。
- 发送太极的触发在 `SendTaijiKeywatch`：捕获阶段监听 `keydown`，只认「编辑区内 + 纯 Enter（无 Shift/Cmd/Ctrl/Alt、非输入法合成）+ 草稿非空」，再等 `useInput` 的草稿被提交清空才 `emitSendBurst()`；画面由 `shell.overlay` 里的 `hermes-send-taiji` 承担。想改节奏改 `.hermes-send-plate` 的 1300ms 动画与 1500ms 自动收起；嫌它多余就删掉 `shell.overlay` 里 `hermes-send-taiji` 的注册。
- 侧栏品牌字标会取代默认品牌名；若只想保留配色与印记，可在 `client.js` 的 `apply()` 里删掉 `sidebar.brand.name` 的注册。
- 正文字体保持系统无衬线；宋体只用于品牌字标与箴言，行书用于开机动画与中央背景题字，避免 14px 正文换成衬线/书法字体后发虚。
- 开机动画用的八卦盘是 `BaguaPlate`（先天八卦，`BAGUA_TRIGRAMS` 按「初爻朝内」排），改动只影响开盘画面；侧栏太极印与右上角水印仍是各自独立的图形。
- 开场的跳过监听（Esc／Enter／点击）只在 `phase !== 'gone'` 期间挂载，5 秒结束即随 effect 清理摘除；因此动画结束后在输入框里敲空格、回车都不会再把开场八卦点亮（旧版把监听留在了已隐藏的组件上，所以按空格会闪一下开场）。空格也不再是跳过键。
- 开机动画只在每次页面载入（启动或刷新）时播放一次：`BootCurtain` 的初值用 `sessionStorage` + `performance.timeOrigin` 记了一份「本页面已播」标记，所以 `client-hmr` 热替换同一份文档不会重播，只有真正刷新/重开才再开场。嫌五秒长可改 `client.js` 里 `BOOT_MS`；完全不想要就删掉 `apply()` 中 `hermes-boot` 的注册。四句字号在 `.hermes-boot-line--top/--bottom`（目前 `clamp(20px, min(4.5vh, 3.4vw), 48px)`）与 `.hermes-boot-line--left/--right`（`clamp(17px, 3.6vh, 40px)`），想再大/再小直接改这两处；字号变大时记得同步收上下留白（`top/bottom` 的 `8.5vh`）和两侧竖排的内缩（`3vw`）。
- 行书字体栈 `BRUSH` 优先 macOS 自带 `Xingkai SC`（华文行楷），其次 `Zhi Mang Xing`（志莽行书，需自行安装，更像手写行草）、`Hannotate SC`（手札体）、`Kaiti SC`（楷体）。想更接近毛笔手迹，把 `"Zhi Mang Xing"` 提到栈首。
- 右下角「轻触任意处 · 跳过」提示如需隐藏，删掉 `client.js` 里 `hermes-boot-hint` 那个节点即可。
- 背景题字随 `hermes-ambient` 渲染在 `shell.overlay`，每个页面（含空白新会话）都能看到；竖排两列、右起，字号 `clamp(20px,4.5vh,44px)`（按视口高度收缩），深浅主题用 `--hermes-inscription` 两组 alpha；觉得太重就调低 alpha，想改大小改字号 clamp，想换回横排把 `.hermes-inscription` 的 `flex-direction` 改为 `column` 并去掉 `.hermes-inscription-line` 的 `writing-mode` 即可。

## 许可

[MIT](LICENSE) © 2026 Qijinchun (haoyu-qi)

字体不随仓库分发，只通过 `font-family` 引用系统已安装的字体；仓库里的 SVG、图形与文案均为本项目原创。
