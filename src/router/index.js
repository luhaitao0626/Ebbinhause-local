import Vue from 'vue'
import Router from 'vue-router'
import Year from '@/components/Year'
import Month from '@/components/Month'
// import Week from '@/components/Week'
import Day from '@/components/Day'

Vue.use(Router)

export default  new Router({
  routes: [
    {path:'/',redirect:'Year'},
    {path:'/Year', name:'Year', component:Year },
    {path:'/Month',name:'Month',component:Month},
    // {path:'/Week', name:'Week', component:Week },
    {path:'/Day',  name:'Day',  component:Day  },
  ]
})