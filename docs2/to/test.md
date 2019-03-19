## Constants

<dl>
<dt><a href="#mtimeMap">mtimeMap</a> : <code>Object</code></dt>
<dd><p>Hashtable of last modification time by filename</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getFilename">getFilename(path)</a> ⇒ <code>String</code></dt>
<dd><p>Get last part of a &#39;/&#39; or &#39;\&#39; separated path</p>
</dd>
<dt><a href="#removeExt">removeExt(name)</a> ⇒ <code>String</code></dt>
<dd><p>remove extension of a filename</p>
</dd>
<dt><a href="#protectedJoin">protectedJoin(startPath, endPath)</a> ⇒ <code>String</code></dt>
<dd><p>Join two path won&#39;t fail if one is null</p>
</dd>
<dt><a href="#getPathsOrPath">getPathsOrPath(path)</a> ⇒ <code>Array.&lt;String&gt;</code> | <code>String</code></dt>
<dd><p>Return array of filePath in <code>path</code></p>
</dd>
<dt><a href="#addFileIfExist">addFileIfExist(array, path, data)</a></dt>
<dd><p>Push <code>data</code> or <code>path</code> in <code>array</code> if path exist</p>
</dd>
<dt><a href="#createDirectoryIfNotExist">createDirectoryIfNotExist(path)</a></dt>
<dd><p>Create a directory if it isn&#39;t already</p>
</dd>
<dt><a href="#watchFileChange">watchFileChange(filePath, rootPath)</a></dt>
<dd><p>Watch a <code>filepath</code> with his subdirectory if it&#39;s a folder</p>
</dd>
</dl>

<a name="mtimeMap"></a>

## mtimeMap : <code>Object</code>
Hashtable of last modification time by filename

**Kind**: global constant  
<a name="getFilename"></a>

## getFilename(path) ⇒ <code>String</code>
Get last part of a '/' or '\' separated path

**Kind**: global function  
**Returns**: <code>String</code> - last part of the path  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | file path |

<a name="removeExt"></a>

## removeExt(name) ⇒ <code>String</code>
remove extension of a filename

**Kind**: global function  
**Returns**: <code>String</code> - filename without ext  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | filename |

<a name="protectedJoin"></a>

## protectedJoin(startPath, endPath) ⇒ <code>String</code>
Join two path won't fail if one is null

**Kind**: global function  
**Returns**: <code>String</code> - Joined paths  

| Param | Type | Description |
| --- | --- | --- |
| startPath | <code>String</code> | Start of the new path |
| endPath | <code>String</code> | End of the new path |

<a name="getPathsOrPath"></a>

## getPathsOrPath(path) ⇒ <code>Array.&lt;String&gt;</code> \| <code>String</code>
Return array of filePath in `path`

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> \| <code>String</code> - array of filePaths in `path` or `path` if it isn't a directory or
                               return null if file can't be accessed  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | file path |

<a name="addFileIfExist"></a>

## addFileIfExist(array, path, data)
Push `data` or `path` in `array` if path exist

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | Any Array-like object |
| path | <code>String</code> | path on which test existence |
| data | <code>Any</code> | Data to push in the array |

<a name="createDirectoryIfNotExist"></a>

## createDirectoryIfNotExist(path)
Create a directory if it isn't already

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | [description] |

<a name="watchFileChange"></a>

## watchFileChange(filePath, rootPath)
Watch a `filepath` with his subdirectory if it's a folder

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>String</code> | Filepath to watch |
| rootPath | <code>String</code> | Root path to join with filenames |
| opts.onFileChange | <code>function</code> | Callback called with                                  trigerred filename and status 'accessed' or 'modified' |

