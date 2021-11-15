import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    columns: [
      {
        title: 'No',
        key: 'index',
        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },
      {
        title: 'ID Distrik',
        key: 'id_distrik',
        slots: { customRender: 'id_distrik' },
      },
      {
        title: 'Nama Distrik',
        key: 'nama_distrik',
        slots: { customRender: 'nama_distrik' },
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    rules: {
      id_distrik: [
        {
          required: true,
          message: 'Pilih Distrik !',
          type: 'string',
          trigger: 'change',
        },
      ],
      tgl_mulai: [
        {
          required: true,
          message: 'Pilih Tanggal Mulai !',
          type: 'string',
          trigger: 'change',
        },
      ],
      tgl_akhir: [
        {
          required: true,
          message: 'Pilih Tanggal Akhir!',
          type: 'string',
          trigger: 'change',
        },
      ],
    },
    itemsPerPage: [5, 10, 15, 20],
    daftar_distrik: [],
    list_distrik_bawahan: [],
    formData: {
      id_distrik: null,
      tgl_mulai: '',
      tgl_akhir: '',
    },
    isLoading: false,
  },
}

const mutations = {
  changeProfileTSO(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getListDistrik({ commit, state }, payload) {
    commit('changeProfileTSO', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      idTso: payload.id_tso,
    }
    const result = await apiClient.post(`/distrik/all`, formData)

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message[0],
      })
      await commit('changeProfileTSO', {
        isLoading: false,
      })
    } else {
      await commit('changeProfileTSO', {
        daftar_distrik: result.data.data,
        isLoading: false,
      })
    }
  },
  async getListDistrikHirarki({ commit, state }, payload) {
    commit('changeProfileTSO', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      idTso: payload.id_tso,
    }
    const result = await apiClient.post(`/distrik/distrikBawahan`, formData)

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message[0],
      })
      await commit('changeProfileTSO', {
        isLoading: false,
      })
    } else {
      await commit('changeProfileTSO', {
        list_distrik_bawahan: result.data.data,
        isLoading: false,
      })
    }
  },
  async deleteListDistrikHirarki({ commit }, payload) {
    commit('changeProfileTSO', {
      isLoading: true,
    })

    let formData = {
      idTso: payload.id_tso,
      idDistrik: payload.id_distrik,
    }
    const result = await apiClient.post(`/distrik/hapusDistrikTugas`, formData)

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
      await commit('changeProfileTSO', {
        isLoading: false,
      })
    } else {
      notification.success({
        message: 'Success',
        description: `Data berhasil dihapus`,
      })
      await commit('changeProfileTSO', {
        isLoading: false,
      })
    }
  },

  async addDistrikHirarki({ commit, state }, payload) {
    commit('changeProfileTSO', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      idTso: payload.id_tso,
      idDistrik: data.formData.id_distrik,
      // tglMulai: data.formData.tgl_mulai,
      // tglAkhir: data.formData.tgl_akhir,
    }
    const result = await apiClient.post(`/distrik/tambahDistrikTugas`, formData)

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message[0],
      })
      await commit('changeProfileTSO', {
        isLoading: false,
      })
    } else {
      notification.success({
        message: 'Success',
        description: `Data berhasil ditambahkan`,
      })
      await commit('changeProfileTSO', {
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
