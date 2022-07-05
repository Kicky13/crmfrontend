import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import Swal from 'sweetalert2'

const state = {
  data: {
    isLoading: false,
    listData: [],
    status: '',
    body: {
      file: null,
      filename: '',
    },
    columns_preview: [
      {
        title: '',
        width: 55,
        slots: { customRender: 'icon' },
        fixed: 'left',
      },
      // {
      //   title: 'No',
      //   key: 'index',
      //   width: '10%',

      //   render: (text, record, index) => index,
      //   slots: { customRender: 'no' },
      // },
      // {
      //   title: 'Username',
      //   key: 'username',
      //   dataIndex: 'username',
      // },
      // {
      //   title: 'Id Jabatan',
      //   key: 'idJabatan',
      //   dataIndex: 'idJabatan',
      //   width: 100,
      // },
      {
        title: 'Nama Jabatan',
        key: 'namaJabatan',
        // width: '20%',
        dataIndex: 'namaJabatan',
      },
      {
        title: 'Level Jabatan',
        key: 'levelJabatan',
        width: 150,
        dataIndex: 'levelJabatan',
        // slots: { customRender: 'levelJabatan' },
      },
      // {
      //   title: 'Jenis User',
      //   key: 'jenis_user',
      //   width: '10%',

      //   slots: { customRender: 'jenis_user' },
      // },
      {
        title: 'Nama Jenis User',
        key: 'roleUser',
        width: 150,
        dataIndex: 'roleUser',
        // slots: { customRender: 'roleUser' },
      },

      {
        title: 'Nama User',
        key: 'namaUser',
        // width: '10%',
        dataIndex: 'namaUser',
        // slots: { customRender: 'namaUser' },
      },
      {
        title: 'Username',
        key: 'username',
        // width: '20%',
        dataIndex: 'username',
        // slots: { customRender: 'username' },
      },
      {
        title: 'Username Atasan',
        key: 'atasan',
        // width: '20%',
        slots: { customRender: 'username_atasan' },
      },
      {
        title: 'Email',
        key: 'email',
        // width: '20%',
        dataIndex: 'email',
        // slots: { customRender: 'email' },
      },
      {
        title: 'No HP',
        key: 'nohp',
        // width: '10%',
        dataIndex: 'nohp',
        // slots: { customRender: 'nohp' },
      },
      {
        title: 'Tgl Mulai',
        key: 'tglMulai',
        // width: '10%',
        width: 100,
        dataIndex: 'tglMulai',
        // slots: { customRender: 'tglMulai' },
      },
      {
        title: 'Tgl Selesai',
        key: 'tglSelesai',
        width: 100,
        dataIndex: 'tglSelesai',
        // slots: { customRender: 'tglSelesai' },
      },
      {
        title: 'Pesan',
        key: 'message',
        width: '25%',
        dataIndex: 'message',
        // slots: { customRender: 'message' },
      },
    ],
  },
}

const mutations = {
  changeimportExelHirarki(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getDataFromExcel({ commit, state }) {
    commit('changeimportExelHirarki', {
      isLoading: true,
    })

    const { data } = state

    const formData = new FormData()

    formData.append('_method', 'post')
    formData.append('importedExcel', data.body.file)

    const config = {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    }

    try {
      const result = await apiClient.post('/hirarki/previewImportUserPosisi', formData, config)

      if (result.data.status == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeimportExelHirarki', {
          isLoading: false,
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Data berhasil diimport!',
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeimportExelHirarki', {
          status: result.data.status,
          listData: result.data.data,
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

  async submitData({ commit, state }) {
    commit('changeimportExelHirarki', {
      isLoading: true,
    })

    const { data } = state

    const formData = {
      uploadData: JSON.stringify(data.listData),
    }

    try {
      const result = await apiClient.post(`/hirarki/importUserPosisi`, formData)

      if (result.data.status == false) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
        await commit('changeimportExelHirarki', {
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
        await commit('changeimportExelHirarki', {
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
