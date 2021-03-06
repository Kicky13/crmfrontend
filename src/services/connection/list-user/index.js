import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    labelMenu: 'listUsers',
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
    // perubahan
    columns: [
      {
        title: 'No',
        key: 'index',
        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },
      {
        title: 'Nama',
        dataIndex: 'nama',
      },
      {
        title: 'Username',
        key: 'username',
        dataIndex: 'username',
      },
      {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'No. Telp',
            key: 'nohp',
            dataIndex: 'nohp',
        },
        {
            title: 'Level',
            key: 'Role',
            dataIndex: 'Role',
        },
        {
            title: 'Posisi',
            key: 'titleJabatan',
            dataIndex: 'titleJabatan',
        },
        {
            title: 'Tanggal Mulai',
            key: 'startDate',
            dataIndex: 'startDate',
        },
        {
            title: 'Total Bawahan',
            key: 'totalBawahan',
            dataIndex: 'totalBawahan',
      },
      
      {
        title: 'Log History',
        slots: { customRender: 'action' },
      },
        ],
        columns_history: [
            {
              title: 'Posisi',
              dataIndex: 'titleJabatan',
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
          columns_desc: [
            {
              title: 'Nama',
              dataIndex: 'nama',
            },
            {
              title: 'Email',
              key: 'email',
              dataIndex: 'email',
            },
            {
                title: 'Level Posisi',
                key: 'idJabatan',
                dataIndex: 'idJabatan',
              },
              {
                title: 'No.Telp',
                key: 'nohp',
                dataIndex: 'nohp',
              },
          ],
    actiiveTabs: {},
    users: [],
    selectedTabId: 1,
    activeRadio: 3,
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
      limit: 2000,
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
        title: 'ID Jabatan',
        slots: { customRender: 'id_jabatan' },
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
      tgl_mulai: '',
      tgl_akhir: '',
    },
    form_kosongkan_jabatan: {
      tgl_akhir: '',
    },
    modalVisibleHirarkiDown: false,
    modalVisibleReplaceUser: false,
    modalVisibleAssignUser: false,
    sales_non_bawahan: Array,
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
      const result = await apiClient.post(`/usercrm/userByRole`, body)

      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeUserManagement', {
          isLoading: false,
        })
      } else {
        if (payload.activeRadio == 2) {
          let dataSource = [...result.data.data]
          let filtered = dataSource.filter(x => x.idJabatan !== null && x.idJabatan !== '')
          await commit('changeUserManagement', {
            users: filtered,
            isLoading: false,
          })
        } else if (payload.activeRadio == 1) {
          let dataSource = [...result.data.data]
          let filtered = dataSource.filter(x => x.idJabatan === null || x.idJabatan === '')
          await commit('changeUserManagement', {
            users: filtered,
            isLoading: false,
          })
        } else {
          await commit('changeUserManagement', {
            users: result.data.data,
            isLoading: false,
          })
        }
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

    // if (payload) {
    //   await commit('changeUserManagement', {
    //     offset: payload || data.offset,
    //   })
    // }

    const { data } = state

    let body = {
      idUser: payload.userid,
    }

    try {
      const result = await apiClient.post(`/hirarki/historyJabatanbyIdUser`, body)
  
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeUserManagement', {
          isLoading: false,
        })
      }
      else {
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
    }

    let result = ''

    try {
      result = await apiClient.post(`/hirarki/tambahJabatan`, formData)
  
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
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
  },

  async postJabatanBawahan({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      idJabatanAtasan: payload.id_jabatan_atasan,
      idLevelHirarki: payload.id_level_hirarki,
    }

    let result = ''

    try {
      result = await apiClient.post(`/hirarki/tambahJabatan`, formData)
  
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
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
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeUserManagement', {
          isLoading: false,
        })
      } else {
        notification.success({
          message: 'Success',
          description: `Data berhasil dihapus`,
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
  },

  async resetDataRow({ commit }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    try {
      const result = await apiClient.get(`/usercrm/reset/${payload.uuid}`)
  
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeUserManagement', {
          isLoading: false,
        })
      } else {
        notification.success({
          message: 'Success',
          description: `Data berhasil direset`,
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
      IDuser: payload.id_user,
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
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeUserManagement', {
          isLoading: false,
        })
      } else {
        notification.success({
          message: 'Success',
          description: `Data berhasil dihapus`,
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
  },

  async getSalesNonBawahan({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })
    const { data } = state

    let formData = {
      IDuser: parseInt(payload.id_user),
      offset: data.bodyList.offset,
      limit: 0,
      IDJabatan: parseInt(payload.id_jabatan),
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

  async submitAddSalesHirarki({ commit, state }, payload) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      IDuser: payload.id_user,
      IDbawahan: data.form_tambah_bawahan.id_bawahan,
      tglMulai: data.form_tambah_bawahan.tgl_mulai,
      tglAkhir: data.form_tambah_bawahan.tgl_akhir,
    }

    try {
      const result = await apiClient.post(`/hirarki/addHirarkiDown`, formData)
  
      if (result.data.state == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeUserManagementCRM', {
          isLoading: false,
          modalVisibleHirarkiDown: false,
        })
      } else {
        notification.success({
          message: 'Success',
          description: `Data berhasil ditambahkan`,
        })
        await commit('changeUserManagementCRM', {
          isLoading: false,
          modalVisibleHirarkiDown: false,
        })
      }
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
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
      tglMulai: data.form_replace_bawahan.tgl_mulai,
      tglAkhir: data.form_replace_bawahan.tgl_akhir,
    }

    try {
      const result = await apiClient.post(`/hirarki/replaceUser`, formData)
  
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeUserManagement', {
          isLoading: false,
          modalVisibleHirarkiDown: false,
        })
      } else {
        notification.success({
          message: 'Success',
          description: `Data berhasil direplace`,
        })
        await commit('changeUserManagement', {
          isLoading: false,
          modalVisibleHirarkiDown: false,
        })
      }
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },

  async submitAssignSalesHirarki({ commit, state }) {
    commit('changeUserManagement', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      idJabatan: data.form_assign_bawahan.id_jabatan,
      idUser: data.form_assign_bawahan.id_user,
      tglMulai: data.form_assign_bawahan.tgl_mulai,
      // tglAkhir: data.form_assign_bawahan.tgl_akhir,
    }

    try {
      const result = await apiClient.post(`/hirarki/assignUser`, formData)
  
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeUserManagement', {
          isLoading: false,
          modalVisibleAssignUser: false,
        })
      } else {
        notification.success({
          message: 'Success',
          description: `Data berhasil di assign `,
        })
        await commit('changeUserManagement', {
          isLoading: false,
          modalVisibleAssignUser: false,
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
