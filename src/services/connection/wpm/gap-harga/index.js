import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'

const state = {
  data: {
    columns: [
      {
        title: 'GAP HARGA',
        dataIndex: 'gap_harga',
        key: 'gap_harga',
      },
      {
        title: 'SG',
        nama_produk: 'Semen Gresik',
        dataIndex: 'sg',
        key: 'sg',
      },
      {
        title: 'SP',
        nama_produk: 'Semen Padang',
        dataIndex: 'sp',
        key: 'sp',
      },
      {
        title: 'TL',
        nama_produk: 'Thang Long',
        dataIndex: 'tl',
        key: 'tl',
      },
      {
        title: 'SA',
        nama_produk: 'Semen Andalas',
        dataIndex: 'sa',
        key: 'sa',
      },
      {
        title: 'ST',
        nama_produk: 'Semen Tonasa',
        dataIndex: 'st',
        key: 'st',
      },
      {
        title: 'SD',
        nama_produk: 'Semen Dynamic',
        dataIndex: 'sd',
        key: 'sd',
      },
      {
        title: 'TR',
        nama_produk: 'Tiga Roda',
        dataIndex: 'tr',
        key: 'tr',
      },
    ],
    row: [
      {
        gap_harga: 'SG',
        sg: '0',
        sp: '5000',
        tl: '1000',
        sa: '1000',
        st: '1000',
        sd: '1000',
        tr: '1000',
      },
      {
        gap_harga: 'SP',
        sg: '1000',
        sp: '0',
        tl: '1000',
        sa: '1000',
        st: '1000',
        sd: '1000',
        tr: '1000',
      },
      {
        gap_harga: 'TL',
        sg: '1000',
        sp: '1000',
        tl: '0',
        sa: '1000',
        st: '1000',
        sd: '1000',
        tr: '1000',
      },
      {
        gap_harga: 'SA',
        sg: '1000',
        sp: '1000',
        tl: '1000',
        sa: '0',
        st: '1000',
        sd: '1000',
        tr: '1000',
      },
      {
        gap_harga: 'ST',
        sg: '5000',
        sp: '1000',
        tl: '1000',
        sa: '1000',
        st: '0',
        sd: '1000',
        tr: '1000',
      },
      {
        gap_harga: 'SD',
        sg: '1000',
        sp: '1000',
        tl: '1000',
        sa: '1000',
        st: '1000',
        sd: '0',
        tr: '1000',
      },
      {
        gap_harga: 'TR',
        sg: '1000',
        sp: '1000',
        tl: '1000',
        sa: '1000',
        st: '1000',
        sd: '1000',
        tr: '0',
      },
    ],
    isLoading: false,
  },
}

const mutations = {
  changeGAPHarga(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getAllTipe({ commit, state }, payload) {
    commit('changeGAPHarga', {
      isLoading: true,
    })

    const { data } = state

    try {
      // const result = await apiClient.post(``)

      if (result.data.status == false) {
        await commit('changeGAPHarga', {
          isLoading: false,
        })
        notification.error({
          message: 'Gagal',
          description: result.data.message,
        })
      } else {
        await commit('changeGAPHarga', {
          isLoading: false,
        })
      }
    } catch (err) {
      await commit('changeGAPHarga', {
        isLoading: false,
      })
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan!',
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
