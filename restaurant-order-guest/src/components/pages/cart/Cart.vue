<template>
   <div>
      <h1>Warenkorb</h1>
      <div class="table">
         <table>
            <thead>
               <tr>
                  <th>Artikel im Korb</th>
                  <th>Anzahl</th>
                  <th>Preis</th>
               </tr>
            </thead>
            <tbody>
               <tr class="cart-item" v-for="item in cartStore.cart" :key="item.id">
                  <td>
                     <span class="cart-item__name">{{ item.name }}</span>
                     <span class="cart-item__addon" v-for="addon in item.addons" :key="addon">
                        {{ addon.name }} - {{ addon.price }} €
                     </span>
                  </td>
                  <td>
                     <span class="cart-item__amount">
                        <button aria-label="Verringere Anzahl" class="cart-item__amount__decrease"
                           @click="decreaseAmount">
                           <font-awesome-icon icon="fa-minus" />
                        </button>
                        <span>{{ item.quantity }}</span>
                        <button aria-label="Erhöhe Anzahl" class="cart-item__amount__increase" @click="increaseAmount">
                           <font-awesome-icon icon="fa-plus" />
                        </button>
                     </span>
                  </td>
                  <td>
                     <span class="cart-item__price">{{ sumProduct(item.price, item.addons) }} €</span>
                  </td>
               </tr>
            </tbody>
            <tfoot>
               <tr>
                  <td colspan="3" scope="row">Gesamt: {{ sumCart() }} €</td>
               </tr>
               <tr>
                  <td colspan="3" scope="row">Alle Preisangaben inkl. MwSt.</td>
               </tr>
            </tfoot>
         </table>
      </div>
   </div>
</template>

<script>
import { cartStore } from '../../../store';
import { mapStores } from 'pinia';

export default {
   data() {
      return {
         totalPrice: 0,
         totalProductPrices: [],
      };
   },
   computed: {
      ...mapStores(cartStore),
      sumProduct() {
         return (price, addons) => {
            const sum = addons.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0) + parseFloat(price);
            this.totalProductPrices.push(sum);
            return parseFloat(sum).toFixed(2);
         }
      },
      sumCart() {
         return () => {
            return this.totalProductPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
         }
      }
   },
}
</script>

<style lang="scss" scoped>
.table {
   overflow-x: auto;
}

table {
   border-collapse: collapse;
   width: 100%;
}

thead tr,
tbody tr {
   >:nth-child(2) {
      text-align: center;
      vertical-align: top;
      width: 150px;
   }

   >:nth-child(3) {
      text-align: end;
      vertical-align: top;
      width: 150px;
   }

   th, td {
      border-bottom: 1px solid $color-white;
      padding: 1rem;
      text-align: start;
   }
}

thead {
   @include responsive-font-size(2rem, 2.4rem);
}

tbody {
   @include responsive-font-size(1.6rem, 1.8rem);
}

tfoot {
   @include responsive-font-size(2rem, 2.4rem);

   tr +tr td {
      @include responsive-font-size(1.5rem, 1.6rem);
      font-weight: 300;
      padding-top: 0; 
   }
   
   td {
      padding-block: 2rem 0.5rem;
      text-align: end;
   }
}

.cart-item__addon,
.cart-item__addon__price {
   @include responsive-font-size(1.4rem, 1.6rem);
   display: flex;
   flex-direction: column;
   padding: 1rem 1rem 0;
}

.cart-item__amount {
   align-items: center;
   display: flex;
   justify-content: center;
   gap: 2rem;

   &__decrease,
   &__increase {
      background-color: $color-primary;
      border: 1px solid $color-primary;
      border-radius: 100%;
      cursor: pointer;
      padding: 0;
   
      svg {
         height: 14px;
         padding: 0.5rem;
         width: 14px;
         vertical-align: middle;
      }
   } 
}
</style>