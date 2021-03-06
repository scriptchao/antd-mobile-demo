import React from 'react'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import Register from '../../components/register'
import config from '../../../config'
import './index.sass'

@inject('WxStore') @observer
export default class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.wxStore = this.props.WxStore
    }


    componentDidMount() {
        const body = {};
        body.url = location.href.split('#')[0];

        const shareData = {
            title: '你有一笔财政奖励未领取!',
            desc: '用薪福多，体验智能发薪，享受财政奖励，国企背景更安全!',
            link: location.href.split('#')[0],
            imgUrl: config.imgUrl,
        };
        this.wxStore.getSignature(body, shareData)
    }

    render() {
        return (
            <div className="homepage">
                <div className="homepage-top">
                    <p className="title">智能发薪，一键报税</p>
                    <p className="title-sub">
                        <span>7*24小时</span>
                        <i>{null}</i>
                        <span>"0"手续费</span>
                        <i>{null}</i>
                        <span>实时到账</span>
                    </p>
                </div>
                <div className="homepage-content">
                    <Register/>
                </div>
            </div>
        )
    }
}
