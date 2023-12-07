
import styles from './Home.less';
import { AudioOutlined, ShoppingCartOutlined, DownloadOutlined } from '@ant-design/icons';
import { React, useEffect, useState } from 'react';
import { Input, Space } from 'antd';
import { ReactComponent as SVG1 } from '../../public/icon/SIM-冷冻干燥机.svg';
import { ReactComponent as SVG2 } from '../../public/icon/SIM-振荡器.svg';
import { ReactComponent as SVG3 } from '../../public/icon/SIM-数控超声波清洗器.svg';
import { ReactComponent as SVG4 } from '../../public/icon/SIM-涡旋仪.svg';
const { Search } = Input;

const iconList = [
  { id: '1', component: SVG1 },
  { id: '2', component: SVG2 },
  { id: '3', component: SVG3 },
  { id: '4', component: SVG4 },
  // 添加其他图标的信息
];
const onSearch = (value, _e, info) => console.log(value);

const Home = () => {
  const handleDownload = () => {
    // 获取 SVG 文件
    fetch('./icon/SIM-冷冻干燥机.svg')
      .then(response => response.text())
      .then(svgData => {
        // 解析 SVG 文件
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgData, 'image/svg+xml');

        // 修改颜色
        const pathsToChangeColor = doc.querySelectorAll('path');  // 获取所有路径元素
        pathsToChangeColor.forEach(path => {
          path.setAttribute('fill', '#0f0');  // 修改填充颜色
        });

        // 创建 SVG 文件下载链接
        const serializer = new XMLSerializer();
        const modifiedSvgData = serializer.serializeToString(doc);
        const blob = new Blob([modifiedSvgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-svg-file.svg'; // 设置文件名
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
  };


  const handleMouseEnter = () => {
    // const boxElement = document.querySelector(`.${styles.box}`);
    // boxElement.style.display = "block";
  };

  const handleMouseLeave = () => {
    // const boxElement = document.querySelector(`.${styles.box}`);
    // boxElement.style.display = "none";
  };
  return (
    <>
      <div className={styles.head}>MSICON-FONT</div>
      <div className={styles.top}>
        <h2>图标列表</h2>
        <Search
          placeholder="搜索"
          onSearch={onSearch}
          style={{
            width: 800,
            height: 100,
            marginLeft: 600,
          }}
        ></Search>
      </div>
      <div className={styles.main}>
        {iconList.map((icon) => {
          const IconComponent = icon.component;
          return (
            <IconComponent key={icon.id} className={styles.svg} id={icon.id} onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave} />
          )
        })}

        <div className={styles.box}>
          <div className={styles.iconbox}>
            <ShoppingCartOutlined className={styles.icon} />
          </div>
          <div className={styles.iconbox}>
            <DownloadOutlined className={styles.icon} onClick={handleDownload} />
          </div>
        </div>
      </div>

    </>
  )
}
export default Home