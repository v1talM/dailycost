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
   },
  calculate_cost (state) {
      state.items[0].cost = eval(state.items[0].cost).toString()
  },
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
    var range, el = document.getElementById('cost');
    if (el.setSelectionRange) {
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length)
    } else {
      range = el.createTextRange();
      range.collapse(false);
      range.select();
    }
    commit('set_item_cost', cost)
  },
  calCost ({commit}) {
      commit('calculate_cost')
  },
}

export default {
  state, mutations, actions
}
