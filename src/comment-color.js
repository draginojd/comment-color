//comment-color.js file
const vscode = require('vscode');

function activateCommentColor(context) {
  console.log('Congratulations, your extension "comment-color" is now active!');

  // Register the command to change the comment color
  const disposable = vscode.commands.registerCommand('extension.changeCommentColor', () => {
    // Get the current configuration
    const config = vscode.workspace.getConfiguration('editor.tokenColorCustomizations', null);

    // Set the color of comments to green
    const commentColor = config.tokenColors.find((color) => color.scope === 'comment');
    commentColor.settings.foreground = '#00FF00';

    // Update the configuration
    vscode.workspace
      .getConfiguration()
      .update('editor.tokenColorCustomizations', config, vscode.ConfigurationTarget.Global)
      .then(() => {
        // Show a message confirming that the color has been changed
        vscode.window.showInformationMessage('Comment color updated to green');
      });
  });

  context.subscriptions.push(disposable);
}

module.exports = {
  activateCommentColor,
};
