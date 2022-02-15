#### rem是什么

rem是一个相对长度单位，相对于html根元素的font-size的值 常用于响应式布局
em也是一个相对长度单位，相对于父元素，不常用
px绝对长度单位

#### 响应式布局常用方案
使用媒体查询media-query 根据不同的屏幕宽度设置根元素 font-size，然后用rem作为单位实现响应式布局

```
@media only screen and (max-width: 374px) {
    /* iphone5 或者更小的尺寸，以 iphone5 的宽度（320px）比例设置 font-size */
    html {
        font-size: 86px;
    }
}
@media only screen and (min-width: 375px) and (max-width: 413px) {
    /* iphone6/7/8 和 iphone x */
    html {
        font-size: 100px;
    }
}
@media only screen and (min-width: 414px) {
    /* iphone6p 或者更大的尺寸，以 iphone6p 的宽度（414px）比例设置 font-size */
    html {
        font-size: 110px;
    }
}
```

#### rem的弊端

rem的弊端：“阶梯”性
适用于区间跨度大的，如要要很精细的设置则需要写很多媒体查询设置根元素font-size，十分麻烦