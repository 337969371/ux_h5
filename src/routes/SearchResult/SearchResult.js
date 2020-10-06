import React from "react";

import searchIcon from "../../static/icon/search-icon.svg"
import './SearchResult.scss'
import Header from "../../components/Header/Header";
import {Tabs} from "antd-mobile";
import {postF} from "../../utils/api";
import moment from "moment"
import Empty from "../../components/Empty/Empty";


export default class SearchResult extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            keyWords:'',
            historyKeyWords:[],
            pageSize:10,
            topicPageNum:1,
            isFooterTopic:false,
            topicList:[],
            postPageNum:1,
            isFooterPost:false,
            postList:[],
            articlePageNum:1,
            isFooterArticle:false,
            tabIndex:"3",
            articleList:[],
            refreshing:false
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollChange)
    }
    scrollChange = (e) => {
        const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
            || window.pageYOffset
            || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        let h= document.body.clientHeight - document.documentElement.clientHeight;
        const { tabIndex, refreshing,topicPageNum,isFooterTopic,isFooterPost,postPageNum,articlePageNum,isFooterArticle} = this.state;
        if( h === scrollTop && scrollTop>0 && !refreshing){

            // { title: '品牌内容', sub: '3' },
            // { title: '社区内容', sub: '2' },
            // { title: '活动内容', sub: '1' },
            if(tabIndex == "1"){
                if(!isFooterTopic){
                    this.setState({
                        refreshing:true,
                        topicPageNum:topicPageNum+1
                    },()=>this.getTopicList())
                }
            }else if(tabIndex == "2"){

                if(!isFooterPost){
                    this.setState({
                        refreshing:true,
                        postPageNum:postPageNum+1
                    },()=>this.getPostList())
                }

            }else if(tabIndex == "3"){
                if(!isFooterArticle){
                    this.setState({
                        refreshing:true,
                        articlePageNum:articlePageNum+1
                    },()=>this.getArticleList())
                }
            }
        }
    }
    getInit(){
        const { location } = this.props;
        if(location && location.query && location.query.keyWords){
            this.setState({
                historyKeyWords:[],
                pageSize:10,
                topicPageNum:1,
                isFooterTopic:false,
                topicList:[],
                postPageNum:1,
                isFooterPost:false,
                postList:[],
                articlePageNum:1,
                isFooterArticle:false,
                articleList:[],
                keyWords:location.query.keyWords
            },()=>{
                this.getHistory();
                this.getTopicList();
                this.getPostList();
                this.getArticleList();
            })
        }

    }
    componentDidMount() {
        this.getInit();
        document.onkeydown =  (event) =>{
            let e = event || window.event;
            if (e.keyCode === 13) {
                this.search();
            }
        };
        window.addEventListener('scroll', this.scrollChange)
    }
    getTopicList(){
        const { keyWords, topicPageNum,topicList } = this.state;
        let params={
            "pageNum": topicPageNum,
            "pageSize": 10,
            "search": keyWords,
        };
        postF("forum/topic/list",null,params).then(res=>{
            let isFooter=false;
            if(res.records.length<10){
                isFooter=true;
            }
            this.setState({
                isFooterTopic:isFooter,
                refreshing:false,
                topicList:[...Object.assign([],topicList),...Object.assign([],res.records)]
            })
        });
    }
    getPostList(){
        const { keyWords, postPageNum,postList } = this.state;
        let params={
            "pageNum": postPageNum,
            "pageSize": 10,
            "search": keyWords,
        };
        postF("forum/post/list",null,params).then(res=>{
            let isFooter=false;
            if(res.records.length<10){
                isFooter=true;
            }
            this.setState({
                isFooterPost:isFooter,
                refreshing:false,
                postList:[...Object.assign([],postList),...Object.assign([],res.records)]
            })
        });
    }
    getArticleList(){
        const { keyWords, articlePageNum , articleList } = this.state;
        let params={
            "pageNum": articlePageNum,
            "pageSize": 10,
            "search": keyWords,
        };
        postF("forum/article/list",null,params).then(res=>{
            let isFooter=false;
            if(res.records.length<10){
                isFooter=true;
            }
            this.setState({
                isFooterArticle:isFooter,
                refreshing:false,
                articleList:[...Object.assign([],articleList),...Object.assign([],res.records)]
            })
        });
    }
    getHistory(){
        try {
            this.setState({
                historyKeyWords:JSON.parse(localStorage.getItem("keyWords"))
            })
        }catch (e) {

        }
    }
    search(){
        const {keyWords,historyKeyWords} =this.state;
        let h = historyKeyWords || [];
        if(keyWords){
            h.unshift(keyWords);
            localStorage.setItem("keyWords",JSON.stringify([...new Set(h)]));
            this.props.router.replace({
                pathname:"/searchResult",
                query: {
                    keyWords:keyWords,
                }
            });
            setTimeout(()=>{
                this.getInit();
            },200)
        }
    }
    clearHistory(){
        localStorage.removeItem("keyWords");
        this.getHistory();
    }
    changeTab(tabIndex){
        this.setState({
            tabIndex:tabIndex,
        })
    }
    goTopic(id,type){
        this.props.router.push({
            pathname:"/topicDetail",
            query: {
                id:id,
                type:type
            }
        })
    }
    goPost(id){
        this.props.router.push({
            pathname:"/post",
            query: {
                id:id,
            }
        })
    }
    goArticle(id){
        this.props.router.push({
            pathname:"/article",
            query: {
                id:id,
            }
        })
    }
    render() {
        const { keyWords,topicList, postList, articleList } =this.state;
        const tabs = [
            { title: '品牌内容', sub: '3' },
            { title: '社区内容', sub: '2' },
            { title: '活动内容', sub: '1' },
        ];
        return (
            <div className="search-result">
                <Header {...this.props} isBlack={true} close={true} onClose={()=>{
                    this.props.router.goBack();
                    this.props.router.goBack()
                }}/>
                <div className="search-body">
                    <div className="search-input">
                        <a onClick={()=>this.search()}>
                            <img src={searchIcon} alt=""/>
                        </a>
                        <input type="text" value={keyWords} placeholder="Keywords" onChange={(e)=>this.setState({
                            keyWords:e.target.value
                        })}/>
                    </div>
                </div>
                <div className="search-result-main">
                    <Tabs tabs={tabs}
                          useOnPan={false}
                          initialPage={0}
                          onChange={(tab, index) => this.changeTab(tab.sub)}
                    >
                        <div className="search-result-content">
                            {
                                articleList && articleList.length>0 && articleList.map((item,index)=>{
                                    return(
                                        <div className="search-result-item" key={index} onClick={()=>this.goArticle(item.id)}>
                                            <div className="result-img">
                                                <img src={item.imageUrl} alt=""/>
                                            </div>
                                            <div className="info">
                                                <div className="title">
                                                    {item.title}
                                                </div>
                                                <div className="footer">
                                                    <div className="name">
                                                        {item.nickname}
                                                    </div>
                                                    <div className="time">
                                                        {moment(item.gmtCreate).format("MM/DD")}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {articleList && articleList.length===0 && <Empty text="暂无相关内容" />}
                        </div>
                        <div className="search-result-content">
                            {
                                postList && postList.length>0 && postList.map((item,index)=>{
                                    return(
                                        <div className="search-result-item" key={index} onClick={()=>this.goPost(item.id)}>
                                            <div className="result-img">
                                                <img src={JSON.parse(item.imageUrl)[0]} alt=""/>
                                            </div>
                                            <div className="info">
                                                <div className="title">
                                                    {item.title}
                                                </div>
                                                <div className="footer">
                                                    <div className="name">
                                                        {item.nickname}
                                                    </div>
                                                    <div className="time">
                                                        {moment(item.gmtCreate).format('MM/DD')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {postList && postList.length===0 && <Empty text="暂无相关内容" />}
                        </div>
                        <div className="search-result-content">
                            {
                                topicList && topicList.length>0 && topicList.map((item,index)=>{
                                    return(
                                        <div className="search-result-item" key={index} onClick={()=>this.goTopic(item.id,item.type)}>
                                            <div className="result-img">
                                                <img src={item.image} alt=""/>
                                            </div>
                                            <div className="info">
                                                <div className="title">
                                                    {item.title}
                                                </div>
                                                <div className="footer">
                                                    <div className="name">
                                                        {item.nickname}
                                                    </div>
                                                    <div className="time">
                                                        {item.gmtCreateStr}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {topicList && topicList.length===0 && <Empty text="暂无相关内容" />}
                        </div>


                    </Tabs>
                </div>
            </div>
        );
    }
}