<template>
  <div class="basis" :class="{'full-screen':is_full_screen}">
    <navbar></navbar>
    <div class="clearfix main-wrap">
      <sidebar></sidebar>
      <div class="main-content clearfix" :class="{'main-content--nosidebar':is_full_screen}">
        <router-view keep-alive></router-view>
      </div>
    </div>
    <back-to-top></back-to-top>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
import backToTop from "../back_to_top/back_to_top.vue";
import { IS_FULL_SCREEN } from "src/config/env";
export default {
  name: "basis",
  components: { Navbar, Sidebar, backToTop },
  created() {
    this.isFullScreen = IS_FULL_SCREEN;
  },
  data() {
    return {};
  },

  methods: {},
  mounted() {},
  computed: {
    ...mapGetters(["permission_routers", "is_full_screen"])
  }
};
</script>
<style>
.hidden {
  display: none;
}

/*  .main-content--nosidebar {
      left: 0 !important;
    }*/
</style>
