import React from 'react'
import PropTypes from 'prop-types'
import "../style/BrandMeb.scss"
import { withRouter} from "react-router";


import img1 from  "../../../static/brandMeb/header.jpg"
import img3 from  "../../../static/world/003.png"
import img4 from  "../../../static/world/004.png"
import car1 from  "../../../static/brandMeb/car-1.png"
import car2 from  "../../../static/brandMeb/cat-2.png"
import HeaderNav from "../../../components/HeaderNav/HeaderNav";
import InputSlider from 'react-input-slider';



class BrandMeb extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            showMenu:true,
            scrollTop:0,
            x:100,
        }
    }
    handleChange = pos => {
        this.setState({
            x: pos.x,
        });
    };
    render() {
        let w = window.innerWidth-30;
        let h = parseInt((w/680)*460);
        return (
            <div className="world">
                <HeaderNav transparent={true} isLight={true} {...this.props}/>
                <div className="world-content">
                    <img src={img1} alt=""/>
                    <div className="world-content-1">
                        <h4>开创智慧出行新纪元<br/>智造美好生活</h4>
                        <div>
                            人类的每一次进步都离不开科技的发展，<br/>
                            科技也随着人的需求而不断被刷新。<br/>
                            ID. 家族创新的初衷并不是要改变世界，<br/>
                            而是让每个人的出行体验都变得更好，<br/>
                            更加个性化。<br/>
                            为此我们创造了MEB模块化电驱动平台。<br/>
                            作为100%电力驱动平台，<br/>
                            它能挖掘纯电动汽车的所有潜力，<br/>
                            打造最优续航里程、<br/>
                            性能和成本的全球化电动汽车家族。

                        </div>
                    </div>
                    <div className="world-content-2">
                        <div className="car-laminate" style={{width:w,height:h}}>
                            <img src={car2} alt=""/>
                            <div className="up" style={{width:this.state.x+'%'}}>
                                <img src={car1} alt=""/>
                            </div>
                            <div className="up-text">
                                <div>
                                    滑动车身
                                </div>
                                <div className="h">
                                    发现隐藏的智慧
                                </div>
                            </div>
                            <div className="up-active">
                                <InputSlider
                                    className="u-slider u-slider-x"
                                    axis="x"
                                    x={this.state.x}
                                    xmax={100}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="text">
                            <h4>智能</h4>
                            <div>
                                增强现实功能的抬头显示 ：可通过增强现实将前车距离标识、地点标识、转向指示等投影在驾驶员前方挡风玻璃。
                                <br/>  <br/>
                            </div>
                            <div>
                                智能灯光可交互功能：语音助手（主副驾）；充电状态；导航转向；启动车辆/关闭车辆；来电提示。
                                <br/>  <br/>
                            </div>
                            <div>
                                ID. 迎宾灯：可在10-15米内侦测到携带钥匙的人员并自动开启大灯对人员进行追光跟随。
                            </div>
                        </div>
                    </div>
                    <div className="world-content-3">
                        <img src={img3} alt=""/>
                        <div className="text">
                            <h4>设计</h4>
                            <div className="title">
                                外观
                            </div>
                            <div>
                                发光车标（车头/车尾）：配合前后横向贯穿式灯带的设计。
                                <br/>  <br/>
                                短前悬&短后悬：短的前后悬带来更长的轴距和更大的车内空间。
                            </div>
                            <br/>
                            <div className="title">
                                内饰
                            </div>
                            <div>
                                开始&暂停踏板：电门/刹车踏板上的设计元素，代表了电动车革命性的直觉驾驶体验。
                            </div>
                        </div>
                    </div>
                    <div className="world-content-2 world-content-4">
                        <img src={img4} alt=""/>
                        <div className="text">
                            <h4>驾驶体验</h4>
                            <div className="title">
                                性能
                            </div>
                            <div>
                                四轮驱动 ：可选装四轮电机，四驱带来更好的抓地力和操控性能。
                            </div>
                            <div className="title">
                                驾驶辅助模组
                            </div>
                            <div>
                                IQ. Drive：紧急情况辅助3.0<br/>
                                IQ. Drive：车道保持辅助<br/>
                                IQ. Drive：智能泊车辅助<br/>
                                IQ. Drive：遥控泊车辅助<br/>
                                IQ. Drive：可学习轨迹泊车<br/>
                            </div>
                        </div>
                    </div>
                    <div className="world-content-5">
                        <div className="title">
                            MEB模块化电驱动平台
                        </div>
                        <div>
                            标志性设计，释放想象力空间，搭载直观设备，智能数据互通，并实现了零排放。
                        </div>
                        {/*<div>*/}
                        {/*    在全球，MEB将成为车型销量最高的纯电动平台。至2025年，我们将在全球量产33款MEB车型。<br/>*/}
                        {/*    其中，将有近一半的车型来自中国。*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(BrandMeb)
BrandMeb.propTypes = {
    world: PropTypes.object.isRequired,
}

