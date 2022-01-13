import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import { getLockCustomer } from './api'

const state = {
  data: {
    isLoading: false,
    dataCustomer: [],
    dataDetailCustomer: Object,
    dataDetailHistory: Object,
    dataVisit: [],
    dataProduct: [],
    status: '',
    columnKoordLock: [
      {
        title: 'ID Customer',
        dataIndex: 'id_customer',
        width: 100,
        fixed: 'left',
      },
      {
        title: 'Nama Toko',
        dataIndex: 'nm_customer',
        width: 200,
        fixed: 'left',
      },
      {
        title: 'Alamat',
        dataIndex: 'alamat',
        ellipsis: true,
      },
      {
        title: 'Provinsi',
        dataIndex: 'provinsi',
      },
      {
        title: 'Kabupaten',
        dataIndex: 'kabupaten',
      },
      {
        title: 'Koordinat',
        dataIndex: 'kordinat',
      },
      {
        title: 'Status Lock',
        dataIndex: 'status_lock',
      },
      {
        title: 'Detail',
        dataIndex: 'id_customer',
        slots: { customRender: 'action' },
        width: 100,
        fixed: 'right',
      },
    ],
    columnHistoryVisit: [
      {
        title: 'No.',
        dataIndex: 'id_kunjungan',
      },
      {
        title: 'Rencana Kunjungan',
        dataIndex: 'tgl_rencana_kunjungan',
      },
      {
        title: 'Supervisor',
        dataIndex: 'nama_supervisor',
      },
      {
        title: 'Dikunjungi',
        dataIndex: 'checkin_date',
        slots: { customRender: 'dikunjungi' },
      },
      {
        title: 'Penugasan',
        dataIndex: 'jenis_penugasan',
      },
      {
        title: 'Detail',
        dataIndex: 'id_kunjungan',
        slots: { customRender: 'action' },
        width: 100,
        fixed: 'right',
      },
    ],
    columnProductSurvey: [
      {
        title: 'No.',
        align: 'center',
        slots: { customRender: 'no' },
      },
      {
        title: 'Nama',
        dataIndex: 'namaProduk',
      },
      {
        title: 'Harga',
        children: [
          {
            title: 'Jual',
            dataIndex: 'hargaJual',
            key: 'hargaJual',
          },
          {
            title: 'Beli',
            dataIndex: 'hargaBeli',
            key: 'hargaBeli',
          },
          {
            title: 'TOP/hari',
            dataIndex: 'top',
            align: 'center',
            key: 'top',
          },
        ],
      },
      {
        title: 'Stok/Zak',
        align: 'center',
        dataIndex: 'stokHariini',
      },
      {
        title: 'Volume/Zak',
        children: [
          {
            title: 'Penjualan',
            dataIndex: 'stokPenjualan',
            align: 'center',
            key: 'stokPenjualan',
          },
          {
            title: 'Pembelian',
            dataIndex: 'stokPembelian',
            align: 'center',
            key: 'stokPembelian',
          },
        ],
      },
      {
        title: 'Keluhan',
        align: 'center',
        dataIndex: 'idProduk',
        slots: { customRender: 'keluhan' },
      },
      {
        title: 'Promosi',
        align: 'center',
        dataIndex: 'idProduk',
        slots: { customRender: 'promosi' },
      },
    ],
    column_distributor: [
      {
        title: 'No',
        key: 'index',
        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },
      {
        title: 'ID Distributor',
        key: 'id_distributor',
        slots: { customRender: 'id_distributor' },
      },
      {
        title: 'Nama',
        key: 'nama',
        slots: { customRender: 'nama' },
      },
      {
        title: 'ID Sales',
        key: 'id_sales',
        slots: { customRender: 'id_sales' },
      },
      {
        title: 'Sales',
        key: 'sales',
        slots: { customRender: 'sales' },
      },
      {
        title: 'ID Jabatan',
        key: 'id_jabatan',
        slots: { customRender: 'id_jabatan' },
      },
      {
        title: 'Jabatan',
        key: 'hirarki',
        slots: { customRender: 'hirarki' },
      },
    ],
    column_sales: [
      {
        title: 'No',
        key: 'index',
        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },
      {
        title: 'Id sales',
        key: 'id_sales',
        slots: { customRender: 'id_sales' },
      },
      {
        title: 'Nama',
        key: 'nama',
        slots: { customRender: 'nama' },
      },
    ],
    body: {
      file: null,
    },
    bodyViewCustomer: {
      offset: 0,
      limit: 2000,
      q: '',
    },
    detail_customer: {},
    bodyViewHistory: {},
    lock_customer: [],
  },
}

const mutations = {
  changeKoordinat(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getDataCustomer({ commit, state }, payload) {
    commit('changeKoordinat', {
      isLoading: true,
    })

    const { data } = state

    let formData = {
      IDdistrik: payload.id_distrik,
      offset: data.bodyViewCustomer.offset,
      limit: data.bodyViewCustomer.limit,
      q: payload.search,
    }

    const response = await apiClient.post('Kordinat/Customerlist', formData)
    if (response.data.status) {
      await commit('changeKoordinat', {
        dataCustomer: response.data.data,
        isLoading: false,
      })
    } else {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
      await commit('changeKoordinat', {
        isLoading: false,
      })
    }
  },

  async getHistoryVisitToko({ commit, state }, payload) {
    commit('changeKoordinat', {
      isLoading: true,
    })

    let formData = {
      idToko: payload.idToko,
    }

    const response = await apiClient.post('Kordinat/Kunjungan', formData)
    if (response.data.status) {
      await commit('changeKoordinat', {
        dataVisit: response.data.data,
        isLoading: false,
      })
    } else {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
      await commit('changeKoordinat', {
        isLoading: false,
      })
    }
  },

  async getProductSurvey({ commit, state }, payload) {
    commit('changeKoordinat', {
      isLoading: true,
    })

    let formData = {
      idHistoryVisit: payload.idHistoryVisit,
    }

    const response = await apiClient.post('Kordinat/DetailSurvey', formData)
    if (response.data.status) {
      await commit('changeKoordinat', {
        dataProduct: response.data.data,
        isLoading: false,
      })
    } else {
      await commit('changeKoordinat', {
        isLoading: false,
      })
    }
  },

  async getLockCustomer({ commit, state }, payload) {
    commit('changeKoordinat', {
      isLoading: true,
    })

    let formData = {
      idToko: payload.id_toko,
    }

    const response = await apiClient.post('Kordinat/UpdateKordinatToko', formData)
    if (response.data.status) {
      await commit('changeKoordinat', {
        lock_customer: response.data.data,
        isLoading: false,
      })
      notification.success({
        message: 'Success',
        description: response.data.message,
      })
    } else {
      notification.error({
        message: 'Error',
        description: response.data.message,
      })
      await commit('changeKoordinat', {
        isLoading: false,
      })
    }
  },

  async getDataDetailCustomerList({ commit }, payload) {
    commit('changeKoordinat', {
      isLoading: true,
    })
    let formData = {
      idToko: payload.id_toko,
    }

    const response = await apiClient.post('Kordinat/DetailCustomerList', formData)

    if (response.data.status) {
      await commit('changeKoordinat', {
        dataDetailCustomer: response.data.data,
        isLoading: false,
      })
    } else {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
      await commit('changeKoordinat', {
        isLoading: false,
      })
    }
  },

  async getDataDetailHistory({ commit }, payload) {
    commit('changeKoordinat', {
      isLoading: true,
    })
    let formData = {
      idHistoryVisit: payload.id_history,
    }

    const response = await apiClient.post('Kordinat/DetailKunjungan', formData)

    if (response.data.status) {
      await commit('changeKoordinat', {
        dataDetailHistory: response.data.data,
        isLoading: false,
      })
    } else {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
      await commit('changeKoordinat', {
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
