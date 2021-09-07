import apiClient from '@/services/axios'

export async function getDataTableList() {
  return apiClient.get(`/log_sync_customer`).then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}
