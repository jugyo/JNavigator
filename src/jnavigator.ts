import * as vscode from "vscode";

const jnavigator = {
  navigate: async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const selectedText = editor.document.getText(editor.selection).trim();

    const lines: vscode.TextLine[] = [];
    for (let i = 0; i < editor.document.lineCount; i++) {
      const line = editor.document.lineAt(i);
      lines.push(line);
    }

    const quickPick = vscode.window.createQuickPick();
    quickPick.value = selectedText;
    quickPick.items = lines.map(i => ({
      label: `${i.lineNumber + 1}: ${i.text}`
    }));
    quickPick.onDidChangeActive(selection => {
      if (selection[0] && selection[0].label) {
        const label = selection[0].label;
        const match = label.match(/^(\d+):/);
        if (match) {
          const lineNumber = parseInt(match[0], 10) - 1;
          const line = lines[lineNumber];
          if (line) {
            const indexOfSelectedText = line.text.indexOf(quickPick.value);
            editor.selection = new vscode.Selection(
              line.range.start.with({ character: indexOfSelectedText }),
              line.range.start.with({
                character: indexOfSelectedText + quickPick.value.length
              })
            );
            editor.revealRange(
              line.range,
              vscode.TextEditorRevealType.InCenterIfOutsideViewport
            );
          }
        }
      }
    });
    quickPick.onDidChangeSelection(selection => {
      quickPick.hide();
    });
    quickPick.onDidHide(() => quickPick.dispose());
    quickPick.show();
  }
};

export default jnavigator;
