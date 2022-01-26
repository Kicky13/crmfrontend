import apiClient from '@/services/axios'
import serverClient from '@/services/axios/axios'
import store from 'store'
import { notification } from 'ant-design-vue'

export async function oldlogin(email, password) {
  return apiClient
    .get('/users?email=' + email + '&password=' + password)
    .then(response => {
      if (response) {
        const data = response.data[0]
        const accessToken = data.id + '' + data.accessToken
        if (accessToken) {
          localStorage.setItem('userData', JSON.stringify(data))
          store.set('accessToken', accessToken)
          store.set('userID', data.id)
        }
        return data
      }
      return false
    })
    .catch(err => {
      if (err) {
      }
    })
}

export async function login(formData) {
  return serverClient
    .post('login', formData)
    .then(response => {
      if (response && response.data.status !== 'error') {
        const data = response.data.data
        const accessToken = data.accesstoken
        if (accessToken) {
          localStorage.setItem('userData', JSON.stringify(data))
          store.set('accessToken', accessToken)
          store.set('userID', data.id)
        }
        return data
      }
      return false
    })
    .catch(err => {
      if (err) {
      }
    })
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
    .catch(err => {
      if (err) {
      }
    })
}

export async function currentAccountOld() {
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
      .catch(err => {
        if (err) {
        }
      })
  }
  return false
}

export async function currentAccount() {
  const userID = store.get('userID')
  const token = store.get('accessToken')

  if (userID) {
    return serverClient
      .post('sessionUpdate')
      .then(response => {
        if (response && response.data.status !== 'error') {
          const { accesstoken } = response.data.data
          if (accesstoken) {
            store.set('accessToken', accesstoken)
          }
          return response.data.data
        }
        return false
      })
      .catch(err => {
        if (err) {
          setTimeout(function() {
            notification.warning({
              message: 'Opps !',
              description: 'Mohon tidak melakukan refresh browser.',
            })
          }, 1000)
        }
      })
  }
  return false
}

export async function logout() {
  const userID = store.get('userID')

  return apiClient
    .get('/users/' + userID)
    .then(response => {
      localStorage.removeItem('userData')
      store.remove('accessToken')
      store.remove('userID')
      return true
    })
    .catch(err => {
      if (err) {
      }
    })
}

export async function getRoleList() {
  return apiClient
    .get('/roles')
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => {
      if (err) {
      }
    })
}

export async function insertRole(data) {
  return apiClient.post('/roles', data).then(response => {
    if (response) {
      return true
    }
    return false
  })
}

export async function deleteRole(id) {
  return apiClient.delete('/roles/' + id).then(response => {
    if (response) {
      return true
    }
    return false
  })
}

export async function getPermissionList() {
  return apiClient.get('/permissions').then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}

export async function listPost() {
  return apiClient.get('/posts').then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}

export async function showPost(id) {
  return apiClient.get(`/posts/${id}`).then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}

export async function deletePost(id) {
  return apiClient.delete(`/posts/${id}`).then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}

export async function storePost(formData, config) {
  return apiClient.post('/posts', formData, config).then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}

export async function updatePost(id, formData, config) {
  return apiClient.put(`/posts/${id}`, formData, config).then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}

export async function deletePermission(id) {
  return apiClient.delete('/permissions/' + id).then(response => {
    if (response) {
      return true
    }
    return false
  })
}

export async function insertPermission(data) {
  return apiClient.post('/permissions', data).then(response => {
    if (response) {
      return response
    }
    return false
  })
}
