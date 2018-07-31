import Vue from 'vue'
import Vuex from 'vuex'
// import token from './index'
import whiteList from './whitelist'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // token,
    whiteList
  },
  getters: {
    getCurrentHost: state => state.whiteList.cuHost
  }
})

export default store
