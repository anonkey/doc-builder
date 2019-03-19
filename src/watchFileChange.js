const fs = require('fs');

const {
  protectedJoin,
  getPathsOrPath,
} = require('./utils');

/**
 * Hashtable of last modification time by filename
 * @type {Object}
 */
const mtimeMap = {};

/**
  * @function    watchFileChange
  * @description Watch a `filepath` with his subdirectory if it's a folder
  * @param       {String}            filePath           Filepath to watch
  * @param       {String}            rootPath           Root path to join with filenames
  * @param       {function}          opts.onFileChange  Callback called with
  *                                  trigerred filename and status 'accessed' or 'modified'
  */
const watchFileChange = (filePath, rootPath, opts = {}) => {
  const newFilePath = protectedJoin(rootPath, filePath);
  const files = getPathsOrPath(newFilePath);
  const { onFileChange } = opts;

  if (Array.isArray(files)) {
    files.forEach(file => {
      const newFileName = protectedJoin(newFilePath, file);

      watchFileChange(newFileName, null, opts);
    });
  }
  else if (typeof files === 'string') {
    console.log(files);
    fs.watch(files, () => {
      let status = 'modified';
      try {
        const { mtimeMs } = fs.lstatSync(files);

        if (mtimeMs === mtimeMap[files]) status = 'accessed';
        else mtimeMap[files] = mtimeMs;
      } catch(e) { console.error(e); } finally { onFileChange(files, status, opts); }
    });
  }
};

module.exports = watchFileChange;
