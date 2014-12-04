var define = require('su-define-object');

module.exports = define('DeleteRequest', {
    hasOne : {
        params : define('DeleteRequestParams', {
            properties : [
                require('../../__common__/definitions/arenaId')
            ]
        })
    }
});
