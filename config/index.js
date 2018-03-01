/**
 * Created by scriptchao on 2018/2/27.
 */

const host = '127.0.0.1';
const port = 6060;
const origin = process.env.NODE_ENV === 'development' ? 'https://dev.xinfud.com/salary' : 'https://dev.xinfud.com/salary';
// const origin = 'http://192.168.2.103:8080/salary';
const imgUrl = process.env.NODE_ENV === 'development' ? 'http://dev.xinfud.com:8081/1.png' : 'http://dev.xinfud.com:8081/1.png';

export default {
    host,
    port,
    origin,
    imgUrl
}
