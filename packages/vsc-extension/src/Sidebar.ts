import * as vscode from 'vscode';
import { getNonce } from './getNonce';
import { readFileSync } from 'fs';
import { join } from 'path';

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _context: vscode.ExtensionContext) {}

  public resolveWebviewView(webviewView: vscode.WebviewView): void {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._context.extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    const globalState = this._context.globalState;

    webviewView.webview.onDidReceiveMessage(async (msg) => {
      switch (msg.type) {
        case 'request-token': {
          const refreshToken = await vscode.window.showInputBox({
            placeHolder: 'Enter your vscode token here',
          });

          webviewView.webview.postMessage({
            type: 'refresh-token',
            refreshToken,
          });

          break;
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView): void {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const extensionUri = this._context.extensionUri;

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(extensionUri, 'out/compiled', 'Sidebar.js')
    );

    // Uri to load styles into webview
    const stylesResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(extensionUri, 'media', 'reset.css')
    );
    const stylesMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(extensionUri, 'media', 'vscode.css')
    );

    // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${
          webview.cspSource
        }; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${stylesResetUri}" rel="stylesheet">
        <link href="${stylesMainUri}" rel="stylesheet">
        <script nonce="${nonce}">
          const process = { env: { NODE_ENV: "${
            process.env.NODE_ENV || 'development'
          }" } }
        </script>
			</head>
      <body>
      <div id="root"></div>
			</body>
      <script src="${scriptUri}" nonce="${nonce}"></script>
			</html>`;
  }
}
