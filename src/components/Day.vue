<template>
  <el-container>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content">{{time | convertTime('YYYY-MM-DD')}} : Today view</div>
      </el-col>

      <el-col :span="24">
        <div class="grid-content">
          <el-progress type="circle" :percentage="parseInt(score)"></el-progress>
        </div>
      </el-col>

      <el-col :span="24">
        <div class="grid-content">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-input placeholder="输入挑战内容" v-model="title">
                <el-button slot="append" icon="el-icon-search" @click="create">创建</el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>

      <el-col :span="24">
        <div class="grid-content">
          <el-tag type="danger">今日挑战</el-tag>
          <ul>
            <li v-for="(item,index) in taskNew" :key="index">
              <el-button
                :type="item.finished ?'success' : 'danger'"
                round
                @click="switchStatusNew(item.id)"
              >{{item.title}} : {{item.finished ? '完成' :'待办' }}</el-button>

              <el-button type="danger" icon="el-icon-delete" @click="removeItem(item.id)"></el-button>
            </li>
          </ul>
        </div>
      </el-col>

      <el-col :span="24">
        <div class="grid-content">
          <el-tag type="warning">今日复习</el-tag>
          <ul>
            <li v-for="(item,index) in taskReview" :key="index">
              <el-button
                :type="item.finished ?'success' : 'danger'"
                round
                @click="switchStatusReview(item.id)"
              >{{item.title}} : {{item.finished ? '完成' :'待办' }}</el-button>
              <el-button type="danger" icon="el-icon-message-solid"></el-button>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
// import axios from "axios";
// import store from '@/vuex/store'
import IndexedDB from "../indexedDB/indexedDB";
import shortId from "shortid";
import Moment from "moment";

export default {
  name: "Day",
  // store,
  data() {
    return {
      time: Moment((new Date()).getTime()).format("YYYY-MM-DD"),
      title: "",
    };
  },
  computed: {
    taskNew() {
      let recordList = this.$store.state.data,
        len = recordList.length,
        lastRecord = recordList[len - 1];
      return lastRecord.new;
    },
    taskReview() {
      let recordList = this.$store.state.data,
        len = recordList.length,
        lastRecord = recordList[len - 1];
      return lastRecord.review;
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
  },
  created() {
    // const URL = "http://restapi.amap.com/v3/weather/weatherInfo";
    // const KEY = "44e7e6c436bc3f33d05291e039f48c01";
    // axios.get(`${URL}?city=${encodeURI("长沙")}&key=${KEY}&extensions=${encodeURI("all")}`)
    //     .then((res) => {
    //       const info =  res.data.forecasts;
    //       const city = info[0].city;
    //       const casts = info[0].casts;
    //       console.log("城市："+ city)
    //       for(let i=0; i<casts.length; i++ ){
    //         console.log(`${casts[i].date} :  ${casts[i].nighttemp} 度 ~ ${casts[i].daytemp} 度`)
    //       }
    //     }).catch(() => {
    //       console.log("天气服务出现异常")
    //     })
  },
  mounted() {},
  methods: {
    storeDataIntoDataBase() {
      let todayRecord = this.$store.state.data[
        this.$store.state.data.length - 1
      ];

      let EbbinDB = null,
        dbName = IndexedDB.dbName,
        storeName = IndexedDB.storeName,
        dbVersion = IndexedDB.dbVersion,
        key = IndexedDB.key,
        storeObj = {
          name: storeName,
          key: key,
        };

      IndexedDB.openDB(dbName, dbVersion, EbbinDB, storeObj)
        .then((db) => {
          let EbbinDB = db;
          return IndexedDB.putData(
            EbbinDB,
            storeName,
            [todayRecord],
            function () {
              console.log("添加数据成功！", todayRecord);
            }
          );
        })
        .then((result) => {
          console.log("DayView status of loading data：", result);
        });
    },
    create() {
      let newItem = {
        title: this.title,
        id: shortId.generate(),
        finished: false,
        order: 0,
      };

      //vuex commit
      this.$store.commit("addDayItem", newItem);
      //store todayRecord into DB
      this.storeDataIntoDataBase();
      //after commit, evacuate input.
      this.title = "";
    },
    removeItem(id) {
      this.$store.commit("removeItem", id);
      this.storeDataIntoDataBase();
    },
    switchStatusNew(id) {
      this.$store.commit("switchStatusNew", id);
      this.storeDataIntoDataBase();
    },
    switchStatusReview(id) {
      this.$store.commit("switchStatusReview", id);
      this.storeDataIntoDataBase();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container {
  padding-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  /* display: inline-block; */
  margin: 0 10px;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

ul li .el-button:first-child {
  width: 255px;
  overflow: clip;
}
/* ul li .el-button:last-child{
    width:255px;
    overflow:clip;
  } */
</style>
