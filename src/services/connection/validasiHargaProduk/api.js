import apiClient from '@/services/axios'
import store from 'store'


export async function insertProduk(data) {
  return apiClient
  .post('/produk', data)
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
  .put('/produk/' + id, data)
  .then(response => {
    if (response) {
      console.log(response)
      return true
    }
    return false
  })
}

