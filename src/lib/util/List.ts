export class List<V> extends Set<V> {
    private _array: V[] | null;
    public static readonly default: typeof List = List;
    public constructor(iterable?: readonly V[]) {
        super(iterable);

        Object.defineProperty(this, '_array', { value: null, writable: true, configurable: true });
    }

    public add(value: V): this {
        this._array = null;
        return super.add(value);
    }

    public delete(value: V): boolean {
        this._array = null;
        return super.delete(value);
    }

    public array(): V[] {
        if (!this._array || this._array.length !== this.size) this._array = [...this.values()];
        return this._array;
    }

    public first(): V | undefined;
    public first(amount: number): V[];
    public first(amount?: number): V | V[] | undefined {
        if (typeof amount === 'undefined') return this.values().next().value;
        if (amount < 0) return this.last(amount * -1);
        amount = Math.min(this.size, amount);
        const iter = this.values();
        return Array.from({ length: amount }, (): V => iter.next().value);
    }

    public last(): V | undefined;
    public last(amount: number): V[];
    public last(amount?: number): V | V[] | undefined {
        const arr = this.array();
        if (typeof amount === 'undefined') return arr[arr.length - 1];
        if (amount < 0) return this.first(amount * -1);
        if (!amount) return [];
        return arr.slice(-amount);
    }

    public random(): V;
    public random(amount: number): V[];
    public random(amount?: number): V | V[] | undefined {
        let arr = this.array();
        if (typeof amount === 'undefined') return arr[Math.floor(Math.random() * arr.length)];
        if (arr.length === 0 || !amount) return [];
        arr = arr.slice();
        return Array.from({ length: amount }, (): V => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }

    public find(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): V | undefined {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        for (const [val1, val2] of this.entries()) {
            if (fn(val1, val2, this)) return val1;
        }
        return undefined;
    }

    public filter(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): List<V> {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        // @ts-ignore
        const results = new this.constructor[Symbol.species]();
        for (const [val1, val2] of this.entries()) {
            if (fn(val1, val2, this)) results.add(val1);
        }
        return results;
    }

    public partition(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): [List<V>, List<V>] {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        // @ts-ignore
        const results: [List<V>, List<V>] = [new this.constructor[Symbol.species](), new this.constructor[Symbol.species]()];
        for (const [val1, val2] of this.entries()) {
            if (fn(val1, val2, this)) {
                results[0].add(val1);
            } else {
                results[1].add(val1);
            }
        }
        return results;
    }

    public map<T>(fn: (val1: V, val2: V, list: this) => T, thisArg?: any): T[] {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        const iter = this.entries();
        return Array.from({ length: this.size }, (): T => {
            const [val1, val2] = iter.next().value;
            return fn(val1, val2, this);
        });
    }

    public some(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): boolean {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        for (const [val1, val2] of this.entries()) {
            if (fn(val1, val2, this)) return true;
        }
        return false;
    }

    public every(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): boolean {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        for (const [val1, val2] of this.entries()) {
            if (!fn(val1, val2, this)) return false;
        }
        return true;
    }

    public reduce<T>(fn: (accumulator: any, val1: V, val2: V, list: this) => T, initialValue?: T): T {
        let accumulator!: T;
        if (typeof initialValue !== 'undefined') {
            accumulator = initialValue;
            for (const [val1, val2] of this.entries()) accumulator = fn(accumulator, val1, val2, this);
            return accumulator;
        }
        let first = true;
        for (const [val1, val2] of this.entries()) {
            if (first) {
                accumulator = val1 as unknown as T;
                first = false;
                continue;
            }
            accumulator = fn(accumulator, val1, val2, this);
        }

        if (first) {
            throw new TypeError('Reduce of empty list with no initial value');
        }
        return accumulator;
    }

    public each(fn: (val1: V, val2: V, list: Set<V>) => any, thisArg?: any): this {
        this.forEach(fn, thisArg);
        return this;
    }

    public tap(fn: (list: this) => any, thisArg?: any): this {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        fn(this);
        return this;
    }

    public clone(): List<V> {
        // @ts-ignore
        return new this.constructor[Symbol.species](this);
    }

    public concat(...lists: List<V>[]): List<V> {
        const newList = this.clone();
        for (const list of lists) {
            for (const value of this.values()) newList.add(value);
        }
        return newList;
    }

    public equals(list: List<V>): boolean {
        if (!list) return false;
        if (this === list) return true;
        if (this.size !== list.size) return false;
        for (const val of this.values()) {
            if (!list.has(val)) return false;
        }
        return true;
    }

    public sort(compareFunction: (firstValue: V, secondValue: V, firstValue2: V, secondValue2: V) => number = (x, y): number => Number(x > y) || Number(x === y) - 1): this {
        const entries = [...this.entries()];
        entries.sort((a, b): number => compareFunction(a[1], b[1], a[0], b[0]));
        this.clear();
        for (const val of this.values()) {
            this.add(val);
        }
        return this;
    }
}