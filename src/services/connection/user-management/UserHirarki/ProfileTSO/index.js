import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { moment } from 'moment'

const state = {
  data: {
    columns: [
      // {
      //   title: 'No',
      //   key: 'index',
      //   render: (text, record, index) => index,
      //   slots: { customRender: 'no' },
      // },
      {
        title: 'ID Distrik',
        key: 'id_distrik',
        slots: { customRender: 'id_distrik' },
      },
      {
        title: 'Nama Distrik',
        key: 'nama_distrik',
        slots: { customRender: 'nama_distrik' },
      },
      {
        title: 'Tanggal Mulai',
        key: 'tgl_mulai',
        slots: { customRender: 'tgl_mulai' },
      },
      {
        title: 'Tanggal Akhir',
        key: 'tgl_akhir',
        slots: { customRender: 'tgl_akhir' },
      },
      {
        title: 'Action',
        slots: { customRender: 'action' },
      },
    ],
    rules: {
      id_distrik: [
        {
          required: true,
          message: 'Pilih Distrik !',
          type: 'string',
          trigger: 'change',
        },
      ],
      tgl_mulai: [
        {
          required: true,
          message: 'Pilih Tanggal Mulai !',
          type: 'string',
          trigger: 'change',
        },
      ],
      tgl_akhir: [
        {
          message: 'Pilih Tanggal Akhir!',
          type: 'string',
          trigger: 'change',
        },
      ],
    },
    itemsPerPage: [5, 10, 15, 20],
    daftar_distrik: [],
    list_distrik_bawahan: [],
    formData: {
      id_distrik: null,
      tgl_mulai: '',
      tgl_akhir: '',
    },
    formDelete: {
      tgl_akhir: new Date(),
    },
    modal_columns: [
      {
        title: 'ID Toko',
        dataIndex: 'id_toko',
        key: 'id_toko',
      },
      {
        title: 'Nama Toko',
        dataIndex: 'nama_toko',
        key: 'nama_toko',
      },
      {
        title: 'ID Jabatan',
        // dataIndex: 'id_jabatan_sales',
        key: 'id_jabatan_sales',
        slots: { customRender: 'id_jabatan_sales' },
      },
      {
        title: 'Nama Jabatan Sales',
        // dataIndex: 'nama_jabatan_sales',
        key: 'nama_jabatan_sales',
        slots: { customRender: 'nama_jabatan_sales' },
      },
      {
        title: 'ID User',
        // dataIndex: 'id_user',
        key: 'id_user',
        slots: { customRender: 'id_user' },
      },
      {
        title: 'Nama User',
        // dataIndex: 'nama_user',
        key: 'nama_user',
        slots: { customRender: 'nama_user' },
      },
      {
        title: 'ID Distributor',
        // dataIndex: 'id_distributor',
        key: 'id_distributor',
        slots: { customRender: 'id_distributor' },
      },
      {
        title: 'Nama Distributor',
        // dataIndex: 'nama_distributor',
        key: 'nama_distributor',
        slots: { customRender: 'nama_distributor' },
      },
    ],
    detailDistrik: [],
    isLoading: false,
  },
}

const mutations = {
  changeProfileTSO(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getListDistrik({ commit, state }, payload) {
    commit('changeProfileTSO', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      idTso: payload.id_tso,
    }

    try {
      const result = await apiClient.post(`/distrik/all`, formData)
  
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        await commit('changeProfileTSO', {
          isLoading: false,
        })
      } else {
        await commit('changeProfileTSO', {
          daftar_distrik: result.data.data,
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
  async getListDistrikHirarki({ commit, state }, payload) {
    commit('changeProfileTSO', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      idTso: payload.id_tso,
    }

    try {
      const result = await apiClient.post(`/distrik/distrikBawahan`, formData)
  
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        await commit('changeProfileTSO', {
          isLoading: false,
        })
      } else {
        await commit('changeProfileTSO', {
          list_distrik_bawahan: result.data.data,
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
  async deleteListDistrikHirarki({ commit, state }, payload) {
    commit('changeProfileTSO', {
      isLoading: true,
    })

    const { data } = state

    let endDate = new Date(data.formDelete.tgl_akhir).toLocaleDateString('en-GB')

    let formData = {
      idTso: payload.id_tso,
      idDistrik: payload.id_distrik,
      tglAkhir: endDate
        .toString()
        .replace('/', '-')
        .replace('/', '-'),
    }

    try {
      const result = await apiClient.post(`/distrik/hapusDistrikTugas`, formData)
  
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeProfileTSO', {
          isLoading: false,
        })
      } else {
        notification.success({
          message: 'Success',
          description: `Data berhasil dihapus`,
        })
        await commit('changeProfileTSO', {
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
  async addDistrikHirarki({ commit, state }, payload) {
    commit('changeProfileTSO', {
      isLoading: true,
    })

    const { data } = state

    // let data_tgl_mulai = moment(data.formData.tgl_mulai).format('DD-MM-YYYY')
    // let data_tgl_akhir = moment(data.formData.tgl_akhir).format(`dd-mm-yyyy`)
    let startDate = new Date(data.formData.tgl_mulai).toLocaleDateString('en-GB')
    let endDate = new Date(data.formData.tgl_akhir).toLocaleDateString('en-GB')

    // console.log(`----data`, data_tgl_mulai)
    let formData = {
      idTso: payload.id_tso,
      idDistrik: data.formData.id_distrik,
      tglMulai: startDate
        .toString()
        .replace('/', '-')
        .replace('/', '-'),
      // tglAkhir: data.formData.tgl_akhir,
    }

    if (data.formData.tgl_akhir.length > 0 || data.formData.tgl_akhir != ``) {
      formData['tglAkhir'] = endDate
        .toString()
        .replace('/', '-')
        .replace('/', '-')
    }

    try {
      const result = await apiClient.post(`/distrik/tambahDistrikTugas`, formData)
  
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        await commit('changeProfileTSO', {
          isLoading: false,
        })
      } else {
        notification.success({
          message: 'Success',
          description: `Data berhasil ditambahkan`,
        })
        await commit('changeProfileTSO', {
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
  async getDetailDistrik({ commit, state }, payload) {
    commit('changeProfileTSO', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      id_distrik: payload,
    }

    try {
      const result = await apiClient.post(`/hirarki/detailCustomerDistrik`, formData)
  
      if (result.data.status == false) {
        notification.error({
          message: 'Error',
          description: result.data.message[0],
        })
        await commit('changeProfileTSO', {
          isLoading: false,
        })
      } else {
        await commit('changeProfileTSO', {
          detailDistrik: result.data.data,
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
