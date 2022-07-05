import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { moment } from 'moment'
import Swal from 'sweetalert2'

const state = {
  data: {
    columns: [
      {
        title: 'No',
        key: 'index',
        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },
      {
        title: 'Kode',
        key: 'kode',
        slots: { customRender: 'kode' },
      },
      {
        title: 'Nama Distributor',
        key: 'nama_distributor',
        slots: { customRender: 'nama_distributor' },
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    itemsPerPage: [5, 10, 15, 20],
    list_data_table: [],
    list_distributor: [],
    formData: {
      id_user: null,
      id_jabatan: null,
      id_distributor: null,
      offset: 0,
      limit: 500,
      q: '',
    },
    isLoading: false,
  },
}

const mutations = {
  changeProfileSalesDistributor(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getListSalesDistributor({ commit, state }, payload) {
    commit('changeProfileSalesDistributor', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      idUser: payload.id_user,
      idJabatan: payload.id_jabatan,
    }

    try {
      const result = await apiClient.post(`/hirarki/salesDistributor`, formData)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        await commit('changeProfileSalesDistributor', {
          isLoading: false,
        })
      } else {
        await commit('changeProfileSalesDistributor', {
          list_data_table: result.data.data,
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

  async getListAllSalesDistributor({ commit, state }, payload) {
    commit('changeProfileSalesDistributor', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      offset: data.formData.offset,
      limit: data.formData.limit,
      q: data.formData.q,
    }

    try {
      const result = await apiClient.post(`/distributor/all`, formData)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        await commit('changeProfileSalesDistributor', {
          isLoading: false,
        })
      } else {
        await commit('changeProfileSalesDistributor', {
          list_distributor: result.data.data,
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

  async submitAssignSalesDistributor({ commit, state }, payload) {
    commit('changeProfileSalesDistributor', {
      isLoading: true,
    })

    const { data } = state

    const salesList = data.list_distributor

    const searchComponent = data.formData.id_distributor.split(' - ')

    let filtered = salesList.filter(
      x => x.idDistributor == searchComponent[0] && x.namaDistributor == searchComponent[1],
    )
    const idDistributor = filtered[0].idDistributor

    let formData = {
      idUser: payload.id_user,
      idJabatan: parseInt(payload.id_jabatan),
      idDistributor: idDistributor,
    }

    try {
      const result = await apiClient.post(`/hirarki/assignSalesDist`, formData)

      if (result.data.status == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message[0],
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeProfileSalesDistributor', {
          isLoading: false,
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Data berhasil ditambahkan!',
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeProfileSalesDistributor', {
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

  async submitRemoveSalesDistributor({ commit, state }, payload) {
    commit('changeProfileSalesDistributor', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      idUser: payload.id_user,
      idJabatan: payload.id_jabatan,
      idDistributor: payload.id_distributor,
    }

    try {
      const result = await apiClient.post(`/hirarki/removeSalesDist`, formData)

      if (result.data.status == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message[0],
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeProfileSalesDistributor', {
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
        await commit('changeProfileSalesDistributor', {
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
