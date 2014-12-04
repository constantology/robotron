var path = require('path');

var CONFIG = require('config');

var session = require('su-apisession');

var e = require('su-apiserver/lib/errors');

module.exports = function* validateArea(next) {
    var req = this.su.req;
    var body = req.body;

    if (body.length * body.width === 0) {
        throw new RangeError('Arena area must be greater than zero.');
    }

    yield next;
};
