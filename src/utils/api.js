import fetch from "./fetch";
import axios from "axios";
import {Toast} from "antd-mobile";
import {addGlobalData} from "../store/global";


export const postC = (url,param) => {
    return fetch({
        url:"/c/api/"+url,
        data:param,
        method:"post"
    })
}

export const postCD = (url,dispatch,param) => {
    return fetch({
        dispatch: dispatch,
        url:"/c/api/"+url,
        data:param,
        method:"post",
        headers:{
            'Content-Type':'application/json'
        }
    })
}

export const postF = (url,dispatch,param) => {
    return fetch({
        dispatch: dispatch,
        url:"/f/api/"+url,
        data:param,
        method:"post",
        headers:{
            'Content-Type':'application/json'
        }
    })
}

export const postPush = async (url,dispatch,param) => {
    let token  =  await localStorage.getItem("token");
    return axios.post("/f/api/"+url,param,{
        headers:{
            'user-token':token,
            "Set-Cookie":"Secure; HttpOnly"
        }
    }).then((res)=>{
        if(res.status === 200 && res.data){
            if(res.data.code === 0){
                return true;
            }else if(res.data.code === 401){
                Toast.info(res.data.msg);
                dispatch(addGlobalData({showLogin:true}));
                localStorage.removeItem("token")
                return false
            }else {
                Toast.info(res.data.msg);
                return false
            }
        }else {
            Toast.info(res.statusText);
            return false
        }
    });
}
//分享
export const postShare = async (url,dispatch,param) => {
    let token  =  await localStorage.getItem("token");
    return axios.post("/f/api/"+url,param,{
        headers:{
            'user-token':token,
            "Set-Cookie":"Secure; HttpOnly"
        }
    }).then((res)=>{
        if(res.status === 200 && res.data){
            if(res.data.code === 0){
                return res.data.posterUrl;
            }else if(res.data.code === 401){
                Toast.info(res.data.msg);
                dispatch(addGlobalData({showLogin:true}));
                localStorage.removeItem("token")
                return false
            }else {
                Toast.info(res.data.msg);
                return false
            }
        }else {
            Toast.info(res.statusText);
            return false
        }
    });
}

//领取礼物
export const receivePrize = async (url,dispatch,param) => {
    let token  =  await localStorage.getItem("token");
    return axios.post("/c/api/"+url,param,{
        headers:{
            'user-token':token,
            "Set-Cookie":"Secure; HttpOnly"
        }
    }).then((res)=>{
        if(res.status === 200 && res.data){
            if(res.data.code === 0){
                return res.data;
            }else if(res.data.code === 401){
                Toast.info(res.data.msg);
                dispatch(addGlobalData({showLogin:true}));
                localStorage.removeItem("token")
                return false
            }else {
                return res.data;
            }
        }else {
            Toast.info(res.statusText);
            return false
        }
    });
}



export const upLoadFiles = (param)=>{
    const url = "forum/file/upload";
    return axios({
        method:'post',
        url:url,
        headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8',
            "Set-Cookie":"Secure; HttpOnly"
        },
        data:param,

    })
}