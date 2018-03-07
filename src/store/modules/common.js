const state = {
  isLogin: false,
  allData: [],
  barType: [],
  barValue: []
}

const mutations = {
  SET_ISLOGIN (state, val) {
    state.isLogin = val
  },
  Set_All_Data (state, val) {
    state.allData = val
  },
  Set_Bar_Type (state, val) {
    state.barType = val
  },
  Set_Bar_Value (state, val) {
    state.barValue = val
  }
}

const actions = {
  setIsLogin ({commit}, value) {
    commit('SET_ISLOGIN', value)
  },
  setAllData ({commit}, value) {
    commit('Set_All_Data', value)
  },
  setBarType ({commit}, value) {
    commit('Set_Bar_Type', value)
  },
  setBarValue ({commit}, value) {
    commit('Set_Bar_Value', value)
  }
}

export default {
  state, mutations, actions
}
