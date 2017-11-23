<!-- 选课列表 -->
<template>
  <div class="containerHeader">
    <el-card style="margin-bottom: 8px;">
      <el-row>
        <el-col :span="12" class="headerName">
          <i class="iconfont icon-location"> </i>
          <span>
          所在位置: {{getHeaderName}}
        </span>
        </el-col>
        <el-col :span="12" style="text-align: right;" v-if="backRoute">
          <router-link class="back" :to='backRoute'> 返回</router-link>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    urlName: {
      type: String
    },
    backRoute: {
      type: Object
    },
    urlNameList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  computed: {
    getHeaderName() {
      if (this.urlNameList.length) {
        return this.urlNameList.join(" > ");
      } else {
        return this.urlName ? " > " + this.urlName : "选课设置";
      }
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.headerName {
  color: #999;
}
</style>
