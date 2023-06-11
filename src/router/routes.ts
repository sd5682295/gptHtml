import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        path: 'viaNetwork',
        component: () => import('src/pages/viaNetwork/viaNetwork.vue'),
      },
      {
        path: 'mubu',
        component: () => import('src/pages/mubu/mubu.vue'),
      },
      {
        path: 'chat2',
        component: () => import('src/pages/chatPage/main.vue'),
      },
      {
        path: 'user-manage',
        component: () => import('src/pages/registerPage/userManage.vue'),
      },
      {
        path: 'register-page',
        component: () => import('src/pages/registerPage/registerPage.vue'),
      },
      {
        path: 'user-info-edit',
        component: () => import('src/pages/userInfoEdit/userInfoEdit.vue'),
      },
      {
        path: 'user-admin',
        component: () => import('src/pages/userAdmin/userAdmin.vue'),
      },
      {
        path: 'chat-page',
        component: () => import('src/pages/chatPage/chatPage.vue'),
      },
      {
        path: 'table-list',
        component: () => import('src/pages/db/tablelist.vue'),
      },
      {
        path: 'table-Page',
        component: () => import('src/pages/db/tablePage.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
