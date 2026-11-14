# 帛间万象 · The Universe on Silk

以用户提供的 T 形帛画三界图形与中期展板为内容基础的毕业设计展示网站。

在线地址：https://sun777kkk.github.io/yulong-rujing/

## 新版内容
- 天上、人间、地下三界导览：3张整体 SVG、13组局部 SVG。
- 符号图鉴：层级筛选、关键词搜索、形态观察与设计转译说明。
- 大图细读：1—3倍放大、整体及局部 SVG 下载、上一张与下一张。
- 设计转译过程、网页色彩系统、中期展板原图预览和下载。
- 电脑与手机适配、键盘导航、焦点恢复、减少动态偏好。

## 本地打开
保持 index.html、styles.css、app.js、silk-data.js 与 assets 文件夹的相对位置。双击 index.html 即可离线浏览；或运行 python serve.py 通过本地服务器打开。

## 更新图片与内容
- 图形资源：assets/silk/ 中的 SVG，英文文件名与 silk-data.js 的 asset 字段对应。
- 替换现有图片：用同名 SVG 覆盖对应文件，提交到 main 后等待 GitHub Pages 发布。
- 新增图形：上传 SVG 并在 silk-data.js 的 symbols 数组中添加项目；图鉴数量与导览统计应同步修改。
- 展板：替换 assets/silk/exhibition-board.jpg，保持同名即可更新。
- 页面结构：编辑 src/index.template.html 后运行 python build.py；样式在 styles.css，交互在 app.js。
- 页面没有服务器上传后台。图片更新通过 GitHub 仓库维护；访客本地预览不等于网站发布。

## 内容说明
图形命名沿用用户素材，网页形态说明依据可见图形组织，当代设计转译与文物事实分别表述。图形为设计提取与演绎，非文物复原。多色应用成果以用户中期展板为准。旧版 art.js、refinement.css 保留作历史源码参考，新版入口不加载。
