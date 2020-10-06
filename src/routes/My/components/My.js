import React from 'react'
import PropTypes from 'prop-types'
import "../style/My.scss"
import {Link, withRouter} from "react-router";

import logo from "../../../static/icon/logo-icon.png"
import search from "../../../static/icon/search.png"
import collectionIcon from "../../../static/icon/collection-icon.png"

import settingIcon from "../../../static/icon/my/icon_Settings.png"
import idValue from "../../../static/icon/my/id_value.png"
import myInfo from "../../../static/icon/my/my_info.png"
import myLive from "../../../static/icon/my/my_live.png"
import myPost from "../../../static/icon/my/my_post.png"
import myActivity from "../../../static/icon/my/my_activity.png"
import Menu from "../../../components/Menu/Menu";
import Login from "../../../components/Login/Login";
import {Modal, Toast} from "antd-mobile";
import Utils from "../../../utils/utils";



class My extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.getMemberInfo();
        this.props.getQuestionGet();
        this.state={
            showMenu:true,
            scrollTop:0,
            selectAnswer:null,
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.scrollChange)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollChange)
    }

    scrollChange = (e) => {
        const sT = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
            || window.pageYOffset
            || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        const {scrollTop} =this.state;
        if(scrollTop > sT || sT === 0 ){
            this.setState({
                showMenu:true,
                scrollTop:sT
            })
        }else {
            this.setState({
                showMenu:false,
                scrollTop:sT
            })
        }
    }
    selectAnswer(selectAnswer){
        this.setState({
            selectAnswer:selectAnswer
        })
    }
    answerQuestion(id,key){
        let params= {
            "answerKey": key,
            "questionId": id
        };
        this.props.questionSubmit(params).then(res=>{
            this.props.getQuestionGet();
        }).catch(err=>{
            this.props.getQuestionGet();
        });
    }
    render() {
        const { member,isShowLoginModal,getMemberInfo,getQuestionGet } = this.props;
        const {selectAnswer} = this.state;
        let info = member.info;
        let question = member.question;
        let isLogin = info && info.nickname?true:false;
        return (
            <div className="my">
                <Menu unfold={this.state.showMenu}/>
                <Login {...this.props} onClose={()=>{
                    getMemberInfo();
                    getQuestionGet();
                }}/>
                {question && question.id && <Modal
                    visible={question && question.id}
                    transparent
                    onClose={()=>this.answerQuestion(question.id,null)}
                    className="question-modal"
                >
                    <div className="title">
                        每日问答赢礼品
                    </div>
                    <div className="content">
                        <div className="icon">
                            问
                        </div>
                        <div className="text">
                            {question.questionName}
                        </div>
                    </div>
                    <div className="answer">
                        {
                            question.itemList.map((item,index)=>{
                                return  <div  key={item.answerKey} className={item.answerKey===selectAnswer?"active":""}>
                                    <div className="item" onClick={()=>this.selectAnswer(item.answerKey)}>
                                        {item.answerValue}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="foot">
                        <button className="btn" onClick={()=>this.answerQuestion(question.id,selectAnswer)}>
                            确定
                        </button>
                    </div>
                </Modal>}
                <div className="my-info-main">
                    <div className="my-header">
                        <img className="my-header-logo" src={logo} alt=""/>
                        <Link to="/search"><img className="my-header-search" src={search} alt=""/></Link>
                    </div>
                    <div className="my-body-head">
                        {isLogin?<div onClick={()=>this.props.router.push({
                            pathname:"/myInfo",
                        })}>
                            <div className="my-body-head-portrait-box" style={{background:Utils.getUserBackground(info.valueLevel)}}>
                                <img src={info.profilePhoto} alt="" className="my-body-head-portrait"/>
                                {Utils.getUserLevelImg(info.valueLevel,"my-body-head-portrait-icon")}
                            </div>
                            <div className="my-body-head-name">{info.nickname}</div>
                            <div className="my-body-head-id">ID No.{info.idNumber}</div>
                            <div className="my-body-head-praise">
                                <img src={collectionIcon} alt=""/>
                                获赞 {info.liked}
                            </div>
                        </div>:<div className="my-body-head-login" onClick={()=>isShowLoginModal(true)}>
                            <img src="https://id-oss.vw.com.cn/attach/default_avatar.jpg"  className="my-body-head-portrait" alt="登录/注册"/>
                        </div>}
                    </div>
                </div>
                <div className="my-body">
                    <div className="my-body-content">
                        <ul className="my-menu">
                            <li onClick={()=>isLogin?this.props.router.push({
                                pathname:"/myIdValue",
                            }):null}>
                                <div>
                                    <img src={idValue} alt="" className="my-menu-icon"/>
                                    <span>我的ID.值</span>
                                </div>
                                <div>
                                    {info && info.idValue}
                                </div>
                            </li>
                            <li onClick={()=>isLogin?this.props.router.push({
                                pathname:"/myLike",
                            }):null}>
                                <div>
                                    <img src={myLive} alt="" className="my-menu-icon"/>
                                    <span>我的喜欢</span>
                                </div>
                            </li>
                            <li onClick={()=>isLogin?this.props.router.push({
                                pathname:"/myPost",
                            }):null}>
                                <div>
                                    <img src={myPost} alt="" className="my-menu-icon"/>
                                    <span>我的发布</span>
                                </div>
                            </li>
                            <li onClick={()=>isLogin?this.props.router.push({
                                pathname:"/myActivity",
                            }):null}>
                                <div>
                                    <img src={myActivity} alt="" className="my-menu-icon"/>
                                    <span>我的活动</span>
                                </div>
                            </li>
                            {/*<li onClick={()=>isLogin?this.props.router.push({*/}
                            {/*    pathname:"/myChest",*/}
                            {/*}):null}>*/}
                            {/*    <div>*/}
                            {/*        <img src={chestIcon} alt="" className="my-menu-icon"/>*/}
                            {/*        <span>百宝箱</span>*/}
                            {/*    </div>*/}
                            {/*</li>*/}
                            <li onClick={()=>isLogin?this.props.router.push({
                                pathname:"/myInfo",
                            }):null}>
                                <div>
                                    <img src={myInfo} alt="" className="my-menu-icon"/>
                                    <span>个人信息管理</span>
                                </div>
                            </li>
                            <li onClick={()=>this.props.router.push({
                                pathname:"/setting",
                            })}>
                                <div>
                                    <img src={settingIcon} alt="" className="my-menu-icon"/>
                                    <span>设置与反馈</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(My)
My.propTypes = {
    member: PropTypes.object.isRequired,
    getMemberInfo: PropTypes.func.isRequired,
}

