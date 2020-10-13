import Moment from 'moment'
import shortId from 'shortid'

let today = Moment(parseInt(new Date().getTime())).format("YYYY-MM-DD");

//default initData
if(localStorage.getItem(today) === null){
  localStorage.setItem(today,JSON.stringify({
    time:today,
    knowledge_new: [
      {title:"每日study常规", id:shortId.generate(),finished:false,order:0,priority:5},
    ],
    knowledge_review: [
      {title:"每日review常规",id:shortId.generate(),finished:false,order:0,priority:5}
    ]
  }))
}

let data = JSON.parse(localStorage.getItem(today))

// console.log('data',data)

let saveLocalStorage = function(state){
  console.log('time: '+state.time)
  localStorage.setItem(state.time,JSON.stringify(state));
}

export default {
  data,
  saveLocalStorage,
}
