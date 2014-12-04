module.exports = function M(position, arena) {
    var direction = position.direction;
    var x = position.x;
    var y = position.y;

    switch (direction) {
        case 'E' :
            ++x;
            break;
        case 'N' :
            ++y;
            break;
        case 'S' :
            --y;
            break;
        case 'W' :
            --x;
            break;
    }

    position.x = x;
    position.y = y;

    return !(x < 0 || x > arena.width || y < 0 || y > arena.length);
};
