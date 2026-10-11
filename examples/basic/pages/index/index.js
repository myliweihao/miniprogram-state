import miniState from "miniprogram-state";

Page({
  changeName() {
    miniState.userInfo.name = "小红";
  },

  addCartItem() {
    miniState.cart.list.push({
      id: Date.now(),
      name: "示例商品",
    });
  },
});
