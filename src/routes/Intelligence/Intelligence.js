import React from "react";
import {Link, withRouter} from "react-router";
import "./Intelligence.scss"
import img1 from "../../static/techcampaign/b899242.jpg"


import img2 from "../../static/techcampaign/5fbfc74.png"
import img3 from "../../static/techcampaign/92cf50f.jpg"
import img4 from "../../static/techcampaign/60f430e.jpg"
import img5 from "../../static/techcampaign/6577122.jpg"
import img6 from "../../static/techcampaign/f29253e.jpg"
import img7 from "../../static/techcampaign/ii7733u.jpg"
import img8 from "../../static/techcampaign/5ff8937.png"
import img9 from "../../static/techcampaign/386887f.jpg"
import img10 from "../../static/techcampaign/a9af645.jpg"

import poster1 from "../../static/techcampaign/video-icon.jpg"

import HeaderNav from "../../components/HeaderNav/HeaderNav";
import {Accordion} from "antd-mobile";

class Intelligence extends React.Component {
    constructor (props) {
        super(props)
        this.state={
            panelKey1:null,
            panelKey2:null,
            panelKey3:null,
        }
    }
    showPanel1(key){
        if(this.state[key]){
            this.setState({
                panelKey1:null
            })
        }else {
            this.setState({
                panelKey1:'tab1'
            })
        }
    }
    showPanel2(key){
        if(this.state[key]){
            this.setState({
                panelKey2:null
            })
        }else {
            this.setState({
                panelKey2:'tab2'
            })
        }
    }
    showPanel3(key){
        if(this.state[key]){
            this.setState({
                panelKey3:null
            })
        }else {
            this.setState({
                panelKey3:'tab3'
            })
        }
    }

    launchFullscreen(id) {
        let video = document.getElementById(id);
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
        const {panelKey1,panelKey2,panelKey3} =this.state;
        return (
            <div className="intelligence">
                <HeaderNav transparent={true} isLight={true} goBack={()=>this.props.router.replace("/techcampaign")} title={
                    <div className="header-menu">
                        <div className="item active">
                            智能
                            <div className="line"></div>
                        </div>
                        <div className="item">
                            <Link to="/techcampaign/design">设计</Link>
                        </div>
                        <div className="item">
                            <Link to="/techcampaign/experience">驾乘体验</Link>
                        </div>
                    </div>
                } />
                <img src={img1} alt=""/>
                <div className="main">
                    <img src={img2} alt=""/>
                    <div className="accordion-box">
                        <Accordion accordion openAnimation={{}} className="my-accordion" activeKey="tab1" onChange={(e)=>this.showPanel1("panelKey1")}>
                            <Accordion.Panel  header={<div><img src={img3} alt=""/></div>} key={panelKey1}>
                                <div className="my-accordion-main">
                                    <div className="my-accordion-title">AR HUD  增强现实抬头显示系统</div>
                                    <div>
                                        得益于增强现实技术，驾驶员使用AR HUD导航系统时视线不用离开路面，能够直观的看到如车速或者导航指示等关键信息，这些信息将以虚拟图像的形式投射于车前区域，准确显示出驾驶员的前进方向，实现实景导航，为驾驶者提供直观轻松并且安全的导航体验。
                                        <img src="https://id-oss.vw.com.cn/img/1-ARHUB.gif" alt=""/>
                                    </div>
                                    <div className="hide-panel" onClick={()=>this.showPanel1("panelKey1")}>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAdCAYAAADhLp8oAAAACXBIWXMAAAsSAAALEgHS3X78AAABu0lEQVRYhc3Z31WDMBQG8K9M4AjdoL4azpGO4AalG9QNHKFOULuBbgAP8Gwn0BFkAjyhN0htSv5wA3xPnBJIfichHG4XdV1jjCSxuJfd5EX5OUZ/QWFJLFIAOwCrf6c+ALznRfkWqu8gsCQWd3Lg8tDQVALTvCh/uMfADiNUppmlWzkBWHPjIs6beaBAbTO6li1sME9UMBwLbCBKhRU3GOaAegVwNLRZ0b0GZxDMAbXNi3KXF6Xc/rcmXBKLwa8Bb5gjqh0oHZtwm6E4L5gvSmUMnO+M7X1RKnTu2XAPb5zzC5o62hia9aI87nek59M6TjPGjcJ55lKL3dJ55qxhIVAqIXBWMIfl4v2wc+OMsFDPgC6cuF7YmCgVLtxN2BQoFQ6cFjYlSsUB96I7cfUemwPKYzxXu/HFjM0NBfuZO1B9pU0LS2KxnxtKxQfXLEX64WC4cBJUN0ksMosCUbMsF4/iYQngy9B4chTsvyoqAMsoL8pvwyfELFA4L0lZyVpTZUuXSlW8IvR/H80GpdKDU6im0hx1LlC4in46URV3dtHgLlAyuveYrLHLHfIpRIWWM52Ks6yn/P0nAOAXB0EZXZDQcr8AAAAASUVORK5CYII=" alt=""/>
                                        <div>折叠收起</div>
                                    </div>
                                </div>
                            </Accordion.Panel>
                        </Accordion>
                    </div>

                    <div className="accordion-box">
                        <Accordion accordion openAnimation={{}} className="my-accordion" activeKey="tab2" onChange={(e)=>this.showPanel2("panelKey2")}>
                            <Accordion.Panel  header={<div><img src={img5} alt=""/></div>} key={panelKey2}>
                                <div className="my-accordion-main">
                                    <div className="my-accordion-title">ID. Light</div>
                                    <div>
                                        直观的感知：ID. Light是位于车辆A柱两侧的一条智能交互式LED灯带，配合车辆当前功能，驾驶员可以直观地通过ID. Light获取关键信息。通过变换LED灯带的颜色与脉冲，让ID. Light能够与驾驶员进行交互。
                                        <img src="https://id-oss.vw.com.cn/img/2-IDLight.gif" alt=""/>
                                        <div>
                                            <div className="my-accordion-title my-accordion-center">ID. Light交互场景动态展示</div>
                                            <div className="video-box">
                                                <div className="item">
                                                    <div className="item-img">
                                                        <img src={poster1} alt="" onClick={()=>this.launchFullscreen("intelligence-video1")}/>
                                                        <video poster={poster1} controls="controls" id="intelligence-video1">
                                                            <source src="https://id-oss.vw.com.cn/video/%E6%AC%A2%E8%BF%8E%E5%92%8C%E5%86%8D%E8%A7%81.mp4"/>
                                                        </video>
                                                    </div>
                                                    <div className="text">欢迎与再见</div>
                                                </div>
                                                <div className="item">
                                                    <div className="item-img">
                                                        <img src={poster1} alt="" onClick={()=>this.launchFullscreen("intelligence-video2")}/>
                                                        <video poster={poster1} controls="controls" id="intelligence-video2">
                                                            <source src="https://id-oss.vw.com.cn/video/%E7%B4%A7%E6%80%A5%E5%88%B9%E8%BD%A6.mp4"/>
                                                        </video>
                                                    </div>
                                                    <div className="text">紧急制动</div>
                                                </div>

                                                <div className="item">
                                                    <div className="item-img">
                                                        <img src={poster1} alt="" onClick={()=>this.launchFullscreen("intelligence-video3")}/>
                                                        <video poster={poster1} controls="controls" id="intelligence-video3">
                                                            <source src="https://id-oss.vw.com.cn/video/%E6%9D%A5%E7%94%B5.mp4"/>
                                                        </video>
                                                    </div>
                                                    <div className="text">来电</div>
                                                </div>
                                                <div className="item">
                                                    <div className="item-img">
                                                        <img src={poster1} alt="" onClick={()=>this.launchFullscreen("intelligence-video4")}/>
                                                        <video poster={poster1} controls="controls" id="intelligence-video4">
                                                            <source src="https://id-oss.vw.com.cn/video/%E9%94%81%E8%BD%A6%E5%92%8C%E5%BC%80%E9%94%81.mp4"/>
                                                        </video>
                                                    </div>
                                                    <div className="text">安全锁定与解锁</div>
                                                </div>
                                                <div className="item">
                                                    <div className="item-img">
                                                        <img src={poster1} alt="" onClick={()=>this.launchFullscreen("intelligence-video5")}/>
                                                        <video poster={poster1} controls="controls" id="intelligence-video5">
                                                            <source src="https://id-oss.vw.com.cn/video/%E6%AD%A3%E5%9C%A8%E5%85%85%E7%94%B5.mp4"/>
                                                        </video>
                                                    </div>
                                                    <div className="text">充电</div>
                                                </div>
                                                <div className="item">
                                                    <div className="item-img">
                                                        <img src={poster1} alt="" onClick={()=>this.launchFullscreen("intelligence-video6")}/>
                                                        <video poster={poster1} controls="controls" id="intelligence-video6">
                                                            <source src="https://id-oss.vw.com.cn/video/%E8%BD%AC%E5%90%91%E6%8F%90%E7%A4%BA.mp4"/>
                                                        </video>
                                                    </div>
                                                    <div className="text">转向建议</div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="hide-panel" onClick={()=>this.showPanel2("panelKey2")}>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAdCAYAAADhLp8oAAAACXBIWXMAAAsSAAALEgHS3X78AAABu0lEQVRYhc3Z31WDMBQG8K9M4AjdoL4azpGO4AalG9QNHKFOULuBbgAP8Gwn0BFkAjyhN0htSv5wA3xPnBJIfichHG4XdV1jjCSxuJfd5EX5OUZ/QWFJLFIAOwCrf6c+ALznRfkWqu8gsCQWd3Lg8tDQVALTvCh/uMfADiNUppmlWzkBWHPjIs6beaBAbTO6li1sME9UMBwLbCBKhRU3GOaAegVwNLRZ0b0GZxDMAbXNi3KXF6Xc/rcmXBKLwa8Bb5gjqh0oHZtwm6E4L5gvSmUMnO+M7X1RKnTu2XAPb5zzC5o62hia9aI87nek59M6TjPGjcJ55lKL3dJ55qxhIVAqIXBWMIfl4v2wc+OMsFDPgC6cuF7YmCgVLtxN2BQoFQ6cFjYlSsUB96I7cfUemwPKYzxXu/HFjM0NBfuZO1B9pU0LS2KxnxtKxQfXLEX64WC4cBJUN0ksMosCUbMsF4/iYQngy9B4chTsvyoqAMsoL8pvwyfELFA4L0lZyVpTZUuXSlW8IvR/H80GpdKDU6im0hx1LlC4in46URV3dtHgLlAyuveYrLHLHfIpRIWWM52Ks6yn/P0nAOAXB0EZXZDQcr8AAAAASUVORK5CYII=" alt=""/>
                                        <div>折叠收起</div>
                                    </div>
                                </div>
                            </Accordion.Panel>
                        </Accordion>
                    </div>

                    <div className="accordion-box">
                        <Accordion accordion openAnimation={{}} className="my-accordion" activeKey="tab3" onChange={(e)=>this.showPanel3("panelKey3")}>
                            <Accordion.Panel  header={<div><img src={img6} alt=""/></div>} key={panelKey3}>
                                <div className="my-accordion-main">
                                    <div className="my-accordion-title">IQ. Light</div>
                                    <div>
                                        IQ. Light与LED矩阵式大灯在车辆启动前便可自动启动智能沟通功能。当车主接近车辆时，车辆配备的LED矩阵式大灯可在10-15米的范围内侦测到车主，并对车主追光跟随，真的就好像是ID.车辆在“睁开双眼”欢迎车主一样。
                                        <img src="https://id-oss.vw.com.cn/img/3-IQLight.gif" alt=""/>
                                    </div>
                                    <div className="hide-panel" onClick={()=>this.showPanel3("panelKey3")}>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAdCAYAAADhLp8oAAAACXBIWXMAAAsSAAALEgHS3X78AAABu0lEQVRYhc3Z31WDMBQG8K9M4AjdoL4azpGO4AalG9QNHKFOULuBbgAP8Gwn0BFkAjyhN0htSv5wA3xPnBJIfichHG4XdV1jjCSxuJfd5EX5OUZ/QWFJLFIAOwCrf6c+ALznRfkWqu8gsCQWd3Lg8tDQVALTvCh/uMfADiNUppmlWzkBWHPjIs6beaBAbTO6li1sME9UMBwLbCBKhRU3GOaAegVwNLRZ0b0GZxDMAbXNi3KXF6Xc/rcmXBKLwa8Bb5gjqh0oHZtwm6E4L5gvSmUMnO+M7X1RKnTu2XAPb5zzC5o62hia9aI87nek59M6TjPGjcJ55lKL3dJ55qxhIVAqIXBWMIfl4v2wc+OMsFDPgC6cuF7YmCgVLtxN2BQoFQ6cFjYlSsUB96I7cfUemwPKYzxXu/HFjM0NBfuZO1B9pU0LS2KxnxtKxQfXLEX64WC4cBJUN0ksMosCUbMsF4/iYQngy9B4chTsvyoqAMsoL8pvwyfELFA4L0lZyVpTZUuXSlW8IvR/H80GpdKDU6im0hx1LlC4in46URV3dtHgLlAyuveYrLHLHfIpRIWWM52Ks6yn/P0nAOAXB0EZXZDQcr8AAAAASUVORK5CYII=" alt=""/>
                                        <div>折叠收起</div>
                                    </div>
                                </div>
                            </Accordion.Panel>
                        </Accordion>
                    </div>

                </div>
                <div className="title-box">
                    <img src={img8} alt=""/>
                </div>
                <div className="footer-img">
                    <Link to="/topicDetail?id=1&type=10">
                        <img src="https://id-oss.vw.com.cn/img/%E5%9C%86%E6%A1%8C-01.jpg" alt=""/>
                    </Link>
                    <div className="footer-img-box" >
                        <div className="title">如何用音乐将“未来感”提现</div>
                        <div className="desc">ID. 圆桌</div>
                    </div>
                </div>
                <div className="footer-img">
                    <Link to="/lifestyle">
                        <img src={img10} alt=""/>
                    </Link>
                </div>

            </div>
        );
    }
}

export default withRouter(Intelligence)