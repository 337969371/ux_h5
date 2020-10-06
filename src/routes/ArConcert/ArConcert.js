import React from 'react'
import {Link, withRouter} from 'react-router'
import './ArConcert.scss'

import title from "../../static/kol/title.png";
import zhangyu01 from "../../static/kol/zhangyu01.png";
import liutong02 from "../../static/kol/liutong02.png";
import zhangna03 from "../../static/kol/zhangna03.png";
import zhouyi04 from "../../static/kol/zhouyi04.png";
import houniaotao05 from "../../static/kol/houniaotao05.png";

import show from "../../static/campaign/show.png";

import HeaderNav from "../../components/HeaderNav/HeaderNav";
import LazyLoad from "react-lazyload";
import arBg from "../../static/arConcert/ar-bg.png"
import top1 from "../../static/arConcert/top1.png"
import btn1 from "../../static/arConcert/btn1.png"
import btn2 from "../../static/arConcert/btn2.png"
import videosTitle from "../../static/arConcert/videos-title.png"
import Login from "../../components/Login/Login";



class ArConcert extends React.Component {
    constructor (props) {
        super(props)
        this.state={
            startTime:0,
            lastTime:0,
            gifts:[],
            giftsIndex:0,
        }
    }
    componentDidMount() {
        let video = document.getElementById('ArVideo');
        video.addEventListener('play', this.playL);
        video.addEventListener('timeupdate', this.timeupdateL);
    }
    componentWillUnmount() {
        let brandVideo = document.getElementById("ArVideo");
        brandVideo.removeEventListener('play',this.playL);
        brandVideo.removeEventListener('timeupdate',this.timeupdateL);
    }
    goType(id){
        this.props.router.replace({
            pathname:"/kol",
            query: {
                id:id,
            }
        });
        let names = ["张渔", "刘通", "张娜","周毅","候鸟陶"];
        stm_clicki('send', 'event', '页面跳转', '点击', names[Number(id)], "");
        this.getVirtualList(id);
    }
    getGift(id){
        this.props.getGift({
            prizeId:id
        });
    }
    launchFullscreen() {
        let video = document.getElementById('ArVideo');
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        video.play();
        if (video.requestFullscreen && isiOS) {
            // 最新标准
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen && isiOS) {
            video.webkitRequestFullscreen();
        } else {
            setTimeout(()=>{
                // iOS进入全屏
                video.webkitEnterFullscreen();
                // 针对iOS监听不到webkitfullscreenchange事件做的兼容，感知退出全屏
                let timer = setInterval(() => {
                    if (!video.webkitDisplayingFullscreen) {
                        // 退出了全屏
                        clearInterval(timer);
                    }
                }, 1000);
            },500)
        }
    }
    timeupdateL = (e) =>{
        const { lastTime, startTime } =this.state;
        let newT= parseInt((e.timeStamp-startTime)/1000)
        if(newT%5===0 && newT != lastTime){
            stm_clicki('send', 'event', 'arconcert页', '视频播放', newT);
            gio('track', 'video_play', {'video_id_var':'ArVideo', 'video_time_var':newT});
            this.setState({
                lastTime:newT
            })
        }
    }
    playL = (e) => {;
        this.setState({
            startTime:e.timeStamp
        });
        stm_clicki('send', 'event','arconcert页', "视频开始播放",0);
        gio('track', 'video_play', {'video_id_var':'ArVideo', 'video_time_var':0});
    }
    render () {
        return (
            <div className='kol' style={{ backgroundImage:arBg}}>
                <Login {...this.props}/>
                <HeaderNav  transparent={true} isLight={true} {...this.props} />
                <div className="kol-video">
                    <img src="https://id-oss.vw.com.cn/img/AR_Mobi.gif" alt=""/>
                    <img  src={top1} className="ar-top-1"/>
                    <img src="https://id-oss.vw.com.cn/img/taiyi_new1.gif" className="taiyi_new1" />
                    <button className="taiyi_new1-btn" onClick={()=>{
                        stm_clicki('send', 'event', '页面跳转', '点击', "跳转AR呈现", "");
                        window.location.href="https://ar.vw.com.cn/concert/index.html";
                    }}>
                        即刻开撩
                    </button>
                </div>
                <div className="ar-concert-1">
                    <div className="title">随时随地 想象自我</div>
                    <div className="desc">
                        大众ID. 联合新锐音乐制作人太一<br/>
                        联手打造全新单曲<br/>
                        并用沉浸式AR体验<br/>
                        打造一场打破时空界限的音乐会让<br/>
                        你无论身在何处<br/>
                        都能零距离感受震撼音乐现场<br/>
                        更能提前欣赏ID. 家族概念车
                    </div>
                    <div>
                        <button  onClick={()=>{
                            this.props.router.push("tagAr")
                            stm_clicki('send', 'event', '按钮', '点击', "晒出我的AR想象", "");
                        }}>
                            <img  src={btn2} alt=""/>
                        </button>
                    </div>
                    <div>
                        <button  onClick={()=>{
                            this.props.getGift({
                                prizeId:"476824250192232449"
                            });
                            stm_clicki('send', 'event', '按钮', '点击', "歌曲独家下载", "");
                        }}>
                            <img src={btn1} alt=""/>
                        </button>
                    </div>
                </div>
                <div className="ar-concert-main">
                    <div className="content-1" id="works">
                        <img src={videosTitle} alt=""/>
                    </div>
                    <div className="content-videos">
                        <img src="https://id-oss.vw.com.cn/img/PC-AR%E8%8A%B1%E7%B5%AE2.jpg" alt="" onClick={()=>this.launchFullscreen()}/>
                        <video poster="https://id-oss.vw.com.cn/img/PC-AR%E8%8A%B1%E7%B5%AE2.jpg" controls="controls"  id="ArVideo" >
                            <source src="https://id-oss.vw.com.cn/video/arbackstage.mp4"/>
                        </video>
                    </div>
                    <div className="content-3">
                        <img className="title" src={title} alt=""/>
                        <div className="main">
                            <img src={zhangyu01} alt="" onClick={()=>this.goType(0)}/>
                            <img src={liutong02} alt="" onClick={()=>this.goType(1)}/>
                            <img src={zhangna03} alt="" onClick={()=>this.goType(2)}/>
                            <img src={zhouyi04} alt="" onClick={()=>this.goType(3)}/>
                            <img src={houniaotao05} alt="" onClick={()=>this.goType(4)}/>
                            <div></div>
                        </div>
                    </div>
                    <div className="content-4">
                        <img src="https://id-oss.dmqgo.com/attach/home-img-7.jpg" alt=""/>
                        <Link to="/brand" onClick={()=>stm_clicki('send', 'event', '页面跳转', '点击', "认识ID.品牌", "")}>
                            <div className="main">
                                <LazyLoad unmountIfInvisible={true}>
                                    <div  className="animate__animated animate__fadeInUp">
                                        认识ID. 品牌
                                    </div>
                                </LazyLoad>
                            </div>
                        </Link>
                    </div>
                    <div className="content-4">
                        <img src={show} alt=""/>
                        <Link to="/lifestyle" onClick={()=>stm_clicki('send', 'event', '页面跳转', '点击', "遇见更多新玩法", "")}>
                            <div className="main">
                                <LazyLoad unmountIfInvisible={true}>
                                    <div  className="animate__animated animate__fadeInUp">
                                        遇见更多新玩法
                                    </div>
                                </LazyLoad>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(ArConcert)
