import apiClient from '@/services/axios/axios'

export async function postList() {
    return apiClient
    .post('/posts/list')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}

export async function storePost(data, config) {
    return apiClient
    .post('/posts/store', data, config)
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}

export async function deletePost(id) {
    return apiClient
    .delete(`/posts/delete/${ id }`)
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}

export async function updatePost(id, data, config) {
    return apiClient
    .post(`/posts/update?post_id=${ id }`, data, config)
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}