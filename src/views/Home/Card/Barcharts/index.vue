<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
export default {
  data() {
    return {
      chart: null,
      options: {
        xAxis: {
          show: false,
          data: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月'],
          type:'category'
        },
        yAxis: {
          show: false,
        },
        tooltip: {},
        series: [
          {
            name: "人数",
            type: "bar",
            data: [18,20,55,42,32,55,42,34,18,20,55,32],
          },
        ],
        // 布局
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
      },
    };
  },
  methods: {
    initEcarts() {
      this.chart = this.$echarts.init(this.$refs.charts);
      this.chart.setOption(this.options);
    },
  },
  mounted() {
    setTimeout(()=>{
      this.initEcarts();
    },100)
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>