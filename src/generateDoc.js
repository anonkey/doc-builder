const fs = require('fs');
const jsdoc2md = require('jsdoc-to-markdown');

const {
  removeExt,
  getFilename,
  protectedJoin,
  getPathsOrPath,
  addFileIfExist,
} = require('./utils');

/**
 * @function    createDocFile
 * @description Generate a doc file from `path` file(s) to `outputPath`
 * @param       {String}          path                        Path to explore for generating doc
 * @param       {String}          outputPath                  Path where create the doc file
 * @param       {Object}          [opts.ext=js]               Extension for fileAndFolder opts
 * @param       {Object}          [opts.fileAndFolder]        If true will generate doc from `path` but
 *                                                            from `path`.`opts.ext` too if exists
 * @return      {String}          Generated doc
 */
const createDocFile = async (path, outputPath, opts = {}) => {
  let docData = '';
  const { fileAndFolder, ext } = opts;
  const extension = ext || 'js';
  const files = [];
  const pathWithExt = `${path}.${extension}`;
  const pathWithoutExt = removeExt(path);
  const directoryPath = `${pathWithoutExt}/**/*.${extension}`;
  const pathOrPaths = getPathsOrPath(path);

  console.log('test', path, pathOrPaths);
  if (fileAndFolder) { addFileIfExist(files, pathWithExt); }
  if (fileAndFolder || Array.isArray(pathOrPaths)) addFileIfExist(files, pathWithoutExt, directoryPath);
  else if (typeof pathOrPaths === 'string') addFileIfExist(files, path);
  console.log('FILES', files, outputPath);
  if (files.length) {
    docData = await jsdoc2md.render({ files });
    if (docData) fs.writeFileSync(outputPath, docData);
  }

  return docData;
};

/**
 * @function    generateDoc
 * @description Apply the opts.rootPath if exists, generate the .md file path and call createDocFile with
 * @param       {String}        filename      filename where read comments for the doc
 * @param       {String}        outputPath    doc folder path
 * @param       {String}        opts.rootPath path to append before filename
 * @return      {String}                      Generated doc
 */
const generateDoc = async (filePath, outputPath, opts) => {
  const sourcePath = protectedJoin(opts.rootPath, filePath);
  const endPathWithoutExt = removeExt(getFilename(filePath));
  const docPath = `${protectedJoin(outputPath, endPathWithoutExt)}.md`;
  console.log('generate', filePath, outputPath, opts);
  return createDocFile(sourcePath, docPath, opts);
};

/**
 * @function    generateDocs
 * @description Generate the doc for a path / array of paths / object of paths
 * @param       {(String|String[]|Object)} filePaths     Path(s) where read comment for generating doc
 * @param       {String}                 outputPath    Doc folder
 * @param       {Object}                 opts          opts can contain `createDocFile` opts, don't use opts.rootPath
 *                                                             it's used internally
 * @param       {Function}               opts.onGenerateDoc       called before generating doc with `generateDoc` args
 * @param       {Function}               opts.onGenerateError     called after generating doc fail with
 *                                                                error in first arg and `generateDoc` args after
 * @param       {Function}               opts.onGenerateSuccess   called after generating doc successfully with
 *                                                                generated doc in first arg and `generateDoc` args after
 */
const generateDocs = async (filePaths, outputPath, opts = {}) => {
  const { onGenerateDoc, onGenerateError, onGenerateSuccess } = opts;

  if (typeof filePaths === 'string') {
    try {
      if (typeof onGenerateDoc === 'function') onGenerateDoc(filePaths, outputPath, opts);
      const doc = await generateDoc(filePaths, outputPath, opts);
      if (typeof onGenerateSuccess === 'function') onGenerateSuccess(doc, filePaths, outputPath, opts);
    } catch (e) {
      if (typeof onGenerateError === 'function') onGenerateError(e, filePaths, outputPath, opts);
      else console.error(e);
    }
  }

  if (Array.isArray(filePaths)) {
    for (const filename of filePaths) { await generateDocs(filename, outputPath, opts); }
  } else if (typeof filePaths === 'object') {
    for (const rootPath in filePaths) {
      await generateDocs(filePaths[rootPath], outputPath, { ...opts, rootPath: protectedJoin(opts.rootPath, rootPath) });
    }
  }
};

module.exports = {
  generateDoc,
  generateDocs,
};
