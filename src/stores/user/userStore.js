/**
 * Created by scriptchao on 2018/2/27.
 */

import {observable, action} from 'mobx';
import {Toast} from 'antd-mobile'
import xhr from '../../xhr'

class UserStore {

    constructor() {
        this.registerUrl = '/public/userRegister/register/json';
    }

    @action postRegister(body) {

        return xhr({
            method: 'post',
            url: this.registerUrl,
            body,
        }).then((response) => {
            if (response.result === 'c002') {
                return response
            }
            Toast.fail(response.message);
            return false;
        });
    }
}

export default new UserStore();

