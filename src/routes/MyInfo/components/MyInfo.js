import React from 'react'
import PropTypes from 'prop-types'
import "../style/MyInfo.scss"
import { withRouter} from "react-router";
import Utils from "../../../utils/utils";
import ActionModal from "../../../components/ActionModal/ActionModal";
import HeaderNav from "../../../components/HeaderNav/HeaderNav";


class MyInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.getMemberInfo();
        this.state={
            showModal:false,
            title:null,
            value:null,
            type:null,

        }
    }
    componentDidMount() {
    }
    updateModal(title,value,type){
        this.setState({
            showModal:true,
            title:title,
            value:value,
            type:type
        })
    }
    closeModal(){
        this.setState({showModal:false});
        this.props.getMemberInfo();
    }

    render() {
        const { memberInfo } = this.props;
        const { showModal,title, value,type} = this.state;
        return (
            <div className="my">
                <HeaderNav  transparent={true} isLight={true} {...this.props} />
                {showModal && <ActionModal show={showModal}
                             onClose={()=>this.closeModal()}
                             title={title}
                             value={value}
                             type={type}
                />}
                <div className="my-info">
                    <div className="my-info-header">
                    </div>
                    <div className="my-info-title">个人信息</div>
                </div>

                <div className="my-body my-info-body">
                    <div className="my-body-content">
                        <ul className="my-menu">
                            <li>
                                <div>
                                    <span>ID.号</span>
                                </div>
                                <div>
                                    {memberInfo.idNumber}
                                </div>
                            </li>
                            <li onClick={()=>this.updateModal("昵称",memberInfo.nickname,"nickname")}>
                                <div>
                                    <span>昵称</span>
                                </div>
                                <div>
                                    <span>{memberInfo.nickname}</span>
                                </div>
                            </li>
                            <li onClick={()=>this.updateModal("头像",memberInfo.profilePhoto,"profilePhoto")}>
                                <div>
                                    <span>头像</span>
                                </div>
                                <div>
                                    <img className="my-menu-head-img" src={memberInfo.profilePhoto} alt=""/>
                                </div>
                            </li>
                            <li onClick={()=>this.updateModal("更换手机号",memberInfo.mobile,"mobile")}>
                                <div>
                                    <span>手机号</span>
                                </div>
                                <div>
                                    <span>{memberInfo.mobile}</span>
                                </div>
                            </li>
                            <li onClick={()=>this.updateModal("性别",memberInfo.sex,"sex")}>
                                <div>
                                    <span>性别</span>
                                </div>
                                <div>
                                    <span className="my-menu-sex">{Utils.sex(memberInfo.sex)}</span>
                                </div>
                            </li>
                            <li onClick={()=>this.updateModal("邮箱",memberInfo.email,"email")}>
                                <div>
                                    <span>邮箱</span>
                                </div>
                                <div>
                                    <span>{memberInfo.email}</span>
                                </div>
                            </li>
                            <li onClick={()=>this.updateModal("地址",memberInfo,"address")}>
                                <div>
                                    <span>地址</span>
                                </div>
                                <div className="address-item-text">
                                    <span>{memberInfo.fullAddress}</span>
                                </div>
                            </li>
                            <li onClick={()=>this.updateModal("收件人",memberInfo.name,"name")}>
                                <div>
                                    <span>收件人</span>
                                </div>
                                <div>
                                    <span>{memberInfo.name}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(MyInfo)
MyInfo.propTypes = {
    memberInfo: PropTypes.object.isRequired,
    getMemberInfo: PropTypes.func.isRequired,
}

