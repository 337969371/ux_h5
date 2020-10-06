import React from 'react'
import PropTypes from 'prop-types'
import "../style/tag.scss"


import WaterFallBlock from "../../../components/WaterFallBlock/WaterFallBlock";
import {ActivityIndicator, Tabs} from "antd-mobile";
import Login from "../../../components/Login/Login";
import ReactWaterfall from '@feizheng/react-waterfall';
import HeaderNav from "../../../components/HeaderNav/HeaderNav";


export default class TagDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.clean();
        this.props.getDetail({tagCode:this.props.location.query.code})
        this.state={
            code:this.props.location.query.code,
            pageNum:0,
            pageSize:10,
            tabIndex:'3',
            refreshing:false,
            scrollTop:0,
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
        const { tagDetail } = this.props;
        this.setState({
            scrollTop:scrollTop
        })
        if( h === scrollTop && scrollTop>0 && !refreshing){
            if(!tagDetail.post.isFoot){
                this.setState({
                    refreshing:true,
                    pageNum:pageNum+1
                },()=>this.getPostList())
            }
        }
    }
    getPostList(){
        const {code,pageNum,pageSize,tabIndex} = this.state;
        let params = {
            "pageNum": pageNum,
            "pageSize": pageSize,
            "tagCode": code,
        };
        if(tabIndex === "1"){
            //精华
            params.isElite="1";
        }else if(tabIndex === "2"){
            //最新
            params.sort="1";
        }else if(tabIndex === "3"){
            //最热
            params.sort="0";
        }
        if(pageNum ===1 ){
            params.clean=true;
        }
        this.props.getPostList(params).then((res)=>{
            this.setState({
                refreshing:false,
            })
        })
    }
    changeTab(tabIndex){
        this.setState({
            tabIndex:tabIndex,
            pageNum:1,
        },()=>{
            this.getPostList();
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
    render() {
        const {tagDetail,isShowLoginModal} = this.props;
        const {refreshing,scrollTop} =this.state
        const tabs = [
            // { title: '精选', sub: '1' },
            { title: '最热', sub: '3' },
            { title: '最新', sub: '2' },
        ];
        if(!tagDetail.detail){
            return null;
        }
        // const items = [
        //     { src: 'https://picsum.photos/id/658/200/300', id: '111' },
        //     { src: 'https://picsum.photos/id/653/200/100', id: '222' },
        //     { src: 'https://picsum.photos/id/112/300/200', id: '333' },
        //     { src: 'https://picsum.photos/id/656/500/200', id: '444' },
        //     { src: 'https://picsum.photos/id/115/100/120', id: '555' },
        //     { src: 'https://picsum.photos/id/621/100/180', id: '666' },
        //     { src: 'https://picsum.photos/id/634/160/120', id: '777' },
        //     { src: 'https://picsum.photos/id/101/160/120', id: '888' },
        //     { src: 'https://picsum.photos/id/102/160/120', id: '999' },
        //     { src: 'https://picsum.photos/id/103/160/120', id: '100' }
        // ];
        // console.log(scrollTop)
        return (
            <div className="tag-detail">
                <HeaderNav  transparent={true} isLight={true} {...this.props} />
                <Login {...this.props} onClose={()=>isShowLoginModal(false)}/>

                <div className="tag-head" style={{backgroundImage:`url(${tagDetail.detail.imageUrl})`}}>
                    <div className="tag-head-num">
                        <div>
                            <p>{tagDetail.detail.postLikeCount}</p>
                            <p>关注</p>
                        </div>
                        <div>
                            <p>{tagDetail.detail.postReadCount}</p>
                            <p>阅读</p>
                        </div>
                    </div>
                    <div className="tag-head-info">
                        <div className="tag-head-info-title">
                            {tagDetail.detail.name}
                        </div>
                        <div className="tag-head-info-text">
                            {tagDetail.detail.remark}
                        </div>
                    </div>
                </div>
                <div  className={scrollTop>350?"tag-tab":null}>
                    <Tabs tabs={tabs}
                          useOnPan={false}
                          swipeable={false}
                          initialPage={0}
                          onChange={(tab, index) => this.changeTab(tab.sub)}
                    >
                        <div className="tag-post-list">
                            <div className="my-waterfall">
                                <ReactWaterfall
                                    column={2}
                                    items={tagDetail.post && tagDetail.post.records?tagDetail.post.records:[]}
                                    template={this.template} />
                            </div>
                        </div>
                        <div className="tag-post-list">
                            <div className="my-waterfall">
                                <ReactWaterfall
                                    column={2}
                                    items={tagDetail.post && tagDetail.post.records?tagDetail.post.records:[]}
                                    template={this.template} />
                            </div>
                        </div>
                        <div className="tag-post-list">
                            <div className="my-waterfall">
                                <ReactWaterfall
                                    column={2}
                                    items={tagDetail.post && tagDetail.post.records?tagDetail.post.records:[]}
                                    template={this.template} />
                            </div>
                        </div>
                    </Tabs>
                </div>
                {refreshing && <div className="more-loading"><ActivityIndicator text="正在加载" /></div>}
                <a className="tag-add-post" onClick={()=>{this.props.router.push({
                    pathname:"/postPush",
                    query: {
                        tagCode:tagDetail.detail.code,
                        tagName:tagDetail.detail.name
                    }
                })
                    stm_clicki('send', 'event', '页面跳转', '点击', "去发帖页", "");
                }}>
                    <img src="https://id-oss.vw.com.cn/img/post_edit_icon.png" alt="新增"/>
                </a>
            </div>
        );
    }
}
TagDetail.propTypes = {
    getDetail: PropTypes.func.isRequired,
    getPostList:PropTypes.func.isRequired,
    isLike:PropTypes.func.isRequired,
    clean:PropTypes.func.isRequired,
}

