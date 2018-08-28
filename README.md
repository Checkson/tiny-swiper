# tiny-swiper
> 一个轻量，兼容IE7、IE8，3D swiper组件

## demo
[demo](https://Checkson.github.io/tiny-swiper/)

## 介绍

## 基本用法

## API
**属性**

名称 | 类型 | 默认值 |描述
:---: | :---: | :---: | :---: |
autoplay | boolean | false | 是否自动播放 
speed | number | 3000 | 单位（ms），自动播放相隔的时间，建议至少设置为1000
initialIndex | number | 0 | 默认显示的幻灯片的下标（以0开始，如果为负数，例如-1，则代表倒数第1个，以此类推）
clickable | boolean | true | 是否可以点击某个幻灯片进行切换
slides | string | .slide-item | 每一张幻灯片的CSS类名
slidesLen | number | 5 | 代表可视区域显示多少张幻灯片
slidesProps | object | { width: 0, height: 0 } | *必须设置* 幻灯片的正常宽，高（单位px）
navigation | object | { prev: '.slide-prev', next: '.slide-next' } | 幻灯片向前、向后滑动的导航选择器
pagination | object | { el: '.slide-pagination-item', activeClass: 'active' } | 分页配置，el代表分页项选择器，activeClass代表激活添加的类

**回调方法**

名称 | 参数 | 返回值 | 描述
:---: | :---: | :---: | :---: |
slideStart | 无 | 无 | 每一次幻灯片滑动之前触发 |
slideEnd | 无 | 无 | 每一次幻灯片滑动完（动画结束）后触发 |
click | order, index | 无 | 每一次点击幻灯片都会触发，函数this指向当前被点击的幻灯片的DOM，order(类型为number)是指幻灯片静态（初始）下标，index(类型为number)是指幻灯片动态（当前）下标。

**详细用法:**
[请戳这里](https://Checkson.github.io/tiny-swiper/)


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