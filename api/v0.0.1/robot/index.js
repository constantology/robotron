module.exports = [{
    method : 'POST',
    type : 'json',
    paths : [{
        id : 'control',
        params : '/',
        request : require('./Request'),
        interceptors : [
            require('../__common__/interceptors/validateArena'),
            require('./interceptors/validatePosition')
        ]
    }],
    query : require('./query'),
    pipeline : [
        require('./location')
    ]
}];
