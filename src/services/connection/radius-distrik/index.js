import apiClient from '@/services/axios/axios'
import { notification } from 'ant-design-vue'
import Swal from 'sweetalert2'

const state = {
  data: {
    listRadiusDistrik: [],
    columns: [
      {
        title: 'No',
        key: 'index',
        render: (text, record, index) => index,
        slots: { customRender: 'no' },
      },
      {
        title: 'Level Wilayah',
        dataIndex: 'LevelWilayahName',
        key: 'LevelWilayahName',
      },
      {
        title: 'Nama Wilayah',
        dataIndex: 'distrik_name',
        key: 'distrik_name',
      },
      {
        title: 'Radius Lock (Meter)',
        dataIndex: 'radius_lock',
        key: 'radius_lock',
        slots: { customRender: 'radius' },
      },
      {
        title: 'Action',
        dataIndex: 'uuid',
        width: 150,
        slots: { customRender: 'action' },
      },
    ],
    dataDistrik: [],
    dataWilayah: [],
    isLoading: false,
    bodyList: {
      offset: 0,
      limit: 2000,
      filter: '',
    },
    itemsPerPage: [5, 10, 15, 20],
    pagination: {},
    rules: {
      wilayahid: [
        {
          required: true,
          message: 'Pilih Salah Satu Wilayah',
          type: 'number',
        },
      ],
      distrikid: [
        {
          required: true,
          message: 'Pilih Salah Satu Distrik',
          type: 'number',
        },
      ],
      radius: [
        {
          required: true,
          message: 'Masukkan Nilai Radius',
          type: 'number',
        },
      ],
    },
    formData: {
      id: null,
      rownum: null,
      distrikid: undefined,
      radius: 0,
    },
  },
}

const mutations = {
  changeRadiusDistrik(state, payload) {
    state.data = Object.assign({}, state.data, payload)
  },
}

const actions = {
  async getDataListDistrik({ commit, state }) {
    commit('changeRadiusDistrik', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
      q: data.bodyList.filter,
    }

    try {
      const result = await apiClient.post('/RadiusWilayah/List', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeRadiusDistrik', {
          isLoading: false,
        })
      } else {
        await commit('changeRadiusDistrik', {
          listRadiusDistrik: result.data.data,
          isLoading: false,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },
  async getDataWilayah({ commit, state }) {
    commit('changeRadiusDistrik', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      offset: data.bodyList.offset,
      limit: data.bodyList.limit,
    }
    try {
      const result = await apiClient.post('/RadiusWilayah/ListLevelWilayah', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
        await commit('changeRadiusDistrik', {
          isLoading: false,
        })
      } else {
        await commit('changeRadiusDistrik', {
          dataWilayah: result.data.data,
          isLoading: false,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },
  async getDataDistrik({ commit, state }) {
    commit('changeRadiusDistrik', {
      isLoading: true,
    })

    const { data } = state

    let body = {
      // offset: data.bodyList.offset,
      // limit: data.bodyList.limit,
      idLevelWilayah: data.formData.wilayahid,
    }

    try {
      const result = await apiClient.post('/RadiusWilayah/List_Distrik', body)

      if (result.data.status == 'error') {
        notification.error({
          message: 'Error',
          description: result.data.message,
        })
      } else {
        await commit('changeRadiusDistrik', {
          dataDistrik: result.data.data,
          isLoading: false,
        })
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Maaf, terjadi kesalahan',
      })
    }
  },
  async postDataRadiusDistrik({ commit, state }) {
    commit('changeRadiusDistrik', {
      isLoading: true,
    })

    const { data } = state

    let result = ''

    let body = {
      IDwilayah: data.formData.distrikid,
      idLevelWilayah: data.formData.wilayahid,
      radius_lock: data.formData.radius,
    }

    try {
      result = await apiClient.post('/RadiusWilayah/Insert_Radius', body)
      if (result.data.status == 'error') {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
      } else {
        await commit('changeRadiusDistrik', {
          dataDistrik: result.data.data,
          isLoading: false,
        })
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Data berhasil ditambahkan!',
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
  async updateDataRadiusDistrik({ commit, state }) {
    commit('changeRadiusDistrik', {
      isLoading: true,
    })

    const { data } = state

    let result = ''

    let body = {
      IDwilayah: data.formData.distrikid,
      idLevelWilayah: data.formData.wilayahid,
      radius_lock: data.formData.radius,
      uuid_radius_wilayah: data.formData.id,
    }

    if (body.radius_lock >= 100000) {
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: 'Radius lock tidak boleh lebih dari 100000!',
        showConfirmButton: false,
        timer: 2000,
      })
    } else {
      try {
        result = await apiClient.post('/RadiusWilayah/Update_Radius', body)
        if (result.data.status == 'error') {
          Swal.fire({
            icon: 'error',
            title: 'Opps...',
            text: result.data.message,
            showConfirmButton: false,
            timer: 2000,
          })
        } else {
          await commit('changeRadiusDistrik', {
            dataDistrik: result.data.data,
            isLoading: false,
          })
          Swal.fire({
            icon: 'success',
            title: 'Success...',
            text: 'Data berhasil diupdate!',
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
    }
  },
  async deleteDataRadiusDistrik({ commit, state }, payload) {
    commit('changeRadiusDistrik', {
      isLoading: true,
    })

    const { data } = state
    let body = {
      uuid: payload.id_distrik,
    }

    try {
      const result = await apiClient.post('/RadiusWilayah/Delete_Radius', body)

      if (result.data.status == 'error') {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
      } else {
        await commit('changeRadiusDistrik', {
          isLoading: false,
          listRadiusDistrik: result.data.data,
        })
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Data berhasil dihapus!',
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
