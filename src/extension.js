const { activate } = require('./comment-color');

function activate(context) {
  console.log('Congratulations, your extension is now active!');

  activate(context);

  let disposable = vscode.commands.registerCommand('comment-color.active', () => {
    vscode.window.showInformationMessage('Hello from Comment Color!');
  });

  context.subscriptions.push(disposable);
}

module.exports = {
  activate,
};
