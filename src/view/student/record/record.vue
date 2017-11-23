<template>
  <container>
    <div slot="title">实习记录</div>
    <div slot="tools">
      <el-button type="primary" @click="addRecord()" icon="el-icon-plus">
        新增
      </el-button>
      <el-button type="warning" @click="goBack()" icon="el-icon-back">
        返回
      </el-button>
    </div>
    <div slot="body" class="train_list">
      <el-table :data="list" border style="width: 100%">
        <el-table-column label="周次" align="center" width="180">
          <template slot-scope="scope">
            <router-link :to="{path:`/edit_record/${trainId}/${scope.row.id}`}">{{scope.row.weekName}}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="开始日期" align="center" width="180">
          <template slot-scope="scope">
            {{scope.row.startDate | date('yyyy-MM-dd hh:mm')}}
          </template>
        </el-table-column>
        <el-table-column label="结束日期" align="center" width="180">
          <template slot-scope="scope">
            {{scope.row.endDate | date('yyyy-MM-dd hh:mm')}}
          </template>
        </el-table-column>
        <el-table-column label="实习公司" align="center" prop="companyName" width="180"></el-table-column>
        <el-table-column label="实习岗位" align="center" prop="jobtitleName" width="180"></el-table-column>
        <el-table-column label="实习心得" min-width="260" prop="remark" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
  </container>
</template>

<script>
import { notifyBox, deleteConfirm, getCheckedIds } from "src/config/mUtils";
export default {
  name: "record",
  components: {},
  data() {
    return {
      activeGrade: 0,
      totalTableData: 0,
      selectedList: [],
      gradeList: [],
      trainList: [],
      trainId: null,
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
    async doDelete() {
      if (!this.selectedList.length) {
        return this.$message.warning("请至少选择一条数据");
      }
      if (await deleteConfirm.call(this)) {
        const ids = getCheckedIds(this.selectedList);
        const res = await this.$api.doRequest("/train/train", "delete", {
          ids: ids.join(",")
        });
        if (res.code) {
          notifyBox.delSuccess.call(this);
          this.doGetList();
        }
        console.log("删除结果：", res);
      }
    },
    async doGetList() {
      this.list = await this.$api.doRequest("/train/weekly/getList", "get", {
        trainId: this.trainId
      });
      console.log("res::", this.list);
    },
    editData(data) {
      this.$router.push({ path: `/edit/${data.id}` });
    },
    addRecord() {
      this.$router.push({ path: `/add_record/${this.trainId}` });
    },
    goBack() {
      this.$router.push({ path: "/list" });
    },
    tabStatusChange(target) {
      this.hasData = !this.hasData;
    }
  },
  mounted() {
    this.trainId = this.$route.params.trainId;
    this.doGetList();
  },
  computed: {}
};
</script>
