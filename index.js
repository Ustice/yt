#!/usr/bin/env node

require('./src/set-require-base-to-project-root');

const program = require('commander');

const packageConfig = require('./package.json');
const getId = require('src/get-id');

const openAsApp = require('src/open-as-chrome-app');
const openUrl = require('src/open-url');

let id;

program
  .version(packageConfig.version, '-v, --version')
  .description(packageConfig.description)
  .option('-o, --open', 'Open in the default browser')
  .option('-a, --app', 'Open with Chrome in app mode')
  .arguments('<url>')
  .action((url) => {
    id = getId(url);
  })
  .parse(process.argv)
;

const open = (id) => {
  const url = `https://youtube.com/embed/${ id }`;

  if (!program.args.length && process.stdin.isTTY) {
    program.help();
    return
  }

  if (program.app) {
    return openAsApp(url);
  }

  if (program.open) {
    return openUrl(url);
  }

  console.log(url);

  return;
}

const chunks = [];

process.stdin.on('data', (chunk) => {
  chunks.push(chunk);
});

process.stdin.on('end', () => {
  const urlString = chunks
    .trim()
    .split('\\\\') // Removes double back slashes
    .map((substring) => substring.split('\\').join('')) // Unescapes back slashes
    .join('\\') // Replaces double back slashes with single
  ;

  id = getId(urlString);
  open(id);
})

process.stdout.on('error', function( err ) {
  if (err.code == "EPIPE") {
    process.exit(0);
  }
});

if (process.stdin.isTTY) {
  open(id);
  process.exit(0);
}

process.stdin.resume();
process.stdin.setEncoding('utf8');
