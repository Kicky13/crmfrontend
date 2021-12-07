import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    listRadiusDistrik: [],
    columns: [
      {
        title: 'No',
        key: 'index',
        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },
      {
        title: 'Level Wilayah',
        dataIndex: 'LevelWilayahName',
        key: 'LevelWilayahName',
      },
      {
        title: 'Nama Wilayah',
        dataIndex: 'distrik_name',
        key: 'distrik_name',
      },
      {
        title: 'Radius Lock (Meter)',
        dataIndex: 'radius_lock',
        key: 'radius_lock',
      },
      {
        title: 'Action',
        dataIndex: 'uuid',
        width: 150,
        slots: { customRender: 'action' },
      },
    ],
    dataDistrik: [],
    dataWilayah: [],
    isLoading: false,
    bodyList: {
      offset: 1,
      limit: 2000,
      filter: '',
    },
    itemsPerPage: [5, 10, 15, 20],
    pagination: {},
    rules: {
      wilayahid: [
        {
          required: true,
          message: 'Pilih Salah Satu Wilayah',
          type: 'number',
        },
      ],
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
      q: data.bodyList.filter,
     
    }

    const result = await apiClient.post('/RadiusWilayah/List', body)

    if (result.data.status == 'error') {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
      await commit('changeRadiusDistrik', {
        isLoading: false,
      })
    } else {
      await commit('changeRadiusDistrik', {
        listRadiusDistrik: result.data.data,
        isLoading: false,
      })
    }
  },

  async getDataWilayah({ commit, state }) {
    commit('changeRadiusDistrik', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }

    const result = await apiClient.post('/RadiusWilayah/ListLevelWilayah', body)

    if (result.data.status == 'error') {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
      await commit('changeRadiusDistrik', {
        isLoading: false,
      })
    } else {
      await commit('changeRadiusDistrik', {
        dataWilayah: result.data.data,
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
      // offset: data.bodyList.offset,
      // limit: data.bodyList.limit,
      idLevelWilayah: data.formData.wilayahid,
    }

    const result = await apiClient.post('/RadiusWilayah/List_Distrik', body)

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
      IDwilayah: data.formData.distrikid,
      idLevelWilayah: data.formData.wilayahid,
      radius_lock: data.formData.radius,
    }

    result = await apiClient.post('/RadiusWilayah/Insert_Radius', body)
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
      notification.success({
        message: 'Success',
        description: result.data.message,
      })
    }
  },
  async updateDataRadiusDistrik({ commit, state }) {
    commit('changeRadiusDistrik', {
      isLoading: true,
    })

    const { data } = state

    let result = ''

    let body = {
      IDwilayah: data.formData.distrikid,
      idLevelWilayah: data.formData.wilayahid,
      radius_lock: data.formData.radius,
      uuid_radius_wilayah: data.formData.id,
    }
    
    if (body.radius_lock >= 100000) {
      notification.error({
        message: 'Error',
        description: 'radius lock tidak boleh lebih dari 100000',
      })
    } else {
      result = await apiClient.post('/RadiusWilayah/Update_Radius', body)
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
        notification.success({
          message: 'Success',
          description: result.data.message,
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
      uuid: payload.id_distrik,
    }

    const result = await apiClient.post('/RadiusWilayah/Delete_Radius', body)

    if (result.data.status == 'error') {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
    } else {
      await commit('changeRadiusDistrik', {
        isLoading: false,
        listRadiusDistrik: result.data.data,
      })
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
