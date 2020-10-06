import React from 'react'
import {withRouter} from 'react-router'
import './ShowPhoto.scss';
import { Popover, Toast, Modal} from 'antd-mobile';
import EXIF from 'exif-js';
import idImg1 from "../../static/photo/group-1.png";
import idImg2 from "../../static/photo/group-2.png";
import idImg3 from "../../static/photo/group-3.png";
import idImg4 from "../../static/photo/group-4.png";
import idImg5 from "../../static/photo/group-5.png";
import idImg6 from "../../static/photo/group-6.png";
import idImg7 from "../../static/photo/group-7.png";
import idImg8 from "../../static/photo/group-8.png";
import idImg9 from "../../static/photo/group-9.png";
import idImg10 from "../../static/photo/group-10.png";

import img from "../../static/community/community-recommend-1.png";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import selectType from "../../static/photo/select_type.png";

const Item = Popover.Item;

class ShowPhoto extends React.Component {
    constructor (props) {
        super(props);
        this.state={
            current:0,
            colors:["#5b09a4","#e47202","#ffd200","#a9e3ff","#0481d5","#dd328a","#e4022b", "#47ad3e","#004479","#7f338a"],
            images:[idImg1,idImg2,idImg3,idImg4,idImg5,idImg6,idImg7,idImg8,idImg9,idImg10],
            file:null,
            visible:false,
            showDownLoad:false,
            downLoadUrl:"",
            type:{
                name:"我的音乐",
                value:"Music",
            }
        }
    }
    upFile(file){
        stm_clicki('send', 'event', '按钮', '点击', "上传图片", "");
        return new Promise((resolve, reject) => {
            // 获取图片
            const img = new Image();
            img.src = window.URL.createObjectURL(file);
            img.onerror = () => resolve(file);
            img.onload = (e) => {
                let that = this;
                // 获取图片元数据（EXIF 变量是引入的 exif-js 库暴露的全局变量）
                EXIF.getData(img, function(){
                    // 获取图片旋转标志位
                    let orientation = EXIF.getTag(this, "Orientation");
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    // 根据旋转角度，在画布上对图片进行旋转
                    if (orientation === 3 || orientation === 6 || orientation === 8) {
                        switch (orientation) {
                            case 3: // 旋转180°
                                canvas.width = img.width;
                                canvas.height = img.height;
                                ctx.rotate((180 * Math.PI) / 180);
                                ctx.drawImage(img, -img.width, -img.height, img.width, img.height);
                                break;
                            case 6: // 旋转90°
                                canvas.width = img.height;
                                canvas.height = img.width;
                                ctx.rotate((90 * Math.PI) / 180);
                                ctx.drawImage(img, 0, -img.height, img.width, img.height);
                                break;
                            case 8: // 旋转-90°
                                canvas.width = img.height;
                                canvas.height = img.width;
                                ctx.rotate((-90 * Math.PI) / 180);
                                ctx.drawImage(img, -img.width, 0, img.width, img.height);
                                break;
                        }

                        // 返回新图片
                        let newFile = canvas.toDataURL("image/png")
                        that.setState({
                            file:newFile
                        })
                    } else {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0, img.width, img.height);
                        let newFile = canvas.toDataURL("image/png")
                        that.setState({
                            file:newFile
                        })
                    }
                });
            };
        });
    }
    downImage(){
        const { file,images,current,colors,type } =this.state;
        if(!file){
            Toast.info("您还没有上传照片");
            return;
        }
        let canvas = document.createElement("canvas");
        let height = (document.body.offsetWidth/375)*341*2;
        let width = 750;
        canvas.width = width;
        canvas.height = height+200;
        let ctx = canvas.getContext("2d");
        let imgBg = new Image();
        imgBg.src = file;
        let imgP = new Image();
        imgP.src = images[current];
        ctx.fillStyle=colors[current];
        ctx.fill();
        let wr = imgBg.width/width;
        let hr = imgBg.height/height;
        let nh=0,nw=0,y=0,x=0;
        if(wr<hr){
            nw = width;
            nh = (width/imgBg.width)*imgBg.height;
            y = (nh - height)/2;
        }else {
            nh = height;
            nw = (height/imgBg.height)*imgBg.width;
            x = (nw - width)/2;
        }
        ctx.drawImage(imgBg, 0-x, 200-y, nw, nh);
        let that = this;
        imgP.onload=function(){
            ctx.drawImage(imgP, 0, 200, canvas.width, height);
            ctx.fillStyle=colors[current];
            ctx.fillRect(0,0,width,200);
            ctx.fillStyle="#ffffff";
            ctx.font = '48px VWHeadWeb-Bold';
            ctx.fillText(type.name,40,100);
            ctx.font = '48px VWText-Regular';
            ctx.fillText(type.value,40,160);
            let image = new Image();
            image.src = canvas.toDataURL("image/png");
            that.setState({
                showDownLoad:true,
                downLoadUrl:image.src,
            })
        }
        stm_clicki('send', 'event', '按钮', '点击', "生成我的ID", "");
    }
    onSelect = (opt) => {
        this.setState({
            visible: false,
            type:{
                name:opt.props.children,
                value:opt.props.value,
            }
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
    render () {
        const { current, colors, images,file, type,downLoadUrl,showDownLoad } =this.state;
        const tabs=[
            {
                name:"我的音乐",
                value:"Music",
            },
            {
                name:"纯电时代",
                value:"NEV ERA",
            },
            {
                name:"我的设计",
                value:"Design",
            },
            {
                name:"我的旅行",
                value:"Travel",
            },
            {
                name:"我的美食",
                value:"Food",
            },
            {
                name:"玩家生活",
                value:"Game Changer",
            }
        ];
        let height = ((document.body.offsetWidth/375)*341).toFixed(0);
        return (
            <div className='show-photo'>
                <HeaderNav transparent={true} isLight={true} />
                <Modal visible={showDownLoad}
                       transparent
                       onClose={()=>this.setState({
                           showDownLoad:false,
                           downLoadUrl:null
                       })}
                       className="photo-download-modal"
                >
                    <div>
                        <img className="photo-save-img" src={downLoadUrl} alt=""/>
                        <div className="photo-save-img-text">长按保存图片分享</div>
                        <div className="photo-modal-active">
                            <button className="reform" onClick={()=>this.setState({
                                showDownLoad:false,
                                downLoadUrl:null
                            })}>
                                重做
                            </button>
                            <button className="share" onClick={()=>{
                                this.props.router.push("/postPush?tagCode=1008&tagName=+&topicId=2");
                                stm_clicki('send', 'event', '页面跳转', '点击', "分享", "");
                            }}>
                                分享
                            </button>
                        </div>
                    </div>
                </Modal>
                <div>
                    <div className="main" style={{background:colors[current]}}>
                        <div className="text">
                            <div className="hint">
                                选择兴趣领域，并上传个性照片
                            </div>
                            <Popover mask
                                     visible={this.state.visible}
                                     placement={"bottomLeft"}
                                     overlay={tabs.map((item,index)=><Item key={index} value={item.value}>{item.name}</Item>)}
                                     onVisibleChange={this.handleVisibleChange}
                                     onSelect={this.onSelect}
                            >
                                <div className="title">
                                    {type.name} <img src={selectType} alt=""/>
                                </div>
                            </Popover>

                            <div className="sub">
                                {type.value}
                            </div>
                        </div>
                        <div className="img" style={{height:height+'px'}}>
                            <div className="photo">
                                <img src={file} id="photo" alt=""/>
                            </div>
                            <img className="bg" src={images[current]} alt=""/>
                        </div>
                    </div>
                    <div className="selected-colors">
                        {
                            colors.map((item,index)=><div key={index}
                                                          onClick={()=>this.setState({current:index})}
                                                          className={index!==current?"selected-colors-item":"selected-colors-item-active"}
                                                          style={{background:item}}
                            />)
                        }
                    </div>
                </div>

                <div className="handler-photo">
                    <button className="up">
                        <input type="file" accept="image/*" onChange={(e)=>this.upFile(e.target.files[0])}/>
                        上传照片
                    </button>
                    <button className="down" onClick={()=>this.downImage()}>
                        生成我的ID
                    </button>
                </div>
            </div>
        )
    }
}

export default withRouter(ShowPhoto)