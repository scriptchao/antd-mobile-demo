/**
 * Created by scriptchao on 2017/11/15.
 */
const autoprefixer = require('autoprefixer');
// const pxtorem = require('postcss-pxtorem');

const options = {
    rootValue: 50,
    propList: ['*'],
};

module.exports = {
    plugins: [
        // pxtorem(options),
        autoprefixer({
            // browsers: ['last 2 versions']
            browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
        }),
    ]
};
