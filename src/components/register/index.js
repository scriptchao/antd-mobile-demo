/**
 * Created by scriptchao on 2018/2/27.
 */

import React, {Fragment} from 'react'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import md5 from 'blueimp-md5';
import qs from 'qs'
import {WingBlank, WhiteSpace, InputItem, Button, Toast} from 'antd-mobile'
import './index.sass'
import Input from '../input'

@inject('UserStore') @observer
export default class Register extends React.Component {
    @observable companyName = '';
    @observable email = '';
    @observable password = '';
    @observable rePassword = '';

    @observable success = '';
    @observable hook;

    constructor(props) {
        super(props);

        this.userStore = this.props.UserStore;
    }

    componentWillMount() {
        const {code} = qs.parse(location.search.slice(1));
        this.code = code;
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

            this.userStore.postRegister(body).then(response => {
                if(response) {
                    this.success = 'success';
                }
            })
        }
    };

    handleEnd = () => {
        this.hook = true;

    };


    render() {
        return (
            <div className="zyc-register">
                <div style={{opacity: this.success ? 0 : 1}}>
                    <Input type="text" placeholder="企业名称" value={this.companyName}
                           prefix={<i className="iconfont icon-gongsi"/>}
                           onChange={(e) => {
                               this.companyName = e.target.value
                           }}>
                    </Input>
                    <WhiteSpace/>
                    <Input type="text" placeholder="邮箱" value={this.email}
                           prefix={<i className="iconfont icon-youxiang"/>}
                           onChange={(e) => {
                               this.email = e.target.value
                           }}/>
                    <WhiteSpace/>
                    <Input type="password" placeholder="密码" value={this.password}
                           prefix={<i className="iconfont icon-mima"/>}
                           onChange={(e) => {
                               this.password = e.target.value
                           }}/>
                    <WhiteSpace/>
                    <Input type="password" placeholder="确认密码" value={this.rePassword}
                           prefix={<i className="iconfont icon-mima"/>}
                           onChange={(e) => {
                               this.rePassword = e.target.value
                           }}/>
                    <WhiteSpace size="lg"/>
                </div>
                <div className="animate">
                    <span
                        className={`animate-btn ${this.success}`}
                        onClick={this.handleRegister}
                        onTransitionEnd={this.handleEnd}>
                        {
                            !this.success ?
                                <span>立即注册</span> : null
                        }
                        {
                            this.hook ?
                                <i className="animate-hook"/> : null
                        }
                        {
                            this.hook ?
                                <span className="animate-text">注册成功 !</span> : null
                        }
                    </span>
                </div>
            </div>
        )

    }
}

