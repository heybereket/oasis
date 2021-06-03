"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLocalhost = void 0;
const chromeLauncher = require("chrome-launcher");
const lighthouse = require('lighthouse');
const auditLocalhost = () => __awaiter(void 0, void 0, void 0, function* () {
    const chrome = yield chromeLauncher.launch({
        chromeFlags: [
            '--no-first-run',
            '--headless',
            '--disable-gpu',
            '--no-sandbox',
        ],
    });
    const runnerResult = yield lighthouse('http://localhost:3000', {
        port: chrome.port,
        output: 'html',
    });
    yield chrome.kill();
    return runnerResult.report;
});
exports.auditLocalhost = auditLocalhost;
//# sourceMappingURL=auditLocalhost.js.map