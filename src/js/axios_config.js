import axios from 'axios'
// import { domain } from './api_config'
// axios.defaults.baseURL = '';
//解决跨域
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ?'http://192.168.3.38:8091/authorization':'/api';
axios.defaults.withCredentials = true;

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';

axios.defaults.headers.common['Authorization'] = localStorage.getItem('istoken')
export default axios;
