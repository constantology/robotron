var path = require('path');

var CONFIG = require('config');

var session = require('su-apisession');

var e = require('su-apiserver/lib/errors');

module.exports = function* validateArena(next) {
    var req = this.su.req;
    var arena = yield session.get(req.xcsrf);

    if (arena) {
        if (arena.isValid !== false) {
            if (typeof arena.data === 'object') {
                req.arena = arena.data;
            }
        }
    }
    else {
        throw new e.UnauthorizedError();
    }

    yield next;
};
