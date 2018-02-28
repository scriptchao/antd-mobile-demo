/**
 * Created by scriptchao on 2018/2/27.
 */

import {observable, action} from 'mobx';
import {Toast} from 'antd-mobile'
import xhr from '../../xhr'

class WxStore {

    constructor() {
        this.signatureUrl = '/weixin/authorized/js';
    }

    @action getSignature(body, shareData) {

        return xhr({
            method: 'get',
            url: this.signatureUrl,
            body,
        }).then((response) => {
            if (response.result === 'c002') {
                wx.config({
                    debug: false,
                    appId: response.appId,
                    timestamp: response.ranTime,
                    nonceStr: response.nonceStr,
                    signature: response.signature,
                    jsApiList: [
                        'checkJsApi', // 检查api
                        'onMenuShareTimeline',//分享朋友圈
                        'onMenuShareAppMessage', // 分享给朋友
                        'onMenuShareQQ',//分享QQ
                        'onMenuShareWeibo', //分享到微博
                        'onMenuShareQZone',//分享到qq空间
                        'chooseImage', // 选择图片
                        'uploadImage', //上传图片
                        'downloadImage', //下载图片
                        'getNetworkType', //获取网络状态接口
                        'getLocation', // 获取地理位置接口
                        'scanQRCode', // 微信扫一扫
                        'openAddress', // 共享收货地址接口
                        'closeWindow', // 关闭窗口
                    ]
                });
                wx.ready(function () {
                    if (!shareData.link) {
                        shareData.link = response.url
                    }
                    wx.onMenuShareAppMessage(shareData);
                    wx.onMenuShareTimeline(shareData);
                    wx.onMenuShareQQ(shareData);
                    wx.onMenuShareWeibo(shareData);
                    wx.onMenuShareQZone(shareData);
                });
                wx.error(function (response) {
                    console.log('失败!');
                });
                return response
            }
            Toast.fail(response.message);
            return false;
        });
    }
}

export default new WxStore();

