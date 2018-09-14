// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home', role: ['admin', 'user'] },
  { path: '/userManage', title: '用户管理', icon: 'user', role: ['admin'] }
  // {
  //   title: '页面',
  //   icon: 'folder-o',
  //   role: ['admin', 'user'],
  //   children: [{ path: '/page1', role: ['admin'], title: '页面 1' }, { path: '/page2', role: ['admin', 'user'], title: '页面 2' }, { path: '/page3', role: ['admin', 'user'], title: '页面 3' }]
  // }
];
