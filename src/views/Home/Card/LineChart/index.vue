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
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [133, 55, 67, 218, 135, 147, 175],
            type: "line",
          },
        ],
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
    this.initEcarts();
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>