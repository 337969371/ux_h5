import React from 'react'
import PropTypes from 'prop-types'
import "../style/NewsList.scss"
import collectIcon from "../../../static/news/collect-icon.svg";
import commentIcon from "../../../static/news/comment-icon.svg";
import shareIcon from "../../../static/news/share-icon.svg";

import moment from "moment"
import HeaderNav from "../../../components/HeaderNav/HeaderNav";


export default class NewsList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.clean();
        this.state={
            pageNum: 1,
            pageSize: 3,
            refreshing:false,
            loading:true,
        }
    }
    componentDidMount() {
        this.getList();
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
        const { news } = this.props;

        if( h === scrollTop && scrollTop>0 && !refreshing){
            if(!news.isFoot){
                this.setState({
                    refreshing:true,
                    pageNum:pageNum+1
                },()=>this.getList())
            }
        }
    }
    getList(){
        const {pageNum,pageSize,id} = this.state;
        this.props.getList({
            "pageNum": pageNum,
            "pageSize": pageSize,
            "categoryCode":"ac_02"
        }).then((res)=>{
            this.setState({
                refreshing:false
            })
        });
    }
    goBack(){
        const {location} =this.props;
        if(location.action === "PUSH"){
            this.props.router.goBack();
        }else {
            window.location.href="/";
        }
    }
    goArticle(id){
        this.props.router.push({
            pathname:"/article",
            query: {
                id:id
            }
        })
    }
    render() {
        const {  refreshing } = this.state;
        const {news} =this.props;
        return (
            <div className="news">
                <HeaderNav isLight={true} transparent={true} {...this.props}/>
                <img className="header-img" src="https://id-oss.dmqgo.com/attach/news_header.jpg" alt=""/>
                <div className="header-title">
                    <h4>ID. 家族新闻</h4>
                    <div className="des">品牌动态</div>
                </div>
                <div className="main">
                    {
                        news && news.records && news.records.length>0 && news.records.map((item,index)=>{
                            return (
                                <div className="new-item" onClick={()=>{
                                    this.goArticle(item.id);
                                    stm_clicki('send', 'event', '页面跳转', '点击', "新闻-"+item.title, "");
                                }} key={index}>
                                    <div className="new-item-img">
                                        <img src={item.imageUrl} alt=""/>
                                    </div>
                                    <div>
                                        <div className="new-item-title">
                                            {item.title}
                                        </div>
                                        <div className="new-footer">
                                            <div className="left">
                                                <div className="new-item-icon">
                                                    <img src={shareIcon} alt=""/>
                                                    {item.forwardCount}
                                                </div>
                                                <div className="new-item-icon">
                                                    <img src={commentIcon} alt=""/>
                                                    {item.commentCount}
                                                </div>
                                                <div className="new-item-icon">
                                                    <img src={collectIcon} alt=""/>
                                                    {item.likeCount}
                                                </div>
                                            </div>
                                            <div className="right">
                                                {moment(item.gmtCreate).format("MM/DD")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}
NewsList.propTypes = {
    news: PropTypes.object.isRequired,
    getList: PropTypes.func.isRequired,
    clean:PropTypes.func.isRequired,
}

