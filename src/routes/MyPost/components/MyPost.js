import React from 'react'
import PropTypes from 'prop-types'
import "../style/MyPost.scss"
import {Link, withRouter} from "react-router";
import {Tabs, Modal} from "antd-mobile";
import shareIcon from "../../../static/icon/share-icon.png";
import commentIcon from "../../../static/icon/comment-icon.png";
import {postF} from "../../../utils/api";
import HeaderNav from "../../../components/HeaderNav/HeaderNav";
import Empty from "../../../components/Empty/Empty";

class MyPost extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.clean()
        this.state={
            tabIndex:'2',
            pageSize:10,
            postPendingPageNum:1,
            postPassPageNum:1,
            refreshing:false,
        }
    }
    componentDidMount() {
        this.getPostPending();
        this.getPostPass();
        window.addEventListener('scroll', this.scrollChange)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollChange)
    }
    scrollChange = (e) => {
        const sT = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
            || window.pageYOffset
            || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        const { refreshing,postPassPageNum,postPendingPageNum,tabIndex} = this.state;
        const { myPost } = this.props;
        let h= document.body.clientHeight - document.documentElement.clientHeight;
        if( h === sT && sT>0 && !refreshing){
            if(tabIndex==="1" && !myPost.postPass.isFoot){
                this.setState({
                    refreshing:true,
                    postPassPageNum:postPassPageNum+1
                },()=>this.getPostPass())
            }else if(tabIndex ==="2" && !myPost.postPending.isFoot){
                this.setState({
                    refreshing:true,
                    postPendingPageNum:postPendingPageNum+1
                },()=>this.getPostPending())
            }
        }
    }
    getPostPending(){
        const { postPendingPageNum, pageSize} = this.state;
        this.props.getPostPending({
            pageNum:postPendingPageNum,
            pageSize: pageSize,
        }).then(res=>{
            this.setState({
                refreshing:false,
            })
        });
    }
    getPostPass(){
        const { postPassPageNum, pageSize} = this.state;
        this.props.getPostPass({
            pageNum:postPassPageNum,
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
    postCancel(id){
        postF("forum/mypost/cancel",null,{postId:id}).then(res=>{
            this.setState({
                postPendingPageNum:1,
                postPassPageNum:1,
                refreshing:false,
            },()=>{
                this.props.clean()
                this.getPostPending();
                this.getPostPass();
            })
        });
    }
    render() {
        const tabs = [
            { title: '审核内容', sub: '2' },
            { title: '已发布', sub: '1' },
        ];
        const { myPost } = this.props;
        return (
            <div className="my">
                <HeaderNav  transparent={true} isLight={true} {...this.props} />
                <div className="my-info">
                    <div className="my-info-header">
                    </div>
                    <div className="my-info-title">我的发布</div>
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
                                    (myPost.postPending && myPost.postPending.records && myPost.postPending.records.length>0)?myPost.postPending.records.map((item, index)=><div key={index} className="my-post-item" onClick={()=>this.props.router.push({
                                        pathname:"/post",
                                        query: {
                                            id: item.id
                                        }
                                    })}>
                                        <img src={JSON.parse(item.imageUrl)[0]} alt=""/>
                                        <div className="main">
                                            <div className="body">
                                                <div className="title">
                                                    {item.title}
                                                </div>
                                                <div className="time">
                                                    {item.gmtCreateStr}
                                                </div>
                                                <div className="action">
                                                    <div>
                                                        审核中
                                                    </div>
                                                    <div onClick={(e)=>{
                                                        e.stopPropagation();
                                                        this.postCancel(item.id)
                                                    }}>
                                                        撤销
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>):null
                                }
                                {(myPost.postPending && myPost.postPending.records && myPost.postPending.records.length==0) && <Link to="/lifestyle#circle"><Empty text="去圈子里写点什么吧" /></Link>}
                            </div>
                            <div>

                                {
                                    (myPost.postPass && myPost.postPass.records && myPost.postPass.records.length>0 )?
                                        myPost.postPass.records.map((item, index)=><div key={index} className="my-post-item" onClick={()=>this.props.router.push({
                                            pathname:"/post",
                                            query: {
                                                id: item.id
                                            }
                                        })}>
                                            <img src={JSON.parse(item.imageUrl)[0]} alt=""/>
                                            <div className="main">
                                                <div className="body">
                                                    <div className="title">
                                                        {item.title}
                                                    </div>
                                                    <div className="time">
                                                        {item.gmtCreateStr}
                                                    </div>
                                                    <div className="num">
                                                        <div className="num-active">
                                                            <div>
                                                                <img src={shareIcon} alt=""/>{item.forwardCount}
                                                            </div>
                                                            <div className="comment">
                                                                <img src={commentIcon} alt=""/>{item.commentCount}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div onClick={(e)=>{
                                                                e.stopPropagation();
                                                                Modal.alert("提示","删除后不可恢复，确定删除？",[
                                                                    {
                                                                        text:"取消",
                                                                        style:{
                                                                            border:'1px solid rgba(16,17,80,1)',
                                                                            height:'34px',
                                                                            lineHeight:'34px',
                                                                            borderRadius:'30px',
                                                                            fontSize:'14px',
                                                                            flex: 'inherit',
                                                                            width: '110px'
                                                                        }
                                                                    },
                                                                    {
                                                                        text:"确定",
                                                                        style:{
                                                                            background:'rgba(16,17,80,1)',
                                                                            height:'34px',
                                                                            lineHeight:'34px',
                                                                            borderRadius:'30px',
                                                                            fontSize:'14px',
                                                                            flex: 'inherit',
                                                                            color:'rgba(214,255,127,1)',
                                                                            width: '110px'
                                                                        },
                                                                        onPress:()=>{
                                                                            this.postCancel(item.id)
                                                                        }
                                                                    },
                                                                ]);

                                                            }}>
                                                                删除
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>):null
                                }
                                {
                                    (myPost.postPass && myPost.postPass.records && myPost.postPass.records.length==0 ) && <Link to="/lifestyle#circle"><Empty text="去圈子里写点什么吧" /></Link>
                                }
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(MyPost)
MyPost.propTypes = {
    myPost:PropTypes.object.isRequired,
    getPostPending:PropTypes.func.isRequired,
    getPostPass:PropTypes.func.isRequired,
    clean:PropTypes.func.isRequired,
}

