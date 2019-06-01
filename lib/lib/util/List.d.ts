/**
 * A Set with additional utility methods.
 * @extends {Set}
 */
export declare class List<V> extends Set<V> {
    private _array;
    static readonly default: typeof List;
    constructor(iterable?: readonly V[]);
    add(value: V): this;
    delete(value: V): boolean;
    /**
     * Creates an ordered array of the values of this list, and caches it internally. The array will only be
     * reconstructed if an item is added to or removed from the list, or if you change the length of the array
     * itself. If you don't want this caching behavoir, use `[...list.values()]` or
     * `Array.from(list.values())` instead.
     * @returns {Array}
     */
    array(): V[];
    /**
     * Obtains the first value(s) in this list.
     * @param {number} [amount] Amount of values to obtain from the beginning
     * @returns {*|Array<*>} A single value if no amount is provided or an array of values, starting from the end if
     * amount is negative
     */
    first(): V | undefined;
    first(amount: number): V[];
    /**
     * Obtains the last value(s) in this list. This relies on {@link List#array}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [amount] Amount of values to obtain from the end
     * @returns {*|Array<*>} A single value if no amount is provided or an array of values, starting from the start if
     * amount is negative
     */
    last(): V | undefined;
    last(amount: number): V[];
    /**
     * Obtains unique random value(s) from this list. This relies on {@link List#array}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [amount] Amount of values to obtain randomly
     * @returns {*|Array<*>} A single value if no amount is provided or an array of values
     */
    random(): V;
    random(amount: number): V[];
    /**
     * Searches for a single item where the given function returns a truthy value. This behaves like
     * [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
     * @param {Function} fn The function to test with (should return boolean)
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {*}
     * @example list.find(user => user.username === 'Bob');
     */
    find(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): V | undefined;
    /**
     * Removes entries that satisfy the provided filter function.
     * @param {Function} fn Function used to test (should return a boolean)
     * @param {*} [thisArg] Value used as `this` when executing function
     * @returns {number} The number of removed entries
     */
    sweep(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): number;
    /**
     * Identical to
     * [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
     * but returns a {@link List} instead of an Array.
     * @param {Function} fn The function used to test with (should return boolean)
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {List}
     * @example list.filter(user => user.username === 'Bob');
     */
    filter(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): List<V>;
    /**
     * Partitions the list into two lists where the first list
     * contains the items that passed and the second contains the items that failed.
     * @param {Function} fn Function used to test (should return a boolean)
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {List[]}
     * @example const [big, small] = list.partition(guild => guild.memberCount > 250);
     */
    partition(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): [List<V>, List<V>];
    /**
     * Maps each item to another value into an array. Identical in behavior to
     * [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
     * @param {Function} fn Function that produces an element of the new array, taking three arguments
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {Array}
     * @example list.map(user => user.tag);
     */
    map<T>(fn: (val1: V, val2: V, list: this) => T, thisArg?: any): T[];
    /**
     * Maps each item to another into a list. Identical in behavior to
     * [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
     * @param {Function} fn Function that produces an element of the new list, taking three arguments
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {List}
     * @example list.mapValues(user => user.tag);
     */
    mapValues<T>(fn: (val1: V, val2: V, list: this) => T, thisArg?: any): List<T>;
    /**
     * Checks if there exists an item that passes a test. Identical in behavior to
     * [Array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).
     * @param {Function} fn Function used to test (should return a boolean)
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {boolean}
     * @example list.some(user => user.discriminator === '0000');
     */
    some(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): boolean;
    /**
     * Checks if all items pass a test. Identical in behavior to
     * [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every).
     * @param {Function} fn Function used to test (should return a boolean)
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {boolean}
     * @example list.every(user => !user.bot);
     */
    every(fn: (val1: V, val2: V, list: this) => boolean, thisArg?: any): boolean;
    /**
     * Applies a function to produce a single value. Identical in behavior to
     * [Array.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).
     * @param {Function} fn Function used to reduce, taking four arguments; `accumulator`, `currentValue`, `currentValue`,
     * and `list`
     * @param {*} [initialValue] Starting value for the accumulator
     * @returns {*}
     * @example list.reduce((acc, guild) => acc + guild.memberCount, 0);
     */
    reduce<T>(fn: (accumulator: any, val1: V, val2: V, list: this) => T, initialValue?: T): T;
    /**
     * Identical to
     * [Set.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach),
     * but returns the list instead of undefined.
     * @param {Function} fn Function to execute for each element
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {List}
     * @example
     * list
     *  .each(user => console.log(user.username))
     *  .filter(user => user.bot)
     *  .each(user => console.log(user.username));
     */
    each(fn: (val1: V, val2: V, list: Set<V>) => any, thisArg?: any): this;
    /**
     * Runs a function on the list and returns the list.
     * @param {Function} fn Function to execute
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {List}
     * @example
     * list
     *  .tap(list => console.log(list.size))
     *  .filter(user => user.bot)
     *  .tap(list => console.log(list.size));
     */
    tap(fn: (list: this) => any, thisArg?: any): this;
    /**
     * Creates an identical shallow copy of this list.
     * @returns {List}
     * @example const newList = someList.clone();
     */
    clone(): List<V>;
    /**
     * Combines this list with others into a new list. None of the source lists are modified.
     * @param {...List} lists Lists to merge
     * @returns {List}
     * @example const newList = someList.concat(someOtherList, anotherList, ohBoyAList);
     */
    concat(...lists: List<V>[]): List<V>;
    /**
     * Checks if this list shares identical value-value parings with another.
     * This is different to checking for equality using equal-signs, because
     * the collections may be different objects, but contain the same data.
     * @param {List} list List to compare with
     * @returns {boolean} Whether the collections have identical contents
     */
    equals(list: List<V>): boolean;
    /**
     * The sort() method sorts the elements of a list and returns it.
     * The sort is not necessarily stable. The default sort order is according to string Unicode points.
     * @param {Function} [compareFunction] Specifies a function that defines the sort order.
     * If omitted, the list is sorted according to each character's Unicode point value,
     * according to the string conversion of each element.
     * @returns {List}
     */
    sort(compareFunction?: (firstValue: V, secondValue: V, firstValue2: V, secondValue2: V) => number): this;
}
