import apiClient from '@/services/axios'
import apiConfig from './serviceConfig'

export default class ApiService {
    apiConfig = { ...apiConfig };

    constructor() {}

    async getRoles() {
        return apiClient.get('/roles')
    }

    async getPermissions() {
        return apiClient.get('/permissions')
    }
}
