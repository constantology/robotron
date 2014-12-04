var define = require('su-define-object');

module.exports = define('CreateRequest', {
    hasOne : {
        body : define('CreateRequestBody', {
            properties : [{
                length : require('../../__common__/definitions/_integer_positive'),
                width : require('../../__common__/definitions/_integer_positive')
            }]
        })
    }
});
