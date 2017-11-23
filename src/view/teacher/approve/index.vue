<!-- list 模块 -->
<template>
  <div>
    <container>
      <template slot="title">实习审批</template>
      <template slot="tabs">
        <el-tabs v-model="activeName" @tab-click="tabStatusChange">
          <el-tab-pane label="全部" name="-1" status="-1"></el-tab-pane>
          <el-tab-pane label="待审批" name="0" status="0"></el-tab-pane>
          <el-tab-pane label="已通过" name="1" status="1"></el-tab-pane>
          <el-tab-pane label="不通过" name="2" status="2"></el-tab-pane>
        </el-tabs>
      </template>
      <template slot="tools">
        <el-button type="danger" @click="doApprove(2)">
          <i class="iconfont icon-tree"></i>一键拒绝</el-button>
        <el-button type="primary" @click="doApprove(1)">
          <i class="iconfont icon-tree"></i>一键通过</el-button>
      </template>
      <template slot="conditions" class="handleBtnPanel_sm">
        <!--     <el-select v-model="conditionParams.trainTypeId" clearable placeholder="实习类型">
          <el-option :label="item.value" :value="item.id" v-for="item in stu_trainTypeList" :key="item.id"></el-option>
        </el-select>
        <el-select v-model="conditionParams.matchTypeId" clearable placeholder="岗位类型">
          <el-option :label="item.value" :value="item.id" v-for="item in stu_matchTypeList" :key="item.id"></el-option>
        </el-select>-->
        <el-input class="search-ipt" placeholder="学生姓名、学号" v-model="conditionParams.searchText">
          <el-button class="ipt-append-btn" type="primary" slot="append" @click="doGetList()">查询</el-button>
        </el-input>
      </template>
      <template slot="body">
        <el-table ref="listTable" border :data="list" empty-text="暂无数据" @selection-change="rowSelect" style="width: 100%">
          <el-table-column align="center" type="selection" width="50"></el-table-column>
          <el-table-column align="center" width="200" prop="studentCode" label="学号"></el-table-column>
          <el-table-column align="center" width="180" label="学生姓名" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="span-btn" @click="editInfo(scope.row)" v-text="scope.row.studentName"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200" prop="companyName" label="实习单位"></el-table-column>
          <el-table-column align="center" width="200" prop="jobtitleName" label="实习岗位"></el-table-column>
          <el-table-column align="center" width="200" prop="trainTypeName" label="实习类型"></el-table-column>
          <el-table-column align="center" width="200" prop="matchTypeName" label="岗位类型"></el-table-column>
          <el-table-column align="center" width="200" prop="studentName" label="实习起止时间">
            <template slot-scope="scope">
              <span class="mgr-5">{{scope.row.startDate|date('yyyy-MM-dd')}}</span>
              至
              <span class="mgl-5">{{scope.row.endDate|date('yyyy-MM-dd')}}</span>
              <!--共-->
              <!--<span >{{scope.row.totalDays}}</span>天-->
            </template>
          </el-table-column>
          <el-table-column align="center" label="审批状态">
            <template slot-scope="scope">
              <span :class="'approve-text__'+scope.row.checkStatus">{{scope.row.checkStatusName}}</span>
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
    <el-form ref="itspCompanyPostForm" :model="formData" :rules="rules" label-position="right" label-width="120px">
      <el-dialog :visible.sync="dialogVisible" width="44%">
        <div slot="title" class="dialog_header">新增指导记录</div>
        <div class="dialog_body">
          <el-row>
            <el-col :span="10" :offset="2">
              <el-form-item label="学生姓名：">
                {{formData.studentName}}
              </el-form-item>
              <el-form-item label="实习单位：">
                {{formData.companyName}}
              </el-form-item>
              <el-form-item label="实习岗位：">
                {{formData.jobtitleName}}
              </el-form-item>
              <el-form-item label="实习时间：">
                <span class="mgr-5">{{formData.startDate|date('yyyy-MM-dd')}}</span>
                至
                <span class="mgl-5">{{formData.endDate|date('yyyy-MM-dd')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="学号：">
                {{formData.studentCode}}
              </el-form-item>
              <el-form-item label="实习类型：">
                {{formData.trainTypeName}}
              </el-form-item>
              <el-form-item label="岗位类型：">
                {{formData.matchTypeName}}
              </el-form-item>
              <el-form-item label="审核状态：">
                <span class="approve-label" :class="'approve-label__'+formData.checkStatus" v-text="formData.checkStatusName"></span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="primary" @click="doApprove(1,formData.id)">审批通过</el-button>
          <el-button type="danger" @click.native="doApprove(2,formData.id)">不通过</el-button>
        </div>
      </el-dialog>
    </el-form>
    <!--form end-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { notifyBox, deleteConfirm, getCheckedIds } from "src/config/mUtils";
import { USER_ID } from "src/config/env";
export default {
  name: "itsp_guidance",
  components: {},
  data() {
    return {
      list: [],
      activeName: "-1",
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
      rules: {},
      conditionParams: {
        checkStatus: -1,
        companyId: 0,
        searchText: null,
        pageIndex: 1,
        pageSize: 15
      }
    };
  },
  methods: {
    async doDelete() {
      if (!this.selectedList.length) return this.$message.warning("请至少选择一条数据");
      if (await deleteConfirm.call(this)) {
        let ids = getCheckedIds(this.selectedList);
        let res = await this.$api.doRequest("/train/company", "delete", {
          list: ids.join(",")
        });
        if (!res.code) {
          notifyBox.delSuccess.call(this);
          this.doGetList();
        }
      }
    },
    async doApprove(status, id) {
      if (!this.selectedList.length && !id) {
        return this.$message.warning("请至少选择一条数据");
      }
      this.$confirm(`您确认${status === 1 ? "通过" : "拒绝"}该申请吗?`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "danger",
        type: "warning"
      }).then(async () => {
        let ids = getCheckedIds(this.selectedList);
        id && ids.push(id);
        let res = await this.$api.doRequest("/train/train/check", "get", {
          checkStatus: status,
          trainIds: ids.join(",")
        });
        if (!res.code) {
          this.$notify.success({
            title: "操作成功",
            message: `该申请${status === 1 ? "通过" : "拒绝"}成功！`,
            duration: 3000
          });
          this.dialogVisible = false;
          this.doGetList();
        }
      });
    },
    async doGetList() {
      let res = await this.$api.doRequest(
        "/train/train/getPaged",
        "get",
        this.conditionParams
      );
      this.list = res.list;
      this.totalTableData = res.total;
    },
    editInfo(data) {
      this.formData = Object.assign({}, data);
      this.dialogVisible = true;
    },
    tabStatusChange(target) {
      this.conditionParams.checkStatus = parseInt(target.name);
      this.doGetList();
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
    doSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return false;
        let params = Object.assign(this.formData, this.studentInfo, {
          inputUserId: USER_ID
        });
        let url = "/train/jobttitle";
        let methodType = "post";
        if (params.id) {
          methodType = "put";
          url = url.concat("/" + params.id);
        }
        this.$api.doRequest(url, methodType, {}, params).then(res => {
          if (!res.code) {
            this.$notify({
              title: (params.id ? "新增" : "修改") + "成功",
              message: "您填写的公司信息已经成功提交！",
              type: "success"
            });
            this.doGetList();
            this.dismissDialog();
          }
        });
      });
    },
    dismissDialog(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    }
  },
  mounted() {
    this.$store.dispatch("doGetStudentFilterData").then(() => {
      this.doGetList();
    });
  },
  computed: {
    ...mapGetters(["stu_trainTypeList", "stu_matchTypeList"])
  }
};
</script>

<style lang="scss" type="text/scss" scoped></style>
