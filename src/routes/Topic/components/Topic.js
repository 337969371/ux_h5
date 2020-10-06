import React from 'react'
import PropTypes from 'prop-types'
import "../style/Topic.scss"
import { withRouter} from "react-router";
import LazyLoad from 'react-lazyload';
import fireImg from "../../../static/icon/fire-line-icon.png"
import moment from "moment";
import Utils from "../../../utils/utils";
import {ActivityIndicator} from "antd-mobile";
import HeaderNav from "../../../components/HeaderNav/HeaderNav";


class Topic extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.clean();
        this.state={
            pageNum:1,
            type:this.props.location.query.type,
            refreshing:false,
        }
    }
    componentDidMount() {
        this.getData();
        window.addEventListener('scroll', this.scrollChange)
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
        const { topic } = this.props;
        if( h === scrollTop && scrollTop>0 && !refreshing){
            if(!topic.isFoot){
                this.setState({
                    refreshing:true,
                    pageNum:pageNum+1
                },()=>this.getData())
            }
        }
    }
    getData(){
        const { pageNum,type } =this.state;
        this.props.getDataList({
            "pageNum": pageNum,
            "pageSize": 10,
            "type": type
        }).then((res)=>{
            this.setState({
                refreshing:false
            })
        })
    }

    render() {
        const { topic } = this.props;
        const { type, refreshing } =this.state;
        return (
            <div className="topic">
                <HeaderNav  transparent={true} {...this.props} />
                <div className="topic-title">
                    所有话题
                </div>
                <div className="topic-body">
                    {
                        topic.records && topic.records.map((item,index)=><LazyLoad key={index} height={251}>
                            <div className="topic-item" onClick={()=>{
                                if(item.subTitle!=="敬请期待"){
                                    this.props.router.push({
                                        pathname:"/topicDetail",
                                        query: {
                                            id:item.id,
                                            tagCode:item.tagCode,
                                            type:type
                                        }
                                    })
                                    stm_clicki('send', 'event', '页面跳转', '点击', "活动详情-"+item.title, "");
                                }
                            }}>
                                <div className="topic-item-background">
                                    <img src={item.image} alt=""/>
                                </div>
                                <div className="topic-item-body">
                                    <div className="topic-item-head">
                                        <div className="topic-item-user">
                                            <img src={item.profilePhoto} alt=""/>
                                            <div className="topic-item-user-info">
                                                <div>{item.nickname}</div>
                                                <div>{moment(item.gmtCreate).format("MM/DD")}</div>
                                            </div>
                                        </div>
                                        <div className="topic-item-num">
                                            <img src={fireImg} alt=""/>{Utils.getNumString(item.likeCount)}
                                        </div>
                                    </div>
                                    <div className="topic-item-title">
                                        {item.title}
                                        <div className="sub">
                                            {item.subTitle}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </LazyLoad>)
                    }
                </div>
                {refreshing && <div className="more-loading"><ActivityIndicator text="正在加载" /></div>}
            </div>
        );
    }
}
export default withRouter(Topic)
Topic.propTypes = {
    topic: PropTypes.object.isRequired,
    getDataList: PropTypes.func.isRequired,
    clean:PropTypes.func.isRequired,
}

