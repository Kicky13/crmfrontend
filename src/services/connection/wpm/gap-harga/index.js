import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    columns: [
      {
        title: 'GAP HARGA',
        dataIndex: 'gap_harga',
        key: 0,
      },
    ],
    row: [],
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
    ],
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
          title: item.key_brand,
          nama_produk: item.nm_brand,
          dataIndex: item.id_brand,
          key: item.id_brand,
        }
        state.data.columns.push(objColumns)
      })

      result.data.data.map(item => {
        let objRow = {
          gap_harga: item.key_brand,
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

    const formDataTest = {
      id_provinsi: 1,
      id_distrik_ret: 2,
      id_distrik: 1101,
      tahun: 2022,
      bulan: 3,
      week: 1,
      row: state.data.gapHarga.join(","),
      column: state.data.gapHarga.join(","),
    }

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