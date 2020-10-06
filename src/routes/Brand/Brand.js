import React from 'react'
import {Link, withRouter} from 'react-router'
import './Brand.scss'
import Menu from "../../components/Menu/Menu";
import LazyLoad,{forceVisible} from 'react-lazyload';
import Header from "../../components/Header/Header";
import Utils from "../../utils/utils";
import btn from "../../static/brand/btn.png"
import {postF} from "../../utils/api";


class Brand extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      showMenu:true,
      scrollTop:0,
      startTime:0,
      lastTime:0,
      list:[],
    }
  }
  componentDidMount() {
    this.getData();
    Utils.sendRouterChange("/");
    forceVisible();
    window.addEventListener('scroll', this.scrollChange)
  }
  getData(){
    postF("forum/slideshow/list",null,{type:"200"}).then(res=>{
      this.setState({
        list:res
      })
    });
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollChange)
    document.getElementById("brandVideo").removeEventListener('play',this.playL);
    document.getElementById("brandVideo").removeEventListener('timeupdate',this.timeupdateL);
  }
  timeupdateL = (e) =>{
    const { lastTime, startTime } =this.state;
    let newT= parseInt((e.timeStamp-startTime)/1000)
    if(newT%5===0 && newT != lastTime){
      stm_clicki('send', 'event', 'brand首页', '视频播放', newT);
      gio('track', 'video_play', {'video_id_var':'brandVideo', 'video_time_var':newT});
      this.setState({
        lastTime:newT
      })
    }
  }
  playL = (e) => {
    this.setState({
      startTime:e.timeStamp
    });
    stm_clicki('send', 'event','brand首页视频', "视频开始播放",0);
    gio('track', 'video_play', {'video_id_var':'brandVideo', 'video_time_var':0});
  }


  scrollChange = (e) => {
    const sT = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
        || window.pageYOffset
        || (event.srcElement ? event.srcElement.body.scrollTop : 0);

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
  }
  launchFullscreen() {
    let video = document.getElementById('brandVideo');
    let u = navigator.userAgent;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    video.play();
    if (video.requestFullscreen && isiOS) {
      // 最新标准
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen && isiOS) {
      video.webkitRequestFullscreen();
    } else {
      setTimeout(()=>{
        // iOS进入全屏
        video.webkitEnterFullscreen();
        // 针对iOS监听不到webkitfullscreenchange事件做的兼容，感知退出全屏
        let timer = setInterval(() => {
          if (!video.webkitDisplayingFullscreen) {
            // 退出了全屏
            clearInterval(timer);
          }
        }, 1000);
      },500)
    }
    document.getElementById("brandVideo").addEventListener('play', this.playL);
    document.getElementById("brandVideo").addEventListener('timeupdate', this.timeupdateL);
  }
  render () {
    const { list } =this.state;
    return (
        <div className='brand'>
          <Header  home={false} {...this.props}/>
          <Menu unfold={this.state.showMenu}/>
          <LazyLoad  height={600}>
            <div className='brandBlock'>
              <img src="https://id-oss.vw.com.cn/img/brand-img-1.jpg" alt='' onClick={()=>this.launchFullscreen()}/>
              <video poster="https://id-oss.vw.com.cn/img/brand-img-1.jpg" controls="controls"  id="brandVideo" >
                <source src="https://id-oss.vw.com.cn/video/ID_Statement_30s.mp4"/>
              </video>
            </div>
          </LazyLoad>
          <div className="brand-title-box">
            <LazyLoad unmountIfInvisible={true}>
              <div className="animate__animated animate__fadeInUp">
                <div className="brand-title">
                  ID. 品牌宣言
                </div>
                <div className="brand-title-btn" onClick={()=>{
                  this.props.router.push({
                    pathname:"brand/introduce",
                  });
                  stm_clicki('send', 'event', '页面跳转', '点击', "深度了解", "");
                }}>
                  <img src={btn} alt="深度了解"/>
                </div>
              </div>
            </LazyLoad>
          </div>
          {
            list && list.length>0 && list.map((item,index)=><LazyLoad key={index} height={375}>
              <div className='brandMenu' onClick={()=>{
                this.props.router.push(item.h5Url);
                stm_clicki('send', 'event', '页面跳转', '点击', item.label, "");
              }}>
                <img className="my-zoom-img-bg" src={item.imageUrl} alt='' />
                <div className="my-zoom-animate-main">
                  <LazyLoad unmountIfInvisible={true}>
                    <div className="my-zoom_zone_animate">
                      <img src={item.imageUrl} alt='' />
                    </div>
                  </LazyLoad>
                </div>

                <div className='brandMenuContent'>
                  <LazyLoad unmountIfInvisible={true}>
                    <div className="animate__animated animate__fadeInUp">
                      <div>
                        <p className='brandMenuContent1'>{item.name}</p>
                        <p className='brandMenuContent2' dangerouslySetInnerHTML={{__html: item.title}}></p>
                      </div>
                      {item.buttonName && <div>
                        <Link to={item.h5Url} className='brandMenuContentBt' onClick={()=>stm_clicki('send', 'event', '页面跳转', '点击', item.label, "")}>
                          {item.buttonName}
                        </Link>
                      </div>}
                    </div>
                  </LazyLoad>
                </div>
              </div>
            </LazyLoad>)
          }
        </div>
    )
  }
}

export default withRouter(Brand)
