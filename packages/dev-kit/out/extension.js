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
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import { exec } from "child_process";
const child_process_1 = require("child_process");
const vscode = require("vscode");
const cz_1 = require("./cz");
const node_fetch_1 = require("node-fetch");
const auditLocalhost_1 = require("./lh/auditLocalhost");
const vscodify_1 = require("./lh/vscodify");
function activate(context) {
    let disposable = vscode.commands.registerCommand('oasis-dev-kit.commit', () => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const projectRoot = (_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a[0].uri.fsPath;
        if (!projectRoot) {
            vscode.window.showErrorMessage('You are not in a workspace folder!');
            return;
        }
        const msg = (yield cz_1.default());
        child_process_1.exec(`cd "${projectRoot}" && git add . && git commit -m "${msg}"`);
    }));
    context.subscriptions.push(disposable);
    context.subscriptions.push(vscode.commands.registerCommand('oasis-dev-kit.audit-staging', () => __awaiter(this, void 0, void 0, function* () {
        const panel = vscode.window.createWebviewPanel('oasis-dev-kit:audit-staging', 'Audit - Staging Server', vscode.ViewColumn.One, {
            enableScripts: true,
        });
        let content = yield (yield node_fetch_1.default('https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fdev.oasis.sh')).text();
        panel.webview.html = vscodify_1.vscodify(content);
    })));
    context.subscriptions.push(vscode.commands.registerCommand('oasis-dev-kit.audit-local', () => __awaiter(this, void 0, void 0, function* () {
        const panel = vscode.window.createWebviewPanel('oasis-dev-kit:audit-local', 'Audit - Local', vscode.ViewColumn.One, {
            enableScripts: true,
        });
        panel.webview.html = `<h1>Loading...</h1>`;
        const content = yield auditLocalhost_1.auditLocalhost();
        panel.webview.html = vscodify_1.vscodify(content);
    })));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map