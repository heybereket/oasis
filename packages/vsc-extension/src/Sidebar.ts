import * as vscode from "vscode";
import { readFileSync } from "fs";
import { join } from "path";

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    let content = readFileSync(
      join(__dirname, "../vsc-ui/dist/index.html")
    ).toString();

    content = content.replace(
      /(href|src)\=\"(.*?)\"/g,
      (_, hrefOrSrc, path) => {
        return `${hrefOrSrc}="${webview.asWebviewUri(
          vscode.Uri.joinPath(this._extensionUri, "vsc-ui/dist", path)
        )}"`;
      }
    );

    return content;
  }
}
