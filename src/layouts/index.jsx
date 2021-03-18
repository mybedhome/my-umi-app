import { Layout, Menu } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const AppLayout = props => {
  const { children } = props;
  return children;
};

export default AppLayout;
