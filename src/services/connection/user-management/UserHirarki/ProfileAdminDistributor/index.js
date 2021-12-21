import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { moment } from 'moment'

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
  changeProfileAdminDistributor(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getListAllSalesDistributor({ commit, state }, payload) {
    commit('changeProfileAdminDistributor', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      offset: data.formData.offset,
      limit: data.formData.limit,
      q: data.formData.q,
    }

    const result = await apiClient.post(`/distributor/all`, formData)

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message[0],
      })
      await commit('changeProfileAdminDistributor', {
        isLoading: false,
      })
    } else {
      await commit('changeProfileAdminDistributor', {
        list_distributor: result.data.data,
        isLoading: false,
      })
    }
  },

  async getListAdminDistributor({ commit, state }, payload) {
    commit('changeProfileAdminDistributor', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      idUser: payload.id_user,
      idJabatan: payload.id_jabatan,
    }

    const result = await apiClient.post(`/hirarki/userAdminDistributor`, formData)

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message[0],
      })
      await commit('changeProfileAdminDistributor', {
        isLoading: false,
      })
    } else {
      await commit('changeProfileAdminDistributor', {
        list_data_table: result.data.data,
        isLoading: false,
      })
    }
  },

  async submitAssignAdminDistributor({ commit, state }, payload) {
    commit('changeProfileAdminDistributor', {
      isLoading: true,
    })

    const { data } = state

    const salesList = data.list_distributor

    const searchComp = data.formData.id_distributor.split(' - ')

    let filtered = salesList.filter(
      x => x.idDistributor == searchComp[0] && x.namaDistributor == searchComp[1],
    )
    const idDistributor = filtered[0].idDistributor

    let formData = {
      idUser: payload.id_user,
      idJabatan: parseInt(payload.id_jabatan),
      idDistributor: idDistributor,
    }

    const result = await apiClient.post(`/hirarki/assignAdminDistributor`, formData)

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message[0],
      })
      await commit('changeProfileAdminDistributor', {
        isLoading: false,
      })
    } else {
      notification.success({
        message: 'Success',
        description: `Data berhasil ditambahkan`,
      })
      await commit('changeProfileAdminDistributor', {
        isLoading: false,
      })
    }
  },

  async submitRemoveAdminDistributor({ commit, state }, payload) {
    commit('changeProfileAdminDistributor', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      idUser: payload.id_user,
      idJabatan: payload.id_jabatan,
      idDistributor: payload.id_distributor,
    }

    const result = await apiClient.post(`/hirarki/removeAdminDistributor`, formData)

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message[0],
      })
      await commit('changeProfileAdminDistributor', {
        isLoading: false,
      })
    } else {
      notification.success({
        message: 'Success',
        description: `Data berhasil dihapus`,
      })
      await commit('changeProfileAdminDistributor', {
        isLoading: false,
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
