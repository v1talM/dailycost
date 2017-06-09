const state = {
  isEditItem: false,
  items: []
}

const mutations = {
  set_edit_item (state, value) {
    state.isEditItem = value
  },
  set_item_cost (state, cost) {
    if(state.items[0].cost == '0' && cost != '.'){
      state.items[0].cost = cost.toString()
    }else{
      state.items[0].cost = state.items[0].cost.toString() + cost
    }
  },
  del_item_cost (state) {
    if (state.items[0].cost.length == 1) {
      state.items[0].cost = '0'
    }else{
      state.items[0].cost = state.items[0].cost.substring(0, state.items[0].cost.length-1)
    }
  },
  push_item (state, item) {
    state.items.push(item)
  }
}

const actions = {
  setEditItem ({commit}, value) {
    commit('set_edit_item', value)
  },
  delItemCost ({commit}) {
    commit('del_item_cost')
  },
  pushItem ({commit}, item) {
    commit('push_item', item)
  },
  setItemCost ({commit}, cost) {
    commit('set_item_cost', cost)
  }
}

export default {
  state, mutations, actions
}
