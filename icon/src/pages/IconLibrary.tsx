import {
  ClearOutlined,
  DeleteOutlined,
  DownloadOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import type { MenuProps, RadioChangeEvent } from 'antd';
import { Badge, Button, ColorPicker, Drawer, Input, Menu, Modal, Radio } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { ReactComponent as Right } from '../../public/icon/向右.svg';
import styles from './IconLibrary.less';
import iconList from './IconDown';
import { FormattedMessage, Link, SelectLang, getIntl } from '@umijs/max';
const { Search } = Input;


const IconLibrary = () => {
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
  const [reDefault, setReDefault] = useState<any>();
  const showModal = (id: string) => {
    setIsModalOpen(true);
    setSelectedId(id);
  };
  const handleOk = () => {
    handleDownload(selectedId);
    setValue(1);
    setReDefault(<></>)
    setTimeout(() => {
      setIsModalOpen(false);
      setReDefault(undefined);
    }, 0);
  };
  const handleCancel = () => {
    setValue(1);
    setReDefault(<></>)
    setTimeout(() => {
      setIsModalOpen(false);
      setReDefault(undefined);
    }, 0);
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
        if (classNames && classNames.includes('xian')) {
          paths[i].setAttribute('fill', color);
        }
      }
    } else if (value === 2) {
      setColor1(color);
      for (let i = 0; i < paths.length; i++) {
        const classNames = paths[i].getAttribute('class');
        if (classNames && classNames.includes('xian')) {
          continue;
        }
        if (classNames && classNames.includes('mian')) {
          paths[i].setAttribute('fill', color);
        }
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
    const index = shop.indexOf(id);
  if (index > -1) {
    shop.splice(index, 1);
    setShop([...shop]);
  } else {
    shop.push(id);
    setShop([...shop]);
  }
    // console.log('shop',shop,id);

    localStorage.setItem('num', JSON.stringify(shop));
  };
  const numStr = localStorage.getItem('num');
 const num = numStr ? JSON.parse(numStr) : [];
  // console.log('num',num);

  
  const deleteFromShop = (id: string) => {
    const filter= shop.filter((itemId) => itemId!== id);
    setShop(filter);
    localStorage.setItem('num', JSON.stringify(filter));
  };
  const down = () => {
    num.forEach((id) => {
      handleDownload(id);
    });
    localStorage.removeItem('num');
  };
  const onClose = () => {
    setOpen(false);
  };
  const shopClear = () => {
    setShop([]);
    localStorage.removeItem('num');
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
                  left: '220px',
                  color: '#1677FF',
                  cursor: 'pointer',
                }}
                onClick={() => association(icon.association)}
              >
                <FormattedMessage id={'Associated icons'}/>: {icon.association}
                <Right
                  style={{ width: '16px', height: '16px', position: 'relative', top: '3px' }}
                />
              </p>
            )}
            <p
              style={{
                position: 'relative',
                top: '-140px',
                left: '240px',
                width: '240px',
                whiteSpace: 'normal',
                fontSize:'16px'
              }}
            >
              <FormattedMessage id={'name'}/>：{icon.name}
            </p>
           <div  style={{position: 'relative', top: '-100px', left: '220px', width:'520px',height:'50px',display:'flex', flexDirection: 'column'}}>
           <div>
           <Button
              type="primary"
              onClick={()=>defaultColor(icon.id)}
            >
              <FormattedMessage id={'default icon'}/>
            </Button>
            <Button
              type="primary"
              onClick={() => recommendColor(icon.id)}
              style={{marginLeft:'20px'}}
            >
              <FormattedMessage id={'Recommend color'}/>
            </Button>
           </div>
            <Radio.Group
              onChange={onChange1}
              value={value}
              style={{marginTop:'20px'}}
            >
              <Radio value={1}><FormattedMessage id={'Change line color'}/></Radio>
              <Radio value={2}><FormattedMessage id={'Change fill color'}/></Radio>
            </Radio.Group>
           </div>
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
          </>
        );
      }
      return null;
    });
  };
  let renderedIcons = renderIcon(iconList, selectedId);
  //推荐颜色
  const recommendColor = (id: string) => {
    setColor('');
    setColor1('');
    setValue(1)
    const icon = iconList.find((icon) => icon.id === id);
    if (icon?.recommend) {
    if (icon) {
      setColor1(icon.recommend);
      const svgElement = document.getElementById(id);
      if (svgElement) {
        const paths = svgElement.querySelectorAll('path');
        for (let i = 0; i < paths.length; i++) {
          const classNames = paths[i].getAttribute('class');
          if (classNames && classNames.includes('xian')) {
            paths[i].setAttribute('fill', '#333333');
          } else if (classNames && classNames.includes('mian')) {
            paths[i].setAttribute('fill', icon.recommend);
          }
        }
      }
    }
  }else{
    setReDefault(<></>);
      setTimeout(() => {
        setReDefault(undefined);
      }, 0);
  }
  };
  //默认颜色
  const defaultColor = (id: string) => {
    setColor('');
    setColor1('');
    setValue(1)
    const icon = iconList.find((icon) => icon.id === id);
    if (icon?.default) {
      if (icon) {
        setColor1(icon.default);
        const svgElement = document.getElementById(id);
        if (svgElement) {
          const paths = svgElement.querySelectorAll('path');
          for (let i = 0; i < paths.length; i++) {
            const classNames = paths[i].getAttribute('class');
            if (classNames && classNames.includes('xian')) {
              paths[i].setAttribute('fill', '#333333');
            } else if (classNames && classNames.includes('mian')) {
              paths[i].setAttribute('fill', icon.default);
            }
          }
        }
      }
    } else {
      setReDefault(<></>);
      setTimeout(() => {
        setReDefault(undefined);
      }, 0);
    }
  };
  //关联按钮
  const association = (association: string) => {
    // console.log(association);
    const associationIcon = iconList.find((icon) => icon.name === association);
    // console.log(associationIcon.id);
    if (associationIcon) {
      setSelectedId(associationIcon.id);
    }
  };
  //分类数组
  const aa: Map<string, any[]> = new Map<string, any[]>();
  for (let i = 0; i < List.length; i++) {
    const icon = List[i];
    const type = icon.type;
    if (aa.has(type)) {
      aa.get(type)?.push(icon);
    } else {
      aa.set(type, [icon]);
    }
  }
  // console.log('aa', aa);
  const groupedIcons = Array.from(aa).reduce((acc, [type, icons]) => {
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type] = acc[type].concat(icons);
    // console.log(acc);
    return acc;
  }, {} as Record<string, any[]>);
  //左侧分类
  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  const intl = getIntl();
  const items: MenuProps['items'] = [
    getItem(<FormattedMessage id={'All icons'}/>,  intl.formatMessage({ id:'whole'}), <></>),
    getItem(<FormattedMessage id={'Instrument'}/>, 'sub2', <></>, [
      getItem(<FormattedMessage id={'Mass spectrometer'}/>, 'g1', null, [getItem(<FormattedMessage id={'Instrument'}/>, intl.formatMessage({ id:'Mass spectrometer-Instrument'})), getItem(<FormattedMessage id={'Component'}/>, intl.formatMessage({ id:'Component'}))]),
      getItem(<FormattedMessage id={'Liquid chromatograph'}/>,  intl.formatMessage({ id:'Liquid chromatograph'}), null),
      getItem(<FormattedMessage id={'Common experimental instruments'}/>, intl.formatMessage({ id:'Common experimental instruments'}), null),
    ]),
    getItem(<FormattedMessage id={'Gather'}/>, 'sub3', <></>, [getItem(<FormattedMessage id={'Acquisition mode'}/>, intl.formatMessage({ id:'Acquisition mode'}), null)]),
    getItem(<FormattedMessage id={'Analysis'}/>, 'sub4', <></>, [
      getItem(<FormattedMessage id={'Spectral representation'}/>, intl.formatMessage({ id:'Spectral representation'}), null),
      getItem(<FormattedMessage id={'Spectral processing'}/>, intl.formatMessage({ id:'Spectral processing'}), null),
    ]),
    getItem(<FormattedMessage id={'Application'}/>, 'sub5', <></>, [
      getItem(<FormattedMessage id={'Sample type'}/>, intl.formatMessage({ id:'Sample type'}), null),
      getItem(<FormattedMessage id={'application area'}/>, intl.formatMessage({ id:'Application area'}), null),
    ]),
  ];
  const onClick: MenuProps['onClick'] = (e) => {
    const value = e.key;
    // console.log(e.key);
    if (value) {
      const newList = iconList.filter((icon) => icon.type.includes(value));
      setList(newList);
    } else {
      setList(iconList);
    }
    if (value === intl.formatMessage({ id:'whole'})) {
      setList(iconList);
    }
  };
  return (
    <>
       <div className={styles.head}>
        <div className={styles.ms}>MS-ICON</div>
        <ul className={styles.ul1}>
          <li >
          <Link to="/" style={{ textDecoration: 'none', color: '#000000' }}>
          <FormattedMessage id={'HomePage'}/>
            </Link>
          </li>
          <li  style={{fontWeight:'700'}}>
            <Link to="/IconLibrary" style={{ textDecoration: 'none', color: '#000000' }}>
            <FormattedMessage id={'OfficialIconLibrary'}/>
            </Link>
          </li>
          <li>
            <Link to="/About" style={{ textDecoration: 'none', color: '#000000' }}>
            <FormattedMessage id={'About Us'}/>
            </Link>
          </li>
          <li onClick={showDrawer}>
          <Badge count={(num && num.length) || 0}>
          <ShoppingCartOutlined style={{ fontSize: '24px' }} />
          </Badge>  
          </li>
          <li>
          <SelectLang style={{marginTop:'-8px'}}/>
          </li>
        </ul>
      </div>
      <div className={styles.top}>
        <Search
          placeholder={intl.formatMessage({ id:'search'})}
          onChange={onChange}
          className={styles.search}
          size="large"
        ></Search>
      </div>

      <div className={styles.main}>
      <Menu
        onClick={onClick}
        style={{ width: 300,height:700,}}
        defaultOpenKeys={['sub2', 'sub3', 'sub4', 'sub5', 'g1']}
        mode="inline"
        items={items}
      />
        <div style={{height:'100%',overflow:'auto',margin:'auto'}}>
          {Object.entries(groupedIcons).map(([type, icons]) => (
            <div >
              <h2 style={{ marginBottom: '30px' }}>{type}</h2>
              <div
                key={type}
                style={{ display: 'flex', flexWrap: 'wrap', width: '1600px', marginBottom: '35px' }}
              >
                {icons.map((icon) => {
                  const IconComponent = icon.component;
                  return (
                    <div style={{ position: 'relative',marginBottom:'15px' }}>
                      <IconComponent viewBox="0 0 24 24" key={icon.id} className={styles.svg} />
                      <p
                        style={{
                          textAlign: 'center',
                          width: '160px',
                          whiteSpace: 'normal',
                          marginLeft:'20px',
                          marginTop: '-26px',
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
            </div>
          ))}
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={intl.formatMessage({ id:'download'})}
        cancelText={intl.formatMessage({ id:'cancellation'})}
        width="600"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginLeft: '-300px',
          marginTop: '-300px',
        }}
      >
        {reDefault || renderedIcons}
      </Modal>
      <Drawer
        title={
          <div onClick={shopClear} style={{ cursor: 'pointer' }}>
            {' '}
            <ClearOutlined />
            <FormattedMessage id={'empty cart'}/>
          </div>
        }
        placement="right"
        onClose={onClose}
        open={open}
      >
        {num.length ? (
          <div className={styles.shop}>
            {num.map((id) => {
              const icon = iconList.find((icon) => icon.id === id); // 根据id找到对应的图标对象
              if (icon) {
                const IconComponent = icon.component;
                return (
                  <div style={{ position: 'relative' }}>
                    <IconComponent
                      viewBox="0 0 24 24"
                      key={icon.id}
                      style={{ width: '70px', height: '70px' }}
                    />
                    <div className={styles.shopDelete} onClick={() => deleteFromShop(id)}>
                      <DeleteOutlined style={{ fontSize: '50px', color: 'white' }} />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <p><FormattedMessage id={'Quickly'}/></p>
        )}
        <div className={styles.down} onClick={() => down()}>
        <FormattedMessage id={'download'}/>
        </div>
      </Drawer>
    </>
  );
};
export default IconLibrary;
