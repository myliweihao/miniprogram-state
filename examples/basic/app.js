import miniState, { initState } from "miniprogram-state";

initState({
  // 这里放需要全局共享的数据
  userInfo: {
    name: "小明",
  },
  cart: {
    list: [],
  },
});

App({});
