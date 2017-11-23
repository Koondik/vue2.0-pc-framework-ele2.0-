/**
 * FileName：studnet
 * Created By No.3 On 2017/11/13 0013 15:43
 * e-mail：woyzb@vip.qq.com
 */
import api from "../../api/index";

const state = {
  adminFilterData: {
    classList: [],
    yearList: []
  }
};

const mutations = {
  SET_ADMIN_FILTER_DATA: (state, data) => {
    state.adminFilterData = data;
  }
};

const getters = {
  adminFilterData: state => state.adminFilterData
};

const actions = {
  doGetAdminFilterData({commit, state}, data) {
    console.log("action.doGetStudentFilterData:", data);
    return new Promise((resolve, reject) => {
      api.doRequest("/train/report/getFilter", "get", data).then(response => {
        commit("SET_ADMIN_FILTER_DATA", response);
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
