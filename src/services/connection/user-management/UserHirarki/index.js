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
    actiiveTabs: null,
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
        key: 'index',
        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },
      {
        title: 'Kode Jabatan',
        dataIndex: 'userid',
      },
      {
        title: 'Nama',
        dataIndex: 'name',
      },
      {
        title: 'Tanggal Jabatan',
        dataIndex: 'username',
      },
      {
        title: 'Tanggal Akhir Jabatan',
        dataIndex: 'jabatan',
      },
      {
        title: 'ID User',
        dataIndex: 'email',
      },
      {
        title: 'Action',
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
    formGSM: {
      id_jabatan_atasan: null,
      id_level_hirarki: 0,
    },
    bodyList: {
      jenis_user: '',
      offset: 0,
      limit: 20,
      filter: '',
    },
    listUser: [],
    pagination: {},
    modalVisible: false,
    isLoading: false,
    isSubmit: false,

    // profile

    columns_hirarki: [
      {
        title: 'No',
        key: 'index',
        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },
      {
        title: 'ID User',
        slots: { customRender: 'id_user' },
      },
      {
        title: 'Nama Sales',
        slots: { customRender: 'nama_sales' },
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    detail_jabatan: Object,
    list_hirarki_down: [],
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

    const result = await apiClient.get(`/hirarki/levelHirarki`)
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
        actiiveTabs: result.data.data[0].id_level_hirarki,
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
      idLevelHirarki: payload.id_level_hirarki,
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
      q: data.bodyList.filter,
    }

    const result = await apiClient.post(`/hirarki/users`, body)

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
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
      // password: data.formState.password,
      nohp: data.formState.nohp,
      // idLevelHirarki: data.formState.idLevelHirarki,
    }

    let result = ''
    if (data.formState.id) {
      result = await apiClient.put(`/usercrm/update/${data.formState.id}`, formData)
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
      } else {
        notification.success({
          message: 'Success',
          description: `Data berhasil diubah`,
        })
      }
    } else {
      result = await apiClient.post(`/usercrm/add`, formData)
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
      } else {
        notification.success({
          message: 'Success',
          description: `Data berhasil ditambahkan`,
        })
      }
    }

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message[0],
      })
    }
  },

  async postJabatanGSM({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      idJabatanAtasan: null,
      idLevelHirarki: payload.id_level_hirarki,
    }

    let result = ''

    result = await apiClient.post(`/hirarki/tambahJabatan`, formData)

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
    } else {
      notification.success({
        message: 'Success',
        description: `Data berhasil diubah`,
      })
    }
  },

  async deleteDataRow(context, payload) {
    const result = await apiClient.delete(`/usercrm/delete/${payload.uuid}`)

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

  async resetDataRow(context, payload) {
    const result = await apiClient.get(`/usercrm/reset/${payload.uuid}`)

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
    } else {
      notification.success({
        message: 'Success',
        description: `Data berhasil direset`,
      })
    }
  },

  async getDetailProfile({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })
    const { data } = state

    let formData = {
      idJabatan: parseInt(payload.id_jabatan),
    }
    const result = await apiClient.post(`/hirarki/detailJabatan`, formData)

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
    } else {
      await commit('changeUserManagement', {
        detail_jabatan: result.data.data,
        isLoading: false,
      })
    }
  },

  async getListDownHirarki({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      IDuser: payload.id_user,
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }

    const result = await apiClient.post(`/hirarki/hirarkidown`, formData)
    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
    } else {
      await commit('changeUserManagement', {
        list_hirarki_down: result.data.data,
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