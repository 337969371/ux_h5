import React from 'react'
import {Link, withRouter} from 'react-router'
import './IntroduceCar.scss'
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import img2 from "../../static/introduceCar/img-2.png";
import img3 from "../../static/introduceCar/img-3.png";
import img4 from "../../static/introduceCar/img-4.png";
import img5 from "../../static/introduceCar/img-5.png";
import LazyLoad from "react-lazyload";
import RGBfnE from "../../static/introduceCar/img-header.png";


class IntroduceCar extends React.Component {
    constructor (props) {
        super(props)
    }
    componentDidMount() {
        setTimeout(()=>{
            document.getElementById("imgBox").scrollTo(420,0)
        },1000)
    }
    render () {
        let h = window.innerHeight+10;
        return (
            <div className='introduce-car'>
                <HeaderNav transparent={true} {...this.props}/>
                <LazyLoad height={300}>
                    <div className="introduce-car-header">
                        <img className="img1" src={RGBfnE} alt=""/>
                        <img className="img2" src={img2} alt=""/>
                        <div className="rect animate__animated animate__zoomIn"></div>
                    </div>
                </LazyLoad>
                <LazyLoad  height={480}>
                    <div className="introduce-car-content1">
                        <div className="bg">
                            <div className="f20">
                                你好，这里是<span className="s80">ID.</span><br/>
                                我们正在开启一个新的时代，<br/>
                                让智能、创新、可持续的清洁电动<br/>
                                出行，成为每一个人触手可得的<br/>
                                生活方式。<br/>
                            </div>
                            <div className="f16">
                                这样的时代属于每一个人<br/>
                                每一个相信自己<br/>
                                可以改变游戏规则的你、我、TA：<br/>
                                期待更精彩的生活，<br/>
                                期待可靠的科技体验，<br/>
                                乐于向“常规”发问，<br/>
                                甚至重新定义“常规”，<br/>
                            </div>
                            <div className="f20">
                                拥抱可持续的生活方式，<br/>
                                不断进化为更好的“我”。
                            </div>
                        </div>
                        <div className="main">
                            <LazyLoad unmountIfInvisible={true}>
                                <div className="f20 animate__animated animate__fadeInUp">
                                    你好，这里是<span className="s80">ID.</span><br/>
                                    我们正在开启一个新的时代，<br/>
                                    让智能、创新、可持续的清洁电动<br/>
                                    出行，成为每一个人触手可得的<br/>
                                    生活方式。<br/>
                                    <br/>
                                </div>
                            </LazyLoad>
                            <LazyLoad unmountIfInvisible={true}>
                                <div className="f16 animate__animated animate__fadeInUp">
                                    这样的时代属于每一个人<br/>
                                    每一个相信自己<br/>
                                    可以改变游戏规则的你、我、TA：<br/>
                                    期待更精彩的生活，<br/>
                                    期待可靠的科技体验，<br/>
                                    乐于向“常规”发问，<br/>
                                    甚至重新定义“常规”，<br/>
                                    <br/>
                                </div>
                            </LazyLoad>
                            <LazyLoad unmountIfInvisible={true}>
                                <div className="f20 animate__animated animate__fadeInUp">
                                    拥抱可持续的生活方式，<br/>
                                    不断进化为更好的“我”。
                                </div>
                            </LazyLoad>
                        </div>
                    </div>
                </LazyLoad>
                <div className="introduce-car-content2">
                    <div className="img-box" id="imgBox">
                        <img src={img3} alt=""/>
                    </div>
                    <img className="img2" src={img2} alt=""/>
                </div>
                <div className="introduce-car-content3">
                    <div className="f20 bold">
                        ID. 就是为了这样的每个人而生。
                    </div>
                    <div className="middle">
                        当对电动出行的期待，<br/>
                        不止于更环保的从油到电，<br/>
                        而是更加智能的未来出行体验，<br/>
                        我们打造出全新MEB智能平台，<br/>
                        每个ID. 家族成员都能够<br/>
                        随科技创新而不断进化，<br/>
                        满足未来不同时代、不同趋势下<br/>
                        多样的出行体验需求。<br/>

                    </div>
                    <div className="f20">
                        电动出行的“常规”，<br/>
                        正由<span className="bold">ID. </span> 重新定义。<br/>
                        我的进步，永不止步。
                    </div>
                </div>
                <div className="introduce-car-content4">
                    <img src={img4} alt=""/>
                    <LazyLoad unmountIfInvisible={true}>
                        <img className="img2 animate__animated animate__slideInLeft" src={img2} alt=""/>
                    </LazyLoad>
                </div>
                <div className="introduce-car-content5">
                    ID. 家族，让智能生活变得更加简单。<br/>
                    <div className="img">
                        <img src={img5} alt=""/>
                    </div>
                    为自我而骄傲，为自我而喝彩。

                </div>
                <div className="introduce-car-content6">
                    <span className="bold">ID. </span>自我而始
                </div>
                <Link to="/brand/idFamily">
                    <div className="introduce-car-content7">

                        <img  className="my-zoom-img-bg" src="https://id-oss.dmqgo.com/attach/home-img-7.jpg" alt=""/>

                        <div className="my-zoom-animate-main">
                            <LazyLoad unmountIfInvisible={true}>
                                <div className="my-zoom_zone_animate">
                                    <img  src="https://id-oss.dmqgo.com/attach/home-img-7.jpg" alt='' />
                                </div>
                            </LazyLoad>
                        </div>
                        <LazyLoad unmountIfInvisible={true}>
                            <div className="main animate__animated animate__fadeInUp">
                                <div className="text1">种草一台ID.</div>
                                <div className="text2">每台都是狠角色</div>
                            </div>
                        </LazyLoad>
                    </div>
                </Link>
            </div>
        )
    }
}

export default withRouter(IntroduceCar)
