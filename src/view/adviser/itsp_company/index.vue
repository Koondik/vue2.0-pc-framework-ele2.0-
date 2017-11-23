<!-- list 模块 -->
<template>
  <div>
    <container>
      <template slot="title">实习单位</template>
      <template slot="tools">
        <el-button type="primary" @click="dialogVisible = true" icon="el-icon-plus">新增</el-button>
        <el-button type="danger" @click="doDelete()" icon="el-icon-delete">删除</el-button>
      </template>
      <template slot="conditions" class="handleBtnPanel_sm">
        <el-input class="search-ipt" placeholder="查询" v-model="conditionParams.searchText">
          <el-button class="ipt-append-btn" type="primary" slot="append" @click="doGetList()">查询</el-button>
        </el-input>
      </template>
      <template slot="body">
        <el-table ref="listTable" border :data="list" empty-text="暂无数据" @selection-change="rowSelect" style="width: 100%">
          <el-table-column align="center" type="selection" width="50"></el-table-column>
          <!--<el-table-column align="center" prop="certificateNo" width="80" label="序号"></el-table-column>-->
          <el-table-column align="center" label="单位名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="span-btn" @click="editCertificateInfo(scope.row)" v-text="scope.row.companyName"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="companyCity" label="所在城市" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="companyNatureName" label="单位性质" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="companyTradeName" label="所在行业" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="companyTypeName" label="单位类型" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="companyScaleName" label="规模（人）" show-overflow-tooltip></el-table-column>
        </el-table>
      </template>
      <div slot="footer" v-if="list.length">
        <div class="table-pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="conditionParams.pageIndex" :page-size="conditionParams.pageSize" layout=" prev, pager, next ,total" :total="totalTableData">
          </el-pagination>
        </div>
      </div>
    </container>
    <!-- dialog -->
    <el-form ref="itspCompanyForm" :model="formData" :rules="rules" label-position="right" label-width="120px">
      <el-dialog :visible.sync="dialogVisible" width="44%">
        <div slot="title" class="dialog_header">新增实习岗位</div>
        <div class="dialog_body">
          <div class="train-box " title="单位信息">
            <el-row>
              <el-col :span="10" :offset="2">
                <el-form-item label="单位名称" prop="companyName">
                  <el-input v-model="formData.companyName" placeholder="单位名称"></el-input>
                </el-form-item>
                <el-form-item label="单位性质" prop="companyNatureId">
                  <el-select v-model="formData.companyNatureId" clearable placeholder="单位性质">
                    <el-option :label="item.value" :value="item.id" v-for="item in companyNatureList" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="规模（人）" prop="companyScaleId">
                  <el-select v-model="formData.companyScaleId" clearable placeholder="公司规模">
                    <el-option :label="item.value" :value="item.id" v-for="item in companyScaleList" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="所在城市" prop="companyCity">
                  <el-input v-model="formData.companyCity">
                  </el-input>
                </el-form-item>
                <el-form-item label="单位类型" prop="companyTypeId">
                  <el-select v-model="formData.companyTypeId" clearable placeholder="单位类型">
                    <el-option :label="item.value" :value="item.id" v-for="item in companyTypeList" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所在行业" prop="companyTradeId">
                  <el-select v-model="formData.companyTradeId" clearable placeholder="所在行业">
                    <el-option :label="item.value" :value="item.id" v-for="item in companyTradeList" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="train-box" title="单位联系人">
            <el-row>
              <el-col :span="10" :offset="2">
                <el-form-item label="姓名" prop="linkman">
                  <el-input v-model="formData.linkman"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="linkmanMobile">
                  <el-input type="tel" v-model="formData.linkmanMobile"></el-input>
                </el-form-item>
                <el-form-item label="E-mail" prop="linkmanEmail">
                  <el-input v-model="formData.linkmanEmail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="职位">
                  <el-input v-model="formData.linkmanJobtitle"></el-input>
                </el-form-item>
                <el-form-item label="办公电话">
                  <el-input v-model="formData.linkmanPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20" :offset="2">
                <el-form-item>
                  <el-checkbox label="此单位是校外实训基地" name="baseTrain" v-model="formData.baseTrain"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="danger" @click.native="dismissDialog('itspCompanyForm')">取 消</el-button>
          <el-button type="primary" @click="doSubmit('itspCompanyForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import importFile from "src/components/ImportFile";
import {
  formatDate,
  notifyBox,
  deleteConfirm,
  getCheckedIds
} from "src/config/mUtils";
import { FILE_SYSTEM_API, USER_ID } from "src/config/env";
export default {
  name: "itsp_company",
  components: { importFile },
  data() {
    return {
      list: [],
      selectedList: [],
      totalTableData: 0,
      dialogVisible: false,
      formData: {
        id: 0,
        tenantId: 0,
        inputUserId: null,
        updateUserId: null,
        companyTypeId: null,
        companyScaleId: null,
        companyTradeId: null,
        companyNatureId: null,
        linkman: null,
        updateTime: null,
        baseTrain: false,
        companyCity: null,
        companyName: null,
        companyNatureName: null,
        companyScaleName: null,
        companyTradeName: null,
        companyTypeName: null,
        linkmanEmail: null,
        linkmanJobtitle: null,
        linkmanMobile: null,
        linkmanPhone: null,
        recordStatus: true
      },
      rules: {
        companyName: [
          { required: true, message: "请填写单位名称", trigger: "change" }
        ],
        companyCity: [
          { required: true, message: "请输入所在城市", trigger: "change" }
        ],
        companyNatureId: [
          {
            required: true,
            type: "number",
            message: "请选择单位性质",
            trigger: "change"
          }
        ],
        companyScaleId: [
          {
            required: true,
            type: "number",
            message: "请选择公司规模",
            trigger: "change"
          }
        ],
        companyTypeId: [
          {
            required: true,
            type: "number",
            message: "请选择单位类型",
            trigger: "change"
          }
        ],
        companyTradeId: [
          {
            required: true,
            type: "number",
            message: "请选择所在行业",
            trigger: "change"
          }
        ],
        linkman: [{ required: true, message: "请输入单位联系人", trigger: "change" }],
        linkmanJobtitle: [
          { required: true, message: "请输入职位", trigger: "change" }
        ]
      },
      conditionParams: { searchText: null, pageIndex: 1, pageSize: 15 }
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
    async doGetList() {
      let res = await this.$api.doRequest(
        "/train/company/getPaged",
        "get",
        this.conditionParams
      );
      this.list = res.list;
      this.totalTableData = res.total;
    },
    editCertificateInfo(data) {
      this.formData = Object.assign({}, data);
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
    doSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return false;
        let params = Object.assign(this.formData, this.studentInfo, {
          inputUserId: USER_ID
        });
        let url = "/train/company";
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
            this.dismissDialog("itspCompanyForm");
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
    this.$store.dispatch("doGetCompanyFilterData").then(res => {
      this.doGetList();
    });
  },
  computed: {
    ...mapGetters([
      "companyTypeList",
      "companyScaleList",
      "companyTradeList",
      "companyNatureList"
    ]),
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
