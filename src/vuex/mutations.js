// import IndexedDB from '@indexedDB/indexedDB'

export default {
  getData (state, data) {
    state[data.name]=data.result;
  },
  //create a day-view data Object: data={time,new,review} and push it into prop state.data
  addDayRecord(state, data){
    state.data.push(data);
  },
  //if today's new/review Tasks changes, then replace the old data with new data
  addDayItem(state, data){
    state.data[state.data.length-1].new.push(data);
  },
  //Update is not necessary. cause addDayItem play the same role.
  update(state, data){
    state.data[state.data.length-1].new.push(data);
  },
  //remove a specified day task.
  removeItem(state, data){
    let _index;
    state.data[state.data.length-1].new.forEach((element,index) => {
      if(element.id === data ){
        _index = index;
      }
    });
    state.data[state.data.length-1].new.splice(_index,1);
  },
  //switch the status of today's new task (toggle[finished] : true/false)
  switchStatusNew(state,data){
    let _index;
    state.data[state.data.length-1].new.forEach((element,index) => {
      if(element.id === data ){
        _index = index;
      }
    });
    state.data[state.data.length-1].new[_index].finished = !state.data[state.data.length-1].new[_index].finished;
  },
  //switch the status of today's review task (toggle[finished] : true/false)
  switchStatusReview(state,data){
    let _index;
    state.data[state.data.length-1].review.forEach((element,index) => {
      if(element.id === data ){
        _index = index;
      }
    });
    state.data[state.data.length-1].review[_index].finished = !state.data[state.data.length-1].review[_index].finished;
  }
}