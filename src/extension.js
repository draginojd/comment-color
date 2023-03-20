const { activateCommentColor } = require('./comment-color.js');
const vscode = require('vscode');

function activate(context) {
  console.log('Congratulations, your extension is now active!');

  activateCommentColor(context);

  let disposable = vscode.commands.registerCommand('comment-color.active', () => {
    vscode.window.showInformationMessage('Hello from Comment Color!');
  });

  context.subscriptions.push(disposable);
}

module.exports = {
  activate,
};

