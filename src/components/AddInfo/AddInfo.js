import React from 'react'
import { withRouter } from 'react-router'
import {Checkbox, InputItem, Modal, Toast} from 'antd-mobile';
import "./AddInfo.scss"
import logo from "../../static/icon/logo-icon.png";
import userIcon from "../../static/icon/user-icon.png";
import emailIcon from "../../static/icon/email-icon.png";

class AddInfo extends React.Component {
    constructor (props) {
        super(props)
        this.state={
            hasError:false,
            hasErrorCode:false,
            phone: '',
            code:"",
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
        if (code.replace(/\s/g, '').length < 11) {
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
    render() {
        const { globalData,isShowAddInfoModal } =this.props;
        return (
            <Modal
                className="login-modal"
                popup
                title={ <div className="login-logo" onClick={()=>isShowAddInfoModal(false)}><img src={logo} alt=""/></div>}
                visible={globalData.showAddInfo}
                onClose={()=>isShowAddInfoModal(false)}
                animationType="slide-up"
            >
                <div className="login-body">
                    <div className="login-content">
                        <h4>完善信息</h4>
                        <div className="login-content-item">
                            <InputItem
                                type="phone"
                                labelNumber={2}
                                placeholder="输入你的昵称"
                                error={this.state.hasError}
                                onErrorClick={this.onErrorClick}
                                onChange={this.onChange}
                                value={this.state.phone}
                            ><img className="add-info-user-icon" src={userIcon} alt=""/></InputItem>
                        </div>
                        <div className="login-content-item">
                            <InputItem
                                type="phone"
                                labelNumber={2}
                                placeholder="输入你的邮箱（选填）"
                                error={this.state.hasErrorCode}
                                onErrorClick={this.onErrorClickCode}
                                onChange={this.onChangeCode}
                                value={this.state.code}
                            ><img className="add-info-email-icon"  src={emailIcon} alt=""/></InputItem>
                        </div>
                        <div className="add-info-sex">
                            <Checkbox>男</Checkbox>
                            <Checkbox>女</Checkbox>
                        </div>
                        <div className="login-content-item-btn">
                            <button className="btn-big" nClick={()=>this.props.isShowAddInfoModal(false)}>开始</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

}
export default withRouter(AddInfo)