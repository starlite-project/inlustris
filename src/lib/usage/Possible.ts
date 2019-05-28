const regexTypes: string[] = ['reg', 'regex', 'regexp'];

/**
 * Represents a possibility in a usage Tag.
 */
export class Possible {
    public name: string;
    public type: string;
    public min?: number;
    public max?: number;
    public regex?: RegExp;
    /**
     * @param {string[]} regexResults The regex results from parsing the tag member
     */
    public constructor([match, name, type = 'literal', min, max, regex, flags]: [string, string, string, string, string, string, string]) {
        /**
         * The name of this possible
         * @type {string}
         */
        this.name = name;

        /**
         * The type of this possible
         * @type {string}
         */
        this.type = type.toLowerCase();

        /**
         * The min of this possible
         * @type {?number}
         */
        this.min = min ? (this.constructor as typeof Possible).resolveLimit(min, 'min') : undefined;

        /**
         * The max of this possible
         * @type {?number}
         */
        this.max = max ? (this.constructor as typeof Possible).resolveLimit(max, 'max') : undefined;

        /**
         * The regex of this possible
         * @type {?RegExp}
         */
        this.regex = regexTypes.includes(this.type) && regex ? new RegExp(regex, flags) : undefined;

        if (regexTypes.includes(this.type) && !this.regex) throw 'Regex types must include a regular expression.';
    }

    /**
     * Resolves a limit.
     * @param {string} limit The limit to evaluate
     * @param {string} limitType The type of limit
     * @returns {number}
     * @private
     */
    private static resolveLimit(limit: string, limitType: string): number {
        if (isNaN(limit as unknown as number)) throw `${limitType} must be a number`;
        return Number.parseFloat(limit);
    }
}