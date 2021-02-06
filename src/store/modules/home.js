/**
 * home.js
 * 用于home模块的状态管理
 */
/* eslint-disable */
const home = {
  state: {
    number: 1,
	file: null
  },
  mutations: {
    SET_NUM(state, payload) {   // 修改state 可通过mapMutations调用
      state.number = payload
    },
	setfile(state,file){
	  state.file = file
	}
		
  },
  actions: {},
  getters: {            // 定义getters，可以通过mapGetters拓展函数调用
    number: state => {
      return state.number
    },
	file : state =>{
		return state.file
	}
  }
}
export default home    // 输出home模块
