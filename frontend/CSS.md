# CSS

## 什么是CSS



## 盒子模型

网页中所有元素都被一个个的盒子包围着。W3C标准盒子模型包括context padding border margin这几个部分。盒子模型一般分为**区块盒子（block）**和**行内盒子（inline）**盒子的模型决定了盒子与页面中的其他盒子之间的关系。

| block                            | inline                                                   |
| -------------------------------- | -------------------------------------------------------- |
| 盒子会产生换行。                 | 盒子不换行                                               |
| width和height会发挥作用。        | width和height不会发挥作用                                |
| 内外边界、边框会将其他盒子“推开” | 垂直方向的内外边界、边框有效，但不会将其他inline盒子推开 |
| 未指定width默认会将容器占满      | 水平方向的内外边界、边框有效，但会将其他inline推开       |

一些相关样式：

盒子模型 display：切换盒子模式、boxing-size：border-box content-box 决定width和height如何生效、

内边距：padding

外边距：margin

边框：border-style、border-color、border-width

##### 盒子模型的尺寸问题





### css选择器

##### 选择器类型

id选择器

```css

```

伪类选择器

```css
/* nth-of-type */
p:nth-of-type(2n+1) /* 基数生效 */
p:nth-of-type(2n) /* 偶数生效 */
```



| 类型         | 示例                                                         | 作用范围                                             |
| ------------ | ------------------------------------------------------------ | ---------------------------------------------------- |
| id选择器     | #a                                                           | id属性等于a的元素                                    |
| 类选择器     | .clazz                                                       | class属性包含clazz的元素                             |
| 标签选择器   | div                                                          | tagname为div的元素                                   |
| 后代选择器   | \#box div                                                    | 后代标签为div的所有元素                              |
| 子选择器     | .one > p                                                     | one元素的子元素p                                     |
| 同胞选择器   | .one + .two                                                  | 与one相邻的 two元素                                  |
| 组选择器     | div,p                                                        | 多个选择器规则同时生效                               |
| 伪类选择器   | p:first-child  p:last-child  p:empty  p:nth-child(2n+1) p:hover | 伪类对样式的生效做出限制，使其在满足特定条件时才触发 |
| 伪元素选择器 | p::after  p::before  p::selection                            | 伪元素一般对                                         |
| 属性选择器   | #id[attribute] #id[attribute=1]                              | id元素属性包含attribute属性                          |



##### 





### margin塌陷与合并问题

**margin塌陷**问题指的是嵌套父子块级元素垂直方向上的margin会结合到一起，取决于最大值。

​	通过**bfc**（block formatting context）解决，bfc改变了块级元素内的渲染规则使其与外界隔开，如同在父元素内部加了一个”框“。

​	触发bfc的条件：	

​		body标签。

​		display值为table-cell、inline-block。

​		position为absolute、fixed。

​		overflow为visible。

​		float不为none

**margin合并**问题指的是兄弟块元素之间垂直方向上的margin值会发生合并，由大的值决定。

​	同样借助bfc解决给一个兄弟元素套一个父级元素并触发bfc

**bfc**：即block formatting context，即块级格式上下文。bfc规定了Blockbox如何布局：

​	内部的 Box 会在垂直方向上一个接一个放置

​	BFC 的区域不会与 float box 重叠

​	BFC 是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素

​	计算 BFC 的高度时，浮动元素也会参与计算



## CSS值处理

- 初始值
- 计算值
- 应用值
- 实际值

属性的初始值是默认





## CSS选择器顺序、优先级与继承

#### 层叠顺序

#### 优先级

遵循越具体优先级越高的原则

!impontant > 内联style > id选择器 > 属性选择器 > 标签选择器

#### 继承

###### 继承控制：

css为控制继承提供了五个特殊的通用属性，每个css属性都能接受这些值。

- inherit：开启继承
- initial：



## 常见布局方式

###### 流式布局



###### flex布局



###### gurid布局

​	flex布局是轴线布局，可以看作**一维**布局，而gurid将容器划分为多行多列，可以视为**二维**布局

行列数设置：

```css
.container {
    display: grid;
    grid-template-columns: 33.33% 33.33% 33.33%; // 三列 
    grid-template-rows: 100px 100px 200px; // 三行
  	// 一些简化的写法
    grid-template-columns: repeat(3, 100px); // repeat函数 repeat(3, 100px) = 100px 100px 100px
    grid-template-columns: repeat(auto-fill, 100px); // 自动填充
    grid-template-columns: 150px 1fr 2fr; // fr是网格布局中特殊的单位，这里第一列120px 剩余分成3份 中间1份 最后2份
    grid-template-columns: 1fr 1fr minmax(100px, 1fr); // ninmax
}
```







### 浮动问题

浮动的元素（设置了float的元素）独立于正常的页面流，并表现为行内元素，后续的元素会补上其位置，浮动的元素不会遮蔽文字、图片。

浮动带来如下问题：父元素高度塌陷；非浮动的同级内联元素会跟随浮动

解决方法：父元素设置overflow:hidden；伪类clear:both







### css工程化的常见工具

都是前端工程化的一部分

**reset**：如normalize.css。不同浏览器的默认样式是有差异的，reset默认样式来保证各平台体验的一致性。

**预编译**：如less scss的css预编译语言，同ts的定位。为css补充了很多特性，如mixin、变量、函数、嵌套等。

**后处理器**：如postcss，他类似babel的定位。用以规范我们书写的css，解决浏览器的兼容性问题等。

**规范lint**：stylelint，同eslint的定位。用以检查开发中css的语法错误等。

**低代码**：Tailwindcss，通过特点的语法如：bg-white（background-color：white）p-4 (padding:1rem)，使得开发者尽可能少的书写css。







### css的性能如何优化

样式内容写入header中以避免首屏回流

避免复杂的选择器

避免不必要的重复、使用变量

避免内联样式、避免！impontant

避免使用浮动类型，减少浏览器分层

经可能触发GPU加速来实现动画，如while-change、transform、position：fixed

content-visibility：auto；contain：content







### 移动端适配

meta中viewport的配置，以规范视口，防止左右滚动，页面缩放等。

响应式布局单位使用：rem vw vh vmin %

flex布局：展示保证灵活性

媒体查询：处理定制化的内容







### Tailwind

[[现代CSS框架：Tailwind CSS - 廖雪峰的官方网站 (liaoxuefeng.com)](https://www.liaoxuefeng.com/article/1581018697957408)](https://www.michaeljier.cn/blog/diving-into-tailwindcss)

TailwindCSS是一个css框架，会扫描所有的HTML文件，JSX组件，生成相应的样式，省去了我们书写样式的时间。本质上Tailwind是一个postcss插件。







### 层叠上下文 层叠顺序

dom元素不只有x轴 y轴坐标，还有一个z轴坐标。决定了当元素出现重叠时，如何展示。

层叠上下文：

符合以下条件会产生层叠上下文：

- html根元素
- position 值为 `absolute`（绝对定位）或 `relative`（相对定位）且 z-index 值不为 `auto` 的元素
- position 值为 fixed 或 sticky
- flex or grid容器的子元素，且z-index值 不为 auto
- opacity < 1 的元素
- 等 [层叠上下文 - CSS：层叠样式表 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)

层叠顺序

![图片](.\imgs\1734436094342.jpg)

处于不同层叠上下文的两个元素，他们的覆盖关系由层叠上下文决定。
处于同一层叠上下文的两个元素，覆盖关系由层叠顺序决定。
处于同一层叠上下文，且层叠顺序相同的元素，后面的元素会置于前面元素的上面。







### 手机上画1px的线为什么比电脑上粗？

原理：

移动端高清屏的物理像素密度更高，1像素对应 2\*2 or 3\*3物理像素。所以看起来更粗些。

解决方案：

直接设置为0.5px，在安卓上会被当做0px，存在兼容问题。

transform: scaleY(.5);