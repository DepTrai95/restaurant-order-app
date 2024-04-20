<template>
   <div class="drinks">
      <h1 class="sr-only">Unsere Getränke</h1>
      <div class="grid-2--tablet-portrait-up grid-3--desktop-up">
         <router-link class="grid-item" v-for="category in drinksCategories" :key="category.id"
            :to="`/drinks/${category.path}`">
            <Card>
               <template #header>
                  <img :src="category.img" alt="">
               </template>
               <template #content>
                  {{ category.name }}
               </template>
            </Card>
         </router-link>
      </div>
   </div>
</template>

<script>
import { db } from '/src/firebase.js';
import { collection, getDocs } from "firebase/firestore";

export default {
   data() {
      return {
         drinksCategories: [],
      }
   },
   async mounted() {
      await this.fetchCategories();
   },
   methods: {
      async fetchCategories() {
         try {
            const response = await getDocs(collection(db, "drinks"));
            response.forEach((doc) => {
               const drinkCategory = {
                  img: doc.data().imgUrl,
                  name: doc.data().name,
                  path: doc.data().urlPath,
               };
               this.drinksCategories.push(drinkCategory);
            });
         } catch (error) {
            console.error('Error loading food categories:', error);
         }
      }
   }
}
</script>

<style lang="scss" scoped>
.drinks {
   margin-block: 5rem;
}

.p-card {
   transition: filter 0.3s ease-in-out;

   &:hover {
      filter: brightness(1.2);
   }
}

.p-card-header img {
   height: 300px;
   object-fit: cover;
   width: 100%;
}

.home {
   a {
      text-align: center;
   }

   .logo-container {
      margin-block: 5rem;

      img {
         height: 150px;
      }
   }

   .p-card {
      border-radius: 3rem;
      margin-block: 3rem;
   }

   .home-p-icon {
      font-size: 3rem;
      padding: 1.5rem;
      padding-bottom: 0;
   }
}
</style>