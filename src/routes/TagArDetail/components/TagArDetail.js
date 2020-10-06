import React from 'react'
import PropTypes from 'prop-types'
import "../style/tagAr.scss"


import WaterFallBlock from "../../../components/WaterFallBlock/WaterFallBlock";
import {ActivityIndicator, Modal, Tabs} from "antd-mobile";
import Login from "../../../components/Login/Login";
import ReactWaterfall from '@feizheng/react-waterfall';
import HeaderNav from "../../../components/HeaderNav/HeaderNav";


export default class TagArDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.clean();
        this.state={
            code:this.props.location.query.code,
            pageNum:0,
            pageSize:10,
            refreshing:false,
            scrollTop:0,
            showHelp:false
        }
    }
    componentDidMount() {
        this.getPostList();
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
        const { tagArDetail } = this.props;
        this.setState({
            scrollTop:scrollTop
        })
        if( h === scrollTop && scrollTop>0 && !refreshing){
            if(!tagArDetail.post.isFoot){
                this.setState({
                    refreshing:true,
                    pageNum:pageNum+1
                },()=>this.getPostList())
            }
        }
    }
    getPostList(){
        const {pageNum,pageSize} = this.state;
        let params = {
            "pageNum": pageNum,
            "pageSize": pageSize,
            "tagCode": "107",
        };
        if(pageNum ===1 ){
            params.clean=true;
        }
        this.props.getPostList(params).then((res)=>{
            this.setState({
                refreshing:false,
            })
        })
    }
    template = ({ item }) => {
        return (
            <div key={item.id} className={`is-item`}>
                <WaterFallBlock {...this.props}
                                tag={item.tagName}
                                title={item.title}
                                img={item.imageUrl}
                                head={item.profilePhoto}
                                name={item.nickname}
                                isCollection={item.isLiked===1}
                                id={item.id}
                                valueLevel={item.valueLevel}
                                collectionNum={item.likeCount}

                />
            </div>
        );
    };
    showModal(bool){
        this.setState({
            showHelp:bool
        })
    }
    render() {
        const {tagArDetail,isShowLoginModal} = this.props;
        const {refreshing,showHelp} =this.state

        return (
            <div className="tag-ar-detail">
                <HeaderNav  transparent={true} isLight={true} {...this.props} />
                <Login {...this.props} onClose={()=>isShowLoginModal(false)}/>
                <Modal visible={showHelp} transparent onClose={()=>this.setState({showHelp:false})}>
                    <div className="tar-ar-help-text">
                        <div className="title">
                            活动规则
                        </div>
                        <div className="desc">
                            1. 如何参加？<br/>
                            进入AR现场，发挥你的创意想象，让ID. 与太一的联合舞台出现在新奇有趣的惊喜场景下，选择你认为最精彩的瞬间进行截图，注册成为会员，并在此页面上传，即可参与活动。<br/>
                            <br/>
                            2. 能获得什么惊喜加成？<br/>
                            注册成为会员，并上传截图参与活动，即可获100 ID. 值。分享给朋友们一起集赞，活动截止时获赞最多的前十名玩家，将分别获得300 ID.值的奖励！<br/>
                            ID.值积攒的越多，还将有机会获得惊喜礼品哦！<br/><br/>

                            3. 活动时间<br/>
                            2020年9月7日0点- 2020年9月21日24点<br/>
                            * 本活动最终解释权归大众汽车（中国）投资有限公司所有。<br/><br/><br/>
                        </div>
                    </div>
                </Modal>
                <div className="tag-head">
                    <img src="https://id-oss.vw.com.cn/img/arTag.jpg" alt=""/>
                    <button onClick={()=>this.showModal(true)}></button>
                </div>
                <div className="tag-post-list">
                    <div className="my-waterfall">
                        <ReactWaterfall
                            column={2}
                            items={tagArDetail.post && tagArDetail.post.records?tagArDetail.post.records:[]}
                            template={this.template} />
                    </div>
                </div>
                {refreshing && <div className="more-loading"><ActivityIndicator text="正在加载" /></div>}
                <a className="tag-add-post" onClick={()=>{this.props.router.push({
                    pathname:"/postPush",
                    query: {
                        tagCode:"107",
                        tagName:"AR"
                    }
                })
                    stm_clicki('send', 'event', '页面跳转', '点击', "AR现场去发帖页", "");
                }}>
                    晒出我的AR想象
                </a>
            </div>
        );
    }
}
TagArDetail.propTypes = {
    getDetail: PropTypes.func.isRequired,
    getPostList:PropTypes.func.isRequired,
    isLike:PropTypes.func.isRequired,
    clean:PropTypes.func.isRequired,
}

