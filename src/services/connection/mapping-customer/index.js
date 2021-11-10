import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    isLoading: false,
    listData: [],
    columns: [
      {
        title: 'Id Sales',
        dataIndex: 'sales',
        key: 'sales',
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        slots: { customRender: 'username' },
      },
      {
        title: 'Id Toko',
        dataIndex: 'id_toko',
        key: 'id_toko',
      },
      {
        title: 'Nama Toko',
        dataIndex: 'customer',
        key: 'customer',
        slots: { customRender: 'customer' },
      },
      {
        title: 'ID Distributor',
        dataIndex: 'kode_distributor',
        key: 'kode_distributor',
      },
      {
        title: 'Nama Distributor',
        dataIndex: 'distributor',
        key: 'distributor',
        slots: { customRender: 'distributor' },
      },
      {
        title: 'Laporan Cek Data',
        dataIndex: 'message',
        key: 'message',
      },
      {
        dataIndex: 'customer_cek',
        key: 'customer_cek',
        slots: { customRender: 'customer_cek' },
      },
      {
        dataIndex: 'distributor_cek',
        key: 'distibutor_cek',
        slots: { customRender: 'distributor_cek' },
      },
    ].filter(item => !item.hidden),
    body: {
      file: null,
    },
  },
}

const mutations = {
  changeCustomerMapping(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getDataFromExcel({ commit, state }) {
    commit('changeCustomerMapping', {
      isLoading: true,
    })

    const { data } = state
    const formData = new FormData()

    formData.append('_method', 'post')
    formData.append('toko_sales_distributor', data.body.file)

    const config = {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    }
    const result = await apiClient.post('/customer/Mapping', formData, config)

    if (result.data.status == 'error') {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
    } else {
      notification.success({
        message: 'Success',
        description: result.data.message,
      })
      await commit('changeCustomerMapping', {
        listData: result.data.data,
        isLoading: false,
      })
    }
  },

  async submitData({ commit, state }) {
    commit('changeCustomerMapping', {
      isLoading: true,
    })

    const { data } = state

    const dataArray = []
    const dataObject = {}

    data.listData.map(data => {
      dataObject.id_sales = data.sales
      dataObject.username = data.username
      dataObject.id_customer = data.id_toko
      dataObject.nama_customer = data.customer
      dataObject.id_distributor = data.kode_distributor
      dataObject.nama_distributor = data.distributor
      dataObject.status_cek = 'success'
      dataArray.push(dataObject)
    })

    const config = {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const formData = new FormData()
    formData.append('commitData', JSON.stringify(dataArray))
    const result = await apiClient.post(`/customer/uploadTokoSales`, formData, config)

    if (result.data.status == 'error') {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
    } else {
      notification.success({
        message: 'Success',
        description: `Data berhasil ditambahkan`,
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
