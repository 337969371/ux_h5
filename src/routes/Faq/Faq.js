import React from 'react'
import { withRouter } from 'react-router'
import './Faq.scss'
import {postC} from "../../utils/api";
import HeaderNav from "../../components/HeaderNav/HeaderNav";


class Faq extends React.Component {
    constructor (props) {
        super(props);
        this.state={
            data:'',
        }
    }
    componentDidMount() {
        postC("faq/get",{}).then((res)=>{
            this.setState({
                data:res
            })
        })
    }
    render () {
        return (
            <div className='faq'>
                <HeaderNav transparent={true}  isLight={true}/>
                <div className="my-info">
                    <div className="my-info-header"></div>
                    <div className="my-info-title">常见问题</div>
                </div>
                <div className="faq-content" dangerouslySetInnerHTML={{__html:this.state.data}}>

                </div>
            </div>
        )
    }
}

export default withRouter(Faq)