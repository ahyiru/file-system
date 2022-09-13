const fs = require('fs');
const rmfile = require('./rmfile');
const fixpath = require('./fixpath');

const copyfile = async (src, dst) => {
  src = fixpath(src);
  dst = fixpath(dst);
  if (!fs.existsSync(src)) {
    throw Error(`[${src}] 文件或文件夹不存在!`);
  }
  const stats = await fs.statSync(src);
  if (stats.isFile()) {
    const filename = src.split('/').slice(-1)[0];
    let dstfile = `${dst}/${filename}`;
    if (fs.existsSync(dstfile)) {
      dstfile = `${dst}/${+new Date()}_${filename}`;
    }
    await fs.copyFileSync(src, dstfile);
    return dstfile;
  }
  if (stats.isDirectory()) {
    const filename = src.split('/').slice(-1)[0];
    let dstfile = `${dst}/${filename}`;
    if (fs.existsSync(dstfile)) {
      dstfile = `${dst}/${+new Date()}_${filename}`;
    }
    await fs.mkdirSync(dstfile);
    const files = await fs.readdirSync(src);
    for(let i = 0, l = files.length; i < l; i++) {
      await copyfile(`${src}/${files[i]}`, dstfile);
    }
    return dstfile;
  }
};

const movefile = async (src, dst) => {
  await copyfile(src, dst);
  await rmfile(src);
};

module.exports = {copyfile, movefile};
