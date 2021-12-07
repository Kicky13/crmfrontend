import apiClient from '@/services/axios/axios'
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

export async function getProvinsiList(regionId = '') {
  if (regionId != '') {
    return apiClient
      .get('/provinsi?regionId=' + regionId)
      .then(response => {
        if (response) {
          return response.data
        }
        return false
      })
  } else {
    return apiClient
      .get('/provinsi/' + regionId)
      .then(response => {
        if (response) {
          return response.data
        }
        return false
      })
  }

}
export async function getRegionList() {
  return apiClient
    .get('/region')
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
}
export async function getdistributorSBIList(provinsiId = '') {
  if (provinsiId != '') {
    return apiClient
      .get('/distributorSBI?provinsiId=' + provinsiId)
      .then(response => {
        if (response) {
          return response.data
        }
        return false
      })
  } else {
    return apiClient
    .get('/distributorSBI/' + provinsiId)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
  }

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
export async function getProdukList() {
  const params = {
    offset: 0,
    limit: 2000,
  }
  return apiClient
    .post('/validasiHarga/get',params)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
}
export async function getSelectProdukList() {
  return apiClient
    .get('/master/listSelectProduk')
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
    .post('/validasiHarga/edit/' + id)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
}
export async function deleteData(id) {
  return apiClient
    .get('/validasiHarga/delete/' + id)
    .then(response => {
      if (response) {
        return true
      }
      return false
    })
}
