import React from 'react'
import {Modal, Toast, InputItem} from "antd-mobile";
import "./LogoutModal.scss"
import {postC, postCD} from "../../utils/api";


export default class LogoutModal extends React.Component{
    constructor (props) {
        super(props)
        this.state={
            value:"",
            count:60,
            hasError:false,
            hasErrorCode:false,
            code:"",
        }
    }

    componentDidMount() {

    }
    ok(){
        const { code, hasErrorCode} = this.state;
        if(hasErrorCode || !code){
            Toast.info('请输入正确的验证码');
            return false;
        }
        postC('login/remove', {
            validCode:code.replace(/\s/g, ''),
        })
            .then((response)=>{
                Toast.info("注销成功");
                localStorage.removeItem("token");
                window.location.href="/me";
            })
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
        let {count}= this.state;
        if(count != 60 ){
            return false;
        }
        this.countDown();
        postC('login/sendLogoutValidCode',{}).then((res=>{
            Toast.info('发送成功');
        }))

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


    render() {
        const { show, onClose } =this.props;
        const {  hasErrorCode,count} = this.state;
        return (
            <Modal
                visible={show}
                popup={true}
                onClose={()=>onClose()}
                animationType="slide"
                className="logout-action-modal"
                wrapClassName="wrap-action-modal"
                title={<div className="modal-title">账号注销</div>}
            >
                <div>
                    <div className="describe">
                        确认注销后，您的账户信息将被全部删除，无法找回，是否确认注销？
                    </div>
                    <div className="phone-item">
                        <InputItem
                            type="number"
                            placeholder="验证码"
                            error={hasErrorCode}
                            onErrorClick={this.onErrorClickCode}
                            onChange={this.onChangeCode}
                            extra={count==60?<div className="login-content-item-sms" onClick={()=>this.sendSMS()}>获取验证码</div>:<div>{count}s重新发送</div>}
                            value={this.state.code}
                        />
                    </div>
                </div>

                <div className="action-modal-btn-main">
                    <button className="action-modal-cancel-btn" onClick={()=>onClose()}>
                        取消
                    </button>
                    <button className="action-modal-btn" onClick={()=>this.ok()}>
                        注销
                    </button>
                </div>
            </Modal>
        );
    }
}
