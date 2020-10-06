import React from "react";
import {Link, withRouter} from "react-router";
import "./Techcampaign.scss"
import img1 from "../../static/techcampaign/33f4b45.jpg";
import imgText from "../../static/techcampaign/212a41f.jpg"
import img2 from "../../static/techcampaign/7ce1c8d.jpg";
import img3 from "../../static/techcampaign/8974eae.jpg"
import img4 from "../../static/techcampaign/DB2018AU00135_large.jpg"
import more from "../../static/techcampaign/76874e8.png"
import img5 from "../../static/techcampaign/a05fb75.jpg"
import img6 from "../../static/techcampaign/75d26e2.jpg"

import img7 from "../../static/techcampaign/64725d7.jpg"
import img8 from "../../static/techcampaign/c864b64.jpg"

import img9 from "../../static/techcampaign/1221877.jpg"
import img10 from "../../static/techcampaign/6014352.jpg"
import img11 from "../../static/techcampaign/51746d9.jpg"
import img12 from "../../static/techcampaign/a9af645.jpg"
import img13 from "../../static/techcampaign/139bdef.jpg"
import img14 from "../../static/techcampaign/66eb5f3.png"

import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";



class Techcampaign extends React.Component {
    constructor (props) {
        super(props)
        this.state={
            startTime:0,
            lastTime:0,
            showMenu:true,
            scrollTop:0,
        }
    }
    launchFullscreen() {
        let video = document.getElementById('techcampaignVideo');
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
    launchFullscreen2() {
        let video = document.getElementById('techcampaignVideo2');
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
        stm_clicki('send', 'event',"techcampaign", "视频开始播放","0秒");
        gio('track', 'video_play', {'video_id_var':'techcampaignVideo', 'video_time_var':0});
    }
    playL = (e) => {
        this.setState({
            startTime:e.timeStamp
        });
        stm_clicki('send', 'event',"techcampaign", "视频开始播放","0秒");
        gio('track', 'video_play', {'video_id_var':'techcampaignVideo', 'video_time_var':0});
    }
    timeupdateL = (e) =>{
        const { lastTime, startTime } =this.state;
        let newT= parseInt((e.timeStamp-startTime)/1000)
        if(newT%5===0 && newT != lastTime){
            stm_clicki('send', 'event', 'techcampaign', '视频播放', newT);
            gio('track', 'video_play', {'video_id_var':'techcampaignVideo', 'video_time_var':newT});
            this.setState({
                lastTime:newT
            })
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollChange)
        setTimeout(function () {
            let hash =  location.hash;
            if(hash){
                window.location.href=hash;
            }
        },3000)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollChange)
    }
    scrollChange = (e) => {
        const sT = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
            || window.pageYOffset
            || (event.srcElement ? event.srcElement.body.scrollTop : 0);

        const {scrollTop} =this.state;
        if(scrollTop > sT || sT === 0){
            this.setState({
                showMenu:true,
                scrollTop:sT,
            })
        }else {
            this.setState({
                showMenu:false,
                scrollTop:sT,
            })
        }
        if(sT>500){
            this.setState({
                isFirst:false
            })
        }
    }

    render() {
        return (
            <div className="tech-campaign">
                <Header  home={true} {...this.props}/>
                <Menu unfold={this.state.showMenu}/>
                <div className="header-video">
                    <img src="https://id-oss.vw.com.cn/img/tech-img-01.jpg" alt=""  onClick={()=>this.launchFullscreen()} />
                    <video poster="https://id-oss.vw.com.cn/img/tech-img-01.jpg" controls="controls"  id="techcampaignVideo" >
                        <source src="https://id-oss.vw.com.cn/video/IDTech15s.mp4"/>
                    </video>
                </div>
                <div>
                    <img src={imgText} alt=""/>
                </div>
                {/*<div className="header-video">*/}
                {/*    <img src={img2} alt="" onClick={()=>this.launchFullscreen2()}/>*/}
                {/*    <video poster={img2} controls="controls"  id="techcampaignVideo2" >*/}
                {/*        <source src="https://id-oss.vw.com.cn/video/tech01.mp4"/>*/}
                {/*    </video>*/}
                {/*</div>*/}
                <div>
                    <img src={img3} alt=""/>
                    <div className="design-right">
                        <img src={img4} alt=""/>
                        <Link to="/techcampaign/intelligence" onClick={()=>{
                            stm_clicki('send', 'event', '页面跳转', '点击', "了解更多-智能", "");
                        }}>
                            <img src={more} className="more" alt=""/>
                        </Link>
                    </div>
                </div>
                <div>
                    <img src={img5} alt=""/>
                    <div className="design-left">
                        <img src={img6} alt=""/>
                        <Link to="/techcampaign/design" onClick={()=>{
                            stm_clicki('send', 'event', '页面跳转', '点击', "了解更多-设计", "");
                        }}>
                            <img src={more} className="more" alt=""/>
                        </Link>

                    </div>
                </div>
                <div>
                    <img src={img7} alt=""/>
                    <div className="design-right">
                        <img src={img8} alt=""/>
                        <Link to="/techcampaign/experience" onClick={()=>{
                            stm_clicki('send', 'event', '页面跳转', '点击', "了解更多-驾乘体验", "");
                        }}>
                            <img src={more} className="more" alt=""/>
                        </Link>
                    </div>
                </div>
                <div id="didi">
                    <img src={img9} alt=""/>
                    <div className="design-right">
                        <img src={img10} alt=""/>
                        <Link to="/techcampaign/didicoupon" onClick={()=>{
                            stm_clicki('send', 'event', '页面跳转', '点击', "了解更多-滴滴", "");
                        }}>
                            <img src={more} className="more m-t-20" alt=""/>
                        </Link>
                    </div>
                </div>
                <div className="img-footer1 img-footer-item">
                    <Link to="/brand" onClick={()=>{
                        stm_clicki('send', 'event', '页面跳转', '点击', "brand", "");
                    }}>
                        <img src={img11} alt=""/>
                    </Link>
                </div>
                <div className="img-footer-item">
                    <Link to="/lifestyle" onClick={()=>{
                        stm_clicki('send', 'event', '页面跳转', '点击', "lifestyle", "");
                    }}>
                        <img src={img12} alt=""/>
                    </Link>

                </div>
                <div className="img-footer">
                    <img src={img13} alt=""/>

                    <div className="text">
                        <Link to="/campaign" onClick={()=>{
                            stm_clicki('send', 'event', '页面跳转', '点击', "campaign", "");
                        }}>
                            <img src={img14} alt=""/>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Techcampaign)