<template>
  <div class="export-file">
    <el-button  type="primary" @click="doExport()"><i class="iconfont icon-export"></i>导出</el-button>
  </div>
</template>

<script>
import api from "src/api/index";
export default {
  props: {
    exportUrl: {
      type: String
    },
    conditions: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    async doExport() {
      api.exportFile(this.exportUrl, this.conditions);
    }
  }
};
</script>
<style type="text/css" scoped="scoped">
.export-file {
  display: inline-block;
  text-align: left;
}
</style>
