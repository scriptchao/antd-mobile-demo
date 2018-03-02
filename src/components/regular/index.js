/**
 * Created by scriptchao on 2018/3/2.
 */

const companyName = /.+/;
const email = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
const password = /^(?![0-9]*$)[a-zA-Z0-9]{6,20}$/;

export default {
    companyName,
    email,
    password
}
