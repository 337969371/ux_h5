import React from 'react'
import PropTypes from 'prop-types'
import "../style/MyLike.scss"
import { withRouter} from "react-router";
import {Tabs} from "antd-mobile";
import moment from "moment";
import HeaderNav from "../../../components/HeaderNav/HeaderNav";
import Empty from "../../../components/Empty/Empty";

class MyLike extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.clean()
        this.state={
            tabIndex:'1',
            postPageNum:1,
            articlePageNum:1,
            recommendPageNum:1,
            refreshing:false,
            pageSize:10,
        }
    }
    componentDidMount() {
        this.getPostList();
        this.getArticleList();
        this.getRecommendList();
        window.addEventListener('scroll', this.scrollChange)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollChange)
    }
    scrollChange = (e) => {
        const sT = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
            || window.pageYOffset
            || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        const { refreshing, postPageNum, articlePageNum,recommendPageNum, tabIndex} = this.state;
        const { myLike } = this.props;
        let h= document.body.clientHeight - document.documentElement.clientHeight;
        if( h === sT && sT>0 && !refreshing){
            if(tabIndex==="1" && !myLike.post.isFoot){
                this.setState({
                    refreshing:true,
                    postPageNum:postPageNum+1
                },()=>this.getPostList())
            }else if(tabIndex === "2" && !myLike.recommend.isFoot){
                this.setState({
                    refreshing:true,
                    recommendPageNum:recommendPageNum+1
                },()=>this.getRecommendList())
            }else if(tabIndex === "3" && !myLike.article.isFoot){
                this.setState({
                    refreshing:true,
                    articlePageNum:articlePageNum+1
                },()=>this.getArticleList())
            }
        }
    }
    getArticleList(){
        const { articlePageNum, pageSize} = this.state;
        this.props.getArticleList({
            pageNum:articlePageNum,
            pageSize: pageSize,
        }).then(res=>{
            this.setState({
                refreshing:false,
            })
        });
    }

    getRecommendList(){
        const { recommendPageNum, pageSize} = this.state;
        this.props.getRecommendList({
            pageNum:recommendPageNum,
            pageSize: pageSize,
        }).then(res=>{
            this.setState({
                refreshing:false,
            })
        });
    }


    getPostList(){
        const { postPageNum, pageSize} = this.state;
        this.props.getPostList({
            pageNum:postPageNum,
            pageSize: pageSize,
        }).then(res=>{
            this.setState({
                refreshing:false,
            })
        });
    }
    changeTab(tabIndex){
        this.setState({
            tabIndex:tabIndex,
        })
    }
    render() {
        const tabs = [
            { title: '社区圈子', sub: '1' },
            { title: '社区推荐', sub: '2' },
            { title: '新闻内容', sub: '3' },
        ];
        const { myLike } = this.props;
        return (
            <div className="my">
                <HeaderNav  transparent={true} isLight={true} {...this.props} />
                <div className="my-info">
                    <div className="my-info-header">
                    </div>
                    <div className="my-info-title">我的喜欢</div>
                </div>

                <div className="my-like-body">
                    <div className="my-body-content">
                        <Tabs tabs={tabs}
                              useOnPan={false}
                              initialPage={0}
                              onChange={(tab, index) => this.changeTab(tab.sub)}
                        >
                            <div>
                                {
                                    (myLike.post && myLike.post.records && myLike.post.records.length>0)
                                    ? myLike.post.records.map((item,index)=><div className="my-like-item" key={index} onClick={()=>this.props.router.push({
                                        pathname:"/post",
                                        query: {
                                            id: item.id
                                        }
                                    })}>
                                        <div className="left">
                                            <img src={item.imageUrl?item.imageUrl:''} alt=""/>
                                        </div>
                                        <div className="right">
                                            <h4>
                                                {item.title}
                                            </h4>
                                            <div className="my-like-item-info">
                                                <div>
                                                   {item.nickname}
                                                </div>
                                                <div className="time">
                                                   {moment(item.gmtCreate).format("MM/DD")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>):null
                                }
                                { (myLike.post && myLike.post.records && myLike.post.records.length===0) && <Empty text="空空如也，去看看社区吧" />}
                            </div>

                            <div>
                                {
                                    (myLike.recommend && myLike.recommend.records && myLike.recommend.records.length>0)?myLike.recommend.records.map((item,index)=><div className="my-like-item" key={index} onClick={()=>this.props.router.push({
                                        pathname:"/article",
                                        query: {
                                            id: item.id
                                        }
                                    })}>
                                        <div className="left">
                                            <img src={item.imageUrl} alt=""/>
                                        </div>
                                        <div className="right">
                                            <h4>
                                                {item.title}
                                            </h4>
                                            <div className="my-like-item-info">
                                                <div>
                                                    {item.nickname}
                                                </div>
                                                <div className="time">
                                                    {item.gmtCreateStr}
                                                </div>
                                            </div>
                                        </div>
                                    </div>):null
                                }
                                {(myLike.recommend && myLike.recommend.records && myLike.recommend.records.length===0) && <Empty text="空空如也，去看看新闻吧" />}
                            </div>
                            <div>
                                {
                                    (myLike.article && myLike.article.records && myLike.article.records.length>0)?myLike.article.records.map((item,index)=><div className="my-like-item" key={index} onClick={()=>this.props.router.push({
                                        pathname:"/article",
                                        query: {
                                            id: item.id
                                        }
                                    })}>
                                        <div className="left">
                                            <img src={item.imageUrl} alt=""/>
                                        </div>
                                        <div className="right">
                                            <h4>
                                                {item.title}
                                            </h4>
                                            <div className="my-like-item-info">
                                                <div>
                                                    {item.nickname}
                                                </div>
                                                <div className="time">
                                                    {item.gmtCreateStr}
                                                </div>
                                            </div>
                                        </div>
                                    </div>):null
                                }
                                {(myLike.article && myLike.article.records && myLike.article.records.length===0) && <Empty text="空空如也，去看看新闻吧" />}
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(MyLike)
MyLike.propTypes = {
    myLike:PropTypes.object.isRequired,
    getPostList:PropTypes.func.isRequired,
    getTopicList:PropTypes.func.isRequired,
    getArticleList:PropTypes.func.isRequired,
    clean:PropTypes.func.isRequired
}

