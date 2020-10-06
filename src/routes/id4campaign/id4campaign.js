import React from 'react'
import { withRouter } from 'react-router'
import './id4campaign.scss'


import img1 from "../../static/id4campaign/ID4temp.jpg"

import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";


class id4campaign extends React.Component {
    constructor (props) {
        super(props);
        this.state={
            scrollTop:0,
            showMenu:true,
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.scrollChange)
        setTimeout(function () {
            let hash =  location.hash;
            if(hash){
                window.location.href=hash;
            }
        },3000)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollChange)
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
        return (
            <div className='container id4-campaign'>
                <Header  home={false} {...this.props}/>
                <Menu unfold={this.state.showMenu}/>
                <div className="heed" id="headImg">
                    <img src={img1} alt=""/>
                </div>
            </div>
        )
    }
}

export default withRouter(id4campaign)
