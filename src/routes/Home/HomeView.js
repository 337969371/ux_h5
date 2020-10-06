import React from 'react'
import {Link, withRouter} from 'react-router'
import './HomeView.scss'
import Menu from "../../components/Menu/Menu";
import LazyLoad,{forceVisible} from 'react-lazyload';
import Header from "../../components/Header/Header";
import Utils from "../../utils/utils";
import text from "../../static/home/home-img-text.png"
import RGBfnE from "../../static/home/Tech KV_01.png"
import Footer from "../../components/Footer/Footer";
import {postF} from "../../utils/api";



class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      showMenu:true,
      scrollTop:0,
      isFirst:true,
      list:[],
    }
  }
  componentDidMount() {
    this.getData();
    Utils.sendRouterChange("/");
    forceVisible();
    window.addEventListener('scroll', this.scrollChange)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollChange)
  }
  getData(){
    postF("forum/slideshow/list",null,{type:"100"}).then(res=>{
      this.setState({
        list:res
      })
    });
  }

  scrollChange = (e) => {
    const sT = (event.srcElement ? event.srcElement.documentElement.scrollTop : false)
        || window.pageYOffset
        || (event.srcElement ? event.srcElement.body.scrollTop : 0);

    const {scrollTop} =this.state;
    if(scrollTop > sT || sT === 0){
      this.setState({
        showMenu:true,
        scrollTop:sT,
      })
    }else {
      this.setState({
        showMenu:false,
        scrollTop:sT,
      })
    }
    if(sT>500){
      this.setState({
        isFirst:false
      })
    }
  }
  render () {
    const {isFirst,list} = this.state;
    return (
        <div className='home'>
          <Header  home={true} {...this.props}/>
          <Menu unfold={this.state.showMenu}/>
          <LazyLoad  height={500}>
            <div className='homeBlock'>
              <img className="my-zoom-img-bg" src={RGBfnE} alt=""/>
              <div className="my-zoom-animate-main">
                {!isFirst?<LazyLoad unmountIfInvisible={true}>
                  <div className="my-zoom_zone_animate">
                    <img  src={RGBfnE} alt='' />
                  </div>
                </LazyLoad>:<div className="my-zoom_zone_animate">
                  <img  src={RGBfnE} alt='' />
                </div>}
              </div>
              <div className='homeHeaderContent animate__animated animate__fadeInUp'>
                <div className='homeBlockContentZh'>
                  <img style={{width:139,marginBottom:15}} src={text} alt=""/>
                  <div>
                    <Link to='/techcampaign' className='homeMenuContentBt' onClick={()=>stm_clicki('send', 'event', '页面跳转', '点击', "首页-ID. 态度", "")}>
                      ID. <span>科技</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </LazyLoad>
          {
            list && list.length>0 && list.map((item,index)=><LazyLoad key={index} height={375}>
              <div className='homeMenu'>
                <img className="my-zoom-img-bg"  src={item.imageUrl} alt='' />
                <div className="my-zoom-animate-main">
                  <LazyLoad unmountIfInvisible={true}>
                    <div className="my-zoom_zone_animate">
                      <img src={item.imageUrl} alt='' />
                    </div>
                  </LazyLoad>
                </div>
                <div className='homeMenuContent'>
                  <LazyLoad unmountIfInvisible={true}>
                    <div className="animate__animated animate__fadeInUp">
                      <div>
                        <p className='homeMenuContent1'>{item.name}</p>
                        <p className='homeMenuContent2'>{item.title}</p>
                      </div>
                      <div>
                        <Link to={item.h5Url} className='homeMenuContentBt' onClick={()=>stm_clicki('send', 'event', '页面跳转', '点击', item.label, "")}>
                         {item.buttonName}
                        </Link>
                      </div>
                    </div>
                  </LazyLoad>
                </div>
              </div>
            </LazyLoad>)
          }
          <LazyLoad height={375}>
            <div className='homeMenu'>
              <img src="https://id-oss.vw.com.cn/attach/VIZZION%20180_00005.gif" alt='' />
              <div className='homeMenuContent'>
                <LazyLoad unmountIfInvisible={true}>
                  <div className="animate__animated animate__fadeInUp">
                    <div>
                      <p className='homeMenuContent1'>ID. 家族为你而来</p>
                      <p className='homeMenuContent2'>开启纯电新时代</p>
                    </div>
                    <div>
                      <Link to='/brand' className='homeMenuContentBt' onClick={()=>stm_clicki('send', 'event', '页面跳转', '点击', "首页-ID. 世界", "")}>
                        ID. <span>世界</span>
                      </Link>
                    </div>
                  </div>
                </LazyLoad>
              </div>
            </div>
          </LazyLoad>
          <LazyLoad height={375}>
            <div className='homeMenu'>
              <img className="my-zoom-img-bg"  src="https://id-oss.vw.com.cn/attach/home-img-3.jpg" alt='' />
              <div className="my-zoom-animate-main">
                <LazyLoad unmountIfInvisible={true}>
                  <div className="my-zoom_zone_animate">
                    <img  src="https://id-oss.vw.com.cn/attach/home-img-3.jpg" alt='' />
                  </div>
                </LazyLoad>
              </div>
              <div className='homeMenuContent'>
                <LazyLoad unmountIfInvisible={true}>
                  <div className="animate__animated animate__fadeInUp">
                    <div>
                      <p className='homeMenuContent1'>晒出各自精彩</p>
                      <p className='homeMenuContent2'>玩家派对</p>
                    </div>
                    <div>
                      <Link to='/lifestyle' className='homeMenuContentBt' onClick={()=>stm_clicki('send', 'event', '页面跳转', '点击', "首页-ID. 玩场", "")}>
                        ID. <span>玩场</span>
                      </Link>
                    </div>
                  </div>
                </LazyLoad>
              </div>
            </div>
          </LazyLoad>
          <LazyLoad height={375}>
            <Link to='/brand/introduce' onClick={()=>stm_clicki('send', 'event', '页面跳转', '点击', "首页-ID. 世界2", "")}>
              <div className='homeMenu'>
                <LazyLoad unmountIfInvisible={true}>
                  <div className="brand_zone_animate_box">
                    <div className="brand_zone_animate"> </div>
                  </div>
                </LazyLoad>
                <img src="https://id-oss.vw.com.cn/attach/home-img-4.jpg" alt='' />
                <div className='homeMenuContent'>
                  <LazyLoad unmountIfInvisible={true}>
                    <div className="animate__animated animate__fadeInUp">
                      <div>
                        <p className='homeMenuContent1'>你好 ID.</p>
                        <p className='homeMenuContent2'>重定规则 进化不止</p>
                      </div>
                      <div>
                        <div  className='homeMenuContentBt'>
                          ID. <span>世界</span>
                        </div>
                      </div>
                    </div>
                  </LazyLoad>
                </div>
              </div>
            </Link>
          </LazyLoad>
          <LazyLoad height={375}>
            <div className='homeMenu'>
              <img src="https://id-oss.vw.com.cn/img/AR%20Concert_00000.gif" alt='' />
              <div className='homeMenuContent'>
                <LazyLoad unmountIfInvisible={true}>
                  <div className="animate__animated animate__fadeInUp">
                    <div>
                      <p className='homeMenuContent1'>ID. 体验</p>
                      <p className='homeMenuContent2'>打破时空界限</p>
                    </div>
                    <div>
                      <Link to='/campaign' className='homeMenuContentBt' onClick={()=>stm_clicki('send', 'event', '页面跳转', '点击', "首页-ID. 造物", "")}>
                        ID. <span>造物</span>
                      </Link>
                    </div>
                  </div>
                </LazyLoad>
              </div>
            </div>
          </LazyLoad>
          {/*<LazyLoad height={375}>*/}
          {/*  <div className='homeMenu'>*/}
          {/*    <img className="my-zoom-img-bg" src="https://id-oss.vw.com.cn/attach/home-img-6.jpg" alt='' />*/}
          {/*    <div className="my-zoom-animate-main">*/}
          {/*      <LazyLoad unmountIfInvisible={true}>*/}
          {/*        <div className="my-zoom_zone_animate">*/}
          {/*          <img  src="https://id-oss.vw.com.cn/attach/home-img-6.jpg" alt='' />*/}
          {/*        </div>*/}
          {/*      </LazyLoad>*/}
          {/*    </div>*/}
          {/*    <div className='homeMenuContent'>*/}
          {/*      <LazyLoad unmountIfInvisible={true}>*/}
          {/*        <div className="animate__animated animate__fadeInUp">*/}
          {/*          <div>*/}
          {/*            <p className='homeMenuContent1'>你改变了哪些玩法</p>*/}
          {/*            <p className='homeMenuContent2'><span>SHOW</span>出你的<span>ID. </span></p>*/}
          {/*          </div>*/}
          {/*          <div>*/}
          {/*            <Link to='/lifestyle#activity' className='homeMenuContentBt'  onClick={()=>stm_clicki('send', 'event', '页面跳转', '点击', "首页-ID. 玩场2", "")}>*/}
          {/*              ID. <span>玩场</span>*/}
          {/*            </Link>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </LazyLoad>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</LazyLoad>*/}
          <LazyLoad height={375}>
            <div className='homeMenu'>
              <img  className="my-zoom-img-bg" src="https://id-oss.vw.com.cn/attach/home-img-7.jpg" alt='' />
              <div className="my-zoom-animate-main">
                <LazyLoad unmountIfInvisible={true}>
                  <div className="my-zoom_zone_animate">
                    <img  src="https://id-oss.vw.com.cn/attach/home-img-7.jpg" alt='' />
                  </div>
                </LazyLoad>
              </div>

              <div className='homeMenuContent'>
                <LazyLoad unmountIfInvisible={true}>
                  <div  className="animate__animated animate__fadeInUp">
                    <div>
                      <p className='homeMenuContent1'>ID. 家族</p>
                      <p className='homeMenuContent2'>每台都是狠角色</p>
                    </div>
                    <div>
                      <Link to='/brand/idFamily' className='homeMenuContentBt' onClick={()=>stm_clicki('send', 'event', '页面跳转', '点击', "首页-ID. 世界3", "")}>
                        ID. <span>世界</span>
                      </Link>
                    </div>
                  </div>
                </LazyLoad>
              </div>
            </div>
          </LazyLoad>
          <Footer />
        </div>
    )
  }
}

export default withRouter(HomeView)
