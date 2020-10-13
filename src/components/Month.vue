<template>
  <div>
    <el-tag type="success">Month: {{month}}</el-tag>
    <br />

    <el-collapse>
      <el-collapse-item>
        <template slot="title">
          <el-tag type="danger">Everyday Score</el-tag>
        </template>
        <div>
          <el-calendar v-model="selectedDay">
            <template slot="dateCell" slot-scope="{data}">
              <p
                :class="data.isSelected ? 'is-selected' : ''"
              >{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}</p>
            </template>
          </el-calendar>

          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content">{{selectedDay | convertTime('YYYY-MM-DD')}}</div>
              <div class="grid-content">
                <el-progress type="circle" :percentage="parseInt(score)"></el-progress>
              </div>
            </el-col>

            <el-col :span="8">
              <div class="grid-content">
                <el-tag type="danger">当日挑战</el-tag>
                <ul>
                  <li v-for="(item,index) in taskNew" :key="index">
                    <el-button
                      :type="item.finished ?'success' : 'danger'"
                      round
                    >{{item.title}} : {{item.finished ? '完成' :'待办' }}</el-button>
                  </li>
                </ul>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-tag type="warning">当日复习</el-tag>
                <ul>
                  <li v-for="(item,index) in taskReview" :key="index">
                    <el-button
                      :type="item.finished ?'success' : 'danger'"
                      round
                    >{{item.title}} : {{item.finished ? '完成' :'待办' }}</el-button>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>

      <el-collapse-item>
        <template slot="title">
          <el-tag type="danger">curve of days</el-tag>
        </template>
        <div>
          <chart ref="chart1" :options="orgOptions" :auto-size="true"></chart>
        </div>
      </el-collapse-item>

      <el-collapse-item>
        <template slot="title">
          <el-tag type="success">compared with last 3 months</el-tag>
        </template>
        <div>compared with last 3 months- curve</div>
      </el-collapse-item>

      <el-collapse-item>
        <template slot="title">
          <el-tag type="danger">finished tasks</el-tag>
        </template>
        <div>finished tasks</div>
      </el-collapse-item>

      <el-collapse-item>
        <template slot="title">
          <el-tag type="danger">unfinished tasks</el-tag>
        </template>
        <div>unfinished tasks</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import common from "../utils/index";
import Moment from "moment";
// import echarts from 'echarts'
export default {
  name: "Month",
  data() {
    return {
      today: new Date(),
      month: common.Months[new Date().getMonth()],
      orgOptions: {},
      selectedDay: new Date(),
      selectedDayIndex: this.$store.state.data.length - 1,
    };
  },
  computed: {
    taskNew() {
      if (this.selectedDayIndex != null) {
        return this.$store.state.data[this.selectedDayIndex].new;
      } else {
        return [];
      }
    },
    taskReview() {
      if (this.selectedDayIndex != null) {
        return this.$store.state.data[this.selectedDayIndex].review;
      } else {
        return [];
      }
    },
    score() {
      let count = 0,
        taskNew = this.taskNew,
        taskReview = this.taskReview,
        tot;
      if (taskNew.length > 0) {
        tot = taskNew.length + taskReview.length;
        taskNew.forEach((element) => {
          if (element.finished) {
            count++;
          }
        });
        taskReview.forEach((element) => {
          if (element.finished) {
            count++;
          }
        });

        return parseInt((count / tot) * 100);
      }

      return 0;
    },
    range() {
      //range() is an object: { range, rangeList, count}
      let year = this.today.getFullYear(),
        month = this.today.getMonth();
      return common.getDateRangeOfMonth(year, month);
    },
    dataList() {
      console.log(this.scoreListOfThisMonth)
      let recordList = this.$store.state.data,
        count = this.range.count,
        scoreList = new Array(count);
      for (let i = recordList.length - 1; i >= 0; i--) {
        let dayRecord = recordList[i];
        // console.log("dayRecord:",dayRecord)
        for (let j = count - 1; j >= 0; j--) {
          let currentDay = common.nDayFromNow(
            this.range.range[1],
            -(count - j - 1)
          );
          // console.log(currentDay)
          if (currentDay == dayRecord.time) {
            scoreList[j] = 100;
          }
        }
      }
      for (let k = 0; k < count; k++) {
        if (scoreList[k] == undefined) {
          scoreList[k] = 0;
        }
      }
      return scoreList;
    },
    scoreOfThisMonth(){
      let i,j,
          EverydayOfThisMonthScoreList = [],
          data = this.$store.state.data,
          todayIndexInRangeList = this.range.rangeList.indexOf(Moment(new Date(this.today).getTime()).format("YYYY-MM-DD")),
          dayRangeList = this.range.rangeList.slice(0,todayIndexInRangeList + 1);

      for( i = 0; i<dayRangeList.length; i++ ){
        let score = 0,
            dayTime = dayRangeList[i];
        for( j = 0; j<data.length ; j++ ) {
          if(dayTime == data[j].time){
            score = common.computeScore( data[j].new, data[j].review )
            break
          }
        }
        EverydayOfThisMonthScoreList.push(score);
      }
      return {x: dayRangeList , y: EverydayOfThisMonthScoreList}
    },
  },
  methods: {
    getTasksByTime(time) {
      // console.log(time)
      let recordList = this.$store.state.data,
        item,
        index = null,
        target = {
          time: "",
          taskNew: [],
          taskReview: [],
        };

      for (let i = recordList.length - 1; i >= 0; i--) {
        item = recordList[i];
        if (time == item.time) {
          target = item;
          index = i;
          break;
        }
      }
      return { index, ...target };
    },
    initChart() {
      this.orgOptions = {
        xAxis: {
          type: "category",
          data: this.scoreOfThisMonth.x,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.scoreOfThisMonth.y,
            type: "line",
            smooth: true,
          },
        ],
      };
    }
  },
  watch: {
    selectedDay(val) {
      let time = Moment(new Date(val).getTime()).format("YYYY-MM-DD"),
        result = this.getTasksByTime(time);
      this.selectedDayIndex = result.index;
    },
    // selectedDay:{
    //   handler () {
    //     // console.log(val.name)
    //   },
    //   deep:true,
    // },
    // 'selectedDay.time' : function(val) {
    //   let time = Moment((new Date(val)).getTime()).format("YYYY-MM-DD")
    //   let result = this.getTasksByTime(time)
    //   this.taskNew    = result.new
    //   this.taskReview = result.review
    // }
  },
  mounted() {
    this.initChart()
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /* display: inline-block; */
  margin: 5px;
}
a {
  color: #42b983;
}

.is-selected {
  color: #1989fa;
}
</style>
