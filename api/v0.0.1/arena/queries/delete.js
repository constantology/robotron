var session = require('su-apisession');

module.exports = function* deleteArena() {
    var data = { invalidated : false };
    var arena_id = this.su.req.params.arenaId;
    var arena = yield session.get(arena_id);

    if (arena) {
        yield session.invalidate(arena_id);

        data.invalidated = true;
    }
    else {
        data.arena_exists = false;
    }

    return data;
};
