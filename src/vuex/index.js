import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";

import common from "./modules/common";
import app from "./modules/app";
import student from "./modules/student";
import admin from "./modules/admin";
import permission from "./modules/permission";
import guidance from "./modules/guidance";
import getters from "./getters";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    app,
    common,
    admin,
    student,
    permission,
    guidance
  },
  strict: debug
});
