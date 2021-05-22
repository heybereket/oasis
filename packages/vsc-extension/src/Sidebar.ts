import * as vscode from 'vscode';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Keys } from './keys';
import fetch from 'node-fetch';
import { nanoid } from 'nanoid';

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
        case 'open-login': {
          const authId = nanoid();
          globalState.update(Keys.authId, authId);

          vscode.env.openExternal(
            vscode.Uri.parse(
              `http://localhost:3000/auth/vscode?authId=${authId}`
            )
          );

          break;
        }

        case 'logged-in': {
          const authId = globalState.get<string>(Keys.authId) || '';

          const res = await fetch(
            `http://localhost:3000/api/auth/vscode/get-access?authId=${authId}`
          );
          const data = await res.json();

          await globalState.update(Keys.accessToken, data.accessToken);
          await globalState.update(Keys.refreshToken, data.refreshToken);

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
