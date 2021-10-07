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
    selectedTitle: '',
    selectedShorthand: '',
    id_level_hirarki: null,
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
      id: '',
      name: '',
      username: '',
      password: '',
      email: '',
      nohp: '',
      userid: '',
      idLevelHirarki: null,
    },
    bodyList: {
      jenis_user: '',
      offset: 1,
      limit: 20,
    },
    listUser: [],

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

    const result = await apiClient.get(`/usercrm/listJabatan`)
    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message[0],
      })
    } else {
      await commit('changeUserManagement', {
        id_level_hirarki: result.data.data[0].id_level_hirarki,
        selectedTitle: result.data.data[0].nama_panjang,
        selectedShorthand: result.data.data[0].nama_singkat,
        listUser: result.data.data,
        isLoading: false,
      })
    }
  },

  async getDataTable({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      idLevelHirarki: data.id_level_hirarki,
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }

    console.log(`-----body`, body)
    const result = await apiClient.post(`/usercrm`, body)

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message[0],
      })
    } else {
      await commit('changeUserManagement', {
        users: result.data.data,
        isLoading: false,
      })
    }
  },

  async postSubmitData({ commit, state }) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      nama: data.formState.name,
      username: data.formState.username,
      email: data.formState.email,
      password: data.formState.password,
      nohp: data.formState.nohp,
      idLevelHirarki: data.formState.idLevelHirarki,
    }

    let result = ''

    if (data.formState.id) {
      result = await apiClient.put(`/usercrm/add`, formData)
    } else {
      result = await apiClient.post(`/usercrm/add`, formData)
      notification.error({
        message: 'Success',
        description: `Data berhasil ditambahkan`,
      })
    }

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message[0],
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
