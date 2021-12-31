import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

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
      {
        title: 'Id Jabatan',
        key: 'idJabatan',
        dataIndex: 'idJabatan',
        width: 100,
      },
      {
        title: 'Nama Jabatan',
        key: 'namaJabatan',
        width: '10%',
        dataIndex: 'namaJabatan',
      },

      {
        title: 'Level Jabatan',
        key: 'levelJabatan',
        width: '10%',
        dataIndex: 'levelJabatan',
        slots: { customRender: 'levelJabatan' },
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
        width: '10%',
        dataIndex: 'roleUser',
        slots: { customRender: 'roleUser' },
      },

      {
        title: 'Nama User',
        key: 'namaUser',
        width: '10%',
        dataIndex: 'namaUser',
        slots: { customRender: 'namaUser' },
      },
      {
        title: 'Username',
        key: 'username',
        width: '10%',
        dataIndex: 'username',
        slots: { customRender: 'username' },
      },
      {
        title: 'Email',
        key: 'email',
        width: '20%',
        dataIndex: 'email',
        slots: { customRender: 'email' },
      },
      {
        title: 'No HP',
        key: 'nohp',
        width: '10%',
        dataIndex: 'nohp',
        slots: { customRender: 'nohp' },
      },
      

      {
        title: 'Tgl Mulai',
        key: 'tglMulai',
        width: '10%',
        dataIndex: 'tglMulai',
        slots: { customRender: 'tglMulai' },
      },
      {
        title: 'Tgl Selesai',
        key: 'tglSelesai',
        width: '10%',
        dataIndex: 'tglSelesai',
        slots: { customRender: 'tglSelesai' },
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
    
    const result = await apiClient.post('/hirarki/previewImportUserPosisi', formData, config)
    
    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
      await commit('changeimportExelHirarki', {
        isLoading: false,
      })
    } else {
      notification.success({
        message: 'Success',
        description: result.data.message,
      })
      await commit('changeimportExelHirarki', {
        status: result.data.status,
        listData: result.data.data,
        isLoading: false,
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
    console.log(formData)
    const result = await apiClient.post(`/hirarki/importUserPosisi`, formData)

    if (result.data.status == false) {
      notification.error({
        message: 'Error',
        description: result.data.message,
      })
      await commit('changeimportExelHirarki', {
        isLoading: false,
      })
    } else {
      notification.success({
        message: 'Success',
        description: `Data berhasil ditambahkan`,
      })
      await commit('changeimportExelHirarki', {
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
