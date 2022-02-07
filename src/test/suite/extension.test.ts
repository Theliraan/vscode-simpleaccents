import * as assert from 'assert';
import { Uri, workspace, window, Position, commands } from 'vscode';
import * as staticStorage from '../../staticStorage';

async function execute(command: string, input: string, expected: string) {
	const uri = Uri.parse('untitled:' + command);
	const document = await workspace.openTextDocument(uri);
	const editor = await window.showTextDocument(document, 1, true);
	const editSuccess = await editor.edit((edit: { insert: (arg0: any, arg1: string) => any; }) => edit.insert(new Position(0, 0), input));
	assert.ok(editSuccess, 'Edit failed');
	
	await commands.executeCommand('editor.action.selectAll');
	await commands.executeCommand(command);
	assert.strictEqual(editor.document.getText(), expected);

	await commands.executeCommand('workbench.action.closeActiveEditor');
}

/* suite('Simple Accents Test Suite', () => {
	window.showInformationMessage('Start tests.');
	test('Default settings test', () => {
		const symbols = staticStorage.symbolCycles;
		assert.ok(symbols, 'Default replace symbols array is broken');
		assert.notStrictEqual(symbols.length, 0, 'Default replace symbols array is empty');
		symbols.forEach(replaceElement => {
			assert.notStrictEqual(replaceElement.length, 0, 'Replace symbols line is invalid: ' + replaceElement.join(', '));
			assert.notStrictEqual(replaceElement.length, 1, 'Replace symbols line is invalid: ' + replaceElement.join(', '));
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
}); */