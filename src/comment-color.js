const vscode = require('vscode');

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
