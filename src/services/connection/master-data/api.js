import apiClient from '@/services/axios'
import store from 'store'

export async function getDistributorList() {
    return apiClient
    .get('/distributor')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}
export async function getDistrikList() {
    return apiClient
    .get('/distrik')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}
export async function getTahunList() {
    return apiClient
    .get('/tahun')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}
export async function getBulanList() {
    return apiClient
    .get('/bulan')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}
