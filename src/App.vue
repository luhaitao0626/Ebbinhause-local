<template>
  <el-container id="app">
    <el-header>
      <img :src="logo" alt="Ebbinhause Memory App" title="Logo" />
    </el-header>
    <el-container>
      <el-aside>
        <Aside></Aside>
      </el-aside>
      <el-main>
        <el-row>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">进度一览</el-breadcrumb-item>
            <el-breadcrumb-item>视图</el-breadcrumb-item>
          </el-breadcrumb>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="4" :offset="6">
            <div class="grid-content bg-purple">
              <router-link to="/Year">
                <el-button type="primary">Year View</el-button>
              </router-link>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">
              <router-link to="/Month">
                <el-button type="info">Month view</el-button>
              </router-link>
            </div>
          </el-col>
          <!-- <el-col :span="3">
            <div class="grid-content bg-purple">
              <router-link to="/Week"><el-button type="warning">Week View</el-button></router-link>
            </div>
          </el-col>-->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <router-link to="/Day">
                <el-button type="success">Day View</el-button>
              </router-link>
            </div>
          </el-col>
        </el-row>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>

    <el-footer>copyright by Alex Lu</el-footer>
    
  </el-container>
</template>

<script>
import logo from "./assets/logo.jpg";
import Aside from "./components/Aside";
import IndexedDB from "./indexedDB/indexedDB";
import Moment from "moment";
import shortId from "shortid";

export default {
  name: "App",
  components: {
    Aside,
  },
  data() {
    return {
      logo: logo,
    };
  },
  created() {
    let _this = this;
    let today = Moment(new Date().getTime()).format("YYYY-MM-DD"),
    recordTemplate = {
      time: today,
      new: [
        {
          title: "每日study常规",
          id: shortId.generate(),
          finished: false,
          order: 0,
          priority: 5,
        },
      ],
      review: [
        {
          title: "每日review常规",
          id: shortId.generate(),
          finished: false,
          order: 0,
          priority: 5,
        },
      ],
    },
    records = this.$store.state.data;
    //if nothing is not in data, then push today record into it.
    if (records.length == 0 || records[records.length - 1].time != today) {
      this.$store.commit("addDayRecord", recordTemplate);
    }

    let EbbinDB = null,
      dbName = IndexedDB.dbName,
      storeName = IndexedDB.storeName,
      dbVersion = IndexedDB.dbVersion,
      key = IndexedDB.key,
      storeObj = {
        name: storeName,
        key: key,
      };

    // open IndexedDB
    IndexedDB.openDB(dbName, dbVersion, EbbinDB, storeObj)
    .then((db) => {
      let key = "";
      EbbinDB = db;
      return IndexedDB.getData(EbbinDB, storeName, key)
    })
    .then((result) => {
      //if there's no today data in DB, then add today template into store
      let data = {
        name: "data",
        result: result,
      };
      if (result.length == 0 || result[result.length - 1].time != today) {
          result.push(recordTemplate);
          data = {
            name: "data",
            result: result,
          };
          console.log("data", data);
          _this.$store.commit("getData", data);
          return IndexedDB.putData(EbbinDB, storeName, [recordTemplate])
      }else{
        _this.$store.commit("getData", data);
        return new Promise((resolve) => {resolve("数据初始化成功")})
      }
    })
    .then((result) => {
      console.log(result);
    }).
    catch((err) => {
      alert(err)
    })
  },
  mounted() {
    
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
}

header {
  font-size: 30px;
}

.el-header,
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-header {
  border-bottom: solid 1px #e6e6e6;
}

.el-header img {
  height: 100%;
  float: left;
}

.el-footer {
  background-color: #eeeeee;
}

.el-aside {
  color: #333;
  line-height: 200px;
  border-right: solid 1px #e6e6e6;
  /* width:150px; */
}

.el-main {
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

.el-container {
  line-height: 40px;
}

/* .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
fade-enter, .fade-leave-to  {
  opacity: 0;
} */
</style>

