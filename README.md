# Simple Accents for VSCode

Simple accent applier for technical writers and artistic text creators.

## Thanks to contributors

* [Graham Charles](https://github.com/grahampcharles): Variable accent type through the cycle

## Features

* Allows to apply, variate and remove symbol accents.

## Install

* Open **VSCode**
* Press **Ctrl+Shift+X** to open **Extensions** tab
* Find **Simple Accents** in marketplace
* Press **Install**

## Usage

* Select text block or single symbol to accentuate
* Press **Ctrl+Alt+A** to apply accents
* Continue to press **Ctrl+Alt+A** to cycle through available modified forms of each letter.
* Press **Ctrl+Alt+D** to remove accents

![Usage example](https://user-images.githubusercontent.com/3195612/86149811-25b3ea80-bb05-11ea-86d5-4f2dabda7eef.gif)

## Settings

Replace symbols can be customized:

* `simpleaccents.symbolCycles`: Array of cycle objects pairing a key (the replacement source) with any number of target symbols. (To use multi-character replacement symbols, provide an array of strings for the cycle property.)
    ```json
    "simpleaccents.symbolCycles": 
    [   { "key": "a", "cycle":  "áàāâãäåą" },
        { "key": "b", "cycle":  "ßƀƃƅ" },
        { "key": "c", "cycle":  "çćċč" },
        { "key": "d", "cycle":  "ďđ" },
        { "key": "e", "cycle":  "èéêëēĕėęěȅȇȩə" },
        { "key": "g", "cycle":  "ĝğġģǥǧ" },
        { "key": "--", "cycle":  [ "–", "—" ] },
    ]
    ```

## Known Issues and TODO

* No open/close quotes auto detect
* No extension icon

## Release notes

### 1.0.0

Initial release of simpleaccents in Visual Studio Code marketplace