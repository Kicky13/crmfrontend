import apiClient from '@/services/axios'
import serverClient from '@/services/axios/axios'
import store from 'store'

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

export async function insertRole(data) {
  return apiClient
  .post('/roles', data)
  .then(response => {
    if (response) {
      return true
    }
    return false
  })
}

export async function updateRole(id, data) {
  return apiClient
  .put('/roles/' + id, data)
  .then(response => {
    if (response) {
      return true
    }
    return false
  })
}

export async function deleteRole (id) {
  return apiClient
  .delete('/roles/' + id)
  .then(response => {
    if (response) {
      return true
    }
    return false
  })
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

export async function deletePermission(id) {
  return apiClient
  .delete('/permissions/' + id)
  .then(response => {
    if (response) {
      return true
    }
    return false
  })
}

export async function updatePermission(id, data) {
  return apiClient
  .put('/permissions/' + id, data)
  .then(response => {
    if (response) {
      return response
    }
    return false
  })
}

export async function insertPermission(data) {
  return apiClient
  .post('/permissions', data)
  .then(response => {
    if (response) {
      return response
    }
    return false
  })
}

export async function getAssignList(offset, limit) {
  return serverClient
  .post('assignRole', { offset: offset, limit: limit })
  .then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}

export async function getUserList() {
  return apiClient
  .get('/assignuser')
  .then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}

export async function insertAssign(data) {
  return serverClient
  .post('addAssign', data)
  .then(response => {
    if (response) {
      return response
    }
    return false
  })
}

export async function updateAssign(id, data) {
  return apiClient
  .put('/assignrole/' + id, data)
  .then(response => {
    if (response) {
      return response
    }
    return false
  })
}

export async function deleteAssign(id) {
  return apiClient
  .delete('/assignrole/' + id)
  .then(response => {
    if (response) {
      return true
    }
    return false
  })
}

export async function optionJenisUser() {
  return serverClient
  .get('usercrm/list-jenis')
  .then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}