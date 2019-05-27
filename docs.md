## Classes

<dl>
<dt><a href="#InlustrisClient">InlustrisClient</a> ⇐ <code><a href="https://discord.js.org/#/docs/main/master/class/Client">Client</a></code></dt>
<dd><p>The base client for Inlustris.</p></dd>
<dt><a href="#ClientUtil">ClientUtil</a></dt>
<dd><p>Utility methods to use for common tasks.</p></dd>
<dt><a href="#InlustrisError">InlustrisError</a> ⇐ <code>Error</code></dt>
<dd><p>An error class used to make error throwing universal.</p></dd>
<dt><a href="#List">List</a> ⇐ <code>Set</code></dt>
<dd><p>A Set with additional utility methods.</p></dd>
<dt><a href="#Util">Util</a></dt>
<dd><p>Internal utility class</p></dd>
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
<p>Internal utility class</p>

**Kind**: global class  

* [Util](#Util)
    * [.isObject(inp)](#Util.isObject) ⇒ <code>boolean</code>
    * [.isPrimitive(inp)](#Util.isPrimitive) ⇒ <code>boolean</code>
    * [.deepClone(source)](#Util.deepClone) ⇒ <code>\*</code>
    * [.mergeDefault(def, given)](#Util.mergeDefault) ⇒ <code>Object</code>

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

