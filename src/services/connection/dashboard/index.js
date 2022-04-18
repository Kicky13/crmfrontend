import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
const state = {
    data: {
        dataList: null,
        dataSourceTable: [],
        columns: [
              {
                title: 'Distrik',
                dataIndex: 'distrik',
                key: 'distrik',
              },
              {
                title: 'ID Toko',
                dataIndex: 'ID Toko',
                key: 'ID Toko',
              },
              {
                title: 'Nama Toko',
                dataIndex: 'nama Toko',
                key: 'Nama Toko',
              },
              {
                title: 'Produk(SKU)',
                dataIndex: 'ID Toko',
                key: 'ID Toko',
              },
              {
                title: 'Kapasitas Jual',
                dataIndex: 'ID Toko',
                key: 'ID Toko',
              },
              {
                title: 'Volume Jual',
                dataIndex: 'ID Toko',
                key: 'ID Toko',
              },
              {
                title: 'SOW',
                dataIndex: 'ID Toko',
                key: 'ID Toko',
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
            bodyList: {
                offset: 0,
                limit: 2000,
                filter: '',
            },
            formData: {
              selectedProvinsi: null,
              selectedArea: null,
              selectedDistrik: null,
              selectedDistributor: null,
              selectedBrand:null,
            },
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
  async getArea({ commit, state }) {
    commit('changeSOW', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      id_provinsi:data.formData.selectedProvinsi,
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
      id_area:data.formData.selectedArea,
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
  async getDistributor({ commit, state }) {
    commit('changeSOW', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      id_distrik:data.formData.selectedDistrik,
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
      id_kategori:21,
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
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
  }