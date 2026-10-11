const state = {};
const proxyMap = new WeakMap();
let pending = false;

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function syncRecentPages() {
  if (pending) return;

  pending = true;

  Promise.resolve().then(function () {
    pending = false;

    getCurrentPages().slice(-2).forEach(function (page) {
      page?.setData?.({
        miniState: state,
      });
    });
  });
}

function reactive(target) {
  if (target === null || typeof target !== "object") return target;
  if (!Array.isArray(target) && !isPlainObject(target)) return target;
  if (proxyMap.has(target)) return proxyMap.get(target);

  const proxy = new Proxy(target, {
    get(target, key) {
      return reactive(target[key]);
    },
    set(target, key, value) {
      if (Object.is(target[key], value)) return true;

      target[key] = value;
      syncRecentPages();
      return true;
    },
    deleteProperty(target, key) {
      delete target[key];
      syncRecentPages();
      return true;
    },
  });

  proxyMap.set(target, proxy);
  return proxy;
}

const miniState = reactive(state);

function initState(data) {
  if (!data || typeof data !== "object") return miniState;

  Object.keys(data).forEach(function (key) {
    miniState[key] = data[key];
  });

  return miniState;
}

wx.onAppRoute(syncRecentPages);

export { initState };
export default miniState;
