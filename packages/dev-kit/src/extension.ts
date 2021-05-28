// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import { exec } from "child_process";
import { exec } from 'child_process';
import * as vscode from 'vscode';
import cz from './cz';
import fetch from 'node-fetch';
import { auditLocalhost } from './lh/auditLocalhost';
import { vscodify } from './lh/vscodify';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'oasis-dev-kit.commit',
    async () => {
      const projectRoot = vscode.workspace.workspaceFolders?.[0].uri.fsPath;

      if (!projectRoot) {
        vscode.window.showErrorMessage('You are not in a workspace folder!');
        return;
      }

      const msg: string = (await cz()) as any;

      exec(`cd "${projectRoot}" && git add . && git commit -m "${msg}"`);
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(
    vscode.commands.registerCommand('oasis-dev-kit.audit-staging', async () => {
      const panel = vscode.window.createWebviewPanel(
        'oasis-dev-kit:audit-staging',
        'Audit - Staging Server',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );

      let content = await (
        await fetch(
          'https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fdev.oasis.sh'
        )
      ).text();

      panel.webview.html = vscodify(content);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('oasis-dev-kit.audit-local', async () => {
      const panel = vscode.window.createWebviewPanel(
        'oasis-dev-kit:audit-local',
        'Audit - Local',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );

      panel.webview.html = `<h1>Loading...</h1>`;

      const content = await auditLocalhost();

      panel.webview.html = vscodify(content);
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
