## Classes

<dl>
<dt><a href="#InlustrisClient">InlustrisClient</a> ⇐ <code><a href="https://discord.js.org/#/docs/main/master/class/Client">Client</a></code></dt>
<dd><p>The base client for Inlustris.</p></dd>
<dt><a href="#List">List</a> ⇐ <code>Set</code></dt>
<dd><p>A Set with additional utility methods.</p></dd>
</dl>

<a name="InlustrisClient"></a>

## InlustrisClient ⇐ [<code>Client</code>](https://discord.js.org/#/docs/main/master/class/Client)
<p>The base client for Inlustris.</p>

**Kind**: global class  
**Extends**: [<code>Client</code>](https://discord.js.org/#/docs/main/master/class/Client)  
<a name="List"></a>

## List ⇐ <code>Set</code>
<p>A Set with additional utility methods.</p>

**Kind**: global class  
**Extends**: <code>Set</code>  

* [List](#List) ⇐ <code>Set</code>
    * [.array()](#List+array) ⇒ <code>Array</code>
    * [.first([amount])](#List+first) ⇒ <code>\*</code> \| <code>Array.&lt;\*&gt;</code>
    * [.last([amount])](#List+last) ⇒ <code>\*</code> \| <code>Array.&lt;\*&gt;</code>
    * [.random([amount])](#List+random) ⇒ <code>\*</code> \| <code>Array.&lt;\*&gt;</code>
    * [.find(fn, [thisArg])](#List+find) ⇒ <code>\*</code>
    * [.sweep(fn, [thisArg])](#List+sweep) ⇒ <code>number</code>
    * [.filter(fn, [thisArg])](#List+filter) ⇒ [<code>List</code>](#List)
    * [.partition(fn, [thisArg])](#List+partition) ⇒ [<code>Array.&lt;List&gt;</code>](#List)
    * [.map(fn, [thisArg])](#List+map) ⇒ <code>Array</code>
    * [.mapValues(fn, [thisArg])](#List+mapValues) ⇒ [<code>List</code>](#List)
    * [.some(fn, [thisArg])](#List+some) ⇒ <code>boolean</code>
    * [.every(fn, [thisArg])](#List+every) ⇒ <code>boolean</code>
    * [.reduce(fn, [initialValue])](#List+reduce) ⇒ <code>\*</code>
    * [.each(fn, [thisArg])](#List+each) ⇒ [<code>List</code>](#List)
    * [.tap(fn, [thisArg])](#List+tap) ⇒ [<code>List</code>](#List)
    * [.clone()](#List+clone) ⇒ [<code>List</code>](#List)
    * [.concat(...lists)](#List+concat) ⇒ [<code>List</code>](#List)
    * [.equals(list)](#List+equals) ⇒ <code>boolean</code>
    * [.sort([compareFunction])](#List+sort) ⇒ [<code>List</code>](#List)

<a name="List+array"></a>

### list.array() ⇒ <code>Array</code>
<p>Creates an ordered array of the values of this list, and caches it internally. The array will only be
reconstructed if an item is added to or removed from the list, or if you change the length of the array
itself. If you don't want this caching behavoir, use <code>[...list.values()]</code> or
<code>Array.from(list.values())</code> instead.</p>

**Kind**: instance method of [<code>List</code>](#List)  
<a name="List+first"></a>

### list.first([amount]) ⇒ <code>\*</code> \| <code>Array.&lt;\*&gt;</code>
<p>Obtains the first value(s) in this list.</p>

**Kind**: instance method of [<code>List</code>](#List)  
**Returns**: <code>\*</code> \| <code>Array.&lt;\*&gt;</code> - <p>A single value if no amount is provided or an array of values, starting from the end if
amount is negative</p>  

| Param | Type | Description |
| --- | --- | --- |
| [amount] | <code>number</code> | <p>Amount of values to obtain from the beginning</p> |

<a name="List+last"></a>

### list.last([amount]) ⇒ <code>\*</code> \| <code>Array.&lt;\*&gt;</code>
<p>Obtains the last value(s) in this list. This relies on [array](#List+array), and thus the caching
mechanism applies here as well.</p>

**Kind**: instance method of [<code>List</code>](#List)  
**Returns**: <code>\*</code> \| <code>Array.&lt;\*&gt;</code> - <p>A single value if no amount is provided or an array of values, starting from the start if
amount is negative</p>  

| Param | Type | Description |
| --- | --- | --- |
| [amount] | <code>number</code> | <p>Amount of values to obtain from the end</p> |

<a name="List+random"></a>

### list.random([amount]) ⇒ <code>\*</code> \| <code>Array.&lt;\*&gt;</code>
<p>Obtains unique random value(s) from this list. This relies on [array](#List+array), and thus the caching
mechanism applies here as well.</p>

**Kind**: instance method of [<code>List</code>](#List)  
**Returns**: <code>\*</code> \| <code>Array.&lt;\*&gt;</code> - <p>A single value if no amount is provided or an array of values</p>  

| Param | Type | Description |
| --- | --- | --- |
| [amount] | <code>number</code> | <p>Amount of values to obtain randomly</p> |

<a name="List+find"></a>

### list.find(fn, [thisArg]) ⇒ <code>\*</code>
<p>Searches for a single item where the given function returns a truthy value. This behaves like
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find">Array.find()</a>.</p>

**Kind**: instance method of [<code>List</code>](#List)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | <p>The function to test with (should return boolean)</p> |
| [thisArg] | <code>\*</code> | <p>Value to use as <code>this</code> when executing function</p> |

**Example**  
```js
list.find(user => user.username === 'Bob');
```
<a name="List+sweep"></a>

### list.sweep(fn, [thisArg]) ⇒ <code>number</code>
<p>Removes entries that satisfy the provided filter function.</p>

**Kind**: instance method of [<code>List</code>](#List)  
**Returns**: <code>number</code> - <p>The number of removed entries</p>  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | <p>Function used to test (should return a boolean)</p> |
| [thisArg] | <code>\*</code> | <p>Value used as <code>this</code> when executing function</p> |

<a name="List+filter"></a>

### list.filter(fn, [thisArg]) ⇒ [<code>List</code>](#List)
<p>Identical to
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter">Array.filter()</a>,
but returns a [List](#List) instead of an Array.</p>

**Kind**: instance method of [<code>List</code>](#List)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | <p>The function used to test with (should return boolean)</p> |
| [thisArg] | <code>\*</code> | <p>Value to use as <code>this</code> when executing function</p> |

**Example**  
```js
list.filter(user => user.username === 'Bob');
```
<a name="List+partition"></a>

### list.partition(fn, [thisArg]) ⇒ [<code>Array.&lt;List&gt;</code>](#List)
<p>Partitions the list into two lists where the first list
contains the items that passed and the second contains the items that failed.</p>

**Kind**: instance method of [<code>List</code>](#List)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | <p>Function used to test (should return a boolean)</p> |
| [thisArg] | <code>\*</code> | <p>Value to use as <code>this</code> when executing function</p> |

**Example**  
```js
const [big, small] = list.partition(guild => guild.memberCount > 250);
```
<a name="List+map"></a>

### list.map(fn, [thisArg]) ⇒ <code>Array</code>
<p>Maps each item to another value into an array. Identical in behavior to
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map">Array.map()</a>.</p>

**Kind**: instance method of [<code>List</code>](#List)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | <p>Function that produces an element of the new array, taking three arguments</p> |
| [thisArg] | <code>\*</code> | <p>Value to use as <code>this</code> when executing function</p> |

**Example**  
```js
list.map(user => user.tag);
```
<a name="List+mapValues"></a>

### list.mapValues(fn, [thisArg]) ⇒ [<code>List</code>](#List)
<p>Maps each item to another into a list. Identical in behavior to
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map">Array.map()</a>.</p>

**Kind**: instance method of [<code>List</code>](#List)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | <p>Function that produces an element of the new list, taking three arguments</p> |
| [thisArg] | <code>\*</code> | <p>Value to use as <code>this</code> when executing function</p> |

**Example**  
```js
list.mapValues(user => user.tag);
```
<a name="List+some"></a>

### list.some(fn, [thisArg]) ⇒ <code>boolean</code>
<p>Checks if there exists an item that passes a test. Identical in behavior to
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some">Array.some()</a>.</p>

**Kind**: instance method of [<code>List</code>](#List)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | <p>Function used to test (should return a boolean)</p> |
| [thisArg] | <code>\*</code> | <p>Value to use as <code>this</code> when executing function</p> |

**Example**  
```js
list.some(user => user.discriminator === '0000');
```
<a name="List+every"></a>

### list.every(fn, [thisArg]) ⇒ <code>boolean</code>
<p>Checks if all items pass a test. Identical in behavior to
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every">Array.every()</a>.</p>

**Kind**: instance method of [<code>List</code>](#List)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | <p>Function used to test (should return a boolean)</p> |
| [thisArg] | <code>\*</code> | <p>Value to use as <code>this</code> when executing function</p> |

**Example**  
```js
list.every(user => !user.bot);
```
<a name="List+reduce"></a>

### list.reduce(fn, [initialValue]) ⇒ <code>\*</code>
<p>Applies a function to produce a single value. Identical in behavior to
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce">Array.reduce()</a>.</p>

**Kind**: instance method of [<code>List</code>](#List)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | <p>Function used to reduce, taking four arguments; <code>accumulator</code>, <code>currentValue</code>, <code>currentValue</code>, and <code>list</code></p> |
| [initialValue] | <code>\*</code> | <p>Starting value for the accumulator</p> |

**Example**  
```js
list.reduce((acc, guild) => acc + guild.memberCount, 0);
```
<a name="List+each"></a>

### list.each(fn, [thisArg]) ⇒ [<code>List</code>](#List)
<p>Identical to
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach">Set.forEach()</a>,
but returns the list instead of undefined.</p>

**Kind**: instance method of [<code>List</code>](#List)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | <p>Function to execute for each element</p> |
| [thisArg] | <code>\*</code> | <p>Value to use as <code>this</code> when executing function</p> |

**Example**  
```js
list .each(user => console.log(user.username)) .filter(user => user.bot) .each(user => console.log(user.username));
```
<a name="List+tap"></a>

### list.tap(fn, [thisArg]) ⇒ [<code>List</code>](#List)
<p>Runs a function on the list and returns the list.</p>

**Kind**: instance method of [<code>List</code>](#List)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | <p>Function to execute</p> |
| [thisArg] | <code>\*</code> | <p>Value to use as <code>this</code> when executing function</p> |

**Example**  
```js
list .tap(list => console.log(list.size)) .filter(user => user.bot) .tap(list => console.log(list.size));
```
<a name="List+clone"></a>

### list.clone() ⇒ [<code>List</code>](#List)
<p>Creates an identical shallow copy of this list.</p>

**Kind**: instance method of [<code>List</code>](#List)  
**Example**  
```js
const newList = someList.clone();
```
<a name="List+concat"></a>

### list.concat(...lists) ⇒ [<code>List</code>](#List)
<p>Combines this list with others into a new list. None of the source lists are modified.</p>

**Kind**: instance method of [<code>List</code>](#List)  

| Param | Type | Description |
| --- | --- | --- |
| ...lists | [<code>List</code>](#List) | <p>Lists to merge</p> |

**Example**  
```js
const newList = someList.concat(someOtherList, anotherList, ohBoyAList);
```
<a name="List+equals"></a>

### list.equals(list) ⇒ <code>boolean</code>
<p>Checks if this list shares identical value-value parings with another.
This is different to checking for equality using equal-signs, because
the collections may be different objects, but contain the same data.</p>

**Kind**: instance method of [<code>List</code>](#List)  
**Returns**: <code>boolean</code> - <p>Whether the collections have identical contents</p>  

| Param | Type | Description |
| --- | --- | --- |
| list | [<code>List</code>](#List) | <p>List to compare with</p> |

<a name="List+sort"></a>

### list.sort([compareFunction]) ⇒ [<code>List</code>](#List)
<p>The sort() method sorts the elements of a list and returns it.
The sort is not necessarily stable. The default sort order is according to string Unicode points.</p>

**Kind**: instance method of [<code>List</code>](#List)  

| Param | Type | Description |
| --- | --- | --- |
| [compareFunction] | <code>function</code> | <p>Specifies a function that defines the sort order. If omitted, the list is sorted according to each character's Unicode point value, according to the string conversion of each element.</p> |

