## Classes

<dl>
<dt><a href="#InlustrisClient">InlustrisClient</a> ⇐ <code><a href="https://discord.js.org/#/docs/main/master/class/Client">Client</a></code></dt>
<dd><p>The base client for Inlustris.</p></dd>
<dt><a href="#BaseRegistry">BaseRegistry</a></dt>
<dd></dd>
<dt><a href="#CommandRegistry">CommandRegistry</a> ⇐ <code><a href="#BaseRegistry">BaseRegistry</a></code></dt>
<dd><p>The registry for holding and loading commands.</p></dd>
<dt><a href="#EventRegistry">EventRegistry</a> ⇐ <code><a href="#BaseRegistry">BaseRegistry</a></code></dt>
<dd><p>The event registry for loading events</p></dd>
<dt><a href="#ClientCacheManager">ClientCacheManager</a></dt>
<dd><p>The cache manager for the client.
Only applied if <code>settings</code>, <code>internals</code>, or <code>defaults</code> is a loaded plugin.</p></dd>
<dt><a href="#Base">Base</a></dt>
<dd><p>The base class for all pieces.</p></dd>
<dt><a href="#Command">Command</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Command class for creating commands.</p></dd>
<dt><a href="#Event">Event</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>The event class for creating events.</p></dd>
<dt><a href="#ClientUtil">ClientUtil</a></dt>
<dd><p>Utility methods to use for common tasks.</p></dd>
<dt><a href="#InlustrisError">InlustrisError</a> ⇐ <code>Error</code></dt>
<dd><p>An error class used to make error throwing universal.</p></dd>
<dt><a href="#List">List</a> ⇐ <code>Set</code></dt>
<dd><p>A Set with additional utility methods.</p></dd>
<dt><a href="#Util">Util</a></dt>
<dd><p>Internal utility class.</p></dd>
</dl>

## Members

<dl>
<dt><a href="#_Symbol$species">_Symbol$species</a></dt>
<dd><p>The base registry for all stores to extend.</p></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#InlustrisPlugin">InlustrisPlugin</a> : <code>Object</code></dt>
<dd><p>The required export to load an external plugin</p></dd>
<dt><a href="#InlustrisOptions">InlustrisOptions</a> : <code><a href="https://discord.js.org/#/docs/main/master/typedef/ClientOptions">ClientOptions</a></code></dt>
<dd><p>Options for a new [InlustrisClient](#InlustrisClient)</p></dd>
<dt><a href="#InternalPlugins">InternalPlugins</a> : <code>string</code></dt>
<dd><p>A list of internal plugins. Calling <code>internals</code> or <code>defaults</code> as a loaded plugin
will load all of them.</p>
<ul>
<li><code>util</code> adds client utility methods.</li>
<li><code>settings</code> adds settings to the client (WIP).</li>
</ul></dd>
<dt><a href="#BaseOptions">BaseOptions</a> : <code>Object</code></dt>
<dd><p>The base options for a module</p></dd>
</dl>

<a name="InlustrisClient"></a>

## InlustrisClient ⇐ [<code>Client</code>](https://discord.js.org/#/docs/main/master/class/Client)
<p>The base client for Inlustris.</p>

**Kind**: global class  
**Extends**: [<code>Client</code>](https://discord.js.org/#/docs/main/master/class/Client)  

* [InlustrisClient](#InlustrisClient) ⇐ [<code>Client</code>](https://discord.js.org/#/docs/main/master/class/Client)
    * [new InlustrisClient([options])](#new_InlustrisClient_new)
    * [.util](#InlustrisClient+util) : [<code>ClientUtil</code>](#ClientUtil)
    * [.cache](#InlustrisClient+cache) : [<code>ClientCacheManager</code>](#ClientCacheManager)
    * [.application](#InlustrisClient+application) : [<code>ClientApplication</code>](https://discord.js.org/#/docs/main/master/class/ClientApplication)
    * [.events](#InlustrisClient+events) : [<code>EventRegistry</code>](#EventRegistry)
    * [.loaded](#InlustrisClient+loaded) : <code>boolean</code>
    * [.owners](#InlustrisClient+owners) : [<code>List.&lt;User&gt;</code>](https://discord.js.org/#/docs/main/master/class/User)
    * [.plugins](#InlustrisClient+plugins) : <code>List.&lt;string&gt;</code>
    * [.text](#InlustrisClient+text) : <code>Collection.&lt;string, TextChannel&gt;</code>
    * [.voiceChannels](#InlustrisClient+voiceChannels) : <code>Collection.&lt;string, VoiceChannel&gt;</code>
    * [.news](#InlustrisClient+news) : <code>Collection.&lt;string, NewsChannel&gt;</code>
    * [.store](#InlustrisClient+store) : <code>Collection.&lt;string, StoreChannel&gt;</code>
    * [.category](#InlustrisClient+category) : <code>Collection.&lt;string, CategoryChannel&gt;</code>
    * [.dm](#InlustrisClient+dm) : <code>Collection.&lt;string, DMChannel&gt;</code>
    * [.me](#InlustrisClient+me) : <code>Collection.&lt;string, ?GuildMember&gt;</code>
    * [.fetchApplication()](#InlustrisClient+fetchApplication) ⇒ [<code>Promise.&lt;ClientApplication&gt;</code>](https://discord.js.org/#/docs/main/master/class/ClientApplication)
    * ~~[.login()](#InlustrisClient+login)~~
    * [.start()](#InlustrisClient+start) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.load()](#InlustrisClient+load) ⇒ <code>Promise.&lt;List.&lt;string&gt;&gt;</code>
    * [.use(mod)](#InlustrisClient+use) ⇒ [<code>InlustrisClient</code>](#InlustrisClient)
    * [.isOwner(user)](#InlustrisClient+isOwner) ⇒ <code>boolean</code>
    * ["baseEnabled" (base)](#InlustrisClient+event_baseEnabled)
    * ["baseDisabled" (base)](#InlustrisClient+event_baseDisabled)
    * ["clientReady"](#InlustrisClient+event_clientReady)
    * ["baseUnloaded" (base)](#InlustrisClient+event_baseUnloaded)

<a name="new_InlustrisClient_new"></a>

### new InlustrisClient([options])
<p>Creates a new client.</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | [<code>InlustrisOptions</code>](#InlustrisOptions) | <code>{}</code> | <p>Options to use when loading the client.</p> |

<a name="InlustrisClient+util"></a>

### inlustrisClient.util : [<code>ClientUtil</code>](#ClientUtil)
<p>A [ClientUtil](#ClientUtil) to use, will only be loaded if <code>internals</code>, <code>defaults</code>, or <code>util</code> is specified in [InlustrisOptions#plugins](InlustrisOptions#plugins) or used with [use](#InlustrisClient+use)</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
<a name="InlustrisClient+cache"></a>

### inlustrisClient.cache : [<code>ClientCacheManager</code>](#ClientCacheManager)
<p>The cache manager, will only be loaded if <code>internals</code>, <code>defaults</code>, or <code>util</code> is specified as a plugin to load</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
<a name="InlustrisClient+application"></a>

### inlustrisClient.application : [<code>ClientApplication</code>](https://discord.js.org/#/docs/main/master/class/ClientApplication)
<p>The application of the client</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
<a name="InlustrisClient+events"></a>

### inlustrisClient.events : [<code>EventRegistry</code>](#EventRegistry)
<p>The event registry for all the events</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
**Read only**: true  
<a name="InlustrisClient+loaded"></a>

### inlustrisClient.loaded : <code>boolean</code>
<p>Whether the client has loaded all available plugins</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
<a name="InlustrisClient+owners"></a>

### inlustrisClient.owners : [<code>List.&lt;User&gt;</code>](https://discord.js.org/#/docs/main/master/class/User)
<p>The owners of the client, will only have one until teams support is added</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
**Read only**: true  
<a name="InlustrisClient+plugins"></a>

### inlustrisClient.plugins : <code>List.&lt;string&gt;</code>
<p>The plugins that will be loaded when the client starts</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
**Read only**: true  
<a name="InlustrisClient+text"></a>

### inlustrisClient.text : <code>Collection.&lt;string, TextChannel&gt;</code>
<p>All the text channels the client can see</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
**Read only**: true  
<a name="InlustrisClient+voiceChannels"></a>

### inlustrisClient.voiceChannels : <code>Collection.&lt;string, VoiceChannel&gt;</code>
<p>All the voice channels the client can see (named this was as Client#voice is the <code>ClientVoiceManager</code>)</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
**Read only**: true  
<a name="InlustrisClient+news"></a>

### inlustrisClient.news : <code>Collection.&lt;string, NewsChannel&gt;</code>
<p>All the news channels the client can see</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
**Read only**: true  
<a name="InlustrisClient+store"></a>

### inlustrisClient.store : <code>Collection.&lt;string, StoreChannel&gt;</code>
<p>All the store channels the client can see</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
**Read only**: true  
<a name="InlustrisClient+category"></a>

### inlustrisClient.category : <code>Collection.&lt;string, CategoryChannel&gt;</code>
<p>All the category channels the client can see</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
**Read only**: true  
<a name="InlustrisClient+dm"></a>

### inlustrisClient.dm : <code>Collection.&lt;string, DMChannel&gt;</code>
<p>All the DM channels the client can see</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
**Read only**: true  
<a name="InlustrisClient+me"></a>

### inlustrisClient.me : <code>Collection.&lt;string, ?GuildMember&gt;</code>
<p>A collection of all the <code>Guild#me</code> instances, mapped by Guild ID</p>

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
<a name="InlustrisClient+load"></a>

### inlustrisClient.load() ⇒ <code>Promise.&lt;List.&lt;string&gt;&gt;</code>
<p>Loads all the plugins called in the options or with <code>InlustrisClient#use</code>.</p>

**Kind**: instance method of [<code>InlustrisClient</code>](#InlustrisClient)  
<a name="InlustrisClient+use"></a>

### inlustrisClient.use(mod) ⇒ [<code>InlustrisClient</code>](#InlustrisClient)
<p>Designates a plugin to load, will be loaded on start.</p>

**Kind**: instance method of [<code>InlustrisClient</code>](#InlustrisClient)  

| Param | Type | Description |
| --- | --- | --- |
| mod | <code>string</code> | <p>The name of a plugin to load, will be required if it's external</p> |

<a name="InlustrisClient+isOwner"></a>

### inlustrisClient.isOwner(user) ⇒ <code>boolean</code>
<p>Checks if the given user is an owner of the bot.</p>

**Kind**: instance method of [<code>InlustrisClient</code>](#InlustrisClient)  

| Param | Type | Description |
| --- | --- | --- |
| user | [<code>UserResolvable</code>](https://discord.js.org/#/docs/main/master/typedef/UserResolvable) | <p>The user to check</p> |

<a name="InlustrisClient+event_baseEnabled"></a>

### "baseEnabled" (base)
<p>Emitted when a base is enabled.</p>

**Kind**: event emitted by [<code>InlustrisClient</code>](#InlustrisClient)  

| Param | Type | Description |
| --- | --- | --- |
| base | [<code>Base</code>](#Base) | <p>The base that was enabled</p> |

<a name="InlustrisClient+event_baseDisabled"></a>

### "baseDisabled" (base)
<p>Emitted when a base is disabled.</p>

**Kind**: event emitted by [<code>InlustrisClient</code>](#InlustrisClient)  

| Param | Type | Description |
| --- | --- | --- |
| base | [<code>Base</code>](#Base) | <p>The base that was disabled</p> |

<a name="InlustrisClient+event_clientReady"></a>

### "clientReady"
<p>Emitted when the client is ready. Should be listened to over <code>Client#ready</code>
as Inlustris uses that internallly to initialize the client once Discord data
is ready.</p>

**Kind**: event emitted by [<code>InlustrisClient</code>](#InlustrisClient)  
<a name="InlustrisClient+event_baseUnloaded"></a>

### "baseUnloaded" (base)
<p>Emitted when a base is unloaded.</p>

**Kind**: event emitted by [<code>InlustrisClient</code>](#InlustrisClient)  

| Param | Type | Description |
| --- | --- | --- |
| base | [<code>Base</code>](#Base) | <p>The base that was disabled</p> |

<a name="BaseRegistry"></a>

## BaseRegistry
**Kind**: global class  

* [BaseRegistry](#BaseRegistry)
    * [new BaseRegistry(client, name, holds)](#new_BaseRegistry_new)
    * [.holds](#BaseRegistry+holds) : [<code>InlustrisClient</code>](#InlustrisClient)
    * [.name](#BaseRegistry+name) : <code>string</code>
    * [.holds](#BaseRegistry+holds) : [<code>Base</code>](#Base)
    * [.userDirectory](#BaseRegistry+userDirectory) : <code>string</code>
    * [.registerCoreDirectory(directory)](#BaseRegistry+registerCoreDirectory) ⇒ <code>this</code>
    * [.loadAll()](#BaseRegistry+loadAll) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.load(directory, file)](#BaseRegistry+load) ⇒ [<code>Base</code>](#Base)
    * [.add(base)](#BaseRegistry+add) ⇒ [<code>Base</code>](#Base)

<a name="new_BaseRegistry_new"></a>

### new BaseRegistry(client, name, holds)
<p>Creates a new BaseRegistry.</p>


| Param | Type | Description |
| --- | --- | --- |
| client | [<code>InlustrisClient</code>](#InlustrisClient) | <p>The client</p> |
| name | <code>string</code> | <p>The name of the registry</p> |
| holds | <code>function</code> | <p>The class that the registry will use to create instances</p> |

<a name="BaseRegistry+holds"></a>

### baseRegistry.holds : [<code>InlustrisClient</code>](#InlustrisClient)
<p>The client that this Registry is for</p>

**Kind**: instance property of [<code>BaseRegistry</code>](#BaseRegistry)  
**Read only**: true  
<a name="BaseRegistry+name"></a>

### baseRegistry.name : <code>string</code>
<p>The name of the Registry</p>

**Kind**: instance property of [<code>BaseRegistry</code>](#BaseRegistry)  
**Read only**: true  
<a name="BaseRegistry+holds"></a>

### baseRegistry.holds : [<code>Base</code>](#Base)
<p>What this Registry holds</p>

**Kind**: instance property of [<code>BaseRegistry</code>](#BaseRegistry)  
**Read only**: true  
<a name="BaseRegistry+userDirectory"></a>

### baseRegistry.userDirectory : <code>string</code>
<p>The directory where the bases are found</p>

**Kind**: instance property of [<code>BaseRegistry</code>](#BaseRegistry)  
<a name="BaseRegistry+registerCoreDirectory"></a>

### baseRegistry.registerCoreDirectory(directory) ⇒ <code>this</code>
<p>Registers a core directory.</p>

**Kind**: instance method of [<code>BaseRegistry</code>](#BaseRegistry)  

| Param | Type | Description |
| --- | --- | --- |
| directory | <code>string</code> | <p>The directory to register</p> |

<a name="BaseRegistry+loadAll"></a>

### baseRegistry.loadAll() ⇒ <code>Promise.&lt;number&gt;</code>
<p>Loads all the bases found in the core directories.</p>

**Kind**: instance method of [<code>BaseRegistry</code>](#BaseRegistry)  
<a name="BaseRegistry+load"></a>

### baseRegistry.load(directory, file) ⇒ [<code>Base</code>](#Base)
<p>Loads a base into the registry.</p>

**Kind**: instance method of [<code>BaseRegistry</code>](#BaseRegistry)  

| Param | Type | Description |
| --- | --- | --- |
| directory | <code>string</code> | <p>The directory of the base</p> |
| file | <code>Array.&lt;string&gt;</code> | <p>The file location of the base</p> |

<a name="BaseRegistry+add"></a>

### baseRegistry.add(base) ⇒ [<code>Base</code>](#Base)
<p>Adds a base to the registry.</p>

**Kind**: instance method of [<code>BaseRegistry</code>](#BaseRegistry)  

| Param | Type | Description |
| --- | --- | --- |
| base | [<code>Base</code>](#Base) | <p>The base to be added</p> |

<a name="CommandRegistry"></a>

## CommandRegistry ⇐ [<code>BaseRegistry</code>](#BaseRegistry)
<p>The registry for holding and loading commands.</p>

**Kind**: global class  
**Extends**: [<code>BaseRegistry</code>](#BaseRegistry)  

* [CommandRegistry](#CommandRegistry) ⇐ [<code>BaseRegistry</code>](#BaseRegistry)
    * [.holds](#BaseRegistry+holds) : [<code>InlustrisClient</code>](#InlustrisClient)
    * [.name](#BaseRegistry+name) : <code>string</code>
    * [.userDirectory](#BaseRegistry+userDirectory) : <code>string</code>
    * [.add(base)](#CommandRegistry+add) ⇒ [<code>Command</code>](#Command)
    * [.get(key)](#CommandRegistry+get) ⇒ [<code>Command</code>](#Command)
    * [.has(name)](#CommandRegistry+has) ⇒ <code>boolean</code>
    * [.delete(key)](#CommandRegistry+delete) ⇒ <code>boolean</code>
    * [.clear()](#CommandRegistry+clear) ⇒ <code>void</code>
    * [.registerCoreDirectory(directory)](#BaseRegistry+registerCoreDirectory) ⇒ <code>this</code>
    * [.loadAll()](#BaseRegistry+loadAll) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.load(directory, file)](#BaseRegistry+load) ⇒ [<code>Base</code>](#Base)

<a name="BaseRegistry+holds"></a>

### commandRegistry.holds : [<code>InlustrisClient</code>](#InlustrisClient)
<p>The client that this Registry is for</p>

**Kind**: instance property of [<code>CommandRegistry</code>](#CommandRegistry)  
**Overrides**: [<code>holds</code>](#BaseRegistry+holds)  
**Read only**: true  
<a name="BaseRegistry+name"></a>

### commandRegistry.name : <code>string</code>
<p>The name of the Registry</p>

**Kind**: instance property of [<code>CommandRegistry</code>](#CommandRegistry)  
**Overrides**: [<code>name</code>](#BaseRegistry+name)  
**Read only**: true  
<a name="BaseRegistry+userDirectory"></a>

### commandRegistry.userDirectory : <code>string</code>
<p>The directory where the bases are found</p>

**Kind**: instance property of [<code>CommandRegistry</code>](#CommandRegistry)  
**Overrides**: [<code>userDirectory</code>](#BaseRegistry+userDirectory)  
<a name="CommandRegistry+add"></a>

### commandRegistry.add(base) ⇒ [<code>Command</code>](#Command)
<p>Adds a Command to the registry, and it's aliases.</p>

**Kind**: instance method of [<code>CommandRegistry</code>](#CommandRegistry)  
**Overrides**: [<code>add</code>](#BaseRegistry+add)  

| Param | Type | Description |
| --- | --- | --- |
| base | [<code>Command</code>](#Command) | <p>The command to add</p> |

<a name="CommandRegistry+get"></a>

### commandRegistry.get(key) ⇒ [<code>Command</code>](#Command)
<p>Gets a command by ID or an alias.</p>

**Kind**: instance method of [<code>CommandRegistry</code>](#CommandRegistry)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>The command ID or alias</p> |

<a name="CommandRegistry+has"></a>

### commandRegistry.has(name) ⇒ <code>boolean</code>
<p>Whether or not an ID or alias is in the command registry.</p>

**Kind**: instance method of [<code>CommandRegistry</code>](#CommandRegistry)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>The ID or an alias of the command</p> |

<a name="CommandRegistry+delete"></a>

### commandRegistry.delete(key) ⇒ <code>boolean</code>
<p>Deletes a command from the registry, and clears it's aliases.</p>

**Kind**: instance method of [<code>CommandRegistry</code>](#CommandRegistry)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>The ID or an alias of the command</p> |

<a name="CommandRegistry+clear"></a>

### commandRegistry.clear() ⇒ <code>void</code>
<p>Clears the registry and the aliases.</p>

**Kind**: instance method of [<code>CommandRegistry</code>](#CommandRegistry)  
<a name="BaseRegistry+registerCoreDirectory"></a>

### commandRegistry.registerCoreDirectory(directory) ⇒ <code>this</code>
<p>Registers a core directory.</p>

**Kind**: instance method of [<code>CommandRegistry</code>](#CommandRegistry)  
**Overrides**: [<code>registerCoreDirectory</code>](#BaseRegistry+registerCoreDirectory)  

| Param | Type | Description |
| --- | --- | --- |
| directory | <code>string</code> | <p>The directory to register</p> |

<a name="BaseRegistry+loadAll"></a>

### commandRegistry.loadAll() ⇒ <code>Promise.&lt;number&gt;</code>
<p>Loads all the bases found in the core directories.</p>

**Kind**: instance method of [<code>CommandRegistry</code>](#CommandRegistry)  
**Overrides**: [<code>loadAll</code>](#BaseRegistry+loadAll)  
<a name="BaseRegistry+load"></a>

### commandRegistry.load(directory, file) ⇒ [<code>Base</code>](#Base)
<p>Loads a base into the registry.</p>

**Kind**: instance method of [<code>CommandRegistry</code>](#CommandRegistry)  
**Overrides**: [<code>load</code>](#BaseRegistry+load)  

| Param | Type | Description |
| --- | --- | --- |
| directory | <code>string</code> | <p>The directory of the base</p> |
| file | <code>Array.&lt;string&gt;</code> | <p>The file location of the base</p> |

<a name="EventRegistry"></a>

## EventRegistry ⇐ [<code>BaseRegistry</code>](#BaseRegistry)
<p>The event registry for loading events</p>

**Kind**: global class  
**Extends**: [<code>BaseRegistry</code>](#BaseRegistry)  

* [EventRegistry](#EventRegistry) ⇐ [<code>BaseRegistry</code>](#BaseRegistry)
    * [.holds](#BaseRegistry+holds) : [<code>InlustrisClient</code>](#InlustrisClient)
    * [.name](#BaseRegistry+name) : <code>string</code>
    * [.userDirectory](#BaseRegistry+userDirectory) : <code>string</code>
    * [.load(directory, file)](#EventRegistry+load) ⇒ [<code>Event</code>](#Event)
    * [.clear()](#EventRegistry+clear) ⇒ <code>void</code>
    * [.delete(id)](#EventRegistry+delete) ⇒ <code>boolean</code>
    * [.add(base)](#EventRegistry+add) ⇒ [<code>Event</code>](#Event)
    * [.registerCoreDirectory(directory)](#BaseRegistry+registerCoreDirectory) ⇒ <code>this</code>
    * [.loadAll()](#BaseRegistry+loadAll) ⇒ <code>Promise.&lt;number&gt;</code>

<a name="BaseRegistry+holds"></a>

### eventRegistry.holds : [<code>InlustrisClient</code>](#InlustrisClient)
<p>The client that this Registry is for</p>

**Kind**: instance property of [<code>EventRegistry</code>](#EventRegistry)  
**Overrides**: [<code>holds</code>](#BaseRegistry+holds)  
**Read only**: true  
<a name="BaseRegistry+name"></a>

### eventRegistry.name : <code>string</code>
<p>The name of the Registry</p>

**Kind**: instance property of [<code>EventRegistry</code>](#EventRegistry)  
**Overrides**: [<code>name</code>](#BaseRegistry+name)  
**Read only**: true  
<a name="BaseRegistry+userDirectory"></a>

### eventRegistry.userDirectory : <code>string</code>
<p>The directory where the bases are found</p>

**Kind**: instance property of [<code>EventRegistry</code>](#EventRegistry)  
**Overrides**: [<code>userDirectory</code>](#BaseRegistry+userDirectory)  
<a name="EventRegistry+load"></a>

### eventRegistry.load(directory, file) ⇒ [<code>Event</code>](#Event)
<p>Loads the event, and checks if it's already been ran.</p>

**Kind**: instance method of [<code>EventRegistry</code>](#EventRegistry)  
**Overrides**: [<code>load</code>](#BaseRegistry+load)  

| Param | Type | Description |
| --- | --- | --- |
| directory | <code>string</code> | <p>The directory to load from</p> |
| file | <code>Array.&lt;string&gt;</code> | <p>The file location of the event</p> |

<a name="EventRegistry+clear"></a>

### eventRegistry.clear() ⇒ <code>void</code>
<p>Clears the events.</p>

**Kind**: instance method of [<code>EventRegistry</code>](#EventRegistry)  
<a name="EventRegistry+delete"></a>

### eventRegistry.delete(id) ⇒ <code>boolean</code>
<p>Unlistens to and deletes an event.</p>

**Kind**: instance method of [<code>EventRegistry</code>](#EventRegistry)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>The ID of the event</p> |

<a name="EventRegistry+add"></a>

### eventRegistry.add(base) ⇒ [<code>Event</code>](#Event)
<p>Adds an event to the registry, and attaches it to an event emitter.</p>

**Kind**: instance method of [<code>EventRegistry</code>](#EventRegistry)  
**Overrides**: [<code>add</code>](#BaseRegistry+add)  

| Param | Type | Description |
| --- | --- | --- |
| base | [<code>Event</code>](#Event) | <p>The event to load</p> |

<a name="BaseRegistry+registerCoreDirectory"></a>

### eventRegistry.registerCoreDirectory(directory) ⇒ <code>this</code>
<p>Registers a core directory.</p>

**Kind**: instance method of [<code>EventRegistry</code>](#EventRegistry)  
**Overrides**: [<code>registerCoreDirectory</code>](#BaseRegistry+registerCoreDirectory)  

| Param | Type | Description |
| --- | --- | --- |
| directory | <code>string</code> | <p>The directory to register</p> |

<a name="BaseRegistry+loadAll"></a>

### eventRegistry.loadAll() ⇒ <code>Promise.&lt;number&gt;</code>
<p>Loads all the bases found in the core directories.</p>

**Kind**: instance method of [<code>EventRegistry</code>](#EventRegistry)  
**Overrides**: [<code>loadAll</code>](#BaseRegistry+loadAll)  
<a name="ClientCacheManager"></a>

## ClientCacheManager
<p>The cache manager for the client.
Only applied if <code>settings</code>, <code>internals</code>, or <code>defaults</code> is a loaded plugin.</p>

**Kind**: global class  

* [ClientCacheManager](#ClientCacheManager)
    * [new ClientCacheManager(client)](#new_ClientCacheManager_new)
    * [.client](#ClientCacheManager+client) : [<code>InlustrisClient</code>](#InlustrisClient)
    * [.cache](#ClientCacheManager+cache) : <code>Collection.&lt;string, any&gt;</code>
    * [.keys()](#ClientCacheManager+keys)
    * [.values()](#ClientCacheManager+values)
    * [.set(key, val)](#ClientCacheManager+set) ⇒ [<code>ClientCacheManager</code>](#ClientCacheManager)
    * [.has(key)](#ClientCacheManager+has) ⇒ <code>boolean</code>
    * [.get(key, [defaultVal])](#ClientCacheManager+get) ⇒ <code>any</code>
    * [.delete(key, [preserve])](#ClientCacheManager+delete) ⇒ <code>boolean</code>
    * [._Symbol$iterator()](#ClientCacheManager+_Symbol$iterator)

<a name="new_ClientCacheManager_new"></a>

### new ClientCacheManager(client)

| Param | Type |
| --- | --- |
| client | [<code>InlustrisClient</code>](#InlustrisClient) | 

<a name="ClientCacheManager+client"></a>

### clientCacheManager.client : [<code>InlustrisClient</code>](#InlustrisClient)
<p>The client</p>

**Kind**: instance property of [<code>ClientCacheManager</code>](#ClientCacheManager)  
**Read only**: true  
<a name="ClientCacheManager+cache"></a>

### clientCacheManager.cache : <code>Collection.&lt;string, any&gt;</code>
<p>The cache that is managed</p>

**Kind**: instance property of [<code>ClientCacheManager</code>](#ClientCacheManager)  
**Read only**: true  
<a name="ClientCacheManager+keys"></a>

### clientCacheManager.keys()
<p>An iterable keys object.</p>

**Kind**: instance method of [<code>ClientCacheManager</code>](#ClientCacheManager)  
<a name="ClientCacheManager+values"></a>

### clientCacheManager.values()
<p>An iterable values object.</p>

**Kind**: instance method of [<code>ClientCacheManager</code>](#ClientCacheManager)  
<a name="ClientCacheManager+set"></a>

### clientCacheManager.set(key, val) ⇒ [<code>ClientCacheManager</code>](#ClientCacheManager)
<p>Sets a key and value.</p>

**Kind**: instance method of [<code>ClientCacheManager</code>](#ClientCacheManager)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>A key to be added</p> |
| val | <code>any</code> | <p>A value to be added</p> |

<a name="ClientCacheManager+has"></a>

### clientCacheManager.has(key) ⇒ <code>boolean</code>
<p>Whether a key is located in the cache.</p>

**Kind**: instance method of [<code>ClientCacheManager</code>](#ClientCacheManager)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>The key to check for</p> |

<a name="ClientCacheManager+get"></a>

### clientCacheManager.get(key, [defaultVal]) ⇒ <code>any</code>
<p>Gets a value, and sets the default if the value isn't found.</p>

**Kind**: instance method of [<code>ClientCacheManager</code>](#ClientCacheManager)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>The key to get</p> |
| [defaultVal] | <code>any</code> | <p>The default value to set</p> |

<a name="ClientCacheManager+delete"></a>

### clientCacheManager.delete(key, [preserve]) ⇒ <code>boolean</code>
<p>Deletes a key from the settings.</p>

**Kind**: instance method of [<code>ClientCacheManager</code>](#ClientCacheManager)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> |  | <p>The key to delete</p> |
| [preserve] | <code>boolean</code> | <code>true</code> | <p>Whether to preserve the key in the keys list</p> |

<a name="ClientCacheManager+_Symbol$iterator"></a>

### clientCacheManager.\_Symbol$iterator()
<p>Yields the <code>ClientCacheManager#values</code> generator.</p>

**Kind**: instance method of [<code>ClientCacheManager</code>](#ClientCacheManager)  
<a name="Base"></a>

## *Base*
<p>The base class for all pieces.</p>

**Kind**: global abstract class  

* *[Base](#Base)*
    * *[new Base(client, [options])](#new_Base_new)*
    * *[.client](#Base+client) : [<code>InlustrisClient</code>](#InlustrisClient)*
    * *[.options](#Base+options) : [<code>BaseOptions</code>](#BaseOptions)*
    * *[.registry](#Base+registry) : <code>BaseStore</code>*
    * *[.id](#Base+id) : <code>string</code>*
    * *[.enabled](#Base+enabled) : <code>boolean</code>*
    * *[.enable()](#Base+enable) ⇒ [<code>Base</code>](#Base)*
    * *[.disable()](#Base+disable) ⇒ [<code>Base</code>](#Base)*
    * *[.unload()](#Base+unload) ⇒ <code>void</code>*

<a name="new_Base_new"></a>

### *new Base(client, [options])*
<p>Initializes a new Base.</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| client | [<code>InlustrisClient</code>](#InlustrisClient) |  | <p>The Client for the Base</p> |
| [options] | [<code>BaseOptions</code>](#BaseOptions) | <code>{id:&#x27;&#x27;}</code> | <p>The base options</p> |

<a name="Base+client"></a>

### *base.client : [<code>InlustrisClient</code>](#InlustrisClient)*
<p>The client that initialized this base</p>

**Kind**: instance property of [<code>Base</code>](#Base)  
**Read only**: true  
<a name="Base+options"></a>

### *base.options : [<code>BaseOptions</code>](#BaseOptions)*
<p>The options for this base</p>

**Kind**: instance property of [<code>Base</code>](#Base)  
**Read only**: true  
<a name="Base+registry"></a>

### *base.registry : <code>BaseStore</code>*
<p>The Registry that holds this base</p>

**Kind**: instance property of [<code>Base</code>](#Base)  
**Read only**: true  
<a name="Base+id"></a>

### *base.id : <code>string</code>*
<p>The ID of this base</p>

**Kind**: instance property of [<code>Base</code>](#Base)  
**Read only**: true  
<a name="Base+enabled"></a>

### *base.enabled : <code>boolean</code>*
<p>Whether this base is enabled</p>

**Kind**: instance property of [<code>Base</code>](#Base)  
<a name="Base+enable"></a>

### *base.enable() ⇒ [<code>Base</code>](#Base)*
<p>Enables the base. Shortcut for <code>&lt;base&gt;.enabled = true</code>.</p>

**Kind**: instance method of [<code>Base</code>](#Base)  
**Chainable**  
**Emits**: [<code>baseEnabled</code>](#InlustrisClient+event_baseEnabled)  
<a name="Base+disable"></a>

### *base.disable() ⇒ [<code>Base</code>](#Base)*
<p>Disables the base. Shortcut for <code>&lt;base&gt;.enabled = false</code>.</p>

**Kind**: instance method of [<code>Base</code>](#Base)  
**Chainable**  
**Emits**: [<code>baseDisabled</code>](#InlustrisClient+event_baseDisabled)  
<a name="Base+unload"></a>

### *base.unload() ⇒ <code>void</code>*
<p>Unloads the base, and deletes it from the registry.</p>

**Kind**: instance method of [<code>Base</code>](#Base)  
**Emits**: [<code>baseUnloaded</code>](#InlustrisClient+event_baseUnloaded)  
<a name="Command"></a>

## Command ⇐ [<code>Base</code>](#Base)
<p>Command class for creating commands.</p>

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [Command](#Command) ⇐ [<code>Base</code>](#Base)
    * [.client](#Base+client) : [<code>InlustrisClient</code>](#InlustrisClient)
    * [.options](#Base+options) : [<code>BaseOptions</code>](#BaseOptions)
    * [.registry](#Base+registry) : <code>BaseStore</code>
    * [.id](#Base+id) : <code>string</code>
    * [.enabled](#Base+enabled) : <code>boolean</code>
    * *[.args()](#Command+args)*
    * [.enable()](#Base+enable) ⇒ [<code>Base</code>](#Base)
    * [.disable()](#Base+disable) ⇒ [<code>Base</code>](#Base)
    * [.unload()](#Base+unload) ⇒ <code>void</code>

<a name="Base+client"></a>

### command.client : [<code>InlustrisClient</code>](#InlustrisClient)
<p>The client that initialized this base</p>

**Kind**: instance property of [<code>Command</code>](#Command)  
**Overrides**: [<code>client</code>](#Base+client)  
**Read only**: true  
<a name="Base+options"></a>

### command.options : [<code>BaseOptions</code>](#BaseOptions)
<p>The options for this base</p>

**Kind**: instance property of [<code>Command</code>](#Command)  
**Overrides**: [<code>options</code>](#Base+options)  
**Read only**: true  
<a name="Base+registry"></a>

### command.registry : <code>BaseStore</code>
<p>The Registry that holds this base</p>

**Kind**: instance property of [<code>Command</code>](#Command)  
**Overrides**: [<code>registry</code>](#Base+registry)  
**Read only**: true  
<a name="Base+id"></a>

### command.id : <code>string</code>
<p>The ID of this base</p>

**Kind**: instance property of [<code>Command</code>](#Command)  
**Overrides**: [<code>id</code>](#Base+id)  
**Read only**: true  
<a name="Base+enabled"></a>

### command.enabled : <code>boolean</code>
<p>Whether this base is enabled</p>

**Kind**: instance property of [<code>Command</code>](#Command)  
**Overrides**: [<code>enabled</code>](#Base+enabled)  
<a name="Command+args"></a>

### *command.args()*
<p>Abstract argument generator, needs to be used if arguments are needed with commands.</p>

**Kind**: instance abstract method of [<code>Command</code>](#Command)  
<a name="Base+enable"></a>

### command.enable() ⇒ [<code>Base</code>](#Base)
<p>Enables the base. Shortcut for <code>&lt;base&gt;.enabled = true</code>.</p>

**Kind**: instance method of [<code>Command</code>](#Command)  
**Chainable**  
**Overrides**: [<code>enable</code>](#Base+enable)  
**Emits**: [<code>baseEnabled</code>](#InlustrisClient+event_baseEnabled)  
<a name="Base+disable"></a>

### command.disable() ⇒ [<code>Base</code>](#Base)
<p>Disables the base. Shortcut for <code>&lt;base&gt;.enabled = false</code>.</p>

**Kind**: instance method of [<code>Command</code>](#Command)  
**Chainable**  
**Overrides**: [<code>disable</code>](#Base+disable)  
**Emits**: [<code>baseDisabled</code>](#InlustrisClient+event_baseDisabled)  
<a name="Base+unload"></a>

### command.unload() ⇒ <code>void</code>
<p>Unloads the base, and deletes it from the registry.</p>

**Kind**: instance method of [<code>Command</code>](#Command)  
**Overrides**: [<code>unload</code>](#Base+unload)  
**Emits**: [<code>baseUnloaded</code>](#InlustrisClient+event_baseUnloaded)  
<a name="Event"></a>

## Event ⇐ [<code>Base</code>](#Base)
<p>The event class for creating events.</p>

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [Event](#Event) ⇐ [<code>Base</code>](#Base)
    * [.event](#Event+event) : <code>string</code>
    * [.once](#Event+once) : <code>boolean</code>
    * [.client](#Base+client) : [<code>InlustrisClient</code>](#InlustrisClient)
    * [.options](#Base+options) : [<code>BaseOptions</code>](#BaseOptions)
    * [.registry](#Base+registry) : <code>BaseStore</code>
    * [.id](#Base+id) : <code>string</code>
    * [.enabled](#Base+enabled) : <code>boolean</code>
    * [.enable()](#Event+enable) ⇒ [<code>Event</code>](#Event)
    * [.disable()](#Event+disable) ⇒ [<code>Event</code>](#Event)
    * [.unload()](#Base+unload) ⇒ <code>void</code>

<a name="Event+event"></a>

### event.event : <code>string</code>
<p>The event this base listens to</p>

**Kind**: instance property of [<code>Event</code>](#Event)  
**Read only**: true  
<a name="Event+once"></a>

### event.once : <code>boolean</code>
<p>Whether this event is emitted once or not</p>

**Kind**: instance property of [<code>Event</code>](#Event)  
**Read only**: true  
<a name="Base+client"></a>

### event.client : [<code>InlustrisClient</code>](#InlustrisClient)
<p>The client that initialized this base</p>

**Kind**: instance property of [<code>Event</code>](#Event)  
**Overrides**: [<code>client</code>](#Base+client)  
**Read only**: true  
<a name="Base+options"></a>

### event.options : [<code>BaseOptions</code>](#BaseOptions)
<p>The options for this base</p>

**Kind**: instance property of [<code>Event</code>](#Event)  
**Overrides**: [<code>options</code>](#Base+options)  
**Read only**: true  
<a name="Base+registry"></a>

### event.registry : <code>BaseStore</code>
<p>The Registry that holds this base</p>

**Kind**: instance property of [<code>Event</code>](#Event)  
**Overrides**: [<code>registry</code>](#Base+registry)  
**Read only**: true  
<a name="Base+id"></a>

### event.id : <code>string</code>
<p>The ID of this base</p>

**Kind**: instance property of [<code>Event</code>](#Event)  
**Overrides**: [<code>id</code>](#Base+id)  
**Read only**: true  
<a name="Base+enabled"></a>

### event.enabled : <code>boolean</code>
<p>Whether this base is enabled</p>

**Kind**: instance property of [<code>Event</code>](#Event)  
**Overrides**: [<code>enabled</code>](#Base+enabled)  
<a name="Event+enable"></a>

### event.enable() ⇒ [<code>Event</code>](#Event)
<p>Enables the event, and adds the listener to the event emitter.</p>

**Kind**: instance method of [<code>Event</code>](#Event)  
**Chainable**  
**Overrides**: [<code>enable</code>](#Base+enable)  
**Emits**: [<code>baseEnabled</code>](#InlustrisClient+event_baseEnabled)  
<a name="Event+disable"></a>

### event.disable() ⇒ [<code>Event</code>](#Event)
<p>Disables the event, and removes the listener from the event emitter.</p>

**Kind**: instance method of [<code>Event</code>](#Event)  
**Chainable**  
**Overrides**: [<code>disable</code>](#Base+disable)  
**Emits**: [<code>baseDisabled</code>](#InlustrisClient+event_baseDisabled)  
<a name="Base+unload"></a>

### event.unload() ⇒ <code>void</code>
<p>Unloads the base, and deletes it from the registry.</p>

**Kind**: instance method of [<code>Event</code>](#Event)  
**Overrides**: [<code>unload</code>](#Base+unload)  
**Emits**: [<code>baseUnloaded</code>](#InlustrisClient+event_baseUnloaded)  
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
    * [.isThenable(input)](#Util.isThenable) ⇒ <code>boolean</code>
    * [.isFunction(input)](#Util.isFunction) ⇒ <code>boolean</code>

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

<a name="Util.isThenable"></a>

### Util.isThenable(input) ⇒ <code>boolean</code>
<p>Checks if a given input is a Promise.</p>

**Kind**: static method of [<code>Util</code>](#Util)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Promise</code> | <p>The input to check</p> |

<a name="Util.isFunction"></a>

### Util.isFunction(input) ⇒ <code>boolean</code>
<p>Checks if the given input is a Function.</p>

**Kind**: static method of [<code>Util</code>](#Util)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>function</code> | <p>The input to check</p> |

<a name="_Symbol$species"></a>

## *\_Symbol$species*
<p>The base registry for all stores to extend.</p>

**Kind**: global abstract variable  
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

<a name="InternalPlugins"></a>

## InternalPlugins : <code>string</code>
<p>A list of internal plugins. Calling <code>internals</code> or <code>defaults</code> as a loaded plugin
will load all of them.</p>
<ul>
<li><code>util</code> adds client utility methods.</li>
<li><code>settings</code> adds settings to the client (WIP).</li>
</ul>

**Kind**: global typedef  
<a name="BaseOptions"></a>

## BaseOptions : <code>Object</code>
<p>The base options for a module</p>

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>The ID of the module</p> |
| enabled | <code>boolean</code> | <p>Whether the module should be enabled on startup</p> |

