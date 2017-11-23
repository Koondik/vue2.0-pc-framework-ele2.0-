/**
 * FileName：path
 * Created By No.3 On 2017/7/28 0028 9:28
 * e-mail：woyzb@vip.qq.com
 */
const COMMON_PATH = {
  /* 获取下拉列表*/
  SELECT_LIST: "/devide/devideclass/getSelect",
  /* 获取条件（年级、班级类型、班级方向）下拉列表*/
  SELECT_ITEM_LIST: "/devide/devideclass/getSelectItemList"
};

const DIVIDE_PATH = {
  // 新增
  BASE: "/devide/devide",
  // 删除多个
  DEL_MULTI: "/devide/devide/deleteByList",
  // 分页列表
  GET_PAGE: "/devide/devide/getPaged"
};
// 分班班级设置
const DIVIDE_CLASS_PATH = {
  // 新增
  BASE: "/devide/devideclass",
  // 删除多个
  DEL_MULTI: "/devide/devideclass/deleteByList",
  // 分页列表
  GET_PAGE: "/devide/devideclass/getPaged",
  // 下拉框
  GET_SELECT: "/devide/devideclass/getSelectItemList",
  CLASS_SELECT: "/devide/devideclass/getSelect",
  // 导入班级
  IMPORT: "/devide/devideclass/importClass"
};
// 分班班级类型
const DIVIDE_CLASS_TYPE_PATH = {
  // 新增
  BASE: "/devide/devideclasstype",
  // 删除多个
  DEL_MULTI: "/devide/devideclasstype/deleteByList",
  // 分页列表
  GET_LIST: "/devide/devideclasstype/getlist"
};
// 分班学生
const DIVIDE_STUDENT_PATH = {
  // 新增
  BASE: "/devide/devidestudent",
  // 删除多个
  DEL_MULTI: "/devide/devidestudent/deleteByList",
  // 分页列表
  GET_PAGE: "/devide/devidestudent/getPaged",
  // 下拉框
  GET_SELECT: "/devide/devidestudent/getSelectItemList",
  // 导入学生
  IMPORT_STUDENT: "/devide/devidestudent/importStudent",
  // 导出学生
  EXPORT_STUDENT: ""
};
// 分班规则
const DIVIDE_RULE_PATH = {
  // 新增
  BASE: "/devide/deviderule",
  // 删除多个
  DEL_MULTI: "/devide/deviderule/deleteByList",
  // 分页列表
  GET_LIST: "/devide/deviderule/getlist"
};
// 分班结果
const DIVIDE_RESULT_PATH = {
  BASE: "/devide/devideresult",
  DEL_MULTI: "/devide/devideresult/deleteByList",
  EXPORT_CLASS: "/devide/devideresult/exportClass",
  EXPORT_STUDENT: "/devide/devideresult/exportStudent",
  // 生成结果
  GEN_RESULT: "/devide/devideresult/genResult",
  // 导出分班结果按班级统计
  GET_STAT_LIST_FOR_CLASS: "/devide/devideresult/getStatListForClass",
  // 分班结果按班级获取学生列表
  GET_STUDENT_LIST: "/devide/devideresult/getStudentList",
  // 获取列表
  GET_LIST: "/devide/devideresult/getlist"

};

export {COMMON_PATH, DIVIDE_PATH, DIVIDE_STUDENT_PATH, DIVIDE_CLASS_PATH, DIVIDE_CLASS_TYPE_PATH, DIVIDE_RULE_PATH, DIVIDE_RESULT_PATH};
