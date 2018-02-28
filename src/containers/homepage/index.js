import React from 'react'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import Register from '../../components/register'
import config from '../../../config'

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
            title: '美滋滋!',
            desc: '杀鸡就是要用牛刀哦!',
            imgUrl: config.imgUrl,
        };
        this.wxStore.getSignature(body, shareData)
    }

    render() {
        return (
            <div className="homepage">
                <Register/>
            </div>
        )
    }
}
