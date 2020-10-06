import React from 'react'
import { withRouter } from 'react-router'
import './AnthemFilm.scss'
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import img1 from "../../static/anthemFilm/img-1.png"
import img21 from "../../static/anthemFilm/img-2-1.png"
import img22 from "../../static/anthemFilm/img-2-2.png"
import img23 from "../../static/anthemFilm/img-2-3.png"
import img3 from "../../static/anthemFilm/img-3.png"
import cover from "../../static/anthemFilm/video-cover.png"
import RGBfnE from "../../static/anthemFilm/Campaign.jpg";


class AnthemFilm extends React.Component {
    constructor (props) {
        super(props);
        this.state={
            startTime:0,
            lastTime:0,
        }
    }
    componentDidMount() {
        document.getElementById("anthemFilmVideo").addEventListener('play', this.playL);
        document.getElementById("anthemFilmVideo").addEventListener('timeupdate', this.timeupdateL);


    }
    componentWillUnmount() {
        document.getElementById("anthemFilmVideo").removeEventListener('play',this.playL);
        document.getElementById("anthemFilmVideo").removeEventListener('timeupdate',this.timeupdateL);
    }
    timeupdateL = (e) =>{
        const { lastTime, startTime } =this.state;
        let newT= parseInt((e.timeStamp-startTime)/1000)
        if(newT%5===0 && newT != lastTime){
            stm_clicki('send', 'event', 'AnthemFilm', '视频播放', newT);
            gio('track', 'video_play', {'video_id_var':'anthemFilmVideo', 'video_time_var':newT});
            this.setState({
                lastTime:newT
            })
        }
    }
    playL = (e) => {
        this.setState({
            startTime:e.timeStamp
        });
        stm_clicki('send', 'event','AnthemFilm', "视频开始播放",0);
        gio('track', 'video_play', {'video_id_var':'anthemFilmVideo', 'video_time_var':0});
    }
    launchFullscreen() {
        let video = document.getElementById('anthemFilmVideo');
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
    }
    render () {
        return (
            <div className='anthem-film'>
                <HeaderNav  transparent={true} />
                <div>
                    <div>
                        <img src={RGBfnE} alt=""/>
                    </div>
                    <div className="content-1">
                        <img src={img1} alt=""/>
                    </div>
                    <div className="content-2">
                        <div className="box">
                            <img src={img21} alt=""/>
                            <img src={img22} alt=""/>
                            <img src={img23} alt=""/>
                        </div>
                    </div>
                    <div>
                        <img src={img3} alt=""/>
                    </div>

                    <div className="content-4">
                        <img src={cover} alt="" onClick={()=>this.launchFullscreen()}/>
                        <video poster={cover} controls="controls"  id="anthemFilmVideo" >
                            <source src="https://id-oss.vw.com.cn/video/Anthem%20FilmB.mp4"/>
                        </video>
                    </div>
                </div>
                <br/>
                <br/>

            </div>
        )
    }
}

export default withRouter(AnthemFilm)