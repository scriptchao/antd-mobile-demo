/**
 * Created by scriptchao on 2017/11/2.
 */
import axios from 'axios'
import {Toast} from 'antd-mobile'
import NProgress from 'nprogress'
import '../styles/nprogress.sass'
import requestConfig from '../../config';

const config = {
    baseURL: requestConfig.origin,
    headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded'
    },
};

axios.interceptors.request.use((requestConfig) => {
    NProgress.start();

    return requestConfig
});

axios.interceptors.response.use((res) => {
    NProgress.done();

    return res.data;

});

const xhr = (req = {}) => {
    const {method, url, body = {}} = req;

    if (method === 'get' || method === 'GET') {

        config.data = {};
        config.params = body;
    }

    if (method === 'post' || method === 'POST') {

        config.params = {};
        config.data = body;
    }

    config.url = url;
    config.method = method;
    config.withCredentials = true;

    return axios(config)
        .catch((e) => {
            console.log(e)
        })
};

export default xhr;
