import {routerEnum} from "./routerEnum";
import React from 'react'

export default class  Utils{

    static  sex = value =>{
        if(value+"" === "1"){
            return "女"
        }else if(value+"" === "0"){
            return "男"
        }
        return "未知"
    }

    static addressStr = (value,data)=>{
        for (let item of data){
            if(item.code == value){
                return item.name;
            }
        }
    }
    static getNumString = (num) =>{
        if(!num){
            return "0";
        }
        if(num<1000){
            return num.toString();
        }
        if(num>=1000 && num<1000000){
            return (num/1000).toFixed(1)+"K+";
        }
        return "0"
    }
    static sendRouterChange = (pathname,query) =>{
        window.scrollTo(0, 0);
        if(pathname !=="/kol"){
            new Promise(()=>{
                if(routerEnum[pathname]){
                    stm_clicki('send', 'pageview', {'page': pathname, 'title': routerEnum[pathname]});
                }
            });
        }else {
            if(query.id === "0"){
                stm_clicki('send', 'pageview', {'page': "/kol", 'title': "campaign-张渔"});
            }else if(query.id === "1"){
                stm_clicki('send', 'pageview', {'page': "/kol", 'title': "campaign-刘通"});
            }else if(query.id === "2"){
                stm_clicki('send', 'pageview', {'page': "/kol", 'title': "campaign-张娜"});
            }else if(query.id === "3"){
                stm_clicki('send', 'pageview', {'page': "/kol", 'title': "campaign-周毅"});
            }else if(query.id === "4"){
                stm_clicki('send', 'pageview', {'page': "/kol", 'title': "campaign-候鸟陶"});
            }
        }
    }
    static getUserBackground = (level) =>{
        if(level === "KOC"){
            return "#DFE4E8"
        }else if(level === "官方"){
            return "#DFE4E8"
        }else {
            return "none"
        }
    }
    static getUserLevelImg = (level,className) =>{
        if(level === "KOC"){
            return <img src="https://id-oss.vw.com.cn/img/KOC.png" className={className} />
        }else if(level === "官方"){
            return <img src="https://id-oss.vw.com.cn/img/official.png" className={className} />
        }
    }
}

