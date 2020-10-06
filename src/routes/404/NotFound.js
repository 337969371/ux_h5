import React from 'react'
import { withRouter } from 'react-router'
import './NotFound.scss'
import HeaderNav from "../../components/HeaderNav/HeaderNav";



class NotFound extends React.Component {
    constructor (props) {
        super(props);
        this.state={
            data:'',
        }
    }
    render () {
        return (
            <div className='not-found'>
                <HeaderNav transparent={true} />
                <div className="main">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="101.757" height="102"
                             viewBox="0 0 101.757 102">
                            <g id="组_703" data-name="组 703" transform="translate(-80 -296)">
                                <g id="组_702" data-name="组 702" transform="translate(81 297)">
                                    <g id="组_700" data-name="组 700">
                                        <path id="Shape"
                                              d="M4060.917,655.449h-15.784a3.512,3.512,0,0,1-3.508-3.516V595.674a3.512,3.512,0,0,1,3.508-3.516h71.907a3.512,3.512,0,0,1,3.508,3.516v41.418m-41.986,18.357-24.373,15.781c-.028.016-.107.061-.288-.133V655.449m32.993,0h-18.962m45.6,36.708a27.918,27.918,0,1,1,27.85-27.918A27.884,27.884,0,0,1,4113.532,692.157Z"
                                              transform="translate(-4041.625 -592.157)" fill="none" stroke="#101150"
                                              strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                                        <path id="路径_261" data-name="路径 261" d="M4121.632,607.272H4056.74"
                                              transform="translate(-4049.725 -600.257)" fill="none" stroke="#101150"
                                              strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                                        <path id="路径_262" data-name="路径 262" d="M4133.781,626.166h-54.369"
                                              transform="translate(-4061.874 -610.381)" fill="none" stroke="#101150"
                                              strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                                        <path id="路径_263" data-name="路径 263" d="M4060.248,626.166h-3.508"
                                              transform="translate(-4049.725 -610.381)" fill="none" stroke="#101150"
                                              strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                                        <path id="路径_264" data-name="路径 264" d="M4188.453,645.059h-7.015"
                                              transform="translate(-4116.546 -620.446)" fill="none" stroke="#101150"
                                              strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                                        <path id="路径_265" data-name="路径 265" d="M4107.6,645.059H4056.74"
                                              transform="translate(-4049.725 -620.446)" fill="none" stroke="#101150"
                                              strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                                        <path id="路径_266" data-name="路径 266" d="M4143.906,663.953h-45.6"
                                              transform="translate(-4071.999 -630.549)" fill="none" stroke="#101150"
                                              strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                                        <path id="路径_267" data-name="路径 267" d="M4069.017,663.953H4056.74"
                                              transform="translate(-4049.725 -630.549)" fill="none" stroke="#101150"
                                              strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                                        <path id="路径_268" data-name="路径 268" d="M4137.305,682.847h-8.769"
                                              transform="translate(-4088.198 -640.652)" fill="none" stroke="#101150"
                                              strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                                        <path id="路径_269" data-name="路径 269" d="M4081.294,682.847H4056.74"
                                              transform="translate(-4049.725 -640.652)" fill="none" stroke="#101150"
                                              strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                                        <path id="路径_270" data-name="路径 270" d="M4086.555,701.74H4056.74"
                                              transform="translate(-4049.725 -650.755)" fill="none" stroke="#101150"
                                              strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
                                    </g>
                                    <g id="组_701" data-name="组 701" transform="translate(70.065 56.092)">
                                        <path id="路径_271" data-name="路径 271"
                                              d="M4194.558,777.29a1.973,1.973,0,1,1,1.974-1.973A1.973,1.973,0,0,1,4194.558,777.29Z"
                                              transform="translate(-4192.584 -745.098)" fill="none" stroke="#101150"
                                              strokeMiterlimit="10" strokeWidth="2"/>
                                        <path id="路径_272" data-name="路径 272"
                                              d="M4196.531,734.2a1.974,1.974,0,0,1-3.947,0V714.461a1.974,1.974,0,0,1,3.947,0Z"
                                              transform="translate(-4192.584 -712.488)" fill="none" stroke="#101150"
                                              strokeMiterlimit="10" strokeWidth="2"/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <p>
                        内容去哪里了？回主页看看
                    </p>
                </div>

                <a href="/" className="btn">回到主页</a>
            </div>
        )
    }
}

export default withRouter(NotFound)