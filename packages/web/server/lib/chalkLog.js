"use strict";
exports.__esModule = true;
exports.chalkLog = void 0;
var chalk = require('chalk');
var chalkLog = function (type, message) {
    switch (type) {
        // Successful, no issues
        case 'success':
            return chalk.green.bold(message);
        // Uh oh, there were issues found
        case 'error':
            return chalk.red.bold(message);
        // Non critical messages
        case 'warning':
            return chalk.yellow.bold(message);
    }
};
exports.chalkLog = chalkLog;
