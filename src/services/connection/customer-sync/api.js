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
export async function getDataList() {
    return apiClient
    .get('/mappingcustomer')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}

export async function deleteData(id) {
  return apiClient
  .delete('/mappingcustomer/' + id)
  .then(response => {
    if (response) {
      return true
    }
    return false
  })
}
