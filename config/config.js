// @ts-ignore
import { defineConfig } from 'umi';
import routes from './routes';

const appConfig = {
  nodeModulesTransform: {
    type: 'none',
  },
  title: '基建全过程数字化综合管理平台',
  mountElementId: 'root',
  routes,
  dva: {
    hmr: true,
    immer: true,
  },
  qiankun: {
    slave: {},
  },
};

export default defineConfig(appConfig);
