import apiClient from '@/services/axios'

export async function getListMahasiswa() {
  return apiClient
  .get('/mahasiswa')
  .then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}

export async function addMahasiswa(data) {
  return apiClient
  .post('/mahasiswa', data)
  .then(response => {
    if (response) {
      console.log(response)
      return true
    }
    return false
  })
}

export async function getMahasiswa(id) {
  return apiClient
  .get('/mahasiswa/' + id)
  .then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}

export async function updateMahasiswa(id, data) {
  return apiClient
  .put('/mahasiswa/' + id, data)
  .then(response => {
    if (response) {
      console.log(response)
      return true
    }
    return false
  })
}

export async function deleteMahasiswa(id) {
  return apiClient
  .delete('/mahasiswa/' + id)
  .then(response => {
    if (response) {
      console.log(response)
      return true
    }
    return false
  })
}