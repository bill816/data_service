'use strict';

exports.setLog = function* (next) {
    let start = new Date;
    yield next;
    let ms = new Date - start;
    console.log('%s %s - %s %sms', this.method, this.url, this.status, ms);
};

exports.setCROS = function* (next) {
    let origin = this.get('Origin') || '*';
    this.set('Access-Control-Allow-Origin', origin);
    this.set('Access-Control-Allow-Credentials', 'true');

    if (this.method === 'OPTIONS') {
        this.set('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
        this.set('Access-Control-Allow-Headers', this.get('Access-Control-Request-Headers') || '*');
        this.status = 200;
    } else {
        yield next;
    }
};

exports.setNotFound = function* () {
    console.error('%s %s - not found', this.method, this.url);
    this.body = 'api not found';
    this.status = 404;
};

exports.glError = function(code, message) {
    let err = new PPKError(code, message);
    Error.captureStackTrace(err);
    let line = err.stack.split('\n')[2];
    line = line.substring(line.indexOf('('));
    console.error(`${line} - ${code} - ${message}`);
    return err;
};

exports.glResponse = function(result, message, data) {
    if (result instanceof PPKError) {
        return this.body = {
            result: result.code,
            message: result.message
        };
    }

    if (typeof message !== 'string') {
        data = message;
        message = undefined;
    }
    this.body = {
        result: result,
        message: message,
        data: data
    };
};

const PPKError = function(code, message) {
    this.code = code;
    this.message = message;
};

