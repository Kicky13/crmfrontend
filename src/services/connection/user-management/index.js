import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    labelMenu: 'UserManagement',
    rules: {
      name: [{ required: true, message: 'Nama wajib diisi', type: 'string' }],
      username: [{ required: true, message: 'Username wajib diisi', type: 'string' }],
      password: [{ required: true, message: 'Password wajib diisi', type: 'string' }],
      email: [{ required: true, message: 'Email wajib diisi', type: 'email' }],
      nohp: [{ required: true, message: 'No HP wajib diisi', type: 'number' }],
    },
    itemsPerPage: [5, 10, 15, 20],
    menutabs: [
      {
        id: 1,
        role: 'General Sales Manager',
        shorthand: 'GSM',
      },
      {
        id: 2,
        role: 'Senior Sales Manager',
        shorthand: 'SSM',
      },
      {
        id: 3,
        role: 'Sales Manager',
        shorthand: 'SM',
      },
      {
        id: 4,
        role: 'Area Manager',
        shorthand: 'AM',
      },
      {
        id: 5,
        role: 'Sales Dist',
        shorthand: 'SD',
      },
      {
        id: 6,
        role: 'Distributor',
        shorthand: 'Dist',
      },
      {
        id: 7,
        role: 'SPC',
        shorthand: 'SPC',
      },
    ],
    columns: [
      {
        title: 'No',
        dataIndex: 'id',
      },
      {
        title: 'ID User',
        dataIndex: 'userid',
      },
      {
        title: 'Nama Sales',
        dataIndex: 'name',
      },
      {
        title: 'Username',
        dataIndex: 'username',
      },
      {
        title: 'Password',
        dataIndex: 'password',
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
        dataIndex: 'id',
        slots: { customRender: 'action' },
      },
    ],
    actiiveTabs: {},
    users: [],
    selectedTabId: 1,
    formState: {
      name: '',
      username: '',
      password: '',
      email: '',
      nohp: '',
      userid: '',
    },
    bodyList: {
      jenis_user: '',
      offset: 1,
      limit: 20,
    },
    listUser: [],
    selectedTitle: 'General Sales Manager',
    selectedShorthand: 'GSM',
    pagination: {},
    modalVisible: false,
    isLoading: false,
    isSubmit: false,
  },
}

const mutations = {
  changeUserManagement(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getListJenisUser({ commit, state }) {
    commit('changeUserManagement', {
      isLoading: true,
    })
    const { data } = state

    const result = await apiClient.get(`/usercrm/list-jenis`)
    if (result.message) {
      notification.error({
        message: 'Error',
        description: result.message[0],
      })
    }
    await commit('changeUserManagement', {
      listUser: result.data.data,
      isLoading: false,
    })
  },

  async getDataTable({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      jenisUser: payload.jenis_user,
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }

    const result = await apiClient.post(`/usercrm`, body)
    if (result.message) {
      notification.error({
        message: 'Error',
        description: result.message[0],
      })
    }
    await commit('changeUserManagement', {
      users: result.data.data,
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
