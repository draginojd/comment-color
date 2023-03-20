const vscode = require('vscode'); //import vscode 

function activateCommentColor(context) {
  console.log('Congratulations, your "Comment Color" extension is now active!');

  const decorationTypes = [
    { color: 'rgba(255, 0, 0, 0.4)', pattern: /TODO:/ },
    { color: 'rgba(0, 255, 0, 0.4)', pattern: /FIXME:/ },
    { color: 'rgba(0, 0, 255, 0.4)', pattern: /NOTE:/ },
  ];

  decorationTypes.forEach((decorationType) => {
    const decoration = require('vscode').window.createTextEditorDecorationType({
      backgroundColor: decorationType.color,
    });

    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        const text = editor.document.getText();
        const decorations = [];
        const regex = new RegExp(decorationType.pattern, 'g');
        let match;
        while ((match = regex.exec(text))) {
          const startPos = editor.document.positionAt(match.index);
          const endPos = editor.document.positionAt(match.index + match[0].length);
          const decorationRange = { range: new vscode.Range(startPos, endPos) };
          decorations.push(decorationRange);
        }
        editor.setDecorations(decoration, decorations);
      }
    });

    context.subscriptions.push(decoration);
  });
}

module.exports = {
  activateCommentColor,
};

function activate(context) {
  console.log('Congratulations, your extension is now active!');

  activateCommentColor(context);

  let disposable = vscode.commands.registerCommand('comment-color.active', () => {
    // Your command handler code goes here
    vscode.window.showInformationMessage('Hello from Comment Color!');
  });

  context.subscriptions.push(disposable);
}


function deactivate() {}

module.exports = {
  activate,
  deactivate
};