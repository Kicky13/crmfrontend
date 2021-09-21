import apiClient from '@/services/axios'

export async function getRegionList() {
    return apiClient
    .get('/regionlock')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
    .catch(err => { console.error(err) })
}

export async function getTokoList() {
    return apiClient
    .get('/customerlock')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
    .catch(err => { console.error(err) })
}