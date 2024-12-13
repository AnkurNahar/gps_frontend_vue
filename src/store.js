import { defineStore } from 'pinia';

export const useDataStore = defineStore('myStore', {
  state: () => ({

    devices: [], 
    preferences: {
      sort_by: "",
      hidden_device_ids: [],
      hidden_device_icons: {}
    },
    authToken: localStorage.getItem('authToken') || '',
    
  }),
  
  actions: {

    setDevices(newDevices) {
      this.devices = newDevices
    },
    setPreferences(newPreferences) {
      this.preferences = newPreferences
    },
    setAuthToken(newToken) {
      this.authToken = newToken
    },
    
  },
})