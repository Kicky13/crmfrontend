import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import Swal from 'sweetalert2'

const state = {
  data: {
    isLoading: false,
    listData: [],
    columns: [
      {
        title: '',
        slots: { customRender: 'icon' },
        fixed: 'left',
      },
      {
        title: 'ID Kota',
        dataIndex: 'id_reference_wilayah',
        key: 'id_reference_wilayah',
      },
      {
        title: 'Nama Kota',
        dataIndex: 'nm_wilayah',
        key: 'nm_wilayah',
      },
      {
        title: 'ID Sales',
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
        title: 'ID Toko',
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
    try {
      const result = await apiClient.post('/customer/Mapping', formData, config)

      if (result.data.status == 'error') {
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
          text: 'Data berhasil ditampilkan!',
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeCustomerMapping', {
          listData: result.data.data,
          isLoading: false,
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: 'Maaf, terjadi kesalahan!',
        showConfirmButton: false,
        timer: 2000,
      })
    }
  },

  async submitData({ commit, state }) {
    commit('changeCustomerMapping', {
      isLoading: true,
    })

    const { data } = state

    let dataArray = []
    let dataIdRefenceWilayah = []

    data.listData.forEach(x => {
      let dataObject = {
        id_tso: x.id_tso,
        id_sales: x.sales,
        id_jabatan: x.id_jabatan,
        id_jabatan_distributor: x.id_jabatan_distributor,
        username: x.username,
        id_customer: x.id_toko,
        nama_customer: x.customer,
        id_distributor: x.kode_distributor,
        nama_distributor: x.distributor,
        start_date: x.start_date,
        end_date: x.end_date,
        id_reference_wilayah: x.id_reference_wilayah,
        status_cek: 'success',
      }
      dataArray.push(dataObject)
    })

    data.listData.forEach(item => {
      dataIdRefenceWilayah.push(item.id_reference_wilayah)
    })

    const config = {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const formData = new FormData()
    formData.append('commitData', JSON.stringify(dataArray))
    formData.append('id_reference_wilayah', JSON.stringify(dataIdRefenceWilayah))
    try {
      const result = await apiClient.post(`/customer/uploadTokoSales`, formData, config)

      if (result.data.status == 'error') {
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
          text: 'Data berhasil commit!',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: 'Maaf, terjadi kesalahan!',
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
