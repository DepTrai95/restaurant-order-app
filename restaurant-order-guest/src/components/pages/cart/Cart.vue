<template>
   <div>
      <h1>Warenkorb</h1>
      <div>
         <p>{{ cart }}</p>
         <p>{{ totalPrice }}</p>
      </div>
   </div>
</template>

<script>
 export default {
   data() {
      return {
         cart: [],
         totalPrice: 0,
      };
   },
   mounted() {
      // this.cart = this.$store.cart;
      // this.totalPrice = this.$store.totalPrice;
   },
}
</script>

<style lang="scss" scoped>

</style>