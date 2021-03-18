export default [
  { path: '/login', component: '@/pages/login/login' },
  {
    path: '/',
    component: '@/pages/index',
  },
  {
    path: '/test',
    name: '测试',
    routes: [
      {
        path: '/test',
        component: '@/pages/test/index',
        exact: true,
      },
      {
        path: '/test/son',
        component: '@/pages/test/son',
        name: '测试二级',
      },
      {
        path: '/test/micro',
        name: '微应用',
        redirect: '/app2',
      },
    ],
  },
  {
    path: '/app2',
    microApp: 'vue-app',
    // name: 'vue应用',
  },
  {
    path: '/demo',
    component: '@/pages/demo/index',
    name: 'Demo',
  },
];
