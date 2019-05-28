## Classes

<dl>
<dt><a href="#InlustrisClient">InlustrisClient</a> ⇐ <code><a href="https://discord.js.org/#/docs/main/master/class/Client">Client</a></code></dt>
<dd><p>The base client for Inlustris.</p></dd>
<dt><a href="#Argument">Argument</a> ⇐ <code><a href="#AliasPiece">AliasPiece</a></code></dt>
<dd><p>Base argument class for creating arguments.</p></dd>
<dt><a href="#AliasPiece">AliasPiece</a> ⇐ <code><a href="#Piece">Piece</a></code></dt>
<dd><p>The base piece for all pieces with aliases.</p></dd>
<dt><a href="#AliasStore">AliasStore</a> ⇐ <code><a href="#Store">Store</a></code></dt>
<dd><p>The common base for all stores with aliases.</p></dd>
<dt><a href="#Piece">Piece</a></dt>
<dd><p>The base piece from which all pieces extend.</p></dd>
<dt><a href="#Store">Store</a> ⇐ <code><a href="https://discord.js.org/#/docs/main/master/class/Collection">Collection</a></code></dt>
<dd><p>The common base for all stores.</p></dd>
<dt><a href="#Possible">Possible</a></dt>
<dd><p>Represents a possibility in a usage Tag</p></dd>
<dt><a href="#ClientUtil">ClientUtil</a></dt>
<dd><p>Utility methods to use for common tasks.</p></dd>
<dt><a href="#InlustrisError">InlustrisError</a> ⇐ <code>Error</code></dt>
<dd><p>An error class used to make error throwing universal.</p></dd>
<dt><a href="#List">List</a> ⇐ <code>Set</code></dt>
<dd><p>A Set with additional utility methods.</p></dd>
<dt><a href="#Util">Util</a></dt>
<dd><p>Internal utility class.</p></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#InlustrisPlugin">InlustrisPlugin</a> : <code>Object</code></dt>
<dd><p>The required export to load an external plugin</p></dd>
<dt><a href="#InlustrisOptions">InlustrisOptions</a> : <code><a href="https://discord.js.org/#/docs/main/master/typedef/ClientOptions">ClientOptions</a></code></dt>
<dd><p>Options for a new [InlustrisClient](#InlustrisClient)</p></dd>
</dl>

<a name="InlustrisClient"></a>

## InlustrisClient ⇐ [<code>Client</code>](https://discord.js.org/#/docs/main/master/class/Client)
<p>The base client for Inlustris.</p>

**Kind**: global class  
**Extends**: [<code>Client</code>](https://discord.js.org/#/docs/main/master/class/Client)  

* [InlustrisClient](#InlustrisClient) ⇐ [<code>Client</code>](https://discord.js.org/#/docs/main/master/class/Client)
    * [new InlustrisClient([options])](#new_InlustrisClient_new)
    * [.util](#InlustrisClient+util) : [<code>ClientUtil</code>](#ClientUtil) \| <code>null</code>
    * [.application](#InlustrisClient+application) : [<code>ClientApplication</code>](https://discord.js.org/#/docs/main/master/class/ClientApplication)
    * [.owners](#InlustrisClient+owners) : [<code>List.&lt;User&gt;</code>](https://discord.js.org/#/docs/main/master/class/User)
    * [.fetchApplication()](#InlustrisClient+fetchApplication) ⇒ [<code>Promise.&lt;ClientApplication&gt;</code>](https://discord.js.org/#/docs/main/master/class/ClientApplication)
    * ~~[.login()](#InlustrisClient+login)~~
    * [.start()](#InlustrisClient+start) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.use(mod)](#InlustrisClient+use) ⇒ [<code>InlustrisClient</code>](#InlustrisClient)

<a name="new_InlustrisClient_new"></a>

### new InlustrisClient([options])
<p>Creates a new client.</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | [<code>InlustrisOptions</code>](#InlustrisOptions) | <code>{}</code> | <p>Options to use when loading the client.</p> |

<a name="InlustrisClient+util"></a>

### inlustrisClient.util : [<code>ClientUtil</code>](#ClientUtil) \| <code>null</code>
<p>A [ClientUtil](#ClientUtil) to use, will only be loaded if <code>internals</code>, <code>defaults</code>, or <code>util</code> is specified in [InlustrisOptions#plugins](InlustrisOptions#plugins) or used with [use](#InlustrisClient+use)</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
<a name="InlustrisClient+application"></a>

### inlustrisClient.application : [<code>ClientApplication</code>](https://discord.js.org/#/docs/main/master/class/ClientApplication)
<p>The application of the client</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
<a name="InlustrisClient+owners"></a>

### inlustrisClient.owners : [<code>List.&lt;User&gt;</code>](https://discord.js.org/#/docs/main/master/class/User)
<p>The owners of the client, will only have one until teams support is added</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
**Read only**: true  
<a name="InlustrisClient+fetchApplication"></a>

### inlustrisClient.fetchApplication() ⇒ [<code>Promise.&lt;ClientApplication&gt;</code>](https://discord.js.org/#/docs/main/master/class/ClientApplication)
<p>Does the same as <a href="https://discord.js.org/#/docs/main/master/class/Client?scrollTo=fetchApplication">Client#fetchApplication()</a> but attaches the resolved value to [application](#InlustrisClient+application)</p>

**Kind**: instance method of [<code>InlustrisClient</code>](#InlustrisClient)  
<a name="InlustrisClient+login"></a>

### ~~inlustrisClient.login()~~
***Deprecated***

<p>Deprecated method, throws an error on use, use [start](#InlustrisClient+start) to start the client</p>

**Kind**: instance method of [<code>InlustrisClient</code>](#InlustrisClient)  
**Throws**:

- [<code>InlustrisError</code>](#InlustrisError) 

<a name="InlustrisClient+start"></a>

### inlustrisClient.start() ⇒ <code>Promise.&lt;string&gt;</code>
<p>Loads and initializes the plugins, and logs the client in.</p>

**Kind**: instance method of [<code>InlustrisClient</code>](#InlustrisClient)  
<a name="InlustrisClient+use"></a>

### inlustrisClient.use(mod) ⇒ [<code>InlustrisClient</code>](#InlustrisClient)
<p>Designates a plugin to load, will be loaded on start.</p>

**Kind**: instance method of [<code>InlustrisClient</code>](#InlustrisClient)  

| Param | Type | Description |
| --- | --- | --- |
| mod | <code>string</code> | <p>The name of a plugin to load, will be required if it's external</p> |

<a name="Argument"></a>

## Argument ⇐ [<code>AliasPiece</code>](#AliasPiece)
<p>Base argument class for creating arguments.</p>

**Kind**: global class  
**Extends**: [<code>AliasPiece</code>](#AliasPiece)  

* [Argument](#Argument) ⇐ [<code>AliasPiece</code>](#AliasPiece)
    * [.client](#Piece+client) : [<code>InlustrisClient</code>](#InlustrisClient)
    * [.file](#Piece+file) : <code>Array.&lt;string&gt;</code>
    * [.name](#Piece+name) : <code>string</code>
    * [.enabled](#Piece+enabled) : <code>boolean</code>
    * [.store](#Piece+store) : [<code>Store</code>](#Store)
    * [.directory](#Piece+directory)
    * [.type](#Piece+type) : <code>string</code>
    * [.path](#Piece+path) : <code>string</code>
    * [.toJSON()](#AliasPiece+toJSON) ⇒ <code>Object</code>
    * [.reload()](#Piece+reload) ⇒ [<code>Promise.&lt;Piece&gt;</code>](#Piece)
    * [.unload()](#Piece+unload) ⇒ <code>void</code>
    * [.disable()](#Piece+disable) ⇒ <code>this</code>
    * [.enable()](#Piece+enable) ⇒ <code>this</code>
    * *[.init()](#Piece+init) ⇒ <code>\*</code>*
    * [.toString()](#Piece+toString) ⇒ <code>string</code>

<a name="Piece+client"></a>

### argument.client : [<code>InlustrisClient</code>](#InlustrisClient)
<p>The client this Piece was created with</p>

**Kind**: instance property of [<code>Argument</code>](#Argument)  
<a name="Piece+file"></a>

### argument.file : <code>Array.&lt;string&gt;</code>
<p>The file location where this Piece is stored</p>

**Kind**: instance property of [<code>Argument</code>](#Argument)  
<a name="Piece+name"></a>

### argument.name : <code>string</code>
<p>The name of the Piece</p>

**Kind**: instance property of [<code>Argument</code>](#Argument)  
<a name="Piece+enabled"></a>

### argument.enabled : <code>boolean</code>
<p>Whether the piece is enabled or not</p>

**Kind**: instance property of [<code>Argument</code>](#Argument)  
<a name="Piece+store"></a>

### argument.store : [<code>Store</code>](#Store)
<p>The store this Piece is from</p>

**Kind**: instance property of [<code>Argument</code>](#Argument)  
<a name="Piece+directory"></a>

### argument.directory
<p>The base directory this Piece is stored in</p>

**Kind**: instance property of [<code>Argument</code>](#Argument)  
<a name="Piece+type"></a>

### argument.type : <code>string</code>
<p>The type of Piece this is</p>

**Kind**: instance property of [<code>Argument</code>](#Argument)  
**Read only**: true  
<a name="Piece+path"></a>

### argument.path : <code>string</code>
<p>The absolute path this Piece is located at</p>

**Kind**: instance property of [<code>Argument</code>](#Argument)  
**Read only**: true  
<a name="AliasPiece+toJSON"></a>

### argument.toJSON() ⇒ <code>Object</code>
<p>Defines the <code>JSON.stringify</code> behavior of this piece.</p>

**Kind**: instance method of [<code>Argument</code>](#Argument)  
<a name="Piece+reload"></a>

### argument.reload() ⇒ [<code>Promise.&lt;Piece&gt;</code>](#Piece)
<p>Reloads this piece.</p>

**Kind**: instance method of [<code>Argument</code>](#Argument)  
<a name="Piece+unload"></a>

### argument.unload() ⇒ <code>void</code>
<p>Unloads this piece.</p>

**Kind**: instance method of [<code>Argument</code>](#Argument)  
<a name="Piece+disable"></a>

### argument.disable() ⇒ <code>this</code>
<p>Disables this piece.</p>

**Kind**: instance method of [<code>Argument</code>](#Argument)  
**Chainable**  
<a name="Piece+enable"></a>

### argument.enable() ⇒ <code>this</code>
<p>Enables this piece.</p>

**Kind**: instance method of [<code>Argument</code>](#Argument)  
**Chainable**  
<a name="Piece+init"></a>

### *argument.init() ⇒ <code>\*</code>*
<p>The init method to be optionally overwritten in actual pieces</p>

**Kind**: instance abstract method of [<code>Argument</code>](#Argument)  
<a name="Piece+toString"></a>

### argument.toString() ⇒ <code>string</code>
<p>The <code>toString()</code> method of this piece.</p>

**Kind**: instance method of [<code>Argument</code>](#Argument)  
<a name="AliasPiece"></a>

## AliasPiece ⇐ [<code>Piece</code>](#Piece)
<p>The base piece for all pieces with aliases.</p>

**Kind**: global class  
**Extends**: [<code>Piece</code>](#Piece)  

* [AliasPiece](#AliasPiece) ⇐ [<code>Piece</code>](#Piece)
    * [.client](#Piece+client) : [<code>InlustrisClient</code>](#InlustrisClient)
    * [.file](#Piece+file) : <code>Array.&lt;string&gt;</code>
    * [.name](#Piece+name) : <code>string</code>
    * [.enabled](#Piece+enabled) : <code>boolean</code>
    * [.store](#Piece+store) : [<code>Store</code>](#Store)
    * [.directory](#Piece+directory)
    * [.type](#Piece+type) : <code>string</code>
    * [.path](#Piece+path) : <code>string</code>
    * [.toJSON()](#AliasPiece+toJSON) ⇒ <code>Object</code>
    * [.reload()](#Piece+reload) ⇒ [<code>Promise.&lt;Piece&gt;</code>](#Piece)
    * [.unload()](#Piece+unload) ⇒ <code>void</code>
    * [.disable()](#Piece+disable) ⇒ <code>this</code>
    * [.enable()](#Piece+enable) ⇒ <code>this</code>
    * *[.init()](#Piece+init) ⇒ <code>\*</code>*
    * [.toString()](#Piece+toString) ⇒ <code>string</code>

<a name="Piece+client"></a>

### aliasPiece.client : [<code>InlustrisClient</code>](#InlustrisClient)
<p>The client this Piece was created with</p>

**Kind**: instance property of [<code>AliasPiece</code>](#AliasPiece)  
**Overrides**: [<code>client</code>](#Piece+client)  
<a name="Piece+file"></a>

### aliasPiece.file : <code>Array.&lt;string&gt;</code>
<p>The file location where this Piece is stored</p>

**Kind**: instance property of [<code>AliasPiece</code>](#AliasPiece)  
**Overrides**: [<code>file</code>](#Piece+file)  
<a name="Piece+name"></a>

### aliasPiece.name : <code>string</code>
<p>The name of the Piece</p>

**Kind**: instance property of [<code>AliasPiece</code>](#AliasPiece)  
**Overrides**: [<code>name</code>](#Piece+name)  
<a name="Piece+enabled"></a>

### aliasPiece.enabled : <code>boolean</code>
<p>Whether the piece is enabled or not</p>

**Kind**: instance property of [<code>AliasPiece</code>](#AliasPiece)  
**Overrides**: [<code>enabled</code>](#Piece+enabled)  
<a name="Piece+store"></a>

### aliasPiece.store : [<code>Store</code>](#Store)
<p>The store this Piece is from</p>

**Kind**: instance property of [<code>AliasPiece</code>](#AliasPiece)  
**Overrides**: [<code>store</code>](#Piece+store)  
<a name="Piece+directory"></a>

### aliasPiece.directory
<p>The base directory this Piece is stored in</p>

**Kind**: instance property of [<code>AliasPiece</code>](#AliasPiece)  
**Overrides**: [<code>directory</code>](#Piece+directory)  
<a name="Piece+type"></a>

### aliasPiece.type : <code>string</code>
<p>The type of Piece this is</p>

**Kind**: instance property of [<code>AliasPiece</code>](#AliasPiece)  
**Overrides**: [<code>type</code>](#Piece+type)  
**Read only**: true  
<a name="Piece+path"></a>

### aliasPiece.path : <code>string</code>
<p>The absolute path this Piece is located at</p>

**Kind**: instance property of [<code>AliasPiece</code>](#AliasPiece)  
**Overrides**: [<code>path</code>](#Piece+path)  
**Read only**: true  
<a name="AliasPiece+toJSON"></a>

### aliasPiece.toJSON() ⇒ <code>Object</code>
<p>Defines the <code>JSON.stringify</code> behavior of this piece.</p>

**Kind**: instance method of [<code>AliasPiece</code>](#AliasPiece)  
**Overrides**: [<code>toJSON</code>](#Piece+toJSON)  
<a name="Piece+reload"></a>

### aliasPiece.reload() ⇒ [<code>Promise.&lt;Piece&gt;</code>](#Piece)
<p>Reloads this piece.</p>

**Kind**: instance method of [<code>AliasPiece</code>](#AliasPiece)  
**Overrides**: [<code>reload</code>](#Piece+reload)  
<a name="Piece+unload"></a>

### aliasPiece.unload() ⇒ <code>void</code>
<p>Unloads this piece.</p>

**Kind**: instance method of [<code>AliasPiece</code>](#AliasPiece)  
**Overrides**: [<code>unload</code>](#Piece+unload)  
<a name="Piece+disable"></a>

### aliasPiece.disable() ⇒ <code>this</code>
<p>Disables this piece.</p>

**Kind**: instance method of [<code>AliasPiece</code>](#AliasPiece)  
**Chainable**  
**Overrides**: [<code>disable</code>](#Piece+disable)  
<a name="Piece+enable"></a>

### aliasPiece.enable() ⇒ <code>this</code>
<p>Enables this piece.</p>

**Kind**: instance method of [<code>AliasPiece</code>](#AliasPiece)  
**Chainable**  
**Overrides**: [<code>enable</code>](#Piece+enable)  
<a name="Piece+init"></a>

### *aliasPiece.init() ⇒ <code>\*</code>*
<p>The init method to be optionally overwritten in actual pieces</p>

**Kind**: instance abstract method of [<code>AliasPiece</code>](#AliasPiece)  
**Overrides**: [<code>init</code>](#Piece+init)  
<a name="Piece+toString"></a>

### aliasPiece.toString() ⇒ <code>string</code>
<p>The <code>toString()</code> method of this piece.</p>

**Kind**: instance method of [<code>AliasPiece</code>](#AliasPiece)  
**Overrides**: [<code>toString</code>](#Piece+toString)  
<a name="AliasStore"></a>

## AliasStore ⇐ [<code>Store</code>](#Store)
<p>The common base for all stores with aliases.</p>

**Kind**: global class  
**Extends**: [<code>Store</code>](#Store)  

* [AliasStore](#AliasStore) ⇐ [<code>Store</code>](#Store)
    * [.client](#Store+client) : [<code>InlustrisClient</code>](#InlustrisClient)
    * [.name](#Store+name) : <code>string</code>
    * [.holds](#Store+holds) : [<code>Piece</code>](#Piece)
    * [.userDirectory](#Store+userDirectory) : <code>string</code>
    * [.get(name)](#AliasStore+get) ⇒ [<code>Piece</code>](#Piece)
    * [.has(name)](#AliasStore+has) ⇒ <code>boolean</code>
    * [.set(piece)](#AliasStore+set) ⇒ [<code>AliasPiece</code>](#AliasPiece)
    * [.delete(name)](#AliasStore+delete) ⇒ <code>boolean</code>
    * [.clear()](#AliasStore+clear) ⇒ <code>void</code>
    * [.registerCoreDirectory(directory)](#Store+registerCoreDirectory) ⇒ <code>this</code>
    * [.init()](#Store+init) ⇒ <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code>
    * [.resolve(name)](#Store+resolve) ⇒ [<code>Piece</code>](#Piece)
    * [.toString()](#Store+toString) ⇒ <code>string</code>
    * [.load(directory, file)](#Store+load) ⇒ [<code>Piece</code>](#Piece)
    * [.loadAll()](#Store+loadAll) ⇒ <code>Promise.&lt;number&gt;</code>

<a name="Store+client"></a>

### aliasStore.client : [<code>InlustrisClient</code>](#InlustrisClient)
<p>The client that initialized this store</p>

**Kind**: instance property of [<code>AliasStore</code>](#AliasStore)  
**Overrides**: [<code>client</code>](#Store+client)  
**Read only**: true  
<a name="Store+name"></a>

### aliasStore.name : <code>string</code>
<p>The name of what this holds</p>

**Kind**: instance property of [<code>AliasStore</code>](#AliasStore)  
**Overrides**: [<code>name</code>](#Store+name)  
**Read only**: true  
<a name="Store+holds"></a>

### aliasStore.holds : [<code>Piece</code>](#Piece)
<p>The type of structure this store holds</p>

**Kind**: instance property of [<code>AliasStore</code>](#AliasStore)  
**Overrides**: [<code>holds</code>](#Store+holds)  
**Read only**: true  
<a name="Store+userDirectory"></a>

### aliasStore.userDirectory : <code>string</code>
<p>The directory of local pieces relative to where you run Inlustris from.</p>

**Kind**: instance property of [<code>AliasStore</code>](#AliasStore)  
**Overrides**: [<code>userDirectory</code>](#Store+userDirectory)  
**Read only**: true  
<a name="AliasStore+get"></a>

### aliasStore.get(name) ⇒ [<code>Piece</code>](#Piece)
<p>Gets a piece from the store, or from the alias collection if necessary.</p>

**Kind**: instance method of [<code>AliasStore</code>](#AliasStore)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>The name or alias of the piece</p> |

<a name="AliasStore+has"></a>

### aliasStore.has(name) ⇒ <code>boolean</code>
<p>Returns a boolean if the piece or alias is found within the store.</p>

**Kind**: instance method of [<code>AliasStore</code>](#AliasStore)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>A piece or alias name</p> |

<a name="AliasStore+set"></a>

### aliasStore.set(piece) ⇒ [<code>AliasPiece</code>](#AliasPiece)
<p>Sets up an alias piece in this store.</p>

**Kind**: instance method of [<code>AliasStore</code>](#AliasStore)  
**Overrides**: [<code>set</code>](#Store+set)  

| Param | Type | Description |
| --- | --- | --- |
| piece | [<code>AliasPiece</code>](#AliasPiece) | <p>Piece to set up</p> |

<a name="AliasStore+delete"></a>

### aliasStore.delete(name) ⇒ <code>boolean</code>
<p>Deletes an alias piece from this store.</p>

**Kind**: instance method of [<code>AliasStore</code>](#AliasStore)  
**Overrides**: [<code>delete</code>](#Store+delete)  
**Returns**: <code>boolean</code> - <p>Whether or not the piece was successfully deleted</p>  

| Param | Type | Description |
| --- | --- | --- |
| name | [<code>AliasPiece</code>](#AliasPiece) \| <code>string</code> | <p>An alias piece or a string representing an alias piece</p> |

<a name="AliasStore+clear"></a>

### aliasStore.clear() ⇒ <code>void</code>
<p>Clears the pieces and aliases from this store.</p>

**Kind**: instance method of [<code>AliasStore</code>](#AliasStore)  
<a name="Store+registerCoreDirectory"></a>

### aliasStore.registerCoreDirectory(directory) ⇒ <code>this</code>
<p>Registers a core directory to check for pieces</p>

**Kind**: instance method of [<code>AliasStore</code>](#AliasStore)  
**Overrides**: [<code>registerCoreDirectory</code>](#Store+registerCoreDirectory)  

| Param | Type | Description |
| --- | --- | --- |
| directory | <code>string</code> | <p>The directory to check for core pieces</p> |

<a name="Store+init"></a>

### aliasStore.init() ⇒ <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code>
<p>Initializes all pieces in this store.</p>

**Kind**: instance method of [<code>AliasStore</code>](#AliasStore)  
**Overrides**: [<code>init</code>](#Store+init)  
<a name="Store+resolve"></a>

### aliasStore.resolve(name) ⇒ [<code>Piece</code>](#Piece)
<p>Resolves a string or piece into a piece instance.</p>

**Kind**: instance method of [<code>AliasStore</code>](#AliasStore)  
**Overrides**: [<code>resolve</code>](#Store+resolve)  

| Param | Type | Description |
| --- | --- | --- |
| name | [<code>Piece</code>](#Piece) \| <code>string</code> | <p>The name of the piece object or the piece instance</p> |

<a name="Store+toString"></a>

### aliasStore.toString() ⇒ <code>string</code>
<p>The <code>toString()</code> method of this store.</p>

**Kind**: instance method of [<code>AliasStore</code>](#AliasStore)  
**Overrides**: [<code>toString</code>](#Store+toString)  
<a name="Store+load"></a>

### aliasStore.load(directory, file) ⇒ [<code>Piece</code>](#Piece)
<p>Loads a piece into Inlustris so it can be saved in the store.</p>

**Kind**: instance method of [<code>AliasStore</code>](#AliasStore)  
**Overrides**: [<code>load</code>](#Store+load)  

| Param | Type | Description |
| --- | --- | --- |
| directory | <code>string</code> | <p>The directory the file is located in</p> |
| file | <code>Array.&lt;string&gt;</code> | <p>A string or array of strings showing where the file is located</p> |

<a name="Store+loadAll"></a>

### aliasStore.loadAll() ⇒ <code>Promise.&lt;number&gt;</code>
<p>Loads all of the Pieces from both the user and core directories.</p>

**Kind**: instance method of [<code>AliasStore</code>](#AliasStore)  
**Overrides**: [<code>loadAll</code>](#Store+loadAll)  
**Returns**: <code>Promise.&lt;number&gt;</code> - <p>The number of pieces loaded</p>  
<a name="Piece"></a>

## Piece
<p>The base piece from which all pieces extend.</p>

**Kind**: global class  

* [Piece](#Piece)
    * [.client](#Piece+client) : [<code>InlustrisClient</code>](#InlustrisClient)
    * [.file](#Piece+file) : <code>Array.&lt;string&gt;</code>
    * [.name](#Piece+name) : <code>string</code>
    * [.enabled](#Piece+enabled) : <code>boolean</code>
    * [.store](#Piece+store) : [<code>Store</code>](#Store)
    * [.directory](#Piece+directory)
    * [.type](#Piece+type) : <code>string</code>
    * [.path](#Piece+path) : <code>string</code>
    * [.reload()](#Piece+reload) ⇒ [<code>Promise.&lt;Piece&gt;</code>](#Piece)
    * [.unload()](#Piece+unload) ⇒ <code>void</code>
    * [.disable()](#Piece+disable) ⇒ <code>this</code>
    * [.enable()](#Piece+enable) ⇒ <code>this</code>
    * *[.init()](#Piece+init) ⇒ <code>\*</code>*
    * [.toString()](#Piece+toString) ⇒ <code>string</code>
    * [.toJSON()](#Piece+toJSON) ⇒ <code>Object</code>

<a name="Piece+client"></a>

### piece.client : [<code>InlustrisClient</code>](#InlustrisClient)
<p>The client this Piece was created with</p>

**Kind**: instance property of [<code>Piece</code>](#Piece)  
<a name="Piece+file"></a>

### piece.file : <code>Array.&lt;string&gt;</code>
<p>The file location where this Piece is stored</p>

**Kind**: instance property of [<code>Piece</code>](#Piece)  
<a name="Piece+name"></a>

### piece.name : <code>string</code>
<p>The name of the Piece</p>

**Kind**: instance property of [<code>Piece</code>](#Piece)  
<a name="Piece+enabled"></a>

### piece.enabled : <code>boolean</code>
<p>Whether the piece is enabled or not</p>

**Kind**: instance property of [<code>Piece</code>](#Piece)  
<a name="Piece+store"></a>

### piece.store : [<code>Store</code>](#Store)
<p>The store this Piece is from</p>

**Kind**: instance property of [<code>Piece</code>](#Piece)  
<a name="Piece+directory"></a>

### piece.directory
<p>The base directory this Piece is stored in</p>

**Kind**: instance property of [<code>Piece</code>](#Piece)  
<a name="Piece+type"></a>

### piece.type : <code>string</code>
<p>The type of Piece this is</p>

**Kind**: instance property of [<code>Piece</code>](#Piece)  
**Read only**: true  
<a name="Piece+path"></a>

### piece.path : <code>string</code>
<p>The absolute path this Piece is located at</p>

**Kind**: instance property of [<code>Piece</code>](#Piece)  
**Read only**: true  
<a name="Piece+reload"></a>

### piece.reload() ⇒ [<code>Promise.&lt;Piece&gt;</code>](#Piece)
<p>Reloads this piece.</p>

**Kind**: instance method of [<code>Piece</code>](#Piece)  
<a name="Piece+unload"></a>

### piece.unload() ⇒ <code>void</code>
<p>Unloads this piece.</p>

**Kind**: instance method of [<code>Piece</code>](#Piece)  
<a name="Piece+disable"></a>

### piece.disable() ⇒ <code>this</code>
<p>Disables this piece.</p>

**Kind**: instance method of [<code>Piece</code>](#Piece)  
**Chainable**  
<a name="Piece+enable"></a>

### piece.enable() ⇒ <code>this</code>
<p>Enables this piece.</p>

**Kind**: instance method of [<code>Piece</code>](#Piece)  
**Chainable**  
<a name="Piece+init"></a>

### *piece.init() ⇒ <code>\*</code>*
<p>The init method to be optionally overwritten in actual pieces</p>

**Kind**: instance abstract method of [<code>Piece</code>](#Piece)  
<a name="Piece+toString"></a>

### piece.toString() ⇒ <code>string</code>
<p>The <code>toString()</code> method of this piece.</p>

**Kind**: instance method of [<code>Piece</code>](#Piece)  
<a name="Piece+toJSON"></a>

### piece.toJSON() ⇒ <code>Object</code>
<p>Defines the <code>JSON.stringify()</code> behavior of this piece.</p>

**Kind**: instance method of [<code>Piece</code>](#Piece)  
<a name="Store"></a>

## Store ⇐ [<code>Collection</code>](https://discord.js.org/#/docs/main/master/class/Collection)
<p>The common base for all stores.</p>

**Kind**: global class  
**Extends**: [<code>Collection</code>](https://discord.js.org/#/docs/main/master/class/Collection)  

* [Store](#Store) ⇐ [<code>Collection</code>](https://discord.js.org/#/docs/main/master/class/Collection)
    * [.client](#Store+client) : [<code>InlustrisClient</code>](#InlustrisClient)
    * [.name](#Store+name) : <code>string</code>
    * [.holds](#Store+holds) : [<code>Piece</code>](#Piece)
    * [.userDirectory](#Store+userDirectory) : <code>string</code>
    * [.registerCoreDirectory(directory)](#Store+registerCoreDirectory) ⇒ <code>this</code>
    * [.init()](#Store+init) ⇒ <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code>
    * [.set(piece)](#Store+set) ⇒ [<code>Piece</code>](#Piece)
    * [.resolve(name)](#Store+resolve) ⇒ [<code>Piece</code>](#Piece)
    * [.delete(name)](#Store+delete) ⇒ <code>boolean</code>
    * [.toString()](#Store+toString) ⇒ <code>string</code>
    * [.load(directory, file)](#Store+load) ⇒ [<code>Piece</code>](#Piece)
    * [.loadAll()](#Store+loadAll) ⇒ <code>Promise.&lt;number&gt;</code>

<a name="Store+client"></a>

### store.client : [<code>InlustrisClient</code>](#InlustrisClient)
<p>The client that initialized this store</p>

**Kind**: instance property of [<code>Store</code>](#Store)  
**Read only**: true  
<a name="Store+name"></a>

### store.name : <code>string</code>
<p>The name of what this holds</p>

**Kind**: instance property of [<code>Store</code>](#Store)  
**Read only**: true  
<a name="Store+holds"></a>

### store.holds : [<code>Piece</code>](#Piece)
<p>The type of structure this store holds</p>

**Kind**: instance property of [<code>Store</code>](#Store)  
**Read only**: true  
<a name="Store+userDirectory"></a>

### store.userDirectory : <code>string</code>
<p>The directory of local pieces relative to where you run Inlustris from.</p>

**Kind**: instance property of [<code>Store</code>](#Store)  
**Read only**: true  
<a name="Store+registerCoreDirectory"></a>

### store.registerCoreDirectory(directory) ⇒ <code>this</code>
<p>Registers a core directory to check for pieces</p>

**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type | Description |
| --- | --- | --- |
| directory | <code>string</code> | <p>The directory to check for core pieces</p> |

<a name="Store+init"></a>

### store.init() ⇒ <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code>
<p>Initializes all pieces in this store.</p>

**Kind**: instance method of [<code>Store</code>](#Store)  
<a name="Store+set"></a>

### store.set(piece) ⇒ [<code>Piece</code>](#Piece)
<p>Sets up a piece in the store.</p>

**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type | Description |
| --- | --- | --- |
| piece | [<code>Piece</code>](#Piece) | <p>The piece to set up</p> |

<a name="Store+resolve"></a>

### store.resolve(name) ⇒ [<code>Piece</code>](#Piece)
<p>Resolves a string or piece into a piece instance.</p>

**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type | Description |
| --- | --- | --- |
| name | [<code>Piece</code>](#Piece) \| <code>string</code> | <p>The name of the piece object or the piece instance</p> |

<a name="Store+delete"></a>

### store.delete(name) ⇒ <code>boolean</code>
<p>Deletes a piece from the store.</p>

**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type | Description |
| --- | --- | --- |
| name | [<code>Piece</code>](#Piece) \| <code>string</code> | <p>The name of the piece, or a piece instance</p> |

<a name="Store+toString"></a>

### store.toString() ⇒ <code>string</code>
<p>The <code>toString()</code> method of this store.</p>

**Kind**: instance method of [<code>Store</code>](#Store)  
<a name="Store+load"></a>

### store.load(directory, file) ⇒ [<code>Piece</code>](#Piece)
<p>Loads a piece into Inlustris so it can be saved in the store.</p>

**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type | Description |
| --- | --- | --- |
| directory | <code>string</code> | <p>The directory the file is located in</p> |
| file | <code>Array.&lt;string&gt;</code> | <p>A string or array of strings showing where the file is located</p> |

<a name="Store+loadAll"></a>

### store.loadAll() ⇒ <code>Promise.&lt;number&gt;</code>
<p>Loads all of the Pieces from both the user and core directories.</p>

**Kind**: instance method of [<code>Store</code>](#Store)  
**Returns**: <code>Promise.&lt;number&gt;</code> - <p>The number of pieces loaded</p>  
<a name="Possible"></a>

## Possible
<p>Represents a possibility in a usage Tag</p>

**Kind**: global class  

* [Possible](#Possible)
    * [new Possible(regexResults)](#new_Possible_new)
    * [.name](#Possible+name) : <code>string</code>
    * [.type](#Possible+type) : <code>string</code>
    * [.min](#Possible+min) : <code>number</code>
    * [.max](#Possible+max) : <code>number</code>
    * [.regex](#Possible+regex) : <code>RegExp</code>

<a name="new_Possible_new"></a>

### new Possible(regexResults)

| Param | Type | Description |
| --- | --- | --- |
| regexResults | <code>Array.&lt;string&gt;</code> | <p>The regex results from parsing the tag member</p> |

<a name="Possible+name"></a>

### possible.name : <code>string</code>
<p>The name of this possible</p>

**Kind**: instance property of [<code>Possible</code>](#Possible)  
<a name="Possible+type"></a>

### possible.type : <code>string</code>
<p>The type of this possible</p>

**Kind**: instance property of [<code>Possible</code>](#Possible)  
<a name="Possible+min"></a>

### possible.min : <code>number</code>
<p>The min of this possible</p>

**Kind**: instance property of [<code>Possible</code>](#Possible)  
<a name="Possible+max"></a>

### possible.max : <code>number</code>
<p>The max of this possible</p>

**Kind**: instance property of [<code>Possible</code>](#Possible)  
<a name="Possible+regex"></a>

### possible.regex : <code>RegExp</code>
<p>The regex of this possible</p>

**Kind**: instance property of [<code>Possible</code>](#Possible)  
<a name="ClientUtil"></a>

## ClientUtil
<p>Utility methods to use for common tasks.</p>

**Kind**: global class  

* [ClientUtil](#ClientUtil)
    * [.resolveUser(text, users, [caseSensitive], [wholeWord])](#ClientUtil+resolveUser) ⇒ [<code>User</code>](https://discord.js.org/#/docs/main/master/class/User)
    * [.resolveUsers(text, users, [caseSensitive], [wholeWord])](#ClientUtil+resolveUsers) ⇒ <code>Collection.&lt;Snowflake, User&gt;</code>
    * [.checkUser(text, user, [caseSensitive], [wholeWord])](#ClientUtil+checkUser) ⇒ <code>boolean</code>
    * [.resolveMember(text, members, [caseSensitive], [wholeWord])](#ClientUtil+resolveMember) ⇒ [<code>GuildMember</code>](https://discord.js.org/#/docs/main/master/class/GuildMember)
    * [.resolveMembers(text, members, [caseSensitive], [wholeWord])](#ClientUtil+resolveMembers) ⇒ <code>Collection.&lt;Snowflake, GuildMember&gt;</code>
    * [.checkMember(text, member, [caseSensitive], [wholeWord])](#ClientUtil+checkMember) ⇒ <code>boolean</code>
    * [.resolveChannel(text, channels, [caseSensitive], [wholeWord])](#ClientUtil+resolveChannel) ⇒ [<code>GuildChannel</code>](https://discord.js.org/#/docs/main/master/class/GuildChannel)
    * [.resolveChannels(text, channels, [caseSensitive], [wholeWord])](#ClientUtil+resolveChannels) ⇒ <code>Collection.&lt;Snowflake, GuildChannel&gt;</code>
    * [.checkChannel(text, channel, [caseSensitive], [wholeWord])](#ClientUtil+checkChannel) ⇒ <code>boolean</code>
    * [.resolveRole(text, roles, [caseSensitive], [wholeWord])](#ClientUtil+resolveRole) ⇒ <code>Role</code>
    * [.resolveRoles(text, roles, [caseSensitive], [wholeWord])](#ClientUtil+resolveRoles) ⇒ <code>Collection.&lt;Snowflake, Role&gt;</code>
    * [.checkRole(text, role, [caseSensitive], [wholeWord])](#ClientUtil+checkRole) ⇒ <code>boolean</code>
    * [.resolveEmoji(text, emojis, [caseSensitive], [wholeWord])](#ClientUtil+resolveEmoji) ⇒ [<code>Emoji</code>](https://discord.js.org/#/docs/main/master/class/Emoji)
    * [.resolveEmojis(text, emojis, [caseSensitive], [wholeWord])](#ClientUtil+resolveEmojis) ⇒ <code>Collection.&lt;Snowflake, Emoji&gt;</code>
    * [.checkEmoji(text, emoji, [caseSensitive], [wholeWord])](#ClientUtil+checkEmoji) ⇒ <code>boolean</code>
    * [.resolveGuild(text, guilds, [caseSensitive], [wholeWord])](#ClientUtil+resolveGuild) ⇒ [<code>Guild</code>](https://discord.js.org/#/docs/main/master/class/Guild)
    * [.resolveGuilds(text, guilds, [caseSensitive], [wholeWord])](#ClientUtil+resolveGuilds) ⇒ <code>Collection.&lt;Snowflake, Guild&gt;</code>
    * [.checkGuild(text, guild, [caseSensitive], [wholeWord])](#ClientUtil+checkGuild) ⇒ <code>boolean</code>
    * [.permissionNames()](#ClientUtil+permissionNames) ⇒ <code>Array.&lt;string&gt;</code>
    * [.resolvePermissionNumber(num)](#ClientUtil+resolvePermissionNumber) ⇒ <code>Array.&lt;string&gt;</code>
    * [.compareStreaming(oldMember, newMember)](#ClientUtil+compareStreaming) ⇒ <code>number</code>
    * [.fetchMember(guild, id, cache)](#ClientUtil+fetchMember) ⇒ [<code>Promise.&lt;GuildMember&gt;</code>](https://discord.js.org/#/docs/main/master/class/GuildMember)
    * [.embed([data])](#ClientUtil+embed) ⇒ [<code>MessageEmbed</code>](https://discord.js.org/#/docs/main/master/class/MessageEmbed)
    * [.attachment(file, [name])](#ClientUtil+attachment) ⇒ [<code>MessageAttachment</code>](https://discord.js.org/#/docs/main/master/class/MessageAttachment)
    * [.collection([iterable])](#ClientUtil+collection) ⇒ [<code>Collection</code>](https://discord.js.org/#/docs/main/master/class/Collection)
    * [.list([iterable])](#ClientUtil+list) ⇒ [<code>List</code>](#List)

<a name="ClientUtil+resolveUser"></a>

### clientUtil.resolveUser(text, users, [caseSensitive], [wholeWord]) ⇒ [<code>User</code>](https://discord.js.org/#/docs/main/master/class/User)
<p>Resolves a user from a string, such as an ID, a name, or a mention.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to resolve</p> |
| users | <code>Collection.&lt;Snowflake, User&gt;</code> |  | <p>Collection of users to find in</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name match whole word only</p> |

<a name="ClientUtil+resolveUsers"></a>

### clientUtil.resolveUsers(text, users, [caseSensitive], [wholeWord]) ⇒ <code>Collection.&lt;Snowflake, User&gt;</code>
<p>Resolves multiple users from a string, such as an ID, a name, or a mention.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to resolve</p> |
| users | <code>Collection.&lt;Snowflake, User&gt;</code> |  | <p>Collection of users to find in</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name match whole word only</p> |

<a name="ClientUtil+checkUser"></a>

### clientUtil.checkUser(text, user, [caseSensitive], [wholeWord]) ⇒ <code>boolean</code>
<p>Checks if a string could be referring to a user.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to check</p> |
| user | [<code>User</code>](https://discord.js.org/#/docs/main/master/class/User) |  | <p>User to check</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes checking by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes checking by name match whole word only</p> |

<a name="ClientUtil+resolveMember"></a>

### clientUtil.resolveMember(text, members, [caseSensitive], [wholeWord]) ⇒ [<code>GuildMember</code>](https://discord.js.org/#/docs/main/master/class/GuildMember)
<p>Resolves a member from a string, such as an ID, a name, or a mention.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to resolve</p> |
| members | <code>Collection.&lt;Snowflake, GuildMember&gt;</code> |  | <p>Collection of members to find in</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name match whole word only</p> |

<a name="ClientUtil+resolveMembers"></a>

### clientUtil.resolveMembers(text, members, [caseSensitive], [wholeWord]) ⇒ <code>Collection.&lt;Snowflake, GuildMember&gt;</code>
<p>Resolves multiple members from a string, such as an ID, a name, or a mention.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to resolve</p> |
| members | <code>Collection.&lt;Snowflake, GuildMember&gt;</code> |  | <p>Collection of members to find in</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name match whole word only</p> |

<a name="ClientUtil+checkMember"></a>

### clientUtil.checkMember(text, member, [caseSensitive], [wholeWord]) ⇒ <code>boolean</code>
<p>Checks if a string could be referring to a member.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to check</p> |
| member | [<code>GuildMember</code>](https://discord.js.org/#/docs/main/master/class/GuildMember) |  | <p>Member to check</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes checking by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes checking by name match whole word only</p> |

<a name="ClientUtil+resolveChannel"></a>

### clientUtil.resolveChannel(text, channels, [caseSensitive], [wholeWord]) ⇒ [<code>GuildChannel</code>](https://discord.js.org/#/docs/main/master/class/GuildChannel)
<p>Resolves a channel from a string, such as ID, a name, or a mention.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to resolve</p> |
| channels | <code>Collection.&lt;Snowflake, GuildChannel&gt;</code> |  | <p>Collection of channels to find in</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name match whole word only</p> |

<a name="ClientUtil+resolveChannels"></a>

### clientUtil.resolveChannels(text, channels, [caseSensitive], [wholeWord]) ⇒ <code>Collection.&lt;Snowflake, GuildChannel&gt;</code>
<p>Resolves multiple channels from a string, such as an ID, a name, or a mention.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to resolve</p> |
| channels | <code>Collection.&lt;Snowflake, GuildChannel&gt;</code> |  | <p>Collection of channels to find in</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name match whole word only</p> |

<a name="ClientUtil+checkChannel"></a>

### clientUtil.checkChannel(text, channel, [caseSensitive], [wholeWord]) ⇒ <code>boolean</code>
<p>Checks if a string could be referring to a channel.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to check</p> |
| channel | [<code>GuildChannel</code>](https://discord.js.org/#/docs/main/master/class/GuildChannel) |  | <p>Channel to check</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes checking by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes checking by name match whole word only</p> |

<a name="ClientUtil+resolveRole"></a>

### clientUtil.resolveRole(text, roles, [caseSensitive], [wholeWord]) ⇒ <code>Role</code>
<p>Resolves a role from a string, such as an ID, a name, or a mention.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to resolve</p> |
| roles | <code>Collection.&lt;Snowflake, Role&gt;</code> |  | <p>Collection of roles to find in</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name match whole word only</p> |

<a name="ClientUtil+resolveRoles"></a>

### clientUtil.resolveRoles(text, roles, [caseSensitive], [wholeWord]) ⇒ <code>Collection.&lt;Snowflake, Role&gt;</code>
<p>Resolves multiple roles from a string, such as an ID, a name, or a mention.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to resolve</p> |
| roles | <code>Collection.&lt;Snowflake, Role&gt;</code> |  | <p>Collection of roles to find in</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name match whole word only</p> |

<a name="ClientUtil+checkRole"></a>

### clientUtil.checkRole(text, role, [caseSensitive], [wholeWord]) ⇒ <code>boolean</code>
<p>Checks if a string could be referring to a role.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to check</p> |
| role | [<code>Role</code>](https://discord.js.org/#/docs/main/master/class/Role) |  | <p>Role to check</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes checking by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes checking by name match full word only</p> |

<a name="ClientUtil+resolveEmoji"></a>

### clientUtil.resolveEmoji(text, emojis, [caseSensitive], [wholeWord]) ⇒ [<code>Emoji</code>](https://discord.js.org/#/docs/main/master/class/Emoji)
<p>Resolves a custom emoji from a string, such as a name or a mention.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to resolve</p> |
| emojis | <code>Collection.&lt;Snowflake, Emoji&gt;</code> |  | <p>Collection of emojis to find in</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name match whole word only</p> |

<a name="ClientUtil+resolveEmojis"></a>

### clientUtil.resolveEmojis(text, emojis, [caseSensitive], [wholeWord]) ⇒ <code>Collection.&lt;Snowflake, Emoji&gt;</code>
<p>Resolves multiple custom emojis from a string, such as a name or a mention.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to resolve</p> |
| emojis | <code>Collection.&lt;Snowflake, Emoji&gt;</code> |  | <p>Collection of emojis to find in</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name match whole word only</p> |

<a name="ClientUtil+checkEmoji"></a>

### clientUtil.checkEmoji(text, emoji, [caseSensitive], [wholeWord]) ⇒ <code>boolean</code>
<p>Checks if a string could be referring to an emoji.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to check</p> |
| emoji | [<code>Emoji</code>](https://discord.js.org/#/docs/main/master/class/Emoji) |  | <p>Emoji to check</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes checking by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes checking by name match whole word only</p> |

<a name="ClientUtil+resolveGuild"></a>

### clientUtil.resolveGuild(text, guilds, [caseSensitive], [wholeWord]) ⇒ [<code>Guild</code>](https://discord.js.org/#/docs/main/master/class/Guild)
<p>Resolves a guild from a string, such as an ID or name.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to resolve</p> |
| guilds | <code>Collection.&lt;Snowflake, Guild&gt;</code> |  | <p>Collection of guilds to find in</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name full word only</p> |

<a name="ClientUtil+resolveGuilds"></a>

### clientUtil.resolveGuilds(text, guilds, [caseSensitive], [wholeWord]) ⇒ <code>Collection.&lt;Snowflake, Guild&gt;</code>
<p>Resolves multiple guilds from a string, such as an ID or name.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to resolve</p> |
| guilds | <code>Collection.&lt;Snowflake, Guild&gt;</code> |  | <p>Collection of guilds to find in</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes finding by name full word only</p> |

<a name="ClientUtil+checkGuild"></a>

### clientUtil.checkGuild(text, guild, [caseSensitive], [wholeWord]) ⇒ <code>boolean</code>
<p>Checks if a string could be referring to a guild.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | <p>Text to check</p> |
| guild | [<code>Guild</code>](https://discord.js.org/#/docs/main/master/class/Guild) |  | <p>Guild to check</p> |
| [caseSensitive] | <code>boolean</code> | <code>false</code> | <p>Makes checking by name case sensitive</p> |
| [wholeWord] | <code>boolean</code> | <code>false</code> | <p>Makes checking by name match full word only</p> |

<a name="ClientUtil+permissionNames"></a>

### clientUtil.permissionNames() ⇒ <code>Array.&lt;string&gt;</code>
<p>An array of permission names.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  
<a name="ClientUtil+resolvePermissionNumber"></a>

### clientUtil.resolvePermissionNumber(num) ⇒ <code>Array.&lt;string&gt;</code>
<p>Resolved a permission number and returns an array of permissions names.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | <p>The permissions number</p> |

<a name="ClientUtil+compareStreaming"></a>

### clientUtil.compareStreaming(oldMember, newMember) ⇒ <code>number</code>
<p>Compares two member objects presences and checks if they stopped or started a stream or not.
Returns <code>0</code>, <code>1</code>, or <code>2</code> for no change, stopped, or started.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Description |
| --- | --- | --- |
| oldMember | [<code>GuildMember</code>](https://discord.js.org/#/docs/main/master/class/GuildMember) | <p>The old guild member</p> |
| newMember | [<code>GuildMember</code>](https://discord.js.org/#/docs/main/master/class/GuildMember) | <p>The new guild member</p> |

<a name="ClientUtil+fetchMember"></a>

### clientUtil.fetchMember(guild, id, cache) ⇒ [<code>Promise.&lt;GuildMember&gt;</code>](https://discord.js.org/#/docs/main/master/class/GuildMember)
<p>Combination of <code>&lt;Client&gt;.fetchUser()</code> and <code>&lt;Guild&gt;.fetchMember()</code>.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Description |
| --- | --- | --- |
| guild | [<code>Guild</code>](https://discord.js.org/#/docs/main/master/class/Guild) | <p>The guild to fetch in</p> |
| id | <code>string</code> | <p>ID of the user to fetch</p> |
| cache | <code>boolean</code> | <p>Whether or not to add to the cache</p> |

<a name="ClientUtil+embed"></a>

### clientUtil.embed([data]) ⇒ [<code>MessageEmbed</code>](https://discord.js.org/#/docs/main/master/class/MessageEmbed)
<p>Makes a MessageEmbed.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Description |
| --- | --- | --- |
| [data] | [<code>MessageEmbed</code>](https://discord.js.org/#/docs/main/master/class/MessageEmbed) \| [<code>MessageEmbedOptions</code>](https://discord.js.org/#/docs/main/master/typedef/MessageEmbedOptions) | <p>The data to use for the embed</p> |

<a name="ClientUtil+attachment"></a>

### clientUtil.attachment(file, [name]) ⇒ [<code>MessageAttachment</code>](https://discord.js.org/#/docs/main/master/class/MessageAttachment)
<p>Makes a MessageAttachment.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Description |
| --- | --- | --- |
| file | [<code>BufferResolvable</code>](https://discord.js.org/#/docs/main/master/typedef/BufferResolvable) \| <code>Stream</code> | <p>The file</p> |
| [name] | <code>string</code> | <p>The name of the file</p> |

<a name="ClientUtil+collection"></a>

### clientUtil.collection([iterable]) ⇒ [<code>Collection</code>](https://discord.js.org/#/docs/main/master/class/Collection)
<p>Makes a Collection.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Description |
| --- | --- | --- |
| [iterable] | <code>Iterable</code> | <p>Entries to fill with</p> |

<a name="ClientUtil+list"></a>

### clientUtil.list([iterable]) ⇒ [<code>List</code>](#List)
<p>Makes a List.</p>

**Kind**: instance method of [<code>ClientUtil</code>](#ClientUtil)  

| Param | Type | Description |
| --- | --- | --- |
| [iterable] | <code>Iterable</code> | <p>Entries to fill with</p> |

<a name="InlustrisError"></a>

## InlustrisError ⇐ <code>Error</code>
<p>An error class used to make error throwing universal.</p>

**Kind**: global class  
**Extends**: <code>Error</code>  
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

<a name="Util"></a>

## Util
<p>Internal utility class.</p>

**Kind**: global class  

* [Util](#Util)
    * [new Util()](#new_Util_new)
    * [.isObject(inp)](#Util.isObject) ⇒ <code>boolean</code>
    * [.isPrimitive(inp)](#Util.isPrimitive) ⇒ <code>boolean</code>
    * [.deepClone(source)](#Util.deepClone) ⇒ <code>\*</code>
    * [.mergeDefault(def, given)](#Util.mergeDefault) ⇒ <code>Object</code>
    * [.isClass(inp)](#Util.isClass) ⇒ <code>boolean</code>

<a name="new_Util_new"></a>

### new Util()
<p>This class may not be initialized with new</p>

**Throws**:

- <code>Error</code> 

<a name="Util.isObject"></a>

### Util.isObject(inp) ⇒ <code>boolean</code>
<p>Checks if a value is an <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>.</p>

**Kind**: static method of [<code>Util</code>](#Util)  

| Param | Type | Description |
| --- | --- | --- |
| inp | <code>\*</code> | <p>Input to check</p> |

<a name="Util.isPrimitive"></a>

### Util.isPrimitive(inp) ⇒ <code>boolean</code>
<p>Checks if a value is a <a href="https://developer.mozilla.org/en-US/docs/Glossary/Primitive">primitive</a> type.</p>

**Kind**: static method of [<code>Util</code>](#Util)  

| Param | Type | Description |
| --- | --- | --- |
| inp | <code>\*</code> | <p>Input to check</p> |

<a name="Util.deepClone"></a>

### Util.deepClone(source) ⇒ <code>\*</code>
<p>Deeply clones a value.</p>

**Kind**: static method of [<code>Util</code>](#Util)  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>\*</code> | <p>Value to clone</p> |

<a name="Util.mergeDefault"></a>

### Util.mergeDefault(def, given) ⇒ <code>Object</code>
<p>Merges a given object with a set of defaults.</p>

**Kind**: static method of [<code>Util</code>](#Util)  

| Param | Type | Description |
| --- | --- | --- |
| def | <code>Object</code> | <p>Defaults to add</p> |
| given | <code>Object</code> | <p>Given object to add to</p> |

<a name="Util.isClass"></a>

### Util.isClass(inp) ⇒ <code>boolean</code>
<p>Checks if a given input is a class.</p>

**Kind**: static method of [<code>Util</code>](#Util)  

| Param | Type | Description |
| --- | --- | --- |
| inp | <code>function</code> | <p>The input to check</p> |

<a name="InlustrisPlugin"></a>

## InlustrisPlugin : <code>Object</code>
<p>The required export to load an external plugin</p>

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>The name of the plugin, this will be what's attached to the client</p> |
| loader | <code>function</code> | <p>The loader function, will be called with the [client](#InlustrisClient) as <code>this</code></p> |

<a name="InlustrisOptions"></a>

## InlustrisOptions : [<code>ClientOptions</code>](https://discord.js.org/#/docs/main/master/typedef/ClientOptions)
<p>Options for a new [InlustrisClient](#InlustrisClient)</p>

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [prefix] | <code>string</code> | <p>The prefix to use for commands, can be omitted if the command plugin is disabled</p> |
| token | <code>string</code> | <p>The token to use to log the client in</p> |
| [plugins] | <code>Iterable.&lt;string&gt;</code> | <p>Plugins to load on start, this is the alternate to [use](#InlustrisClient+use)</p> |

