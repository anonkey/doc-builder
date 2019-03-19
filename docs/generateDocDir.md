## Functions

<dl>
<dt><a href="#generateDocDir">generateDocDir(filePaths, docPath, [opts])</a></dt>
<dd><p>Generate a doc directory</p>
</dd>
<dt><a href="#getFilesList">getFilesList(inputPaths, rootPath, type, filter)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Get the list of absolute file paths to process</p>
</dd>
<dt><a href="#tocGenerator">tocGenerator(toc, callback)</a> ⇒ <code>function</code></dt>
<dd><p>Generate table of content for documentation generated</p>
</dd>
<dt><a href="#watcher">watcher(filter, ext, callback)</a> ⇒ <code>function</code></dt>
<dd><p>Watch source file and regenerate doc for this file on changes</p>
</dd>
<dt><a href="#generateDocsDir">generateDocsDir(configs, [opts])</a></dt>
<dd><p>Generate doc directories according to <code>configs</code></p>
</dd>
</dl>

<a name="generateDocDir"></a>

## generateDocDir(filePaths, docPath, [opts])
Generate a doc directory

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filePaths | <code>String</code> \| <code>Array.&lt;String&gt;</code> \| <code>Object</code> | Path(s) from where generate the doc |
| docPath | <code>String</code> | Doc folder for the type |
| [opts] | <code>Object</code> | `generateDocs` opts |

<a name="getFilesList"></a>

## getFilesList(inputPaths, rootPath, type, filter) ⇒ <code>Array.&lt;String&gt;</code>
Get the list of absolute file paths to process

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - File paths to process  

| Param | Type | Description |
| --- | --- | --- |
| inputPaths | <code>String</code> | Paths to process |
| rootPath | <code>String</code> | Path to join with every path |
| type | <code>String</code> | 'oneFilePerFile' will add every folder                                              and every `filter` matching file                                             - 'oneFilePerFileOrFolder' will add all folders                                              and all `filter` matching file which doesn't have                                              a same named folder in the list |
| filter | <code>String</code> \| <code>RegExp</code> | Regular file filter on name |

<a name="tocGenerator"></a>

## tocGenerator(toc, callback) ⇒ <code>function</code>
Generate table of content for documentation generated

**Kind**: global function  
**Returns**: <code>function</code> - handler for onGenerateSuccess  

| Param | Type | Description |
| --- | --- | --- |
| toc | <code>Array.&lt;String&gt;</code> | Array - like object where push the toc's lines |
| callback | <code>function</code> | callback for handlers chaining |

<a name="watcher"></a>

## watcher(filter, ext, callback) ⇒ <code>function</code>
Watch source file and regenerate doc for this file on changes

**Kind**: global function  
**Returns**: <code>function</code> - handler for onGenerateSuccess  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>String</code> \| <code>Regex</code> | filename filter |
| ext | <code>String</code> | files extension's for fileAndFolder option |
| callback | <code>function</code> | callback for handlers chaining |

<a name="generateDocsDir"></a>

## generateDocsDir(configs, [opts])
Generate doc directories according to `configs`

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| configs | <code>Array.&lt;Object&gt;</code> |  | Configs for directory where extract doc |
| [opts] | <code>Object</code> | <code>{}</code> | [description] |

