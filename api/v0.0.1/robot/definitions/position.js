var define = require('su-define-object');

module.exports = define( 'RobotPosition', {
    properties : [
        {
            x : require('../../__common__/definitions/_integer_positive'),
            y : require('../../__common__/definitions/_integer_positive')
        },
        require('./direction')
    ]
});
