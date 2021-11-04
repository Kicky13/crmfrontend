import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    itemsPerPage: [5, 10, 15, 20],
    columns: [
      {
        title: 'No',
        key: 'index',
        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },
      {
        title: 'ID User',
        dataIndex: 'userid',
        key: 'userid',
      },
      {
        title: 'Nama',
        dataIndex: 'name',
      },
      {
        title: 'Username',
        dataIndex: 'username',
      },
      {
        title: 'Jabatan',
        dataIndex: 'jabatan',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'No. HP',
        dataIndex: 'nohp',
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    formState: {
      id: '',
      name: '',
      username: '',
      password: '',
      email: '',
      nohp: '',
      userid: '',
      id_level_hirarki: null,
    },
    formViewPassword: {
      loggedUserID: '',
      password: '',
      userID: '',
    },
    table: {
      offset: 1,
      limit: 20,
      q: '',
    },
    dataSourceTable: [],
    pagination: {},
    modalVisible: false,
    modalPreviewPassword: false,
    editUsername: '',
    editItem: {},
    newUsername: '',
    keyword: '',
    isLoading: false,
  },
}

const mutations = {
  changeUserManagementCRM(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getListUserCRM({ commit, state }) {
    commit('changeUserManagementCRM', {
      isLoading: true,
    })

    const { data } = state
    const params = {
      offset: data.table.offset,
      limit: data.table.limit,
      q: data.table.q,
    }
    const result = await apiClient.post(`/usercrm/all`, params)
    if (result.data.state == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
    } else {
      await commit('changeUserManagementCRM', {
        dataSourceTable: result.data.data,
        isLoading: false,
      })
    }
  },

  async postSubmitData({ commit, state }) {
    commit('changeUserManagementCRM', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      nama: data.formState.name,
      username: data.formState.username,
      email: data.formState.email,
      nohp: data.formState.nohp,
      userid: Math.floor(1000 + Math.random() * 9000),
      idLevelHirarki: data.formState.id_level_hirarki,
    }

    let result = ''
    if (data.formState.id) {
      result = await apiClient.put(`/usercrm/update/${data.formState.id}`, formData)

      notification.success({
        message: 'Success',
        description: `Data berhasil diubah`,
      })
      await commit('changeUserManagementCRM', {
        isLoading: false,
      })
    } else {
      result = await apiClient.post(`/usercrm/add`, formData)
      notification.success({
        message: 'Success',
        description: `Data berhasil ditambahkan`,
      })
      await commit('changeUserManagementCRM', {
        isLoading: false,
      })
    }

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message[0],
      })
    }
  },

  async deleteDataUser({ commit }, payload) {
    const result = await apiClient.delete(`/usercrm/delete/${payload.data_id}`)
    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
      commit('changeUserManagementCRM', {
        isLoading: false,
      })
      return false
    } else {
      notification.success({
        message: 'Success',
        description: `Data berhasil dihapus`,
      })
      commit('changeUserManagementCRM', {
        isLoading: false,
      })
      return true
    }
  },

  async getViewPassword({ commit, state }, payload) {
    commit('changeUserManagementCRM', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      loggedUserID: payload.logged_user_id,
      password: data.formViewPassword.password,
      userID: payload.user_id,
    }

    let result = await apiClient.post(`/usercrm/viewpassword`, formData)

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
      await commit('changeUserManagementCRM', {
        isLoading: false,
        modalPreviewPassword: false,
      })
    } else {
      notification.success({
        message: 'Success',
        description: result.data.message,
      })
      await commit('changeUserManagementCRM', {
        isLoading: false,
        modalPreviewPassword: false,
      })
    }
    await commit('changeUserManagementCRM', {
      isLoading: false,
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
