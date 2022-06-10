import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { _ } from 'vue-underscore'

const state = {
  data: {
    columns: [
      {
        title: 'GAP HARGA',
        slots: { customRender: 'gap_harga' },
        key: 'gap_harga',
      },
    ],
    row: [
      {
        title: 'GAP HARGA',
        slots: { customRender: 'gap_harga' },
        key: 'gap_harga',
      },
    ],
    bulan: [
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
    week: [
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
      {
        id: 5,
        name: 'Week 5',
      },
      {
        id: 6,
        name: 'Week 6',
      },
    ],
    dataWeekParams: [],
    distrikRetList: [],
    distrikList: [],
    gapHarga: [],
    isLoading: false,
  },
}

const mutations = {
  changeGAPHarga(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getDataWeekParams({ commit, state }, payload) {
    commit('changeGAPHarga', {
      isLoading: true,
    })
    const { data } = state
    let formData = {
      tahun: payload.tahun,
      bulan: payload.bulan,
    }

    try {
      const result = await apiClient.post(`/WPM/getWeek`, formData)

      if (result.data.data != undefined) {
        await commit('changeGAPHarga', {
          dataWeekParams: result.data.data || 0,
          isLoading: false,
        })
      } else {
        notification.error({
          message: 'Opps',
          description: result.data.message,
        })
        await commit('changeGAPHarga', {
          isLoading: false,
        })
      }
    } catch (error) {
      await commit('changeGAPHarga', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getDistrikRET({ commit, state }, payload) {
    commit('changeGAPHarga', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_provinsi: payload.id_provinsi,
    }

    try {
      const result = await apiClient.post(`/distrik/distrikRet`, formData)

      if (result.data.status == false) {
        await commit('changeGAPHarga', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeGAPHarga', {
          distrikRetList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeGAPHarga', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getDistrik({ commit, state }, payload) {
    commit('changeGAPHarga', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_distrik_ret: payload.id_distrik_ret,
    }

    try {
      const result = await apiClient.post(`/distrik/distrikByIdDistikRet`, formData)

      if (result.data.status == false) {
        await commit('changeGAPHarga', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeGAPHarga', {
          distrikList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeGAPHarga', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getAllProduct({ commit, state }, payload) {
    commit('changeGAPHarga', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/gap-product`)

      result.data.data.map(item => {
        let objColumns = {
          title: item.nm_brand,
          nama_produk: item.nm_brand,
          dataIndex: item.id_brand,
          key: item.id_brand,
        }
        state.data.columns.push(objColumns)
      })

      result.data.data.map(item => {
        let objRow = {
          gap_harga: item.nm_brand,
          key_brand: item.id_brand,
        }
        state.data.row.push(objRow)
        state.data.gapHarga.push(objRow.key_brand)
      })

      if (result.data.status == false) {
        await commit('changeGAPHarga', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeGAPHarga', {
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeGAPHarga', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getGapHarga({ commit, state }, payload) {
    commit('changeGAPHarga', {
      isLoading: true,
    })

    const { data } = state

    // const formData = {
    //   id_provinsi: payload.id_provinsi,
    //   id_distrik_ret: payload.id_distrik_ret,
    //   id_distrik: payload.id_distrik,
    //   tahun: payload.tahun,
    //   bulan: payload.bulan,
    //   week: payload.week,
    //   row: state.data.gapHarga.join(","),
    //   column: state.data.gapHarga.join(","),
    // }

    
    let rows = []

    payload.row.forEach(element => {
      if (element != undefined) {
        rows.push(element.key_brand)
      }
    })

    let columns = []

    payload.column.forEach(element => {
      columns.push(element.key)
    })

    const formDataTest = {
      id_provinsi: payload.id_provinsi,
      id_distrik_ret: payload.id_distrik_ret,
      id_distrik: payload.id_distrik,
      tahun: payload.tahun,
      bulan: payload.bulan,
      week: payload.week,
      row: rows.toString(),
      column: columns.toString(),
    }
    //  row: '1,13,5,17,21,24,26,27',
    //       column: '1,13,5,17,21,24,26,27',
    try {
      const result = await apiClient.post(`/wpm/gap-harga`, formDataTest)

      if (result.data.status == false) {
        await commit('changeGAPHarga', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeGAPHarga', {
          row: result.data.data,
          isLoading: false,
        })
        notification.success({
          message: 'Sukses',
          description: 'Gap harga berhasil ditampilkan',
        })
      }
    } catch (err) {
      await commit('changeGAPHarga', {
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
