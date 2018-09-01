# tiny-swiper
> 一个轻量，兼容IE7、IE8，3D、支持移动端的swiper插件。

## demo
[demo](https://checkson.github.io/tiny-swiper/demo/index.html)

## 介绍
tiny-swiper是一个轻量级（压缩后文件只有6.32KB大小）、兼容性良好（兼容IE7、IE8）的、支持移动端的swiper插件。

## 依赖
[jQuery1.x](https://cdnjs.com/libraries/jquery/1.11.3)

## 基本用法

**html结构**
```html
<!-- 依赖引入 -->
<script type="text/javascript" src="${yourPath}/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="${yourPath}/tiny-swiper.min.js"></script>


<ul id="tinySwiper" class="swiper-list">
    <li class="slide-item">1</li>
    <li class="slide-item">2</li>
    <li class="slide-item">3</li>
    <li class="slide-item">4</li>
    <li class="slide-item">5</li>
    <li class="slide-item">6</li>
    <li class="slide-item">7</li>
</ul>
```

**CSS样式**
```CSS
/* 必须要给出swiper容器的高度，宽度可以自适应父容器宽度（100%） */
.swiper-list {
    position: relative;
    height: 400px;
    width: 1000px;
}
/* 幻灯片的宽高，可以先不设置，最后在JS中设置即可 */
.slide-item {
    position: absolute;
    width: 600px;
    height: 400px;
}
```

**JS声明**
```javascript
$('#tinySwiper').tinySwiper({
    autoplay: true,
    slidesProps: {              // 必须设置的属性
        width: 600,             // 默认值为0
        height: 400             // 默认值为0
    }
});
```

## API
**属性**

名称 | 类型 | 默认值 |描述
:---: | :---: | :---: | :---: |
autoplay | boolean | false | 是否自动播放 
speed | number | 3000 | 单位（ms），自动播放相隔的时间，建议至少设置为1000
initialIndex | number | 0 | 默认显示的幻灯片的下标（以0开始，如果为负数，例如-1，则代表倒数第1个，以此类推）
clickable | boolean | true | 是否可以点击某个幻灯片进行切换
touchable | boolean | true | 是否可以滑动幻灯片进行切换
slides | string | .slide-item | 每一张幻灯片的选择器
slidesLen | number | 5 | `建议设置` 代表可视区域显示多少张幻灯片
slidesSpace | number | - | 幻灯片之间的空隙距离，当且仅当slidesLen为1时，该属性才生效。
slidesProps | object | { width: 0, height: 0 } | `必须设置` 幻灯片的正常宽，高，可以是百分比，可以是数字（单位px）
navigation | object | { prev: '', next: '' } | 幻灯片向前、向后滑动的导航选择器
pagination | object | { el: '', activeClass: '' } | 分页配置，el代表分页项选择器，activeClass代表激活添加的类

**回调方法**

名称 | 参数 | 返回值 | 描述
:---: | :---: | :---: | :---: |
onSlideStart | el | - | 每一次幻灯片滑动之前触发, el为将要聚焦的幻灯片的DOM |
onSlideEnd | el | - | 每一次幻灯片滑动完（动画结束）后触发, el为已经聚焦的幻灯片的DOM |
onClick | order, index | - | 每一次点击幻灯片都会触发，函数this指向当前被点击的幻灯片的DOM，order(类型为number)是指幻灯片静态（初始）下标，index(类型为number)是指幻灯片动态（当前）下标。

**详细用法:**
[请戳这里](https://checkson.github.io/tiny-swiper/demo/index.html)


## 二次开发
若大神想改进，或者新增功能，可以通过以下方式拉取代码
```
  git clone https://github.com/Checkson/tiny-swiper.git
```
然后进入目录tiny-swiper，运行
```
  npm install
```
安装gulp依赖包，然后通过
```
  npm run dev
```
命令来启动服务器，用编辑器打开src下tiny-swiper.js就可以将插件加工到你想要的样子了！

## License
MIT