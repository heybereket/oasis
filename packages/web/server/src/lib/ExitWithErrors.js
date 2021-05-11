"use strict";
exports.__esModule = true;
exports.ExitWithErrors = void 0;
var chalk = require('chalk');
var chalkLog_1 = require("./chalkLog");
var ExitWithErrors = function (amount) {
    if (amount < 2) {
        return console.error(chalkLog_1.chalkLog('error', "error") + " - Exiting with " + amount + " error...");
    }
    else {
        return console.error(chalkLog_1.chalkLog('error', "error") + " - Exiting with " + amount + " errors...");
    }
};
exports.ExitWithErrors = ExitWithErrors;
