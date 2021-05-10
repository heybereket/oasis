"use strict";
exports.__esModule = true;
exports.chalkLog = void 0;
var chalk = require('chalk');
var chalkLog = function (type, message) {
    switch (type) {
        // Successful, no issues
        case 'success':
            return chalk.green(message);
        // Uh oh, there were issues found
        case 'error':
            return chalk.red(message);
        // Non critical, just letting you know
        case 'warning':
            return chalk.yellow(message);
    }
};
exports.chalkLog = chalkLog;
