import React from 'react'
import {Link, withRouter} from 'react-router'
import { Checkbox, InputItem, Toast, Modal } from 'antd-mobile';
import "./Login.scss"
import logo from "../../static/icon/logo-icon.png";
import {postC} from "../../utils/api";


class Login extends React.Component {
    constructor (props) {
        super(props)
        this.state={
            hasError:false,
            hasErrorCode:false,
            phone:'',
            code:"",
            agree:false,
            count:60,
        }
    }
    componentDidMount() {

    }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入正确的手机号');
        }
    }
    onChange = (phone) => {
        if (phone.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            phone,
        });
    }
    onChangeCode= (code) => {
        if (!(/^\d{6}$/.test(code))) {
            this.setState({
                hasErrorCode: true,
            });
        } else {
            this.setState({
                hasErrorCode: false,
            });
        }
        this.setState({
            code,
        });
    }
    onErrorClickCode= () => {
        if (this.state.hasErrorCode) {
            Toast.info('请输入正确的验证码');
        }
    }
    sendSMS(){
        let {phone,hasError,agree}= this.state;
        if(hasError || !phone){
            Toast.info('请输入正确的手机号');
            return false;
        }
        if(!agree){
            Toast.info('您还没有同意用户协议');
            return false;
        }
        let box = document.getElementById("cbox");
        box.style.display = "flex";
        new YpRiddler({
            expired: 10,
            mode: 'dialog',
            winWidth: 335,
            lang: 'zh-cn', // 界面语言, 目前支持: 中文简体 zh-cn, 英语 en
            container: document.getElementById('cbox'),
            appId: 'fa4a7a0c2728415e88afcd8fc8715d35',
            version: 'v1',
            onError: (param)=> {

            },
            onSuccess: (validInfo, close, useDefaultSuccess)=> {
                close();
                box.style.display = "none";
                this.countDown();
                postC('login/sendValidCode',{
                    mobile:phone.replace(/\s/g, ''),
                    type:"00"
                })
            },
            onFail: (code, msg, retry) =>{
                // 失败回调
                // alert('出错啦：' + msg + ' code: ' + code)
                retry()
            }
        })


    }
    countDown(){
        let t = setInterval(()=>{
            let num = this.state.count;
            if(num === 1){
                clearInterval(t);
                this.setState({
                    count:60
                })
            }else {
                this.setState({
                    count:num-1
                })
            }
        },1000);
    }
    login(){
        const { isShowLoginModal,onClose,location } =this.props;
        let {phone,hasError,hasErrorCode,code,agree}= this.state;
        if(hasError || !phone){
            Toast.info('请输入正确的手机号');
            return false;
        }
        if(hasErrorCode || !phone){
            Toast.info('请输入正确的验证码');
            return false;
        }
        if(!agree){
            Toast.info('您还没有同意用户协议');
            return false;
        }

        postC('login/login', {
            mobile: phone.replace(/\s/g, ''),
            validCode:code.replace(/\s/g, ''),
            channel:'1'
        })
            .then((response)=>{
                if(response['user-token']){
                    localStorage.setItem("token",response['user-token']);
                    stm_clicki('set','dimension1', response['customerId']);
                    stm_clicki('send', 'event', '登录页', '用户登录', '登录成功');
                    stm_clicki('del', 'dimension[0-9]{1,3}',true);
                    // 1-新  2-旧
                    if(response['flag']=== 1){
                        stm_clicki('set','metric1', "1");
                        stm_clicki('send', 'pageview', {'page': location.pathname, 'title': '登录'});
                        stm_clicki('del', 'metric[0-9]{1,3}',true);
                    }

                }
                isShowLoginModal(false);
                if(onClose){
                    onClose();
                }
            })
    }

    render() {
        const { globalData,isShowLoginModal } =this.props;
        const {count, agree, code, phone, hasError, hasErrorCode} =this.state;
        return (
            <Modal
                className="login-modal"
                popup
                maskClosable={true}
                title={ <div className="login-logo" onClick={()=>isShowLoginModal(false)}><img src={logo} alt=""/></div>}
                visible={globalData.showLogin}
                onClose={()=>isShowLoginModal(false)}
                animationType="slide-up"
            >
                <div className="login-body">
                    <div id="cbox"></div>
                    <div className="login-content">
                        <h4>登录注册</h4>
                        <div className="login-content-item">
                            <InputItem
                                type="phone"
                                labelNumber={3}
                                placeholder="手机号码"
                                error={hasError}
                                onErrorClick={this.onErrorClick}
                                onChange={this.onChange}
                                value={phone}
                            >+86</InputItem>
                        </div>
                        <div className="login-content-item">
                            <InputItem
                                maxLength={6}
                                type="number"
                                placeholder="验证码"
                                error={hasErrorCode}
                                onErrorClick={this.onErrorClickCode}
                                onChange={this.onChangeCode}
                                extra={count==60?<div className="login-content-item-sms" onClick={()=>this.sendSMS()}>获取验证码</div>:<div>{count}s重新发送</div>}
                                value={code}
                            />
                        </div>
                        <div className="login-content-item-agree">
                            <Checkbox data-seed="logId" checked={agree} onChange={e => this.setState({agree:e.target.checked})} />
                            <div className="login-content-agree">我已阅读并同意《<Link to="/agreement">个人信息隐私政策</Link>》，并且同意为我创建平台个人账户。</div>
                        </div>
                        <div className="login-content-item-btn">
                            <button  className="login-btn-big" onClick={()=>{
                                this.login();
                            }}>确定登录</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

}
export default withRouter(Login)