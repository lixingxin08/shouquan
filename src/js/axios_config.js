import axios from 'axios'
// import { domain } from './api_config'
// axios.defaults.baseURL = '';
//解决跨域
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ?'/zuul/authorization':'/api';
// axios.defaults.baseURL = 'haiot-auth';
axios.defaults.withCredentials = true;

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';

axios.defaults.headers.common['Authorization'] = localStorage.getItem('istoken')
export default axios;
