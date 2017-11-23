<!--train_list 模块 -->
<template>
  <div>
    <container>
      <div slot="title">{{formData.id?"修改":"新增"}}实习记录</div>
      <div slot="tools">
        <router-link class="btn-goback" title="返回" :to="{path:`/record/${trainId}`}"></router-link>
      </div>
      <div slot="body" class="train_list">
        <el-form ref="modifyRecordForm" :model="formData" label-position="right">
          <div class="train-box train-box--lg el-form--static" title="基本信息">
            <el-row>
              <el-col :span="12">
                <el-form-item label="专业部：">
                  {{studentInfo.collegeName}}
                </el-form-item>
                <el-form-item label="班级：">
                  {{studentInfo.className}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位：">
                  {{studentInfo.companyName}}
                </el-form-item>
                <el-form-item label="职位：">
                  {{studentInfo.jobtitleName}}
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="train-box train-box--lg" title="周次选择">
            <el-form-item label="周次" prop="weekName">
              <el-input v-model="formData.weekName"></el-input>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                unlink-panels
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="left">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="train-box train-box--lg" title="指导老师指导学生">
            <el-row style="line-height: 50px;" :gutter="10">
              <el-col :span="24">
                <span class="mgr-15">现场指导</span>
                <el-input v-model.number="formData.guidanceNum" style="width: 80px"></el-input>
                <span>次</span>
                <span class="mgl-20">与小组或本人通讯录联系</span>
                <el-input v-model.number="formData.communicationNum" style="width: 180px"></el-input>
                <span>次</span>
              </el-col>
            </el-row>
          </div>
          <div class="train-box train-box--lg" title="实习记录">
            <el-form-item prop="remark">
              <el-input type="textarea" :rows="8" v-model="formData.remark"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="doSubmit('modifyRecordForm')">确认保存</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </container>
  </div>
</template>

<script>
  import {
    notifyBox,
    deleteConfirm,
    getCheckedIds,
    formatDate
  } from "src/config/mUtils";
  import {USER_ID} from "src/config/env";
  export default {
    name: "add",
    components: {},
    data() {
      return {
        rules: {
          companyName: [
            {required: true, message: "请填写实习单位名称", trigger: "change"}
          ],
          jobtitleName: [
            {required: true, message: "请填写实习岗位名称", trigger: "change"}
          ],
          companyId: [{required: true, message: "请选择单位", trigger: "change"}],
          jobtitleId: [{required: true, message: "请选择岗位", trigger: "change"}]
        },
        dateRange: [],
        pickerOptions: {
          shortcuts: [
            {
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                let w = start.getDay();
                start.setTime(Date.now() + 3600 * 1000 * 24 * (1 - w));
                end.setTime(start.getTime() + 3600 * 1000 * 24 * 6);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        formData: {
          id: null,
          trainId: null,
          tenantId: null,
          inputUserId: null,
          guidanceNum: null,
          updateUserId: null,
          communicationNum: null,
          endDate: null,
          recordStatus: null,
          remark: null,
          startDate: null,
          updateTime: null,
          weekName: null
        },
        studentInfo: {},
        trainId: null
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
            {ids: ids.join(",")}
          );
          if (res.code) {
            notifyBox.delSuccess.call(this);
            this.doGetList();
          }
          console.log("删除结果：", res);
        }
      },
      async doGetList() {
      },
      initFormData() {
        if (!this.formData.id) {
          this.formData.trainTypeId = this.stu_trainTypeList[0].id;
          this.formData.matchTypeId = this.stu_matchTypeList[0].id;
          console.log("this.this.formData::", this.formData);
        }
      },
      doSubmit(formName) {
        if (this.dateRange.length < 2) {
          return this.$message("请选择完善实习时间");
        }
        this.$refs[formName].validate(valid => {
          console.log("formName:valid:", formName, valid, this.$refs[formName]);
          if (!valid) return false;
          let params = Object.assign(this.formData, {
            inputUserId: USER_ID,
            updateUserId: USER_ID,
            trainId: this.trainId
          });
          let url = "/train/weekly";
          let methodType = "post";
          if (params.id) {
            methodType = "put";
            url = `/train/weekly/${params.id}`;
          }
          params.startDate = formatDate(this.dateRange[0], "yyyy-MM-dd");
          params.endDate = formatDate(this.dateRange[1], "yyyy-MM-dd");
          console.log("this.formData:::", this.formData);
          this.$api.doRequest(url, methodType, {}, params).then(res => {
            if (!res.code) {
              this.$notify({
                title: (params.id ? "新增" : "修改") + "成功",
                message: "您填写的信息已经成功提交！",
                type: "success"
              });
              console.log("params:", params.id);
              this.$router.push({path: `/record/${this.trainId}`});
            }
          });
        });
      },
      doGetDataById(id) {
        this.$api.doRequest(`/train/weekly/${id}`, "get").then(response => {
          this.dateRange = [response.startDate, response.endDate];
          this.formData = Object.assign({}, response);
        });
      }
    },
    mounted() {
      this.trainId = this.$route.params.trainId;
      let recordId = this.$route.params.recordId;
      this.$api.doRequest("/train/weekly/getFilter", "get", {trainId: this.trainId}).then(res => {
        console.log("trainId::::", res);
        this.studentInfo = res;
      });
      recordId && this.doGetDataById(recordId);
      /* console.log("this.stu_gradeList::", this.stu_gradeList);
       if (!this.stu_gradeList || !this.stu_gradeList.length) {
       this.$store
       .dispatch("doGetStudentFilterData", {userId: USER_ID})
       .then(res => {
       console.log("ressssss:", res);
       id && this.doGetDataById(id);
       });
       } else {
       this.initFormData();
       id && this.doGetDataById(id);
       }*/
    },
    computed: {}
  };
</script>

<style lang="scss" type="text/scss" scoped>
  .train-box {
    padding-left: 100px;
  }
</style>
