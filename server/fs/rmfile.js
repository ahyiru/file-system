const fs = require('fs');
const fixpath = require('./fixpath');

const rmfile = async path => {
  path = fixpath(path);
  if (!fs.existsSync(path)) {
    throw Error(`[${path}] 文件或文件夹不存在!`);
  }
  const stats = await fs.statSync(path);
  if (stats.isFile()) {
    await fs.unlinkSync(path);
    return path;
  }
  if (stats.isDirectory()) {
    const files = await fs.readdirSync(path);
    for(let i = 0, l = files.length; i < l; i++) {
      await rmfile(`${path}/${files[i]}`);
    }
    await fs.rmdirSync(path);
    return path;
  }
};

module.exports = rmfile;
