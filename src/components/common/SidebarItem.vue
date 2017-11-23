<template>
  <div class='menu-wrapper'>
    <template v-for="item in getRoutes" v-if="!item.hidden&&item.noDropdown&&item.children.length>0">
      <router-link v-for="(menuItem,key) in item.children" :key="key" :to="item.path+menuItem.path">
        <el-menu-item :index="item.path+menuItem.path" class='submenu-title-noDropdown'>
          <!--<icon-svg v-if='menuItem.icon' :icon-class="menuItem.icon"></icon-svg>-->
          <i class="iconfont " :class="'icon-'+menuItem.icon"></i>
          <span v-text="menuItem.name"></span>
        </el-menu-item>
      </router-link>
      <!--{{getRoutes}}-->
      <!--<el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">-->
      <!--<template slot="title">-->
      <!--<icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>-->
      <!--<span>{{item.name}}</span>-->
      <!--</template>-->
      <!--<template v-for="child in item.children" v-if='!child.hidden'>-->

      <!--<sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]'></sidebar-item>-->

      <!--<router-link v-else :to="item.path+'/'+child.path">-->
      <!--<el-menu-item :index="item.path+'/'+child.path">-->
      <!--<icon-svg v-if='child.icon' :icon-class="child.icon"></icon-svg>-->
      <!--<span>{{child.name}}</span>-->
      <!--</el-menu-item>-->
      <!--</router-link>-->
      <!--</template>-->
      <!--</el-submenu>-->
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    }
  },
  computed: {
    getRoutes() {
      return this.routes.filter(item => {
        if (item.meta && item.meta.role === this.$store.getters.userRole) {
          return item.children;
        }
      });
    }
  }
};
</script>

