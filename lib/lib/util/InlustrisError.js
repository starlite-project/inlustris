"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Messages = {
    PLUGIN_NOT_FOUND: (key) => `The plugin ${key} was not found`,
    DEPRECATED_METHOD: (oldMethod, newMethod) => `The method ${oldMethod} is deprecated${newMethod ? `, please use the ${newMethod} method instead` : ''}`,
    FAILED_TO_LOAD: (plugin, e) => `The plugin ${plugin} failed to load\n${e}`,
    INCORRECT_INPUT_TYPE: (given, expected) => `Expected ${expected}, got ${given}`
};
/**
 * An error class used to make error throwing universal.
 * @extends {Error}
 */
class InlustrisError extends Error {
    constructor(key, ...args) {
        if (Messages[key] == null)
            throw new TypeError(`Error key '${key}' does not exist`);
        const message = typeof Messages[key] === 'function'
            ? Messages[key](...args)
            : Messages[key];
        super(message);
    }
    get name() {
        return `InlustrisError [${this.code}]`;
    }
}
exports.InlustrisError = InlustrisError;
