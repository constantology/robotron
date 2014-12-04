require('shelljs/global');

var fs = require('fs');
var path = require('path');

var CONFIG = require('config');

var log_path = path.resolve(CONFIG.log.path);

if (!fs.existsSync(log_path)) {
    mkdir('-p', log_path);
}

log_path += '/robotron.log';

if (fs.existsSync(log_path)) {
    rm('-f', log_path);
}

module.exports = function log() {
    var args = Array.prototype.slice.call(arguments).reduce(function(acc, arg) {
        if (arg instanceof Error) {
            acc.push(arg.stack);

            try {
                if (arg.stackTraces) {
                    acc.push(arg.stackTraces());
                }
            } catch(e) {}
        }
        else {
            acc.push(arg);
        }

        return acc;
    }, []);

    console.log.apply(console, args);

    fs.appendFile(log_path, args.map(function(arg) {
        return arg && typeof arg === 'object'
             ? JSON.stringify(arg)
             : arg;
    }).join('\t') + '\n', 'utf8');
};
