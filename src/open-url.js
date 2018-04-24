const Promise = require('bluebird');
const cmd = require('node-cmd');

const run = Promise.promisify(cmd.run, { multiArgs: true, context: cmd })

const open = (url) => {
  return run(`open ${ url }`)
    .catch(console.log)
  ;
};

module.exports = open;