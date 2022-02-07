export const settingsKey: string = "simpleaccents.symbolsToReplace";

export type Replacer = { source: string; target: string };

/** Cycle.cycle can be a string if all replacements
 * are single characters (e.g. a to á), but must be
 * an array if any of the replacers are multiple
 * characters (e.g. - to -- )
 */
export type Cycle = {
    key: string;
    cycle:  string | Array<string>;
};
export const symbolCycles: Array<Cycle> = [
    // latin lower
    { key: "a", cycle:  "áàāâãäåą" },
    { key: "b", cycle:  "ßƀƃƅ" },
    { key: "c", cycle:  "çćċč" },
    { key: "d", cycle:  "ďđ" },
    { key: "e", cycle:  "èéêëēĕėęěȅȇȩə" },
    { key: "g", cycle:  "ĝğġģǥǧ" },
    { key: "h", cycle:  "ĥħ" },
    { key: "i", cycle:  "ìíîïĩīĭįı" },
    { key: "j", cycle:  "ĵɉ" },
    { key: "k", cycle:  "ķĸ" },
    { key: "l", cycle:  "ĺļľŀł" },
    { key: "n", cycle:  "ñńņňŉŋ" },
    { key: "o", cycle:  "óòðôõöøōŏő" },
    { key: "r", cycle:  "ŕŗř" },
    { key: "s", cycle:  "ßśŝşšƨȿ" },
    { key: "t", cycle:  "ţťŧƫƭ" },
    { key: "u", cycle:  "ùúûüũūŭůűų" },
    { key: "w", cycle:  "ŵ" },
    { key: "y", cycle:  "ŷ" },
    { key: "z", cycle:  "źżžȥɀ" },
    { key: "dz", cycle:  "ǳǆ" },
    { key: "Dz", cycle:  "ǲǅ" },
    { key: "ae", cycle:  "æǽǣ" },

	// latin upper
    { key: "A", cycle:  "ÁÀĀÂÃÄÅĄ" },
    { key: "B", cycle:  "SSɃƂƄ" },
    { key: "C", cycle:  "ÇĆĊČ" },
    { key: "D", cycle:  "ĎĐ" },
    { key: "E", cycle:  "ÈÉÊËĒĔĖĘĚȄȆȨƏ" },
    { key: "G", cycle:  "ĜĞĠĢǤǦ" },
    { key: "H", cycle:  "ĤĦ" },
    { key: "I", cycle:  "ÌÍÎÏĨĪĬĮI" },
    { key: "J", cycle:  "ĴɈ" },
    { key: "K", cycle:  "Ķĸ" },
    { key: "L", cycle:  "ĹĻĽĿŁ" },
    { key: "N", cycle:  "ÑŃŅŇNŊ" },
    { key: "O", cycle:  "ÓÒÐÔÕÖØŌŎŐ" },
    { key: "R", cycle:  "ŔŖŘ" },
    { key: "S", cycle:  "SSŚŜŞŠƧⱾ" },
    { key: "T", cycle:  "ŢŤŦƫƬ" },
    { key: "U", cycle:  "ÙÚÛÜŨŪŬŮŰŲ" },
    { key: "W", cycle:  "Ŵ" },
    { key: "Y", cycle:  "Ŷ" },
    { key: "Z", cycle:  "ŹŻŽȤⱿ" },
    { key: "DZ", cycle:  "ǱǄ" },
    { key: "AE", cycle:  "ÆǼǢ" },	

    // cyrillic lower
    { key: "А", cycle:  [ "А́" ] },
    { key: "Е", cycle:  [ "Е́" ] },
    { key: "И", cycle:  [ "И́" ] },
    { key: "О", cycle:  [ "О́" ] },
    { key: "У", cycle:  [ "У́" ] },
    { key: "Ы", cycle:  [ "Ы́" ] },
    { key: "Э", cycle:  [ "Э́" ] },
    { key: "Ю", cycle:  [ "Ю́" ] },
    { key: "Я", cycle:  [ "Я́" ] },

    // cyrillic upper
    { key: "а", cycle:  [ "а́" ] },
    { key: "е", cycle:  [ "е́" ] },
    { key: "и", cycle:  [ "и́" ] },
    { key: "о", cycle:  [ "о́" ] },
    { key: "у", cycle:  [ "у́" ] },
    { key: "ы", cycle:  [ "ы́" ] },
    { key: "э", cycle:  [ "э́" ] },
    { key: "ю", cycle:  [ "ю́" ] },
    { key: "я", cycle:  [ "я́" ] },

    // special
	{ key: "--", cycle:  [ "–", "—" ] },
	{ key: "-", cycle:  [ "‒", "–", "—" ] }
];
