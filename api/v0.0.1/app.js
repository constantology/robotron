module.exports = function* app() {
    return {
        // for the purposes of this test we'll just use redis as our database
        db : require('su-apisession/redis')
    };
};
