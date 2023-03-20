const vscode = require('vscode');

function activate(context) {
  const decorationTypes = [
    { color: 'rgba(255, 0, 0, 0.4)', pattern: /TODO:/ },
    { color: 'rgba(0, 255, 0, 0.4)', pattern: /FIXME:/ },
    { color: 'rgba(0, 0, 255, 0.4)', pattern: /NOTE:/ },
  ];

  const decorators = decorationTypes.map(({ color, pattern }) => {
    const decorationType = vscode.window.createTextEditorDecorationType({
      backgroundColor: color,
    });
    context.subscriptions.push(decorationType);
    return { decorationType, pattern };
  });

  const updateDecorations = (editor) => {
    if (!editor) {
      return;
    }

    const text = editor.document.getText();
    const decorations = decorators.reduce((acc, { decorationType, pattern }) => {
      const regex = new RegExp(pattern, 'g');
      let match;
      while ((match = regex.exec(text))) {
        const startPos = editor.document.positionAt(match.index);
        const endPos = editor.document.positionAt(match.index + match[0].length);
        const decorationRange = { range: new vscode.Range(startPos, endPos) };
        acc.push(decorationRange);
      }
      return acc;
    }, []);

    editor.setDecorations(decorators.map(({ decorationType }) => decorationType), decorations);
  };

  vscode.window.onDidChangeActiveTextEditor(updateDecorations);
  vscode.workspace.onDidChangeTextDocument((event) => {
    if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
      updateDecorations(vscode.window.activeTextEditor);
    }
  });

  updateDecorations(vscode.window.activeTextEditor);
}

module.exports = {
  activate,
};
