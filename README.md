# IICT Hybrid Vue

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
分号：禁止
参考文件：prettier.config.json

## 重要文件说明

-   tool.js 全局类库，非原生，普通浏览器 API 调用 bom, dom
-   plus.js 全局类库，原生对接，均为 jsBridge 与原生对接的 API
-   style.css 全局 css，主要样式
-   animation.css 动画 css
-   lib.css 覆盖使用的类库 css，例如 elementUI，vantUI 等

## plus 下与原生对接方法说明

1. setupWebViewJavascriptBridge
   初始化 JsBridge 对象，可以与原生通信
2. call
   用于请求原生，调用原生的功能
3. register
   注册方法，供原生调用
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
10. scan
11. signIn
12. signOut
13. getClingUserInfo
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

## Copyright

中国科学院计算所苏州研究院

MIT License

## Contributer
