import apiClient from '@/services/axios/axios'
import store from 'store'


export async function insertProduk(data) {
  return apiClient
  .post('/validasiHarga/tambah', data)
  .then(response => {
    return response.data
  })
}

export async function updateProduk(id, data) {
  return apiClient
  .post('/validasiHarga/edit/' + id, data)
  .then(response => {
    if (response.data) {
      return true
    }
    return false
  })
}

