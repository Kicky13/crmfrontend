import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    listDistributor: [],
    isLoading: false,
  },
}

const mutations = {
  changeRadiusDistrik(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
