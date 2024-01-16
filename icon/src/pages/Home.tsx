import { ClearOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { FormattedMessage, Link, SelectLang, getIntl } from '@umijs/max';
import { Badge, Drawer } from 'antd';
import { useState } from 'react';
import styles from './Home.less';
import iconList from './IconDown';



const Home = () => {
  const [open, setOpen] = useState(false);
  const [shop, setShop] = useState<string[]>([]);

  const shopClear = () => {
    setShop([])
    localStorage.removeItem('num');
  };
  const numStr = localStorage.getItem('num');
  const num = numStr ? JSON.parse(numStr) : [];

  const deleteFromShop = (id: string) => {
    const filter= shop.filter((itemId) => itemId!== id);
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
    setShop(num)
  };
  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <div className={styles.ms}>MS-ICON</div>
        <ul className={styles.ul}>
          <li style={{ fontWeight: '700' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#000000' }}>
            <FormattedMessage id={'HomePage'}/>
            </Link>
          </li>
          <li>
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
            <Badge count={num?.length}>
              <ShoppingCartOutlined style={{ fontSize: '24px' }} />
            </Badge>
          </li>
          <li>
          <SelectLang style={{marginTop:'-8px'}}/>
          </li>
        </ul>
      </div>
      <div className={styles.programme}> <FormattedMessage id={'Design'}/></div>
      <div className={styles.study}> <FormattedMessage id={'The design'}/></div>
      <div className={styles.classify}><FormattedMessage id={'Icon classification'}/></div>
      <div className={styles.comb}><FormattedMessage id={'Unified'}/></div>
      <ul className={styles.lei}>
        <li>
            <div>
            <p><FormattedMessage id={'Instrument class'}/></p>
            </div>
          <p>150+</p>
        </li>
        <li>
          <div>
            <p><FormattedMessage id={'Collection class'}/></p>
          </div>
          <p>10+</p>
        </li>
        <li>
          <div>
            <p><FormattedMessage id={'Analysis class'}/></p>
          </div>
          <p>20+</p>
        </li>
        <li>
          <div>
            <p><FormattedMessage id={'Application class'}/></p>
          </div>
          <p>60+</p>
        </li>
      </ul>
      <div className={styles.tutorial}><FormattedMessage id={'Tutorial on using icon libraries'}/></div> 
      <div className={styles.help}><FormattedMessage id={'Help'}/></div>
      <ul className={styles.helpbox}>
        <li>
          <div><FormattedMessage id={'download'}/></div> 
          <div>
            <div className={styles.title}>
              <div className={styles.disc}></div>
              <p><FormattedMessage id={'Choose the icon you want'}/></p>
            </div>
            <div className={styles.imgbox}>
              <p><FormattedMessage id={'Instrument - Liquid chromatograph'}/></p>
              <img src="./Group 44346.png" />
            </div>
          </div>
          <div>
            <div className={styles.title}>
              <div className={styles.disc}></div>
              <p><FormattedMessage id={'Click to download'}/></p>
            </div>
            <div className={styles.imgbox}>
            <p><FormattedMessage id={'Instrument - Liquid chromatograph'}/></p>
              <img src="./Group 44347.png" />
            </div>
          </div>
        </li>
        <li>
          <div><FormattedMessage id={'Add to shopping cart'}/></div>
          <div>
            <div className={styles.title}>
              <div className={styles.disc}></div>
              <p><FormattedMessage id={'Choose the icon you want'}/></p>
            </div>
            <div className={styles.imgbox}>
            <p><FormattedMessage id={'Instrument - Liquid chromatograph'}/></p>
            <img src="./Group 44346.png" />
            </div>
          </div>
          <div>
            <div className={styles.title}>
              <div className={styles.disc}></div>
              <p><FormattedMessage id={'Click'}/></p>
            </div>
            <div className={styles.imgbox}>
            <p><FormattedMessage id={'Instrument - Liquid chromatograph'}/></p>
              <img src="./Group 44349.png" />
            </div>
          </div>
        </li>
        <li>
          <div><FormattedMessage id={'Custom Colors'}/></div>
          <div>
            <div className={styles.title}>
              <div className={styles.disc}></div>
              <p><FormattedMessage id={ 'Select'}/></p>
            </div>
            <div className={styles.imgbox2}>
            <p><FormattedMessage id={'Instrument - Liquid chromatograph'}/></p>
              <img src="./Group 44347.png" />
            </div>
          </div>
          <div>
            <div className={styles.title}>
              <div className={styles.disc}></div>
              <p><FormattedMessage id={'Change'}/></p>
            </div>
            <div className={styles.imgbox3}>
              <img src="./Group 44351.png" />
              <ul>
                <li><FormattedMessage id={'Recommend color'}/></li>
                <li><FormattedMessage id={'Change line color'}/></li>
                <li><FormattedMessage id={'Change fill color'}/></li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <div className={styles.about}><FormattedMessage id={'About'}/></div>
      <div className={styles.box}>
        <div className={styles.text}>
        <FormattedMessage id={'Mass spectrometry'}/>
        </div>
        <div className={styles.img}>
          <img src="./Frame 3473967.png" />
        </div>
      </div>
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
export default Home;
