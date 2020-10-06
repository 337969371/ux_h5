import React from 'react'
import { withRouter } from 'react-router'
import '../style/ServicePush.scss'

import {Picker, List, Toast, ActivityIndicator, Modal} from "antd-mobile";
import PropTypes from "prop-types";
import Service from "../../Service/components/Service";
import HeaderNav from "../../../components/HeaderNav/HeaderNav";


class ServicePush extends React.Component {
    constructor (props) {
        super(props)
        this.state={
            isLogin:false,
            typeValue:null,
            title:null,
            content:null,
            loading:false,

        }
    }
    componentDidMount() {

    }
    onChangeType=(val)=>{
        this.setState({
            typeValue:val
        })
    }
    onChangeTitle(e){
        this.setState({
            title:e.target.value
        })
    }
    onChangeContent(e){
        console.log(e);
        this.setState({
            content:e.target.value
        })
    }
    push(){
        const {title,content,typeValue} = this.state;
        if(!title){
            Toast.info("请输入标题");
            return;
        }
        if(!typeValue){
            Toast.info("请选择类型");
            return;
        }
        if(!content){
            Toast.info("请输入问题描述");
            return;
        }
        let params = {
            content: content ,
            title: title ,
            type: typeValue[0]
        };
        this.setState({
            loading:true
        })
        this.props.push(params).then(res=>{
            this.setState({
                loading:false
            })
            Modal.alert("提交成功","我们将第一时间处理回复",[
                {
                    text:"关闭",
                    style:{
                        border:'1px solid rgba(16,17,80,1)',
                        height:'34px',
                        lineHeight:'34px',
                        borderRadius:'30px',
                        fontSize:'14px',
                        flex: 'inherit',
                        width: '110px',
                        margin: 'auto',
                        marginBottom: '20px'

                    },
                    onPress:()=>{
                        this.props.router.goBack();
                    }

                }
            ])
        }).catch(err=>{
            this.setState({
                loading:false
            })
        });
        stm_clicki('send', 'event', '按钮', '点击', "发起咨询", "");
    }
    render () {
        // qt_01:内容举报 qt_02:车辆咨询
        const type = [
            {
                key:"qt_01",
                label:<div className="label">内容举报</div>,
                value:"qt_01",
            },
            {
                key:"qt_02",
                label:<div className="label">ID社区价值观沟通</div>,
                value:"qt_02",
            },
            {
                key:"qt_03",
                label:<div className="label">社群功能及礼遇相关</div>,
                value:"qt_03",
            },
            {
                key:"qt_04",
                label:<div className="label">ID品牌资讯相关</div>,
                value:"qt_04",
            },
            {
                key:"qt_05",
                label:<div className="label">ID产品资讯相关</div>,
                value:"qt_05",
            },
            {
                key:"qt_06",
                label:<div className="label">ID技术与工艺相关</div>,
                value:"qt_06",
            }
        ]
        return (
            <div className='service-push'>
                <HeaderNav  transparent={true} isLight={true} {...this.props} />
                <div className="my-info">
                    <div className="my-info-header">
                    </div>
                    <div className="my-info-title">发起咨询</div>
                </div>
                { this.state.loading && <ActivityIndicator toast />}
                <div className="main">
                    <div className="service-push-item">
                        <input type="text" placeholder="问题标题" onChange={(e)=>this.onChangeTitle(e)}/>
                    </div>
                    <div className="service-push-item">
                        <Picker
                            data={type}
                            value={this.state.typeValue}
                            cols={1}
                            onChange={this.onChangeType}
                        >
                            <List.Item arrow="down"></List.Item>
                        </Picker>
                    </div>
                    <div className="service-push-item">
                  <textarea  placeholder="请在此处详细描述您的问题或意见建议" onChange={(e)=>this.onChangeContent(e)}>

                  </textarea>
                    </div>
                    <div className="footer-btn">
                        <button className="btn-blue" onClick={()=>this.push()}>确定</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ServicePush)

Service.propTypes = {
    push:PropTypes.func.isRequired,
}
