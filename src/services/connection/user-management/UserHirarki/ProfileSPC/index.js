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
        title: 'ID Region',
        key: 'idRegion',
        slots: { customRender: 'id_region' },
      },
      {
        title: 'Nama Region',
        key: 'namaRegion',
        slots: { customRender: 'nama_region' },
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
      idSpc: payload.id_tso,
      offset: 0,
      limit: 1000,
      q: '',
    }

    try {
      const result = await apiClient.post(`/hirarki/allRegion`, formData)

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
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },
  async getListDistrikHirarki({ commit, state }, payload) {
    commit('changeProfileTSO', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      idSpc: payload.id_tso,
    }

    try {
      const result = await apiClient.post(`/hirarki/regionSpc`, formData)

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
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
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
        idSpc: payload.id_tso,
        idRegion: payload.id_distrik,
        tglAkhir: endDate
          .toString()
          .replace('/', '-')
          .replace('/', '-'),
      }

      try {
        const result = await apiClient.post(`/hirarki/removeRegionSpc`, formData)

        if (result.data.status == false) {
          Swal.fire({
            icon: 'error',
            title: 'Opps...',
            text: result.data.message,
            showConfirmButton: false,
            timer: 2000,
          })
          await commit('changeProfileTSO', {
            isLoading: false,
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success...',
            text: 'Data berhasil dihapus!',
            showConfirmButton: false,
            timer: 2000,
          })
          await commit('changeProfileTSO', {
            isLoading: false,
          })
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: 'Maaf, terjadi kesalahan!',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    } else {
      let formData = {
        idSpc: payload.id_tso,
        idRegion: payload.id_distrik,
        tglAkhir: DateNow.toString()
          .replace('/', '-')
          .replace('/', '-'),
      }

      try {
        const result = await apiClient.post(`/hirarki/removeRegionSpc`, formData)

        if (result.data.status == false) {
          Swal.fire({
            icon: 'error',
            title: 'Opps...',
            text: result.data.message,
            showConfirmButton: false,
            timer: 2000,
          })
          await commit('changeProfileTSO', {
            isLoading: false,
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success...',
            text: 'Data berhasil dihapus!',
            showConfirmButton: false,
            timer: 2000,
          })
          await commit('changeProfileTSO', {
            isLoading: false,
          })
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: 'Maaf, terjadi kesalahan!',
          showConfirmButton: false,
          timer: 2000,
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
      idSpc: payload.id_tso,
      idRegion: data.formData.id_distrik,
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

    try {
      const result = await apiClient.post(`/hirarki/addRegionSpc`, formData)

      if (result.data.status == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message[0],
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeProfileTSO', {
          isLoading: false,
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Data berhasil ditambahkan!',
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeProfileTSO', {
          isLoading: false,
        })
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: 'Maaf, terjadi kesalahan!',
        showConfirmButton: false,
        timer: 2000,
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
