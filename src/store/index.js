import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
Vue.use(Vuex); //安装 Vuex 插件

// 创建 store 实例并且导出
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})