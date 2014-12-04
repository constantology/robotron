
module.exports = {
    arenaId : {
        enumerable : true,
        set : function(token) {
            token = String(token);

            if (token.length !== 32) {
                throw new RangeError('Invalid Arena ID (' + token + ') specified.');
            }

            return token;
        },
        type : 'string'
    }
};
