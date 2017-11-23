import api from "../../api/index";
import {SET_FILTER_LIST} from "../mutations-types";

const state = {
  paginationConfig: {pageSizes: [10, 20, 30, 40, 50, 100, 150]},
  filterData: null,
  companyFilterData: {},
  companyPostFilterData: {}
};

const mutations = {
  [SET_FILTER_LIST](state, data) {
    state.filterData = data;
  },
  SET_COMPANY_FILTER_DATA: (state, data) => {
    state.companyFilterData = data;
  },
  SET_COMPANY_POST_FILTER_DATA: (state, data) => {
    state.companyPostFilterData = data;
  }
};

const getters = {};

const actions = {
  doGetCompanyFilterData({commit, state}) {
    return new Promise((resolve, reject) => {
      api.doRequest("/train/company/getFilter", "get").then(response => {
        console.log("response--->", response);
        commit("SET_COMPANY_FILTER_DATA", response);
        resolve(response);
      });
    });
  },
  doGetCompanyPostFilterData({commit, state}) {
    return new Promise((resolve, reject) => {
      api.doRequest("/train/jobttitle/getFilter", "get").then(response => {
        console.log("response--->", response);
        commit("SET_COMPANY_POST_FILTER_DATA", response);
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
