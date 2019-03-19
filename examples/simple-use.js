const docGenerator = require('../src/generateDoc').generateDocsDir;

//// TODO: CONSTANTS
//// Je l'ai pas fait pour l'instant parce que ca marche pas dans un JSON donc je voulais voir ce que t'en pense
const configs = [
  { type: 'oneFilePerFile', src: '../src', dst: './docs' },
];

const main = async () => {
  try {
    await docGenerator(configs);
  } catch (e) {
    console.log(e);
  }
};

main();
