/**
 * Created by scriptchao on 2018/2/27.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import md5 from 'blueimp-md5';
import qs from 'qs'
import {WingBlank, WhiteSpace, InputItem, Button, Toast} from 'antd-mobile'
import './index.sass'

@inject('UserStore') @observer
export default class Register extends React.Component {
    @observable companyName = '';
    @observable email = '';
    @observable password = '';
    @observable rePassword = '';

    constructor(props) {
        super(props);

        this.userStore = this.props.UserStore;
    }

    componentWillMount() {
        const {code} = qs.parse(location.search.slice(1));
        this.code = 1111
    }


    handleRegister = () => {
        if (!this.companyName) {
            Toast.info('请输入企业名称!')
        } else if (!this.email) {
            Toast.info('请输入注册邮箱!')
        } else if (!this.password || !this.rePassword) {
            Toast.info('请输入登录密码!')
        } else if (this.password !== this.rePassword) {
            Toast.info('两次输入密码不一致!')
        } else {
            const body = {};
            body.companyName = this.companyName;
            body.email = this.email;
            body.inviteCode = this.code;
            body.password = md5(this.password);

            this.userStore.postRegister(body)
        }
    };


    render() {
        return (
            <div className="zyc-register">
                <WingBlank>
                    <span>立即免费注册</span>
                    <WhiteSpace/>
                    <InputItem type="text" className="ipt" placeholder="请输入企业名称" value={this.companyName} onChange={(value) => {
                        this.companyName = value
                    }}/>
                    <WhiteSpace/>
                    <InputItem type="text" className="ipt" placeholder="请输入注册邮箱" value={this.email} onChange={(value) => {
                        this.email = value;
                    }}/>
                    <WhiteSpace/>
                    <InputItem type="password" className="ipt" placeholder="请输入登录密码" value={this.password} onChange={(value) => {
                        this.password = value;
                    }}/>
                    <WhiteSpace/>
                    <InputItem type="password" className="ipt" placeholder="请再次输入登录密码" value={this.rePassword} onChange={(value) => {
                        this.rePassword = value
                    }}/>
                    <WhiteSpace/>
                    <Button type="primary" className="btn" onClick={this.handleRegister}>免费注册</Button>
                </WingBlank>
            </div>
        )

    }
}

