<!-- list 模块 -->
<template>
  <div>
    <container>
      <template slot="title">实习岗位</template>
      <template slot="tools">
        <!--<el-button type="primary" @click="dialogVisible = true" icon="el-icon-plus">新增</el-button>-->
        <!--<el-button type="danger" @click="doDelete()" icon="el-icon-delete">删除</el-button>-->
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
        <el-table ref="listTable" border :data="list" empty-text="暂无数据" @selection-change="rowSelect" style="width: 100%">
          <!--<el-table-column align="center" type="selection" width="50"></el-table-column>-->
          <el-table-column align="center" label="周次" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="span-btn" @click="editInfo(scope.row)" v-text="scope.row.weekName"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="studentName" width="160" label="学生姓名"></el-table-column>
          <el-table-column align="center" prop="className" width="160" label="所属班级"></el-table-column>
          <el-table-column align="center" prop="companyName" width="220" label="实习公司"></el-table-column>
          <el-table-column align="center" prop="jobtitleName" width="160" label="实习岗位"></el-table-column>
          <el-table-column prop="remark" label="实习心得" show-overflow-tooltip></el-table-column>
        </el-table>
      </template>
      <div slot="footer" v-if="list.length">
        <div class="table-pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="conditionParams.pageIndex" :page-size="conditionParams.pageSize" layout=" prev, pager, next ,total" :total="totalTableData">
          </el-pagination>
        </div>
      </div>
    </container>
    <!-- form start-->
    <el-form ref="itspCompanyPostForm" :model="formData" label-position="right" label-width="120px">
      <el-dialog :visible.sync="dialogVisible" width="44%">
        <div slot="title" class="dialog_header">周记详情</div>
        <div class="dialog_body">
          <el-row>
            <el-col :span="11" :offset="1">
              <el-form-item label="学院：">
                {{formData.collegeName}}
              </el-form-item>
              <el-form-item label="学生：">
                {{formData.studentName}}
              </el-form-item>

              <el-form-item label="周次：">
                {{formData.weekName}}
              </el-form-item>
              <!--<el-form-item label="实习内容：">-->
              <!--{{formData.remark}}-->
              <!--</el-form-item>-->
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item label="专业：">
                {{formData.majorName}}
              </el-form-item>
              <el-form-item label="班级：">
                {{formData.className}}
              </el-form-item>
              <el-form-item label="填写时间：">
                {{formData.updateTime|date("yyyy-MM-dd")}}
              </el-form-item>
            </el-col>
            <!-- <el-col :span="20" :offset="2">
               <el-form-item label="指导联系：">
                 {{formData.needExam?"是":"否"}}
               </el-form-item>
             </el-col>-->
            <!--<el-col :span="20" :offset="2">-->
            <!--<el-form-item label="实习内容：">-->
            <!--{{formData.needExam?"是":"否"}}-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="20" :offset="1">
              <el-form-item label="指导联系：">
                <span class="mgr-15">与小组或本人联系&nbsp;（{{formData.guidanceNum}}）&nbsp;次</span>
                <span>指导&nbsp;（{{formData.communicationNum}}）&nbsp;次</span>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <el-form-item label="实习心得：">
                {{formData.remark}}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="danger" @click.native="dismissDialog('itspCompanyPostForm')">关闭</el-button>
          <!--<el-button type="primary" @click="doSubmit('itspCompanyPostForm')">确 定</el-button>-->
        </div>
      </el-dialog>
    </el-form>
    <!--form end-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import importFile from "src/components/ImportFile";
import { USER_ID } from "src/config/env";
export default {
  name: "itsp_post",
  components: { importFile },
  data() {
    return {
      list: [],
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
        "/train/weekly/getPaged",
        "get",
        this.conditionParams
      );
      this.list = res.list;
      this.totalTableData = res.total;
    },
    async doGetWeeklyDeatail(data) {
      new Promise(async resolve => {
        this.$api.doRequest(`/train/weekly/${data.id}`, "get").then(res => {
          this.formData = res;
          resolve(res);
        });
      });
    },
    editInfo(data) {
      this.doGetWeeklyDeatail(data).then(res => {
        this.dialogVisible = true;
        console.log("this.formData::", this.formData);
      });
      //        this.formData = Object.assign({}, data);
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
