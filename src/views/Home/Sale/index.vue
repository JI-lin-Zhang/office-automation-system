<template>
  <el-card class="box-card" style="margin: 10px 0px">
    <!-- 头部区域 -->
    <div slot="header" class="clearfix">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
        <!-- 头部左侧内容 -->
        <el-tab-pane label="公司效益" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <!-- <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span> -->
        <!-- 日期 -->
        <!-- <el-date-picker
          class="date"
          v-model="date"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
          size="mini"
          value-format="yyyy-mm-dd"
        > -->
        <!-- </el-date-picker> -->
      <!-- </div> -->
    </div>
    <!-- 内容区域 -->
    <div>
      <el-row :gutter="10">
        <el-col :span="16">
          <!-- 左侧容器 -->
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="8" v-show="this.activeName == 'sale'">
          <h3>工作不认真，亲人两行泪啊！</h3>
        </el-col>
        <el-col :span="8" v-show="this.activeName != 'sale'">
          <h3 style="text-align:center">{{ title }}排名</h3>
          <ul>
            <li>
              <span class="leftNum">1</span>
              <span>红烧牛肉</span>
              <span>19242</span>
            </li>
            <li>
              <span class="leftNum">2</span>
              <span>酸辣土豆丝</span>
              <span>17202</span>
            </li>
            <li>
              <span class="leftNum">3</span>
              <span>糖醋排骨</span>
              <span>17200</span>
            </li>
            <li>
              <span class="leftNum">4</span>
              <span>烤全羊</span>
              <span>17108</span>
            </li>
            <li>
              <span class="leftNum">5</span>
              <span>红烧排骨</span>
              <span>16545</span>
            </li>
            <li>
              <span class="leftNum">6</span>
              <span>东坡肉</span>
              <span>16322</span>
            </li>
            <li>
              <span class="leftNum">7</span>
              <span>佛跳墙</span>
              <span>16280</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
// 引入echarts
import echarts from "echarts";
import dayjs from "dayjs";
export default {
  data() {
    return {
      activeName: "sale",
      // 收集日历的数据
      date: "",
      myCharts: null,
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 获取本月
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    // 获取本周
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      // console.log(start,end);
      this.date = [start, end];
    },
    // 获取本月
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    // 获取本年
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
  mounted() {
    setTimeout(() => {
      // 初始化echarts实例
      this.myCharts = echarts.init(this.$refs.charts);
      // 配置数据
      this.myCharts.setOption({
        title: {
          text: "公司效益",
        },
        xAxis: {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130, 150, 30, 40, 88, 168],
            type: "bar",
            color: "pink",
          },
        ],
      });
    }, 100);
  },
  watch: {
    title() {
      // 监听echarts
      this.myCharts.setOption({
        title: {
          text: this.title,
        },
      });
    },
    seriesData(){
      this.myCharts.setOption({
        series: [
          {
            data: this.seriesData,
            type: "bar",
            color: "pink",
          },
        ],
      })
    }
  },
  computed: {
    title() {
      if (this.activeName == "sale") {
        return "公司效益";
      } else {
        return "访问量";
      }
    },
    seriesData(){
      if (this.activeName == "sale") {
        return [120, 200, 150, 80, 70, 110, 130, 150, 30, 40, 88, 168];
      } else {
        return  [52, 88, 94, 41, 132, 63, 47, 32, 30, 80, 102, 168];
      }
    }
  },
};
</script>

<style scoped>
.box-card >>> .el-card__header {
  border: none;
}
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.date {
  width: 320px;
  margin: 0 20px;
}
.right span {
  margin: 0 10px;
  cursor: pointer;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  padding: 0;
  list-style: none;
  width: 100%;
  height: 300px;
}
ul li {
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
  height: 8%;
}
ul li span {
  margin: 0px 10px;
  padding: 5px;
}
.leftNum {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: skyblue;
  color: white;
  text-align: center;
}
</style>