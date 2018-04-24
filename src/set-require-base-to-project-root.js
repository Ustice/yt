// This allows node require strings to be relative to the project root.
// For instance, you can do the following from anywhere in the project:
//
// const PrometricRecord = require('src/prometrics/lib/prometrics-record');

process.env.NODE_PATH += `:${ process.cwd() }`;
require('module').Module._initPaths();
