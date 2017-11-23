<!-- train_list 模块 -->
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import importFile from "src/components/ImportFile";
  export default {
    name: "admin",
    components: {importFile},
    data() {
      return {};
    },
    methods: {}
  };
</script>

<style lang="scss" type="text/scss" scoped></style>
