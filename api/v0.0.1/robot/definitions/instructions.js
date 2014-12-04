var CONFIG = require('config');

var iter = require('super-iter');

var map = iter.map;

var values = CONFIG.enum.instructions;

module.exports = {
    instructions : {
        enumerable : true,
        set : function(value) {
            if (!value) {
                return values.slice();
            }

            if (!Array.isArray(value)) {
                value = [value];
            }

            value = map(value, function(val) {
                if (typeof val !== 'string') {
                    throw new TypeError('Invalid instruction (' + val + ') given.');
                }

                val = val.toUpperCase();

                if (values.indexOf(val) < 0) {
                    throw new RangeError('Invalid instruction(' + val + ') given.')
                }

                return val;
            });

            return value;
        },
        type : 'array'
    }
};
