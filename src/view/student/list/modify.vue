<template>
  <container>
    <div slot="title">{{formData.id?"修改":"新增"}}实习信息</div>
    <div slot="tools">
      <router-link class="btn-goback" title="返回" :to="{path:'/list'}"></router-link>
    </div>
    <div slot="body">
      <el-row>
        <el-col :offset="4" :span="16">
          <el-form class="el-form--error-label" ref="studentAddTrainForm" :model="formData" :rules="rules" label-position="left">
            <!--个人信息-->
            <div class="train-box train-box--lg el-form--static" title="个人信息">
              <el-row v-if="stu_studentInfo">
                <el-col :span='12'>
                  <el-form-item label="专业部：">
                    {{stu_studentInfo.collegeName}}
                  </el-form-item>
                  <el-form-item label="姓名：">
                    {{stu_studentInfo.studentName}}
                  </el-form-item>
                </el-col>
                <el-col :span='12'>
                  <el-form-item label="班级：">
                    {{stu_studentInfo.className}}
                  </el-form-item>
                  <el-form-item label="学号：">
                    {{stu_studentInfo.studentCode}}
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!--实习基本信息-->
            <div class="train-box train-box--lg" title="实习基本信息">
              <el-form-item label="实习类型" v-if="formData.trainTypeId">
                <el-radio-group v-model="formData.trainTypeId">
                  <el-radio v-for="item in stu_trainTypeList" :label="item.id" :key="item.id">{{item.value}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="实习时间">
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  align="left"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-checkbox name="baseTrain" v-model="formData.signAgreement">是否已签订实习协议</el-checkbox>
              </el-form-item>
            </div>
            <!--企业信息-->
            <div class="train-box train-box--lg" title="企业信息">
              <template v-if="formData.trainTypeId===1">
                <el-form-item label="公司名称" prop="companyId">
                  <el-select class="el-select--lg" v-model="formData.companyId" placeholder="选择公司">
                    <el-option v-for="item in stu_companyList" :label="item.value" :value="item.id" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="实习岗位" prop="jobtitleId">
                  <el-select class="el-select--lg" v-model="formData.jobtitleId" placeholder="参与专业">
                    <el-option v-for="item in stu_jobtitleList[formData.companyId]" :label="item.jobtitleName" :value="item.id" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </template>
              <template v-else>
                <el-form-item label="实习单位" prop="companyName">
                  <el-input v-model="formData.companyName"></el-input>
                </el-form-item>
                <el-form-item label="实习岗位" prop="jobtitleName">
                  <el-input v-model="formData.jobtitleName"></el-input>
                </el-form-item>
              </template>
              <el-form-item label="实习类型" v-if="formData.matchTypeId">
                <el-radio-group v-model="formData.matchTypeId">
                  <el-radio v-for="item in stu_matchTypeList" :key="item.id" :label="item.id">{{item.value}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item class="mgt-20">
                <el-button type="primary" @click="doSubmit('studentAddTrainForm')">确认保存</el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </container>
</template>

<script>
  import {mapGetters} from "vuex";
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
    watch: {
      "formData.trainTypeId": function (v1, v2) {
        this.formData.companyId = null;
        this.formData.jobtitleId = null;
      }
    },
    data() {
      return {
        rules: {
          companyName: [
            {required: true, message: "请填写实习单位名称", trigger: "change"}
          ],
          jobtitleName: [
            {required: true, message: "请填写实习岗位名称", trigger: "change"}
          ],
          companyId: [{required: true, type: "number", message: "请选择单位", trigger: "change"}],
          jobtitleId: [{required: true, type: "number", message: "请选择岗位", trigger: "change"}]
        },
        dateRange: [],
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
        formData: {
          id: 0,
          gradeId: 0,
          tenantId: 0,
          studentId: 0,
          inputTypeId: 0,
          trainTypeId: 0,
          inputUserId: 0,
          updateUserId: 0,
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
        }
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
            studentId: this.stu_studentInfo.studentId,
            gradeId: this.stu_studentInfo.gradeId
          });
          //TODO 如果是自选模式，根据ID给岗位公司名赋值
          if (params.trainTypeId === 1) {
            this.stu_companyList.forEach(item => {
              if (item.id === params.companyId) params.companyName = item.value;
            });
            this.stu_jobtitleList[params.companyId].forEach(item => {
              if (item.id === params.jobtitleId) params.jobtitleName = item.jobtitleName;
            });
          } else {
            params.companyId = null;
            params.jobtitleId = null;
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
              console.log("params:", params.id);
              this.$router.push({path: "/list"});
            }
          });
        });
      },
      doGetDataById(id) {
        this.$api.doRequest(`/train/train/${id}`, "get").then(response => {
          this.dateRange = [response.startDate, response.endDate];
          console.log("this.dateRange:::", this.dateRange);
          this.formData = Object.assign({}, response);
        });
      }
    },
    mounted() {
      let id = this.$route.params.id;
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
      }
    },
    computed: {
      ...mapGetters([
        "stu_trainTypeList",
        "stu_matchTypeList",
        "stu_gradeList",
        "stu_companyList",
        "stu_jobtitleList",
        "stu_studentInfo"
      ])
    }
  };
</script>

<style lang="scss" type="text/scss" scoped>
  .train-box {
    padding-left: 80px;
  }
</style>
