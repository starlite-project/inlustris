const Messages = {
    PLUGIN_NOT_FOUND: (key: string): string => `The plugin ${key} was not found`,
    DEPRECATED_METHOD: (oldMethod: string, newMethod?: string): string => `The method ${oldMethod} is deprecated${newMethod ? `, please use the ${newMethod} method instead` : ''}`,
    FAILED_TO_LOAD: (plugin: string, e: any): string => `The plugin ${plugin} failed to load\n${e}`,
    INCORRECT_INPUT_TYPE: (given: string, expected: string): string => `Expected ${expected}, got ${given}`
};

/**
 * An error class used to make error throwing universal.
 * @extends {Error}
 */
export class InlustrisError extends Error {
    private code: string;
    public constructor(key: string, ...args: string[]) {
        if (Messages[key] == null) throw new TypeError(`Error key '${key}' does not exist`);
        const message: string = typeof Messages[key] === 'function'
            ? Messages[key](...args)
            : Messages[key];
        super(message);
    }

    public get name(): string {
        return `InlustrisError [${this.code}]`;
    }
}