const fs = require('fs');
const rmfile = require('./rmfile');
const fixpath = require('./fixpath');

const mkdir = async (dirname, override = true) => {
  dirname = fixpath(dirname);
  if (fs.existsSync(dirname)) {
    if (!override) {
      throw Error(`[${dirname}] 文件夹已存在!`);
    }
    await rmfile(dirname);
  }
  await fs.mkdirSync(dirname);
  return dirname;
};

const touch = async (filename, override = true) => {
  filename = fixpath(filename);
  if (fs.existsSync(filename)) {
    if (!override) {
      throw Error(`[${filename}] 文件已存在!`);
    }
    await rmfile(filename);
  }
  await fs.writeFileSync(filename, '');
  return filename;
};

module.exports = {mkdir, touch};
