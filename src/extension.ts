// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as Util from './utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "task-mark-in-markdown" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('task-mark-in-markdown.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		const document = Util.getActiveTextEditorEdit();
		const cursorPos = Util.getCursorPosition();
		const curLine = Util.getLine(document, cursorPos);
		const editor = vscode.window.activeTextEditor;
		if (editor == undefined) {
			return;
		}

		/* 
		try to find '**TODO**' or '【done】' in line
		if find nothing, then add '**TODO**'
		if find '**TODO**' then change it to '【done】'
		if find '【done】' then remove it.
		*/
		const linePosition = cursorPos.line;
		const TODO_MARK = "**TODO**";
		const DONE_MARK = "【done】";
		const indexOfTODO = curLine.indexOf(TODO_MARK);
		const indexOfDONE = curLine.indexOf(DONE_MARK);
		if (indexOfTODO > 0) {
			// console.log("todo -> done");
			const begin = new vscode.Position(linePosition, indexOfTODO);
			const end = new vscode.Position(linePosition, indexOfTODO + 8);
			const range = new vscode.Range(begin, end);
			editor.edit(editBuilder => {
				editBuilder.replace(range, DONE_MARK);
			});

		} else if (indexOfDONE > 0) {
			// console.log("done -> ");
			const begin = new vscode.Position(linePosition, indexOfDONE);
			const end = new vscode.Position(linePosition, indexOfDONE + 7);
			const range = new vscode.Range(begin, end);
			editor.edit(editBuilder => {
				editBuilder.replace(range, "");
			});
		} else {
			// console.log("  -> todo");
			const idx = curLine.indexOf("* ");
			if (idx >= 0) {
				const begin = new vscode.Position(linePosition, idx + 1);
				editor.edit(editBuilder => {
					editBuilder.insert(begin, " " + TODO_MARK);
				});
			}

			// return curLine.replace("* ", "* **TODO** ");
		}
		// vscode.Range statusRange = new vscode.Range()

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from Task mark in markdown!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
