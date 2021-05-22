import * as vscode from 'vscode';
import { SidebarProvider } from './Sidebar';

export function activate(context: vscode.ExtensionContext): void {
  console.log('Congratulations, your extension "vsc-oasis" is now active!');

  const sidebarProvider = new SidebarProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'vsc-oasis-sidebar',
      sidebarProvider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vsc-oasis.helloWorld', () => {
      vscode.window.showInformationMessage('Hello World from Oasis!');
    })
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate(): void {}
