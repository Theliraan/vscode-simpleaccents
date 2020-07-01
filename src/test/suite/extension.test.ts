import * as assert from 'assert';
import * as vscode from 'vscode';
import * as staticStorage from '../../staticStorage'

async function execute(command: string, input: string, expected: string) {
	const uri = vscode.Uri.parse('untitled:' + command);
	const document = await vscode.workspace.openTextDocument(uri);
	const editor = await vscode.window.showTextDocument(document, 1, true);
	const editSuccess = await editor.edit(edit => edit.insert(new vscode.Position(0, 0), input));
	assert.ok(editSuccess, 'Edit failed');
	
	await vscode.commands.executeCommand('editor.action.selectAll');
	await vscode.commands.executeCommand(command);
	assert.equal(editor.document.getText(), expected);

	await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
}

suite('Simple Accents Test Suite', () => {
	vscode.window.showInformationMessage('Start tests.');

	test('Default settings test', () => {
		const symbols = staticStorage.symbols;
		assert.ok(symbols, 'Default replace symbols array is broken');
		assert.notEqual(symbols.length, 0, 'Default replace symbols array is empty');

		symbols.forEach(replaceElement => {
			assert.notEqual(replaceElement.length, 0, 'Replace symbols line is invalid: ' + replaceElement.join(', '));
			assert.notEqual(replaceElement.length, 1, 'Replace symbols line is invalid: ' + replaceElement.join(', '));
		});
	});

	const unmodifiedSymbols = 'БВГДЖЗКЛМНПРСТФХЦЧШЩ BCDFGHJKLMNPQRSTVWXZ';
	const sourceSymbols = 'АаЕеИиОоУуЫыЭэЮюЯя AaEeIiOoUuYy -\"';
	const targetSymbols = 'А́а́Е́е́И́и́О́о́У́у́Ы́ы́Э́э́Ю́ю́Я́я́ ÁáÉéÍíÓóÚúÝý —«»';

	test('Accentuation test', async () => {
		await execute(
			'simpleaccents.accentuate', 
			unmodifiedSymbols + sourceSymbols, 
			unmodifiedSymbols + targetSymbols
		);
	});

	test('Deaccentuation test', async () => {
		await execute(
			'simpleaccents.deaccentuate', 
			unmodifiedSymbols + targetSymbols, 
			unmodifiedSymbols + sourceSymbols
		);
	});
});