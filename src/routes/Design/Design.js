import React from "react";
import {Link, withRouter} from "react-router";
import "./Design.scss"
import img1 from "../../static/techcampaign/0dd36a7.jpg"


import img2 from "../../static/techcampaign/2a42a28.png"
import img3 from "../../static/techcampaign/3845cac.jpg"

import img4 from "../../static/techcampaign/id.dna.jpg"
import img5 from "../../static/techcampaign/f4f1f99.jpg"
import img6 from "../../static/techcampaign/id-interior.jpg"
import img7 from "../../static/techcampaign/SeamlessDesign.jpg"
import img71 from "../../static/techcampaign/id-interior1.jpg"
import img72 from "../../static/techcampaign/id-interior2.jpg"
import img73 from "../../static/techcampaign/id-interior3.jpg"
import img8 from "../../static/techcampaign/5ff8937.png"
import img9 from "../../static/techcampaign/386887f.jpg"
import img10 from "../../static/techcampaign/a9af645.jpg"

import img11 from "../../static/techcampaign/c1141f7.jpg"
import img12 from "../../static/techcampaign/id-interior4.jpg"


import HeaderNav from "../../components/HeaderNav/HeaderNav";
import {Accordion} from "antd-mobile";

class Design extends React.Component {
    constructor (props) {
        super(props)
        this.state={
            panelKey1:null,
            panelKey2:null,
            panelKey3:null,
            panelKey4:null,
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
    showPanel4(key){
        if(this.state[key]){
            this.setState({
                panelKey4:null
            })
        }else {
            this.setState({
                panelKey4:'tab4'
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
        const {panelKey1,panelKey2,panelKey3,panelKey4} =this.state;
        return (
            <div className="design">
                <HeaderNav transparent={true} isLight={true} goBack={()=>this.props.router.replace("/techcampaign")} title={
                    <div className="header-menu">
                        <div className="item">
                            <Link to="/techcampaign/intelligence">智能</Link>
                        </div>
                        <div className="item active">
                            设计
                            <div className="line"></div>
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
                                    <div className="my-accordion-title">ID.设计DNA</div>
                                    <div>
                                        得益于MEB智能电驱平台， ID. 家族的车型没有传统的进气格栅，发动机舱与传动装置的空间被释放出来，从而可以更加自由的发挥ID家族设计的想象力，这是一种简洁、流畅，无缝的空气学动力风格。
                                        <img src={img4} alt=""/>
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
                                    <div className="my-accordion-title">“Seamless  Design”设计语言</div>
                                    <div>
                                        “Seamless”有无缝的含义， 同样ID. 家族的设计语言也是流畅简约的，十分贴近人们对自然的感受，设计师们从自然界中汲取灵感，大量地运用了曲线、曲面和弧面元素，使得形与面的转换过程更加流畅自然，浑然一体，不仅满足了减少空气阻力，提高车辆整体能效所需要求，还创造出一种非常明快、纯粹、现代的设计，是一种精致的简约。
                                        <img src={img7} alt=""/>
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
                                    <div className="my-accordion-title">“开放空间”内饰设计理念</div>
                                    <div>
                                        得益于MEB平台架构，ID家族能实现革命性的“开放空间”内饰空间设计，更大的玻璃面积，更通透的光线感，由于车身比例的变化，使得车内视野变得更好，漂浮式中控台屏幕，所有的控制界面都是在触手可及的地方；不管是车内座椅位置的优化，还是存储空间的优化，都充分利用了MEB智能电驱平台短前后悬，纯平，高集成度的特点。同时，随着自动驾驶等新技术的应用，ID.家族的内部空间也正在从驾驶员的工作场所转变为移动客厅。
                                        <img src={img71} alt=""/>
                                    </div>
                                    <div className="my-accordion-title m-t-20">“开始&暂停”脚踏板设计：</div>
                                    <div>
                                        在电门/刹车的踏板上融入了视频中“开始&暂停”的符号设计元素，是大众汽车ID. 纯电动车在驾驶体验方面的革命性直观表达。
                                        <img src={img72} alt=""/>
                                    </div>
                                    <div className="my-accordion-title m-t-20">光是电气化新时代的镀铬装饰</div>
                                    <div>
                                        在ID. 的设计中，光的运用也至关重要，是让人们与机器建立情感共鸣的桥梁。比如能够被点亮的VW Logo、Led贯穿式灯带等元素，让ID. 家族变得更有灵性。
                                        <img src={img73} alt=""/>
                                    </div>
                                    <div className="hide-panel" onClick={()=>this.showPanel3("panelKey3")}>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAdCAYAAADhLp8oAAAACXBIWXMAAAsSAAALEgHS3X78AAABu0lEQVRYhc3Z31WDMBQG8K9M4AjdoL4azpGO4AalG9QNHKFOULuBbgAP8Gwn0BFkAjyhN0htSv5wA3xPnBJIfichHG4XdV1jjCSxuJfd5EX5OUZ/QWFJLFIAOwCrf6c+ALznRfkWqu8gsCQWd3Lg8tDQVALTvCh/uMfADiNUppmlWzkBWHPjIs6beaBAbTO6li1sME9UMBwLbCBKhRU3GOaAegVwNLRZ0b0GZxDMAbXNi3KXF6Xc/rcmXBKLwa8Bb5gjqh0oHZtwm6E4L5gvSmUMnO+M7X1RKnTu2XAPb5zzC5o62hia9aI87nek59M6TjPGjcJ55lKL3dJ55qxhIVAqIXBWMIfl4v2wc+OMsFDPgC6cuF7YmCgVLtxN2BQoFQ6cFjYlSsUB96I7cfUemwPKYzxXu/HFjM0NBfuZO1B9pU0LS2KxnxtKxQfXLEX64WC4cBJUN0ksMosCUbMsF4/iYQngy9B4chTsvyoqAMsoL8pvwyfELFA4L0lZyVpTZUuXSlW8IvR/H80GpdKDU6im0hx1LlC4in46URV3dtHgLlAyuveYrLHLHfIpRIWWM52Ks6yn/P0nAOAXB0EZXZDQcr8AAAAASUVORK5CYII=" alt=""/>
                                        <div>折叠收起</div>
                                    </div>
                                </div>
                            </Accordion.Panel>
                        </Accordion>
                    </div>

                    <div className="accordion-box">
                        <Accordion accordion openAnimation={{}} className="my-accordion" activeKey="tab4" onChange={(e)=>this.showPanel4("panelKey4")}>
                            <Accordion.Panel  header={<div><img src={img11} alt=""/></div>} key={panelKey4}>
                                <div className="my-accordion-main">
                                    <div className="my-accordion-title">ID.设计创新</div>
                                    <div>
                                        ID.家族的设计不仅会考虑到汽车驾乘者本身，也会考虑到与周围所有的交通参与者和谐相处，在ID. Vizzion概念车上，展示了一种用光在地上投射出斑马线对设计，通过这种设计创新，让车辆与行人等弱势交通参与者，建立起清晰，明确，有效的沟通。
                                        <img src={img12} alt=""/>
                                    </div>
                                    <div className="hide-panel" onClick={()=>this.showPanel4("panelKey4")}>
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

export default withRouter(Design)