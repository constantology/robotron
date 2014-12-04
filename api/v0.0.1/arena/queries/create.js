var session = require('su-apisession');

var e = require('su-apiserver/lib/errors');

module.exports = function* createArena() {
    var body = this.su.req.body;

    var length = body.length;
    var width = body.width;

    var area = length * width;

    var arena_id = yield session.set({
            area : area,
            length : length,
            width : width
        });

    return {
        id : arena_id
    };
};
