import React from "react";

import searchIcon from "../../static/icon/search-icon.svg"
import './Search.scss'
import Header from "../../components/Header/Header";
import {Link} from "react-router";
import close from "../../static/icon/icon-close-black.svg"
import logoBlack from "../../static/icon/logo-black.png"
import tianjia1 from "../../static/icon/tianjia-1.png"
import tianjia2 from "../../static/icon/tianjia-2.png"
import {postC} from "../../utils/api";


export default class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            keyWords:'',
            historyKeyWords:[],
            hotKeyWords:[],
            showHint:false,
        }
    }
    componentDidMount() {
        this.getHistory();
        let  showHint =  localStorage.getItem("showHint");
        if(!showHint){
            this.setState({
                showHint:true
            })
        }
        document.onkeydown =  (event) =>{
            let e = event || window.event;
            if (e.keyCode === 13) {
               this.search();
            }
        };
        postC("customer/dict/hotList",{}).then(res=>{
            this.setState({
                hotKeyWords:res
            })
        })
    }

    closeHint(){
        localStorage.setItem("showHint","true");
        this.setState({
            showHint:false
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
        }
        this.props.router.push({
            pathname:"/searchResult",
            query: {
                keyWords:keyWords,
            }
        })
        stm_clicki('send', 'event', '搜索按钮', '点击', "搜索", "");
    }
    clearHistory(){
        localStorage.removeItem("keyWords");
        this.getHistory();
    }
    render() {
        const {historyKeyWords,showHint,hotKeyWords} =this.state;
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return (
            <div className="search">
                <Header {...this.props} close={true}/>
                <div className="search-body">
                    <div className="search-input">
                        <a onClick={()=>this.search()}>
                            <img src={searchIcon} alt=""/>
                        </a>
                        <input type="text" placeholder="Keywords" onChange={(e)=>this.setState({
                            keyWords:e.target.value
                        })}/>
                    </div>

                    <div className="search-item">
                        <div className="action">
                            <div>
                                历史
                            </div>
                            <div className="clean" onClick={()=>this.clearHistory()}>
                                清除记录
                            </div>
                        </div>
                        <div className="item">
                            {historyKeyWords && historyKeyWords.map((item,index)=>{
                                return <Link to={"/searchResult?keyWords="+item} key={index}><div>{item}</div></Link>
                            })}
                        </div>
                    </div>
                    {
                        hotKeyWords && hotKeyWords.length>0&& <div className="search-item">
                            <div className="action">
                                <div>
                                    热搜
                                </div>
                            </div>
                            <div className="item">
                                {
                                    hotKeyWords.map(item=><Link key={item} to={"/searchResult?keyWords="+item}><div>{item}</div></Link>)
                                }
                                {/*<div>Music</div>*/}
                                {/*<div>Food</div>*/}
                                {/*<div>Fashion</div>*/}
                            </div>
                        </div>
                    }
                </div>
                {showHint && <div className="footer-hint">
                    <div className="close" onClick={()=>this.closeHint()}>
                        <img src={close} alt=""/>
                    </div>
                    <div className="f18">
                        喜欢<img src={logoBlack} />就存起来吧
                    </div>
                    <div className="text">
                        请点选<img src={isiOS?tianjia1:tianjia2}/>添加至主屏幕
                    </div>
                </div>}
            </div>
        );
    }
}