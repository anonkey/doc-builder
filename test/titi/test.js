const fs = require('fs');
const path = require('path');

/**
 * @description Get last part of a '/' or '\' separated path
 * @function    getFilename
 * @param       {String}        path          file path
 * @return      {String}                      last part of the path
 */
const getFilename = path => path.replace(/.*((\/|\\)[-_a-zA-Z0-9.]+)$/, '$1');

/**
 * @description remove extension of a filename
 * @function    removeExt
 * @param       {String}      name          filename
 * @return      {String}                    filename without ext
 */
const removeExt = filename => filename.substr(0, filename.lastIndexOf('.')) || filename;

/**
 * @description Join two path won't fail if one is null
 * @function    protectedJoin
 * @param       {String}          startPath     Start of the new path
 * @param       {String}          endPath       End of the new path
 * @return      {String}                        Joined paths
 */
const protectedJoin = (startPath, endPath) => {
  if (!startPath) return endPath;
  if (!endPath) return startPath;
  return path.join(startPath, endPath);
};

/**
 * @description Return array of filePath in `path`
 * @function    getPathsOrPath
 * @param       {String}           path          file path
 * @return      {String[]|String} array of filePaths in `path` or `path` if it isn't a directory or
 *                                return null if file can't be accessed
 */
const getPathsOrPath = (path) => {
  try {
    const files = fs.readdirSync(path);

    return files;
  } catch (e) {
    const isFile = e.errno === -20;
    const isNotFound = e.errno === -2;

    if (!(isNotFound || isFile)) console.error(e);
    if (isFile) return path;
    return null;
  }
};

/**
 * @description Push `data` or `path` in `array` if path exist
 * @function    addFileIfExist
 * @param       {Array}            array         Any Array-like object
 * @param       {String}           path          path on which test existence
 * @param       {Any}              data          Data to push in the array
 */
const addFileIfExist = (array, path, data) => {
  if (fs.existsSync(path)) { array.push(data || path); }
};

/**
 * @function    createDirectoryIfNotExist
 * @description Create a directory if it isn't already
 * @param       {String}                      path          [description]
 */
const createDirIfNotExist = (path) => {
  try {
    fs.accessSync(path);
  } catch (e) {
    if (e.errno === -2) fs.mkdirSync(path, { recursive: true });
    else throw e;
  }
};

module.exports = {
  removeExt,
  getFilename,
  protectedJoin,
  addFileIfExist,
  getPathsOrPath,
  createDirIfNotExist,
};
