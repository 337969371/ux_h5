import React from 'react'
import PropTypes from 'prop-types'
import "../style/Post.scss"
import Slider from "react-slick";
import backIcon from "../../../static/icon/back-icon.png";
import praiseIcon from "../../../static/icon/praise-icon.png";
import logo from "../../../static/icon/logo-icon.png";
import shareIconGray from "../../../static/icon/share-icon-gray.png";
import commentIconGray from "../../../static/icon/comment-icon-gray.png";
import collectionIconRed from "../../../static/icon/collection-icon-red.png";
import collectionIcon from "../../../static/icon/collection-icon-gray-solid.png";
import moment from "moment";
import Login from "../../../components/Login/Login";
import {ActivityIndicator} from "antd-mobile";
import HeaderNav from "../../../components/HeaderNav/HeaderNav";
import Utils from "../../../utils/utils";

export default class PostDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.clean();
        this.state={
            id:this.props.location.query.id,
            showEdit:false,
            commentText:"",
            pageNum: 1,
            pageSize: 10,
            parentId:null,
            refreshing:false,
            showShare:false,
            posterUrl:'',
            loading:true,
        }
    }
    componentDidMount() {
        this.props.getDetail({postId:this.props.location.query.id}).then(res=>{
            this.setState({
                loading:false,
            })
        });
        this.getComment();
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
        const { postDetail } = this.props;
        if( h === scrollTop && scrollTop>0 && !refreshing){
            if(!postDetail.comment.isFoot){
                this.setState({
                    refreshing:true,
                    pageNum:pageNum+1
                },()=>this.getComment())
            }
        }
    }
    getComment(){
        const {pageNum,pageSize,id} = this.state;
        this.props.getComment({
            "pageNum": pageNum,
            "pageSize": pageSize,
            "postId": id,
        }).then((res)=>{
            this.setState({
                refreshing:false
            })
        });
    }
    getNumSting(num){
        if(num<1000){
            return num.toString();
        }
        if(num){
            return (num/1000).toFixed(1)+"K+";
        }
        return 0
    }
    showEditInput(showEdit){
        this.setState({
            commentText:"",
            parentId:null,
            showEdit:showEdit
        },()=>{
            if(showEdit){
                this.textarea.focus();
            }
        });
        stm_clicki('send', 'event', '评论框', '点击', showEdit?"显示":"隐藏", "");
    }
    isLike(){
        const {id} = this.state;
        this.props.isLike({
            postId:id,
        }).then((res)=>{
            this.props.getDetail({postId:id});
        })
        stm_clicki('send', 'event', '收藏按钮', '点击', "收藏", "");
    }
    postComment(){
        const {id,commentText,parentId} = this.state;
        let param={
            "content": commentText,
            "postId": id
        }
        if(parentId){
            param.parentId = parentId;
        }
        this.props.postComment(param).then((res)=>{
            this.showEditInput(false);
            this.setState({
                pageNum:1,
                pageSize:10,
            },()=>{
                this.props.clean();
                this.getComment();
                this.props.getDetail({postId:id})
            })
        })
        stm_clicki('send', 'event', '发表评论按钮', '点击', "发表评论", "");
    }
    commentIsLike(id){
        this.props.commentIsLike({
            "businessType": "10",
            "commentId": id
        })
        stm_clicki('send', 'event', '评论点赞按钮', '点击', "点赞", "");
    }
    share(bool){
        const { postDetail,forward } =this.props;
        let detail = postDetail.detail;
        this.setState({
            loading:true,
        })
        forward({
            imageUrl: JSON.parse(detail.imageUrl)[0],  //帖子图片链接
            profilePhoto: detail.profilePhoto,    //头像链接 ,
            qrCodeUrl:window.location.href,             //二维码链接
            postId:detail.id,
            nickname:detail.nickname,
            title:detail.title
        }).then(res=>{
            console.log(res);
            this.setState({
                showShare:res?true:false,
                loading:false,
                posterUrl:res
            })
        });
        stm_clicki('send', 'event', '分享按钮', '点击', "分享", "");

    }
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true
        };
        const { showEdit, refreshing, posterUrl,loading } = this.state;
        const { postDetail,globalData } =this.props;
        let commentList = [];
        if(postDetail.comment && postDetail.comment.records){
            commentList = postDetail.comment.records;
        }
        let detail = postDetail.detail;
        if(!detail){
            return null;
        }
        return (
            <div className="post">
                <HeaderNav transparent={true}  isLight={true}/>
                <Login {...this.props}/>
                {loading &&
                <ActivityIndicator
                    toast
                    text="加载中..."
                    animating={this.state.animating}
                />}
                {this.state.showShare && <div className="share-make">
                    <a onClick={()=>this.setState({showShare:false})}>
                        <img src={backIcon} className="back-icon" alt=""/>
                    </a>
                    <div>
                        <img src={logo} alt="" className="share-make-logo"/>
                        <img src={posterUrl} className="poster" />
                        <div className="share-modal-hint">长按保存分享图片</div>
                    </div>
                </div>}
                <div>
                    {detail.imageUrl && detail.imageUrl.length>0 && <Slider {...settings}>
                        {
                            JSON.parse(detail.imageUrl).map((item,index)=>{
                                return <div className="post-detail-slider-img" key={index}>
                                    <div className="post-detail-slider-img-box">
                                        <img src={item} alt=""/>
                                    </div>
                                </div>
                            })
                        }
                    </Slider>}
                </div>
                <div className="post-content">
                    <div className="post-content-title">
                        {detail.title}
                    </div>
                    <div className="post-content-h">
                        <div className="date-address">
                            {moment(detail.gmtCreate).format("YYYY.MM.DD")}
                        </div>
                    </div>
                    <div className="post-content-user">
                        <div className="post-content-user-box" style={{background:Utils.getUserBackground(detail.valueLevel)}}>
                            <img src={detail.profilePhoto} alt="" className="post-content-user-header" />
                            {Utils.getUserLevelImg(detail.valueLevel,"post-content-user-identity")}
                        </div>
                        <div className="post-content-user-info">
                            <div className="nickname">{detail.nickname}</div>
                            <div className="a-badge">{detail.badge}</div>
                        </div>
                    </div>
                    <div className="post-content-text">
                        {detail.content}
                    </div>
                    <div>
                        <div className="post-comment-title">
                            {detail.commentCount}条评论
                        </div>
                        <div className="post-comment-body" id="commentBody">
                            {
                                commentList.map((item,index)=><div key={index} className="post-comment-item">
                                    <div className="post-comment-item-main">
                                        <div className="post-comment-left" >
                                            <div className="post-comment-left-img-box" style={{background:Utils.getUserBackground(item.valueLevel)}}>
                                                <img src={item.profilePhoto} className="post-comment-left-img" alt=""/>
                                            </div>
                                            {Utils.getUserLevelImg(item.valueLevel,"post-comment-left-img-icon")}
                                        </div>
                                        <div className="post-comment-right">
                                            <div className="post-comment-head">
                                                <div className="post-comment-user">
                                                    <div className="name">{item.nickname}</div>
                                                    <div className="date">{moment(item.gmtCreate).format("MM/DD HH:mm")}</div>
                                                </div>
                                                <div className="post-comment-praise">
                                                    <a onClick={()=>this.commentIsLike(item.commentId)}>
                                                        <img src={praiseIcon} alt=""/>
                                                    </a>
                                                    <span>{this.getNumSting(item.likeCount)}</span>
                                                </div>
                                            </div>
                                            <div className="post-comment-content">
                                                <div onClick={()=>{
                                                    this.setState({
                                                        commentText:"",
                                                        parentId:item.commentId,
                                                        showEdit:true
                                                    })
                                                }}>
                                                    {item.content}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        item.childList.length>0 && item.childList.map((i,j)=>(
                                                <div className="post-comment-item-child" key={j}>
                                                    <div className="post-comment-item">
                                                        <div className="post-comment-item-main">
                                                            <div className="post-comment-left" >
                                                                <div className="post-comment-left-img-box" style={{background:Utils.getUserBackground(i.valueLevel)}}>
                                                                    <img src={i.profilePhoto} className="post-comment-left-img" alt=""/>
                                                                </div>
                                                                {Utils.getUserLevelImg(i.valueLevel,"post-comment-left-img-icon")}
                                                            </div>
                                                            <div className="post-comment-right">
                                                                <div className="post-comment-head">
                                                                    <div className="post-comment-user">
                                                                        <span className="name">{i.nickname}</span>
                                                                        <span className="date">{moment(i.gmtCreate).format("MM/DD HH:mm")}</span>
                                                                    </div>
                                                                    <div className="post-comment-praise">
                                                                        <a onClick={()=>this.commentIsLike(i.commentId)}>
                                                                            <img src={praiseIcon} alt=""/>
                                                                        </a>
                                                                        <span>{this.getNumSting(i.likeCount)}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="post-comment-content">
                                                                    {i.content}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                </div>)
                            }
                        </div>
                    </div>
                </div>
                {refreshing && <div className="more-loading"><ActivityIndicator text="正在加载" /></div>}
                <div className="post-footer">
                    <div className="post-footer-input" onClick={()=>this.showEditInput(true)}><input type="text" placeholder="在此发表你的评论"/></div>
                    <div className="post-footer-active">
                        <div onClick={()=>this.isLike()}>
                            <img src={detail.isLiked===1?collectionIconRed:collectionIcon} alt=""/>{this.getNumSting(detail.likeCount)}
                        </div>
                        <div>
                            <a href="#commentBody" onClick={()=>{
                                stm_clicki('send', 'event', '评论按钮', '点击', "查看评论", "");
                            }}>
                                <img src={commentIconGray} alt=""/>{this.getNumSting(detail.commentCount)}
                            </a>
                        </div>
                        <div onClick={()=>this.share(true)}><img src={shareIconGray} alt=""/>{this.getNumSting(detail.forwardCount)}</div>
                    </div>
                </div>
                {showEdit && <div className="mask">
                    <div className="post-comment-blank" onClick={()=>this.showEditInput(false)}></div>
                    <div className="post-comment-push">
                        <textarea maxLength={140} onChange={(e)=>this.setState({commentText:e.target.value})}  ref={(textarea)=> this.textarea = textarea}></textarea>
                        <div className="post-comment-push-btn">
                            <div>{this.state.commentText.length}/140</div>
                            <button onClick={()=>this.postComment()}>发表</button>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}
PostDetail.propTypes = {
    postDetail: PropTypes.object.isRequired,
    globalData:PropTypes.object.isRequired,
    getDetail: PropTypes.func.isRequired,
    isLike:PropTypes.func.isRequired,
    postComment:PropTypes.func.isRequired,
    getComment:PropTypes.func.isRequired,
    commentIsLike:PropTypes.func.isRequired,
    clean:PropTypes.func.isRequired,
    forward:PropTypes.func.isRequired,
}

