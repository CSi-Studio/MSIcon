import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import styles from './Home.less';

const Home = () => {
  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <div className={styles.ms}>MS-ICON</div>
        <ul className={styles.ul}>
          <li>
            <Link to="/" style={{ textDecoration: 'none', color: '#000000' }}>
              首页
            </Link>
          </li>
          <li>
            <Link to="/IconLibrary" style={{ textDecoration: 'none', color: '#000000' }}>
              官方图标库
            </Link>
          </li>
          <li>
            <ShoppingCartOutlined style={{ fontSize: '24px' }} />
          </li>
        </ul>
      </div>
      <div className={styles.programme}>质谱领域可视化元素设计方案</div>
      <div className={styles.study}>为质谱学的学习和应用提供更直观、易于理解的工具</div>
      <div className={styles.classify}>图标分类</div>
      <div className={styles.comb}>对质谱学相关知识和概念进行统一梳理</div>
      <ul className={styles.lei}>
        <li>
          <div>
            <p>仪器类</p>
            <p>Instrument</p>
          </div>
          <p>130+</p>
        </li>
        <li>
          <div>
            <p>采集类</p>
            <p>Acquisition</p>
          </div>
          <p>10+</p>
        </li>
        <li>
          <div>
            <p>分析类</p>
            <p>Analysis</p>
          </div>
          <p>10+</p>
        </li>
        <li>
          <div>
            <p>应用类</p>
            <p>Application</p>
          </div>
          <p>60+</p>
        </li>
      </ul>
      <div className={styles.tutorial}>图标库使用教程</div>
      <div className={styles.help}>帮助你更快速的了解如何使用</div>
      <ul className={styles.helpbox}>
        <li>
          <div>下载</div>
          <div>
            <div className={styles.title}><div className={styles.disc}></div><p>选择自己想要的图标</p><div></div></div>
            <div className={styles.imgbox}><img src="./Group 44340.png"/></div>
          </div>
          <div>
            <div className={styles.title}><div className={styles.disc}></div><p>点击下载</p><div></div></div>
            <div className={styles.imgbox}><img src="./Group 44341.png"/></div>
          </div>
        </li>
        <li>
          <div>加入购物车</div>
          <div>
            <div className={styles.title}><div className={styles.disc}></div><p>选择自己想要的图标</p><div></div></div>
            <div className={styles.imgbox}><img src="./Group 44340.png"/></div>
          </div>
          <div>
            <div className={styles.title}><div className={styles.disc}></div><p>点击购物车，在购物车中批量下载</p><div></div></div>
            <div className={styles.imgbox}><img src="./Group 44342.png"/></div>
          </div>
        </li>
        <li>
          <div>自定义颜色</div>
          <div>
            <div className={styles.title}><div className={styles.disc}></div><p>选择自己想要的图标,并点击下载</p><div></div></div>
            <div className={styles.imgbox2}><img src="./Group 44344.png"/></div>
          </div>
          <div>
            <div className={styles.title}><div className={styles.disc}></div><p>按照自己的喜好改变颜色</p><div></div></div>
            <div className={styles.imgbox3}><img src="./Group 44345.png"/></div>
          </div>
        </li>
      </ul>
      <div className={styles.about}>关于质谱图标库</div>
      <div className={styles.box}>
        <div className={styles.text}>
          质谱是一门高度复杂且专业化的科学领域，它涉及到许多复杂的概念、技术、设备，对于初学者或非专业人士来说，理解和学习质谱学是十分困难的。我们提供了一套统一的可视化元素设计方案，为质谱领域知识的普及和传播提供了一种新的思路。我们希望将这套可视化元素设计方案能当做复杂的质谱概念和更广泛的受众之间的桥梁，为质谱学习和科学交流营造一个更方便、更有吸引力的环境。
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
            <li>友情链接</li>
            <li>关于我们</li>
          </ul>
          <ul>
            <li>MS-ICON是质谱领域图标样式的开源图标库</li>
            <li>使用指南</li>
            <li>icon-font</li>
            <li>git-hub</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Home;
