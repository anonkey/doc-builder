## Constants

<dl>
<dt><a href="#mtimeMap">mtimeMap</a> : <code>Object</code></dt>
<dd><p>Hashtable of last modification time by filename</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#watchFileChange">watchFileChange(filePath, rootPath)</a></dt>
<dd><p>Watch a <code>filepath</code> with his subdirectory if it&#39;s a folder</p>
</dd>
</dl>

<a name="mtimeMap"></a>

## mtimeMap : <code>Object</code>
Hashtable of last modification time by filename

**Kind**: global constant  
<a name="watchFileChange"></a>

## watchFileChange(filePath, rootPath)
Watch a `filepath` with his subdirectory if it's a folder

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>String</code> | Filepath to watch |
| rootPath | <code>String</code> | Root path to join with filenames |
| opts.onFileChange | <code>function</code> | Callback called with                                  trigerred filename and status 'accessed' or 'modified' |

