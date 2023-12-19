import {
  ClearOutlined,
  DeleteOutlined,
  DownloadOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { Badge, Button, ColorPicker, Drawer, Input, Modal, Radio } from 'antd';
import { useState } from 'react';
import { ReactComponent as SVG1 } from '../../public/icon/SIM-叶.svg';
import { ReactComponent as SVG2 } from '../../public/icon/SIM-胃.svg';
import { ReactComponent as SVG3 } from '../../public/icon/SIM-血液.svg';
import { ReactComponent as SVG4 } from '../../public/icon/飞行时间-1.svg';
import { ReactComponent as SVG5 } from '../../public/icon/飞行时间-2.svg';
import { ReactComponent as Right } from '../../public/icon/向右.svg';
import styles from './Home.less';
const { Search } = Input;

const iconList = [
  {
    id: '1',
    component: SVG1,
    path: './icon/SIM-叶.svg',
    name: 'SIM-叶',
    recommend: '#629C15',
    default: 'rgba(0,0,0,0)',
  },
  {
    id: '2',
    component: SVG2,
    path: './icon/SIM-胃.svg',
    name: 'SIM-胃',
    recommend: '#CA7A61',
    default: 'rgba(0,0,0,0)',
  },
  {
    id: '3',
    component: SVG3,
    path: './icon/SIM-血液.svg',
    name: 'SIM-血液',
    recommend: '#ca3a26',
    default: '#666666',
  },
  {
    id: '4',
    component: SVG4,
    path: './icon/飞行时间-1.svg',
    name: '飞行时间-1',
    recommend: '#666666',
    default: '#666666',
    association: '飞行时间-2',
  },
  {
    id: '5',
    component: SVG5,
    path: './icon/飞行时间-2.svg',
    name: '飞行时间-2',
    recommend: '#666666',
    default: '#666666',
    association: '飞行时间-1',
  },
];

const Home = () => {
  //下载 SVG 文件
  const handleDownload = (id: string) => {
    const selectedIcon = iconList.find((icon) => icon.id === id); // 根据id查找对应的icon对象
    if (!selectedIcon) {
      console.error('Icon not found'); // 如果没有找到对应的icon，则输出错误信息
      return;
    }
    const { path, name } = selectedIcon; // 获取SVG文件路径和名称
    // 获取 SVG 文件
    fetch(path)
      .then((response) => response.text())
      .then((svgData) => {
        // 解析 SVG 文件
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgData, 'image/svg+xml');
        const pathsToChangeColor = doc.querySelectorAll('path');
        // 修改颜色
        if (color != '') {
          for (let i = 0; i < pathsToChangeColor.length; i++) {
            const classNames = pathsToChangeColor[i].getAttribute('class');
            if (classNames && classNames.includes('xian')) {
              pathsToChangeColor[i].setAttribute('fill', color);
            }
          }
        }
        if (color1 != '') {
          for (let i = 0; i < pathsToChangeColor.length; i++) {
            const classNames = pathsToChangeColor[i].getAttribute('class');
            if (classNames && classNames.includes('mian')) {
              pathsToChangeColor[i].setAttribute('fill', color1);
            }
          }
        }
        // 创建 SVG 文件下载链接
        const serializer = new XMLSerializer();
        const modifiedSvgData = serializer.serializeToString(doc);
        const blob = new Blob([modifiedSvgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}.svg`; // 使用icon对象的名称作为文件名
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
  };
  //下载弹窗
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const showModal = (id: string) => {
    setIsModalOpen(true);
    setSelectedId(id);
    defaultColor(id);
  };
  const handleOk = () => {
    handleDownload(selectedId);
    setIsModalOpen(false);
    setValue(1);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setValue(1);
  };
  const [color, setColor] = useState('');
  const [color1, setColor1] = useState('');
  const set = (color: string) => {
    const box = document.getElementById(selectedId);
    if (!box) {
      return;
    }
    const paths = box.getElementsByTagName('path');
    if (value === 1) {
      setColor(color);
      for (let i = 0; i < paths.length; i++) {
        const classNames = paths[i].getAttribute('class');
        if (classNames && classNames.includes('mian')) {
          continue;
        }
        paths[i].setAttribute('fill', color);
      }
    } else if (value === 2) {
      setColor1(color);
      for (let i = 0; i < paths.length; i++) {
        const classNames = paths[i].getAttribute('class');
        if (classNames && classNames.includes('xian')) {
          continue;
        }
        paths[i].setAttribute('fill', color);
      }
    }
  };

  //购物车抽屉
  const [open, setOpen] = useState(false);
  const [shop, setShop] = useState<string[]>([]);
  const showDrawer = () => {
    setOpen(true);
  };
  const setShopID = (id: string) => {
    if (shop.includes(id)) {
      setShop(shop.filter((itemId) => itemId !== id));
    } else {
      setShop([...shop, id]);
    }
  };
  const deleteFromShop = (id: string) => {
    setShop(shop.filter((itemId) => itemId !== id));
  };
  const down = () => {
    shop.forEach((id) => {
      handleDownload(id);
    });
  };
  const onClose = () => {
    setOpen(false);
  };
  const shopClear = () => {
    setShop([]);
  };
  //搜索
  const [List, setList] = useState(iconList);

  const onChange = (event: any) => {
    const value = event.target.value; // 获取输入框的值
    // console.log(value);
    if (value) {
      const newList = iconList.filter((icon) => icon.name.includes(value));
      setList(newList);
    } else {
      setList(iconList);
    }
  };

  //单选框
  const [value, setValue] = useState(1);
  const onChange1 = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  //默认颜色
  const defaultColor = (id: string) => {
    setColor('#333333');
    const icon = iconList.find((icon) => icon.id === id);
    if (icon) {
      setColor1(icon.default);
      const svgElement = document.getElementById(id);
      if (svgElement) {
        const paths = svgElement.querySelectorAll('path');
        for (let i = 0; i < paths.length; i++) {
          const classNames = paths[i].getAttribute('class');
          if (classNames && classNames.includes('xian')) {
            paths[i].setAttribute('fill', '#333333');
          } else {
            paths[i].setAttribute('fill', icon.default);
          }
        }
      }
    }
  };
  //推荐颜色
  const recommendColor = (id: string) => {
    setColor('#333333');
    const icon = iconList.find((icon) => icon.id === id);
    if (icon) {
      setColor1(icon.recommend);
      const svgElement = document.getElementById(id);
      if (svgElement) {
        const paths = svgElement.querySelectorAll('path');
        for (let i = 0; i < paths.length; i++) {
          const classNames = paths[i].getAttribute('class');
          if (classNames && classNames.includes('xian')) {
            paths[i].setAttribute('fill', '#333333');
          } else {
            paths[i].setAttribute('fill', icon.recommend);
          }
        }
      }
    }
  };
  //弹出框组件
  const renderIcon = (iconList: any, selectedId: any) => {
    return iconList.map((icon: any) => {
      const IconComponent = icon.component;
      if (icon.id === selectedId) {
        return (
          <>
            <IconComponent
              viewBox="0 0 24 24"
              id={icon.id}
              key={icon.id}
              className={styles.bigsvg}
            />
            {icon.association && (
              <p
                style={{
                  position: 'relative',
                  top: '-160px',
                  left: '240px',
                  color:'#1677FF',
                  cursor: 'pointer'
                }}
                onClick={() => association(icon.association)}
              >
                关联图标: {icon.association} <Right style={{ width:'16px',height:'16px',position: 'relative',top: '3px'}} />
              </p>
            )}
            <p
              style={{
                position: 'relative',
                top: '-140px',
                left: '240px',
                width: '200px',
                whiteSpace: 'normal',
              }}
            >
              名称：{icon.name}
            </p>
            <Button
              type="primary"
              style={{ position: 'relative', top: '-100px', left: '230px' }}
              onClick={() => defaultColor(icon.id)}
            >
              默认图标
            </Button>
            <Button
              type="primary"
              style={{ position: 'relative', top: '-100px', left: '250px' }}
              onClick={() => recommendColor(icon.id)}
            >
              推荐配色
            </Button>
            <Radio.Group
              onChange={onChange1}
              value={value}
              style={{ position: 'relative', top: '-60px', left: '40px' }}
            >
              <Radio value={1}>改变线条颜色</Radio>
              <Radio value={2}>改变填充颜色</Radio>
            </Radio.Group>
          </>
        );
      }
      return null;
    });
  };
  let renderedIcons = renderIcon(iconList, selectedId);
    //关联按钮
    const association=(association:string)=>{
      // console.log(association);
      const associationIcon = iconList.find((icon) => icon.name === association);
      // console.log(associationIcon.id);
      if(associationIcon){
      setSelectedId(associationIcon.id);
      }
    }
  return (
    <>
      <div className={styles.head}>
        MSICON-FONT{' '}
        <Badge count={shop.length}>
          <ShoppingCartOutlined
            style={{ color: 'white', marginLeft: '600px', fontSize: '40px' }}
            onClick={showDrawer}
          />
        </Badge>
      </div>
      <div className={styles.top}>
        <h2>图标列表</h2>
        <Search
          placeholder="搜索"
          onChange={onChange}
          style={{
            width: 800,
            height: 100,
            marginLeft: 600,
          }}
        ></Search>
      </div>
      <div className={styles.main}>
        {List.map((icon) => {
          const IconComponent = icon.component;
          return (
            <div style={{ position: 'relative' }}>
              <IconComponent viewBox="0 0 24 24" key={icon.id} className={styles.svg} />
              <p
                style={{
                  textAlign: 'center',
                  width: '150px',
                  whiteSpace: 'normal',
                  marginLeft: '45px',
                }}
              >
                {icon.name}
              </p>
              <div className={styles.box}>
                <div className={styles.iconbox} onClick={() => setShopID(icon.id)}>
                  {<ShoppingCartOutlined className={styles.icon} />}
                </div>
                <div className={styles.iconbox} onClick={() => showModal(icon.id)}>
                  {<DownloadOutlined className={styles.icon} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="下载"
        cancelText="取消"
        width="600"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginLeft: '-300px',
          marginTop: '-300px',
        }}
      >
         {renderedIcons}
        <ul className={styles.ul}>
          <li onClick={() => set('#ea8379')}></li>
          <li onClick={() => set('#7daee0')}></li>
          <li onClick={() => set('#b395bd')}></li>
          <li onClick={() => set('#299d8f')}></li>
          <li onClick={() => set('#e9c46a')}></li>
          <li onClick={() => set('#d87659')}></li>
          <li onClick={() => set('#55b7e6')}></li>
          <li onClick={() => set('#193e8f')}></li>
          <li onClick={() => set('#e53528')}></li>
          <li onClick={() => set('#f09739')}></li>

          <li onClick={() => set('#43978f')}></li>
          <li onClick={() => set('#9ec4be')}></li>
          <li onClick={() => set('#ABD0F1')}></li>
          <li onClick={() => set('#dce9f4')}></li>
          <li onClick={() => set('#e56f5e')}></li>
          <li onClick={() => set('#f19685')}></li>
          <li onClick={() => set('#f6c957')}></li>
          <li onClick={() => set('#ffb77f')}></li>
          <li onClick={() => set('#fbe8d5')}></li>
          <li onClick={() => set('rgba(0,0,0,0)')}></li>
          <li onClick={() => set('#333333')}></li>
          <ColorPicker
            size="large"
            onChangeComplete={(color) => {
              set(color.toHexString());
            }}
          />
        </ul>
      </Modal>
      <Drawer
        title={
          <div onClick={shopClear} style={{ cursor: 'pointer' }}>
            {' '}
            <ClearOutlined />
            清空购物车
          </div>
        }
        placement="right"
        onClose={onClose}
        open={open}
      >
        {shop.length ? (
          <div className={styles.shop}>
            {shop.map((id) => {
              const icon = iconList.find((icon) => icon.id === id); // 根据id找到对应的图标对象
              if (icon) {
                const IconComponent = icon.component;
                return (
                  <div style={{ position: 'relative' }}>
                    <IconComponent
                      viewBox="0 0 24 24"
                      key={icon.id}
                      style={{ width: '50px', height: '50px' }}
                    />
                    <div className={styles.shopDelete} onClick={() => deleteFromShop(id)}>
                      <DeleteOutlined style={{ fontSize: '30px', color: 'white' }} />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <p>快把喜欢的图标加入购物车吧~</p>
        )}
        <div className={styles.down} onClick={() => down()}>
          下载
        </div>
      </Drawer>
    </>
  );
};
export default Home;
