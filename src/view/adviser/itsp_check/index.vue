<!-- list 模块 -->
<template>
  <div>
    <container>
      <template slot="title">实习查看</template>
      <template slot="tools">
        <!--<el-button type="primary" @click="dialogVisible = true" icon="el-icon-plus">导出</el-button>-->
      </template>
      <template slot="conditions" class="handleBtnPanel_sm">
        <el-select v-model="conditionParams.companyId" clearable placeholder="公司" @change="doGetList()">
          <el-option :label="item.value" :value="item.id" v-for="item in stu_companyList" :key="item.id"></el-option>
        </el-select>
        <el-select v-model="conditionParams.jobtitleId" clearable placeholder="职位" @change="doGetList()">
          <el-option :label="item.jobtitleName" :value="item.id" v-for="item in stu_jobtitleList[conditionParams.companyId]" :key="item.id"></el-option>
        </el-select>
        <el-input class="search-ipt" placeholder="查询" v-model="conditionParams.searchText">
          <el-button class="ipt-append-btn" type="primary" slot="append" @click="doGetList()">查询</el-button>
        </el-input>
      </template>
      <template slot="body">
        <el-table ref="listTable" border :data="list" empty-text="暂无数据" style="width: 100%">
          <el-table-column align="center" prop="companyName" label="公司名称"></el-table-column>
          <el-table-column align="center" prop="jobtitleName" label="职位名称" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" width="240px" prop="cityName" label="工作地点"></el-table-column>
          <el-table-column align="center" label="发布时间">
            <template slot-scope="scope">
              {{scope.row.inputTime|date("yyyy-MM-dd")}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="remark" label="报名人数">
            <template slot-scope="scope">
              <span class="span-btn" @click="editInfo(scope.row)">{{scope.row.studentCount}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template slot="footer" v-if="list.length">
        <div class="table-pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="conditionParams.pageIndex" :page-size="conditionParams.pageSize" layout=" prev, pager, next ,total" :total="totalTableData">
          </el-pagination>
        </div>
      </template>
    </container>
    <!-- form start-->
    <el-dialog :visible.sync="dialogVisible" width="44%">
      <div slot="title" class="dialog_header">{{formData.companyName}}（{{formData.studentCount}}人）</div>
      <div class="dialog_body">
        <el-table ref="listTable" border :data="jobStudentList" height="320" empty-text="暂无报名人员" style="width: 100%">
          <el-table-column align="center" prop="studentCode" label="学号"></el-table-column>
          <el-table-column align="center" prop="studentName" label="姓名"></el-table-column>
          <el-table-column align="center" prop="sexName" label="性别"></el-table-column>
          <el-table-column align="center" prop="className" label="班级"></el-table-column>
          <el-table-column align="center" prop="teacherName" label="班主任"></el-table-column>
        </el-table>
      </div>
      <!--<div slot="footer" class="dialog-footer text-center">-->
      <!--<el-button type="primary" icon="el-icon-upload2" @click="doSubmit('itspCompanyPostForm')">导出到Excle</el-button>-->
      <!--</div>-->
    </el-dialog>
    <!--form end-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import importFile from "src/components/ImportFile";
import { isArray } from "src/config/mUtils";
import { USER_ID } from "src/config/env";
export default {
  name: "itsp_check",
  components: { importFile },
  data() {
    return {
      list: [],
      jobStudentList: [],
      selectedList: [],
      totalTableData: 0,
      dialogVisible: false,
      formData: {
        id: 0,
        salary: 0,
        tenantId: 0,
        companyId: 0,
        teacherId: 0,
        headCounts: 0,
        inputUserId: 0,
        checkStatus: 0,
        updateUserId: 0,
        recordStatus: true,
        remark: null,
        endDate: null,
        inputTime: null,
        startDate: null,
        updateTime: null,
        teacherName: null,
        companyName: null,
        jobtitleName: null,
        checkStatusName: null
      },
      conditionParams: {
        companyId: null,
        jobtitleId: null,
        searchText: null,
        pageIndex: 1,
        pageSize: 15
      }
    };
  },
  methods: {
    async doGetList() {
      let res = await this.$api.doRequest(
        "/train/jobttitle/getStat",
        "get",
        this.conditionParams
      );
      this.list = res.list;
      this.totalTableData = res.total;
    },
    async doGetJobStudent(data) {
      console.log("data::", data);
      new Promise(async (resolve, reject) => {
        let res = await this.$api.doRequest(
          "/train/jobttitle/getStudentListByJobtitleId",
          "get",
          { jobtitleId: data.id }
        );
        if (isArray(res)) {
          this.jobStudentList = res;
        } else {
          this.jobStudentList.length = 0;
        }
        resolve(this.jobStudentList);
      });
    },
    editInfo(data) {
      this.formData = Object.assign({}, data);
      this.jobStudentList.length = 0;
      this.doGetJobStudent(this.formData).then(() => {
        this.dialogVisible = true;
      });
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
    dismissDialog(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    }
  },
  mounted() {
    this.$store
      .dispatch("doGetStudentFilterData", { userId: USER_ID })
      .then(res => {
        this.doGetList();
      });
  },
  computed: {
    ...mapGetters(["stu_companyList", "stu_jobtitleList"])
  }
};
</script>

<style lang="scss" type="text/scss" scoped></style>
