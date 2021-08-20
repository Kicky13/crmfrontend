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

export async function getRoleList() {
    return apiClient
    .get('/roles')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
    .catch(err => { console.error(err) })
}

export async function getPermissionList() {
    return apiClient
    .get('/permissions')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}

export async function getPostList() {
    return apiClient
    .get('/posts')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}

export async function getPost(id) {
    return apiClient
    .get(`/posts/${id}`)
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}

export async function deletePost(id) {
    return apiClient
    .delete(`/posts/${id}`)
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}

export async function addPost(post_date, post_title, post_slug, post_detail, publication_status, tag) {
    return apiClient
    .post('/posts', {
      post_date,
      post_title,
      post_slug,
      post_detail,
      publication_status,
      tag,
    })
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}
