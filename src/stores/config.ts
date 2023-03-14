import { defineStore } from 'pinia';

export const useConfig = defineStore('config', {
  state: () => ({
    baseUrl: 'http://120.48.84.244:5000/',
  }),
  actions: {},
});
