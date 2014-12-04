var func = require('super-func');

var enums = require('su-validate-type/enums');

var CONFIG = require('config');

var partial = func.partial;

module.exports = {
    direction : {
        enumerable : true,
        enums : CONFIG.enum.compass_cardinal_points,
        set : partial(enums, CONFIG.enum.compass_cardinal_points),
        type : 'string'
    }
};

