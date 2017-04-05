'use strict';

const router  = require('koa-router')();
const koaBody = require('koa-body')();

router.get('/test', koaBody, handelTest);

function* handelTest() {
    this.glResponse(0, {msg: 'hello world'});
}

module.exports = router;