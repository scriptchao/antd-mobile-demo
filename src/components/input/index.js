import React from 'react'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import './index.sass'

export default class Input extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {type = 'text', className = '', placeholder, value = '', prefix, error, wrapper} = this.props;
        return (
            wrapper ?
                <span className="zyc-input-wrapper">
                    {
                        prefix ? <span className="zyc-input-prefix">{prefix}</span> : null
                    }
                    <input
                        type={type}
                        className={`${className} zyc-input`}
                        placeholder={placeholder}
                        value={value}
                        onChange={this.props.onChange}
                    />
                    {
                        typeof error === 'boolean' ?
                            <span className="zyc-input-suffix">
                                {
                                    error ?
                                        <i className="iconfont icon-zhengque success"/> :
                                        <i className="iconfont icon-tishi warn"/>
                                }
                            </span> : null
                    }
                </span> :
                <input
                    type={type}
                    className={`${className} zyc-input`}
                    placeholder={placeholder}
                    value={value}
                    onChange={this.props.onChange}
                />
        )
    }
}
