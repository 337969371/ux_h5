import React from 'react'
import PropTypes from 'prop-types'
import "../style/MyChest.scss"
import { withRouter} from "react-router";
import { Modal, Tabs, Toast} from "antd-mobile";
import moment from "moment";
import Login from "../../../components/Login/Login";
import HeaderNav from "../../../components/HeaderNav/HeaderNav";

class MyChest extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.clean();
        this.state={
            tabIndex:'1',
            pageSize:10,
            entityPageNum:1,
            virtualPageNum:1,
            wallpaperPageNum:1,
            refreshing:false,
            showShare:false,
            posterUrl:null,

        }
    }
    componentDidMount() {
        // this.getPrizeEntity();
        // this.getPrizeVirtual();
        this.getPrizeWallpaper();
        window.addEventListener('scroll', this.scrollChange)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollChange)
    }

    scrollChange = (e) => {
        const sT = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
            || window.pageYOffset
            || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        const { refreshing, entityPageNum,virtualPageNum,wallpaperPageNum,tabIndex} = this.state;
        const { myChest } = this.props;
        let h= document.body.clientHeight - document.documentElement.clientHeight;
        if( h === sT && sT>0 && !refreshing){
            if(tabIndex==="1" && !myChest.entity.isFoot){
                this.setState({
                    refreshing:true,
                    recommendPageNum:entityPageNum+1
                },()=>this.getPrizeEntity())
            }else if(tabIndex ==="2" && !myChest.virtual.isFoot){
                this.setState({
                    refreshing:true,
                    virtualPageNum:virtualPageNum+1
                },()=>this.getPrizeVirtual())
            }else if(tabIndex === "3" && !myChest.wallpaper.isFoot){
                this.setState({
                    refreshing:true,
                    wallpaperPageNum:wallpaperPageNum+1
                },()=>this.getPrizeWallpaper())
            }
        }
    }
    getPrizeEntity(){
        const { entityPageNum, pageSize} = this.state;
        this.props.getPrizeEntity({
            pageNum:entityPageNum,
            pageSize: pageSize,
            prizeType: 1,
        }).then(res=>{
            this.setState({
                refreshing:false,
            })
        });
    }
    getPrizeVirtual(){
        const { virtualPageNum, pageSize} = this.state;
        this.props.getPrizeVirtual({
            pageNum:virtualPageNum,
            pageSize: pageSize,
            prizeType: 2,
        }).then(res=>{
            this.setState({
                refreshing:false,
            })
        });
    }
    getPrizeWallpaper(){
        const { wallpaperPageNum, pageSize} = this.state;
        this.props.getPrizeWallpaper({
            pageNum:wallpaperPageNum,
            pageSize: pageSize,
            prizeType: 3,
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

    getGift(id){
        this.props.getGift({
            prizeId:id
        }).then(res=>{
            if(res.code ===0){
                Modal.alert("",res.msg,[
                    {
                        text:"关闭",
                        style:{
                            border:'1px solid rgba(16,17,80,1)',
                            height:'34px',
                            lineHeight:'34px',
                            borderRadius:'30px',
                            fontSize:'14px',
                            flex: 'inherit',
                            width: '110px'
                        }

                    }
                ])
            }else if(res.code ===100200){
                Modal.alert("",res.msg,[
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
                        text:"去完善地址",
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
                            this.props.router.push("/myInfo")
                        }
                    },
                ])
            }else {
                Toast.info(res.msg || "系统错误")
            }
        })
    }
    render() {
        const tabs = [
            // { title: '实物礼品', sub: '1' },
            // { title: '虚拟礼品', sub: '2' },
            { title: '惊喜表情包', sub: '3' },
        ];
        const { myChest } = this.props;
        const { showShare, posterUrl } = this.state;
        return (
            <div className="my myChest">
                <HeaderNav transparent={true}  {...this.props}/>
                <Login {...this.props}/>
                <Modal
                    className="posterShare"
                    transparent
                    onClose={()=>this.setState({showShare:false,posterUrl:null})}
                    visible={showShare}
                >
                    <div>
                        <img src={posterUrl} alt=""/>
                        <div className="poster-hint">
                            长按保存
                        </div>
                    </div>
                </Modal>
                <div className="myChest-header">
                    点击图片查看并保存表情动图
                </div>
                {/*<div className="my-info">*/}
                {/*    <div className="my-info-header">*/}
                {/*    </div>*/}
                {/*    <div className="my-info-title">ID.百宝箱</div>*/}
                {/*</div>*/}

                <div className="my-chest-body">
                    <div className="my-body-content my-chest-body-main">
                        {/*<Tabs tabs={tabs}*/}
                        {/*      useOnPan={false}*/}
                        {/*      swipeable={false}*/}
                        {/*      initialPage={0}*/}
                        {/*      onChange={(tab, index) => this.changeTab(tab.sub)}*/}
                        {/*>*/}
                            {/*<div>*/}
                            {/*    {*/}
                            {/*        myChest.entity*/}
                            {/*        && myChest.entity.records*/}
                            {/*        && myChest.entity.records.map((item,index)=><div key={index} className="my-chest-item">*/}
                            {/*            <div className="left">*/}
                            {/*                <img src={item.imgListUrl} alt=""/>*/}
                            {/*            </div>*/}
                            {/*            <div className="right">*/}
                            {/*                <div className="title">*/}
                            {/*                    <h4>*/}
                            {/*                        {item.prizeName}*/}
                            {/*                    </h4>*/}
                            {/*                    <div>*/}
                            {/*                        {*/}
                            {/*                            item.isPrized === "1" && <button className="received-gift">*/}
                            {/*                                已领取*/}
                            {/*                            </button>*/}
                            {/*                        }*/}
                            {/*                        {*/}
                            {/*                            item.isPrized === "3" && <button className="received-gift">*/}
                            {/*                                已兑完*/}
                            {/*                            </button>*/}
                            {/*                        }*/}
                            {/*                        {*/}
                            {/*                            item.isPrized === "2" && <button className="overdue-gift">*/}
                            {/*                                待成长*/}
                            {/*                            </button>*/}
                            {/*                        }*/}
                            {/*                        {*/}
                            {/*                            item.isPrized === "0" && <button className="get-gift" onClick={()=>this.getGift(item.id)}>*/}
                            {/*                                领取*/}
                            {/*                            </button>*/}
                            {/*                        }*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}

                            {/*                <div className="my-chest-item-info">*/}
                            {/*                    <div>*/}
                            {/*                        {item.desc}*/}
                            {/*                    </div>*/}
                            {/*                    <div className="time">*/}
                            {/*                        {moment(item.gmtCreate).format("YY/MM/DD")}*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>)*/}
                            {/*    }*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    {*/}
                            {/*        myChest.virtual*/}
                            {/*        && myChest.virtual.records*/}
                            {/*        && myChest.virtual.records.map((item,index)=><div key={index} className="my-chest-item">*/}
                            {/*            <div className="left">*/}
                            {/*                <img src={item.imgListUrl} alt=""/>*/}
                            {/*            </div>*/}
                            {/*            <div className="right">*/}
                            {/*                <div className="title">*/}
                            {/*                    <h4>*/}
                            {/*                        {item.prizeName}*/}
                            {/*                    </h4>*/}
                            {/*                    <div>*/}
                            {/*                        {*/}
                            {/*                            item.isPrized === "1" && <button className="received-gift">*/}
                            {/*                                已领取*/}
                            {/*                            </button>*/}
                            {/*                        }*/}
                            {/*                        {*/}
                            {/*                            item.isPrized === "3" && <button className="received-gift">*/}
                            {/*                                已兑完*/}
                            {/*                            </button>*/}
                            {/*                        }*/}
                            {/*                        {*/}
                            {/*                            item.isPrized === "2" && <button className="overdue-gift">*/}
                            {/*                                待成长*/}
                            {/*                            </button>*/}
                            {/*                        }*/}
                            {/*                        {*/}
                            {/*                            item.isPrized === "0" && <button className="get-gift" onClick={()=>this.getGift(item.id)}>*/}
                            {/*                                领取*/}
                            {/*                            </button>*/}
                            {/*                        }*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}

                            {/*                <div className="my-chest-item-info">*/}
                            {/*                    <div>*/}
                            {/*                        ID.值到达{item.prizePoints}可领取*/}
                            {/*                    </div>*/}
                            {/*                    <div className="time">*/}
                            {/*                        {moment(item.gmtCreate).format("YY/MM/DD")}*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>)*/}
                            {/*    }*/}
                            {/*</div>*/}
                            <div>
                                {
                                    myChest.wallpaper
                                    && myChest.wallpaper.records
                                    && myChest.wallpaper.records.map((item,index)=><div key={index} className="my-chest-wallpaper-item" onClick={()=>{
                                        this.props.getMemberInfo().then(res=>{
                                            if(res && res.idNumber){
                                                this.setState({
                                                    showShare:true,
                                                    posterUrl:item.imgBigUrl,
                                                })
                                            }
                                        })

                                    }}>
                                        <img src={item.imgListUrl} alt=""/>
                                        <div className="my-chest-wallpaper-info">
                                            {/*<div className="title">*/}
                                            {/*    {item.prizeName}*/}
                                            {/*</div>*/}
                                            {/*<div>*/}
                                            {/*    {moment(item.gmtCreate).format("MM/DD")}*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>)
                                }
                            </div>
                        {/*</Tabs>*/}
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(MyChest)
MyChest.propTypes = {
    getPrizeEntity:PropTypes.func.isRequired,
    getPrizeVirtual:PropTypes.func.isRequired,
    getPrizeWallpaper:PropTypes.func.isRequired,
    getGift:PropTypes.func.isRequired,
    clean:PropTypes.func.isRequired
}

