/**
 * Created by scriptchao on 2017/12/19.
 */

import path from 'path';
import webpack from 'webpack';
import express from 'express';
import connectHistoryApiFallback from 'connect-history-api-fallback';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import compression from 'compression';
import devConfig from './webpack.dev';
import prodConfig from './webpack.prod';
import config from '../config';

const app = express();

app.use(compression());

if (process.env.NODE_ENV === 'development') {

    const compiler = webpack(devConfig);

    app.use('/static', express.static(path.join(__dirname, '..', 'static')));

    app.use('/', connectHistoryApiFallback()); // 访问任何地址时指向根目录

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: '/', // 虚拟目录
    }));

    app.use(webpackHotMiddleware(compiler));
} else {
    webpack(prodConfig, (err, stats) =>
        console.log('the static files have been generated,please open browser for watch'));

    app.use('/', connectHistoryApiFallback());

    app.use('/', express.static(path.join(__dirname, '..', 'docs')));
}

app.listen(config.port, (err) => { // 6060
    if (err) {
        console.log(err);
    } else {
        console.log(`===>app is running at port:${config.port}`);
    }

});

