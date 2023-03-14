import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        path: 'chat-page',
        component: () => import('src/pages/chatPage/chatPage.vue'),
      },
      {
        path: 'register-page',
        component: () => import('src/pages/registerPage/registerPage.vue'),
      },
      {
        path: 'buy-page',
        component: () => import('src/pages/buyPage/buyPage.vue'),
      },
      {
        path: 'user-info-edit',
        component: () => import('src/pages/userInfoEdit/userInfoEdit.vue'),
      },
      {
        path: 'user-admin',
        component: () => import('src/pages/userAdmin/userAdmin.vue'),
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
