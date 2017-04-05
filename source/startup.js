'use strict';

const co     = require('co');
const server = require('./server');

co(function* () {

    server.start();
}).then(() => {
    console.log('Gaoli data service running...');
}).catch((error) => {
    console.error(error.stack);
    process.exit(0);
});