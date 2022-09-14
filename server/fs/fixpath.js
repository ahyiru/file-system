const path = require('path');
const {rootpath} = require('./configs');

const fixpath = (route = '') => {
  if (route.indexOf(`${rootpath}/`) === 0) {
    return route;
  }
  if (route.indexOf('../') !== -1) {
    throw Error('不支持相对路径！');
  }
  return path.resolve(rootpath, `${route.indexOf('/') === 0 ? '.' : './'}${route}`);
};

module.exports = fixpath;
