<!-- list 模块 -->
<template>
  <div>
    <container>
      <template slot="title">实习安排信息汇总</template>
      <template slot="tools">
        <el-button type="primary" @click="dialogVisible = true" icon="plus">导出</el-button>
      </template>
      <template slot="conditions" class="handleBtnPanel_sm">
        <!--filterable-->
        <el-select v-model="conditionParams.yearId" clearable placeholder="学年" @change="doGetList()">
          <el-option v-for="(item,key) in adminFilterData.yearList" :key="key" :label="item.yearName" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="conditionParams.classId" clearable placeholder="班级" @change="doGetList()">
          <el-option v-for="(item,key) in adminFilterData.classList" :key="key" :label="item.className" :value="item.id"></el-option>
        </el-select>
        <el-input class="search-ipt" placeholder="学号、姓名" v-model="conditionParams.searchText">
          <el-button class="ipt-append-btn" type="primary" slot="append" @click="doGetList()">查询</el-button>
        </el-input>
      </template>
      <template slot="body">
        <el-table ref="listTable" border :data="list" empty-text="暂无数据" @selection-change="rowSelect" style="width: 100%">
          <!--<el-table-column align="center" type="selection" width="50"></el-table-column>-->
          <!--<el-table-column align="center" prop="certificateNo" width="80" label="序号"></el-table-column>-->
          <el-table-column align="center" prop="studentCode" label="学号" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="studentName" label="学生" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="className" label="专业" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="companyName" label="实习单位" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="teacherName" label="指导老师" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="checkStatusName" label="实习开始时间">
            <template slot-scope="scope">
              {{scope.row.trainStartDate|date('yyyy-MM-dd')}}
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import importFile from "src/components/ImportFile";
export default {
  name: "inquire",
  components: { importFile },
  data() {
    return {
      totalTableData: 0,
      selectedList: [],
      conditionParams: {
        yearId: null,
        classId: null,
        searchText: null,
        pageIndex: 1,
        pageSize: 15
      },
      modalData: {
        certificateCost: null,
        certificateLevel: null,
        certificateNo: null,
        certificateProfession: null,
        certificateTypeId: null,
        certificateTypeName: null,
        checkStatus: null,
        checkStatusName: null,
        checkUserId: null,
        classId: null,
        examDate: null,
        fileUuid: null,
        id: null,
        inputUserId: null,
        majorId: null,
        majorName: null,
        needExam: true,
        studentCode: null,
        studentId: null,
        studentName: null,
        tenantId: null
      },
      list: [],
      studentInfo: {},
      dialogVisible: false
    };
  },
  methods: {
    async doGetList() {
      let res = await this.$api.doRequest(
        "/train/report/getBasisReport",
        "get",
        this.conditionParams
      );
      console.log("列表：", res);
      this.list = res.list;
      this.totalTableData = res.total;
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
    }
  },
  mounted() {
    this.$store.dispatch("doGetAdminFilterData").then(res => {
      this.doGetList();
    });
  },
  computed: {
    ...mapGetters(["adminFilterData"])
  }
};
</script>

<style lang="scss" type="text/scss" scoped></style>