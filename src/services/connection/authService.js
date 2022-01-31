// import serverClient from '@/services/axios'
import serverClient from '@/services/axios/axios'
import store from 'store'
import { notification } from 'ant-design-vue'

export async function oldlogin(email, password) {
  return serverClient
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
  return serverClient
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
    return serverClient
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
  // const userID = store.get('userID')
  // return serverClient
  //   .get('/users/' + userID)
  //   .then(response => {
  //     localStorage.removeItem('userData')
  //     store.remove('accessToken')
  //     store.remove('userID')
  //     return true
  //   })
  //   .catch(err => {
  //     if (err) {
  //     }
  //   })
}

export async function getRoleList() {
  return serverClient
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
  return serverClient.post('/roles', data).then(response => {
    if (response) {
      return true
    }
    return false
  })
}

export async function deleteRole(id) {
  return serverClient.delete('/roles/' + id).then(response => {
    if (response) {
      return true
    }
    return false
  })
}

export async function getPermissionList() {
  return serverClient.get('/permissions').then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}

export async function listPost() {
  return serverClient.get('/posts').then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}

export async function showPost(id) {
  return serverClient.get(`/posts/${id}`).then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}

export async function deletePost(id) {
  return serverClient.delete(`/posts/${id}`).then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}

export async function storePost(formData, config) {
  return serverClient.post('/posts', formData, config).then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}

export async function updatePost(id, formData, config) {
  return serverClient.put(`/posts/${id}`, formData, config).then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}

export async function deletePermission(id) {
  return serverClient.delete('/permissions/' + id).then(response => {
    if (response) {
      return true
    }
    return false
  })
}

export async function insertPermission(data) {
  return serverClient.post('/permissions', data).then(response => {
    if (response) {
      return response
    }
    return false
  })
}
