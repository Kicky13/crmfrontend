import apiClient from '@/services/axios'
import store from 'store'

export async function getDistributorList() {
    return apiClient
    .get('/distributor')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}
export async function getDistrikList() {
    return apiClient
    .get('/distrik')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}
export async function getTahunList() {
    return apiClient
    .get('/tahun')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}
export async function getBulanList() {
    return apiClient
    .get('/bulan')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}
export async function getDataSalesList() {
    return apiClient
    .get('/datasales')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}
export async function getSelectProdukList() {
    return apiClient
    .get('/ListSelectproduk')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}
export async function getNamaProdukList(id) {
    return apiClient
    .get('/ListSelectproduk/' + id)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
}
export async function showpost(id) {
    return apiClient
    .get('/produk/' + id)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
}
export async function deleteData(id) {
    return apiClient
    .delete('/produk/' + id)
    .then(response => {
      if (response) {
        return true
      }
      return false
    })
  }
