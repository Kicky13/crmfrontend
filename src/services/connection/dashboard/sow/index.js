// import apiClient from '@/services/axios/axios'
// import { notification } from 'ant-design-vue'
// import { _ } from 'vue-underscore'

// const state = {
//   data: {
//     itemsPerPage: [3, 5],

//     isLoading: false,
//     dataMetabase: null,

//     status: 'gagal',
//   },
// }

// const mutations = {
//   changeSOW(state, payload) {
//     state.data = Object.assign({}, state.data, payload)
//   },
// }

// const actions = {
//   async getMetabaseSOW({ commit, state }, payload) {
//     commit('changeSOW', {
//       isLoading: true,
//     })
//     const { data } = state

//     let params = {
//       dashboard: 218,
//     }

//     try {
//       const result = await apiClient.get(`/metabase/dashboard?dashboard=${params.dashboard}`)

//       if (result.data.status == false) {
//         notification.error({
//           message: 'Error',
//           description: result.data.message[0],
//         })
//         commit('changeSOW', {
//           isLoading: false,
//         })
//       } else {
//         await commit('changeSOW', {
//           dataMetabase: result.data.url,
//           isLoading: false,
//         })
//       }
//     } catch (error) {
//       notification.error({
//         message: 'Error',
//         description: 'Maaf, terjadi kesalahan',
//       })
//     }
//   },
// }

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions,
// }

import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
const state = {
  data: {
    dataList: null,
    dataSourceTable: [],
    columns: [
      {
        title: 'No',
        key: 'index',
        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },
      {
        title: 'Distrik',
        slots: { customRender: 'distrik' },
        key: 'distrik',
      },
      {
        title: 'ID Toko',
        slots: { customRender: 'id_toko' },
        key: 'id_toko',
      },
      {
        title: 'Nama Toko',
        slots: { customRender: 'nama_toko' },
        key: 'nama_toko',
      },
      {
        title: 'Produk(SKU)',
        slots: { customRender: 'produk' },
        key: 'produk',
      },
      {
        title: 'Kapasitas Jual',
        slots: { customRender: 'kapasitas_jual' },
        key: 'kapasitas_jual',
      },
      {
        title: 'Volume Jual',
        slots: { customRender: 'volume_jual' },
        key: 'volume_jual',
      },
      {
        title: 'SOW',
        slots: { customRender: 'sow' },
        key: 'sow',
      },
    ],
    // provinsiOption: [],
    // areaOption: [],
    // distrikOption: [],
    // distributorOption: [],
    // brandOption: [],
    // selectedProvinsi: null,
    // selectedArea: null,
    // selectedDistrik: null,
    pagination: {},
    isLoading: false,
    isLoadingLabel: false,
    isLoadingChart: false,
    bodyList: {
      offset: 0,
      limit: 2000,
      filter: '',
    },
    itemsPerPage: [3, 5],
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
    formData: {
      selectedProvinsi: null,
      selectedArea: null,
      selectedDistrik: null,
      selectedDistributor: null,
      selectedBrand: null,
      selectedMonth: null,
      selectedYear: null,
      id_provinsi: null,
      id_distrik: null,
      id_distributor: null,
      id_brand: null,
    },
    dataLabel: null,
    dataTable: [],
    dataTableSearch: [],
    chartDashboard: [],
    scatterChart: [],
    statusPie: '',
    statusScatter: '',
    itemsPerPage: [5, 10, 15, 20],
  },
}
const mutations = {
  changeSOW(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}
const actions = {
  // async getDataListDistrik({ commit, state }) {
  //   commit('changeSOW', {
  //     isLoading: true,
  //   })

  //   const { data } = state

  //   let body = {
  //     offset: data.bodyList.offset,
  //     limit: data.bodyList.limit,
  //     q: data.bodyList.filter,
  //   }

  //   try {
  //     const result = await apiClient.post('/RadiusWilayah/List', body)

  //     if (result.data.status == 'error') {
  //       notification.error({
  //         message: 'Error',
  //         description: result.data.message,
  //       })
  //       await commit('changeSOW', {
  //         isLoading: false,
  //       })
  //     } else {
  //       await commit('changeSOW', {
  //         listRadiusDistrik: result.data.data,
  //         isLoading: false,
  //       })
  //     }
  //   } catch (error) {
  //     notification.error({
  //       message: 'Error',
  //       description: 'Maaf, terjadi kesalahan',
  //     })
  //   }
  // },

  async getProvinsi({ commit, state }) {
    commit('changeSOW', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }
    try {
      const result = await apiClient.post('/filter/Provinsi', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSOW', {
          isLoading: false,
        })
      } else {
        await commit('changeSOW', {
          dataProvinsi: result.data.data,
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
  async getArea({ commit, state }, payload) {
    commit('changeSOW', {
      isLoading: true,
    })

    const { data } = state
    let body = {
      id_provinsi: payload.provinsi_id,
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }

    try {
      const result = await apiClient.post('/filter/Area', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSOW', {
          isLoading: false,
        })
      } else {
        await commit('changeSOW', {
          dataArea: result.data.data,
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
  async getDistrik({ commit, state }) {
    commit('changeSOW', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      id_area: data.formData.selectedArea,
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }
    try {
      const result = await apiClient.post('/filter/Distrik', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSOW', {
          isLoading: false,
        })
      } else {
        await commit('changeSOW', {
          dataDistrik: result.data.data,
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
  async getDistributor({ commit, state }, payload) {
    commit('changeSOW', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      id_distrik: payload.distrik_id,
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }
    try {
      const result = await apiClient.post('/filter/Distributor', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSOW', {
          isLoading: false,
        })
      } else {
        await commit('changeSOW', {
          dataDistributor: result.data.data,
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
  async getBrand({ commit, state }) {
    commit('changeSOW', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      id_kategori: 21,
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }
    try {
      const result = await apiClient.post('/filter/Brand', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSOW', {
          isLoading: false,
        })
      } else {
        await commit('changeSOW', {
          dataBrand: result.data.data,
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

  async submitLabel({ commit, state }, payload) {
    commit('changeSOW', {
      isLoadingLabel: true,
    })

    const { data } = state

    let formBody = {
      id_provinsi: payload.provinsi_id,
      id_area: data.formData.selectedArea,
      id_kota: payload.distrik_id,
      id_distributor: data.formData.selectedDistributor,
      id_brand: data.formData.selectedBrand,
      bulan: data.formData.selectedMonth,
      tahun: data.formData.selectedYear,
    }

    try {
      const result = await apiClient.post('/Dashboard/LabelDashboard', formBody)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSOW', {
          isLoadingLabel: false,
        })
      } else {
        await commit('changeSOW', {
          dataLabel: result.data,
          isLoadingLabel: false,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  async getDataTable({ commit, state }, payload) {
    commit('changeSOW', {
      isLoading: true,
    })

    const { data } = state

    let formBody = {
      id_provinsi: payload.provinsi_id,
      id_area: data.formData.selectedArea,
      id_kota: payload.distrik_id,
      id_distributor: data.formData.selectedDistributor,
      id_brand: data.formData.selectedBrand,
      bulan: data.formData.selectedMonth,
      tahun: data.formData.selectedYear,
    }

    try {
      const result = await apiClient.post('/Dashboard/TabelDashboard', formBody)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSOW', {
          isLoading: false,
        })
      } else {
        await commit('changeSOW', {
          dataTable: result.data.data,
          dataTableSearch: result.data.data,
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

  async getDataChart({ commit, state }, payload) {
    commit('changeSOW', {
      isLoadingChart: true,
    })

    const { data } = state

    let formBody = {
      id_provinsi: payload.provinsi_id,
      id_area: data.formData.selectedArea,
      id_kota: payload.distrik_id,
      id_distributor: data.formData.selectedDistributor,
      id_brand: data.formData.selectedBrand,
      bulan: data.formData.selectedMonth,
      tahun: data.formData.selectedYear,
    }

    try {
      const result = await apiClient.post('/Dashboard/ChartDashboard', formBody)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSOW', {
          isLoadingChart: false,
          statusPie: 'gagal',
        })
      } else {
        await commit('changeSOW', {
          chartDashboard: result.data.brands,
          isLoadingChart: false,
          statusPie: 'sukses',
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  async getDataScatterChart({ commit, state }, payload) {
    commit('changeSOW', {
      isLoadingChart: true,
    })

    const { data } = state

    let formBody = {
      id_provinsi: payload.provinsi_id,
      id_area: data.formData.selectedArea,
      id_kota: payload.distrik_id,
      id_distributor: data.formData.selectedDistributor,
      id_brand: data.formData.selectedBrand,
      bulan: data.formData.selectedMonth,
      tahun: data.formData.selectedYear,
    }

    try {
      const result = await apiClient.post('/Dashboard/ScatterDashboard', formBody)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSOW', {
          isLoadingChart: false,
          statusScatter: 'gagal',
        })
      } else {
        await commit('changeSOW', {
          scatterChart: result.data,
          statusScatter: 'sukses',
          isLoadingChart: false,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
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
