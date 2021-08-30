import apiClient from '@/services/axios'
import store from 'store'

export async function getPermissionList() {
    return apiClient
    .get('/otomatisasivisitplan')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}

export async function deletePermission(id) {
  return apiClient
  .delete('/otomatisasivisitplan/' + id)
  .then(response => {
    if (response) {
      return true
    }
    return false
  })
}