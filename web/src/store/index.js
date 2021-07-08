import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editStatus: false,
    createdStatus: false,
    boxEditStatus: false,
    item: {}
  },
  mutations: {
    // 点击编辑按钮
    setEditStatus (state) {
      if (!state.createdStatus) {
        if (state.editStatus) {
          Vue.prototype.bus.$emit('saveEdit')
        }
        state.editStatus = !state.editStatus
        // 如果为false 则将新建状态和box编辑状态设为0
        if (!state.editStatus) {
          this.commit('setBoxEditStatus', false)
          this.commit('setCreatedStatus', false)
        }
      }
    },
    // 点击新建按钮
    setCreatedStatus (state, payload) {
      if (!state.editStatus) {
        state.createdStatus = payload === false ? payload : !state.createdStatus
        Vue.prototype.bus.$emit('createdStatus', state.createdStatus)
      }
    },
    // 点击box编辑
    setBoxEditStatus (state, payload) {
      state.boxEditStatus = payload
      Vue.prototype.bus.$emit('boxEditStatus', state.boxEditStatus)
    },
    setItem (state, payload) {
      state.item = payload
      this.commit('setBoxEditStatus', true)
    }
  },
  actions: {
  },
  modules: {
  }
})
