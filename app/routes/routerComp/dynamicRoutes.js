export const profileRoutes = {
  path: '/profile',
  name: '个人中心',
  title: '个人中心',
  hideMenu: true,
  component: props => <h1>{<h1>{props.inputPath} is comming...</h1>}</h1>,
};

export const fileRoutes = {
  path: '/files',
  name: '文件管理',
  icon: 'ico-flag',
  component: () => import('@app/views/files'),
};
