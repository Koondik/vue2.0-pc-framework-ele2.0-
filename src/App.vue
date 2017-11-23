<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  directives: {},
  mounted() {}
};
</script>

<style lang="scss" type="text/scss">
/*@import "../static/sass/custom";*/

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-radio + .el-radio {
  margin-left: 12px;
}

.el-dialog__body {
  padding: 20px;
}

.el-dialog__headerbtn {
  position: absolute;
  right: 22px;
  top: 22px;
}

.train-box {
  position: relative;
  border-top: 1px dashed #e6e6e6;
  margin: 44px auto 0;
  padding: 20px 0;
  &:before {
    position: absolute;
    content: attr(title);
    background-color: #f2f6f8;
    height: 24px;
    text-align: center;
    top: -30px;
    left: 0;
    padding: 3px 12px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
}

.train-box--lg {
  width: 80%;
}

.train-box--sm {
  width: 50%;
}
</style>
