const app = {
  HOST: process.env.IP || 'http://localhost',
  PORT: process.env.PORT || 3200,
  PRO_PORT: process.env.PRO_PORT || 3201,
  BUILD_DIR: './build', //'build',
  PUBLIC_DIR: '../public',
  DEV_ROOT_DIR: '/',
  PRD_ROOT_DIR: '/file-system',
  PROXY: {
    url: 'http://localhost:3203',
    prefix: '/fs',
  },
  MOCK: '127.0.0.1:3202',
  SERVER_PORT: 3203,
  projectName: '...',
  defProject: {
    name: 'template',
    _id: '123456',
  },
};

module.exports = app;
