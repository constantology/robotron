var define = require('su-define-object');

module.exports = define('RobotRequest', {
    hasOne : {
        body : define('RobotRequestBody', {
            hasOne : {
                position : require('./definitions/position')
            },
            properties : [
                require('./definitions/instructions')
            ]
        })
    },
    properties : [
        require('su-apiserver/lib/request/definitions/xcsrf'),
        require('../__common__/definitions/arena')
    ]
});
