const state = {
  isEditItem: false
}

const mutations = {
  set_edit_item (state, value) {
    state.isEditItem = value
  }
}

const actions = {
  setEditItem ({commit}, value) {
    commit('set_edit_item', value)
  }
}

export default {
  state, mutations, actions
}
