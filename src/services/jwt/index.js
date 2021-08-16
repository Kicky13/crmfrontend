import apiClient from '@/services/axios'
import store from 'store'
import user from '../../store/user'

export async function login(email, password) {
  return apiClient
    .get('/users?email=' + email + '&password=' + password)
    .then(response => {
      if (response) {
        console.log(response.data)
        const data = response.data[0]
        const accessToken = data.id + "" + data.accessToken
        if (accessToken) {
          localStorage.setItem('userData', JSON.stringify(data));
          store.set('accessToken', accessToken)
          store.set('userID', data.id)
          console.log(localStorage.getItem('userData'))
        }
        return response.data
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
  const id = JSON.parse(localStorage.getItem('userData'));
  console.log(userID)
  console.log(localStorage.getItem('userData'))

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
  return apiClient
    .get('/auth/logout')
    .then(() => {
      store.remove('accessToken')
      store.remove('userID')
      return true
    })
    .catch(err => console.log(err))
}
