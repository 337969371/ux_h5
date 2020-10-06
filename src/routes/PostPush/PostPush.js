import React from 'react'
import { withRouter } from 'react-router'
import './PostPush.scss'
import UploadProgress, {UploadStatus} from 'react-upload-progress';
import {ActivityIndicator, Toast} from "antd-mobile"
import Login from "../../components/Login/Login";
import closeIcon from "../../static/icon/icon-close.svg"
import addIcon from "../../static/icon/add-img.png"



class PostPush extends React.Component {
  constructor (props) {
    super(props)
    this.props.getMemberInfo();
    this.state={
      title:'',
      content:"",
      formData: null,
      uploading: false,
      batchId:new Date().getTime()+(Math.random()*1000000).toFixed(0),
      imgArr:[],
      token:'',
    }
  }
  componentDidMount() {

  }
  onChangeTitle(value){
    this.setState({
      title:value,
    })
  }
  onChangeContent(value){
    this.setState({
      content:value,
    })
  }
  _onUploadClick = e => {
    const {batchId} = this.state;
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('batchId', batchId);
    formData.append('businessType','10');
    let token  = localStorage.getItem("token");
    if(token){
      formData.append('user-token',token)
    }
    if (formData) {
      this.setState({
        formData:formData,
        uploading: true,
        token
      });
    }
  }
  removeItem(item){
    let arr = this.state.imgArr;
    let index = arr.indexOf(item);
    if (index > -1) {
      arr.splice(index, 1);
    }
    this.setState({
      imgArr:arr
    })
  }
  submit(){
    const {title,content,batchId,imgArr} = this.state;
    const {location,postPushData} = this.props;
    if(title.length<2 || title.length>30){
      Toast.info("标题长度为2-30个字符");
      return;
    }
    if(content.length<2){
      Toast.info("内容必须大于两个字符");
      return;
    }
    if(imgArr.length<1){
      Toast.info("您还没有上传图片");
      return;
    }
    let params = {
      "batchId":batchId,
      "content": content,
      "tagCode": location.query.tagCode,
      "title": title,
      "imageList":imgArr
    };
    if(location.query.topicId){
      params.topicId = location.query.topicId;
    }
    postPushData(params).then(res=>{
      if(res){
        this.props.router.goBack();
      }
    });
    stm_clicki('send', 'event', '发布按钮', '点击', "发布帖子", "");
  }
  goBack(){
    try {
      this.props.router.goBack();
    }catch (e) {
      window.history.back(-1);
    }
    stm_clicki('send', 'event', '取消按钮', '点击', "返回", "");
  }
  render () {
    const {title,content,formData,uploading,imgArr,token} = this.state;
    const {location} = this.props;
    let width = (document.body.clientWidth-100)/3;
    let userToken={
      "user-token":token
    }
    console.log("ererer",location.query.tagName);
    return (
        <div>
          <Login {...this.props}/>
          <div className="posh-push-header">
            <div className="header-left" onClick={()=>this.goBack()}>
              取消
            </div>
            <div className="header-title">

            </div>
            <div>

            </div>
          </div>
          <div className="post-push-main">
            <div className="post-push-hint">
              恭喜入圈，即刻分享精彩
            </div>
            <div className="post-push-title">
              <input type="text" placeholder="在此输入标题" maxLength={30} value={title} onChange={(e)=>this.onChangeTitle(e.target.value)}/>
            </div>
            <div className="post-push-content">
              <textarea placeholder="在此输入内容" value={content} onChange={(e)=>this.onChangeContent(e.target.value)} ></textarea>
            </div>
            <div className="post-push-img-box">
              <div className="post-push-img-title">
                封面图
              </div>
              <div className="post-push-img">
                {
                  imgArr.map((img, index)=> <div key={index} className="post-push-img-item" style={{height:width+'px',width:width+'px'}}>
                    <img src={img} className="post-push-img-item-img" alt=""/>
                    <div className="post-push-img-item-close" onClick={()=>this.removeItem(img)}>
                      <img src={closeIcon} width={14} alt=""/>
                    </div>
                  </div>)
                }
                {imgArr.length<9 && <div className="post-push-img-item"  style={{height:width+'px',width:width+'px',lineHeight:width+'px'}}>
                  {!uploading && <div className="post-push-upload-text">
                    <img src={addIcon} alt=""/>
                  </div>}
                  <input type='file' className="post-push-upload" onChange={this._onUploadClick} />
                  {uploading && <UploadProgress
                      url="/f/api/forum/file/uploadImage"
                      headers={userToken}
                      formData={formData}
                  >
                    {({ status, done, total, response }) => {
                      if(status === UploadStatus.DONE){
                        let res = JSON.parse(response.data);
                        if(res.code === 401){
                          this.props.showLogin();
                        }
                        if(res.data && res.data.url){
                          let arr =imgArr;
                          if(arr.indexOf(res.data.url)<0){
                            arr.push(res.data.url);
                            this.setState({
                              imgArr:arr,
                              uploading:false,
                            })
                          }
                        }else {
                          Toast.info(res.msg || "系统错误");
                          this.setState({
                            uploading:false,
                          });
                          return false;
                        }
                      }
                      return (<div className="post-push-upload-mark">
                        {status === UploadStatus.SENDING && (
                            <div>
                              <ActivityIndicator />
                            </div>
                        )}
                      </div>)
                    }}
                  </UploadProgress>}
                </div>}
              </div>
              {location.query.tagName && location.query.tagName!="" && location.query.tagName!=" " && <div className="post-push-tags"><span>{location.query.tagName}</span></div>}
            </div>

          </div>
          <div className="post-footer-btn">
            <button className="post-footer-btn-push" onClick={()=>this.submit()}>
              发布
            </button>
          </div>
        </div>
    )
  }
}

export default withRouter(PostPush)
