import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import Swal from 'sweetalert2'

const state = {
  data: {
    itemsPerPage: [5, 10, 15, 20],
    pagination: {},

    columns: [
      {
        title: 'Distrik',
        dataIndex: 'distrik',
        key: 'distrik',
      },
      {
        title: 'Produk',
        dataIndex: 'produk',
        key: 'produk',
      },
      {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Kemasan',
        dataIndex: 'kemasan',
        key: 'kemasan',
      },
      {
        title: 'Price Last Week',
        dataIndex: 'price_last_week',
        key: 'price_last_week',
      },
      {
        title: 'Current Price',
        dataIndex: 'current_price',
        key: 'current_price',
      },
    ],
    params: {
      offset: 0,
      limit: 2000,
      tahun: '',
      bulan: '',
      week: '',
      id_distrik_ret: null,
      nm_distrik: '',
      region_name: '',
      province_name: '',
      distrik_name: '',
      id_region: '',
      id_provinsi: '',
      id_distrik: '',
    },
    dataDistrikRET: [],
    regionList: [],
    provinceList: [],
    distrikList: [],
    priceMovementList: [],
    dataWeekParams: [],
    isLoading: false,
    dataBulan: [
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
  },
}

const mutations = {
  changePriceMovement(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async refreshFilterData({ commit }) {
    await commit('changePriceMovement', {
      params: {
        offset: 0,
        limit: 2000,
        tahun: '',
        bulan: '',
        week: '',
        id_distrik_ret: null,
        nm_distrik: '',
        region_name: '',
        province_name: '',
        distrik_name: '',
        id_region: '',
        id_provinsi: '',
        id_distrik: '',
      },
      priceMovementList: [],
    })
  },
  async getAllDistrik({ commit, state }, payload) {
    commit('changePriceMovement', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.post(`/wpm/master-data/distrikret/getAllDistrik`)

      if (result.data.status == false) {
        await commit('changePriceMovement', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changePriceMovement', {
          distrikList: result.data.data.all,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changePriceMovement', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },
  async getPriceMovementList({ commit, state }, payload) {
    commit('changePriceMovement', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      offset: data.params.offset,
      limit: data.params.limit,
      tahun: data.params.tahun,
      bulan: data.params.bulan,
      week: parseInt(data.params.week),
      distrikRet: data.params.id_distrik_ret,
      distrik: data.params.id_distrik,
      provinsi: data.params.id_provinsi,
      region: data.params.id_region,
    }

    try {
      const result = await apiClient.post(`/wpm/price-movemnt`, formData)

      if (result.data.status === false) {
        await commit('changePriceMovement', {
          isLoading: false,
        })
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 1000,
        })
      } else {
        if (result.data.data.length > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Success...',
            text: 'Data price movement berhasil ditampilkan!',
            showConfirmButton: false,
            timer: 1000,
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Opps...',
            text: 'Tidak terdapat data price movement yang tersedia!',
            showConfirmButton: false,
            timer: 1000,
          })
        }
        await commit('changePriceMovement', {
          priceMovementList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changePriceMovement', {
        isLoading: false,
      })
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: 'Mohon maaf terdapat kesalahan.',
        showConfirmButton: true,
        timer: 1000,
      })
    }
  },
  async getRegion({ commit, state }) {
    commit('changePriceMovement', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      //   id_area:data.formData.selectedArea,
      offset: data.params.offset,
      limit: data.params.limit,
    }
    try {
      const result = await apiClient.post('/filter/Region', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changePriceMovement', {
          isLoading: false,
        })
      } else {
        await commit('changePriceMovement', {
          regionList: result.data.data,
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
  async getProvinsi({ commit, state }) {
    commit('changePriceMovement', {
      isLoading: true,
    })

    const { data } = state
    let region_id = []
    if (data.params.id_region != ``) {
      region_id.push(data.params.id_region)
    }
    const formData = {
      id_region: region_id.length > 0 ? JSON.stringify(region_id) : null,
      offset: data.params.offset,
      limit: data.params.limit,
    }
    try {
      const result = await apiClient.post('/filter/Provinsi', formData)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changePriceMovement', {
          isLoading: false,
        })
      } else {
        await commit('changePriceMovement', {
          provinceList: result.data.data,
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
  async getDistrikRET({ commit, state }) {
    commit('changePriceMovement', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_region: data.params.id_region,
      id_provinsi: data.params.id_provinsi,
    }

    try {
      const result = await apiClient.post(`/filter/DistrikRet`, formData)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changePriceMovement', {
          isLoading: false,
        })
      } else {
        await commit('changePriceMovement', {
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
  async getDistrik({ commit, state }) {
    commit('changePriceMovement', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_provinsi: data.params.id_provinsi,
      id_region: data.params.id_region,
      id_distrik_ret: data.params.id_distrik_ret,
    }

    try {
      const result = await apiClient.post(`/filter/DistrikFromDistrikRet`, formData)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changePriceMovement', {
          isLoading: false,
        })
      } else {
        await commit('changePriceMovement', {
          distrikList: result.data.data,
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
  async getDataWeekParams({ commit, state }) {
    commit('changePriceMovement', {
      isLoading: true,
    })
    const { data } = state
    let formData = {
      tahun: data.params.tahun,
      bulan: data.params.bulan,
    }

    try {
      const result = await apiClient.post(`/WPM/getWeek`, formData)

      if (result.data.status == `false`) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changePriceMovement', {
          isLoading: false,
        })
      } else {
        await commit('changePriceMovement', {
          dataWeekParams: result.data.data || 0,
          isLoading: false,
        })
      }
    } catch (error) {
      await commit('changePriceMovement', {
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
