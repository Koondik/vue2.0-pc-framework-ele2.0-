<!-- list 模块 -->
<template>
  <div>
    <container>
      <template slot="title">实习岗位</template>
      <template slot="tools">
        <el-button type="primary" @click="dialogVisible = true" icon="el-icon-plus">新增</el-button>
        <el-button type="danger" @click="doDelete()" icon="el-icon-delete">删除</el-button>
      </template>
      <template slot="conditions" class="handleBtnPanel_sm">
        <el-select v-model="conditionParams.companyId" clearable placeholder="公司" @clear="doGetList()" @change="doGetList()">
          <el-option :label="item.value" :value="item.id" v-for="item in companyList" :key="item.id"></el-option>
        </el-select>
        <el-input class="search-ipt" placeholder="查询" v-model="conditionParams.searchText">
          <el-button class="ipt-append-btn" type="primary" slot="append" @click="doGetList()">查询</el-button>
        </el-input>
      </template>
      <template slot="body">
        <el-table ref="listTable" border :data="list" empty-text="暂无数据" @selection-change="rowSelect" style="width: 100%">
          <el-table-column align="center" type="selection" width="50"></el-table-column>
          <el-table-column align="center" width="180" label="职位名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="span-btn" @click="editInfo(scope.row)" v-text="scope.row.jobtitleName"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200" prop="companyName" label="公司名称"></el-table-column>
          <el-table-column align="center" width="120" prop="cityName" label="工作地点"></el-table-column>
          <el-table-column align="center" width="120" prop="headCounts" label=" 招聘人数"></el-table-column>
          <el-table-column align="center" width="120" prop="salary" label="月薪"></el-table-column>
          <!-- <el-table-column align="center" width="160" prop="teacherName" label="指导老师"></el-table-column> -->
          <el-table-column align="center" width="180" label="录入时间">
            <template slot-scope="scope">
              {{scope.row.inputTime|date('yyyy-MM-dd')}}
            </template>
          </el-table-column>
          <el-table-column prop="remark" min-width="260" label="备注" show-overflow-tooltip></el-table-column>
        </el-table>
      </template>
      <div slot="footer">
        <div class="table-pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="conditionParams.pageIndex" :page-size="conditionParams.pageSize" layout=" prev, pager, next ,total" :total="totalTableData">
          </el-pagination>
        </div>
      </div>
    </container>
    <!-- form start-->
    <el-form ref="itspCompanyPostForm" :model="formData" :rules="rules" label-position="right" label-width="120px">
      <el-dialog :visible.sync="dialogVisible" width="44%" @open="dialogOpen()">
        <div slot="title" class="dialog_header">新增实习岗位</div>
        <div class="dialog_body">
          <div class="train-box " title="岗位信息">
            <el-row>
              <el-col :span="12">
                <el-form-item label="职位名称" prop="jobtitleName">
                  <el-input v-model="formData.jobtitleName" placeholder="职位名称"></el-input>
                </el-form-item>
                <el-form-item label="工作地点" prop="cityName">
                  <el-input v-model="formData.cityName" placeholder="工作地点"></el-input>
                </el-form-item>
                <el-form-item label="指导老师" prop="teacherId">
                  <el-select v-model="formData.teacherId" filterable remote placeholder="请输入关键词" :remote-method="doSearchTeacher" :loading="loading">
                    <el-option v-for="item in teacherList" :key="item.id" :label="item.teacherName" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属单位" prop="companyId">
                  <el-select v-model="formData.companyId" clearable placeholder="所属单位">
                    <el-option :label="item.value" :value="item.id" v-for="item in companyList" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="月薪" prop="salary">
                  <el-input v-model.number="formData.salary" placeholder="月薪"></el-input>
                </el-form-item>
                <el-form-item label="招聘人数" prop="headCounts">
                  <el-input v-model.number="formData.headCounts" placeholder="招聘人数"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="参与专业" prop="majorList">
                  <el-select class="el-select--lg" v-model="formData.majorList" multiple clearable placeholder="参与专业">
                    <el-option :label="item.value" :value="item.id" v-for="item in majorList" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!--<div class="train-box " title="单位联系人">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名" prop="linkman">
                  <el-input v-model="formData.linkman"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="linkmanEmail">
                  <el-input v-model="formData.linkmanEmail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职位">
                  <el-input v-model="formData.linkmanJobtitle"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input v-model="formData.linkmanPhone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>-->
          <div class="train-box " title="职位描述">
            <el-row>
              <el-col :span="24">
                <el-form-item>
                  <el-input type="textarea" :rows="6" v-model="formData.remark" resize="none"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="danger" @click.native="dismissDialog('itspCompanyPostForm')">取 消</el-button>
          <el-button type="primary" @click="doSubmit('itspCompanyPostForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-form>
    <!--form end-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import importFile from "src/components/ImportFile";
import {
  notifyBox,
  isChinese,
  deleteConfirm,
  getCheckedIds
} from "src/config/mUtils";
import { USER_ID } from "src/config/env";
export default {
  name: "itsp_post",
  components: { importFile },
  data() {
    /*  let isMajorIdNull = (rule, value, callback) => {
      if (!value.length) {
        return callback(new Error("请至少选择一个专业"));
      }
    }; */
    return {
      list: [],
      selectedList: [],
      teacherList: [],
      totalTableData: 0,
      dialogVisible: false,
      loading: false,
      formData: {
        id: 0,
        salary: 0,
        tenantId: 0,
        companyId: null,
        teacherId: null,
        headCounts: 0,
        inputUserId: 0,
        checkStatus: 0,
        updateUserId: 0,
        recordStatus: true,
        majorList: [],
        jobtitleMajorList: [],
        remark: null,
        endDate: null,
        inputTime: null,
        startDate: null,
        updateTime: null,
        teacherName: null,
        jobtitleName: null,
        checkStatusName: null
      },
      rules: {
        jobtitleName: [
          { required: true, message: "请填写岗位名称", trigger: "change" }
        ],
        companyId: [
          {
            required: true,
            message: "请选择所属单位",
            type: "number",
            trigger: "change"
          }
        ],
        cityName: [{ required: true, message: "请输入工作城市", trigger: "change" }],
        teacherId: [
          {
            required: true,
            type: "number",
            message: "请选择指导老师",
            trigger: "change"
          }
        ],
        salary: [
          {
            required: true,
            message: "请输入月薪",
            type: "number",
            trigger: "change"
          }
        ],
        headCounts: [
          {
            required: true,
            message: "请输入招聘人数",
            type: "number",
            trigger: "change"
          }
        ]
      },
      conditionParams: {
        checkStatus: -1,
        companyId: null,
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
        let res = await this.$api.doRequest("/train/jobttitle", "delete", {
          list: ids.join(",")
        });
        if (!res.code) {
          notifyBox.delSuccess.call(this);
          this.doGetList();
        }
      }
    },
    async doGetList() {
      let res = await this.$api.doRequest(
        "/train/jobttitle/getPaged",
        "get",
        this.conditionParams
      );
      this.list = res.list;
      this.totalTableData = res.total;
    },
    editInfo(data) {
      let majorList = data.jobtitleMajorList.map(item => {
        return item.majorId;
      });
      this.formData = Object.assign({}, data, { majorList: majorList });
      this.doSearchTeacher(this.formData.teacherName);
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
    doSearchTeacher(query) {
      return new Promise((resolve, reject) => {
        if (query !== "" && query && isChinese(query)) {
          this.loading = true;
          this.$api
            .doRequest("/train/jobttitle/getTeacherList", "get", {
              searchText: query
            })
            .then(res => {
              this.loading = false;
              this.teacherList = res;
              resolve(this.teacherList);
            });
        } else {
          this.teacherList = [];
          resolve(this.teacherList);
        }
      });
    },
    doSubmit(formName) {
      this.$refs[formName].validate(valid => {
        console.log("formName:valid:", formName, valid, this.$refs[formName]);
        if (!valid) return false;
        let params = Object.assign(this.formData, { inputUserId: USER_ID });
        let url = "/train/jobttitle";
        let methodType = "post";
        if (params.id) {
          methodType = "put";
          url = url.concat("/" + params.id);
        }
        params.jobtitleMajorList.length = 0;
        params.jobtitleMajorList = params.majorList.map(item => {
          return { majorId: item };
        });
        this.$api.doRequest(url, methodType, {}, params).then(res => {
          if (!res.code) {
            this.$notify({
              title: (params.id ? "新增" : "修改") + "成功",
              message: "您填写的岗位信息已经成功提交！",
              type: "success"
            });
            this.doGetList();
            this.dismissDialog("itspCompanyPostForm");
          }
        });
      });
    },
    dismissDialog(formName) {
      this.$refs[formName].resetFields();
      this.formData.remark = null;
      this.dialogVisible = false;
    },
    dialogOpen() {
      console.log("窗口打开：", this.jobtitleMajorList);
    }
  },
  mounted() {
    this.$store.dispatch("doGetCompanyPostFilterData").then(res => {
      this.doGetList();
    });
  },
  computed: {
    ...mapGetters(["companyList", "majorList"])
  }
};
</script>

<style lang="scss" type="text/scss" scoped></style>
