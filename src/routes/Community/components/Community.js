import React from 'react'
import PropTypes from 'prop-types'
import "../style/Community.scss"
import Slider from "react-slick";
import RecommendItem from "../../../components/RecommendItem/RecommendItem";
import TagBlock from "../../../components/TagBlock/TagBlock";
import WaterFallBlock from "../../../components/WaterFallBlock/WaterFallBlock";
import { withRouter} from "react-router";
import {ActivityIndicator} from "antd-mobile"
import Login from "../../../components/Login/Login";
import Menu from "../../../components/Menu/Menu";
import ReactWaterfall from "@feizheng/react-waterfall";


class Community extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            pageSize:10,
            recommendPageNum:1,
            postPageNum:1,
            refreshing:false,
            showMenu:true,
            scrollTop:0,
            isFirst:false,
        }
    }
    componentDidMount() {
        this.props.clean();
        this.props.getTagList({});
        this.getRecommendPostList();
        this.getPostList();
        this.props.getTopicCategoryList();
        this.props.getSlideshowList({
            type:"400"
        });
        window.addEventListener('scroll', this.scrollChange);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollChange)
    }

    scrollChange = (e) => {
        const sT = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
            || window.pageYOffset
            || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        let h= document.body.clientHeight - document.documentElement.clientHeight;
        const {scrollTop} =this.state;
        if(scrollTop > sT || sT === 0){
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
        const { refreshing, postPageNum,recommendPageNum,index} = this.state;
        const { community,location } = this.props;
        let active="#recommend";
        if(location.hash){
            active = location.hash;
        }
        if( h === sT && sT>0 && !refreshing){
            if(active==="#recommend" && !community.articleList.isFoot){
                this.setState({
                    refreshing:true,
                    recommendPageNum:recommendPageNum+1
                },()=>this.getRecommendPostList())
            }else if(active==="#circle" && !community.post.isFoot){
                this.setState({
                    refreshing:true,
                    postPageNum:postPageNum+1
                },()=>this.getPostList())
            }
            // else if(active==="#activity"){
            //         this.setState({
            //             refreshing:false
            //         })
            //     }
        }
    }
    getPostList(){
        const {pageSize,postPageNum} = this.state;
        this.props.getPostList({
            pageNum:postPageNum,
            pageSize:pageSize,
            sort:"1",
            isElite:"1"
        }).then(res=>{
            this.setState({
                refreshing:false,
            })
        });
    }
    getRecommendPostList(){
        const {pageSize,recommendPageNum} = this.state;
        this.props.getRecommendPostList({
            pageNum:recommendPageNum,
            pageSize:pageSize,
            categoryCode:"ac_01"
        }).then((res)=>{
            this.setState({
                refreshing:false,
            })
        })
    }
    template = ({ item }) => {
        return (
            <div key={item.id} className={`is-item`}>
                <WaterFallBlock {...this.props}
                                valueLevel={item.valueLevel}
                                tag={item.tagName}
                                title={item.title}
                                img={item.imageUrl}
                                head={item.profilePhoto}
                                name={item.nickname}
                                isCollection={item.isLiked===1}
                                id={item.id}
                                collectionNum={item.likeCount}

                />
            </div>
        );
    };
    onShowLogin(){
        const { isShowLoginModal } = this.props;
        isShowLoginModal(true);
    }
    goTargetPage(label,url){
        this.props.router.push(url);
        stm_clicki('send', 'event','lifestyle首页', "轮播点击",label);
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
        let { refreshing, scrollTop, isFirst} = this.state;
        const { isShowLoginModal,community,location } = this.props;
        let active="#recommend";
        if(location.hash){
            active = location.hash;
        }
        return (
            <div className="community">
                <Menu unfold={this.state.showMenu}/>
                <Login {...this.props} onClose={()=>isShowLoginModal(false)}/>
                <div>
                    {community.slideshowList && <Slider {...settings}>
                        {
                            community.slideshowList.map((item,index)=> <div key={index} onClick={()=>this.goTargetPage(item.label,item.h5Url)} className="post-detail-slider-img">
                                <div className="post-detail-slider-img-box">
                                    <div className="community-slider-title">
                                        <div className="name">{item.name}</div>
                                        <div className="title">{item.title}</div>
                                    </div>
                                    <img src={item.imageUrl} alt=""/>
                                </div>
                            </div>)
                        }
                    </Slider>}
                </div>
                <div>
                    <div className={["tab-body",scrollTop>350?"tab-body-top":""].join(" ")}>
                        <div className="custom-tab">
                            <ul>
                                <a href="#recommend">
                                    <li className={active==="#recommend"?"active":""} >
                                        <div>推荐</div>
                                        <div className="custom-tab-line"></div>
                                    </li>
                                </a>
                                <a href="#circle">
                                    <li className={active==="#circle"?"active":""}>
                                        <div>圈子</div>
                                        <div className="custom-tab-line"></div>
                                    </li>
                                </a>
                                <a href="#activity">
                                    <li className={active==="#activity"?"active":""}>
                                        <div>活动</div>
                                        <div className="custom-tab-line"></div>
                                    </li>
                                </a>
                            </ul>
                        </div>
                    </div>
                    <div>
                        {active==="#recommend" && <div className="recommend-main">

                            {
                                community.articleList &&
                                community.articleList.records &&
                                community.articleList.records.map((item, index)=> <RecommendItem {...this.props} data={item} key={index} />)
                            }
                        </div>}
                        {active==="#circle" && <div className="circle-main">
                            <div className="tags-main">
                                <div className="tags-body">
                                    {
                                        community.tag && community.tag.length>0&&community.tag.map((item,index)=>
                                            <TagBlock key={index} title={item.name} num={item.postCount}  onClick={()=>this.props.router.push({
                                                pathname:"/tag",
                                                query: {
                                                    code:item.code
                                                }
                                            })}/>)
                                    }
                                </div>
                            </div>

                            <div className="circle-main-title">
                                <span></span>
                                <h4>热门</h4>
                            </div>
                            <div>
                                <div className="my-waterfall">
                                    <ReactWaterfall
                                        column={2}
                                        items={community.post && community.post.records?community.post.records:[]}
                                        template={this.template} />
                                </div>
                            </div>
                        </div>}
                        {active==="#activity" && <div className="activity-main">
                            {
                                community.topicCategoryList &&
                                community.topicCategoryList.map((item,index)=><div className="activity-item" key={index}>
                                    <div className="activity-header">
                                        <div className="activity-item-title">
                                            <div>
                                                <img src={item.iconUrl} alt=""/>
                                                <span>{item.typeName}</span>
                                            </div>
                                            <div>
                                                <button className="btn-blue" onClick={()=>this.props.router.push({
                                                    pathname:"/topic",
                                                    query: {
                                                        type:item.type
                                                    }
                                                })}>
                                                    所有活动
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="activity-item-img"
                                         onClick={()=>{
                                             if(item.subTitle!=="敬请期待"){
                                                 this.props.router.push({
                                                     pathname:"/topicDetail",
                                                     query: {
                                                         id:item.topicId,
                                                         type:item.type
                                                     }
                                                 })
                                             }
                                         }
                                         }>
                                        <img src={item.image} alt=""/>
                                        <div className="activity-item-img-text">
                                            <p className="title">{item.title}</p>
                                            <p style={{fontSize:16}}>{item.subTitle}</p>
                                        </div>
                                    </div>
                                </div>)
                            }
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </div>}
                    </div>
                </div>
                {refreshing && <div className="more-loading"><ActivityIndicator text="正在加载" /></div>}
            </div>
        );
    }
}
export default withRouter(Community)
Community.propTypes = {
    clean:PropTypes.func.isRequired,
    globalData: PropTypes.object.isRequired,
    community: PropTypes.object.isRequired,
    getPostList: PropTypes.func.isRequired,
    isLike:PropTypes.func.isRequired,
    getTagList:PropTypes.func.isRequired,
    getRecommendPostList:PropTypes.func.isRequired,
    getTopicCategoryList:PropTypes.func.isRequired,
    getSlideshowList:PropTypes.func.isRequired,
}

