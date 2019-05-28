import { Possible } from './Possible'

/**
 * Represents a usage Tag.
 */
export class Tag { 
    public required: number;
    public possibles: Possible[];
    public response: string;
    public repeat: boolean;
    /**
     * @param {string} members The tag contents to parse
     * @param {number} count The position of the tag in the usage string
     * @param {number} required The type of the tag (0 optional, 1 semi-required, 2 required)
     */
    public constructor(members: string, count: number, required: number) {
        /**
         * The type of this tag
         * @type {number}
         */
        this.required = required;

        /**
         * If this tag is repeating
         * @type {boolean}
         */
        this.repeat = false;
    }

    /**
     * Registers a response.
     * @param {string} name The argument name the response is for
     * @param {(string | Function)} response The custom response
     * @returns {boolean}
     * @private
     */
    private register(name: string, response: string | Function): boolean {
        if (this.response) return false;
        if (this.possibles.some((val): boolean => val.name === name)) {
            this.response = response as string;
            return true;
        }
        return false;
    }

    private static parseMembers(members: string, count: number): Possible[] {
        const literals = [];
        const types = [];
    }
}