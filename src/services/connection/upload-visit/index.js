import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    isLoading: false,
    listData: [],
    status: '',
    columns: [
      {
        title: '',
        width: 100,
        slots: { customRender: 'icon' },
        fixed: 'left',
      },
      {
        title: 'Username',
        dataIndex: 'username',
        width: 150,
      },
      {
        title: 'Id Toko',
        dataIndex: 'id_toko',
        width: 100,
      },
      {
        title: 'Nama Toko',
        width: 150,
        key: 'nama_toko',
        slots: { customRender: 'nama_toko' },
      },
      {
        title: 'Min',
        dataIndex: 'minggu',
      },
      {
        title: 'Sen',
        dataIndex: 'senin',
      },
      {
        title: 'Sel',
        dataIndex: 'selasa',
      },
      {
        title: 'Rab',
        dataIndex: 'rabu',
      },
      {
        title: 'Kam',
        dataIndex: 'kamis',
      },
      {
        title: 'Jum',
        dataIndex: 'jumat',
      },
      {
        title: 'Sab',
        dataIndex: 'sabtu',
      },
      {
        title: 'W1',
        dataIndex: 'w1',
      },
      {
        title: 'W2',
        dataIndex: 'w2',
      },
      {
        title: 'W3',
        dataIndex: 'w3',
      },
      {
        title: 'W4',
        dataIndex: 'w4',
      },
      {
        title: 'W5',
        dataIndex: 'w5',
      },
    ],
    body: {
      file: null,
    },
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
    const formData = new FormData()

    formData.append('_method', 'post')
    formData.append('mapping_toko_sales', data.body.file)

    const config = {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    }
    const result = await apiClient.post('/Visit/CekVisitPlan', formData, config)

    if (result.data.status == 'error') {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
      await commit('changeVisitPlan', {
        isLoading: false,
      })
    } else {
      notification.success({
        message: 'Success',
        description: result.data.message,
      })
      await commit('changeVisitPlan', {
        status: result.data.status,
        listData: result.data.data,
        isLoading: false,
      })
    }
  },

  async submitData({ commit, state }) {
    commit('changeVisitPlan', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      data: JSON.stringify(data.listData),
    }
    const result = await apiClient.post(`/Visit/UploadVisitPlan`, formData)

    if (result.data.status == 'error') {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
      await commit('changeVisitPlan', {
        isLoading: false,
      })
    } else {
      notification.success({
        message: 'Success',
        description: `Data berhasil ditambahkan`,
      })
      await commit('changeVisitPlan', {
        isLoading: false,
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
