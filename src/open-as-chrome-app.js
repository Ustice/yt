const Promise = require('bluebird');
const cmd = require('node-cmd');

const run = Promise.promisify(cmd.run, { multiArgs: true, context: cmd })

// If anyone is reading this, this is Mac-specific.
const appPath = '/Applications/Google\\ Chrome\\ Canary.app/Contents/MacOS/Google\\ Chrome\\ Canary';

const open = (url) => {
  return run(`${ appPath } --app=${ url }`)
    .catch(console.log)
  ;
};

module.exports = open;
