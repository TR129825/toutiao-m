import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 用来存储当前用户信息
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了放置数据丢失，需要把数据备份到本地localStorage
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
