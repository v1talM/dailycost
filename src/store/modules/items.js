const state = {
  isEditItem: false,
  items: [],
  activeItem:  { type: 'tag', name: '一 般', cost: 0 },
  date: '',
  chartData: [],
  last: '',
  first: ''
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
    state.items.unshift(item)
   },
  calculate_cost (state) {
      state.items[0].cost = eval(state.items[0].cost).toFixed(2) > 0.00?eval(state.items[0].cost).toFixed(2) .toString():parseFloat(0).toFixed(2)
  },
  pop_item (state) {
      var i = state.items.shift()
  },
  set_active_type(state, type) {
      state.activeItem.type = type.type
      state.activeItem.cost = type.cost
      state.activeItem.name = type.name
  },
  commit_type(state) {
      state.items[0].type = state.activeItem.type
      state.items[0].name = state.activeItem.name
  },
  init_items(state, items){
      state.items = items
  },
  set_date(state, date) {
      state.date = date
  },
  set_chart_data (state, data) {
      state.chartData = data
  },
  set_chart_date_last (state, date) {
      state.last = date
  },
  set_chart_date_first (state, date) {
      state.first = date
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
  popItem ({commit}) {
    commit('pop_item')
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
  setActive({commit}, type) {
      commit('set_active_type', type)
  },
  commitType({commit}) {
      commit('commit_type')
  },
  initItems({commit}, items) {
      commit('init_items', items)
  },
  setDate({commit}, date) {
      commit('set_date', date)
  },
  setChartData({commit}, data) {
      commit('set_chart_data', data)
  },
  setChartDateLast({commit}, date) {
      commit('set_chart_date_last', date)
  },
  setChartDateFirst({commit}, date) {
      commit('set_chart_date_first', date)
  }
}

export default {
  state, mutations, actions
}
