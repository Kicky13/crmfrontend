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
    formData: {
      id_distrik_ret: null,
      start_date: '',
      end_date: '',
      id_brand: null,
      id_kategori_promo: null,
      program: '',
      nilai_zak: null,
      mekanisme: '',
      edit_zak: null,
      nama_brand: '',
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
  changePromotion(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async refreshFilterData({ commit }) {
    await commit('changePromotion', {
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

      dataTable: [],
    })
  },
  // params

  async getRegion({ commit, state }) {
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
      const result = await apiClient.post('/filter/Region', body)

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
    commit('changePromotion', {
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
        await commit('changePromotion', {
          isLoading: false,
        })
      } else {
        await commit('changePromotion', {
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
    commit('changePromotion', {
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
  async getDistrik({ commit, state }) {
    commit('changePromotion', {
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
        await commit('changePromotion', {
          isLoading: false,
        })
      } else {
        await commit('changePromotion', {
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
    commit('changePromotion', {
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
          icon: 'warning',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changePromotion', {
          isLoading: false,
        })
      } else {
        if (result.data.data.length > 0) {
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Success...',
          //   text: 'Data promo berhasil ditampilkan!',
          //   showConfirmButton: false,
          //   timer: 2000,
          // })
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Opps...',
            text: 'Tidak terdapat data promo yang tersedia!',
            showConfirmButton: false,
            timer: 2000,
          })
        }

        await commit('changePromotion', {
          dataTable: result.data.data || 0,
          isLoading: false,
        })
      }
    } catch (error) {
      await commit('changePromotion', {
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
        Swal.fire({
          icon: 'warning',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changePromotion', {
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
        await commit('changePromotion', {
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
        Swal.fire({
          icon: 'warning',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
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

        if (result.data.message.indexOf('sudah') !== -1) {
          Swal.fire({
            icon: 'warning',
            title: 'Opps...',
            text: result.data.message,
            showConfirmButton: false,
            timer: 2000,
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success...',
            text: result.data.message,
            showConfirmButton: false,
            timer: 2000,
          })
        }
      }
    } catch (error) {
      await commit('changePromotion', {
        isLoading: false,
        status: 'gagal',
      })
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: 'Maaf, terjadi kesalahan!',
        showConfirmButton: false,
        timer: 2000,
      })
    }
  },

  async updateDataPromo({ commit, state }, payload) {
    commit('changePromotion', {
      isLoading: true,
    })

    const { data } = state

    if (data.formData.start_date.length == 10) {
      if (data.formData.edit_zak != data.formData.nilai_zak) {
        let StartDateFormat = new Date(data.formData.start_date)
        let EndDateFormat = new Date(data.formData.end_date)

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
            Swal.fire({
              icon: 'warning',
              title: 'Opps...',
              text: result.data.message,
              showConfirmButton: false,
              timer: 2000,
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
            Swal.fire({
              icon: 'success',
              title: 'Success...',
              text: 'Data berhasil diupdate!',
              showConfirmButton: false,
              timer: 2000,
            })
          }
        } catch (error) {
          await commit('changePromotion', {
            isLoading: false,
            status: 'gagal',
          })
          Swal.fire({
            icon: 'error',
            title: 'Opps...',
            text: 'Maaf, terjadi kesalahan!',
            showConfirmButton: false,
            timer: 2000,
          })
        }
      } else {
        let StartDateFormat = new Date(data.formData.start_date)
        let EndDateFormat = new Date(data.formData.end_date + 3600 * 1000 * 24)

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
            Swal.fire({
              icon: 'warning',
              title: 'Opps...',
              text: result.data.message,
              showConfirmButton: false,
              timer: 2000,
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

            Swal.fire({
              icon: 'success',
              title: 'Success...',
              text: result.data.message,
              showConfirmButton: false,
              timer: 2000,
            })
          }
        } catch (error) {
          await commit('changePromotion', {
            isLoading: false,
            status: 'gagal',
          })
          Swal.fire({
            icon: 'error',
            title: 'Opps...',
            text: 'Maaf, terjadi kesalahan!',
            showConfirmButton: false,
            timer: 2000,
          })
        }
      }
    } else if (data.formData.end_date.length == 10) {
      let StartDateFormat = new Date(data.formData.start_date + 3600 * 1000 * 24)
      let EndDateFormat = new Date(data.formData.end_date)
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
          Swal.fire({
            icon: 'warning',
            title: 'Opps...',
            text: result.data.message,
            showConfirmButton: false,
            timer: 2000,
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
          Swal.fire({
            icon: 'success',
            title: 'Success...',
            text: result.data.message,
            showConfirmButton: false,
            timer: 2000,
          })
        }
      } catch (error) {
        await commit('changePromotion', {
          isLoading: false,
          status: 'gagal',
        })
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: 'Maaf, terjadi kesalahan!',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    }
    // let StartDateFormat = new Date(data.formData.start_date + 3600 * 1000 * 24)
    // let EndDateFormat = new Date(data.formData.end_date + 3600 * 1000 * 24)
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
