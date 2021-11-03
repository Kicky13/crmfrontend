// import apiClient from '@/services/axios'
import apiClient from '@/services/axios/axios'

export async function getRegionList() {
    return apiClient
    .post('Kordinat/DataProvinsi')
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
    .post('Kordinat/Customerlist', formData)
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
    .post('Kordinat/Kunjungan', formData)
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
    .catch(err => { console.error(err) })
}

export async function getHistoryDetail(formData) {
    return apiClient
    .post('Kordinat/DetailSurvey', formData)
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
    .catch(err => { console.error(err) })
}