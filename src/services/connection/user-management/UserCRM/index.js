import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import Swal from 'sweetalert2'

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
        title: 'Nama',
        dataIndex: 'name',
      },
      {
        title: 'Username',
        dataIndex: 'username',
      },
      {
        title: 'Jenis User',
        dataIndex: 'jenisUser',
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
      id_jenis_user: null,
      mobileAccess: null,
    },
    formViewPassword: {
      loggedUserID: '',
      password: '',
      userID: '',
    },
    table: {
      offset: 0,
      limit: 2000,
      q: '',
    },
    listUser: [],
    status: Boolean,
    messagePassword: '',
    dataSourceTable: [],
    pagination: {},
    modalVisible: false,
    modalPreviewPassword: false,
    editUsername: '',
    editItem: {},
    newUsername: '',
    keyword: '',
    isLoading: false,
    changePasswordModal: false,
  },
}

const mutations = {
  changeUserManagementCRM(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getListJenisUser({ commit, state }) {
    commit('changeUserManagementCRM', {
      isLoading: true,
    })

    const { data } = state
    const params = {
      offset: data.table.offset,
      limit: data.table.limit,
    }
    try {
      const result = await apiClient.post(`/user/listJenis`, params)
      if (result.data.state == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
      } else {
        await commit('changeUserManagementCRM', {
          listUser: result.data.data,
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
    try {
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
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
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
      idJenis: data.formState.id_jenis_user,
      mobileAccess: data.formState.id_jenis_user == 5 || data.formState.id_jenis_user == 8 ? 1 : 0,
    }

    let result = ''
    if (data.formState.id) {
      try {
        result = await apiClient.put(`/usercrm/update/${data.formState.id}`, formData)
        if (result.data.status == false) {
          Swal.fire({
            icon: 'error',
            title: 'Opps...',
            text: result.data.message,
            showConfirmButton: false,
            timer: 2000,
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success...',
            text: `Data user berhasil diubah!`,
            showConfirmButton: false,
            timer: 2000,
          })
        }
      } catch (err) {
        notification.error({
          message: 'Error',
          description: 'Maaf, terjadi kesalahan',
        })
      }
      await commit('changeUserManagementCRM', {
        isLoading: false,
      })
    } else {
      try {
        result = await apiClient.post(`/usercrm/add`, formData)
        if (result.data.status == false) {
          Swal.fire({
            icon: 'error',
            title: 'Opps...',
            text: result.data.message,
            showConfirmButton: false,
            timer: 2000,
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success...',
            text: `Data user berhasil ditambahkan!`,
            showConfirmButton: false,
            timer: 2000,
          })
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: 'Maaf, terjadi kesalahan',
          showConfirmButton: false,
          timer: 2000,
        })
      }
      await commit('changeUserManagementCRM', {
        isLoading: false,
      })
    }
  },

  async deleteDataUser({ commit }, payload) {
    try {
      const result = await apiClient.delete(`/usercrm/delete/${payload.data_id}`)
      if (result.data.status == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        commit('changeUserManagementCRM', {
          isLoading: false,
        })
        return false
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: `Data user berhasil dihapus!`,
          showConfirmButton: false,
          timer: 2000,
        })
        commit('changeUserManagementCRM', {
          isLoading: false,
        })
        return true
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: 'Maaf, terjadi kesalahan',
        showConfirmButton: false,
        timer: 2000,
      })
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
    try {
      let result = await apiClient.post(`/usercrm/viewpassword`, formData)
      if (result.data.status == false) {
        // notification.error({
        //   message: 'Error',
        //   description: result.data.message,
        // })
        await commit('changeUserManagementCRM', {
          isLoading: false,
          modalPreviewPassword: false,
          status: result.data.status,
          messagePassword: result.data.message,
        })
      } else {
        // notification.success({
        //   message: 'Success',
        //   description: result.data.message,
        // })
        await commit('changeUserManagementCRM', {
          isLoading: false,
          modalPreviewPassword: false,
          status: result.data.status,
          messagePassword: result.data.message,
        })
      }
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
    await commit('changeUserManagementCRM', {
      isLoading: false,
    })
  },

  async changePassword({ commit, state }, payload) {
    commit('changeUserManagementCRM', {
      isLoading: true,
      changePasswordModal: true,
    })

    const { data } = state
    const formData = {
      oldPassword: payload.oldPassword,
      newPassword: payload.newPassword,
      userID: payload.userID,
    }
    try {
      const result = await apiClient.post(`/usercrm/changepassword`, formData)
      if (result.data.status == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: `Password user berhasil diubah!`,
          showConfirmButton: false,
          timer: 2000,
        })
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: 'Maaf, terjadi kesalahan',
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
