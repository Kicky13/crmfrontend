import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    listRadiusDistrik: [],
    columns: [
      {
        title: 'No.',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Nama Distrik',
        dataIndex: 'distrikname',
        key: 'distrikname',
      },
      {
        title: 'Radius Lock (Meter)',
        dataIndex: 'radius',
        key: 'radius',
      },
      {
        title: 'Action',
        dataIndex: 'id',
        width: 150,
        // key: 'id',
        slots: { customRender: 'action' },
      },
    ],
    dataDistrik: [],
    isLoading: false,
    bodyList: {
      offset: 1,
      limit: 20,
    },
    rules: {
      distrikid: [
        {
          required: true,
          message: 'Pilih Salah Satu Distrik',
          type: 'number',
        },
      ],
      radius: [
        {
          required: true,
          message: 'Masukkan Nilai Radius',
          type: 'number',
        },
      ],
    },
    formData: {
      id: null,
      rownum: null,
      distrikid: undefined,
      radius: 0,
    },
  },
}

const mutations = {
  changeRadiusDistrik(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getDataListDistrik({ commit, state }) {
    commit('changeRadiusDistrik', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }

    const result = await apiClient.post('/RadiusDistrik/List', body)

    if (result.data.status == 'error') {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
    } else {
      await commit('changeRadiusDistrik', {
        listRadiusDistrik: result.data.data,
        isLoading: false,
      })
    }
  },

  async getDataDistrik({ commit, state }) {
    commit('changeRadiusDistrik', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }

    const result = await apiClient.post('/RadiusDistrik/List_Distrik', body)

    if (result.data.status == 'error') {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
    } else {
      await commit('changeRadiusDistrik', {
        dataDistrik: result.data.data,
        isLoading: false,
      })
    }
  },

  async postDataRadiusDistrik({ commit, state }) {
    commit('changeRadiusDistrik', {
      isLoading: true,
    })

    const { data } = state

    let result = ''

    let body = {
      IDdistrik: data.formData.distrikid,
      radius_lock: data.formData.radius,
    }

    if (data.bodyList.id) {
      result = await apiClient.put('/RadiusDistrik/Set_Radius', body)
      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
      } else {
        await commit('changeRadiusDistrik', {
          dataDistrik: result.data.data,
          isLoading: false,
        })
      }
    } else {
      result = await apiClient.post('/RadiusDistrik/Set_Radius', body)
      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
      } else {
        await commit('changeRadiusDistrik', {
          dataDistrik: result.data.data,
          isLoading: false,
        })
      }
    }
  },
  async deleteDataRadiusDistrik({ commit, state }, payload) {
    commit('changeRadiusDistrik', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      IDdistrik: payload.id_distrik,
    }

    const result = await apiClient.delete('/RadiusDistrik/Delete_Radius', body)

    if (result.data.status == 'error') {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
    } else {
      notification.success({
        message: 'Success',
        description: result.data.message,
      })
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
