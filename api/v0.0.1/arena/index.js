module.exports = [{
    method : 'POST',
    type : 'json',
    paths : [{
        id : 'create',
        params : '/',
        request : require('./requests/Create'),
        interceptors : [
            require('./interceptors/validateArea')
        ]
    }],
    query : require('./queries/create'),
    pipeline : [
        require('../__common__/transformers/identity')
    ]
}, {
    method : 'DELETE',
    type : 'json',
    paths : [{
        id : 'delete',
        params : '/:arenaId',
        request : require('./requests/Delete')
    }],
    query : require('./queries/delete'),
    pipeline : [
        require('../__common__/transformers/identity')
    ]
}
];
