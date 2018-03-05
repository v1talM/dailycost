import Vue from 'vue'
import Vuex from 'vuex'
import items from './modules/items'
import common from './modules/common'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    items, common,
  },
  strict: debug,
})
