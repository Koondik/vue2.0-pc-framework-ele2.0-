<!-- 选课列表 -->
<template>
  <div class="container">
    <div class="content"

         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
      <div class="content__header">
        <div class="content__header__title">
          <slot name="title"></slot>
        </div>
        <div class="content__header__tabs">
          <slot name="tabs"></slot>
        </div>
        <div class="content__header__tools">
          <slot name="tools"></slot>
        </div>
      </div>
      <div class="content__conditions">
        <slot name="conditions"></slot>
      </div>
      <div class="content__body">
        <slot name="body">
        </slot>
      </div>
      <div class="content__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {},
    components: {},
    data() {
      return {
        loading2: true
      };
    },
    methods: {},
    mounted() {
      this.loading2 = this.$api.loadingStatus;
    },
    computed: {}
  };
</script>

<style lang="scss" type="text/scss">
  $headerHeight: 50px;
  .container {
    margin: 15px;
    background-color: #fff;
    border-radius: 2px;
    .content {
      padding: 15px;
      .content__header {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        height: $headerHeight;
        line-height: $headerHeight;
        border-bottom: 1px solid #cddef2;
        .content__header__title,
        .content__header__tabs,
        .content__header__tools {
          flex-wrap: wrap;
        }
        .content__header__title {
          width: 150px;
          flex-wrap: wrap;
          color: #4e97d9;
          font-size: 16px;
          font-weight: bold;
        }
        .content__header__tabs {
          width: 50%;
          padding-left: 15px;
          .el-tabs__header {
            border-bottom: none;
          }
        }
        .content__header__tools {
          width: 45%;
          text-align: right;
        }
      }
      .content__conditions {
        margin: 10px 0;
        .label-btn {
          display: inline-block;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          background: #fff;
          border: 1px solid #d8dce5;
          color: #5a5e66;
          -webkit-appearance: none;
          text-align: center;
          box-sizing: border-box;
          outline: 0;
          -webkit-transition: .1s;
          transition: .1s;
          padding: 10px 14px;
          border-radius: 4px;
          margin: 0 8px 0 0;
          &:hover {
            opacity: .85;
          }
          &:active {
            transform: translateY(1px);
            color: red;
          }
          &.active {
            color: #fff;
            border: 1px solid $mainColor;
            background-color: $mainColor;
          }
        }
      }
      .content__body {
      }
      .content__footer {
        margin-top: 15px;
        text-align: center;
      }
    }
  }
</style>
