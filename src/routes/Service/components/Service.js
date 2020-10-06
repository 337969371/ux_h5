import React from 'react'
import PropTypes from 'prop-types'
import "../style/service.scss"
import moment from "moment";
import backIcon from "../../../static/icon/back-icon.png";


import {ActivityIndicator, Tabs} from "antd-mobile";
import Login from "../../../components/Login/Login";
import HeaderNav from "../../../components/HeaderNav/HeaderNav";
import Empty from "../../../components/Empty/Empty";




export default class Service extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.clean();
        this.state={
            pageNum:0,
            pageSize:10,
            refreshing:false,
            scrollTop:0,
        }
    }
    componentDidMount() {
        this.getData();
        window.addEventListener('scroll', this.scrollChange)
    }
    getData(){
        const { pageNum , pageSize} =this.state;
        this.props.getList({
            "pageNum": pageNum,
            "pageSize": pageSize,
        }).then(res=>{
            this.setState({
                refreshing:false
            })
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollChange)
    }
    scrollChange = (e) => {
        const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
            || window.pageYOffset
            || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        let h= document.body.clientHeight - document.documentElement.clientHeight;
        const { refreshing, pageNum,} = this.state;
        const {service} = this.props;
        this.setState({
            scrollTop:scrollTop
        })
        if( h === scrollTop && scrollTop>0 && !refreshing){
            if(!service.isFoot){
                this.setState({
                    refreshing:true,
                    pageNum:pageNum+1
                },()=>this.getData())
            }
        }
    }
    render() {
        const {service,isShowLoginModal} = this.props;
        const {refreshing,scrollTop} =this.state
        return (
            <div className="service">
                <HeaderNav  transparent={true} isLight={true} {...this.props} />
                <div className="my-info">
                    <div className="my-info-header">
                    </div>
                    <div className="my-info-title">在线客服</div>
                </div>
                <Login {...this.props} />
                <div className="main">
                    <div className="service-body-header"></div>
                    <div className="service-body">
                        {
                            service.records &&  service.records.map((item,index)=>{
                                return (
                                    <div className="service-item" key={index} onClick={()=>
                                        this.props.router.push({
                                            pathname:"/serviceDetail",
                                            query: {
                                                id:item.id,
                                            }
                                        })
                                    }>
                                        <div className="head">
                                            <div className="time">
                                                {moment(item.gmtCreate).format("YYYY-MM-DD")}
                                            </div>
                                            <div className="status">
                                                {item.status==="0" && <span className="no">未回复</span>}
                                                {item.status==="1" && <span className="yes">已回复</span>}
                                                {item.status==="2" && <span className="no">已关闭</span>}
                                            </div>
                                        </div>
                                        <div className="title">
                                            {item.title}
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {(service.records &&  service.records.length===0) && <Empty/>}
                        {refreshing && <div className="more-loading"><ActivityIndicator text="正在加载" /></div>}
                    </div>
                </div>
                <button className="btn-blue send-btn" onClick={()=>{
                    this.props.router.push({
                        pathname:"/servicePush"
                    })
                    stm_clicki('send', 'event', '按钮', '点击', "发起咨询", "");
                }}>
                    发起咨询
                </button>
            </div>
        );
    }
}
Service.propTypes = {
    service:PropTypes.object.isRequired,
    getList:PropTypes.func.isRequired,
    clean:PropTypes.func.isRequired,
}

