// import apiClient from '@/services/axios'
import apiClient from '@/services/axios/axios'

export async function getRegionList() {
    return apiClient
    .post('Kordinat')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
    .catch(err => { console.error(err) })
}

export async function getTokoList(formData) {
    return apiClient
    .post('Customerlist', formData)
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
    .catch(err => { console.error(err) })
}

export async function getHistoryVisit(formData) {
    return apiClient
    .post('Kunjungan', formData)
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
    .catch(err => { console.error(err) })
}