import axios from 'axios'
import SessionService from './SessionService';

const API_BASE_URL = 'http://localhost:8081';
class APIService {

    getAuthHeaders() {
        const token = SessionService.getToken();
        if (!token) return {};
        return { Authorization: 'Bearer ' + token };
    }

    loginRequest(path, body){
        return axios.post(API_BASE_URL + path, body)
    }

    signinRequest(path, body){
        return axios.post(API_BASE_URL + path, body)
    }
    
    getRequest(path){
        return axios.get(API_BASE_URL + path, {headers: this.getAuthHeaders()});
    }

    postRequest(path, body){
        return axios.post(API_BASE_URL + path, body, {headers: this.getAuthHeaders()});
    }

    patchRequest(path, body){
        return axios.patch(API_BASE_URL + path, body, {headers: {'Content-Type': 'application/json', ...this.getAuthHeaders()}});
    }

    patchMultipartRequest(path, body){
        return axios.patch(API_BASE_URL + path, body, {headers: this.getAuthHeaders()});
    }

    deleteRequest(path){
        return axios.delete(API_BASE_URL + path, {headers: this.getAuthHeaders()})
    }
}
const apiService = new APIService();

export default apiService;