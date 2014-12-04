var path = require('path');

var iter = require('super-iter');

var session = require('su-apisession');

var e = require('su-apiserver/lib/errors');

var command = require('require-all')(path.resolve(__dirname, 'instructions'));

var every = iter.every;

module.exports = function* query() {
    var req = this.su.req;
    var body = req.body;

    var arena_id = req.xcsrf;
    var arena = yield session.get(arena_id);
    var position = body.position;
    var instructions = body.instructions;
    var index;

    //while (arena.data.busy) {
    //    yield
    //}

    arena.data.busy = true;

    yield session.update(arena);

    var valid = every(instructions, function(instruction, i) {
        var valid = command[instruction](position, arena.data);

        index = i;

        return valid;
    });

    arena.data.busy = false;

    if (!valid) {
        return new e.BadRequestError('Bad instruction given at index (' + index + '). Robot was moved outside the arena: ' + position.x + ' ' + position.y + ' ' + position.direction + '.');
    }

    yield session.update(arena);

    return position;
};
