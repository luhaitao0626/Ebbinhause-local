import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const debug = process.env.NODE_ENV !== "production";
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  // modules: {
  //   Day,
  // },
  strict: debug,
  middlewares: [],
});


// let today =  Moment(new Date().getTime()).format("YYYY-MM-DD"),
//     dbParams = {
//       dbName: 'Ebbinhause-App',
//       dbVersion: 1,
//       dbStoreName: 'everyDayTask'
//     },
//     state = {
//       time:today,
//       knowledge_new:[],
//       knowledge_review:[]
//     };
// dbObj.init(dbParams,function(){
//   dbObj.select(today,function(data){
//     if(data){
//       state = {
//         ...data,
//       }
//     }
//   })
// });