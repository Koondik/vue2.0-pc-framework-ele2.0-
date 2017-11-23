<!-- list 模块 -->
<template>
  <div>
    <container>
      <template slot="title">实习指导记录</template>
      <template slot="tools">
        <el-button type="primary" @click="dialogVisible = true" icon="el-icon-plus">新增</el-button>
        <el-button type="danger" @click="doDelete()" icon="el-icon-delete">删除</el-button>
      </template>
      <template slot="conditions" class="handleBtnPanel_sm">
        <span class="label-btn " v-for="(item,index) in conditionLabel" :key="index" :class="{'active':item.isSelect}" @click="getFilterDate(item)" v-text="item.label"></span>
        <el-date-picker v-model="conditionParams.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-input class="search-ipt" placeholder="查询" v-model="conditionParams.searchText">
          <el-button class="ipt-append-btn" type="primary" slot="append" @click="doGetList()">查询</el-button>
        </el-input>
      </template>
      <template slot="body">
        <el-table ref="listTable" border :data="list" empty-text="暂无数据" @selection-change="rowSelect" style="width: 100%">
          <el-table-column align="center" type="selection" width="50"></el-table-column>
          <el-table-column align="center" width="180" label="标题" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="span-btn" @click="editInfo(scope.row)" v-text="scope.row.title"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="120" prop="studentName" label="学生姓名"></el-table-column>
          <!-- <el-table-column align="center" width="160" prop="teacherName" label="教师姓名"></el-table-column> -->
          <el-table-column align="center" width="160" prop="guidanceTypeName" label="指导方式"></el-table-column>
          <el-table-column align="center" width="180" label="提问日期">
            <template slot-scope="scope">
              {{scope.row.questionDate|date('yyyy-MM-dd')}}
            </template>
          </el-table-column>
          <el-table-column align="center" width="180" label="指导日期">
            <template slot-scope="scope">
              {{scope.row.guidanceDate|date('yyyy-MM-dd')}}
            </template>
          </el-table-column>
          <el-table-column prop="result" min-width="260" label="指导结果" show-overflow-tooltip></el-table-column>
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
    <el-form ref="itspGuidancePostForm" :model="formData" :rules="rules" label-position="right" label-width="120px">
      <el-dialog :visible.sync="dialogVisible" width="44%">
        <div slot="title" class="dialog_header">新增指导记录</div>
        <div class="dialog_body">
          <el-row>
            <el-col :span="12">
              <el-form-item label="指导老师" v-if="guidanceTeacherVo">
                <el-input v-model="guidanceTeacherVo.teacherName" placeholder="指导老师" readonly></el-input>
              </el-form-item>
              <el-form-item label="指导班级" prop="classId">
                <el-select v-model="formData.classId" filterable clearable placeholder="指导班级" @change="doGetClassStudent()">
                  <el-option :label="item.className" :value="item.id" v-for="item in guidanceClassList" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="指导日期" prop="guidanceDate">
                <el-date-picker v-model="formData.guidanceDate" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="指导学生" prop="studentId">
                <el-select v-model="formData.studentId" filterable clearable placeholder="请选择学生">
                  <el-option :label="item.studentName" :value="item.studentId" v-for="item in studentList" :key="item.studentId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="指导类型" prop="guidanceTypeId">
                <el-radio-group v-model="formData.guidanceTypeId">
                  <el-radio v-for="item in guidanceTypeList" :label="item.id" :key="item.id">{{item.guidanceTypeName}}</el-radio>
                </el-radio-group>
                <!--  <el-checkbox-group v-model="formData.guidanceTypeId">
                    &lt;!&ndash;<template >&ndash;&gt;
                      <el-checkbox v-for="item in guidanceTypeList" :key="item.id" :label="item.id">{{item.guidanceTypeName}}</el-checkbox>
                    &lt;!&ndash;</template>&ndash;&gt;
                 &lt;!&ndash;   <el-checkbox class="mgl-30" label="现场指导" name="type"></el-checkbox>
                    <el-checkbox label="电话指导" name="type"></el-checkbox>
                    <el-checkbox label="QQ指导" name="type"></el-checkbox>
                    <el-checkbox label="微信指导" name="type"></el-checkbox>
                    <el-checkbox label="邮件指导" name="type"></el-checkbox>
                    <el-checkbox label="平台留言板" name="type"></el-checkbox>
                    <el-checkbox label="手机app" name="type"></el-checkbox>
                    <el-checkbox label="其它" name="type"></el-checkbox>&ndash;&gt;
                  </el-checkbox-group>-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="指导内容" prop="title">
                <el-input type="textarea" :rows="6" v-model="formData.title"></el-input>
              </el-form-item>
              <el-form-item label="指导情况" prop="result">
                <el-input type="textarea" :rows="6" v-model="formData.result"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="佐证材料">
                <div class="inline-block" v-if="formData.fileUUID">
                  <img class="mgr-15" :src="getDfsImg(formData.fileUUID)" alt="" style="width: 60px;height: auto">
                </div>
                <div class="plus-materials inline-block">
                  <upload-file @fileUpdate="fileUpdate"></upload-file>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer text-center">
          <el-button type="danger" @click.native="dismissDialog('itspGuidancePostForm')">取 消</el-button>
          <el-button type="primary" @click="doSubmit('itspGuidancePostForm')">确 定</el-button>
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
import { FILE_SYSTEM_API, USER_ID } from "src/config/env";
import DateRange from "src/config/dateRange";
import uploadFile from "src/components/uploadFile";
export default {
  name: "itsp_guidance",
  components: { uploadFile },
  beforeCreate() {
    this.$store.dispatch("doGetRecordFilter").then(res => {
      this.doGetList();
    });
  },
  data() {
    return {
      list: [],
      fileInfo: null,
      activeName: "-1",
      selectedList: [],
      totalTableData: 0,
      dialogVisible: false,
      studentList: [],
      formData: {
        id: null,
        title: null,
        result: null,
        classId: null,
        tenantId: null,
        teacherId: null,
        fileUUID: null,
        studentId: null,
        updateTime: null,
        teacherName: null,
        inputUserId: null,
        studentName: null,
        studentCode: null,
        recordStatus: null,
        updateUserId: null,
        questionDate: null,
        guidanceDate: null,
        guidanceTypeId: null,
        guidanceTypeName: null
      },
      rules: {
        title: [{ required: true, message: "请输入指导内容", trigger: "change" }],
        result: [{ required: true, message: "请输入指导情况", trigger: "change" }],
        studentId: [
          {
            required: true,
            type: "number",
            message: "请选择学生",
            trigger: "change"
          }
        ],
        questionDate: [
          {
            required: true,
            type: "date",
            message: "请选择指导日期",
            trigger: "change"
          }
        ],
        guidanceTypeId: [
          {
            required: true,
            type: "number",
            message: "请选择指导方式",
            trigger: "change"
          }
        ]
      },
      conditionLabel: [
        { label: "全部", isSelect: true, value: "all" },
        { label: "本周", isSelect: false, value: "week" },
        { label: "上周", isSelect: false, value: "lastWeek" },
        { label: "本月", isSelect: false, value: "month" },
        { label: "上月", isSelect: false, value: "lastMonth" }
      ],
      conditionParams: {
        fromDate: null,
        toDate: null,
        searchText: null,
        dateRange: [],
        pageIndex: 1,
        pageSize: 15
      }
    };
  },
  methods: {
    async doGetClassStudent() {
      console.log("formData.classId:", this.formData.classId);
      this.studentList = await this.$api.doRequest(
        "/train/record/getStudentListByClassId",
        "get",
        { classId: this.formData.classId }
      );
    },
    async doDelete() {
      if (!this.selectedList.length) return this.$message.warning("请至少选择一条数据");
      if (await deleteConfirm.call(this)) {
        let ids = getCheckedIds(this.selectedList);
        let res = await this.$api.doRequest("/train/record", "delete", {
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
        "/train/record/getPaged",
        "get",
        this.conditionParams
      );
      this.list = res.list;
      this.totalTableData = res.total;
    },
    async doSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return false;
        let params = Object.assign(this.formData, {
          teacherId: this.guidanceTeacherVo.id,
          teacherName: this.guidanceTeacherVo.teacherName,
          inputUserId: USER_ID
        });
        params.guidanceDate = formatDate(params.guidanceDate, "yyyy-MM-dd");
        params.questionDate = params.guidanceDate;
        let url = "/train/record";
        let methodType = "post";
        if (params.id) {
          methodType = "put";
          url = url.concat("/" + params.id);
        }
        this.$api.doRequest(url, methodType, {}, params).then(res => {
          if (!res.code) {
            this.$notify({
              title: (params.id ? "新增" : "修改") + "成功",
              message: "您填写的指导信息已经成功提交！",
              type: "success"
            });
            this.doGetList();
            this.dismissDialog("itspGuidancePostForm");
          }
        });
      });
    },
    getFilterDate(data) {
      let dateRange = new DateRange();
      this.conditionLabel.forEach(item => {
        item.isSelect = data.value === item.value;
      });
      switch (data.value) {
        case "week":
          this.conditionParams.dateRange = [
            dateRange.getWeekStartDate(),
            dateRange.getWeekEndDate()
          ];
          break;
        case "lastWeek":
          this.conditionParams.dateRange = [
            dateRange.getLastWeekStartDate(),
            dateRange.getLastWeekEndDate()
          ];
          break;
        case "month":
          this.conditionParams.dateRange = [
            dateRange.getMonthStartDate(),
            dateRange.getMonthEndDate()
          ];
          break;
        case "lastMonth":
          this.conditionParams.dateRange = [
            dateRange.getLastMonthStartDate(),
            dateRange.getLastMonthEndDate()
          ];
          break;
        default:
          this.conditionParams.dateRange = [];
      }
      this.conditionParams.fromDate = this.conditionParams.toDate = null;
      if (this.conditionParams.dateRange.length) {
        this.conditionParams.fromDate = this.conditionParams.dateRange[0];
        this.conditionParams.toDate = this.conditionParams.dateRange[1];
      }
      this.doGetList();
    },
    fileUpdate(data) {
      console.log("图片数据：：", data);
      if (!data) return;
      this.fileInfo = data;
      this.formData.fileUUID = data.fileUuid;
    },
    editInfo(data) {
      this.formData = Object.assign({}, data);
      this.formData.guidanceDate = new Date(this.formData.guidanceDate);
      if (!this.fileInfo) this.fileInfo = {};
      this.fileInfo.fileUuid = this.formData.fileUUID;
      this.doGetClassStudent();
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
    dismissDialog(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    }
  },
  mounted() {},
  computed: {
    ...mapGetters([
      "guidanceTypeList",
      "guidanceTeacherVo",
      "guidanceClassList"
    ]),
    getDfsImg: () => uuid => {
      return FILE_SYSTEM_API + "/file/IoReadFile?uuid=" + uuid;
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>

</style>
