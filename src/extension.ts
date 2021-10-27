// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as staticStorage from "./staticStorage";
import { Cycle, Replacer } from "./staticStorage";

let replaceArray: Array<Replacer>;

/**
 * Recursive symbol replacer
 * @param text Source text to accentuate
 * @param accentuate Apply or remove accents
 * @param index Current replace symbol index
 * @returns Source text with replaced symbols
 */
function accentuateText(
    text: string,
    replaceArray: Array<Replacer>,
    accentuate: boolean = true,
    index: number = 0
): string {
    if (index > replaceArray.length - 1) {
        return text;
    }

    const replacer = replaceArray[index];
    return accentuateText(text, replaceArray, accentuate, index + 1)
        .split(accentuate ? replacer.source : replacer.target)
        .join(accentuate ? replacer.target : replacer.source);
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

// DEBUG for testing without restarting
loadReplacementArray();

    const accentuatedText = accentuateText(
        editor.document.getText(selection),
        replaceArray,
        accentuate
    );
    await editor.edit((edit) => edit.replace(selection, accentuatedText));

    console.log("simpleaccents: accentuated, direction: " + accentuate);
}

/**
 * Restore default json settings
 */
function restoreDefaultSettings(): void {
    vscode.workspace
        .getConfiguration()
        .update(staticStorage.settingsKey, staticStorage.symbols);
    console.log("simpleaccents: default settings restored");
}

/**
 * Entry point
 * @param context VSCode context object
 */
export function activate(context: vscode.ExtensionContext) {
    loadReplacementArray();

    const accentuateCommand = vscode.commands.registerCommand(
        "simpleaccents.accentuate",
        async () => {
            await accentuateSelected(true);
        }
    );

    const deaccentuateCommand = vscode.commands.registerCommand(
        "simpleaccents.deaccentuate",
        async () => {
            await accentuateSelected(false);
        }
    );

    const restoreDefaultSettingsCommand = vscode.commands.registerCommand(
        "simpleaccents.restoreDefaultSettings",
        () => {
            restoreDefaultSettings();
        }
    );

    context.subscriptions.push(
        accentuateCommand,
        deaccentuateCommand,
        restoreDefaultSettingsCommand
    );
    console.log("simpleaccents: initialized");
}

/**
 * Loads the replacement array
 * @param 
 * @returns void
 */

function loadReplacementArray(): void {
	replaceArray = convertCycleToReplacer(
        vscode.workspace
            .getConfiguration()
            .get(staticStorage.settingsKey, staticStorage.symbolCycles)
    );
}
/**
 * Converter of cycle array to replacer array
 * @param Array<Cycle> Array of cycles
 * @returns Array<Replacer> Array of replacer tuples
 */
function convertCycleToReplacer(cycles: Cycle[]): Replacer[] {
    return cycles.flatMap((cycle) => {
        
		// expand string of symbols into array
		if (typeof (cycle.cycle) === "string") {
			cycle.cycle = cycle.cycle.split("");
		}
		
		return [
            { source: cycle.key, target: cycle.cycle[0] } as Replacer,
        ].concat(
            cycle.cycle.map((value: string, index: number, array: string[]) => {
                return {
                    source: value,
                    target: array[index + 1] || cycle.key,
                } as Replacer;
            })
        );
    });
}
/**
 * Exit point
 */
export function deactivate() {}
