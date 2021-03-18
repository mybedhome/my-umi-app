import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const AppLayout = props => {
  const { children } = props;
  console.log('props', props);
  return children;
};

export default AppLayout;
