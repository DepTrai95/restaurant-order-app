<template>
   <div>
      <Card class="mt-4">
         <h1 class="sr-only">Aktuelle Öffnungszeiten</h1>
         <template #title>Aktuelle Öffnungszeiten</template>
         <template #content>
            <p class="font-medium mt-0">In unserer Filiale: Alaunstraße 1</p>
            <div class="table">
               <table>
                  <tbody>
                     <tr>
                        <td>Mo - Fr</td>
                        <td>{{ lunchTime }}</td>
                     </tr>
                     <tr>
                        <td></td>
                        <td>{{ dinnerTime }}</td>
                     </tr>
                     <tr>
                        <td>Sa - So</td>
                        <td>{{ lunchTime }}</td>
                     </tr>
                     <tr>
                        <td></td>
                        <td>{{ dinnerTime }}</td>
                     </tr>
                     <tr>
                        <td>Feiertage</td>
                        <td>{{ lunchTime }}</td>
                     </tr>
                     <tr>
                        <td></td>
                        <td>{{ dinnerTime }}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </template>
      </Card>
      <Card class="mt-6 inverted">
         <template #title>Zahlung bei Abholung</template>
         <template #content>
            <ul class="payment-icon-list">
               <li class="payment-icon">
                  <img src="/src/assets/img/paypal.png" alt="Bezahlung mit Paypal">
               </li>
               <li class="payment-icon">
                  <img src="/src/assets/img/googlepay.png" alt="Bezahlung mit Google Pay">
               </li>
               <li class="payment-icon">
                  <img src="/src/assets/img/applepay.png" alt="Bezahlung mit Apple Pay">
               </li>
               <li class="payment-icon">
                  <img src="/src/assets/img/visa.png" alt="Bezahlung mit VISA">
               </li>
               <li class="payment-icon">
                  <img src="/src/assets/img/mastercard.png" alt="Bezahlung mit MasterCard">
               </li>
            </ul>
         </template>
      </Card>
   </div>
</template>

<script>
export default {
   data() {
      return {
         phoneNumber: "0351 12345678",
         lunchTime: "12:00 bis 15:00",
         dinnerTime: "17:00 bis 22:30",
      }
   }
}
</script>

<style lang="scss">
.inverted {
   background-color: #e7e7e7;

   .p-card-title {
      color: $color-black;
   }

   .p-card-content {
      padding: 0;
   }
}
</style>

<style lang="scss" scoped>
table {
   border-spacing: 0 1rem;
   width: 100%;

   td {
      text-align: start;
      width: calc(100% / 2);
   }
}

.payment-icon-list {
   display: flex;
   flex-direction: row;
   flex-wrap: nowrap;
   list-style: none;
   padding: 0;
}

.payment-icon {
   max-width: 64px;
   height: auto;
}
</style>

