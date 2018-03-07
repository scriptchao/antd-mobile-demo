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
import regular from '../regular'

@inject('UserStore') @observer
export default class Register extends React.Component {
    @observable companyName = '';
    @observable email = '';
    @observable password = '';
    @observable rePassword = '';

    @observable companyNameError;
    @observable emailError;
    @observable passwordError;
    @observable rePasswordError;

    @observable success = '';
    @observable hook;

    @observable once;

    constructor(props) {
        super(props);

        this.userStore = this.props.UserStore;
    }

    componentWillMount() {
        const {code} = qs.parse(location.search.slice(1));
        this.code = code;
    }


    handleRegister = () => {
        if(this.once) {
            return true
        }

        if (!this.companyNameError) {
            Toast.info('请输入企业名称!')
        } else if (!this.emailError) {
            Toast.info('邮箱格式不正确!')
        } else if (!this.passwordError || !this.rePasswordError) {
            Toast.info('密码过于简单!')
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
                    this.once = true;
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
                <div style={{visibility: this.success ? 'hidden' : 'visible'}}>
                    <Input type="text" placeholder="企业名称" value={this.companyName}
                           wrapper
                           prefix={<i className="iconfont icon-gongsi"/>}
                           error={this.companyNameError}
                           onChange={(e) => {
                               this.companyName = e.target.value.replace(/^\s+|\s+$/g,'');
                               this.companyNameError = regular.companyName.test(this.companyName);
                           }}>
                    </Input>
                    <WhiteSpace/>
                    <Input type="text" placeholder="邮箱" value={this.email}
                           wrapper
                           prefix={<i className="iconfont icon-youxiang"/>}
                           error={this.emailError}
                           onChange={(e) => {
                               this.email = e.target.value.replace(/^\s+|\s+$/g,'');
                               this.emailError = regular.email.test(this.email)
                           }}/>
                    <WhiteSpace/>
                    <Input type="password" placeholder="密码" value={this.password}
                           wrapper
                           prefix={<i className="iconfont icon-mima"/>}
                           error={this.passwordError}
                           onChange={(e) => {
                               this.password = e.target.value.replace(/^\s+|\s+$/g,'');
                               this.passwordError = regular.password.test(this.password)
                           }}/>
                    <WhiteSpace/>
                    <Input type="password" placeholder="确认密码" value={this.rePassword}
                           wrapper
                           prefix={<i className="iconfont icon-mima"/>}
                           error={this.rePasswordError}
                           onChange={(e) => {
                               this.rePassword = e.target.value.replace(/^\s+|\s+$/g,'');
                               this.rePasswordError = regular.password.test(this.rePassword)
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

