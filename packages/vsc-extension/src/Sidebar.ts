import * as vscode from 'vscode';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Keys } from './keys';
import fetch from 'node-fetch';

const serverURL =
  process.env.NODE_ENV === 'production'
    ? 'https://vsc.oasis.sh'
    : 'http://localhost:5000';

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

    webviewView.webview.onDidReceiveMessage(async (msg) => {
      switch (msg.type) {
        case 'open-login': {
          const res = await fetch(`${serverURL}/login-creds`);
          const { authIdToken } = await res.json();
          this._context.globalState.update(Keys.auth, authIdToken);

          vscode.env.openExternal(
            vscode.Uri.parse(
              `http://localhost:3000/auth/vscode?t=${authIdToken}`
            )
          );

          break;
        }

        case 'logged-in': {
          const authToken =
            this._context.globalState.get<string>(Keys.auth) || '';

          const res = await fetch(`${serverURL}/get-data`, {
            headers: {
              authorization: `Bearer ${authToken}`,
            },
          });
          const data = await res.json();

          console.log(data);

          break;
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView): void {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    let content = readFileSync(
      join(__dirname, '../vsc-ui/dist/index.html')
    ).toString();

    content = content.replace(/(href|src)="(.*?)"/g, (_, hrefOrSrc, path) => {
      return `${hrefOrSrc}="${webview.asWebviewUri(
        vscode.Uri.joinPath(this._context.extensionUri, 'vsc-ui/dist', path)
      )}"`;
    });

    return content;
  }
}
