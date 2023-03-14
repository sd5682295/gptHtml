import axios from 'axios';
import { defineStore } from 'pinia';
import { useConfig } from 'src/stores/config';

export const useApiKey = defineStore('apiKey', {
  state: () => ({
    apiKeyData: '',
  }),
  getters: {},
  actions: {
    saveApiKey() {
      const session = localStorage.getItem('session');
      axios
        .post<string, { msg: string }>(
          `${useConfig().baseUrl}/saveApiKey/`,
          JSON.stringify({ apiKeyData: this.apiKeyData, session }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        )
        .then((response) => {
          console.log('Save API Key response:', response.msg);
        })
        .catch((error) => {
          console.error('Save API Key error:', error);
        });
    },
  },
});
