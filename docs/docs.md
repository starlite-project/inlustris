## Classes

<dl>
<dt><a href="#InlustrisClient">InlustrisClient</a> ⇐ <code><a href="https://discord.js.org/#/docs/main/master/class/Client">Client</a></code></dt>
<dd><p>The base client for Inlustris.</p></dd>
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
</dl>

<a name="InlustrisClient"></a>

## InlustrisClient ⇐ [<code>Client</code>](https://discord.js.org/#/docs/main/master/class/Client)
<p>The base client for Inlustris.</p>

**Kind**: global class  
**Extends**: [<code>Client</code>](https://discord.js.org/#/docs/main/master/class/Client)  

* [InlustrisClient](#InlustrisClient) ⇐ [<code>Client</code>](https://discord.js.org/#/docs/main/master/class/Client)
    * [new InlustrisClient([options])](#new_InlustrisClient_new)
    * [.util](#InlustrisClient+util) : <code>ClientUtil</code>
    * [.cache](#InlustrisClient+cache) : <code>ClientCacheManager</code>
    * [.application](#InlustrisClient+application) : [<code>ClientApplication</code>](https://discord.js.org/#/docs/main/master/class/ClientApplication)
    * [.events](#InlustrisClient+events) : <code>EventRegistry</code>
    * [.owners](#InlustrisClient+owners) : <code>List.&lt;external:User&gt;</code>
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

### inlustrisClient.util : <code>ClientUtil</code>
<p>A [ClientUtil](ClientUtil) to use, will only be loaded if <code>internals</code>, <code>defaults</code>, or <code>util</code> is specified in [InlustrisOptions#plugins](InlustrisOptions#plugins) or used with [use](#InlustrisClient+use)</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
<a name="InlustrisClient+cache"></a>

### inlustrisClient.cache : <code>ClientCacheManager</code>
<p>The cache manager, will only be loaded if <code>internals</code>, <code>defaults</code>, or <code>util</code> is specified as a plugin to load</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
<a name="InlustrisClient+application"></a>

### inlustrisClient.application : [<code>ClientApplication</code>](https://discord.js.org/#/docs/main/master/class/ClientApplication)
<p>The application of the client</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
<a name="InlustrisClient+events"></a>

### inlustrisClient.events : <code>EventRegistry</code>
<p>The event registry for all the events</p>

**Kind**: instance property of [<code>InlustrisClient</code>](#InlustrisClient)  
**Read only**: true  
<a name="InlustrisClient+owners"></a>

### inlustrisClient.owners : <code>List.&lt;external:User&gt;</code>
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

- <code>InlustrisError</code> 

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
| base | <code>Base</code> | <p>The base that was enabled</p> |

<a name="InlustrisClient+event_baseDisabled"></a>

### "baseDisabled" (base)
<p>Emitted when a base is disabled.</p>

**Kind**: event emitted by [<code>InlustrisClient</code>](#InlustrisClient)  

| Param | Type | Description |
| --- | --- | --- |
| base | <code>Base</code> | <p>The base that was disabled</p> |

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
| base | <code>Base</code> | <p>The base that was disabled</p> |

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
