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
               <tr v-for="item in cartStore.cart" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>
                     <span class="cart-item">
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
                  <td>{{ item.price }} €</td>
               </tr>
            </tbody>
            <tfoot>
               <tr>
                  <td colspan="3" scope="row">Gesamt: {{ totalPrice }} €</td>
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
      };
   },
   computed: {
      ...mapStores(cartStore),
   },
   mounted() {
      // this.totalPrice = this.$store.totalPrice;
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
      width: 150px;
   }

   >:nth-child(3) {
      text-align: end;
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



.cart-item {
   align-items: center;
   display: flex;
   justify-content: center;
   gap: 2rem;

   &__amount__decrease,
   &__amount__increase {
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