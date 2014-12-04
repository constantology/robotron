var path = require('path');

var co = require('co');
var moment = require('moment-timezone');

var CONFIG = require('config');

// globally set the timezone to UTC
process.env.TZ = 'UTC';

// globally set the locale of moment
moment.locale(CONFIG.date.lang);
// set start day of the week
moment.localeData(CONFIG.date.lang)._week.dow = CONFIG.date.start_of_week;

// init logger
require('su-apiserver/node_modules/su-logger')(require('./log'));

var api = require('require-all')(path.join(process.cwd(), 'api'));

module.exports.app = {};

co(function* () {
    // start the server
    module.exports.app = yield require('su-apiserver')(api);

    // this will connect to the session store's db
    require('su-apisession');
})();

