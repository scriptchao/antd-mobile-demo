import React from 'react'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import Register from '../../components/register'

export default class Homepage extends React.Component {
    render() {
        return (
            <div className="homepage">
                <Register/>
            </div>
        )
    }
}
