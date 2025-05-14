import axios from 'axios'

const API_BASE_URL = 'http://localhost:8081';
class UserService {

    loginRequest(path, body){
        return axios.post(API_BASE_URL + path, body)
    }
    
    getRequest(path){
        return axios.get(API_BASE_URL + path, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}});
    }

    postRequest(path, body){
        return axios.post(API_BASE_URL + path, body, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}});
    }

    patchRequest(path, body){
        return axios.patch(API_BASE_URL + path, body, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token'), 'Content-Type': 'application/json'}});
    }

    deleteRequest(path, body){
        return axios.delete(API_BASE_URL + path, body, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}})
    }
}
const userService = new UserService();

export default userService;