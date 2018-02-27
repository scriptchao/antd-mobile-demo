/**
 * Created by scriptchao on 2018/2/27.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'mobx-react';
import {Router, Route} from 'react-router-dom';
import history from './history';
import stores from './stores'
import App from './routes';

ReactDOM.render(
    <Provider {...stores}>
        <Router history={history}>
            <Route component={App}/>
        </Router>
    </Provider>,
    document.getElementById("app")
);
