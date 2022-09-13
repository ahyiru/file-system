const path = require('path');
const {rootpath} = require('./configs');

const fixpath = route => path.resolve(rootpath, route);

module.exports = fixpath;
