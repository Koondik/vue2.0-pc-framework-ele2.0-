<!-- uploadFile 模块 -->
<template>
  <div>
    <el-upload class="upload-demo" drag :on-success="uploadSuccess" :action="getUploadActionUrl" multiple></el-upload>
  </div>
</template>

<script>
  import {ACCESS_TOKEN, FILE_SYSTEM_API} from "src/config/env";
  export default {
    name: "uploadFile",
    components: {},
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      uploadSuccess(response, file, flist) {
        if (response.uuid) {
          //this.fileList.push({url: FILE_SYSTEM_API + "/file/IoReadFile" + response.uuid, fileUuid: response.uuid});
          this.$emit("fileUpdate", {
            url: FILE_SYSTEM_API + "/file/IoReadFile?uuid=" + response.uuid,
            fileUuid: response.uuid
          });
        }
      }
    },
    mounted() {
    },
    computed: {
      getUploadActionUrl() {
        return FILE_SYSTEM_API + "/file?access_token=" + ACCESS_TOKEN;
      }
    }
  };
</script>

<style lang="scss" type="text/scss" scoped></style>
