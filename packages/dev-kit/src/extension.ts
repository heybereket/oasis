// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import { exec } from "child_process";
import { exec } from "child_process";
import * as vscode from "vscode";
import cz from "./cz";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "oasis-dev-kit.commit",
    async () => {
      const projectRoot = vscode.workspace.workspaceFolders?.[0].uri.fsPath;

      if (!projectRoot) {
        vscode.window.showErrorMessage("You are not in a workspace folder!");
        return;
      }

      const msg: string = (await cz()) as any;

      exec(`cd "${projectRoot}" && git add . && git commit -m "${msg}"`);
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
