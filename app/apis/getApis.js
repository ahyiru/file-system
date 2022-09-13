import defProject from '@app/configs/projects';

const apiList = projectId => [
  {
    name: 'readfile',
    url: '/readfile',
  },
  {
    name: 'readdir',
    url: '/readdir',
  },
  {
    name: 'mkdir',
    url: '/mkdir',
  },
  {
    name: 'touch',
    url: '/touch',
  },
  {
    name: 'copyfile',
    url: '/copyfile',
  },
  {
    name: 'movefile',
    url: '/movefile',
  },
  {
    name: 'rmfile',
    url: '/rmfile',
  },
  {
    name: 'rnfile',
    url: '/rnfile',
  },
];

const getApis = () => ({result: {list: apiList(defProject._id)}});

export default getApis;
