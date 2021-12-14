import serverClient from '@/services/axios/axios'

export async function logoutData() {
  return serverClient.post('/logout').then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}
