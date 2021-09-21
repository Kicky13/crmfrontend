import apiClient from '@/services/axios'

export async function getDataTableList() {
  return apiClient.get(`/customer_mapping`).then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}
