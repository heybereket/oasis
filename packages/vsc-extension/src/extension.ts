import * as vscode from "vscode";
import { SidebarProvider } from "./Sidebar";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vsc-oasis" is now active!');

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "vsc-oasis-sidebar",
      sidebarProvider
    )
  );

  let disposable = vscode.commands.registerCommand(
    "vsc-oasis.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello World from Oasis!");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
