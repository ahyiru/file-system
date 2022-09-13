import {useState, useEffect, useRef, useCallback} from 'react';
import {message, formatTime} from '@huxy/utils';
import {Modal, Drop} from '@huxy/components';
import {useUpdate} from '@huxy/use';
import Button from '@app/components/base/button';
import Input from '@app/components/base/input';
import {Row, Col} from '@app/components/row';
import Panel from '@app/components/panel';
import MaxSize from '@app/components/maxSize';
import fixFileSizeUnit from '@app/utils/fixFileSizeUnit';

import apis from '@app/utils/getApis';

import './index.less';

const header = {
  filename: '文件名',
  type: '类型',
  size: '大小',
  mtime: '修改日期',
  birthtime: '创建日期',
};

const context = [
  {
    action: 'details',
    label: '详情',
    type: 'file',
    fn: 'handleDetails',
  },
  {
    action: 'copy',
    label: ' 拷贝',
    fn: 'handleCopy',
  },
  {
    action: 'delete',
    label: '删除',
    fn: 'handleAlert',
  },
  {
    action: 'move',
    label: '移动',
    fn: 'handleInput',
  },
  {
    action: 'rename',
    label: '重命名',
    fn: 'handleInput',
  },
  {
    action: 'addfile',
    label: '添加文件',
    type: 'dir',
    fn: 'handleInput',
  },
  {
    action: 'adddir',
    label: '添加文件夹',
    type: 'dir',
    fn: 'handleInput',
  },
];

const dirActions = context.filter(item => item.type !== 'file');

const fileActions = context.filter(item => item.type !== 'dir');

const Index = props => {
  const rerender = useUpdate();
  const fileRef = useRef();
  const [path, setPath] = useState('/');
  const [action, setAction] = useState({});
  const pathVaule = useRef(path);
  const [fileList, setFileList] = useState([]);
  const [value, setValue] = useState('');
  const updateList = useCallback(async path => {
    try {
      const {result} = await apis.readdirFn({path});
      setFileList(result || []);
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    updateList(path);
  }, [path]);
  const changePath = path => {
    const curPath = path.replace(/\/\//, '/');
    pathVaule.current = curPath;
    setPath(curPath);
  };
  const goBack = () => {
    if (path !== '/') {
      const prevPath = path.split('/').slice(0, -1).join('/') || '/';
      pathVaule.current = prevPath;
      setPath(prevPath);
    }
  };

  const handleDetails = async ({filename, action, label}) => {
    const {result} = await apis.readfileFn({path, filename});
    const {type, size, mtime, birthtime} = result || {};
    setAction({
      action,
      open: true,
      title: label,
      children: props => <div className="fs-info">
        <div><span>文件名：</span><span>{filename}</span></div>
        <div><span>类型：</span><span>{type}</span></div>
        <div><span>大小：</span><span>{fixFileSizeUnit(size)}</span></div>
        <div style={{flex: 2}}><span>修改时间：</span><span>{formatTime(mtime)}</span></div>
        <div style={{flex: 2}}><span>创建时间：</span><span>{formatTime(birthtime)}</span></div>
      </div>,
    });
  };
  const handleCopy = async ({filename, type}) => {
    const fullpath = `${path}/${filename}`;
    await apis.copyfileFn({src: fullpath, dst: type === 'dir' ? fullpath : path});
    message.success('拷贝成功！');
    updateList(path);
  };
  const handleAlert = async ({filename, action, label}) => {
    setAction({
      action,
      filename,
      open: true,
      title: label,
      children: props => <span style={{color: 'var(--red2)'}}>确定删除吗？</span>,
    });
  };
  const handleInput = async ({filename, action, label}) => {
    setValue(`${path}/${filename}`);
    setAction({
      action,
      filename,
      open: true,
      title: label,
      children: ({value, setValue}) => <Input value={value} onChange={e => setValue(e.target.value)} placeholder="请输入" />,
    });
  };

  const actions = {
    handleDetails,
    handleCopy,
    handleAlert,
    handleInput,
  };
  const handleApis = {
    delete: async filename => {
      await apis.rmfileFn({path: `${path}/${filename}`});
      message.success('删除成功！');
      updateList(path);
    },
    move: async filename => {
      await apis.movefileFn({src: `${path}/${filename}`, dst: value});
      message.success('移动成功！');
      updateList(path);
    },
    rename: async filename => {
      await apis.rnfileFn({path: `${path}/${filename}`, newpath: value});
      message.success('重命名成功！');
      updateList(path);
    },
    adddir: async () => {
      await apis.mkdirFn({path: value});
      message.success('添加文件夹成功！');
      updateList(path);
    },
    addfile: async () => {
      await apis.touchFn({path: value});
      message.success('添加文件成功！');
      updateList(path);
    },
  };
  const submit = async e => {
    await handleApis[action.action]?.(action.filename);
    setAction({});
  };
  const dirDrop = (filename, type) => <div className="drop-list">
    <ul>
      {
        dirActions.map(({action, label, fn}) => <li key={action} onClick={e => actions[fn]({filename, type, action, label})}>{label}</li>)
      }
    </ul>
  </div>;
  const fileDrop = (filename, type) => <div className="drop-list">
    <ul>
      {
        fileActions.map(({action, label, fn}) => <li key={action} onClick={e => actions[fn]({filename, type, action, label})}>{label}</li>)
      }
    </ul>
  </div>;
  return <div className="file-system">
    <Row>
      <Col span={3}>
        <Panel>
          <h2>当前目录：</h2>
          <div style={{display: 'flex'}}>
            <Input placehold="请输入路径" value={pathVaule.current} onChange={e => {pathVaule.current = e.target.value; rerender();}} />
            <Button onClick={e => setPath(pathVaule.current)}>提交</Button>
          </div>
        </Panel>
      </Col>
      <Col span={9}>
        <div ref={fileRef}>
          <div className="fs-topbar">
            {
              path !== '/' ? <div onClick={e => goBack()} className="fs-back">
                <span className="ico-left" />
                <span>返回</span>
              </div> : null
            }
            <div className="fs-max"><MaxSize panel={fileRef} target={document.body} /></div>
          </div>
          <Panel>
            <div className="fs-info fs-header">
              <div>{header.filename}</div>
              <div>{header.type}</div>
              <div>{header.size}</div>
              <div style={{flex: 2}}>{header.mtime}</div>
              <div style={{flex: 2}}>{header.birthtime}</div>
            </div>
            {
              fileList.map(({filename, type, size, mtime, birthtime}) => {
                return <div key={filename} className="fs-info">
                  {
                    type === 'dir' ? <Drop trigger="contextMenu" dropList={dirDrop(filename)}>
                      <a onClick={e => changePath(`${path}/${filename}`)}>{filename}</a>
                    </Drop> : <Drop trigger="contextMenu" dropList={fileDrop(filename)}><div>{filename}</div></Drop>
                  }
                  <div>{type}</div>
                  <div>{fixFileSizeUnit(size)}</div>
                  <div style={{flex: 2}}>{formatTime(mtime)}</div>
                  <div style={{flex: 2}}>{formatTime(birthtime)}</div>
                </div>;
              })
            }
          </Panel>
        </div>
      </Col>
    </Row>
    <Modal open={action.open} close={e => setAction({})} submit={submit}  title={action.title}>
      {action.children?.({value, setValue})}
    </Modal>
  </div>;
};

export default Index;
