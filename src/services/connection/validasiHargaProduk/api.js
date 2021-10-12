import apiClient from '@/services/axios/axios'
import store from 'store'


export async function insertProduk(data) {
  return apiClient
  .post('/validasiHarga/tambah', data)
  .then(response => {
      if (response) {
        console.log(response)
      return true
    }
    return false
  })
}

export async function updateProduk(id, data) {
  return apiClient
  .put('/validasiHarga/edit' + id, data)
  .then(response => {
    if (response) {
      console.log(response)
      return true
    }
    return false
  })
}

