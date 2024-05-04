import { defineStore } from 'pinia';

// state ~= data, getters ~= computed, actions ~= methods 
export const cartStore = defineStore('cart', {
  state: () => {
      return { 
         cart: [],
      }
  },
  getters: {}, 
  actions: {
      addToStore(newItem) {
         const isSameItem = (item1, item2) => {
            // compare ID, Note und Add-Ons
            return item1.id === item2.id &&
                   item1.note === item2.note &&
                   JSON.stringify(item1.addons) === JSON.stringify(item2.addons);
         };

         if (!this.cart.some(item => isSameItem(item, newItem))) {
            // if not exists push to cart
            this.cart.push(newItem);
         } else {
            // if exists increase quantity
            const existingItemIndex = this.cart.findIndex(item => item.id === newItem.id);
            const existingItem = this.cart[existingItemIndex];
            existingItem.quantity += newItem.quantity;
         }
      },
  },
})