import { ClearOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from '@umijs/renderer-react';
import { Badge, Drawer, Input } from 'antd';
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
  const[width,setWidth]=useState(200)
  // 下载 SVG 文件
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
  
      // 设置 SVG 元素的大小
      const svg = doc.querySelector('svg');
      svg.setAttribute('width', `${width}px`);
      svg.setAttribute('height', `${width}px`);

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
//下载png文件
 const handleDownload1 = (id: string) => {
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
      const svgUrl = URL.createObjectURL(blob);

      // 创建一个隐藏的canvas元素
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = width
      canvas.height = width

      // 在canvas上绘制SVG图像
      const image = new Image();
      image.src = svgUrl;
      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        // 将canvas转换为PNG数据URL
        const pngDataUrl = canvas.toDataURL('image/png');

        // 创建一个隐藏的a标签并模拟点击下载
        const a = document.createElement('a');
        a.href = pngDataUrl;
        a.download = `${name}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // 释放URL对象
        URL.revokeObjectURL(svgUrl);
      }
      });
  };
  const down = () => {
    shop.forEach((id) => {
      handleDownload(id);
    });
    localStorage.removeItem('num');
    onClose()
  };
  const down1 = () => {
    num.forEach((id) => {
      handleDownload1(id);
    });
    localStorage.removeItem('num');
    onClose()
  };
  const onChange3 = (event: any) => {
    const value = event.target.value; // 获取输入框的值
    console.log(value);
    setWidth(value)
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
                <div style={{'position': 'absolute', 'bottom': '320px','left':'40px'}}><FormattedMessage id={'Choose'}/></div>
        <div style={{fontSize:'16px','position': 'absolute', 'bottom': '280px','left':'40px'}}> <Input placeholder="200" style={{'width':'50px',height:'26px',marginLeft:'5px'}} onChange={onChange3}/><span style={{marginLeft:'5px',marginRight:'5px'}}>x</span>{width}</div>       
        <div className={styles.down} onClick={() => down1()}>
        <FormattedMessage id={'download'}/> png
        </div>
        <div className={styles.down1} onClick={() => down()}>
        <FormattedMessage id={'download'}/> svg
        </div>
      </Drawer>
      <div className={styles.footer}>
        <div>
          <ul>
            <li>MS-ICON</li>
            <li>MS-ICON</li>
            <li><FormattedMessage id={'Friendship link'}/></li>
            <li><FormattedMessage id={'About Us'}/></li>
          </ul>
          <ul>
            <li><FormattedMessage id={'MS-ICON'}/></li>
            <li><FormattedMessage id={'Usage Guide'}/></li>
            <li><a href='https://www.iconfont.cn/'>icon-font</a></li>
            <li><a href="https://github.com/CSi-Studio/MSIcon"><img src="./github _github 1.png" alt="" /></a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
