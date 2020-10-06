import React from "react";
import {Link, withRouter} from "react-router";
import "./Experience.scss"
import img1 from "../../static/techcampaign/20d43f6.jpg"
import img2 from "../../static/techcampaign/4025d35.png"
import img3 from "../../static/techcampaign/experience1.jpg"
import img4 from "../../static/techcampaign/experience2.jpg"
import img5 from "../../static/techcampaign/experience3.jpg"
import img6 from "../../static/techcampaign/id-interior.jpg"
import img7 from "../../static/techcampaign/SeamlessDesign.jpg"
import img8 from "../../static/techcampaign/5ff8937.png"
import img9 from "../../static/techcampaign/386887f.jpg"
import img10 from "../../static/techcampaign/a9af645.jpg"

import img11 from "../../static/techcampaign/experience4.jpg"
import img12 from "../../static/techcampaign/experience5.jpg"
import img13 from "../../static/techcampaign/experience6.jpg"


import HeaderNav from "../../components/HeaderNav/HeaderNav";
import {Accordion} from "antd-mobile";

class Experience extends React.Component {
    constructor (props) {
        super(props)
        this.state={
            panelKey1:null,
            panelKey2:null,
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

    render() {
        const {panelKey1,panelKey2} =this.state;
        return (
            <div className="experience">
                <HeaderNav transparent={true} isLight={true} goBack={()=>this.props.router.replace("/techcampaign")} title={
                    <div className="header-menu">
                        <div className="item">
                            <Link to="/techcampaign/intelligence">智能</Link>
                        </div>
                        <div className="item">
                            <Link to="/techcampaign/design">设计</Link>
                        </div>
                        <div className="item active">
                            驾乘体验
                            <div className="line"></div>
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
                                    <div className="my-accordion-title">ID.R：竞逐未来</div>
                                    <div>
                                        大众ID.R的诞生，充分证明电动汽车一样可以充满激情和魅力；通过ID.R，大众汽车展示了其在电驱动系统，电池，充电技术，材料空气动力学设计等一系列强大的电驱技术储备；ID.R在研发阶段，已经大量的运用到ID.量产车的技术，同时也体现了很多ID.量产车的技术理念 。
                                        <img src={img4} alt=""/>
                                    </div>
                                    <div className="my-accordion-title m-t-20">低重心</div>
                                    <div>
                                        得益于全新MEB电驱平台革命性的架构特点，ID.家族的模块化电池组被置于车辆底部靠近中央的位置，在确保车辆低重心的同时，同时可实现均衡的前后配重比，从而获得优异的动态行驶表现。
                                        <img src={img5} alt=""/>
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
                            <Accordion.Panel  header={<div><img src={img11} alt=""/></div>} key={panelKey2}>
                                <div className="my-accordion-main">
                                    <div className="my-accordion-title">灵活转向</div>
                                    <div>
                                        同样得益于全新MEB智能电驱平台革命性的架构，ID.家族具有长轴距，短前后悬的特点，从而实现更加灵活的转向。
                                        <img src={img12} alt=""/>
                                    </div>
                                    <div className="my-accordion-title m-t-20">高效电驱系统</div>
                                    <div>
                                        ID.家族电驱系统紧凑，高效，一个非常生动的例子是你甚至可以在一个普通大小的运动挎包内，装下高达200马力的电驱系统，另一方面，电驱系统在加速开始阶段就可以获得高扭矩峰值，让加速体验更加自如与畅快淋漓。
                                        <img src={img13} alt=""/>
                                    </div>
                                    <div className="hide-panel" onClick={()=>this.showPanel2("panelKey2")}>
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

export default withRouter(Experience)