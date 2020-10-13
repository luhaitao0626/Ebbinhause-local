<template>
  <div>
    <el-tag type="success">From {{dateRange[0]}} to {{dateRange[6]}}</el-tag><br/>
    <el-tag type="success">7 days score manifestation</el-tag><br/>
    
    <el-row :gutter="20" >
      <el-col :span="3" v-for="(item,index) in dateRange" :key="index">
        <div class="grid-content bg-purple">
            {{days[index]}}
        </div>
      </el-col>
    </el-row>
    
    <el-row :gutter="20" >
      <el-col :span="3" v-for="(item,index) in dateRange" :key="index">
        <div class="grid-content bg-purple">
            {{dateRange[index]}}
        </div>
      </el-col>
    </el-row>

    <el-tag type="success">finished tasks</el-tag><br/>
    <el-tag type="success">unfinished tasks</el-tag><br/>
    <!-- <h1>{{this.dateRange}}</h1> -->
  </div>
  
</template>

<script>
import Moment from 'moment'
import common  from '../utils/index'

let today = Moment(new Date().getTime()).format("YYYY-MM-DD");

export default {
  name: 'Week',
   data() {
    return {
      time: Moment(new Date().getTime()).format("YYYY-MM-DD"),
      today,
      days:common.Day,
    }
  },
  computed: {
    dateRange(){
      return common.getWeekFromToday(this.today)
    }
  },
  methods:{

  },
  created(){

  },
  mounted() {

  }
}
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
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
