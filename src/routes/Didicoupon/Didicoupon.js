import React from "react";
import {Link, withRouter} from "react-router";
import "./Didicoupon.scss"
import img1 from "../../static/didi/UI_DiDi Coupon_20200928.jpg";
import start from "../../static/didi/start.png";
import result from "../../static/didi/result.png";
import logo from "../../static/icon/logo.png";
import hintText from "../../static/didi/hint-text.png";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import Login from "../../components/Login/Login";
import LongPress from "react-long";
import {ActivityIndicator, Toast} from "antd-mobile";



class Didicoupon extends React.Component {
    constructor (props) {
        super(props)
        this.state={
            step:1,
            animating:false,
            prizeCode:null, //中奖码 ,
            status:null //中奖结果 10-已中奖 20-未中奖 ,
        }
    }
    participation(){
        this.setState({
            animating:true,
        })
        this.props.participation().then(res=>{
            this.setState({
                animating:false,
                step:2,
                prizeCode:res.prizeCode, //中奖码 ,
                status:res.status //中奖结果 10-已中奖 20-未中奖 ,
            })
        }).catch(err=>{
            this.setState({
                animating:false,
            })
        });
        stm_clicki('send', 'event', '领取按钮', '点击', "领取", "");
    }
    copyTxt(text){
        console.log(text);
        if(typeof document.execCommand!=="function"){
            Toast.info("复制失败，请长按复制");
            return;
        }
        let dom = document.createElement("textarea");
        dom.value = text;
        dom.setAttribute('style', 'display: block;width: 1px;height: 1px;');
        document.body.appendChild(dom);
        dom.select();
        let result = document.execCommand('copy');
        document.body.removeChild(dom);
        if (result) {
            Toast.info("复制成功");
            return;
        }
        if(typeof document.createRange!=="function"){
            Toast.info("复制失败，请长按复制");
            return;
        }
        let range = document.createRange();
        let div=document.createElement('div');
        div.innerHTML=text;
        div.setAttribute('style', 'height: 1px;fontSize: 1px;overflow: hidden;');
        document.body.appendChild(div);
        range.selectNode(div);
        const selection = window.getSelection();
        if (selection.rangeCount > 0){
            selection.removeAllRanges();
        }
        selection.addRange(range);
        document.execCommand('copy');
        Toast.info("复制成功")
    }
    render() {
        const {step,prizeCode,status} = this.state;
        return (
            <div className="didi-coupon">
                <HeaderNav transparent={true}/>
                <Login {...this.props}/>
                <ActivityIndicator
                    toast
                    text="领取中..."
                    animating={this.state.animating}
                />
                <img src={img1} alt="" />
                <div className="head">
                    {step==1?<div>
                            <img src={start} alt=""/>
                            <div className="participation" onClick={()=>this.participation()}></div>
                        </div>
                        :<div>
                            <img src={result} alt=""/>
                            { status && <div className="result">
                                { status === "10" && <div>
                                    <LongPress
                                        time={500}
                                        onPress={(e) => {
                                            this.copyTxt(prizeCode);
                                            stm_clicki('send', 'event', '复制文本', '长按', "复制", "");
                                        }}
                                    >
                                        <div className="num" id="prizeCode">
                                            {prizeCode}
                                        </div>
                                    </LongPress>
                                    <div className="hint">
                                        点击复制
                                    </div>
                                </div>}
                                {status === "20" && <div className="no-lottery">
                                    活出简单，自<img src={logo} />而始
                                </div>}
                            </div>}
                        </div>}
                </div>
            </div>
        );
    }
}

export default withRouter(Didicoupon)