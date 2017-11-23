/**
 * 实习指导
 * FileName：guidance
 * Created By No.3 On 2017/11/15 0015 19:02
 * e-mail：woyzb@vip.qq.com
 */
import api from "../../api/index";
import {USER_ID} from "src/config/env";
const state = {
  guidanceTypeList: [],
  recordFilter: {}
};

const mutations = {
  SET_GUIDANCE_TYPE_LIST: (state, data) => {
    state.guidanceTypeList = data;
  },
  SET_RECORD_FILTER: (state, data) => {
    state.recordFilter = data;
  }
};

const getters = {
  /**
   * 实习指导类型列表
   * @param state
   */
  guidanceTypeList: state => state.recordFilter.typeList,
  guidanceTeacherVo: state => state.recordFilter.teacherVo,
  guidanceClassList: state => state.recordFilter.classList
};

const actions = {
  /*  doGetGuidanceTypeFilter({commit, state}, data) {
   return new Promise((resolve, reject) => {
   api.doRequest("/trian/guidancetype/getSelect", "get").then(response => {
   commit("SET_GUIDANCE_TYPE_LIST", response);
   resolve(response);
   });
   });
   },*/
  doGetRecordFilter({commit, state}, data) {
    return new Promise((resolve, reject) => {
      api.doRequest("/train/record/getFilter", "get", {userId: USER_ID}).then(response => {
        commit("SET_RECORD_FILTER", response);
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
