import axios from 'axios'

const API_BASE_URL = 'http://localhost:8081';

class UserService {

    getRequest(path){
        return axios.get(API_BASE_URL + path);
    }
}
const userService = new UserService();
export default userService;