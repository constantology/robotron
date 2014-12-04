module.exports = function L(position, arena) {
    var current = position.direction;

    switch (current) {
        case 'E' :
            position.direction = 'N';
            break;
        case 'N' :
            position.direction = 'W';
            break;
        case 'S' :
            position.direction = 'E';
            break;
        case 'W' :
            position.direction = 'S';
            break;
    }

    return true;
};
