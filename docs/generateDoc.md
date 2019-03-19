## Functions

<dl>
<dt><a href="#createDocFile">createDocFile(path, outputPath)</a> ⇒ <code>String</code></dt>
<dd><p>Generate a doc file from <code>path</code> file(s) to <code>outputPath</code></p>
</dd>
<dt><a href="#generateDoc">generateDoc(filename, outputPath)</a> ⇒ <code>String</code></dt>
<dd><p>Apply the opts.rootPath if exists, generate the .md file path and call createDocFile with</p>
</dd>
<dt><a href="#generateDocs">generateDocs(filePaths, outputPath, opts)</a></dt>
<dd><p>Generate the doc for a path / array of paths / object of paths</p>
</dd>
</dl>

<a name="createDocFile"></a>

## createDocFile(path, outputPath) ⇒ <code>String</code>
Generate a doc file from `path` file(s) to `outputPath`

**Kind**: global function  
**Returns**: <code>String</code> - Generated doc  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>String</code> |  | Path to explore for generating doc |
| outputPath | <code>String</code> |  | Path where create the doc file |
| [opts.ext] | <code>Object</code> | <code>js</code> | Extension for fileAndFolder opts |
| [opts.fileAndFolder] | <code>Object</code> |  | If true will generate doc from `path` but                                                            from `path`.`opts.ext` too if exists |

<a name="generateDoc"></a>

## generateDoc(filename, outputPath) ⇒ <code>String</code>
Apply the opts.rootPath if exists, generate the .md file path and call createDocFile with

**Kind**: global function  
**Returns**: <code>String</code> - Generated doc  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | filename where read comments for the doc |
| outputPath | <code>String</code> | doc folder path |
| opts.rootPath | <code>String</code> | path to append before filename |

<a name="generateDocs"></a>

## generateDocs(filePaths, outputPath, opts)
Generate the doc for a path / array of paths / object of paths

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filePaths | <code>String</code> \| <code>Array.&lt;String&gt;</code> \| <code>Object</code> | Path(s) where read comment for generating doc |
| outputPath | <code>String</code> | Doc folder |
| opts | <code>Object</code> | opts can contain `createDocFile` opts, don't use opts.rootPath                                                             it's used internally |
| opts.onGenerateDoc | <code>function</code> | called before generating doc with `generateDoc` args |
| opts.onGenerateError | <code>function</code> | called after generating doc fail with                                                                error in first arg and `generateDoc` args after |
| opts.onGenerateSuccess | <code>function</code> | called after generating doc successfully with                                                                generated doc in first arg and `generateDoc` args after |

