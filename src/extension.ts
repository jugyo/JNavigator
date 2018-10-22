import * as vscode from "vscode";
import jnavigator from "./jnavigator";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.jnavigator.navigate", () => {
      jnavigator.navigate();
    }),
  );
}

export function deactivate() {}
