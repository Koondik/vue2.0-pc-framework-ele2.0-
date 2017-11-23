<template>
  <div class="export-file">
    <el-button type="primary" @click="dialogVisible = true">
      <i class="iconfont icon-import"></i>{{getBtnTxt}}
    </el-button>
    <el-dialog :width="modalSize" :close-on-click-modal="false" :visible.sync="dialogVisible" :show-close="false">
      <div class="dialog_header pdb-0" slot="title">
        <span v-text="title"></span>
        <a type="text" class="pull-right font-xs" :href="getTemplateUrl" target="_blank">点击下载模板</a>
      </div>
      <div slot="" v-loading="uploadLoading" element-loading-text="文件正在上传，请稍后...">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-upload
              class="upload-demo"
              drag
              name="file"
              :action="getActionUrl"
              :multiple="false"
              :show-file-list="false"
              :before-upload="beforeUploadFn"
              :on-success="uploadSuccess">
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-col>
          <el-col :span="16">
            <div class="error-list" v-if="uploadErrorList">
              <table id="css_table">
                <tr class="table-header">
                  <th>错误类型</th>
                  <th>错误内容</th>
                </tr>
                <tr class="css_tr" v-for="(item , key) in uploadErrorList" :key="item">
                  <td class="css_td">
                    <span v-text="key"></span>
                  </td>
                  <td class="css_td text-danger">
                    <div v-html="item"></div>
                  </td>
                </tr>
              </table>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer text-center ">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  BASE_URL,
  ACCESS_TOKEN,
  TENANT_ID,
  USER_ID,
  USER_TYPE_ID
} from "../config/env";
export default {
  components: {},
  props: {
    btnTxt: {
      type: String
    },
    title: {
      type: String
    },
    uploadUrl: {
      type: String
    },
    modalSize: {
      type: String,
      default: "60%"
    },
    conditions: {
      type: Object
    }
  },
  data() {
    return {
      uploadLoading: false,
      actionUrl: null,
      fileList: [],
      dialogVisible: false,
      uploadErrorList: null,
      fileModalForm: {}
    };
  },
  methods: {
    beforeUploadFn() {
      this.uploadLoading = true;
    },
    handleClose(done) {},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    downloadTmp: function() {
      let url = "../static/xlsx/" + this.title + "模板.xlsx";
      window.open(url, "_blank");
    },
    uploadSuccess(res, file, fileList) {
      console.log(res, file, fileList);
      switch (res.code) {
        case 1:
          this.dialogVisible = false;
          this.$notify({
            title: "导入成功",
            message: this.title + "信息已成功导入！",
            type: "success"
          });
          this.$emit("importSuccess");
          break;
        case 100:
          this.uploadErrorList = res.data || {
            1: `------${res.detail}------ <br> ${res.message}`
          };
          break;
      }
      this.uploadLoading = false;
    }
    /*  async doImport(){
       let file = document.getElementById("templateIpt").files[0];
       console.log("=-=-=-", file, file);
       if (!file) return layer.alert("请先选择模板文件", {icon: 0});
       let fd = new FormData();
       fd.append('file', document.getElementById("templateIpt").files[0]);
       console.log("fd::", fd);
       await api.uploadFile(this.uploadUrl, fd, this.conditions)
       }*/
  },
  mounted() {
    this.uploadErrorList = null;
  },
  watch: {
    dialogVisible: function(val, oldVal) {
      val || (this.uploadErrorList = null);
    }
  },
  computed: {
    getBtnTxt() {
      return this.btnTxt ? this.btnTxt : this.title ? this.title : "导入";
    },
    getActionUrl() {
      let url = BASE_URL + this.uploadUrl;
      let conditions = this.conditions || {};
      console.log("ACCESS_TOKEN", ACCESS_TOKEN);
      conditions["access_token"] = ACCESS_TOKEN;
      conditions["tenantId"] = TENANT_ID;
      conditions["userId"] = USER_ID;
      conditions["userTypeId"] = USER_TYPE_ID;
      let dataStr = "";
      Object.keys(conditions).forEach(key => {
        if (conditions[key]) dataStr += key + "=" + conditions[key] + "&";
      });
      if (dataStr !== "") {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
        url = url + "?" + dataStr;
      }
      return url;
    },
    getTemplateUrl() {
      return "static/xlsx/" + this.title + "模板.xlsx";
    }
  }
};
</script>
<style type="text/scss" lang="scss" scoped="scoped">
.export-file {
  display: inline-block;
  text-align: left;
  .iconfont {
    font-size: 14px;
  }
}

.error-list {
  position: relative;
  border: 1px solid #ff8d00;
  min-height: 200px;
  border-radius: 0 4px 4px 4px;
  box-shadow: 2px 4px 11px 2px rgba(255, 141, 0, 0.15);
  max-height: 480px;
  overflow: auto;
  &:before {
    content: "错误信息";
    position: absolute;
    display: inline-block;
    background: #ff394a;
    border-radius: 4px 4px 0 0;
    color: #fff;
    padding: 4px;
    height: 18px;
    width: 70px;
    line-height: 18px;
    text-align: center;
    top: -28px;
    left: -2px;
    border: 1px solid #ff8d00;
  }
}

.table-header {
  background-color: #f3f3f3;
}

table,
th,
td {
  border: 1px solid #ccc;
  border-collapse: collapse;
}

table {
  width: 100%;
  tr {
    line-height: 34px;
    text-align: center;
    th {
      font-weight: bold;
    }
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 140px;
  line-height: 180px;
  text-align: center;
}
</style>
