import axios from 'axios'

let thisurl = window.location.href.split('/#')
let bb = thisurl[0].split('/html/auth')
let cc=bb[0]+'/zuul/auth'
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? cc : '/api';
//axios.defaults.baseURL = 'http://192.168.3.86:8092';

// axios.defaults.baseURL = '8088/haiot-auth';
axios.defaults.withCredentials = true;
axios.defaults.allowCredentials = true

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
export default axios;
