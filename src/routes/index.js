/**
 * Created by scriptchao on 2017/10/26.
 */

import React, {Fragment} from 'react';
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react';
import {Route, Switch} from 'react-router-dom';
import Homepage from '../containers/homepage'

@observer
export default class App extends React.Component {

    render() {

        return (
            <Fragment>
                <Route component={Homepage}/>
            </Fragment>
        );
    }
}


