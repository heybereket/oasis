"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarProvider = void 0;
const vscode = require("vscode");
const fs_1 = require("fs");
const path_1 = require("path");
class SidebarProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    }
    revive(panel) {
        this._view = panel;
    }
    _getHtmlForWebview(webview) {
        let content = fs_1.readFileSync(path_1.join(__dirname, "../vsc-ui/dist/index.html")).toString();
        content = content.replace(/(href|src)\=\"(.*?)\"/g, (_, hrefOrSrc, path) => {
            return `${hrefOrSrc}="${webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "vsc-ui/dist", path))}"`;
        });
        return content;
    }
}
exports.SidebarProvider = SidebarProvider;
//# sourceMappingURL=Sidebar.js.map