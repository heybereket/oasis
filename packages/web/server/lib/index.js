"use strict";
exports.__esModule = true;
exports.chalkLog = void 0;
var chalk = require('chalk');
var chalkLog = function (type, message) {
    switch (type) {
        case 'success':
            return chalk.green(message);
        case 'error':
            return chalk.red(message);
    }
};
exports.chalkLog = chalkLog;
