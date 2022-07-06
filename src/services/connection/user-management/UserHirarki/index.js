import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import Swal from 'sweetalert2'

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
    nodes: [],
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
    // perubahan
    columns: [
      {
        title: 'No',
        key: 'index',
        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },
      {
        title: 'Posisi Jabatan',
        key: 'nama',
        dataIndex: 'titleJabatan',
      },
      {
        title: 'Nama User',
        key: 'name',
        slots: { customRender: 'nama' },
      },
      {
        title: 'Tanggal Menjabat',
        key: 'start_date',
        slots: { customRender: 'start_date' },
      },
      {
        title: 'Tanggal Selesai Menjabat',
        key: 'end_date',
        slots: { customRender: 'end_date' },
      },
      {
        title: 'Status',
        dataIndex: 'statusJabat',
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],

    columns_tso: [
      {
        title: 'No',
        key: 'index',
        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },
      {
        title: 'Posisi Jabatan',
        key: 'nama',
        dataIndex: 'titleJabatan',
      },
      {
        title: 'Nama User',
        key: 'name',
        slots: { customRender: 'nama' },
      },
      // {
      //   title: 'Distrik',
      //   key: 'distrik',
      //   slots: { customRender: 'distrik' },
      // },
      {
        title: 'Tanggal Menjabat',
        key: 'start_date',
        slots: { customRender: 'start_date' },
      },
      {
        title: 'Tanggal Selesai Menjabat',
        key: 'end_date',
        slots: { customRender: 'end_date' },
      },
      {
        title: 'Status',
        dataIndex: 'statusJabat',
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    columns_history: [
      {
        title: 'Nama User',
        dataIndex: 'namaUser',
      },
      {
        title: 'Tanggal Mulai',
        key: 'startDate',
        dataIndex: 'startDate',
      },
      {
        title: 'Tanggal Selesai',
        key: 'endDate',
        dataIndex: 'endDate',
      },
    ],
    actiiveTabs: {},
    users: [],
    dataTable: [],
    dataTableTemp: [],
    selectedTabId: 1,
    totalAll: null,
    totalAllSales: null,
    formState: {
      id: '',
      name: '',
      username: '',
      password: '',
      email: '',
      nohp: '',
      userid: '',
      idLevelHirarki: null,
      nama_jabatan: '',
    },
    formGSM: {
      id_jabatan_atasan: null,
      id_level_hirarki: 0,
    },
    bodyList: {
      jenis_user: '',
      offset: 0,
      limit: 5000,
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
        width: 25,
        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },
      {
        title: 'Nama Jabatan',
        slots: { customRender: 'id_jabatan' },
      },
      {
        title: 'Nama User',
        slots: { customRender: 'nama_sales' },
      },
      {
        title: 'Tanggal Menjabat',
        key: 'start_date',
        slots: { customRender: 'start_date' },
      },
      {
        title: 'Tanggal Selesai Menjabat',
        key: 'end_date',
        slots: { customRender: 'end_date' },
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
        width: 50,
      },
    ],
    form_tambah_bawahan: {
      id_user: null,
      id_bawahan: null,
      tgl_mulai: '',
      tgl_akhir: '',
    },
    form_replace_bawahan: {
      id_jabatan: null,
      user_replace_id: null,
      tgl_mulai: '',
      tgl_akhir: '',
    },
    form_assign_bawahan: {
      id_jabatan: null,
      id_user: null,
      tgl_mulai: null,
      tgl_akhir: '',
    },
    form_kosongkan_jabatan: {
      tgl_akhir: null,
    },
    modalVisibleHirarkiDown: false,
    modalVisibleReplaceUser: false,
    modalVisibleAssignUser: false,
    sales_non_bawahan: Array,
    searchSales: '',
    salesBawahan: [],
    detail_jabatan: Object,
    list_hirarki_down: [],
    history: [],
    tree: [],
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
    try {
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
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  async getDataTable({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    // if (payload) {
    //   await commit('changeUserManagement', {
    //     offset: payload || data.offset,
    //   })
    // }
    const { data } = state
    let body = {
      idLevelHirarki: payload.id_level_hirarki,
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
      q: data.bodyList.filter,
    }

    try {
      const result = await apiClient.post(`/hirarki/users`, body)
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeUserManagement', {
          isLoading: false,
        })
      } else {
        await commit('changeUserManagement', {
          users: result.data.data,
          dataTable: result.data.data,
          dataTableTemp: result.data.data,
          isLoading: false,
          totalAll: result.data.totalAll,
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
      try {
        result = await apiClient.put(`/usercrm/update/${data.formState.id}`, formData)
        if (result.data.status == false) {
          notification.error({
            message: 'Error',
            description: result.data.message[0],
          })
          await commit('changeUserManagement', {
            isLoading: false,
          })
        } else {
          notification.success({
            message: 'Success',
            description: `Data berhasil diubah`,
          })
          await commit('changeUserManagement', {
            isLoading: false,
          })
        }
      } catch (err) {
        notification.error({
          message: 'Error',
          description: 'Maaf, terjadi kesalahan',
        })
      }
    } else {
      try {
        result = await apiClient.post(`/usercrm/add`, formData)
        if (result.data.status == false) {
          notification.error({
            message: 'Error',
            description: result.data.message[0],
          })
          await commit('changeUserManagement', {
            isLoading: false,
          })
        } else {
          notification.success({
            message: 'Success',
            description: `Data berhasil ditambahkan`,
          })
          await commit('changeUserManagement', {
            isLoading: false,
          })
        }
      } catch (err) {
        notification.error({
          message: 'Error',
          description: 'Maaf, terjadi kesalahan',
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
      nmJabatan: data.selectedShorthand + ' - ' + data.formState.nama_jabatan,
    }
    let result = ''
    try {
      result = await apiClient.post(`/hirarki/tambahJabatan`, formData)
      if (result.data.status == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeUserManagement', {
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
        await commit('changeUserManagement', {
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

  async postJabatanBawahan({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state
    const formData = {
      idJabatanAtasan: payload.id_jabatan_atasan,
      idLevelHirarki: payload.id_level_hirarki,
      nmJabatan: payload.nama_jabatan,
    }
    let result = ''
    try {
      result = await apiClient.post(`/hirarki/tambahJabatan`, formData)
      if (result.data.status == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeUserManagement', {
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
        await commit('changeUserManagement', {
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

  async editJabatanBawahan({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      idJabatan: payload.id_jabatan,
      nmJabatan: payload.nama_jabatan,
    }

    let result = ''
    try {
      result = await apiClient.post(`/hirarki/editJabatan`, formData)
      if (result.data.status == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeUserManagement', {
          isLoading: false,
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Data berhasil diubah!',
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeUserManagement', {
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

  async deleteDataRow({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state
    let endDate = new Date(data.form_kosongkan_jabatan.tgl_akhir).toLocaleDateString('en-GB')
    let formData = {
      idJabatan: payload.id_jabatan,
      tglAkhir: endDate
        .toString()
        .replace('/', '-')
        .replace('/', '-'),
    }
    try {
      const result = await apiClient.post(`/hirarki/removeUser`, formData)
      if (result.data.status == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeUserManagement', {
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
        await commit('changeUserManagement', {
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

  async resetDataRow({ commit }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    try {
      const result = await apiClient.get(`/usercrm/reset/${payload.uuid}`)
      if (result.data.status == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeUserManagement', {
          isLoading: false,
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Data password berhasil direset!',
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeUserManagement', {
          isLoading: false,
        })
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: 'Mohon maaf terdapat kesalahan.',
        showConfirmButton: true,
        timer: 2000,
      })
    }
  },

  // Profile
  async getDetailProfile({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state
    let formData = {
      idJabatan: parseInt(payload.id_jabatan),
    }
    try {
      const result = await apiClient.post(`/hirarki/detailJabatan`, formData)
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeUserManagement', {
          isLoading: false,
        })
      } else {
        await commit('changeUserManagement', {
          detail_jabatan: result.data.data,
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

  async getListDownHirarki({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state
    let formData = {
      idJabatan: payload.id_jabatan,
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }
    try {
      const result = await apiClient.post(`/hirarki/hirarkidown`, formData)
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeUserManagement', {
          isLoading: false,
        })
      } else {
        await commit('changeUserManagement', {
          list_hirarki_down: result.data.data,
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

  async deleteRowHirarkiDown({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state
    let endDate = new Date(data.form_kosongkan_jabatan.tgl_akhir).toLocaleDateString('en-GB')
    let formData = {
      idJabatan: payload.id_jabatan,
      tglAkhir: endDate
        .toString()
        .replace('/', '-')
        .replace('/', '-'),
    }
    try {
      const result = await apiClient.post(`/hirarki/removeUser`, formData)
      if (result.data.status == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeUserManagement', {
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
        await commit('changeUserManagement', {
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

  async getSalesNonBawahan({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state
    let formData = {
      offset: data.bodyList.offset,
      limit: 2000,
      idLevelJabatan: parseInt(payload.id_jabatan),
    }
    if (payload.search) {
      formData['q'] = payload.search
    }
    try {
      const result = await apiClient.post(`/hirarki/salesList`, formData)
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeUserManagement', {
          isLoading: false,
        })
      } else {
        await commit('changeUserManagement', {
          sales_non_bawahan: result.data.data,
          totalAllSales: result.data.totalAll,
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

  async searchSalesNonBawahan({ commit, state }, payload) {
    const { data } = state
    let formData = {
      limit: 5000,
      idLevelJabatan: parseInt(payload.id_jabatan),
    }
    if (payload.search) {
      formData['q'] = payload.search
    }
    try {
      const result = await apiClient.post(`/hirarki/salesList`, formData)
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
      } else {
        const dataObj = result.data.data.map(item => {
          item = item.namasales
          return item
        })
        await commit('changeUserManagement', {
          salesBawahan: dataObj || [],
        })
      }
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  async submitAddSalesHirarki({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state
    const formData = {
      IDuser: payload.id_user,
      IDbawahan: data.form_tambah_bawahan.id_bawahan,
      tglMulai: data.form_tambah_bawahan.tgl_mulai.addDays(0),
      tglAkhir: data.form_tambah_bawahan.tgl_akhir,
    }
    try {
      const result = await apiClient.post(`/hirarki/addHirarkiDown`, formData)
      if (result.data.state == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeUserManagementCRM', {
          isLoading: false,
          modalVisibleHirarkiDown: false,
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Data berhasil ditambahkan!',
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeUserManagementCRM', {
          isLoading: false,
          modalVisibleHirarkiDown: false,
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

  async submitReplaceSalesHirarki({ commit, state }) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state
    const formData = {
      idJabatan: data.form_replace_bawahan.id_jabatan,
      userReplacerID: data.form_replace_bawahan.user_replace_id,
      tglMulai: data.form_replace_bawahan.tgl_mulai.addDays(0),
      tglAkhir: data.form_replace_bawahan.tgl_akhir,
    }
    try {
      const result = await apiClient.post(`/hirarki/replaceUser`, formData)
      if (result.data.status == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeUserManagement', {
          isLoading: false,
          modalVisibleHirarkiDown: false,
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Data berhasil direplace!',
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeUserManagement', {
          isLoading: false,
          modalVisibleHirarkiDown: false,
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

  async submitAssignSalesHirarki({ commit, state }) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state
    const salesList = [...data.sales_non_bawahan]
    let filtered = salesList.filter(x => x.namasales == data.form_assign_bawahan.id_user)
    const idUser = filtered[0].iduser

    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date
    }

    const formData = {
      idJabatan: data.form_assign_bawahan.id_jabatan,
      idUser: idUser,
      tglMulai: data.form_assign_bawahan.tgl_mulai.addDays(0),
      // tglAkhir: data.form_assign_bawahan.tgl_akhir,
    }
    try {
      const result = await apiClient.post(`/hirarki/assignUser`, formData)
      if (result.data.status == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeUserManagement', {
          isLoading: false,
          modalVisibleAssignUser: false,
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Data berhasil di assign!',
          showConfirmButton: false,
          timer: 2000,
        })

        await commit('changeUserManagement', {
          isLoading: false,
          modalVisibleAssignUser: false,
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

  async getHistoryJabatan({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state
    let body = {
      idUser: payload.userid,
    }
    try {
      const result = await apiClient.post(`/hirarki/historyJabatan`, body)
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeUserManagement', {
          isLoading: false,
        })
      } else {
        await commit('changeUserManagement', {
          history: result.data.data,
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

  async logHistory({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state
    let body = {
      idJabatan: payload.idJabatan,
    }
    try {
      const result = await apiClient.post(`/hirarki/historyJabatanbyIdJabatan`, body)
      if (result.data.status == false) {
        await commit('changeUserManagement', {
          isLoading: false,
        })
      } else {
        await commit('changeUserManagement', {
          history: result.data.data,
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
  async viewTreeHierarchy({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state
    let body = {
      idJabatan: payload.idJabatan,
    }
    try {
      const result = await apiClient.post('/hirarki/viewTree', body)
      if (result.data.status == false) {
        await commit('changeUserManagement', {
          isLoading: false,
        })
      } else {
        await commit('changeUserManagement', {
          tree: result.data.data,
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
