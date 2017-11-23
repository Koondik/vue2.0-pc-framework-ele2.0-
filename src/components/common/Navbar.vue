<template>
  <div class="header">
    <div class="header-left">
      <a class="logo">
        <img :src="getLogo" alt="logo">
      </a>
      <span class="tenantName" v-show="schoolName">{{schoolName}}</span>
      <span class="sys-name">实习管理系统
        <sub>v1.0</sub>
      </span>
    </div>
    <div class="header-right">
      <div class="user-info">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="iconfont icon-user"></i>
            <span>{{username}}</span>
            <i class="iconfont icon-caret" style="font-size:14px;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="margin: 0 10px;font-size:18px;">|</span>
        <a style="cursor:pointer;color: #fff" @click="exitSystem()">应用中心
          <i class="iconfont icon-exit"></i>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import {
  CLOUD_LOGIN_ROOT,
  FILE_SYSTEM_API,
  ACCESS_TOKEN,
  USER_TYPE_ID,
  SCHOOL_INFO,
  USER_NAME
} from "src/config/env";
import { removeStore } from "src/config/mUtils";
export default {
  data() {
    return {
      name: "admin"
    };
  },
  computed: {
    username() {
      return USER_NAME || this.name;
    },
    schoolName() {
      return SCHOOL_INFO.tenantName;
    },
    getLogo() {
      return (
        FILE_SYSTEM_API +
        "/file/IoReadFile?access_token=" +
        ACCESS_TOKEN +
        "&uuid=632caf5cb71545f6a8a9fff8ca9658c2"
      );
    }
  },
  methods: {
    exitSystem(isLoginOut) {
      let self = this;

      let removeStoreInfo = function() {
        removeStore("STUDENT_INFO");
        removeStore("currentFullPath");
      };

      function logout() {
        self
          .$confirm("确定要注销当前登录信息？", "温馨提示", {
            confirmButtonText: "注销",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            removeStore("cloud");
            removeStoreInfo();
            window.location.href =
              CLOUD_LOGIN_ROOT + "/cloud/#/CloudPlatform/home";
          });
      }

      function goToAppCenter() {
        window.location.href = CLOUD_LOGIN_ROOT + "/cloud/#/CloudUser/AppMain";
        //                    self.$confirm("是否退出当前系统?", "警告", {confirmButtonText: "确定", cancelButtonText: "取消", type: "warning"}).then(() => {
        //                        window.location.href = (CLOUD_LOGIN_ROOT + "/cloud/#/CloudUser/AppMain");
        //                    });
      }
      // goToAppCenter();
      switch (USER_TYPE_ID) {
        case 10: // 学校管理员
        case 11: // 学校管理员
        case 12: // 学校管理员
          isLoginOut ? logout() : goToAppCenter();
          break;
        case 13: // 老师
        case 14: // 学生
          isLoginOut ? logout() : "";
          break;
      }
    },
    handleCommand(command) {
      if (command === "loginout") {
        this.exitSystem(true);
      }
    }
  }
};
</script>
<style lang="scss" type="text/scss" scoped></style>
