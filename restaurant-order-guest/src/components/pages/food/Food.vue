<template>
   <div class="food">
      <h1 class="sr-only">Unsere Speisen</h1>
      <div class="grid-2--tablet-portrait-up grid-3--desktop-up">
         <router-link class="grid-item" v-for="category in foodCategories" :key="category.id"
            :to="`/food/${category.path}`">
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
         foodCategories: [],
         test: []
      }
   },
   async mounted() {
      await this.fetchCategories();
   },
   methods: {
      async fetchCategories() {
         try {
            const response = await getDocs(collection(db, 'food'));
            response.forEach((doc) => {
               const foodCategory = {
                  img: doc.data().imgUrl,
                  name: doc.data().name,
                  path: doc.data().urlPath,
               };
               this.foodCategories.push(foodCategory);
            });
         } catch (error) {
            console.error('Error loading food categories:', error);
         }
      }
   }
}
</script>

<style lang="scss" scoped>
.food {
   margin-block: 5rem;
}

.p-card {
   transition: filter 0.3s ease-in-out;

   &:hover {
      filter: brightness(1.2);
   }

   @include for-phone-only {
      margin-bottom: 3rem;
   }
}

.p-card-header img {
   border-top-left-radius: 5px;
   border-top-right-radius: 5px;
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