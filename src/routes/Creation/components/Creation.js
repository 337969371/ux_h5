import React from 'react'
import PropTypes from 'prop-types'
import "../style/Creation.scss"
import {Link, withRouter} from "react-router";

import Menu from "../../../components/Menu/Menu";
import Header from "../../../components/Header/Header";
import img1 from "../../../static/campaign/img-1.png"
import img11 from "../../../static/campaign/img-1-1.png"
import img2 from "../../../static/campaign/img-2.png"
import img21 from "../../../static/campaign/img-2-1.png"
import img3 from "../../../static/campaign/img-3.png"
import img31 from "../../../static/campaign/img-3-1.png"
import cover from "../../../static/campaign/cover.png"
import arImgText from "../../../static/campaign/ar-img-text.png"

import LazyLoad from "react-lazyload";
import Slider from "react-slick";
import {postF} from "../../../utils/api";
import HeaderNav from "../../../components/HeaderNav/HeaderNav";


class Creation extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            showMenu:true,
            scrollTop:0,
            startTime:0,
            lastTime:0,
            index:0,
            list:[]
        }
    }
    turnThePage(i){
        this.setState({
            index:i
        })
    }
    componentDidMount() {
        this.getData();
        document.getElementById("campaignVideo").addEventListener('play', this.playL);
        document.getElementById("campaignVideo").addEventListener('timeupdate', this.timeupdateL);
        window.addEventListener('scroll', this.scrollChange)
    }
    getData(){
        postF("forum/slideshow/list",null,{type:"300"}).then(res=>{
            this.setState({
                list:res
            })
        });
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollChange)
        document.getElementById("campaignVideo").removeEventListener('play',this.playL);
        document.getElementById("campaignVideo").removeEventListener('timeupdate',this.timeupdateL);
    }
    timeupdateL = (e) =>{
        const { lastTime, startTime } =this.state;
        let newT= parseInt((e.timeStamp-startTime)/1000)
        if(newT%5===0 && newT != lastTime){
            stm_clicki('send', 'event', 'campaign首页', '视频播放', newT);
            gio('track', 'video_play', {'video_id_var':'campaignVideo', 'video_time_var':newT});
            this.setState({
                lastTime:newT
            })
        }
    }
    playL = (e) => {
        this.setState({
            startTime:e.timeStamp
        });
        stm_clicki('send', 'event','campaign首页视频', "视频开始播放","0秒");
        gio('track', 'video_play', {'video_id_var':'campaignVideo', 'video_time_var':0});
    }

    scrollChange = (e) => {
        const sT = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
            || window.pageYOffset
            || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        const {scrollTop} =this.state;
        if(scrollTop > sT || sT === 0){
            this.setState({
                showMenu:true,
                scrollTop:sT
            })
        }else {
            this.setState({
                showMenu:false,
                scrollTop:sT
            })
        }
    }


    launchFullscreen() {
        let video = document.getElementById('campaignVideo');
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

    render() {
        const { index, list } =this.state;
        const settings = {
            // dots: true,
            // infinite: true,
            // speed: 500,
            // slidesToShow: 1,
            // slidesToScroll: 1,
            autoplay:false
        };
        //0 张渔；  1 刘通；2 张娜；  3 周毅； 4 候鸟陶；
        // 张渔  流通  张娜
        let imgArr=[
            "https://id-oss.vw.com.cn/img/zhangyu.png",
            "https://id-oss.vw.com.cn/img/liutong.png",
            "https://id-oss.vw.com.cn/img/zhangna.png",
            "https://id-oss.vw.com.cn/img/zhouyi.png",
            "https://id-oss.vw.com.cn/img/houniaotao.png",
        ];
        return (
            <div className="creation">
                <HeaderNav  transparent={true} isLight={true}/>
                <div className="creation-video" id="videobox">
                    <img src={cover} alt="" onClick={()=>this.launchFullscreen()}/>
                    <video poster={cover} controls="controls"  id="campaignVideo" >
                        <source src="https://id-oss.vw.com.cn/video/ID_Full_Film%20720.mp4"/>
                    </video>

                </div>
                <div className="creation-play">
                    <LazyLoad unmountIfInvisible={true}>
                        <img src={img11} className="animate__title" alt=""/>
                    </LazyLoad>
                    <img src={img1} alt=""/>
                    <div className="found-text">
                        这是一个人人都在突破自我，<br/>
                        展示自我，<br/>
                        并成为更好自我的时代。<br/>
                        开启智能出行新世代的ID. 品牌<br/>
                        邀请到不同领域中“突破自我”的创造玩家，<br/>
                        记录他们自我进化的故事。<br/>

                        ID. 诚邀每个向着更好方向进发的你，<br/>
                        加入我们，与ID. 一起：

                        <div className="title">
                            改变玩法，自我而始
                        </div>
                    </div>
                    <Link to="/anthemFilm" onClick={()=>{
                        stm_clicki('send', 'event', '页面跳转', '点击', "发现更多", "");
                    }}>
                        <button className="goPage">发现更多</button>
                    </Link>
                </div>
                <div className="creation-play">
                    <LazyLoad unmountIfInvisible={true}>
                        <img src={img21} className="animate__title" alt=""/>
                    </LazyLoad>
                    <img src={img2} alt=""/>
                    <div className="creation-play-taiyi">
                        <img src="https://id-oss.vw.com.cn/img/Toppage_Mobi.gif" alt=""/>
                        <img src={arImgText} className="arImgText" />
                        <img src="https://id-oss.vw.com.cn/img/taiyi_new1.gif" className="taiyi-cover"/>
                    </div>
                        <button className="goPage" onClick={()=>{
                            this.props.router.push("/arConcert");
                            stm_clicki('send', 'event', '页面跳转', '点击', "arconcert", "");
                        }} >即刻开撩</button>
                </div>
                <div className="creation-play">
                    <div className="zhangyu-title">
                        <img src={img3} alt=""/>
                        <LazyLoad unmountIfInvisible={true}>
                            <img className="animate__title_no" src={img31}/>
                        </LazyLoad>
                    </div>
                    <div className="zhangyu-img">
                        <div>
                            <Slider {...settings} afterChange={(index)=>this.turnThePage(index)}>
                                {
                                    imgArr.map((item,index)=> <div className="item-box" key={index} ><img src={item} className="item" alt="" /></div>)
                                }
                            </Slider>
                        </div>
                    </div>
                    <div className="zhangyu">
                        <div>
                            <button  className="goPage" onClick={()=>{
                                this.props.router.push("/kol?id="+index);
                                let names=["张渔","刘通","张娜","周毅","候鸟陶"]
                                stm_clicki('send', 'event', '页面跳转', '点击', "了解更多-"+names[index], "");
                            }}>了解更多</button>
                        </div>
                        <div className="page">
                            <div className="num">0{index+1}</div>
                            <div className="size">/05</div>
                        </div>
                    </div>
                </div>
                {/*<div className="creation-play">*/}
                {/*    <img src={img4} className="gift" alt=""/>*/}
                {/*    <div className="gift-box">*/}
                {/*        <img src={gift1} alt=""/>*/}
                {/*        <img src={gift1} alt=""/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="top-30"></div>
                {
                    list && list.length>0 && list.map((item,index)=><Link key={index} to={item.h5Url} onClick={()=>stm_clicki('send', 'event', '页面跳转', '点击', item.label, "")}>
                        <div className="creation-footer-play">
                        <img src={item.imageUrl} alt=""/>
                        <div className="jiazu-title">
                            <LazyLoad unmountIfInvisible={true}>
                                <div className="animate__animated animate__fadeInUp">
                                    <div className="name">
                                        {item.name}
                                    </div>
                                    <div className="title">
                                        {item.title}
                                    </div>
                                </div>
                            </LazyLoad>
                        </div>
                        </div></Link>)
                }
            </div>
        );
    }
}
export default withRouter(Creation)
Creation.propTypes = {
    creation: PropTypes.object.isRequired,
}

