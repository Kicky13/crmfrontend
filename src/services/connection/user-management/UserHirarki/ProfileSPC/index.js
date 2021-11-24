import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { moment } from 'moment'

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
  async deleteListDistrikHirarki({ commit, state }, payload) {
    commit('changeProfileTSO', {
      isLoading: true,
    })

    const { data } = state
    
    let DateNow = new Date(Date.now()).toLocaleDateString('en-GB')

    let endDate = new Date(data.formData.tgl_akhir).toLocaleDateString('en-GB')


    if (endDate.length > 0) {
      let formData = {
        idTso: payload.id_tso,
        idDistrik: payload.id_distrik,
        tglAkhir: endDate
          .toString()
          .replace('/', '-')
          .replace('/', '-'),
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
    } else {
      let formData = {
        idTso: payload.id_tso,
        idDistrik: payload.id_distrik,
        tglAkhir: DateNow.toString()
          .replace('/', '-')
          .replace('/', '-'),
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
    }
  },
  async addDistrikHirarki({ commit, state }, payload) {
    commit('changeProfileTSO', {
      isLoading: true,
    })

    const { data } = state

    // let data_tgl_mulai = moment(data.formData.tgl_mulai).format('DD-MM-YYYY')
    // let data_tgl_akhir = moment(data.formData.tgl_akhir).format(`dd-mm-yyyy`)
    let startDate = new Date(data.formData.tgl_mulai).toLocaleDateString('en-GB')
    let endDate = new Date(data.formData.tgl_akhir).toLocaleDateString('en-GB')

    // console.log(`----data`, data_tgl_mulai)
    let formData = {
      idTso: payload.id_tso,
      idDistrik: data.formData.id_distrik,
      tglMulai: startDate
        .toString()
        .replace('/', '-')
        .replace('/', '-'),
      // tglAkhir: data.formData.tgl_akhir,
    }

    if (data.formData.tgl_akhir.length > 0 || data.formData.tgl_akhir != ``) {
      formData['tglAkhir'] = endDate
        .toString()
        .replace('/', '-')
        .replace('/', '-')
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
