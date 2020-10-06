import axios from "axios";
import { Toast } from 'antd-mobile';
import {addGlobalData} from "../store/global";


let fetch = axios.create({
    timeout: 5000, // request timeout
    headers:{
        "Set-Cookie":"Secure; HttpOnly"
    }
})
fetch.interceptors.request.use(config => {
    let token  = localStorage.getItem("token");
    if(token){
        config.headers['user-token'] = token;
    }
    return config
}, error => {
    Promise.reject(error)
})

fetch.interceptors.response.use(async data => {
    if(data.status == 200 && data.data){
        if(data.data.code === 0){
            return Promise.resolve(data.data.data);
        }else if(data.data.code === 401){
            Toast.info(data.data.msg);
            if(data.config.dispatch){
                data.config.dispatch(addGlobalData({showLogin:true}))
            }
            return Promise.reject(data.data);
        }else {
            Toast.info(data.data.msg);
            return Promise.reject(data.data);
        }
    }else {
        Toast.info(data.statusText);
        return Promise.reject(data.data);
    }
}, error => {
    if (error.response) {
        if (error.response.status === 500) {
            Toast.info("服务器错误，请联系管理员处理");
        }
        return Promise.reject(error.response.data)
    } else {
        return Promise.reject(error)
    }
})

export default fetch
