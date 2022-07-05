import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { moment } from 'moment'
import Swal from 'sweetalert2'

const state = {
  data: {
    columns: [
      {
        title: '',
        slots: { customRender: 'radio' },
        key: 'radio',
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
        title: 'Toko',
        slots: { customRender: 'toko' },
        key: 'toko',
      },
      {
        title: 'Sales',
        slots: { customRender: 'sales' },
        key: 'sales',
      },
      {
        title: 'Tanggal',
        slots: { customRender: 'tanggal' },
        key: 'tanggal',
      },
      {
        title: 'Check-In',
        slots: { customRender: 'check_in' },
        key: 'check_in',
      },
      {
        title: 'Check-Out',
        slots: { customRender: 'check_out' },
        key: 'check_out',
      },
      {
        title: 'Durasi Visit',
        slots: { customRender: 'durasi_visit' },
        key: 'durasi_visit',
        class: 'text-center',
      },
      {
        title: 'Jarak Check',
        slots: { customRender: 'jarak_check' },
        key: 'jarak_check',
        class: 'text-center',
      },
      {
        title: 'Perjalanan',
        slots: { customRender: 'perjalanan' },
        key: 'perjalanan',
        class: 'text-center',
      },
      {
        title: 'Plan/Unplan',
        slots: { customRender: 'plan' },
        key: 'plan',
        class: 'text-center',
      },
    ],
    columns2: [
      {
        title: '',
        slots: { customRender: 'radio' },
        key: 'radio',
      },
      {
        title: 'Kode Toko',
        slots: { customRender: 'kode_toko' },
        key: 'kode_toko',
      },
      {
        title: 'Nama Toko',
        slots: { customRender: 'toko' },
        key: 'toko',
      },
      {
        title: 'Keterangan',
        slots: { customRender: 'keterangan' },
        key: 'keterangan',
      },
    ],
    dataList: null,
    dataSourceTable: [],
    dataSalesman: [],
    dataDistrik: [],
    dataDistributor: [],
    detailVisit: [],
    detailMerchant: [],
    dataDistrikByDistributor: [],
    dataMap: [],
    pagination: {},
    paginationToko: {},
    isLoading: false,
    pagination2: {},
    isLoading2: false,
    bodyList: {
      offset: 0,
      limit: 2000,
      filter: '',
    },
    formData: {
      selectedDistrik: '',
      selectedDistributor: '',
      selectedSalesman: '',
      selectedDate: '',
      id_distrik: '',
      id_distributor: '',
      id_sales: '',
    },
    dataDistributorAdmDistributor: [],
    itemsPerPage: [5, 10, 15, 20],
  },
}
const mutations = {
  changeSalesRoute(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}
const actions = {
  async getDistrik({ commit, state }, payload) {
    commit('changeSalesRoute', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }

    let bodyTSODIST = {
      levelHirarki: payload.idLevelHirarki,
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }

    try {
      let result = ''
      payload.levelHirarki.toLowerCase() == `tso`
        ? (result = await apiClient.post('/filter/Distrik', bodyTSODIST))
        : payload.levelHirarki.toLowerCase() == `admin dis`
        ? (result = await apiClient.post('/filter/Distrik', bodyTSODIST))
        : payload.levelHirarki.toLowerCase() == `asm`
        ? (result = await apiClient.post('/filter/Distrik', bodyTSODIST))
        : (result = await apiClient.post('/filter/Distrik', body))

      // const result = await apiClient.post('/filter/Distrik', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSalesRoute', {
          isLoading: false,
        })
      } else {
        await commit('changeSalesRoute', {
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
    commit('changeSalesRoute', {
      isLoading: true,
    })

    const { data } = state

    // let distrik_id = []
    // distrik_id.push(data.formData.id_distrik)

    let body = {
      // id_distrik: JSON.stringify(distrik_id),
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
        await commit('changeSalesRoute', {
          isLoading: false,
        })
      } else {
        await commit('changeSalesRoute', {
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
  async getSalesman({ commit, state }, payload) {
    commit('changeSalesRoute', {
      isLoading: true,
    })

    const { data } = state

    try {
      const result = await apiClient.get(
        `/dashboard/getSalesman?idDistributor=${
          payload.id_distributor ? payload.id_distributor : ''
        }&idDistrik=${payload.id_distrik ? payload.id_distrik : ''}`,
      )

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSalesRoute', {
          isLoading: false,
        })
      } else {
        await commit('changeSalesRoute', {
          dataSalesman: result.data.data,
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
  async getDetailVisit({ commit, state }, payload) {
    commit('changeSalesRoute', {
      isLoading: true,
    })

    const { data } = state

    try {
      let dateMoment = new Date(data.formData.selectedDate).toLocaleDateString('en-GB')
      let dateFormat = dateMoment
        .toString()
        .replace('/', '-')
        .replace('/', '-')

      let result = ''
      if (data.formData.id_distrik) {
        result = await apiClient.get(
          `/salesRoute/detilVisitRouteMaps?idSales=${data.formData.id_sales}&idDistributor=${data
            .formData.id_distributor || data.dataDistributor[0].id_distributor}&idDistrik=${
            data.formData.id_distrik
          }&tanggal=${dateFormat}`,
        )
      } else {
        result = await apiClient.get(
          `/salesRoute/detilVisitRouteMaps?idSales=${data.formData.id_sales}&idDistributor=${data
            .formData.id_distributor ||
            data.dataDistributor[0].id_distributor}&tanggal=${dateFormat}`,
        )
      }
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSalesRoute', {
          isLoading: false,
        })
      } else {
        if (result.data.data.length > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Success...',
            text: '"Toko sudah dikunjungi" memiliki data yang ditampilkan!',
            showConfirmButton: false,
            timer: 4000,
          })

          await commit('changeSalesRoute', {
            detailVisit: result.data.data,
            isLoading: false,
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '"Toko sudah dikunjungi" tidak memiliki data yang ditampilkan!',
            showConfirmButton: false,
            timer: 4000,
          })

          await commit('changeSalesRoute', {
            detailVisit: result.data.data,
            isLoading: false,
          })
        }
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },
  async getMerchantSurvey({ commit, state }, payload) {
    commit('changeSalesRoute', {
      isLoading2: true,
    })

    const { data } = state

    try {
      let dateMoment = new Date(data.formData.selectedDate).toLocaleDateString('en-GB')
      let dateFormat = dateMoment
        .toString()
        .replace('/', '-')
        .replace('/', '-')

      let result = ''
      if (data.formData.id_distrik) {
        result = await apiClient.get(
          `/salesRoute/tokoBelumDikunjungi?idSales=${data.formData.id_sales}&idDistributor=${data
            .formData.id_distributor || data.dataDistributor[0].id_distributor}&idDistrik=${
            data.formData.id_distrik
          }&tanggal=${dateFormat}`,
        )
      } else {
        result = await apiClient.get(
          `/salesRoute/tokoBelumDikunjungi?idSales=${data.formData.id_sales}&idDistributor=${data
            .formData.id_distributor ||
            data.dataDistributor[0].id_distributor}&tanggal=${dateFormat}`,
        )
      }
      // const result = await apiClient.get(
      //   `/salesRoute/tokoBelumDikunjungi?idSales=${data.formData.id_sales}&idDistributor=${data
      //     .formData.id_distributor || data.dataDistributor[0].id_distributor}&idDistrik=${
      //     data.formData.id_distrik
      //   }&tanggal=${dateFormat}`,
      // )
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSalesRoute', {
          isLoading2: false,
        })
      } else {
        if (result.data.data.length > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Success...',
            text: '"Toko belum dikunjungi" memiliki data yang ditampilkan!',
            showConfirmButton: false,
            timer: 6000,
          })

          await commit('changeSalesRoute', {
            detailMerchant: result.data.data,
            isLoading2: false,
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '"Toko belum dikunjungi" tidak memiliki data yang ditampilkan!',
            showConfirmButton: false,
            timer: 6000,
          })

          await commit('changeSalesRoute', {
            detailMerchant: result.data.data,
            isLoading2: false,
          })
        }
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },
  async getMap({ commit, state }, payload) {
    commit('changeSalesRoute', {
      isLoading2: true,
    })

    const { data } = state

    try {
      let dateMoment = new Date(data.formData.selectedDate).toLocaleDateString('en-GB')
      let dateFormat = dateMoment
        .toString()
        .replace('/', '-')
        .replace('/', '-')

      let result = ''
      if (data.formData.id_distrik) {
        result = await apiClient.get(
          `/salesRoute/mapSalesRouting?idSales=${data.formData.id_sales}&idDistributor=${data
            .formData.id_distributor || data.dataDistributor[0].id_distributor}&idDistrik=${
            data.formData.id_distrik
          }&tanggal=${dateFormat}`,
        )
      } else {
        result = await apiClient.get(
          `/salesRoute/mapSalesRouting?idSales=${data.formData.id_sales}&idDistributor=${data
            .formData.id_distributor ||
            data.dataDistributor[0].id_distributor}&tanggal=${dateFormat}`,
        )
      }
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSalesRoute', {
          isLoading2: false,
        })
      } else {
        await commit('changeSalesRoute', {
          dataMap: result.data.data,
          isLoading2: false,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },
  async getFilterDistributor({ commit, state }, payload) {
    commit('changeSalesRoute', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      id_jabatan: payload.id_jabatan,
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
        await commit('changeSalesRoute', {
          isLoading: false,
        })
      } else {
        await commit('changeSalesRoute', {
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
  async getDistrikByDistributor({ commit, state }, payload) {
    commit('changeSalesRoute', {
      isLoading: true,
    })

    const { data } = state

    let payload_distributor = ''
    payload_distributor = payload.id_distributor
    let distributor_id = []

    if (payload_distributor != ``) {
      distributor_id.push(payload.id_distributor)
    }

    let body = {
      id_distributor: payload_distributor != '' ? JSON.stringify(distributor_id) : '',
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }

    try {
      const result = await apiClient.post('/filter/DistrikDistributor', body)

      // const result = await apiClient.post('/filter/Distrik', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSalesRoute', {
          isLoading: false,
        })
      } else {
        await commit('changeSalesRoute', {
          dataDistrikByDistributor: result.data.data,
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

  async getDistributorAdmDistributor({ commit, state }, payload) {
    commit('changeSalesRoute', {
      isLoading: true,
    })

    let body = {
      id_jabatan: payload.id_jabatan,
    }

    try {
      const result = await apiClient.post('/filter/DistributorAdmDistributor', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeSalesRoute', {
          isLoading: false,
        })
      } else {
        await commit('changeSalesRoute', {
          dataDistributorAdmDistributor: result.data.data,
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
