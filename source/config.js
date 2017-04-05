'use strict';

const env = process.env;

var config;
if (env.NODE_ENV === 'production') {  //生产环境
    config = {
        listenPort: 4001,
    };
}
else {
    config = {
        listenPort: 4001,
    };
}


module.exports = config;
