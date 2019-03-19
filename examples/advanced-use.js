const docGenerator = require('../src/generateDocDir').generateDocsDir;

const configs = [
  // { type: 'oneFilePerFile', src: './test/titi', dst: './to' },
  // { type: 'oneFilePerFileOrFolder', src: './test/tata', dst: './to' },
  { type: 'oneFilePerFileOnly', src: './test/toto', dst: './' },
];

const main = async () => {
  try {
    await docGenerator(configs, { docPath: 'docs2' });
  } catch (e) {
    console.log(e);
  }
};

main();
