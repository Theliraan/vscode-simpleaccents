// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as staticStorage from './staticStorage';

/**
 * Recursive symbol replacer
 * @param text Source text to accentuate
 * @param accentuate Apply or remove accents
 * @param index Current replace symbol index
 * @returns Source text with replaced symbols
 */
function accentuateText(text: string, replaceArray: Array<[string, string]>, accentuate: boolean = true, index: number = 0) : string {
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
async function accentuateSelected(accentuate: boolean = true) {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const selection = editor.selection;
	if (selection.isEmpty) {
		return;
	}

	const replaceArray: Array<[string, string]> = vscode.workspace.getConfiguration().get(staticStorage.settingsKey, staticStorage.symbols);
	const accentuatedText = accentuateText(editor.document.getText(selection), replaceArray, accentuate);
	await editor.edit(edit => edit.replace(selection, accentuatedText));

	console.log('simpleaccents: accentuated, direction: ' + accentuate);
}

/**
 * Restore default json settings
 */
function restoreDefaultSettings() : void {
	vscode.workspace.getConfiguration().update(staticStorage.settingsKey, staticStorage.symbols);
	console.log('simpleaccents: default settings restored');
}

/**
 * Entry point
 * @param context VSCode context object
 */
export function activate(context: vscode.ExtensionContext) {
	const accentuateCommand = vscode.commands.registerCommand('simpleaccents.accentuate', async () => {
		await accentuateSelected(true);
	});

	const deaccentuateCommand = vscode.commands.registerCommand('simpleaccents.deaccentuate', async () => {
		await accentuateSelected(false);
	});

	const restoreDefaultSettingsCommand = vscode.commands.registerCommand('simpleaccents.restoreDefaultSettings', () => {
		restoreDefaultSettings();
	});
	
	context.subscriptions.push(accentuateCommand, deaccentuateCommand, restoreDefaultSettingsCommand);
	console.log('simpleaccents: initialized');
}

/**
 * Exit point
 */
export function deactivate() {}
