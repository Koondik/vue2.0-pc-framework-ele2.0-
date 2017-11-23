<!-- chart.vue 模块 -->
<template>
  <div class="charts">
    <div :id="id" :option="option" style="width: 800px;height: 400px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "chart",
  components: {},
  props: {
    id: {
      type: String,
      default: "myChart"
    },
    option: {
      type: Object
    }
  },
  mounted() {
    this.initChart();
    this.assignData();
  },
  data() {
    return {
      myChart: null,
      mainChart: null
    };
  },
  methods: {
    getChartInstance() {
      return this.mainChart;
    },
    initChart() {
      this.myChart = document.getElementById(this.id);
      this.mainChart = echarts.init(this.myChart);
    },
    assignData(option) {
      this.mainChart.setOption(option || this.option);
    }
  },
  computed: {}
};
</script>

<style lang="scss" type="text/scss" scoped>
.charts {
  width: 100%;
  min-height: 600px;
}
</style>
