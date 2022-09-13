const fs = require('fs');
const fixpath = require('./fixpath');

const rnfile = async (path, newpath) => {
  newpath = fixpath(newpath);
  path = fixpath(path);
  if (!fs.existsSync(path)) {
    throw Error(`[${path}] 文件或文件夹不存在!`);
  }
  fs.renameSync(path, newpath);
};

module.exports = rnfile;
