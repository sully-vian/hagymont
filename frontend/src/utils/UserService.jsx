import axios from 'axios'

const API_BASE_URL = 'http://localhost:8081';
class UserService {

    getRequest(path){
        return axios.get(API_BASE_URL + path, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}});
    }

    loginRequest(path, body){
        return axios.post(API_BASE_URL + path, body)
    }

    postRequest(path, body){
        return axios.post(API_BASE_URL + path, body, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}});
    }
}
const userService = new UserService();
export default userService;