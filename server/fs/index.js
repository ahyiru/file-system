const {copyfile, movefile} = require('./copyfile');
const {mkdir, touch} = require('./createfile');
const {readfile, readdir, readAllFile} = require('./readfile');
const rmfile = require('./rmfile');
const rnfile = require('./rnfile');

module.exports = {copyfile, movefile, mkdir, touch, readfile, readdir, rmfile, rnfile, readAllFile};
