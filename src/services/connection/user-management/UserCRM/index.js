import apiClient from '@/services/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    itemsPerPage: [5, 10, 15, 20],
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
        dataIndex: 'id',
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
    dataSourceTable: [],
    pagination: {},
    modalVisible: false,
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

    const result = await apiClient.get(`/usercrm`)
    if (result.data.state == false) {
      notification.error({
        message: 'Error',
        description: result.data.message[0],
      })
    } else {
      await commit('changeUserManagementCRM', {
        dataSourceTable: result.data,
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
      name: data.formState.name,
      username: data.formState.username,
      email: data.formState.email,
      nohp: data.formState.nohp,
      userid: Math.floor(1000 + Math.random() * 9000),
      idLevelHirarki: data.formState.id_level_hirarki,
    }

    let result = ''

    if (data.formState.id) {
      result = await apiClient.put(`/usercrm/${data.formState.id}`, formData)
      notification.success({
        message: 'Success',
        description: `Data berhasil diubah`,
      })
    } else {
      result = await apiClient.post(`/usercrm`, formData)
      notification.success({
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

  async deleteDataUser(context, payload) {
    console.log(`----paylaod`, payload.data_id)
    const result = await apiClient.delete(`/usercrm/${payload.data_id}`)
    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
    } else {
      notification.success({
        message: 'Success',
        description: `Data berhasil dihapus`,
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
