# IICT Hybrid Vue

项目是中科院计算所苏州构建的 Hybrid 的开发框架，iict-hybrid-vue 对应的是前端部分，同时也作为示范文件，以供对原生接口调用的参考

[Android 原生壳点击这里](https://github.com/CAS-IICT/iict-hybrid-android)

[IOS 原生壳点击这里](https://github.com/CAS-IICT/iict-hybrid-ios)

![logo](http://nwzimg.wezhan.cn/contents/sitefiles2037/10185204/images/12968193.png)

## Project initial

```
npm install
```

## Open Vue UI to start this project

```
vue ui
```

## 规范化

采用: Prettier + Eslint 规范
缩进：4
引号：单引号
分号：false
vue indent: false

详细请参考文件：prettier.config.json

## 重要文件说明

-   tool.js 全局类库，非原生，普通浏览器 API 可直接调用的 bom, dom 建议引入，`import $ from 'tool.js'`
-   plus.js 全局类库，原生对接，均为 jsBridge 与原生对接的 API，建议引入，`import plus from 'plus.js'`
-   style.css 全局 css，主要样式
-   animation.css 动画 css
-   lib.css 覆盖使用的类库 css，例如 elementUI，vantUI 等

## plus 下与原生对接方法的说明

1. setupWebViewJavascriptBridge

    初始化 JsBridge 对象，可以与原生通信，核心方法，plus 里所有 function 必须是基于该方法的回调进行，这里用到 promise 方便异步同步互转处理

2. call

    用于请求原生，调用原生的功能，原生方面需要设定好调用的方法名，并绑定相应的回调操作

3. register (deprecated)

4. back

    调用原生返回功能

5. toast

    原生 toast

6. alert

    原生 alert

7. setStatusBar

    设置手机顶部状态栏，颜色必须为完整的 16 进制颜色

8. loading

    原生 loading

9. go

    跳转到其他 webview，打开新的 activity

10. scan (deprecated)

11. signIn (deprecated)

12. signOut (deprecated)

13. getClingUserInfo (deprecated)

14. checkBle

    检查蓝牙状态

15. openBle

    打开蓝牙

16. scanBle

    扫描周围蓝牙

17. getLoc

    获取定位，高德第三方支持

18. getWeather

    获取天气状态

19. cropper

    从相册或相机获得图片并且截图

20. openMapActivity

    打开地图相关的 Activity，注意这是一个全新的 Activity，需给出 path，path 是 vue 对应的页面路由（不要输入完整地址），例如"/map"

21. zoomMap

    缩放地图

22. setMap

    初始化地图，不执行的，即使进入了 MapActivity，地图无法显示地图，必须设置 visible,width,height,left,right,bottom,top 等

23. moveMapCenter

    把自己的定位移动到地图中心，回到自己位置！

24. markMap

    地图打点，传入经纬度还有图表，标题，解释等。

## Copyright

中国科学院计算所苏州研究院

MIT License

## Contributer

Youwei Huang (devilyouwei) huangyw@iict.ac.cn

Huijuan Zhang
