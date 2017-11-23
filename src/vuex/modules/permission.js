import api from "../../api/index";
import {USER_TYPE_ID, USER_ID} from "src/config/env";
import {studentRouterMap, teacherRouterMap, adviserRouterMap, adminRouterMap, constantRouterMap} from "src/router";

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
/* function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0);
  } else {
    return true;
  }
} */

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
/* function filterAsyncRouter(asyncRouterMap, roles) {
  return asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
} */

const permission = {
  state: {
    userRole: null,
    routers: constantRouterMap,
    addRouters: []
  },
  getters: {
    addRouters: state => state.addRouters,
    userRole: state => state.userRole,
    permission_routers: state => state.routers,
    is_full_screen: state => {
      return state.routers.every(item => {
        return item.hidden;
      });
    }
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    },
    SET_USER_ROLES: (state, role) => {
      state.userRole = role;
    }
  },
  actions: {
    getUserType({commit}, data) {
      return new Promise(resolve => {
        api.doRequest("/train/common/getUserType", "get", {userId: USER_ID, userTypeId: USER_TYPE_ID}).then(res => {
          commit("SET_USER_ROLES", res);
          resolve(res);
        });
      });
    },
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        const role = data.role;
        let accessedRouters = null;
        switch (role) {
          case "admin":
          case "Administrator":
            accessedRouters = adminRouterMap;
            break;
          case "adviser":
          case "GuidanceTeacher":
            accessedRouters = adviserRouterMap;
            break;
          case "teacher":
          case "HeaderTeacher":
            accessedRouters = teacherRouterMap;
            break;
          case "student":
          case "Student":
            accessedRouters = studentRouterMap;
            break;
        }
        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    }
  }
};

export default permission;
