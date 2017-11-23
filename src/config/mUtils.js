/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  const content = window.localStorage.getItem(name);
  if (!content) return;
  return JSON.parse(content);
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};
/**
 * 转换时间格式方法
 */
export const changeTime = (val) => {
  if (!val) return;
  const date = new Date(val);
  const year = date.getFullYear();
  const month = "0" + (date.getMonth() + 1);
  const day = "0" + date.getDate();
  const hours = "0" + date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  return "".concat(year.toString(), "/", month.substr(-2), "/", day.substr(-2), " ", hours.substr(-2), ":", minutes.substr(-2), ":", seconds.substr(-2));
};

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = "int") => {
  let target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === "scrollTop") {
    target = element.scrollTop;
  } else if (element.currentStyle) {
    target = element.currentStyle[attr];
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr];
  }
  // 在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode === "float" ? parseFloat(target) : parseInt(target);
};

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
  const windowHeight = window.screen.height;
  let height;
  let setTop;
  let paddingBottom;
  let marginBottom;
  let requestFram;
  let oldScrollTop;

  document.body.addEventListener("scroll", () => {
    loadMore();
  }, false);
  // 运动开始时获取元素 高度 和 offseTop, pading, margin
  element.addEventListener("touchstart", () => {
    height = element.offsetHeight;
    setTop = element.offsetTop;
    paddingBottom = getStyle(element, "paddingBottom");
    marginBottom = getStyle(element, "marginBottom");
  }, {passive: true});

  // 运动过程中保持监听 scrollTop 的值判断是否到达底部
  element.addEventListener("touchmove", () => {
    loadMore();
  }, {passive: true});

  // 运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
  element.addEventListener("touchend", () => {
    oldScrollTop = document.body.scrollTop;
    moveEnd();
  }, {passive: true});

  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop !== oldScrollTop) {
        oldScrollTop = document.body.scrollTop;
        loadMore();
        moveEnd();
      } else {
        cancelAnimationFrame(requestFram);
        // 为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
        height = element.offsetHeight;
        loadMore();
      }
    });
  };

  const loadMore = () => {
    if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
      callback();
    }
  };
};

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
  let requestFram;
  let oldScrollTop;

  document.addEventListener("scroll", () => {
    showBackFun();
  }, false);
  document.addEventListener("touchstart", () => {
    showBackFun();
  }, {passive: true});

  document.addEventListener("touchmove", () => {
    showBackFun();
  }, {passive: true});

  document.addEventListener("touchend", () => {
    oldScrollTop = document.body.scrollTop;
    moveEnd();
  }, {passive: true});

  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop !== oldScrollTop) {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
      } else {
        cancelAnimationFrame(requestFram);
      }
      showBackFun();
    });
  };

  // 判断是否达到目标点
  const showBackFun = () => {
    if (document.body.scrollTop > 500) {
      callback(true);
    } else {
      callback(false);
    }
  };
};

/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = "ease-out", callback) => {
  clearInterval(element.timer);

  // 判断不同参数的情况
  if (duration instanceof Function) {
    callback = duration;
    duration = 400;
  } else if (duration instanceof String) {
    mode = duration;
    duration = 400;
  }

  // 判断不同参数的情况
  if (mode instanceof Function) {
    callback = mode;
    mode = "ease-out";
  }

  // 获取dom样式
  const attrStyle = attr => {
    if (attr === "opacity") {
      return Math.round(getStyle(element, attr, "float") * 100);
    } else {
      return getStyle(element, attr);
    }
  };
  // 根字体大小，需要从此将 rem 改成 px 进行运算
  const rootSize = parseFloat(document.documentElement.style.fontSize);

  const unit = {};
  const initState = {};

  // 获取目标属性单位和初始样式值
  Object.keys(target).forEach(attr => {
    if (/[^\d^\.]+/gi.test(target[attr])) {
      unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || "px";
    } else {
      unit[attr] = "px";
    }
    initState[attr] = attrStyle(attr);
  });

  // 去掉传入的后缀单位
  Object.keys(target).forEach(attr => {
    if (unit[attr] === "rem") {
      target[attr] = Math.ceil(parseInt(target[attr]) * rootSize);
    } else {
      target[attr] = parseInt(target[attr]);
    }
  });

  let flag = true; // 假设所有运动到达终点
  const remberSpeed = {};// 记录上一个速度值,在ease-in模式下需要用到
  element.timer = setInterval(() => {
    Object.keys(target).forEach(attr => {
      let iSpeed = 0; // 步长
      let status = false; // 是否仍需运动
      const iCurrent = attrStyle(attr) || 0; // 当前元素属性址
      let speedBase = 0; // 目标点需要减去的基础值，三种运动状态的值都不同
      let intervalTime; // 将目标值分为多少步执行，数值越大，步长越小，运动时间越长
      let oldspeed = 0;
      switch (mode) {
        case "ease-out":
          speedBase = iCurrent;
          intervalTime = duration * 5 / 400;
          break;
        case "linear":
          speedBase = initState[attr];
          intervalTime = duration * 20 / 400;
          break;
        case "ease-in":
          oldspeed = remberSpeed[attr] || 0;
          iSpeed = oldspeed + (target[attr] - initState[attr]) / duration;
          remberSpeed[attr] = iSpeed;
          break;
        default:
          speedBase = iCurrent;
          intervalTime = duration * 5 / 400;
      }
      if (mode !== "ease-in") {
        iSpeed = (target[attr] - speedBase) / intervalTime;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      }
      // 判断是否达步长之内的误差距离，如果到达说明到达目标点
      switch (mode) {
        case "ease-out":
          status = iCurrent !== target[attr];
          break;
        case "linear":
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
          break;
        case "ease-in":
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
          break;
        default:
          status = iCurrent !== target[attr];
      }

      if (status) {
        flag = false;
        // opacity 和 scrollTop 需要特殊处理
        if (attr === "opacity") {
          element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
          element.style.opacity = (iCurrent + iSpeed) / 100;
        } else if (attr === "scrollTop") {
          element.scrollTop = iCurrent + iSpeed;
        } else {
          element.style[attr] = iCurrent + iSpeed + "px";
        }
      } else {
        flag = true;
      }

      if (flag) {
        clearInterval(element.timer);
        if (callback) {
          callback();
        }
      }
    });
  }, 20);
};

export const getCheckedIds = (arr, key = "id") => {
  return arr.map(item => {
    return item[key];
  });
};

export const notifyBox = {
  delSuccess: function () {
    this.$notify.success({
      title: "删除成功",
      message: "所选数据已经成功删除!",
      duration: 3000
    });
  }
};

export const deleteConfirm = function () {
  return new Promise((resolve, reject) => {
    this.$confirm("您确认删除选中的数据吗?", "警告", {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      confirmButtonClass: "danger",
      type: "warning"
    }).then(() => {
      resolve(true);
    }).catch(() => {
      resolve(false);
    });
  });
};

/**
 * 将日期格式化成指定格式的字符串
 * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
 * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
 * @returns 返回格式化后的日期字符串
 */
export const formatDate = function (dateData, fmt) {
  const date = new Date(dateData);
  if (date === "Invalid Date") return dateData;
  fmt = fmt || "yyyy-MM-dd HH:mm:ss";
  const obj = {
    "y": date.getFullYear(), // 年份，注意必须用getFullYear
    "M": date.getMonth() + 1, // 月份，注意是从0-11
    "d": date.getDate(), // 日期
    "q": Math.floor((date.getMonth() + 3) / 3), // 季度
    "w": date.getDay(), // 星期，注意是0-6
    "H": date.getHours(), // 24小时制
    "h": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
    "m": date.getMinutes(), // 分钟
    "s": date.getSeconds(), // 秒
    "S": date.getMilliseconds() // 毫秒
  };
  const week = ["天", "一", "二", "三", "四", "五", "六"];
  for (const i in obj) {
    fmt = fmt.replace(new RegExp(i + "+", "g"), function (m) {
      let val = obj[i] + "";
      if (i === "w") return (m.length > 2 ? "星期" : "周") + week[val];
      for (let j = 0, len = val.length; j < m.length - len; j++) val = "0" + val;
      return m.length === 1 ? val : val.substring(val.length - m.length);
    });
  }
  return fmt;
};

/**
 * 判断是否为数组
 */
export const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === "[object Array]";
};

/**
 * 判断是否为全中文
 */
export const isChinese = function (temp) {
  const re = /[^\u4e00-\u9fa5]/;
  return !re.test(temp);
};
