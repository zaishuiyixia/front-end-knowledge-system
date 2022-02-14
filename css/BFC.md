#### 什么是BFC
BFC 全称：Block Formatting Context， 名为 "块级格式化上下文"。
一块独立渲染区域，内部子元素的渲染不会影响边界外的元素。

#### 形成BFC的条件
简单列举几个触发BFC使用的CSS属性
- overflow不为 visible 的块元素（hidden）
- display: inline-block
- 绝对定位元素 (元素的position为absolute或fixed)
- 表格单元格(元素的display: table-cell，HTML表格单元格默认属性)
- 弹性盒 flex boxes (元素的display: flex或inline-flex)
- 浮动 (元素的float不为none，left/right)

#### 常见应用
1、清除浮动
浮动元素会脱离文档流，跑到父元素的外面导致父元素高度塌陷，同时也会造成浮动元素和其他元素的重叠。因此需要清除浮动，让浮动元素正确地显示在父元素中。

2、上下Margin边距重叠，相邻元素的margin-top和margin-bottom会发生重叠
触发bfc解决上下边距重叠问题
  