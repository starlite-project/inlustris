// Copyright (c) 2017-2019 Dirigeants. All rights reserved. MIT License.

// @ts-ignore
const { getPromiseDetails } = process.binding('util');

/**
 * The class for deep checking types.
 */
class Type {
    public value: any;

    public is: string;

    private parent: null | Type;

    private childKeys: Map<string, Type>;

    private childValues: Map<string, Type>;

    public constructor(value: any, parent: Type | null = null) {
        this.value = value;

        this.is = (this.constructor as typeof Type).resolve(value);

        this.parent = parent;

        this.childKeys = new Map();

        this.childValues = new Map();
    }

    public get childTypes(): string {
        if (!this.childValues.size) return '';
        return `<${(this.childKeys.size ? `${(this.constructor as typeof Type).list(this.childKeys)}, ` : '') + (this.constructor as typeof Type).list(this.childValues)}>`;
    }

    public toString(): string {
        this.check();
        return this.is + this.childTypes;
    }

    private *parents(): IterableIterator<Type> {
        let current: any = this;
        // eslint-disable-next-line no-cond-assign
        while (current = current.parent) yield current;
    }

    private addValue(value: any): void {
        const child = new (this.constructor as typeof Type)(value, this);
        this.childValues.set(child.is, child);
    }

    private addEntry([key, value]: [string, any]): void {
        const child = new (this.constructor as typeof Type)(key, this);
        this.childKeys.set(child.is, child);
        this.addValue(value);
    }

    private check(): void {
        if (Object.isFrozen(this)) return;
        const promise = getPromiseDetails(this.value);
        if (typeof this.value === 'object' && this.isCircular()) this.is = `[Circular:${this.is}]`;
        else if (promise && promise[0]) this.addValue(promise[1]);
        else if (this.value instanceof Map) for (const entry of this.value) this.addEntry(entry);
        else if (Array.isArray(this.value) || this.value instanceof Set) for (const value of this.value) this.addValue(value);
        else if (this.is === 'Object') this.is = 'any';
        Object.freeze(this);
    }

    private isCircular(): boolean {
        for (const parent of this.parents()) if (parent.value === this.value) return true;
        return false;
    }

    public static resolve(value: any): string {
        const type = typeof value;
        switch (type) {
            case 'object': return value === null ? 'null' : value.constructor ? value.constructor.name : 'any';
            case 'function': return `${value.constructor.name}(${value.length}-arity)`;
            case 'undefined': return 'void';
            default: return type;
        }
    }

    private static list(values: Map<string, Type>): string {
        return values.has('any') ? 'any' : [...values.values()].sort().join(' | ');
    }
}
