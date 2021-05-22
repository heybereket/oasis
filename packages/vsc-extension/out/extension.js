"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const Sidebar_1 = require("./Sidebar");
function activate(context) {
    console.log('Congratulations, your extension "vsc-oasis" is now active!');
    const sidebarProvider = new Sidebar_1.SidebarProvider(context);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider('vsc-oasis-sidebar', sidebarProvider));
    context.subscriptions.push(vscode.commands.registerCommand('vsc-oasis.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from Oasis!');
    }));
}
exports.activate = activate;
// eslint-disable-next-line @typescript-eslint/no-empty-function
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map