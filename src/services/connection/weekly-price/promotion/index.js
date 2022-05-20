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
        title: 'Tanggal Mulai',
        slots: { customRender: 'tanggal_mulai' },
        key: 'tanggal_mulai',
      },
      {
        title: 'Tanggal Selesai',
        slots: { customRender: 'tanggal_selesai' },
        key: 'tanggal_selesai',
      },
      {
        title: 'Brand',
        slots: { customRender: 'brand' },
        key: 'brand',
      },
      {
        title: 'Kategori',
        slots: { customRender: 'kategori' },
        key: 'kategori',
      },
      {
        title: 'Asal Program',
        slots: { customRender: 'asal_program' },
        key: 'asal_program',
      },
      {
        title: 'Nilai / ZAK',
        slots: { customRender: 'nilai' },
        key: 'nilai',
      },
      {
        title: 'Mekanisme',
        slots: { customRender: 'mekanisme' },
        key: 'mekanisme',
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    promotionList: [
      {
        distrik: 'Distrik 1',
        tanggal_mulai: '22-03-2022',
        tanggal_selesai: '23-03-2022',
        brand: 'Brand 1',
        kategori: 'Kategori 1',
        asal_program: 'SIG',
        nilai: '50',
        mekanisme: 'Mekanisne 1',
      },
    ],
    params: {
      offset: 0,
      limit: 2000,
      tahun: '',
      bulan: '',
      id_distrik_ret: null,
    },
    formData: {
      id_distrik_ret: null,
      start_date: '',
      end_date: '',
      id_brand: null,
      id_kategori_promo: null,
      program: '',
      nilai_zak: null,
      mekanisme: '',
    },
    dataDistrikRET: [],
    brandList: [],
    promoList: [],
    dataTable: [],
    pagination: {},
    isLoading: false,
    status: '',
  },
}

const mutations = {
  changePromotion(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getDistrikRET({ commit, state }) {
    commit('changePromotion', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      //   id_area:data.formData.selectedArea,
      offset: data.params.offset,
      limit: data.params.limit,
    }
    try {
      const result = await apiClient.get('/wpm/master-data/distrikret', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changePromotion', {
          isLoading: false,
        })
      } else {
        await commit('changePromotion', {
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

  async getDataTable({ commit, state }, payload) {
    commit('changePromotion', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      offset: data.params.offset,
      limit: data.params.limit,
      tahun: data.params.tahun,
      bulan: data.params.bulan,
      id_distrik_ret: data.params.id_distrik_ret,
    }

    try {
      const result = await apiClient.post(`/WPM/getPromo`, formData)

      if (result.data.status == `false`) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changePromotion', {
          isLoading: false,
        })
      } else {
        await commit('changePromotion', {
          dataTable: result.data.data || 0,
          isLoading: false,
        })
        notification.success({
          message: 'Success',
          description: result.data.message,
        })
      }
    } catch (error) {
      await commit('changePromotion', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async deleteDataRow({ commit, state }, payload) {
    commit('changePromotion', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      uuid: payload.uuid,
    }
    try {
      const result = await apiClient.post(`/WPM/DeletePromo`, formData)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changePromotion', {
          isLoading: false,
        })
      } else {
        notification.success({
          message: 'Success',
          description: `Data berhasil dihapus`,
        })
        await commit('changePromotion', {
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

  async insertDataPromo({ commit, state }, payload) {
    commit('changePromotion', {
      isLoading: true,
    })

    const { data } = state

    let StartDateFormat = new Date(data.formData.start_date).toISOString().slice(0, 10)
    let EndDateFormat = new Date(data.formData.end_date).toISOString().slice(0, 10)

    let formData = {
      id_distrik_ret: data.formData.id_distrik_ret,
      start_date: StartDateFormat,
      end_date: EndDateFormat,
      id_brand: data.formData.id_brand,
      id_kategori_promo: data.formData.id_kategori_promo,
      program: data.formData.program,
      nilai_zak: data.formData.nilai_zak,
      mekanisme: data.formData.mekanisme,
    }

    try {
      const result = await apiClient.post(`/WPM/InsertPromo`, formData)

      if (result.data.state == 'false') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changePromotion', {
          isLoading: false,
          status: 'gagal',
        })
      } else {
        await commit('changePromotion', {
          isLoading: false,
          status: 'sukses',
        })
        notification.success({
          message: 'Success',
          description: result.data.message,
        })
      }
    } catch (error) {
      await commit('changePromotion', {
        isLoading: false,
        status: 'gagal',
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async updateDataPromo({ commit, state }, payload) {
    commit('changePromotion', {
      isLoading: true,
    })

    const { data } = state
    let StartDateFormat = new Date(data.formData.start_date + 3600 * 1000 * 24)
      .toISOString()
      .slice(0, 10)
    let EndDateFormat = new Date(data.formData.end_date + 3600 * 1000 * 24)
      .toISOString()
      .slice(0, 10)
    let formData = {
      uuid: payload.uuid,
      start_date: StartDateFormat,
      end_date: EndDateFormat,
      nilai_zak: data.formData.nilai_zak,
      mekanisme: data.formData.mekanisme,
    }

    try {
      const result = await apiClient.post(`/WPM/UpdatePromo`, formData)

      if (result.data.state == 'false') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changePromotion', {
          isLoading: false,
          status: 'gagal',
        })
      } else {
        await commit('changePromotion', {
          isLoading: false,
          status: 'sukses',
        })
        notification.success({
          message: 'Success',
          description: result.data.message,
        })
      }
    } catch (error) {
      await commit('changePromotion', {
        isLoading: false,
        status: 'gagal',
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async getAllBrand({ commit, state }, payload) {
    commit('changePromotion', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/brand`)

      if (result.data.status == false) {
        await commit('changePromotion', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changePromotion', {
          brandList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changePromotion', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async getAllKategoriPromo({ commit, state }, payload) {
    commit('changePromotion', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/kategoriPromo`)

      if (result.data.status == false) {
        await commit('changePromotion', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changePromotion', {
          promoList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changePromotion', {
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
