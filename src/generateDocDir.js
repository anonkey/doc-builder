const fs = require('fs');
const path = require('path');

const watchFileChange = require('./watchFileChange');

const {
  removeExt,
  getFilename,
  protectedJoin,
  getFolderPaths,
  getPathsOrPath,
  createDirIfNotExist,
} = require('./utils');

const { generateDoc, generateDocs } = require('./generateDoc');

/**
 * @function    generateDocDir
 * @description Generate a doc directory
 * @param       {String|String[]|Object}  filePaths  Path(s) from where generate the doc
 * @param       {String}                  docPath    Doc folder for the type
 * @param       {Object}                  [opts]     `generateDocs` opts
 */
const generateDocDir = async (filePaths, docPath, opts) => {
  createDirIfNotExist(docPath);

  return generateDocs(filePaths, docPath, opts);
};

/**
 * @function    getFilesList
 * @description Get the list of absolute file paths to process
 * @param       {String}         inputPaths    Paths to process
 * @param       {String}         rootPath      Path to join with every path
 * @param       {String}         type          - 'oneFilePerFile' will add every folder
 *                                              and every `filter` matching file
 *                                             - 'oneFilePerFileOrFolder' will add all folders
 *                                              and all `filter` matching file which doesn't have
 *                                              a same named folder in the list
 * @param       {String|RegExp}  filter        Regular file filter on name
 * @return      {String[]}                     File paths to process
 */
const getFilesList = (inputPaths, rootPath, type, filter) => {
  const matchingPaths = inputPaths.filter(path => path.match(filter));
  const folderPaths = getFolderPaths(inputPaths, rootPath);
  let newInputPaths = inputPaths;

  if (type === 'oneFilePerFileOnly') newInputPaths = matchingPaths;
  else if (type === 'oneFilePerFile') {
    newInputPaths = [ ...matchingPaths, ...folderPaths ];
  }
  else if (type === 'oneFilePerFileOrFolder') {
    for (const matchingPath of matchingPaths) {
      const pathWithoutExt = removeExt(matchingPath);

      if (!folderPaths.find(filePath => filePath === pathWithoutExt)) {
        newInputPaths.push(matchingPath);
      }
    }
    newInputPaths = newInputPaths.concat(folderPaths);
  }

  return rootPath ? newInputPaths.map(inputPath => path.join(rootPath, inputPath)) : newInputPaths;
};

/**
 * @function    tocGenerator
 * @description Generate table of content for documentation generated
 * @param       {String[]}       toc         Array - like object where push the toc's lines
 * @param       {Function}       callback    callback for handlers chaining
 * @return      {Function}                   handler for onGenerateSuccess
 */
const tocGenerator = (toc, callback) => (doc, filename, outputPath, opts) => {
  const endPathWithoutExt = removeExt(filename);
  const filenameWithoutExt = getFilename(endPathWithoutExt);

  if (doc) toc.push(` * [ ${filenameWithoutExt} ](${protectedJoin(opts.docLinksRoot, endPathWithoutExt)}.md)`);
  if (typeof callback === 'function') callback(doc, filename, outputPath, opts);
};

/**
 * @function    watcher
 * @description Watch source file and regenerate doc for this file on changes
 * @param       {String|Regex}    filter        filename filter
 * @param       {String}          ext           files extension's for fileAndFolder option
 * @param       {Function}        callback      callback for handlers chaining
 * @return      {Function}                      handler for onGenerateSuccess
 */
const watcher = (filter, ext, callback) => (doc, filename, outputPath, opts) => {
  const onFileChange = (filepath, status) => {
    try {
      if (status === 'modified') {
        process.stdout.write(`\nUpdating doc for ${filename}`);
        generateDoc(filename, outputPath, opts);
      }
    } catch (e) {console.error(e);}
  };
  const sourcePath = protectedJoin(opts.rootPath, filename);
  const watchFileOpts = { ...opts, onFileChange };

  watchFileChange(sourcePath, null, watchFileOpts);
  if (opts.folderAndFile && !filename.match(filter)) watchFileChange(`${sourcePath}.${ext}`, null, watchFileOpts);
  if (typeof callback === 'function') callback(doc, filename, outputPath, opts);
};

/**
 * @function    generateDocsDir
 * @description Generate doc directories according to `configs`
 * @param       {Object[]}          configs       Configs for directory where extract doc
 * @param       {Object}            [opts={}]     [description]
 */
const generateDocsDir = async (configs, opts = {}) => {
  const {
    ext: extension,
    watch,
    docPath,
    tocPath,
    fileAndFolder,
    onGenerateError: optsErrorHandler,
    onGenerateSuccess: optSuccessHandler,
  } = opts;
  const ext = extension || 'js';
  const filter = new RegExp(`^.*\\.${ext}$`);
  const toc = [];
  let onGenerateSuccess = optSuccessHandler;

  if (watch) onGenerateSuccess = watcher(filter, ext, onGenerateSuccess);
  if (tocPath) onGenerateSuccess = tocGenerator(toc, onGenerateSuccess);
  for (const config of configs) {
    const source = path.resolve(config.src);
    const newOpts = {
      ...opts,
      ext,
      fileAndFolder: config.type === 'oneFilePerFileOrFolder' ? true : fileAndFolder,
      onGenerateSuccess,
      onGenerateError: optsErrorHandler || console.error,
    };
    let inputPaths = getPathsOrPath(source);
    const outputPath = path.resolve(docPath || '', config.dst || '');

    createDirIfNotExist(source);
    if (Array.isArray(inputPaths)) {
      inputPaths = getFilesList(inputPaths, source, config.type, filter);
    }
    console.log('inputPaths', inputPaths);
    await generateDocDir(inputPaths, outputPath, newOpts);
  }
  if (tocPath) fs.writeFileSync(path.resolve(tocPath), toc.join('\n'));
};

module.exports = {
  generateDocDir,
  generateDocsDir,
};
