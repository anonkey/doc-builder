#!/usr/bin/node

const fs = require('fs');
const path = require('path');
const args = require('node-getopt').create([
  ['w', 'watch', 'watch files for changes'],
  ['', 'toc[=TOCPATH]', 'generate a table of content in the path'],
  ['c', 'config=CONFIG', 'config file path'],
])              // create Getopt instance
  .bindHelp()     // bind option 'help' to default action
  .parseSystem(); // parse command line

const { generateDocDir, generateDocsDir } = require('./generateDocDir');

const { options, argv } = args;
const [src, dst] = argv;



const getConfigFile = () => JSON.parse(fs.readFileSync(path.resolve(options.config || './.docrc')));

const parseOptions = () => {
  let config = {};

  try { config = getConfigFile(); } catch (e) { console.error(e); }

  const source = config.source = src && path.resolve(src);
  const dest = config.dest = path.resolve(dst || config.outputPath || './docs');

  if (!source && !config.configs) {
    console.log('Usage : generateDoc [source] [dest]');
    process.exit(-1);
  }
  if (!config.globalOpts) config.globalOpts = {};
  if (options.watch) config.globalOpts.watch = true;
  console.log(options);
  if (typeof options.toc === 'string') config.globalOpts.tocPath = path.resolve(config.dest, options.toc || './toc.md');
  config.globalOpts.docPath = dest;
  if (source) console.log(`[ GENERATE DOCUMENTATION ] \nFrom : ${source}\nTo : ${dest}`);

  return config;
};

const onScriptEnd = (err) => {
  const { watch } = options;
  console.log('END', err, watch);
  if (err) {
    console.error(err, err.message, '\n');
    if (watch) return;
    return process.exit(err.errno);
  }
  console.log('  ✓ Documentation have been generated\n');
  if (!watch) {
    console.log('You can use --watch option to generate on file change');
    return process.exit(0);
  }
};

const main = async () => {
  const { configs, globalOpts, source, dest } = parseOptions();

  console.log('START', configs, globalOpts, source, dest);
  try {
    if (source) await generateDocDir(source, dest, globalOpts);
    else await generateDocsDir(configs, globalOpts);
    onScriptEnd();
  } catch (e) {
    return onScriptEnd(e);
  }

};

main();
