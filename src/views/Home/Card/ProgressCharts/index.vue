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
          min:0,
          max:100
        },
        yAxis: {
          show: false,
          type:'category'
        },
        tooltip: {},
        series: [
          {
            type: "bar",
            data: [78],
            color:'yellowgreen',
            barWidth:'15px',
            showBackground:true,
            backgroundStyle:{
              color:'#eee'
            },
            label:{
              show:true
            }
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