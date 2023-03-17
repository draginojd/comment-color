// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
	function activate(context) {
		console.log('Congratulations, your extension "comment-color" is now active!');
	  
		const decorationTypes = [
		  { color: 'rgba(255, 0, 0, 0.4)', pattern: /TODO:/ },
		  { color: 'rgba(0, 255, 0, 0.4)', pattern: /FIXME:/ },
		  { color: 'rgba(0, 0, 255, 0.4)', pattern: /NOTE:/ },
		];
	  
		decorationTypes.forEach(decorationType => {
		  const decoration = vscode.window.createTextEditorDecorationType({
			backgroundColor: decorationType.color,
		  });
	  
		  vscode.window.onDidChangeActiveTextEditor(editor => {
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
	  
	  
	/**
 * This method is called when your extension is deactivated
 */
function deactivate() {}

module.exports = {
  activate,
  deactivate
}