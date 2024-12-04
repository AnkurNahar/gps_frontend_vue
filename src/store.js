import { defineStore } from 'pinia';

export const useDataStore = defineStore('myStore', {
  state: () => ({
    items: [], 
  }),
  
  actions: {
    setItems(newItems) {
      this.items = newItems
    },
  },
})