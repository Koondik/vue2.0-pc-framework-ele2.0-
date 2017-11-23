<!-- list 模块 -->
<template>
  <div>
    <container>
      <template slot="title">班主任录入</template>
      <template slot="tools">
        <el-button type="primary" @click="dialogVisible = true" icon="el-icon-plus">新增</el-button>
        <el-button type="danger" @click="doDelete()" icon="el-icon-delete">删除</el-button>
      </template>
      <template slot="conditions" class="handleBtnPanel_sm">
        <!--  <el-select v-model="conditionParams.trainTypeId" clearable placeholder="实习类型">
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
          <el-table-column align="center" width="180" label="学生姓名" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="span-btn" @click="editInfo(scope.row)" v-text="scope.row.studentName"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200" prop="studentCode" label="学号"></el-table-column>
          <el-table-column align="center" width="200" prop="companyName" label="实习单位"></el-table-column>
          <el-table-column align="center" width="200" prop="jobtitleName" label="实习岗位"></el-table-column>
          <el-table-column align="center" width="200" prop="trainTypeName" label="实习类型"></el-table-column>
          <el-table-column align="center" width="200" prop="matchTypeName" label="岗位类型"></el-table-column>
          <el-table-column align="center" prop="studentName" label="实习起止时间">
            <template slot-scope="scope">
              <span class="mgr-5">{{scope.row.startDate|date('yyyy-MM-dd')}}</span>
              至
              <span class="mgl-5">{{scope.row.endDate|date('yyyy-MM-dd')}}</span>
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
    <el-form :ref="formName" :model="formData" :rules="rules" label-position="right" label-width="120px">
      <el-dialog :visible.sync="dialogVisible" width="44%">
        <div slot="title" class="dialog_header">{{formData.id?"修改":"新增"}}实习岗位</div>
        <div class="dialog_body">
          <div class="train-box " title="岗位信息">
            <el-row>
              <el-col :span="11">
                <el-form-item label="学生姓名" prop="studentId">
                  <el-select v-model="formData.studentId" clearable filter placeholder="学生姓名">
                    <el-option :label="item.studentName" :value="item.studentId" v-for="item in studentList" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="职位" prop="jobtitleId">
                  <el-select v-model="formData.jobtitleId" clearable placeholder="职位">
                    <el-option v-for="item in stu_jobtitleList[formData.companyId]" :label="item.jobtitleName" :value="item.id" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="实习公司" prop="companyId">
                  <el-select v-model="formData.companyId" clearable placeholder="实习公司">
                    <el-option :label="item.value" :value="item.id" v-for="item in stu_companyList" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="岗位类型">
                  <el-radio-group v-model="formData.matchTypeId">
                    <el-radio v-for="item in stu_matchTypeList" :key="item.id" :label="item.id">{{item.value}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="实习时间">
                  <el-date-picker v-model="dateRange" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="danger" @click.native="dismissDialog(formName)">取消</el-button>
          <el-button type="primary" @click="doSubmit(formName)">保存</el-button>
        </div>
      </el-dialog>
    </el-form>
    <!--form end-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  formatDate,
  notifyBox,
  deleteConfirm,
  getCheckedIds
} from "src/config/mUtils";
import { USER_ID } from "src/config/env";
export default {
  name: "teacherList",
  components: {},
  data() {
    return {
      list: [],
      formName: "studentAddTrainForm",
      selectedList: [],
      studentList: [],
      totalTableData: 0,
      dateRange: [],
      dialogVisible: false,
      rules: {
        studentId: [
          {
            required: true,
            type: "number",
            message: "请选择要实习的学生",
            trigger: "change"
          }
        ],
        companyId: [
          {
            required: true,
            type: "number",
            message: "请选择单位",
            trigger: "change"
          }
        ],
        jobtitleId: [
          {
            required: true,
            type: "number",
            message: "请选择岗位",
            trigger: "change"
          }
        ]
      },
      formData: {
        id: null,
        gradeId: null,
        tenantId: null,
        studentId: null,
        inputTypeId: null,
        trainTypeId: null,
        inputUserId: null,
        updateUserId: null,
        checkStatus: 1,
        endDate: Date.now(),
        startDate: Date.now(),
        sign_agreement: true,
        companyId: null,
        jobtitleId: null,
        matchTypeId: null,
        recordStatus: true,
        companyName: null,
        jobtitleName: null,
        matchTypeName: null,
        trainDate: null,
        trainTypeName: null,
        updateTime: null
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近半年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 183);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 365);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
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
        let res = await this.$api.doRequest("/train/train/delete", "delete", {
          ids: ids.join(",")
        });
        if (!res.code) {
          notifyBox.delSuccess.call(this);
          this.doGetList();
        }
      }
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
    async doGetStudentList() {
      this.studentList = await this.$api.doRequest(
        "/train/common/getStudentList",
        "get",
        { userId: USER_ID }
      );
    },
    async doSubmit(formName) {
      if (this.dateRange.length < 2) {
        return this.$message("请选择完善实习时间");
      }
      this.$refs[formName].validate(valid => {
        console.log("formName:valid:", formName, valid, this.$refs[formName]);
        if (!valid) return false;
        let params = Object.assign(this.formData, {
          inputUserId: USER_ID
        });
        //TODO 如果是自选模式，根据ID给岗位公司名赋值
        if (params.trainTypeId === 1) {
          this.stu_companyList.forEach(item => {
            if (item.id === params.companyId) params.companyName = item.value;
          });
          this.stu_jobtitleList[params.companyId].forEach(item => {
            if (item.id === params.jobtitleId) {
              params.jobtitleName = item.jobtitleName;
            }
          });
        }
        let url = "/train/train/insert";
        let methodType = "post";
        if (params.id) {
          methodType = "put";
          url = `/train/train/${params.id}`;
        }
        if (parseInt(params.checkStatus) === 1) {
          params.inputTypeId = 1;
        } else {
          params.inputTypeId = 0;
        }
        params.startDate = formatDate(this.dateRange[0], "yyyy-MM-dd");
        params.endDate = formatDate(this.dateRange[1], "yyyy-MM-dd");
        this.$api.doRequest(url, methodType, {}, params).then(res => {
          if (!res.code) {
            this.$notify({
              title: (params.id ? "新增" : "修改") + "成功",
              message: "您填写的信息已经成功提交！",
              type: "success"
            });
            this.$router.push({ path: "/list" });
            this.dismissDialog(this.formName);
            this.doGetList();
          }
        });
      });
    },
    initFormData() {
      if (!this.formData.id) {
        this.formData.trainTypeId = this.stu_trainTypeList[0].id;
        this.formData.matchTypeId = this.stu_matchTypeList[0].id;
        console.log("this.this.formData::", this.formData);
      }
    },
    editInfo(data) {
      this.formData = Object.assign({}, data);
      this.dateRange = [this.formData.startDate, this.formData.endDate];
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
    dismissDialog(formName) {
      this.$refs[formName].resetFields();
      this.dateRange = [];
      this.dialogVisible = false;
    }
  },
  mounted() {
    this.doGetStudentList();
    this.$store
      .dispatch("doGetStudentFilterData", { userId: USER_ID })
      .then(res => {
        this.initFormData();
        this.doGetList();
      });
  },
  computed: {
    ...mapGetters([
      "stu_trainTypeList",
      "stu_matchTypeList",
      "stu_companyList",
      "stu_gradeList",
      "stu_jobtitleList",
      "stu_studentInfo"
    ])
  }
};
</script>

<style lang="scss" type="text/scss" scoped></style>
