/**
 * Created by scriptchao on 2018/2/27.
 */

const host = '127.0.0.1';
const port = 6060;
const origin = process.env.NODE_ENV === 'development' ? 'https://dev.xinfud.com/salary' : 'https://pay.xinfud.com/salary';
// const origin = 'http://192.168.2.103:8080/salary';
const imgUrl = 'https://image.xinfud.com/sharePhoto.jpg';

export default {
    host,
    port,
    origin,
    imgUrl
}
