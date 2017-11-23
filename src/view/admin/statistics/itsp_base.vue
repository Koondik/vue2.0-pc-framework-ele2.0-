<!-- list 模块 -->
<template>
  <div>
    <container>
      <div slot="title">实习基本情况信息汇总</div>
      <div slot="tools">
        <el-button type="primary" @click="dialogVisible = true" icon="plus">导出</el-button>
      </div>
      <div slot="conditions" class="handleBtnPanel_sm">
        <!--filterable-->
        <el-select v-model="conditionParams.majorId" clearable placeholder="学年" @change="conditionParams.classId=null">
          <el-option
            v-for="(item,key) in getFilterData.majorList"
            :key="key"
            :label="item.majorName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="conditionParams.classId" clearable placeholder="学期">
          <el-option
            v-for="(item,key) in getClassByMajorId(conditionParams.majorId)"
            :key="key"
            :label="item.className"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="conditionParams.classId" clearable placeholder="班级">
          <el-option
            v-for="(item,key) in getClassByMajorId(conditionParams.majorId)"
            :key="key"
            :label="item.className"
            :value="item.id">
          </el-option>
        </el-select>
        <el-input class="search-ipt" placeholder="学号、姓名" v-model="conditionParams.searchText">
          <el-button class="ipt-append-btn" type="primary" slot="append" @click="doGetList()">查询</el-button>
        </el-input>
      </div>
      <template slot="body">
        <el-table ref="listTable" border :data="list" empty-text="暂无数据" @selection-change="rowSelect" style="width: 100%">
          <el-table-column align="center" type="selection" width="50"></el-table-column>
          <el-table-column align="center" prop="certificateNo" width="80" label="序号"></el-table-column>
          <el-table-column align="center" label="证书名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="span-btn" @click="editCertificateInfo(scope.row)" v-text="scope.row.certificateTypeName"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="studentName" label="学生" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="majorName" label="专业" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="certificateLevel" label="证书等级" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="certificateProfession" label="证书工种" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="certificateCost" label="收费标准" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="needExam" label="是否考试">
            <template slot-scope="scope">
              <span v-text="getNeedExamStr(scope.row.needExam)"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="考试时间">
            <template slot-scope="scope">
              <span v-text="getFormatDate(scope.row.examDate)"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="上传图片">
            <template slot-scope="scope">
              <img style="height: 40px;width: auto" :src="getDfsImg(scope.row.fileUuid)" alt="">
            </template>
          </el-table-column>
          <el-table-column align="center" prop="checkStatusName" label="审核状态"></el-table-column>
        </el-table>
      </template>
      <div slot="footer" v-if="list.length">
        <div class="table-pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="conditionParams.pageIndex"
            :page-size="conditionParams.pageSize"
            layout=" prev, pager, next ,total"
            :total="totalTableData">
          </el-pagination>
        </div>
      </div>
    </container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import importFile from "src/components/ImportFile";
import {
  getStore,
  formatDate,
  notifyBox,
  deleteConfirm,
  getCheckedIds
} from "src/config/mUtils";
import { FILE_SYSTEM_API, USER_ID } from "src/config/env";
export default {
  name: "inquire",
  components: { importFile },
  data() {
    return {
      totalTableData: 0,
      selectedList: [],
      conditionParams: {
        majorId: null,
        classId: null,
        searchText: null,
        checkStatus: -1,
        pageIndex: 1,
        pageSize: 15
      },
      modalData: {
        certificateCost: null,
        certificateLevel: null,
        certificateNo: null,
        certificateProfession: null,
        certificateTypeId: null,
        certificateTypeName: null,
        checkStatus: null,
        checkStatusName: null,
        checkUserId: null,
        classId: null,
        examDate: null,
        fileUuid: null,
        id: null,
        inputUserId: null,
        majorId: null,
        majorName: null,
        needExam: true,
        studentCode: null,
        studentId: null,
        studentName: null,
        tenantId: null
      },
      list: [],
      studentInfo: {},
      dialogVisible: false
    };
  },
  methods: {
    async doDelete() {
      if (!this.selectedList.length) {
        return this.$message.warning("请至少选择一条数据");
      }
      if (await deleteConfirm.call(this)) {
        let ids = getCheckedIds(this.selectedList);
        let res = await this.$api.doRequest(
          "/certificate/certificate",
          "delete",
          { ids: ids.join(",") }
        );
        if (res.code) {
          notifyBox.delSuccess.call(this);
          this.doGetList();
        }
        console.log("删除结果：", res);
      }
    },
    async doGetList() {
      let res = await this.$api.doRequest(
        "/certificate/certificate/getPaged",
        "get",
        this.conditionParams
      );
      this.list = res.list;
      this.totalTableData = res.total;
      console.log("列表：", res.list);
    },
    editCertificateInfo(data) {
      this.modalData = Object.assign({}, data);
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.conditionParams.pageSize = val;
      this.doGetList();
    },
    handleCurrentChange(val) {
      this.conditionParams.pageIndex = val;
      this.doGetList();
    },
    rowSelect(val) {
      this.selectedList = val;
    },
    closeDialog() {
      let params = Object.assign(this.modalData, this.studentInfo, {
        inputUserId: USER_ID
      });
      console.log("params.fileUuidparams.fileUuid--->", params.fileUuid);
      if (!params.fileUuid) return alert("缺少证书文件");
      params.examDate = formatDate(params.examDate, "yyyy-MM-dd HH:mm:ss");
      let url = "/certificate/certificate";
      let methodType = "post";
      if (params.id) {
        url = url.concat("/" + params.id);
        methodType = "put";
      }
      this.$api.doRequest(url, methodType, {}, params).then(res => {
        if (res.code === 1) {
          this.$notify({
            title: (params.id ? "新增" : "修改") + "成功",
            message: "您填写的证书信息已经成功提交，请耐心等待管理员审核！",
            type: "success"
          });
          this.doGetList();
          this.dismissDialog();
        }
        console.log("新增结果：", res);
      });
    },
    dismissDialog() {
      this.modalData = {
        certificateCost: null,
        certificateLevel: null,
        certificateNo: null,
        certificateProfession: null,
        certificateTypeId: null,
        certificateTypeName: null,
        checkStatus: null,
        checkStatusName: null,
        checkUserId: null,
        classId: null,
        examDate: null,
        fileUuid: null,
        id: null,
        inputUserId: null,
        majorId: null,
        majorName: null,
        needExam: true,
        studentCode: null,
        studentId: null,
        studentName: null,
        tenantId: null
      };
      this.dialogVisible = false;
    }
  },
  mounted() {
    this.studentInfo = getStore("STUDENT_INFO");
    this.doGetList();
  },
  computed: {
    ...mapGetters(["getFilterData", "getClassByMajorId"]),
    getFormatDate: () => date => {
      return formatDate(date, "yyyy-MM-dd HH:mm");
    },
    getDfsImg: () => uuid => {
      return FILE_SYSTEM_API + "/file/IoReadFile?uuid=" + uuid;
    },
    getNeedExamStr: () => exam => {
      return exam ? "是" : "否";
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped></style>
