import React from 'react'
import {Modal, Toast, List, Checkbox, ActivityIndicator, InputItem} from "antd-mobile";
import "./ActionModal.scss"
import {postC} from "../../utils/api";
import UploadProgress, {UploadStatus} from "react-upload-progress";

const CheckboxItem = Checkbox.CheckboxItem;

export default class ActionModal extends React.Component{
    constructor (props) {
        super(props)
        this.state={
            value:"",
            qca:[],
            address:null,
            profilePhoto:null,
            formData: null,
            uploading: false,
            province:null,
            provinceArr:[],
            city:null,
            cityArr:[],
            area:null,
            areaArr:[],
            hasError:false,
            hasErrorCode:false,
            count:60,
            code:"",
            phone:"",
            token:"",
        }
    }
    setProvince(code){
        if(!code){
            return;
        }
        const { provinceArr } =this.state;
        let province={
            code:code,
        };
        for (let item of provinceArr){
            if(item.provinceCode === code){
                province.name = item.provinceName;
            }
        }
        this.setState({
            province:province,
            city:null,
            cityArr:[],
            area:null,
            areaArr:[]
        })
        this.getCity(code);
    }
    setCity(code){
        if(!code){
            return;
        }
        const { cityArr } =this.state;
        let city={
            code:code,
        };
        for (let item of cityArr){
            if(item.cityCode === code){
                city.name = item.cityName;
            }
        }
        this.setState({
            city:city,
            area:null,
            areaArr:[]
        })
        this.getArea(code);
    }
    setArea(code){
        if(!code){
            return;
        }
        const { areaArr } =this.state;
        let area={
            code:code,
        };
        for (let item of areaArr){
            if(item.areaCode === code){
                area.name = item.areaName;
            }
        }
        this.setState({
            area:area,
        })
    }
    componentDidMount() {
        const {value,type} = this.props;
        if(type === "address"){
            this.setState({
                province:{
                    name:value.province,
                    code:value.provinceCode
                },
                area:{
                    name:value.area,
                    code:value.areaCode,
                },
                city:{
                    name:value.city,
                    code:value.cityCode,
                },
                address:value.address
            })
            this.getProvince();
            if(value.provinceCode){
                this.getCity(value.provinceCode);
            }
            if(value.cityCode){
                this.getArea(value.cityCode);
            }
        }

    }
    getProvince(){
        postC("address/provinceList").then(res=>{
            this.setState({
                provinceArr:res
            })
        })
    }
    getCity(code) {
        postC("address/cityList",{provinceCode:code}).then(res => {
            this.setState({
                cityArr:res
            })
        })
    }
    getArea(code){
        postC("address/areaList",{cityCode:code}).then(res=>{
            this.setState({
                areaArr:res
            })
        })
    }

    ok(){
        const { onClose,type } = this.props;
        if(type === "mobile"){
            this.updateMobile();
            return ;
        }

        const { nickname, email, address,sex,profilePhoto,name,province,city,area } = this.state;
        let params={};
        if(type === "nickname"){
            if(nickname.left<2){
                Toast.info("昵称为两个字符以上");
            }
            params.nickname = nickname;
        }else if(type === "email"){
            let myreg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            console.log(email);
            if (!myreg.test(email)) {
                Toast.info("邮箱输入错误");
                return false;
            }
            params.email = email;
        }else if(type === "address"){
            params.province= province.name;
            params.provinceCode= province.code;
            params.area= area.name;
            params.areaCode= area.code;
            params.city=city.name;
            params.cityCode= city.code;
            params.address = address;
        }else if(type === "sex"){
            params.sex = sex;
        }else if(type === "profilePhoto"){
            params.profilePhoto = profilePhoto;
        }else if(type === "name"){
            params.name = name;
        }
        postC("customer/update",params).then((res)=>{
            onClose();
            Toast.info("修改成功");
        })

    }
    _onUploadClick = (e) => {
        let formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('businessType','00');
        let token  = localStorage.getItem("token");
        if(token){
            formData.append('user-token',token)
        }
        if (formData) {
            this.setState({
                formData:formData,
                uploading: true,
                token:token
            });
        }
    }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入正确的手机号');
        }
    }
    onChange = (phone) => {
        if (phone.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            phone,
        });
    }
    onChangeCode= (code) => {
        if (!(/^\d{6}$/.test(code))) {
            this.setState({
                hasErrorCode: true,
            });
        } else {
            this.setState({
                hasErrorCode: false,
            });
        }
        this.setState({
            code,
        });
    }
    onErrorClickCode= () => {
        if (this.state.hasErrorCode) {
            Toast.info('请输入正确的验证码');
        }
    }
    sendSMS(){
        let {phone,hasError}= this.state;
        if(hasError || !phone){
            Toast.info('请输入正确的手机号');
            return false;
        }
        this.countDown();
        postC('login/sendValidCode',{
            mobile:phone.replace(/\s/g, ''),
            type:"10"
        })

    }
    countDown(){
        let t = setInterval(()=>{
            let num = this.state.count;
            if(num === 1){
                clearInterval(t);
                this.setState({
                    count:60
                })
            }else {
                this.setState({
                    count:num-1
                })
            }
        },1000);
    }
    updateMobile(){
        const { onClose } =this.props;
        let {phone,hasError,hasErrorCode,code}= this.state;
        if(hasError || !phone){
            Toast.info('请输入正确的手机号');
            return false;
        }
        if(hasErrorCode || !code){
            Toast.info('请输入正确的验证码');
            return false;
        }
        postC('customer/updateMobile', {
            mobile: phone.replace(/\s/g, ''),
            validCode:code.replace(/\s/g, ''),
        })
            .then((response)=>{
                Toast.info("修改成功");
                if(onClose){
                    onClose();
                }
            })
    }

    render() {
        const { show, onClose, title, value, type } =this.props;
        const { address, sex,token, formData, uploading, profilePhoto,provinceArr,cityArr,areaArr,hasError,hasErrorCode,count} = this.state;
        let userToken={
            "user-token":token
        }
        return (
            <Modal
                visible={show}
                popup={true}
                onClose={()=>onClose()}
                animationType="slide"
                className="action-modal"
                wrapClassName="wrap-action-modal"
                title={<div className="modal-title">{title}</div>}
            >
                {
                    type ==="mobile" && <div>
                        <div className="phone-item">
                            <InputItem
                                type="phone"
                                labelNumber={3}
                                placeholder="手机号码"
                                error={hasError}
                                onErrorClick={this.onErrorClick}
                                onChange={this.onChange}
                                value={this.state.phone}
                            >+86</InputItem>
                        </div>
                        <div className="phone-item">
                            <InputItem
                                type="number"
                                placeholder="验证码"
                                error={hasErrorCode}
                                onErrorClick={this.onErrorClickCode}
                                onChange={this.onChangeCode}
                                extra={count==60?<div className="login-content-item-sms" onClick={()=>this.sendSMS()}>获取验证码</div>:<div>{count}s重新发送</div>}
                                value={this.state.code}
                            />
                        </div>
                    </div>
                }
                {type === "nickname" && <div>
                    <input type="text" className="modal-input" defaultValue={value} onChange={(e)=>this.setState({
                        nickname:e.target.value
                    })}/>
                </div>}
                {type === "name" && <div>
                    <input type="text" className="modal-input" defaultValue={value} onChange={(e)=>this.setState({
                        name:e.target.value
                    })}/>
                </div>}
                {type === "profilePhoto" && <div className="modal-input-avatar-box">
                    <img src={profilePhoto?profilePhoto:value} className="modal-input-avatar" alt=""/>
                    <input type='file' className="modal-input-avatar-upload" onChange={this._onUploadClick} />
                    {uploading && <UploadProgress
                        url="/f/api/forum/file/uploadImage"
                        headers={userToken}
                        formData={formData}
                    >
                        {({ status, done, total, response }) => {
                            if(status === UploadStatus.DONE){
                                let res = JSON.parse(response.data);
                                if(res.data && res.data.url){
                                    this.setState({
                                        profilePhoto:res.data.url,
                                        uploading:false,
                                    })
                                }
                            }
                            return (<div className="post-push-upload-mark modal-input-avatar-upload-mark">
                                {status === UploadStatus.SENDING && (
                                    <ActivityIndicator />
                                )}
                            </div>)
                        }}
                    </UploadProgress>}
                </div>}
                {type === "email" && <div>
                    <input type="text" className="modal-input" defaultValue={value} onChange={(e)=>this.setState({
                        email:e.target.value
                    })}/>
                </div>}
                { type === "address" && <div>
                    <div className="address-item">
                        {provinceArr&& provinceArr.length>0&&<select onChange={(e)=>this.setProvince(e.target.value)} defaultValue={value.provinceCode} placeholder="选择省">
                            <option>选择省</option>
                            {provinceArr.map((item,index)=><option  value={item.provinceCode} key={index}>{item.provinceName}</option>)}
                        </select>}
                    </div>
                    <div className="address-item">
                        {cityArr&& cityArr.length>0&&<select onChange={(e)=>this.setCity(e.target.value)} defaultValue={value.cityCode} placeholder="选择市">
                            <option>选择市</option>
                            {cityArr.map((item,index)=><option  value={item.cityCode} key={index}>{item.cityName}</option>)}
                        </select>}
                    </div>
                    <div className="address-item">
                        {areaArr&& areaArr.length>0&&<select onChange={(e)=>this.setArea(e.target.value)} defaultValue={value.areaCode} placeholder="选择县/区">
                            <option>选择县/区</option>
                            {areaArr.map((item,index)=><option  value={item.areaCode} key={index}>{item.areaName}</option>)}
                        </select>}
                    </div>
                    <div className="address-item">
                        <input type="text" className="modal-input" defaultValue={value.address} placeholder="详细地址" onChange={e => this.setState({
                            address:e.target.value
                        })}/>
                    </div>
                </div>}
                {
                    type==="sex" && <div className="action-modal-sex">
                        <CheckboxItem checked={sex!=null?sex==="0":value==="0"} onChange={(e)=>this.setState({
                            sex:e.target.checked?"0":"2"
                        })}>男</CheckboxItem>
                        <CheckboxItem checked={sex!=null?sex==="1":value==="1"} onChange={(e)=>this.setState({
                            sex:e.target.checked?"1":"2"
                        })}>女</CheckboxItem>
                    </div>
                }
                <div className="action-modal-btn-main">
                    <button className="action-modal-btn" onClick={()=>this.ok()}>
                        确认
                    </button>
                </div>
            </Modal>
        );
    }
}
