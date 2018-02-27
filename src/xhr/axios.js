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
    },
};

axios.interceptors.request.use((requestConfig) => {
    NProgress.start();

    return requestConfig
});

axios.interceptors.response.use((res) => {
    NProgress.done();

    if (res.statusText === 'OK' || res.statusText === '') {
        return res.data;
    }

    Toast.fail(res.status);
    return false
});

const xhr = (req = {}) => {
    const {method, url, body = {}} = req;

    if (method === 'get' || method === 'GET') {
        config.params = body

    }

    if (method === 'post' || method === 'POST') {
        config.data = body
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
