const state = {
  isLogin: false,
}

const mutations = {
  SET_ISLOGIN (state, val) {
    state.isLogin = val
  }
}

const actions = {
  setIsLogin ({commit}, value) {
    commit('SET_ISLOGIN', value)
  }
}

export default {
  state, mutations, actions
}
