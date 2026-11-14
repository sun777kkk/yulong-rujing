# 帛间万象 · 楚帛数字博物馆

面向公众的毕业设计数字展览。通过帛画原作、主题阅读、三界漫游和原创符号图录，认识楚人的生活与民俗图式。

## 高级展陈版

- 赭金导航、深绿首屏、帛纸背景和朱褐专题，建立深浅相间的观展节奏。
- 用户提供的书法标题保持原有字形；三件原作组成叠层展陈，可以切换与放大。
- “楚人穿什么？”“龙凤意味着什么？”“一幅画怎样讲故事？”直接进入对应阅读主题。
- 衣冠与身份、器物与礼序、龙凤与想象、民俗图式四个主题支持键盘切换。
- 三界包含3幅整体和13组局部图形，支持查看、放大与下载。
- 图录默认呈现6组，可展开全部13组；筛选与搜索始终呈现全部匹配结果。
- 设计转译与中期展板保存在可展开的设计档案中。

视觉参照用户提供的文化展览网页案例，提取原物大图、深绿与帛白、错落展签、纸帛边缘等组织方式。阅读结构参考 Rijksmuseum 线上馆藏的主题探索入口：https://www.rijksmuseum.nl/en/collection/discover 。全部品牌、版式与交互为本项目制作，未使用其他博物馆标识或展览海报。

## 运行与修改

保持全部文件的相对位置，双击 index.html 可离线浏览。建议运行 `python serve.py` 后通过本地服务器预览。

- index.html：网页入口；src/index.template.html：同一页面的可编辑模板。修改模板后运行 `python build.py` 同步入口。
- exhibition.css：当前展陈版视觉覆盖，优先在这里调整版式、配色与响应式规则。
- exhibition.js：问题入口、图录展开、原作强调与档案交互。
- museum.js：首页三件原作切换、滚动导航与阅读进度。
- originals.js：原作大图细读；chu-life.js：四个文化主题。
- app.js、silk-data.js：三界、图形数据、搜索筛选、详情与下载。
- styles.css、museum.css：保留的基础样式系统。
- assets/title-calligraphy.svg：用户书法的原始字形蒙版。
- assets/originals/t-banner-user.png：用户指定的T形帛画；dragon.jpg、phoenix.jpg：其他两件原作图片。
- assets/silk/：16份原创SVG、展板和纹理；assets/editorial/：纸帛边缘矢量。

## 更新图片与发布

替换现有图片时，将同名文件放入对应 assets 子文件夹；新增图形需同步修改 silk-data.js 与统计文字。网站没有上传后台，更新通过 GitHub 仓库完成。

原仓库：https://github.com/sun777kkk/yulong-rujing
原网站：https://sun777kkk.github.io/yulong-rujing/

发布方式：将 main 分支推送到原仓库，GitHub Pages 从仓库根目录构建。实际发布状态以仓库 Pages 部署记录为准。

## 内容边界

人物御龙与人物龙凤帛画标注为战国，T形帛画标注为西汉比较对象。孔雀青SVG为用户的当代图形提取，不是原作复原。网页以可见形态和观看问题组织内容；图像不能独立代表古人的全部日常生活，具体礼仪与象征解释需结合文献。

依照用户要求，页面不显示图片来源栏目；原作来源元数据保留在源码中。首页没有音视频自动播放、虚构参观服务或访客统计。

## 简易展示页

访问：https://sun777kkk.github.io/yulong-rujing/showcase.html 。

showcase.html 是独立的项目介绍与网站展示页，包括真实电脑/手机预览、三个内容入口和访问二维码。截图与二维码位于 assets/showcase/。
