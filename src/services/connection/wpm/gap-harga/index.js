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
        dataIndex: 'sg',
        key: 'sg',
      },
      {
        title: 'SP',
        dataIndex: 'sp',
        key: 'sp',
      },
      {
        title: 'SC',
        dataIndex: 'sc',
        key: 'sc',
      },
      {
        title: 'TL',
        dataIndex: 'tl',
        key: 'tl',
      },
      {
        title: 'SA',
        dataIndex: 'sa',
        key: 'sa',
      },
      {
        title: 'ST',
        dataIndex: 'st',
        key: 'st',
      },
    ],
    produk: [
      {
        id: 1,
        nama_produk: 'Semen Gresik',
      },
      {
        id: 2,
        nama_produk: 'Semen Tonasa',
      },
      {
        id: 3,
        nama_produk: 'Semen Dynamix',
      },
      {
        id: 4,
        nama_produk: 'Tiga Roda',
      },
    ],
    gapHargaList: [
      {
        gap_harga: 'TR',
        sg: '1000',
        sp: '5000',
        sc: '1000',
        tl: '1000',
        sa: '1000',
        st: '1000',
      },
      {
        gap_harga: 'MA',
        sg: '1000',
        sp: '1000',
        sc: '1000',
        tl: '1000',
        sa: '1000',
        st: '1000',
      },
      {
        gap_harga: 'SA',
        sg: '1000',
        sp: '1000',
        sc: '1000',
        tl: '1000',
        sa: '1000',
        st: '1000',
      },
      {
        gap_harga: 'SU',
        sg: '1000',
        sp: '1000',
        sc: '1000',
        tl: '1000',
        sa: '1000',
        st: '1000',
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
