import router from "./router";
import store from "./vuex";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css";// Progress 进度条样式

// permissiom judge
/* function hasPermission(roles, permissionRoles) {
  if (roles.indexOf("admin") >= 0) return true; // admin权限 直接通过
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
} */
// register global progress.
/* const whiteList = ["/login", "/authredirect"];// 不重定向白名单 */

router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  if (!store.getters.userRole) {
    store.dispatch("getUserType").then((role) => {
      store.dispatch("GenerateRoutes", {role}).then(() => { // 生成可访问的路由表
        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
        NProgress.done(); // 开启Progress
        next({...to}); // hack方法 确保addRoutes已完成
      });
    });
  } else {
    next();
    NProgress.done(); // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
