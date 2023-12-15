import styles from './Home.less';
import {
  ShoppingCartOutlined,
  DownloadOutlined,
  ClearOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Input, Modal, Drawer, Badge } from 'antd';
import { ReactComponent as SVG1 } from '../../public/icon/COM-叶.svg';
import { ReactComponent as SVG2 } from '../../public/icon/COM-四级杆.svg';
import { ReactComponent as SVG3 } from '../../public/icon/COM-离子阱.svg';
import { ReactComponent as SVG4 } from '../../public/icon/COM-胃.svg';
import { ReactComponent as SVG5 } from '../../public/icon/COM-静电场轨道阱（Orbitrap）.svg';
import { ReactComponent as SVG6 } from '../../public/icon/COM-飞行时间.svg';
import { ReactComponent as SVG7 } from '../../public/icon/SIM- 静电场轨道阱（Orbitrap）.svg';
import { ReactComponent as SVG8 } from '../../public/icon/SIM-叶.svg';
import { ReactComponent as SVG9 } from '../../public/icon/SIM-四级杆.svg';
import { ReactComponent as SVG10 } from '../../public/icon/SIM-离子阱.svg';
import { ReactComponent as SVG11 } from '../../public/icon/SIM-胃.svg';
import { ReactComponent as SVG12 } from '../../public/icon/SIM-飞行时间.svg';
import { ReactComponent as SVG13 } from '../../public/icon/SIM-离心机.svg';
import { ReactComponent as SVG14 } from '../../public/icon/SIM-环境.svg';
const { Search } = Input;

const iconList = [
  { id: '1', component: SVG1, path: './icon/COM-叶.svg', name: 'COM-叶' },
  { id: '2', component: SVG2, path: './icon/COM-四级杆.svg', name: 'COM-四级杆' },
  { id: '3', component: SVG3, path: './icon/COM-离子阱.svg', name: 'COM-离子阱' },
  { id: '4', component: SVG4, path: './icon/COM-胃.svg', name: 'COM-胃' },
  {
    id: '5',
    component: SVG5,
    path: './icon/COM-静电场轨道阱（Orbitrap）.svg',
    name: 'COM-静电场轨道阱（Orbitrap）',
  },
  { id: '6', component: SVG6, path: './icon/COM-飞行时间.svg', name: 'COM-飞行时间' },
  {
    id: '7',
    component: SVG7,
    path: './icon/SIM- 静电场轨道阱（Orbitrap）',
    name: 'SIM- 静电场轨道阱（Orbitrap）',
  },
  { id: '8', component: SVG8, path: './icon/SIM-叶.svg', name: 'SIM-叶' },
  { id: '9', component: SVG9, path: './icon/SIM-四级杆.svg', name: 'SIM-四级杆' },
  { id: '10', component: SVG10, path: './icon/SIM-离子阱.svg', name: 'SIM-离子阱' },
  { id: '11', component: SVG11, path: './icon/SIM-胃.svg', name: 'SIM-胃' },
  { id: '12', component: SVG12, path: './icon/SIM-飞行时间.svg', name: 'SIM-飞行时间' },
  { id: '13', component: SVG13, path: './icon/SIM-离心机.svg', name: 'SIM-离心机' },
  { id: '14', component: SVG14, path: './icon/SIM-环境.svg', name: 'SIM-环境' },
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

        // 修改颜色
        const pathsToChangeColor = doc.querySelectorAll('path');

        for (let i = 0; i < pathsToChangeColor.length; i++) {
          if (pathsToChangeColor[i].getAttribute('noFill') == 'true') {
            continue;
          }
          // pathsToChangeColor[i].style.fill = color;
          pathsToChangeColor[i].setAttribute('fill', color);
          // pathsToChangeColor[i].style.stroke = color;
          // pathsToChangeColor[i].setAttribute('stroke', color);
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
  const [color, setColor] = useState('#333333');
  const set = (color: string) => {
    const box = document.getElementById(selectedId);
    const paths = box.getElementsByTagName('path');
    for (let i = 0; i < paths.length; i++) {
      if (paths[i].getAttribute('noFill') == 'true') {
        continue;
      }
      paths[i].setAttribute('fill', color);

      // paths[i].style.fill = color;
    }
    setColor(color);
    console.log(color);
  };
  //下载弹窗
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const showModal = (id: string) => {
    setIsModalOpen(true);
    setSelectedId(id);
    // console.log(selectedId);
  };
  const handleOk = () => {
    handleDownload(selectedId);
    setIsModalOpen(false);
    setColor('');
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setColor('');
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
              <IconComponent key={icon.id} className={styles.svg} />
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
        {iconList.map((icon) => {
          const IconComponent = icon.component;
          if (icon.id === selectedId) {
            return (
              <>
                <IconComponent id={icon.id} key={icon.id} className={styles.bigsvg} />
                <p
                  style={{
                    position: 'relative',
                    top: '-120px',
                    left: '240px',
                    width: '200px',
                    whiteSpace: 'normal',
                  }}
                >
                  名称：{icon.name}
                </p>
                {/* <ColorPicker /> */}
              </>
            );
          }
          return null;
        })}
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
                    <IconComponent key={icon.id} style={{ width: '50px', height: '50px' }} />
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
