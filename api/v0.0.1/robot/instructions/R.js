module.exports = function R(position, arena) {
    var current = position.direction;

    switch (current) {
        case 'E' :
            position.direction = 'S';
            break;
        case 'N' :
            position.direction = 'E';
            break;
        case 'S' :
            position.direction = 'W';
            break;
        case 'W' :
            position.direction = 'N';
            break;
    }

    return true;
};
