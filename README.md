# IICT Hybrid Vue

## Project setup

```
npm install
```

## Open Vue UI development tool and do some operations

```
vue ui
```

## 规范化

采用 Prettier, Eslint 双规范
缩进：4
引号：单引号
分号：禁止
参考文件：prettier.config.json

## 重要文件说明

- tool.js 全局类库，非原生，普通浏览器 API 调用 bom, dom
- plus.js 全局类库，原生对接，均为 jsBridge 与原生对接的 API
- style.css 全局 css，主要样式
- animation.css 动画 css
- lib.css 覆盖使用的类库 css，例如 elementUI，vantUI 等

## Copyright

中国科学院计算所苏州研究院
