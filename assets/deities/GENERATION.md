# V3.2 · 36 位神明素材

2026-11-06 使用内置 `image_gen` 分批生成 36 张独立画像（每张一次调用，4 路生成队列；名录按 6 位一组共 6 组）。原 8 位也重新生成，统一清除旧素材内的卡框、姓名与文字。每位生成一次，无占位图、无重复拷贝。

公共提示词：Chinese traditional gongbi fine ink lines and translucent watercolor on warm ivory xuan paper #F8F5EE, restrained champagne gold accents #B58A43, muted natural colors, delicate circular halo, faint cloud wash. Dignified devotional painting, waist-up three-quarter front view, centered head and natural hands visible, lower robe fades to paper. NO text, characters, names, seals, labels, typography, frame, buttons, UI or watermark. Not photorealistic statue, 3D or game art.

每位人物的英文造型描述与分组见 `catalog.json` 的 `subject` / `batch` 字段。工具、日期和原图文件名记录在 `generation-v3.2.json`。

原 PNG 保存于本地 `output/v3.2-deities/<id>.png`（不入 Git）。生产 WebP 为 `assets/deities/<id>.webp`，640×800、quality 82，保持完整构图；`client.js` 内嵌全部 WebP，安装后不依赖外部图片地址。PNG 原图可用于重新压缩与后续修改。

重建素材：`npm run prepare:deities`；可传入其他原图目录：`node scripts/prepare-deities.mjs /absolute/source/path`。
生成带名字的审阅总览：`node scripts/deity-preview-sheet.mjs` → `output/v3.2-36-deities.png`。名字仅在审阅总览出现，实际加持弹层与动画均只有画像。
