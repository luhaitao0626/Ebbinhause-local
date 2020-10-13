import { CREATE , UPDATE , REMOVE , SWITCH_STATUS } from '@/vuex/mutation_types'
import storage from '@/vuex/myLocalStorage'

const state = {
  ...storage.data,
}

const getters = {
  get_time: state => {
    return state.time
  },
  get_knowledge_new: state => {
    return state.knowledge_new
  },
  get_knowledge_review: state => {
    return state.knowledge_review
  },
}

const mutations = {
  [CREATE](state, data){
    state.knowledge_new.push(data);
    storage.saveLocalStorage(state)

  },
  [UPDATE](state, data){
    console.log(state,data)
  },
  [REMOVE](state, data){
    let _index;
    state.knowledge_new.forEach((element,index) => {
      if(element.id === data ){
        _index = index;
      }
    });
    state.knowledge_new.splice(_index,1);
    storage.saveLocalStorage(state)
  },
  [SWITCH_STATUS](state,data){
    let _index;
    state.knowledge_new.forEach((element,index) => {
      if(element.id === data ){
        _index = index;
      }
    });
    state.knowledge_new[_index].finished = !state.knowledge_new[_index].finished;

    storage.saveLocalStorage(state)

  }
}

export default {
  state,
  mutations,
  getters
}
