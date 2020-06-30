// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as defaultReplace from './defaultReplace';

const settingsKey: string = 'simpleaccents.symbolsToReplace';

/**
 * Recursive symbol replacer
 * @param text Source text to accentuate
 * @param accentuate Apply or remove accents
 * @param index Current replace symbol index
 * @returns Source text with replaced symbols
 */
function accentuateText(text: string, replaceArray: Array<[string, string]>, accentuate: boolean = true, index: number = 0) : string
{
	if (index > replaceArray.length - 1) {
		return text;
	}

	const replaceTuple = replaceArray[index];
	return accentuate
		? accentuateText(text, replaceArray, accentuate, index + 1).split(replaceTuple[0]).join(replaceTuple[1])
		: accentuateText(text, replaceArray, accentuate, index + 1).split(replaceTuple[1]).join(replaceTuple[0]);
}

/**
 * Apply or remove accents on selected text
 * @param accentuate Apply or remove accents
 */
function accentuateSelected(accentuate: boolean = true) : void
{
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const selection = editor.selection;
	if (selection.isEmpty) {
		return;
	}

	const replaceArray: Array<[string, string]> = vscode.workspace.getConfiguration().get(settingsKey, defaultReplace.symbols);
	const newText = accentuateText(editor.document.getText(selection), replaceArray, accentuate);
	editor.edit(function (editBuilder) {
		editBuilder.replace(selection, newText);
	});
}

/**
 * Entry point
 * @param context VSCode context object
 */
export function activate(context: vscode.ExtensionContext) {
	if (!vscode.workspace.getConfiguration().has(settingsKey)) {
		vscode.workspace.getConfiguration().update(settingsKey, defaultReplace.symbols);
		console.log('simpleaccents: settings updated');
	}

	const accentuateCommand = vscode.commands.registerCommand('simpleaccents.accentuate', () => {
		accentuateSelected(true);
		console.log('simpleaccents: applied');
	});

	const deaccentuateCommand = vscode.commands.registerCommand('simpleaccents.deaccentuate', () => {
		accentuateSelected(false);
		console.log('simpleaccents: removed');
	});
	
	context.subscriptions.push(accentuateCommand);
	context.subscriptions.push(deaccentuateCommand);

	console.log('simpleaccents: initialized');
}

/**
 * Exit point
 */
export function deactivate() {}
