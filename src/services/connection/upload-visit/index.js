import apiClient from '@/services/axios/axios'

const state = {
  data: {
    isLoading: false,
  },
}

const mutations = {
  changeVisitPlan(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getDataFromExcel({ commit, state }) {
    commit('changeVisitPlan', {
      isLoading: true,
    })

    const { data } = state
    
    
    const result = await apiClient.post('/Visit/CekVisitPlan')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
