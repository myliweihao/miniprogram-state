# miniState

微信小程序轻量全局状态管理。适合用户信息、购物车、订单筛选条件等小体量共享数据，使用方式接近普通对象，简单直接。

## 安装

```bash
npm install miniprogram-state
```

## 第一步：在 app.js 初始化状态

```js
import miniState, { initState } from 'miniprogram-state'

initState({
  // 这里放需要全局共享的数据
  userInfo: {
    name: '小明',
  },
  cart: {
    list: [],
  },
})
```

## 第二步：页面直接使用

初始化后，页面 `data` 中会自动拥有 `miniState`，无需在每个页面手动设置。

```xml
<view>{{miniState.userInfo.name}}</view>
<view>{{miniState.cart.list.length}}</view>
```

## 第三步：组件中使用

组件通过页面传入 `miniState`。

页面 WXML：

```xml
<goods-card miniState="{{miniState}}" />
```

组件 JS：

```js
Component({
  properties: {
    miniState: Object,
  },
})
```

组件 WXML：

```xml
<view>{{miniState.userInfo.name}}</view>
<view>{{miniState.cart.list.length}}</view>
```

## 更新数据

在页面 JS 中引入 `miniState`，像修改普通对象一样修改即可。

```js
import miniState from 'miniprogram-state'

Page({
  changeName() {
    miniState.userInfo.name = '小明'
  },

  addCartItem() {
    miniState.cart.list.push({
      id: Date.now(),
      name: '示例商品',
    })
  },
})
```

状态更新后，会自动同步到页面。
