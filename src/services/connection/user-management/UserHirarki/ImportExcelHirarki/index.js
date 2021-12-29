import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    body: {
      file: null,
      filename: '',
    },
    columns_preview: [
      {
        title: 'No',
        key: 'index',
        width: '10%',

        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },

      {
        title: 'Nama Jabatan',
        key: 'nm_jabatan',
        width: '10%',
        slots: { customRender: 'nm_jabatan' },
      },

      {
        title: 'Level Jabatan',
        key: 'level_jabatan',
        width: '10%',

        slots: { customRender: 'level_jabatan' },
      },
      {
        title: 'Jenis User',
        key: 'jenis_user',
        width: '10%',

        slots: { customRender: 'jenis_user' },
      },
      {
        title: 'Nama Jenis User',
        key: 'nm_jenis_user',
        width: '10%',

        slots: { customRender: 'nm_jenis_user' },
      },

      {
        title: 'Nama User',
        key: 'nm_user',
        width: '10%',

        slots: { customRender: 'nm_user' },
      },
      {
        title: 'Username',
        key: 'username',
        width: '10%',

        slots: { customRender: 'username' },
      },
      {
        title: 'Email',
        key: 'email',
        width: '10%',

        slots: { customRender: 'email' },
      },
      {
        title: 'No HP',
        key: 'no_hp',
        width: '10%',

        slots: { customRender: 'no_hp' },
      },
      {
        title: 'No HP',
        key: 'no_hp',
        width: '10%',

        slots: { customRender: 'no_hp' },
      },

      {
        title: 'Tgl Mulai',
        key: 'tgl_mulai',
        width: '10%',

        slots: { customRender: 'tgl_mulai' },
      },
      {
        title: 'Tgl Seles',
        key: 'tgl_seles',
        width: '10%',

        slots: { customRender: 'tgl_seles' },
      },
    ],
    loading_preview: false,
  },
}

const mutations = {
  changeImportExcelHirarki(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
