import { defineStore } from 'pinia';

export const useHeaderBtnMenuData = defineStore('headerBtnMenuData', {
  state: () => ({
    leftDrawerOpen: false,
    userName: 'testa',
    searchType: 'anki',
  }),
});
