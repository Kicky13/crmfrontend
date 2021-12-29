import apiClient from '@/services/axios/axios'
// import apiClientFake from '@/services/axios/index'

import { notification } from 'ant-design-vue'
import { moment } from 'moment'

const state = {
  data: {
    itemsPerPage: [5, 10, 15, 20],
    isLoading: false,
    columns_bawahan: [
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
    ],
    columns_tso: [
      {
        title: 'No',
        key: 'index',
        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },
      {
        title: 'Nama Toko',
        key: 'nama_toko',
        slots: { customRender: 'nama_toko' },
      },
      {
        title: 'No Telp',
        key: 'telp_toko',
        slots: { customRender: 'telp_toko' },
      },
      {
        title: 'Alamat',
        key: 'alamat_toko',
        slots: { customRender: 'alamat_toko' },
      },
    ],
    data_bawahan: [],
    pagination: {},
    data_sales_tso: [],
    limit: 500,
  },
}

const mutations = {
  changeProfileUser(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getListBawahanProfile({ commit, state }) {
    commit('changeProfileUser', {
      isLoading: true,
    })

    const result = await apiClientFake.get(`/profile_bawahan`)

    if (result.data.state == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
    } else {
      await commit('changeProfileUser', {
        data_bawahan: result.data.data,
        isLoading: false,
      })
    }
  },

  async getSalesTSO({ commit, state }, payload) {
    commit('changeProfileUser', {
      isLoading: true,
    })

    let params = {
      idJabatan: payload.idJabatan,
    }

    const result = await apiClient.post(`/hirarki/viewTokoSales`, params)

    if (result.data.state == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
    } else {
      await commit('changeProfileUser', {
        data_sales_tso: result.data.data,
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
