var HC = require('su-healthcheck');

module.exports = function* healthcheck() {
    return {
        available_diskspace : HC.df(),
        free_memory : HC.memory(),
        node : HC.version(),
        redis : yield HC.redis({
            host : process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1',
            port : process.env.REDIS_PORT_6379_TCP_PORT || 6379
        })
    };
};
