// @ts-ignore
import { defineConfig } from 'umi';
import routes from './routes';

const appConfig = {
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  dva: {
    hmr: true,
    immer: true,
  },
  qiankun: {
    master: {
      apps: [
        {
          name: 'vue-app',
          entry: '//localhost:8080',
        },
      ],
    },
  },
};

export default defineConfig(appConfig);
