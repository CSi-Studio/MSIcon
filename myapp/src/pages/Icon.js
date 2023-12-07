const Icon = ({ icon, width, height, ...rest }) => {
  const IconComponent = require(`../icon/${icon}.svg`).default; // 假设你的SVG文件存放在icons文件夹中
  return <IconComponent width={width} height={height} {...rest}/>;
};

export default Icon;