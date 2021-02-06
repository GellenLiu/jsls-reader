// import Vue from 'vue'
// import Vuex from 'vuex'
// import home from './modules/home'
// import createLogger from 'vuex/dist/logger'

// Vue.use(Vuex)
// const debug = true
// /* eslint-disable */
// export default new Vuex.Store({
//   modules: {
//     home
//   },
//   plugins: debug ? [createLogger()] : []   // 是否开启vuex的debug模式
// })
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
})
