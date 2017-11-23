import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export const constantRouterMap = [
  {
    path: "/error",
    component: resolve => require(["@/components/common/basis.vue"], resolve),
    hidden: true,
    fullscreen: true,
    children: [
      {
        path: "401",
        name: "401",
        component: resolve => require(["@/view/error_page/401.vue"], resolve)
      },
      {
        path: "404",
        name: "404",
        component: resolve => require(["@/view/error_page/404.vue"], resolve)
      }
    ]
  }
  // {path: "*", redirect: "/error/404", hidden: true}
];

/**
 * 学生权限路由
 */
export const studentRouterMap = [
  {
    name: "学生页面",
    path: "/",
    meta: {role: "Student"},
    redirect: "/list",
    noDropdown: true,
    hidden: true,
    component: resolve => require(["@/components/common/basis.vue"], resolve),
    children: [
      {
        name: "list",
        path: "list",
        component: resolve => require(["@/view/student/list/list.vue"], resolve)
      },
      {
        name: "add",
        path: "add",
        component: resolve => require(["@/view/student/list/modify.vue"], resolve)
      },
      {
        name: "edit",
        path: "edit/:id",
        component: resolve => require(["@/view/student/list/modify.vue"], resolve)
      },
      {
        name: "record",
        path: "record/:trainId",
        component: resolve => require(["@/view/student/record/record.vue"], resolve)
      },
      {
        name: "add_record",
        path: "add_record/:trainId",
        component: resolve => require(["@/view/student/record/modify_record.vue"], resolve)
      },
      {
        name: "edit_record",
        path: "edit_record/:trainId/:recordId",
        component: resolve => require(["@/view/student/record/modify_record.vue"], resolve)
      }
    ]
  },
  {path: "*", redirect: "/error/404", hidden: true}
];
/**
 * 班主任权限路由
 */
export const teacherRouterMap = [
  {
    path: "/",
    name: "班主任页面",
    meta: {role: "HeaderTeacher"},
    redirect: "/list",
    noDropdown: true,
    component: resolve => require(["@/components/common/basis.vue"], resolve),
    children: [
      {
        name: "实习列表",
        path: "list",
        icon: "grade-teacher",
        component: resolve => require(["@/view/teacher/list"], resolve)
      },
      {
        name: "实习审批",
        path: "approve",
        icon: "grade-teacher",
        component: resolve => require(["@/view/teacher/approve"], resolve)
      }
    ]
  },
  {path: "*", redirect: "/error/404", hidden: true}
];
/**
 * 指导老师权限路由
 **/
export const adviserRouterMap = [
  {
    path: "/",
    name: "指导老师页面",
    // adviser
    meta: {role: "GuidanceTeacher"},
    redirect: "/itsp_company",
    noDropdown: true,
    component: resolve => require(["@/components/common/basis.vue"], resolve),
    children: [
      {
        name: "实习单位",
        path: "itsp_company",
        icon: "grade-teacher",
        component: resolve => require(["@/view/adviser/itsp_company"], resolve)
      },
      {
        name: "实习岗位",
        path: "itsp_post",
        icon: "grade-teacher",
        component: resolve => require(["@/view/adviser/itsp_post"], resolve)
      },
      {
        name: "实习查看",
        path: "itsp_check",
        icon: "grade-teacher",
        component: resolve => require(["@/view/adviser/itsp_check"], resolve)
      },
      {
        name: "实习指导记录",
        path: "itsp_guidance",
        icon: "grade-teacher",
        component: resolve => require(["@/view/adviser/itsp_guidance"], resolve)
      },
      {
        name: "实习审批",
        path: "itsp_approve",
        icon: "grade-teacher",
        component: resolve => require(["@/view/adviser/itsp_approve"], resolve)
      },
      {
        name: "周记查看",
        path: "jou_check",
        icon: "grade-teacher",
        component: resolve => require(["@/view/adviser/jou_check"], resolve)
      }
    ]
  },
  {path: "*", redirect: "/error/404", hidden: true}
];
/**
 * 管理员权限路由
 */
export const adminRouterMap = [
  {
    path: "/",
    name: "管理员页面",
    meta: {role: "Administrator"},
    noDropdown: true,
    component: resolve => require(["@/components/common/basis.vue"], resolve),
    redirect: "/itsp_company",
    children: [
      {
        name: "实习单位",
        path: "itsp_company",
        icon: "grade-teacher",
        component: resolve => require(["@/view/adviser/itsp_company"], resolve)
      },
      {
        name: "实习岗位",
        path: "itsp_post",
        icon: "grade-teacher",
        component: resolve => require(["@/view/adviser/itsp_post"], resolve)
      },
      {
        name: "实习查看",
        path: "itsp_check",
        icon: "grade-teacher",
        component: resolve => require(["@/view/adviser/itsp_check"], resolve)
      },
      {
        name: "实习指导记录",
        path: "itsp_guidance",
        icon: "grade-teacher",
        component: resolve => require(["@/view/adviser/itsp_guidance"], resolve)
      },
      {
        name: "实习审批",
        path: "itsp_approve",
        icon: "grade-teacher",
        component: resolve => require(["@/view/adviser/itsp_approve"], resolve)
      },
      {
        name: "周记查看",
        path: "jou_check",
        icon: "grade-teacher",
        component: resolve => require(["@/view/adviser/jou_check"], resolve)
      },
      {
        path: "itsp_arrange",
        name: "实习安排信息汇总",
        icon: "grade-teacher",
        component: resolve => require(["@/view/admin/statistics/itsp_arrange.vue"], resolve)
      }/*,
      {
        path: "itsp_base",
        name: "实习基本情况汇总",
        icon: "grade-teacher",
        component: resolve => require(["@/view/admin/statistics/itsp_base.vue"], resolve)
      },
      {
        path: "tea_guidance",
        name: "教师指导记录汇总",
        icon: "grade-teacher",
        component: resolve => require(["@/view/admin/statistics/tea_guidance.vue"], resolve)
      },
      {
        path: "stu_summarize",
        name: "学生实习总结汇总",
        icon: "grade-teacher",
        component: resolve => require(["@/view/admin/statistics/stu_summarize.vue"], resolve)
      },
      {
        path: "jou_srecord",
        name: "周记提交情况汇总",
        icon: "grade-teacher",
        component: resolve => require(["@/view/admin/statistics/jou_srecord.vue"], resolve)
      },
      {
        path: "itsp_subsidy",
        name: "实习补贴情况汇总",
        icon: "grade-teacher",
        component: resolve => require(["@/view/admin/statistics/itsp_subsidy.vue"], resolve)
      }*/
    ]
  },
  {path: "*", redirect: "/error/404", hidden: true}
];

export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
});
