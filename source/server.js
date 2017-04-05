'use strict';

const koa          = require('koa');
const router       = require('koa-router');
const config       = require('./config');
const rootRouter   = router();
const commonRouter = require('./routers/common');
const middleware  = require('./utils/middleware');

const server = koa();
server.keys = ['idjoLi9234Nso992N2oNs0o13N4ll'];
server.context.glResponse = middleware.glResponse;
server.context.onerror = function(err) {
    if (err) {
        console.error(err.stack);
        if (this.res && !this.res.finished) {
            this.body = {
                result: errCode.programError,
                message: err.toString()
            };
            this.res.end(JSON.stringify(this.body));
        }
    }
};

exports.start = function() {

    //设置允许跨域
    server.use(middleware.setCROS);

    //设置接口日志
    rootRouter.use(middleware.setLog);

    //设置根路由
    rootRouter.use('/common', commonRouter.routes());

    server.use(rootRouter.routes());

    //设置404返回
    server.use(middleware.setNotFound);

    //开始监听
    server.listen(config.listenPort);
};