var stringToNumber = require('su-validate-type/stringToNumber');

module.exports = {
    enumerable : true,
    set : function(val) {
        var n = stringToNumber(val);

        n = parseInt(n, 10);

        if (n < 0) {
            throw new TypeError('Negative number(' + n + ') given, only positive integers are allowed.');
        }

        return n;
    },
    type : 'number'
};
