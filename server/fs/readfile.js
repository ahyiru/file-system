const fs = require('fs');
const fixpath = require('./fixpath');

const readfile = async (dir, filename) => {
  const fullname = fixpath(`${dir}/${filename}`);
  if (!fs.existsSync(fullname)) {
    throw Error(`[${fullname}] 文件或文件夹不存在!`);
  }
  const stats = await fs.statSync(fullname);
  if (stats.isFile()) {
    return {
      dir,
      filename,
      type: filename.split('.').slice(-1)[0],
      size: stats.size,
      mtime: stats.mtime,
      birthtime: stats.birthtime,
    };
  } else if (stats.isDirectory()) {
    return {
      dir,
      filename,
      type: 'dir',
      size: stats.size,
      mtime: stats.ctime,
      birthtime: stats.birthtime,
    };
  }
};

const readdir = async dir => {
  dir = fixpath(dir);
  if (!fs.existsSync(dir)) {
    throw Error(`[${dir}] 文件夹不存在!`);
  }
  const files = await fs.readdirSync(dir);
  const result = [];
  for(let i = 0, l = files.length; i < l; i++) {
    try {
      const fileInfo = await readfile(dir, files[i]);
      result.push(fileInfo);
    } catch (err) {
      continue;
    }
  }
  return result;
};

module.exports = {readfile, readdir};