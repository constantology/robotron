module.exports = [{
    method : 'GET',
    type : 'json',
    paths : [{
        id : 'check',
        params : '/check',
        request : require('su-define-object')('Request', {})
    }],
    query : require('../healthcheck'),
    pipeline : [
        require('../__common__/transformers/identity')
    ]
}];
