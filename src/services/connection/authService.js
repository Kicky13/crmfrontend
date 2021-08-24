import apiClient from '@/services/axios'
import store from 'store'

export async function login(email, password) {
  return apiClient
    .get('/users?email=' + email + '&password=' + password)
    .then(response => {
      if (response) {
        const data = response.data[0]
        const accessToken = data.id + "" + data.accessToken
        if (accessToken) {
          localStorage.setItem('userData', JSON.stringify(data));
          store.set('accessToken', accessToken)
          store.set('userID', data.id)
          console.log(localStorage.getItem('userData'))
        }
        return data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function register(email, password, name) {
  return apiClient
    .post('/auth/register', {
      email,
      password,
      name,
    })
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function currentAccount() {
  const userID = store.get('userID')

  if (userID) {
    return apiClient
    .get('/users/' + userID)
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
  }
  return false
}

export async function logout() {
  const userID = store.get('userID')

  return apiClient
    .get('/users/' + userID)
    .then(response => {
      console.log(response)
      localStorage.removeItem('userData')
      store.remove('accessToken')
      store.remove('userID')
      return true
    })
    .catch(err => console.log(err))
}
