import {storage, fixPath} from '@huxy/utils';
import apiList from '@app/utils/getApis';
import configs from '@app/configs';
const {basepath, browserRouter} = configs;

export const goPage = (url = '') => location.href = url ? fixPath(browserRouter ? `${basepath}${url}` : `${basepath}/#/${url}`) : basepath || '/';

export const logout = isLogout => {
  !isLogout && apiList.logoutFn();
  storage.rm('token');
  goPage('/user/signin');
};

export const isAuthed = () => storage.get('token');
