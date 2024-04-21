<template>
   <div>
      <h1>{{ categoryName }}</h1>
      <div class="grid-2--tablet-landscape-up">
         <menu-item v-for="dish in dishes" :key="dish.id" :dish="dish"></menu-item>
      </div>
   </div>
</template>

<script>
import { db } from '/src/firebase.js';
import { collection, getDocs } from "firebase/firestore";
import MenuItem from '../../layout/menu-item/MenuItem.vue';

export default {
   components: {
      MenuItem
   },
   props: ['category'],
   data () {
      return {
         dishes: [],
      }
   },
   computed: {
      categoryName() {
         return this.category.replace(/-/g, ' ').replace(/\b\w/g, firstLetter => firstLetter.toUpperCase());
      }
   },
   async mounted() {
      await this.fetchDishes();
   },
   methods: {
      async fetchDishes() {
         try {
            const path = this.$route.path.split('/')[1] + '/' + this.category; //e.g. food/korean-bbq
            const res = await getDocs(collection(db, path, 'dishes'));
            res.forEach((doc) => {
               const items = {
                  id: doc.data().name,
                  name: doc.data().name,
                  description: doc.data().description,
                  imgUrl: doc.data().imgUrl,
                  price: doc.data().price,
               };
               this.dishes.push(items);
            });
         } catch (error) {
            console.error('Error loading dishes:', error);
         }
      },
   },
   watch: {
      '$route'() {
         this.fetchData();
      }
   }
}
</script>

<style lang="scss" scoped>

</style>