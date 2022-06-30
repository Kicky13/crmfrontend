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
      region_name: '',
      province_name: '',
      distrik_name: '',
      id_region: '',
      id_provinsi: '',
      id_distrik: '',
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
      id_kategori_promo: 1,
      program: '',
      nilai_zak: null,
      mekanisme: '',
    },
    dataDistrikRET: [],
    regionList: [],
    provinceList: [],
    distrikList: [],
    brandList: [],
    promoList: [],
    dataTable: [],
    pagination: {},
    isLoading: false,
    status: '',
  },
}

const mutations = {
  changeWPMPromotion(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async refreshFilterData({ commit }) {
    await commit('changeWPMPromotion', {
      params: {
        region_name: '',
        province_name: '',
        distrik_name: '',
        id_region: '',
        id_provinsi: '',
        id_distrik: '',
        offset: 0,
        limit: 2000,
        tahun: '',
        bulan: '',
        id_distrik_ret: null,
      },
      dataDistrikRET: [],
      provinceList: [],
      distrikList: [],
      dataTable: [],
    })
  },
  async getRegion({ commit, state }) {
    commit('changeWPMPromotion', {
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
        await commit('changeWPMPromotion', {
          isLoading: false,
        })
      } else {
        await commit('changeWPMPromotion', {
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
    commit('changeWPMPromotion', {
      isLoading: true,
    })

    const { data } = state
    let region_id = []
    if (data.params.id_region != ``) {
      region_id.push(data.params.id_region)
    }
    const formData = {
      id_region: JSON.stringify(region_id),
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
        await commit('changeWPMPromotion', {
          isLoading: false,
        })
      } else {
        await commit('changeWPMPromotion', {
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
    commit('changeWPMPromotion', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_provinsi: data.params.id_provinsi,
    }

    try {
      const result = await apiClient.post(`/distrik/distrikRet`, formData)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeWPMPromotion', {
          isLoading: false,
        })
      } else {
        await commit('changeWPMPromotion', {
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
    commit('changeWPMPromotion', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      id_distrik_ret: data.params.id_distrik_ret,
    }

    try {
      const result = await apiClient.post(`/distrik/distrikByIdDistikRet`, formData)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeWPMPromotion', {
          isLoading: false,
        })
      } else {
        await commit('changeWPMPromotion', {
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
  async getDataTable({ commit, state }, payload) {
    commit('changeWPMPromotion', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      offset: data.params.offset,
      limit: data.params.limit,
      tahun: data.params.tahun,
      bulan: data.params.bulan,
      idDistrikRet: data.params.id_distrik_ret,
      idDistrik: data.params.id_distrik,
      idProvivinsi: data.params.id_provinsi,
      idRegion: data.params.id_region,
    }

    try {
      const result = await apiClient.post(`/WPM/getPromo`, formData)

      if (result.data.status === false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeWPMPromotion', {
          isLoading: false,
        })
      } else {
        if (result.data.data.length > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Success...',
            text: 'Data promo berhasil ditampilkan!',
            showConfirmButton: false,
            timer: 2000,
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Opps...',
            text: 'Tidak terdapat data promo yang tersedia!',
            showConfirmButton: false,
            timer: 2000,
          })
        }

        await commit('changeWPMPromotion', {
          dataTable: result.data.data || 0,
          isLoading: false,
        })
      }
    } catch (error) {
      await commit('changeWPMPromotion', {
        isLoading: false,
      })
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: 'Mohon maaf terdapat kesalahan.',
        showConfirmButton: true,
        timer: 2000,
      })
    }
  },
  async deleteDataRow({ commit, state }, payload) {
    commit('changeWPMPromotion', {
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
        await commit('changeWPMPromotion', {
          isLoading: false,
        })
      } else {
        notification.success({
          message: 'Success',
          description: `Data berhasil dihapus`,
        })
        await commit('changeWPMPromotion', {
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
    commit('changeWPMPromotion', {
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
      id_kategori_promo: data.formData.id_kategid_kategori_promoori_promo,
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
        await commit('changeWPMPromotion', {
          isLoading: false,
          status: 'gagal',
        })
      } else {
        await commit('changeWPMPromotion', {
          isLoading: false,
          status: 'sukses',
        })
        notification.success({
          message: 'Success',
          description: result.data.message,
        })
      }
    } catch (error) {
      await commit('changeWPMPromotion', {
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
    commit('changeWPMPromotion', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      uuid: payload.uuid,
      start_date: data.formData.start_date,
      end_date: data.formData.end_date,
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
        await commit('changeWPMPromotion', {
          isLoading: false,
          status: 'gagal',
        })
      } else {
        await commit('changeWPMPromotion', {
          isLoading: false,
          status: 'sukses',
        })
        notification.success({
          message: 'Success',
          description: result.data.message,
        })
      }
    } catch (error) {
      await commit('changeWPMPromotion', {
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
    commit('changeWPMPromotion', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/brand`)

      if (result.data.status == false) {
        await commit('changeWPMPromotion', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeWPMPromotion', {
          brandList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeWPMPromotion', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
      })
    }
  },

  async getAllKategoriPromo({ commit, state }, payload) {
    commit('changeWPMPromotion', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(`/wpm/master-data/kategoriPromo`)

      if (result.data.status == false) {
        await commit('changeWPMPromotion', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeWPMPromotion', {
          promoList: result.data.data,
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeWPMPromotion', {
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
