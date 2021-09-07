import apiClient from '@/services/axios'
import store from 'store'

export async function getUserList() {
    return apiClient
    .get('/usercrm')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
    .catch(err => { console.error(err) })
}