import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    columns: [
      {
        title: 'Distrik',
        slots: { customRender: 'distrik' },
        key: 'distrik',
      },
      {
        title: 'Tahun',
        slots: { customRender: 'tahun' },
        key: 'tahun',
      },
      {
        title: 'Bulan',
        slots: { customRender: 'bulan' },
        key: 'bulan',
      },
      {
        title: 'Week',
        slots: { customRender: 'week' },
        key: 'week',
      },
      {
        title: 'Status',
        slots: { customRender: 'status' },
        key: 'status',
      },
      {
        title: 'Produk',
        slots: { customRender: 'produk' },
        key: 'produk',
      },
      {
        title: 'Brand',
        slots: { customRender: 'brand' },
        key: 'brand',
      },
      {
        title: 'Type',
        slots: { customRender: 'type' },
        key: 'type',
      },
      {
        title: 'Kemasan',
        slots: { customRender: 'kemasan' },
        key: 'type',
      },
      {
        title: 'RBP Gross',
        slots: { customRender: 'rbp_gross' },
        key: 'rbp_gross',
      },
      {
        title: 'Promo',
        slots: { customRender: 'promo' },
        key: 'promo',
      },
      {
        title: 'RBP Net',
        slots: { customRender: 'rbp_net' },
        key: 'rbp_net',
      },
      {
        title: 'RSP',
        slots: { customRender: 'rsp' },
        key: 'rsp',
      },
      {
        title: 'Notes',
        slots: { customRender: 'notes' },
        key: 'notes',
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    data_bulan: [
      {
        id: 1,
        name: 'Januari',
      },
      {
        id: 2,
        name: 'Februari',
      },
      {
        id: 3,
        name: 'Maret',
      },
      {
        id: 4,
        name: 'April',
      },
      {
        id: 5,
        name: 'Mei',
      },
      {
        id: 6,
        name: 'Juni',
      },
      {
        id: 7,
        name: 'Juli',
      },
      {
        id: 8,
        name: 'Agustus',
      },
      {
        id: 9,
        name: 'September',
      },
      {
        id: 10,
        name: 'Oktober',
      },
      {
        id: 11,
        name: 'November',
      },
      {
        id: 12,
        name: 'Desember',
      },
    ],
    dataWeekly: [
      {
        id: 1,
        name: 'Week 1',
      },
      {
        id: 2,
        name: 'Week 2',
      },
      {
        id: 3,
        name: 'Week 3',
      },
      {
        id: 4,
        name: 'Week 4',
      },
    ],
    formData: {
      id_distrik: null,
      tahun: '',
      bulan: '',
      week: '',
      id_produk: null,
      rbp_gross: null,
      nama_produk: '',
      nama_distrik: '',
      promo: null,
      rbp_net: null,
      rsp: null,
      brand: '',
      type: '',
      kemasan: '',
      notes: '',
    },
    data_uuid: [],
    pagination: {},
    params: {
      offset: 0,
      limit: 2000,
      tahun: '',
      bulan: '',
      week: '',
    },
    dataTable: [],
    dataProduct: [],
    brandList: [],
    tipeList: [],
    kemasanList: [],
    dataDistrikRET: [],
    status: '',
    isLoading: false,
  },
}

const mutations = {
  changeWeeklyInput(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getDataTable({ commit, state }, payload) {
    commit('changeWeeklyInput', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      offset: data.params.offset,
      limit: data.params.limit,
      tahun: data.params.tahun,
      bulan: data.params.bulan,
      week: data.params.week,
      status: 0,
    }

    try {
      const result = await apiClient.post(`/WPM/getData`, formData)

      if (result.data.status == `false`) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeWeeklyInput', {
          isLoading: false,
        })
      } else {
        await commit('changeWeeklyInput', {
          dataTable: result.data.data || 0,
          isLoading: false,
        })
        notification.success({
          message: 'Success',
          description: result.data.message,
        })
      }
    } catch (error) {
      await commit('changeWeeklyInput', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async getMasterProduct({ commit, state }, payload) {
    commit('changeWeeklyInput', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/produk`)

      if (result.data.status == `false`) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeWeeklyInput', {
          isLoading: false,
        })
      } else {
        await commit('changeWeeklyInput', {
          dataProduct: result.data.data,
          isLoading: false,
        })
      }
    } catch (error) {
      await commit('changeWeeklyInput', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async getAllBrand({ commit, state }, payload) {
    commit('changeWeeklyInput', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/brand`)

      if (result.data.status == false) {
        await commit('changeWeeklyInput', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeWeeklyInput', {
          brandList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeWeeklyInput', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async getAllTipe({ commit, state }, payload) {
    commit('changeWeeklyInput', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/tipe`)

      if (result.data.status == false) {
        await commit('changeWeeklyInput', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeWeeklyInput', {
          tipeList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeWeeklyInput', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async getAllKemasan({ commit, state }, payload) {
    commit('changeWeeklyInput', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/kemasan`)

      if (result.data.status == false) {
        await commit('changeWeeklyInput', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeWeeklyInput', {
          kemasanList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async getAllPromo({ commit, state }, payload) {
    commit('changeWeeklyInput', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/kemasan`)

      if (result.data.status == false) {
        await commit('changeWeeklyInput', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeWeeklyInput', {
          kemasanList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async getDistrik({ commit, state }, payload) {
    commit('changeWeeklyInput', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      idTSO: payload.id_tso,
      offset: data.params.offset,
      limit: data.params.limit,
    }
    try {
      const result = await apiClient.post('/distrik/distrikByTso', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeWeeklyInput', {
          isLoading: false,
        })
      } else {
        await commit('changeWeeklyInput', {
          dataDistrikRET: result.data.data,
          isLoading: false,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  async deleteDataRow({ commit, state }, payload) {
    commit('changeWeeklyInput', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      uuid: payload.uuid,
    }
    try {
      const result = await apiClient.post(`/WPM/DeleteWPM`, formData)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeWeeklyInput', {
          isLoading: false,
        })
      } else {
        notification.success({
          message: 'Success',
          description: `Data berhasil dihapus`,
        })
        await commit('changeWeeklyInput', {
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

  async insertDataWeekly({ commit, state }, payload) {
    commit('changeWeeklyInput', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      id_distrik: data.formData.id_distrik,
      tahun: data.formData.tahun,
      bulan: data.formData.bulan,
      week: data.formData.week,
      id_produk: data.formData.id_produk,
      rbp_gross: data.formData.rbp_gross,
      promo: data.formData.promo,
      rbp_net: data.formData.rbp_net,
      rsp: data.formData.rsp,
      brand: data.formData.brand,
      type: data.formData.type,
      kemasan: data.formData.kemasan,
      notes: data.formData.notes,
    }

    try {
      const result = await apiClient.post(`/WPM/InsertWPM`, formData)

      if (result.data.state == 'false') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeWeeklyInput', {
          isLoading: false,
        })
      } else {
        await commit('changeWeeklyInput', {
          isLoading: false,
        })
        notification.success({
          message: 'Success',
          description: result.data.message,
        })
      }
    } catch (error) {
      await commit('changeWeeklyInput', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async updateDataWeekly({ commit, state }, payload) {
    commit('changeWeeklyInput', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      id_distrik: data.formData.id_distrik,
      tahun: data.formData.tahun,
      bulan: data.formData.bulan,
      week: data.formData.week,
      id_produk: data.formData.id_produk,
      rbp_gross: data.formData.rbp_gross,
      promo: data.formData.promo,
      rbp_net: data.formData.rbp_net,
      rsp: data.formData.rsp,
      notes: data.formData.notes,
      uuid: payload.uuid,
    }

    try {
      const result = await apiClient.post(`/WPM/UpdateWPM`, formData)

      if (result.data.state == 'false') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeWeeklyInput', {
          isLoading: false,
          status: 'gagal',
        })
      } else {
        await commit('changeWeeklyInput', {
          isLoading: false,
          status: 'sukses',
        })
        notification.success({
          message: 'Success',
          description: result.data.message,
        })
      }
    } catch (error) {
      await commit('changeWeeklyInput', {
        isLoading: false,
        status: 'gagal',
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async submitDataWeekly({ commit, state }, payload) {
    commit('changeWeeklyInput', {
      isLoading: true,
    })

    const { data } = state

    let dataTable = data.dataTable

    dataTable.forEach(element => {
      data.data_uuid.push(element.uuid)
    })
    let dataStatus = 1
    let formData = new FormData()
    formData.append('uuid', JSON.stringify(data.data_uuid))
    formData.append('status', dataStatus)

    try {
      const result = await apiClient.post(`/WPM/SubmitWPM`, formData)

      if (result.data.state == 'false') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeWeeklyInput', {
          isLoading: false,
        })
      } else {
        await commit('changeWeeklyInput', {
          isLoading: false,
        })
        notification.success({
          message: 'Success',
          description: result.data.message,
        })
      }
    } catch (error) {
      await commit('changeWeeklyInput', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async duplicateDataWeekly({ commit, state }, payload) {
    commit('changeWeeklyInput', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/WPM/DuplicateLastWeekWPM`)

      if (result.data.state == 'false') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeWeeklyInput', {
          isLoading: false,
        })
      } else {
        await commit('changeWeeklyInput', {
          isLoading: false,
        })
        notification.success({
          message: 'Success',
          description: result.data.message,
        })
      }
    } catch (error) {
      await commit('changeWeeklyInput', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
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
