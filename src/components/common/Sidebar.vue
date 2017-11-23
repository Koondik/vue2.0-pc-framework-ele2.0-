<template>
  <!--:collapse="isCollapse"-->
  <div class="sidebar">
    <el-menu mode="vertical" theme="dark" unique-opened :default-active="$route.path">
      <sidebar-item :routes='permission_routers'></sidebar-item>
    </el-menu>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["permission_routers", "sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
