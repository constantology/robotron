var path = require('path');

var CONFIG = require('config');

var session = require('su-apisession');

var e = require('su-apiserver/lib/errors');

module.exports = function* validatePosition(next) {
    var req = this.su.req;
    var body = req.body;
    var arena = this.su.req.arena;

    var position = body.position;

    if (position.x > arena.width) {
        throw new RangeError('Robot X coordinate is outside of the Arena.');
    }

    if (position.y > arena.length) {
        throw new RangeError('Robot Y coordinate is outside of the Arena.');
    }

    yield next;
};
