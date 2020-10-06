import React from 'react'
import PropTypes from 'prop-types'
import "../style/TopicDetail.scss"
import { withRouter} from "react-router";


import backIcon from "../../../static/icon/back-icon.png"
import helpIcon from "../../../static/icon/help-icon.png"

import collectionIcon from "../../../static/icon/collection-icon-gray-solid.png"
import collectionIconRed from "../../../static/icon/collection-icon-red.png"
import commentIcon from "../../../static/icon/comment-icon-gray.png"
import shareIcon from "../../../static/icon/share-icon-gray.png"
import sortIcon from "../../../static/icon/sort-icon.png"
import hantaoIcon from "../../../static/topicDetail/hantao-icon.png"
import taiyiIcon from "../../../static/topicDetail/taiyi-icon.png"
import hantaoImg from "../../../static/topicDetail/hantao-img.png"
import taiyiImg from "../../../static/topicDetail/taiyi-img.png"


import {ActivityIndicator, Toast, Modal} from "antd-mobile"


import playerIcon from "../../../static/topDetail/wanjia-icon.png"
import yuanzhuoIcon from "../../../static/topDetail/yuanzhuo-icon.png"

import Slider from "react-slick";
import moment from "moment"
import Login from "../../../components/Login/Login";

import yuanzhuo from "../../../static/topDetail/yuanzhuo.png";
import Utils from "../../../utils/utils";





class TopicDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.clean();
        this.state={
            id:this.props.location.query.id,
            tagCode:this.props.location.query.tagCode,
            pageNum:1,
            refreshing:false,
            sort:0,
            showHelp:false
        }
    }
    componentDidMount() {
        this.getDetail();
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
        const { topicDetail } = this.props;
        if( h === scrollTop && scrollTop>0 && !refreshing){
            if(!topicDetail.post.isFoot){
                this.setState({
                    refreshing:true,
                    pageNum:pageNum+1
                },()=>this.getComment())
            }
        }
    }
    getComment(){
        const {id,tagCode,pageNum,sort} = this.state
        this.props.getTopicDetailPost({
            "pageNum": pageNum,
            "pageSize": 10,
            "tagCode": tagCode,
            "topicId": id,
            "sort":sort
        }).then(res=>{
            this.setState({
                refreshing:false
            })
        })
    }
    getDetail(){
        const { id } = this.state;
        this.props.getTopicDetail({
            topicId:id
        });
    }
    isLike(){
        const { id } = this.state;
        this.props.isLikeTopic({
            topicId:id
        }).then((res)=>{
            Toast.info("操作成功")
            this.getDetail();
        })
        stm_clicki('send', 'event', '收藏按钮', '点击', "收藏话题", "");
    }
    sort(){
        const { sort } =this.state;
        this.setState({
            sort:sort===1?0:1,
            pageNum:1,
            refreshing:true,
        },()=>{
            this.props.clean();
            this.getComment();
        })
        stm_clicki('send', 'event', '按钮', '点击', "排序-"+(sort===0)?"通过点赞数排序":"通过时间排序", "");
    }
    goBack(){
        try {
            if(window.history.length>3){
                this.props.router.goBack();
            }else {
                window.location.href="/";
            }
        }catch (e) {
            try {
                window.history.back(-1);
            }catch (e) {
                window.location.href="/";
            }
        }
        stm_clicki('send', 'event', '返回按钮', '点击', "返回", "");
    }
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true,
            adaptiveHeight:true
        };
        const { location,topicDetail,isShowLoginModal } = this.props;
        let type = location.query.type;
        const { refreshing,sort,showHelp } = this.state;
        let w = (document.body.offsetWidth-70)/3
        let bg = null;
        if(type === "10"){
            bg = yuanzhuo;
        }else if(type === "20"){
            bg = "https://id-oss.dmqgo.com/attach/wjb001.jpg";
        }
        // 10-ID.圆桌， 20-ID.玩家
        return (
            <div className="topic-detail" style={{backgroundImage: `url(${bg})`}}>
                <Login {...this.props} onClose={()=>isShowLoginModal(false)}/>
                <Modal visible={showHelp} transparent onClose={()=>this.setState({showHelp:false})}>
                    <div className="topic-detail-help-text">
                        <div className="title">
                            ID. 玩家是什么？
                        </div>
                        <div className="desc">
                            这里汇聚了不断突破自我的新世代青年们，他们勇于突破、改变玩法，在不断的进阶中成为更好的自我。同时，连线.ID社区官方也将联合众多创新玩家在这里发起各种精彩活动，愿每一位玩家都能在此得获灵感，交获挚友。现已面向所有社区注册玩家开放。
                        </div>
                        <div className="title">
                            ID. 玩家如何参与？
                        </div>
                        <div className="desc">
                            玩家可选择参与一个或者多个自己感兴趣的 活动，不同活动的参与规则不同，具体规则可点击每场活动详情页面进行查看。此外，玩家也可以围观活动，为其他参与的玩家打Call助力。
                        </div>
                        <div className="title">
                            ID. 玩家有什么奖励？
                        </div>
                        <div className="desc">
                            玩家参与ID.  玩家互动活动，可积赞ID.  值，更有机会获得惊喜礼遇。点击每场活动详情页面，可了解相关规则。
                        </div>
                        <div className="title">
                            如何获得惊喜礼遇？
                        </div>
                        <div className="desc">
                            成功参与ID. 玩家活动的玩家，可邀请他人为自己点赞助力。每次单场活动结束后，连线ID. 社区官方将选择每场ID. 玩家活动中点赞最高的一位或几位玩家，给予惊喜礼遇奖励。
                        </div>
                    </div>
                </Modal>
                <div className="topic-detail-header">
                    <a onClick={() => this.goBack()}>
                        <img src={backIcon} alt=""/>
                    </a>
                </div>
                <div className="topic-detail-middle">
                    <div className="topic-detail-title">
                        <div className="topic-detail-title-info">
                            {type == "10" && <img src={yuanzhuoIcon} alt=""/>}
                            {type == "20" && <img src={playerIcon} alt=""/>}
                            <span>ID. </span>
                            {type == "10" && "圆桌"}
                            {type == "20" && "玩家"}
                        </div>
                        <div className="topic-detail-help">
                            {type == "20" &&  <img src={helpIcon} alt="" onClick={()=>this.setState({showHelp:true})}/>}
                        </div>
                    </div>
                    <div className="topic-detail-info">
                        <div className="topic-detail-info-h">
                            <div className="title">
                                {type == "20" && "ID. 玩家秀"}
                                {type == "10" && "如何用音乐将“未来感”提现"}
                            </div>
                            <div>
                                {topicDetail.detail && topicDetail.detail.isLiked == 1 ?
                                    <button className="btn-blue topic-detail-attention-btn-ed">已关注</button> :
                                    <button className="btn-blue topic-detail-attention-btn"
                                            onClick={() => this.isLike()}>关注话题</button>}
                            </div>
                        </div>
                        {
                            type == "20" && <div>
                                <div className="topic-detail-info-slider">
                                    <Slider {...settings}>
                                        <div className="topic-detail-info-slider-img">
                                            <img src="https://id-oss.vw.com.cn/img/Banner1.jpg" alt=""/>
                                        </div>
                                    </Slider>
                                </div>
                                <div className="topic-detail-info-t">
                                    向世界秀出你的ID.
                                </div>
                                <div className="topic-detail-info-d">
                                    太一、张娜等创新玩家正在线等你，上传照片，从此以热爱为自我ID.
                                </div>
                            </div>}
                        {
                            type == "10" && <div>
                                <div className="topic-detail-pk-img">
                                    <div>
                                        <img src={taiyiImg} alt=""/>
                                    </div>
                                    <div className="topic-detail-pk-text"></div>
                                    <div>
                                        <img src={hantaoImg} alt=""/>
                                    </div>
                                </div>
                                <div className="topic-detail-content">
                                    <div className="title">ID. 圆桌简介</div>
                                    <div className="text">
                                        观点在观念间，思想在对话里。每一期我们将邀请不同领域的意见领袖，围绕相关话题展开讨论。通过不同领域的观点的碰撞与分享，让大家更加了解ID. 以及ID. 背后的故事，收获满满干货。
                                    </div>
                                </div>
                                <div className="topic-detail-guest">
                                    <div className="title">
                                        嘉宾观点碰撞
                                    </div>
                                    <div className="topic-detail-guest-body">
                                        <div className="topic-detail-guest-left">
                                            <div className="headerImg-hantao">
                                                <img src={hantaoIcon} alt=""/>
                                            </div>
                                            <div className="content">
                                                <div className="user-info">
                                                    <div className="name">韩涛</div>
                                                    <div className="position">大众汽车技术专家</div>
                                                </div>
                                                <div className="comment">
                                                    大家好，欢迎来到ID. 圆桌。<br/>
                                                    本期 ID. 圆桌的话题是：如何用音乐将“未来感”提现？<br/>
                                                    听说关于本期话题，今天会有位专业的音乐人士和我一起讨论这期话题，为此我已经准备了好多天。非常期待能够通过今天的对话，撞出不一样的火花，寻找到更多有趣的声音表达。
                                                </div>
                                            </div>
                                        </div>
                                        <div className="topic-detail-guest-right">
                                            <div className="content">
                                                <div className="user-info">
                                                    <div className="name">太一</div>
                                                    <div className="position">中国新生代音乐人</div>
                                                </div>
                                                <div className="comment">
                                                    谢谢韩老师，大家好，我是太一，非常期待这次跨界间的观点碰撞。
                                                </div>
                                            </div>
                                            <div className="headerImg">
                                                <img src={taiyiIcon} alt=""/>
                                            </div>
                                        </div>
                                        <div className="topic-detail-guest-left">
                                            <div className="headerImg-hantao">
                                                <img src={hantaoIcon} alt=""/>
                                            </div>
                                            <div className="content">
                                                <div className="user-info">
                                                    <div className="name">韩涛</div>
                                                    <div className="position">大众汽车技术专家</div>
                                                </div>
                                                <div className="comment">
                                                    那我先来，也从一位汽车声音设计师的角度来抛砖引玉下。我觉得如果想用音乐来提现未来感，对音乐使用场景的要求至关重要。如果是在一个过时的产品上运用，即使旋律上再怎么营造未来感也无用，所以一定要搭配高科技产品一起使用。
                                                </div>
                                            </div>
                                        </div>
                                        <div className="topic-detail-guest-right">
                                            <div className="content">
                                                <div className="user-info">
                                                    <div className="name">太一</div>
                                                    <div className="position">中国新生代音乐人</div>
                                                </div>
                                                <div className="comment">
                                                    音乐是几千年来人类的一种产物，而科技是人类革新的未来，用艺术来阐述未来世界的样子对我来说是非常惊喜的合作方式，令我最开心的是，不论是音乐创作，还是科技创新，两者都是具有开创性精神，探索精神，gamechanger精神的，在这一层面上，作为音乐人的我与科技，是有相通之处的。科技不断演进，音乐也在不断革新，音乐的感性与科技的理性如果可以融合为一，这点我会觉得是人类在进步过程里的天性搭配。
                                                </div>
                                            </div>
                                            <div className="headerImg">
                                                <img src={taiyiIcon} alt=""/>
                                            </div>
                                        </div>
                                        <div className="topic-detail-guest-left">
                                            <div className="headerImg-hantao">
                                                <img src={hantaoIcon} alt=""/>
                                            </div>
                                            <div className="content">
                                                <div className="user-info">
                                                    <div className="name">韩涛</div>
                                                    <div className="position">大众汽车技术专家</div>
                                                </div>
                                                <div className="comment">
                                                    机器人说话的声音还可以了解一下大众ID. 智能人机交互系统，有AI在线及时应答。特别是大众ID的声音设计团队还专门为ID的车内设计了完全不同的声音，怎么说呢，那是一种即优雅又现代的数字合成音，和科幻电影《她》里斯嘉丽·约翰逊的声音一样迷人。
                                                </div>
                                            </div>
                                        </div>
                                        <div className="topic-detail-guest-right">
                                            <div className="content">
                                                <div className="user-info">
                                                    <div className="name">太一</div>
                                                    <div className="position">中国新生代音乐人</div>
                                                </div>
                                                <div className="comment">
                                                    嗯，听上去挺奇妙的，这些声音，比如ID的声音也会给我带来对话感，让我产生创作灵感，交互感才是各种艺术创作的灵感源泉。
                                                </div>
                                            </div>
                                            <div className="headerImg">
                                                <img src={taiyiIcon} alt=""/>
                                            </div>
                                        </div>
                                        <div className="topic-detail-guest-left">
                                            <div className="headerImg-hantao">
                                                <img src={hantaoIcon} alt=""/>
                                            </div>
                                            <div className="content">
                                                <div className="user-info">
                                                    <div className="name">韩涛</div>
                                                    <div className="position">大众汽车技术专家</div>
                                                </div>
                                                <div className="comment">
                                                    哈哈，我还有另外一个极具未来感的声音素材推荐：那就是大众ID. 的全新驾驶声音，可是和德国著名的成吉思汗乐队里的作曲家兼音乐制作人Leslie Mandoki合作开发的。
                                                </div>
                                            </div>
                                        </div>
                                        <div className="topic-detail-guest-video">
                                            <video poster="https://id-oss.vw.com.cn/img/sound.jpg" controls="controls"  id="kolVideo" >
                                                <source src="https://id-oss.vw.com.cn/video/sound01.mp4"/>
                                            </video>
                                        </div>
                                        <div className="topic-detail-guest-right">
                                            <div className="content">
                                                <div className="user-info">
                                                    <div className="name">太一</div>
                                                    <div className="position">中国新生代音乐人</div>
                                                </div>
                                                <div className="comment">
                                                    这题我可以抢答，我记得好像看过相关报道，是不是那个很接近在《星球大战》电影中X-wing星际战机所发出的声音，使用了多层音轨，去表达移动的速度和活力，确实想要仔细研究下这个声音。
                                                </div>
                                            </div>
                                            <div className="headerImg">
                                                <img src={taiyiIcon} alt=""/>
                                            </div>
                                        </div>
                                        <div className="topic-detail-guest-left">
                                            <div className="headerImg-hantao">
                                                <img src={hantaoIcon} alt=""/>
                                            </div>
                                            <div className="content">
                                                <div className="user-info">
                                                    <div className="name">韩涛</div>
                                                    <div className="position">大众汽车技术专家</div>
                                                </div>
                                                <div className="comment">
                                                    不错，其实我们对大众ID. 的声音做了很多重塑和创造。比如，汽车亮灯时的声音、操作方向盘控件的声音、启动的声音、打转向的声音、行驶时的声音等，比较多元化，也是契合了未来趋势。太一，你对多元化那是非常有发言权的，从你的音乐中能够很明显地感受到。
                                                </div>
                                            </div>
                                        </div>
                                        <div className="topic-detail-guest-right">
                                            <div className="content">
                                                <div className="user-info">
                                                    <div className="name">太一</div>
                                                    <div className="position">中国新生代音乐人</div>
                                                </div>
                                                <div className="comment">
                                                    多元化是构筑未来感的必要要素，因为未来一定是多元的！音乐也一样，不应该有界限和规则，这些所谓的界限和规则对听众来说太死气沉沉了。将不同的元素融合在一起，不仅可以让音乐更丰富有层次，也是在传递包容性、多元化的观念。未来一定是丰富的、融合的，这一点我非常喜欢大众ID. 的尝试。
                                                </div>
                                            </div>
                                            <div className="headerImg">
                                                <img src={taiyiIcon} alt=""/>
                                            </div>
                                        </div>
                                        <div className="topic-detail-guest-left">
                                            <div className="headerImg-hantao">
                                                <img src={hantaoIcon} alt=""/>
                                            </div>
                                            <div className="content">
                                                <div className="user-info">
                                                    <div className="name">韩涛</div>
                                                    <div className="position">大众汽车技术专家</div>
                                                </div>
                                                <div className="comment">
                                                    除此之外，我们还有其他更多的尝试，让声音更加人性化、便捷化、功能化，让大家可以更加专注于功能性和安全性提示，用科技的高效属性和功能属性来营造未来感。正如分享的视频中，在进入大众ID. 驾驶舱后驾驶者会收到一个声音信号，这个声音信号的背后含义是“你好，我们准备出发了”，同时这种声音信号将会和光信号结合在一起。
                                                </div>
                                            </div>
                                        </div>
                                        <div className="topic-detail-guest-right">
                                            <div className="content">
                                                <div className="user-info">
                                                    <div className="name">太一</div>
                                                    <div className="position">中国新生代音乐人</div>
                                                </div>
                                                <div className="comment">
                                                    如果把鼓点变成开门的提示音呢？就像【自我而始】里前奏部分的鼓点，让进入汽车如同入场式般的郑重，这跨界多好玩啊。
                                                </div>
                                            </div>
                                            <div className="headerImg">
                                                <img src={taiyiIcon} alt=""/>
                                            </div>
                                        </div>
                                        <div className="topic-detail-guest-video">
                                            <video poster="https://id-oss.vw.com.cn/img/sound.jpg" controls="controls"  id="kolVideo" >
                                                <source src="https://id-oss.vw.com.cn/video/sound02.mp4"/>
                                            </video>
                                        </div>
                                        <div className="topic-detail-guest-left">
                                            <div className="headerImg-hantao">
                                                <img src={hantaoIcon} alt=""/>
                                            </div>
                                            <div className="content">
                                                <div className="user-info">
                                                    <div className="name">韩涛</div>
                                                    <div className="position">大众汽车技术专家</div>
                                                </div>
                                                <div className="comment">
                                                    这个想法我喜欢！动感的音乐让电动汽车的驾驶体验变得更加激动人心，我已经拿小本本记下了！像这样极具功能化、人性化、智能化的声音，才是电动车作为改变未来出行方式，该有的好声音。
                                                </div>
                                            </div>
                                        </div>
                                        <div className="topic-detail-guest-right">
                                            <div className="content">
                                                <div className="user-info">
                                                    <div className="name">太一</div>
                                                    <div className="position">中国新生代音乐人</div>
                                                </div>
                                                <div className="comment">
                                                    连线ID. 玩家，大家可以都发表下自己的想法。
                                                </div>
                                            </div>
                                            <div className="headerImg">
                                                <img src={taiyiIcon} alt=""/>
                                            </div>
                                        </div>
                                        <div className="topic-detail-guest-left">
                                            <div className="headerImg-hantao">
                                                <img src={hantaoIcon} alt=""/>
                                            </div>
                                            <div className="content">
                                                <div className="user-info">
                                                    <div className="name">韩涛</div>
                                                    <div className="position">大众汽车技术专家</div>
                                                </div>
                                                <div className="comment">
                                                    是啊，和我们一起互动，你的建议我们都会一一参考噢
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        }

                    </div>
                </div>
                <div className="topic-detail-comment">
                    <div className="topic-detail-comment-head">
                        <div className="topic-detail-comment-title">
                            {type == "20" && "展示区"}
                            {type == "10" && "讨论区"}
                        </div>
                        <div onClick={()=>this.sort()}>
                            {sort===0?"通过点赞数排序":"通过时间排序"} <img src={sortIcon} className="topic-detail-comment-sort" alt=""/>
                        </div>
                    </div>
                    <div className="topic-detail-comment-main">
                        {
                            topicDetail.post && topicDetail.post.records.map((item, index) => {
                                let arr = [];
                                if(item.imageUrl){
                                    arr = JSON.parse(item.imageUrl);
                                }
                                return (<div
                                    className="topic-detail-comment-item" key={index}>
                                    <div className="user">
                                        <div className="user-box" style={{background:Utils.getUserBackground(item.valueLevel)}}>
                                            <img src={item.profilePhoto} alt=""/>
                                            {Utils.getUserLevelImg(item.valueLevel,"post-comment-left-img-icon")}
                                        </div>
                                        {item.nickname}
                                    </div>
                                    <div onClick={()=>this.props.router.push({
                                        pathname:"/post",
                                        query: {
                                            id: item.id
                                        }
                                    })}>

                                        {
                                            arr.length===1 && <div className="img-item1">
                                                <div>
                                                    <img src={arr[0]} alt=""/>
                                                </div>
                                            </div>
                                        }
                                        {
                                            arr.length===2 && <div className="img-item2">
                                                <div>
                                                    <img src={arr[0]} alt=""/>
                                                </div>
                                                <div>
                                                    <img src={arr[1]} alt=""/>
                                                </div>
                                            </div>
                                        }
                                        {
                                            arr.length > 2 && <div className="img-item3">
                                                {
                                                    arr.map((i,j)=> <div style={{width:w+'px'}} key={j}>
                                                        <img src={i} alt=""/>
                                                    </div>)
                                                }
                                            </div>
                                        }

                                        <div className="text">
                                            {item.title}
                                        </div>
                                    </div>
                                    <div className="comment-foot">
                                        <div onClick={()=>this.props.router.push({
                                            pathname:"/post",
                                            query: {
                                                id: item.id
                                            }
                                        })}>
                                            {moment(item.gmtCreate).format("MM/DD")}
                                            <span><img src={shareIcon} alt=""/>{item.forwardCount}</span>
                                        </div>
                                        <div onClick={()=>this.props.router.push({
                                            pathname:"/post",
                                            query: {
                                                id: item.id
                                            }
                                        })}>
                                            <img src={commentIcon} alt=""/>{item.commentCount}
                                            <span>
                                            <img src={item.isLiked==0?collectionIcon:collectionIconRed} alt=""/>{item.likeCount}
                                        </span>
                                        </div>
                                    </div>
                                </div>)})
                        }
                        {
                            topicDetail.post && topicDetail.post.records.length===0 && <div className="no-data">暂无数据</div>
                        }
                    </div>
                </div>
                {refreshing && <div className="more-loading"><ActivityIndicator text="正在加载" /></div>}
                { type == "20" &&  <div className="topic-detail-footer">
                    <button onClick={() => {
                        window.location.href = topicDetail.detail.outUrl;
                        stm_clicki('send', 'event', '按钮', '点击', "参与互动", "");
                    }}>参与互动</button>
                    <button onClick={() => {
                        this.props.router.push({
                            pathname: "/postPush",
                            query: {
                                tagCode: topicDetail.detail.tagCode,
                                tagName: topicDetail.detail.tagName,
                                topicId: topicDetail.detail.id
                            }
                        });
                        stm_clicki('send', 'event', '按钮', '点击', "分享我的创作", "");
                    }}>分享我的创作
                    </button>
                </div>}
                {type == "10" && <div className="topic-detail-footer">
                    <button onClick={() => {
                        this.props.router.push({
                            pathname: "/postPush",
                            query: {
                                tagCode: topicDetail.detail.tagCode,
                                tagName: topicDetail.detail.tagName,
                                topicId: topicDetail.detail.id
                            }
                        });
                        stm_clicki('send', 'event', '按钮', '点击', "分享我的观点", "");
                    }}>分享我的观点</button>

                </div>}
            </div>
        );
    }
}
export default withRouter(TopicDetail)
TopicDetail.propTypes = {
    topicDetail: PropTypes.object.isRequired,
    getTopicDetail: PropTypes.func.isRequired,
    getTopicDetailPost:PropTypes.func.isRequired
}

