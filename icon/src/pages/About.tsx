import { ClearOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from '@umijs/renderer-react';
import { Badge, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import styles from './About.less';
import iconList from './IconDown';
import { FormattedMessage, SelectLang } from '@umijs/max';

const About = () => {
  useEffect(() => {
    const loadAMap = () => {
      return new Promise((resolve, reject) => {
        if (window.AMap) {
          resolve(window.AMap);
        } else {
          const script = document.createElement('script');
          script.src = 'https://webapi.amap.com/maps?v=2.0&key=40335db62d1bb586ba8505e0c06ccac1';
          script.async = true;
          script.onerror = reject;
          script.onload = () => {
            resolve(window.AMap);
          };
          document.head.appendChild(script);
        }
      });
    };
    loadAMap()
      .then((AMap) => {
        new AMap.Map('container', {
          viewMode: '2D',
          zoom: 17,
          center: [116.868382, 36.683262],
        });
      })
      .catch((error) => {
        console.error('加载地图失败', error);
      });
  }, []);
  const [open, setOpen] = useState(false);
  const [shop, setShop] = useState<string[]>([]);

  const shopClear = () => {
    setShop([]);
    localStorage.removeItem('num');
  };
  const numStr = localStorage.getItem('num');
  const num = numStr ? JSON.parse(numStr) : [];

  const deleteFromShop = (id: string) => {
    const filter = shop.filter((itemId) => itemId !== id);
    setShop(filter);
    localStorage.setItem('num', JSON.stringify(filter));
  };
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
  const down = () => {
    shop.forEach((id) => {
      handleDownload(id);
    });
    localStorage.removeItem('num');
  };
  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
    setShop(num);
  };
  return (
    <div className={styles.main}>
      <div className={styles.bg}>
      <div className={styles.head}>
        <div className={styles.ms}>MS-ICON</div>
        <ul className={styles.ul}>
          <li>
            <Link to="/" style={{ textDecoration: 'none', color: '#000000' }}>
            <FormattedMessage id={'HomePage'}/>
            </Link>
          </li>
          <li>
            <Link to="/IconLibrary" style={{ textDecoration: 'none', color: '#000000' }}>
            <FormattedMessage id={'OfficialIconLibrary'}/>
            </Link>
          </li>
          <li style={{ fontWeight: '700' }}>
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
      <div className={styles.contact}><FormattedMessage id={'Contact Us'}/></div>
      </div>
      <div className={styles.box}>
        <div id="container" className={styles.container}></div>
        <div className={styles.info}>
          <p><FormattedMessage id={'Address'}/></p>
          <p><FormattedMessage id={'Postal Code'}/></p>
          <p><FormattedMessage id={'Phone'}/></p>
          <p><FormattedMessage id={'Email'}/></p>
        </div>
      </div>
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
    </div>
  );
};

export default About;
