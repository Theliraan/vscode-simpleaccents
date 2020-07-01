# Simple Accents for VSCode

Simple accent applier for technical writers and artistic text creators.

## Features

Allows to apply and remove accents on symbols.

## Install

* Open **VSCode**
* Press **Ctrl+Shift+X** to open **Extensions** tab
* Find **Simple Accents** in marketplace
* Press **Install**

## Usage

* Select text block or single symbol to accentuate
* Press **Ctrl+Alt+A** to apply accents
* Press **Ctrl+Alt+D** to remove accents

![Usage example](https://user-images.githubusercontent.com/3195612/86149811-25b3ea80-bb05-11ea-86d5-4f2dabda7eef.gif)

## Extension Settings

Replace symbols can be customized:

* `simpleaccents.symbolsToReplace`: array of string pairs with source-target replace symbols
    ```json
    "simpleaccents.symbolsToReplace": [
        
        [ "-", "—" ],
        [ "\"", "«»" ],

        [ "A", "Á" ],
        [ "a", "á" ],
        [ "E", "É" ],
        [ "e", "é" ],
        [ "I", "Í" ],
        [ "i", "í" ],
        [ "O", "Ó" ],
        [ "o", "ó" ],
        [ "U", "Ú" ],
        [ "u", "ú" ],
        [ "Y", "Ý" ],
        [ "y", "ý" ]
    ]
    ```

## Known Issues

* No open/close quotes auto detect
* No umlaut or other special accents support via extended replace list. Example: ``` [ "a", "á", "ä", "â", ... ] ```

## Release notes

### 1.0.0

Initial release of simpleaccents in Visual Studio Code marketplace