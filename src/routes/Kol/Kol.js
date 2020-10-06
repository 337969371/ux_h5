import React from 'react'
import {Link, withRouter} from 'react-router'
import './Kol.scss'

import zhangyuInfo from "../../static/kol/zhangyu-info.png"
import zhangnaInfo from "../../static/kol/zhangna-info.png"

import liutongInfo from "../../static/kol/liutong-info.png"
import zhouyiInfo from "../../static/kol/zhouyi-info.png"
import houniaotaoInfo from "../../static/kol/houniaotao-info.png"

import title from "../../static/kol/title.png";
import zhangyu01 from "../../static/kol/zhangyu01.png";
import liutong02 from "../../static/kol/liutong02.png";
import zhangna03 from "../../static/kol/zhangna03.png";
import zhouyi04 from "../../static/kol/zhouyi04.png";
import houniaotao05 from "../../static/kol/houniaotao05.png";

import zhangyuWorks from "../../static/kol/works-zhangyu.png";
import liutongWorks from "../../static/kol/works-liutong.png";
import zhangnaWorks from "../../static/kol/works-zhangna.png";
import zhouyiWorks from "../../static/kol/works-zhouyi.png";
import houniaotaoWorks from "../../static/kol/works-houniaotao.png";

import show from "../../static/campaign/show.png";

import HeaderNav from "../../components/HeaderNav/HeaderNav";
import LazyLoad from "react-lazyload";
import zhangyu from "../../static/kol/zhangyu.png";
import zhangna from "../../static/kol/zhangna.png";
import liutong from "../../static/kol/liutong.png";
import zhouyi from "../../static/kol/zhouyi.png";
import houniaotao from "../../static/kol/houniaotao.png";

import zhangyuBg from "../../static/kol/zhangyu-bg.jpg";
import zhangnaBg from "../../static/kol/zhangna-bg.jpg";
import liutongBg from "../../static/kol/liutong-bg.jpg";
import zhouyiBg from "../../static/kol/zhouyi-bg.jpg";
import houniaotaoBg from "../../static/kol/houniaotao-bg.jpg";
import {postC} from "../../utils/api";
import Login from "../../components/Login/Login";


class Kol extends React.Component {
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
        let T =  setTimeout(()=>{
            document.getElementById("works").scrollTo(250,0);
            clearTimeout(T);
        },1000);
        const {location} = this.props;
        let type=0;
        if(location && location.query && location.query.id){
            type = location.query.id;
            this.getVirtualList(type)
        }
    }
    getVirtualList(i){
        let  type = Number(i)+1;
        postC("prize/virtualList",{
            campaignCode:"vp00"+type
        }).then(res=>{
            this.setState({
                gifts:res.records
            })
        });
    }
    componentWillUnmount() {
        let brandVideo = document.getElementById("brandVideo");
        try {
            brandVideo.removeEventListener('play',this.playL);
            brandVideo.removeEventListener('timeupdate',this.timeupdateL);
        }catch (e) {

        }
    }
    goType(id){
        let brandVideo = document.getElementById("brandVideo");
        try {
            brandVideo.removeEventListener('play',this.playL);
            brandVideo.removeEventListener('timeupdate',this.timeupdateL);
        }catch (e) {

        }
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
        let video = document.getElementById('kolVideo');
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        console.log(video);
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

        video.addEventListener('play', this.playL);
        video.addEventListener('timeupdate', this.timeupdateL);
    }
    timeupdateL = (e) =>{
        const {location} = this.props;
        let type=0;
        if(location && location.query && location.query.id){
            type = Number(location.query.id);
        }
        let names = ["张渔", "刘通", "张娜","周毅","候鸟陶"];
        const { lastTime, startTime } =this.state;
        let newT= parseInt((e.timeStamp-startTime)/1000)
        if(newT%5===0 && newT != lastTime){
            stm_clicki('send', 'event', 'kol页-'+names[type], '视频播放', newT);
            gio('track', 'video_play', {'video_id_var':'brandVideo', 'video_time_var':newT});
            this.setState({
                lastTime:newT
            })
        }
    }
    playL = (e) => {
        const {location} = this.props;
        let type=0;
        if(location && location.query && location.query.id){
            type = Number(location.query.id);
        }
        let names = ["张渔", "刘通", "张娜","周毅","候鸟陶"];
        this.setState({
            startTime:e.timeStamp
        });
        stm_clicki('send', 'event','kol页-'+names[type], "视频开始播放",0);
        gio('track', 'video_play', {'video_id_var':'brandVideo', 'video_time_var':0});
    }
    render () {
        const {location} = this.props;
        const { gifts,giftsIndex } =this.state;
        let type=0;
        if(location && location.query && location.query.id){
            type = location.query.id;
        }
        //0 张渔； 1 刘通； 2 张娜； 3 周毅； 4 候鸟陶；
        let videos =[
            {

                name:"张渔",
                url:"https://id-oss.vw.com.cn/video/ID_zhangyu_60s.mp4",
                img:zhangyu,
                bg:zhangyuBg,
                info:zhangyuInfo,
                works:zhangyuWorks
            },
            {
                name:"刘通",
                url:"https://id-oss.vw.com.cn/video/ID_liutong_60S.mp4",
                img:liutong,
                bg:liutongBg,
                info:liutongInfo,
                works:liutongWorks
            },
            {
                name:"张娜",
                url:"https://id-oss.vw.com.cn/video/ID_zhangna_60S.mp4",
                img:zhangna,
                bg:zhangnaBg,
                info:zhangnaInfo,
                works:zhangnaWorks
            },
            {
                name:"周毅",
                url:"https://id-oss.vw.com.cn/video/ID_zhouyi_60s.mp4",
                img:zhouyi,
                bg:zhouyiBg,
                info:zhouyiInfo,
                works:zhouyiWorks
            },
            {
                name:"候鸟陶",
                url:"https://id-oss.vw.com.cn/video/ID_houniaotao_60S.mp4",
                img:houniaotao,
                bg:houniaotaoBg,
                info:houniaotaoInfo,
                works:houniaotaoWorks
            }
        ]
        const settings = {
            dots: true,
        };
        console.log(type);
        return (
            <div className='kol' style={{ backgroundImage:'url('+videos[type].bg+')'}}>
                <Login {...this.props}/>
                <HeaderNav  transparent={true} isLight={true} {...this.props} />
                <div className="kol-video">
                    <img src={videos[type].img} alt="" onClick={()=>this.launchFullscreen()}/>
                    {type  == 0 && <video poster={videos[type].img} controls="controls"  id="kolVideo" >
                        <source src={videos[type].url}/>
                    </video>}
                    {type  == 1 && <video poster={videos[type].img} controls="controls"  id="kolVideo" >
                        <source src={videos[type].url}/>
                    </video>}
                    {type  == 2 && <video poster={videos[type].img} controls="controls"  id="kolVideo" >
                        <source src={videos[type].url}/>
                    </video>}
                    {type  == 3 && <video poster={videos[type].img} controls="controls"  id="kolVideo" >
                        <source src={videos[type].url}/>
                    </video>}
                    {type  == 4 && <video poster={videos[type].img} controls="controls"  id="kolVideo" >
                        <source src={videos[type].url}/>
                    </video>}
                </div>
                <div className="kol-1">
                    <img src={videos[type].info} alt=""/>
                </div>
                <div className="kol-main">
                    <div className="content-1" id="works">
                        <img src={videos[type].works} alt=""/>
                    </div>
                    {/*<div className="content-2">*/}
                    {/*    <img className="bg" src={imgBg2} alt=""/>*/}
                    {/*    <div className="slider">*/}
                    {/*        <Slider {...settings} afterChange={(i)=>this.setState({giftsIndex:i})}>*/}
                    {/*            {*/}
                    {/*                gifts && gifts.map((item,index)=>{*/}
                    {/*                    return  <div className="slider-item" key={index}>*/}
                    {/*                        <img src={item.imgListUrl} alt=""/>*/}
                    {/*                    </div>*/}
                    {/*                })*/}
                    {/*            }*/}
                    {/*        </Slider>*/}
                    {/*        <button className="get-btn" onClick={()=>this.getGift(gifts[giftsIndex].id)}>*/}
                    {/*            参与互动领取*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="content-3">
                        <img className="title" src={title} alt=""/>
                        <div className="main">
                            {type != 0 && <img src={zhangyu01} alt="" onClick={()=>this.goType(0)}/>}
                            {type != 1 && <img src={liutong02} alt="" onClick={()=>this.goType(1)}/>}
                            {type != 2 && <img src={zhangna03} alt="" onClick={()=>this.goType(2)}/>}
                            {type != 3 && <img src={zhouyi04} alt="" onClick={()=>this.goType(3)}/>}
                            {type != 4 && <img src={houniaotao05} alt="" onClick={()=>this.goType(4)}/>}
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

export default withRouter(Kol)
