/**
 * FileName：studnet
 * Created By No.3 On 2017/11/13 0013 15:43
 * e-mail：woyzb@vip.qq.com
 */
import api from "../../api/index";

const state = {
  filterData: {
    trainTypeList: [],
    companyList: [],
    gradeList: [],
    studentInfo: {},
    matchTypeList: [],
    jobtitleList: []
  },
  studentInfo: {}
};

const mutations = {
  SET_FILTER_DATA: (state, data) => {
    state.filterData = data;
  },
  SET_STUDENT_INFO: (state, data) => {
    state.studentInfo = data;
  }
};

const getters = {
  stu_filterData: state => state.filterData,
  /**
   * 年级列表
   * @param state
   */
  stu_gradeList: state => state.filterData.gradeList,
  /**
   * 实习类型
   * @param state
   */
  stu_trainTypeList: state => state.filterData.trainTypeList,
  /**
   * 公司列表
   * @param state
   */
  stu_companyList: state => state.filterData.companyList,
  /**
   * 岗位类型
   * @param state
   */
  stu_matchTypeList: state => state.filterData.matchTypeList,
  /**
   * 岗位列表
   * @param state
   */
  stu_jobtitleList: state => {
    let jobtitleList = {};
    state.filterData.jobtitleList.forEach(item => {
      if (!jobtitleList[item.companyId]) jobtitleList[item.companyId] = [];
      jobtitleList[item.companyId].push(item);
    });
    return jobtitleList;
  },
  /**
   * 学生信息
   * @param state
   */
  stu_studentInfo: state => state.filterData.studentInfo
};

const actions = {
  doGetStudentFilterData({commit, state}, data) {
    console.log("action.doGetStudentFilterData:", data);
    return new Promise((resolve, reject) => {
      api.doRequest("/train/train/getFilter", "get", data).then(response => {
        commit("SET_FILTER_DATA", response);
        resolve(response);
      });
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
