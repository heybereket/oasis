"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const Sidebar_1 = require("./Sidebar");
function activate(context) {
    console.log('Congratulations, your extension "vsc-oasis" is now active!');
    const sidebarProvider = new Sidebar_1.SidebarProvider(context);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider('vsc-oasis-sidebar', sidebarProvider));
    let disposable = vscode.commands.registerCommand('vsc-oasis.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from Oasis!');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map