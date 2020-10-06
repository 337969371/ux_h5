import React from 'react'
import { withRouter } from 'react-router'
import './IdFamily.scss'

import HeaderNav from "../../components/HeaderNav/HeaderNav";
import img1 from "../../static/idFamily/img-1.png"
import img2 from "../../static/idFamily/img-2.png"
import img3 from "../../static/idFamily/img-3.png"
import img4 from "../../static/idFamily/img-4.png"
import img5 from "../../static/idFamily/img-5.png"
import img6 from "../../static/idFamily/img-6.png"
import img7 from "../../static/idFamily/img-7.png"
import img8 from "../../static/idFamily/img-8.png"
import LazyLoad from "react-lazyload";



class IdFamily extends React.Component {
    constructor (props) {
        super(props);
        this.Timer=null;
        this.state={
            headImgTo:2,
            isMove:false,
        }
    }
    componentDidMount() {
        setTimeout(()=>{
            let wWidth = window.innerWidth;
            let headImg = document.getElementById("headImg");
            let width = headImg.scrollWidth;
            this.Timer = setInterval(()=>{
                let {headImgTo,isMove} =this.state;
                if(!isMove){
                    headImg.scrollTo(headImgTo,0);
                    this.setState({
                        headImgTo:headImgTo +2
                    })
                }
                if(headImgTo+wWidth >= width){
                    clearInterval(this.Timer);
                }
            },20);
        },1000)
    }
    componentWillUnmount() {
        clearInterval(this.Timer);
    }
    handleTouchStart(e){
        this.startY = e.touches[0].clientY || 0;
        this.setState({
            isMove:true
        })
    }
    handleTouchMove(e){
        this.endY = e.touches[0].clientX || 0;
    }
    handleTouchEnd(e){
        const {headImgTo} =this.state;
        this.setState({
            headImgTo:parseInt(this.startY - this.endY + headImgTo) || 0,
            isMove:false
        })
    }
    render () {
        return (
            <div className='id-family'>
                <HeaderNav transparent={true} {...this.props}/>
                <div className="heed" id="headImg" onTouchStart={(e)=>this.handleTouchStart(e)} onTouchEnd={(e)=>this.handleTouchEnd(e)} onTouchMove={(e)=>this.handleTouchMove(e)}>
                    <img src={img1} alt=""/>
                </div>
                <div className="container-1">
                    <div className="title">
                        ID. 自我而始
                    </div>
                    <div className="text">
                        越来越多的出行工具，在向智能进化，<br/>
                        而ID. 让智能再进化，让生活更简单。<br/>
                        超越以往的MEB智能平台，<br/>
                        将其优秀基因，完美赋予ID. 家族。<br/>
                        让每一台车不仅天生智慧，<br/>
                        且充满个性，又兼顾人性。<br/>
                        马上种草一辆ID.<br/>
                        开启智能时代出行体验。

                    </div>
                    <div className="foot">
                        兼具SUV优势和轿跑性能的<br/>
                        <span>跨界多用途汽车</span>
                    </div>
                </div>
                <div className="container-2">
                    <LazyLoad unmountIfInvisible={true}>
                        <div className="box">
                            <img src={img2} alt=""/>
                        </div>
                    </LazyLoad>
                </div>
                <div className="container-3">

                    代表着最高级别创新与<br/>
                    环保电动出行的<br/>
                    <span className="s80">
                    未来ID. 家族全新旗舰车型
                    </span>
                </div>
                <div className="container-2">
                    <LazyLoad unmountIfInvisible={true}>
                        <div className="box">
                            <img src={img3} alt=""/>
                        </div>
                    </LazyLoad>
                </div>
                <div className="container-3">
                    兼顾家庭与商务的<br/>
                    <span className="s80">全新纯电动</span><span className="bold">SUV</span>
                </div>
                <div className="container-2">
                    <LazyLoad unmountIfInvisible={true}>
                        <div className="box">
                            <img src={img4} alt=""/>
                        </div>
                    </LazyLoad>
                </div>
                <div className="container-3">
                    基于MEB平台打造的<br/>
                    <span className="bold">ID. </span><span className="s80">家族首款概念车</span>
                </div>
                <div className="container-2">
                    <LazyLoad unmountIfInvisible={true}>
                        <div className="box">
                            <img src={img5} alt=""/>
                        </div>
                    </LazyLoad>

                </div>
                <div className="container-3">
                    提供舒适而宽敞的驾乘体验<br/>
                    <span className="s80">新一代纯电厢型车</span>
                </div>
                <div className="container-2">
                    <LazyLoad unmountIfInvisible={true}>
                        <div className="box">
                            <img src={img6} alt=""/>
                        </div>
                    </LazyLoad>
                </div>
                <div className="container-3">
                    电驱技术领域技术优势与<br/>
                    赛车运动的激情魅力融合<br/>
                    <span className="bold">ID.</span>  <span className="s80">家族的赛车代表</span>
                </div>
                <div className="container-2">
                    <LazyLoad unmountIfInvisible={true}>
                        <div className="box">
                            <img src={img7} alt=""/>
                        </div>
                    </LazyLoad>
                </div>
                <div className="container-3">
                    适用于夏季、沙滩、城市的<br/>
                    <span className="s80">零排放高科技车型</span>
                </div>
                <div className="container-2">
                    <LazyLoad unmountIfInvisible={true}>
                        <div className="box">
                            <img src={img8} alt=""/>
                        </div>
                    </LazyLoad>
                </div>
            </div>
        )
    }
}

export default withRouter(IdFamily)
