<template>
  <div>

    <el-tag>Year: 2020</el-tag><br/>
    <el-tag type="success">Echarts</el-tag><br/>
    <el-tag type="info">task pool</el-tag><br/>
    <el-tag type="warning">finished Tasks</el-tag><br/>
    <el-tag type="danger">continuing Tasks</el-tag><br/>

  
  </div>
  
</template>

<script>

// console.log(this.$state.count);

export default {
  name: 'Year',
  props: {
    msg: String
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
