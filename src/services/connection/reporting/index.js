import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {},
}

const mutations = {
  changeReporting(state, payload) {
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
