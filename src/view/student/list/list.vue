<!-- train_list 模块 -->
<template>
  <div>
    <container>
      <div slot="title">实习信息</div>
      <div slot="tabs">
        <el-tabs v-model="activeGrade" @tab-click="tabStatusChange">
          <el-tab-pane v-for="item in gradeList" :key="item.id" :label="item.gradeName" :name="item.id+''"></el-tab-pane>
        </el-tabs>
      </div>
      <div slot="tools">
        <!--<span>当前时间：</span> <span>2017-2018学年 上学期 第17周</span>-->
      </div>
      <div slot="body" class="train_list">
        <template v-if="trainList[activeGrade]&&trainList[activeGrade].length">
          <div class="recorded-box" v-for="item in trainList[activeGrade]" :key="item.id" :class="{'mgt-20':trainList.length>1}">
            <table class="recorded-box__table">
              <tbody>
              <tr>
                <td class="td--key">实习单位：</td>
                <td class="td--value">{{item.companyName}}</td>
                <td class="td--key">指导老师：</td>
                <td class="td--value">{{item.teacherName}}</td>
                <td class="td--key">审批状态：</td>
                <td class="td--value">{{item.checkStatusName}}</td>
              </tr>
              <tr>
                <td class="td--key">实习岗位：</td>
                <td class="td--value">{{item.jobtitleName}}</td>
                <td class="td--key">顶岗实习协议：</td>
                <td class="td--value">{{item.signAgreement?'已签订':'未签订'}}</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="td--key">起止日期：</td>
                <td class="td--value" style="width: 260px">
                  {{item.startDate|date('yyyy-MM-dd')}} 至 {{item.endDate|date('yyyy-MM-dd')}} 共 {{parseInt(item.totalDays/30)}} 月             
                </td>
                <td class="td--key"></td>
                <td class="td--value"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="td--key"></td>
                <td class="td--value" colspan="6">
                  <span style="color:#9c9c9c">提示：学生已通过实习时间3年内累加不能超过12个月，第3年内的实习时长和不能超过10个月！请按要求填写！</span>
                </td>
              </tr>
              <tr>
                <td class="td--key">周记：</td>
                <td>
                  <!-- 还有<span>5</span> 周未填写 -->
                  <router-link :to="{path:`/record/${item.id}`}">请点击此处查看</router-link>
                </td>
                <td colspan="6" class="text-right">
                  <template v-if="item.checkStatus==1">
                    <el-button type="primary" @click="editData(item)">更改信息</el-button>
                  </template>
                  <template v-else>
                    <el-button type="primary" @click="editData(item)">更改信息</el-button>
                    <el-button type="danger" @click="doDelete(item)">删除</el-button>
                  </template>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </template>
        <template v-else>
          <div class="unrecorded-box" style="margin-top: 160px;">
            <div class="unrecorded-box__pic">
              <img src="static/img/warning.png" alt="..." style="height:84px;width:84px;">
            </div>
            <div class="unrecorded-box__info mgt-20">
              尚未登记实习信息
            </div>
            <div class="unrecorded-box__add mgt-10">
              <template v-if="stu_studentInfo.gradeId==activeGrade">
                <router-link :to="{path:'/add'}">请点击此处添加</router-link>
              </template>
              <template v-else>
                 <span style="color: #ff4943;cursor: no-drop">非当前学年，无法添加实习信息~~</span>
              </template>
            </div>
          </div>
        </template>
      </div>
    </container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import importFile from "src/components/ImportFile";
import { notifyBox, deleteConfirm } from "src/config/mUtils";
export default {
  name: "studentList",
  components: { importFile },
  data() {
    return {
      activeGrade: 0,
      totalTableData: 0,
      selectedList: [],
      gradeList: [],
      trainList: [],
      conditionParams: {
        majorId: null,
        classId: null,
        searchText: null,
        checkStatus: -1,
        pageIndex: 1,
        pageSize: 15
      },
      hasData: true,
      list: []
    };
  },
  methods: {
    async doDelete(data) {
      if (await deleteConfirm.call(this)) {
        const res = await this.$api.doRequest(
          `/train/train/${data.id}`,
          "delete"
        );
        if (!res.code) {
          notifyBox.delSuccess.call(this);
          this.doGetList();
        }
        console.log("删除结果：", res);
      }
    },
    async doGetList() {
      let res = await this.$api.doRequest(
        "/train/train/getListByStudentId",
        "get",
        { studentId: this.stu_studentInfo.studentId },
        {}
      );
      this.gradeList = res.gradeList;
      this.trainList = {};
      res.trainList.forEach(item => {
        if (!this.trainList[item.gradeId]) this.trainList[item.gradeId] = [];
        this.trainList[item.gradeId].push(item);
      });
      this.activeGrade = this.stu_studentInfo.gradeId.toString();
      console.log("res::", res);
    },
    editData(data) {
      this.$router.push({ path: `/edit/${data.id}` });
    },
    tabStatusChange(target) {
      this.hasData = !this.hasData;
    }
  },
  mounted() {
    if (!this.gradeList || !this.gradeList.length) {
      this.$store.dispatch("doGetStudentFilterData").then(res => {
        this.doGetList();
        // this.activeGrade = this.stu_studentInfo.gradeId;
      });
    } else {
      this.doGetList();
    }
  },
  computed: {
    ...mapGetters(["stu_gradeList", "stu_studentInfo"])
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.train_list {
  .unrecorded-box {
    height: 400px;
    text-align: center;
    .unrecorded-box__pic {
    }
    .unrecorded-box__info {
    }
    .unrecorded-box__add {
      color: $mainColor;
      cursor: pointer;
    }
  }
  .recorded-box {
    height: 160px;
    width: 960px;
    margin: auto;
    padding: 15px;
    background-image: url(../../../assets/recorded-box_bg.png);
    background-repeat: no-repeat;
    background-position: left;
    background-size: cover;
    border-radius: 4px;
    .recorded-box__table {
      width: 100%;
      height: 160px;
      .td--key {
        width: 120px;
        text-align: right;
        color: #7a7b7c;
      }
      .td--value {
        text-align: left;
      }
    }
  }
}
</style>
