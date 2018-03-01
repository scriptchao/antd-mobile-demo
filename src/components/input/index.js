import React from 'react'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import './index.sass'

export default class Input extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {type = 'text', className = '', placeholder, value = '', prefix} = this.props;
        return (
            prefix ?
                <span className="zyc-input-wrapper">
                    <span className="zyc-input-prefix">
                        {prefix}
                    </span>
                    <input
                        type={type}
                        className={`${className} zyc-input`}
                        placeholder={placeholder}
                        value={value}
                        onChange={this.props.onChange}
                    />
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
