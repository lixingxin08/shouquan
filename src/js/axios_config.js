import axios from 'axios'
// import { domain } from './api_config'
// axios.defaults.baseURL = '';
//解决跨域

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ?'action/':'/api';
// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ?'http://192.168.3.83:8092/haiot-auth':'/api';

// axios.defaults.baseURL = '8088/haiot-auth';
axios.defaults.withCredentials = true;
axios.defaults.allowCredentials=true
try {
    let token=JSON.parse(localStorage.getItem('usermsg')).token
    axios.defaults.headers.common['token']=token||""  
} catch (error) {
    axios.defaults.headers.common['token']=""
}
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';

export default axios;
 