/**
 * FileName：index
 * Created By No.3 On 2017/11/6 0006 10:24
 * e-mail：woyzb@vip.qq.com
 */

import focus from "./focus";

const install = function(Vue) {
  Vue.directive(focus.name, focus);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {install};
