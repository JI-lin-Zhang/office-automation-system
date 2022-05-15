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
          // 隐藏x轴
          show:false,
          type:'category'
        },
        yAxis: {
          show:false
        },
        series: [
          {
            data: [52, 88, 94, 41, 132, 63, 47, 32, 30, 80, 102, 168],
            type: "line",
            // 拐点的样式的设置
            itemStyle:{
              opacity:0
            },
            // 线条样式
            lineStyle:{
              color:"skyblue"
            },
            // 填充颜色设置
            // areaStyle:{
              // color:"purple"
            // }
          },
        ],
        // 布局
        grid:{
          left:0,
          top:0,
          right:0,
          bottom:0
        }
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