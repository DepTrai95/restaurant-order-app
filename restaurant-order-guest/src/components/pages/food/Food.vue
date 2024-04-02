<template>
   <div class="food">
      <h1 class="sr-only">Unsere Speisen</h1>
      <div class="grid-2--tablet-portrait-up grid-3--desktop-up">
         <router-link class="grid-item" v-for="category in foodCategory" :key="category.id" :to="`/food/${category.link}`">
            <Card>
               <template #header>
                  <img :src="`/src/assets/img/food-category/${category.img}.jpeg`" alt="">
               </template>
               <template #content>
                  {{ category.categoryName }}
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
         foodCategory: [
            {
               "img": "foodCategory1",
               "categoryName": "Unsere Specials",
               "link": "our-specials/"
            },
            {
               "img": "foodCategory2",
               "categoryName": "Vorspeisen zum Teilen",
               "link": "sharing/"
            },
            {
               "img": "foodCategory6",
               "categoryName": "Korean BBQ",
               "link": "korean-bbq/"
            },
            {
               "img": "foodCategory4",
               "categoryName": "Reis und Nudelgerichte",
               "link": "rice-noodle/"
            },
            {
               "img": "foodCategory5",
               "categoryName": "Vegetarische Gerichte",
               "link": "vegatarian/"
            },
            {
               "img": "foodCategory3",
               "categoryName": "Kids Plates (für Kinder)",
               "link": "kids/"
            }
         ],
      }
   }

   // async mounted() {
   //    await this.fetchCategories();
   // }, 
   // methods: {
   //    async fetchCategories() {
   //       try {
   //          const response = await fetch('/food-category.json');
   //          if (!response.ok) {
   //             throw new Error('Network response was not ok');
   //          }
   //          const data = await response.json();
   //          this.foodCategory = data;
   //       } catch (error) {
   //          console.error('Error loading food categories:', error);
   //       }
   //    }
   // }
}
</script>

<style lang="scss" scoped>
.p-card {
   margin-top: 5rem;
   transition: filter 0.3s ease-in-out;

   &:hover {
      filter: brightness(1.2);
   }
}
// UPDATE THIS LATER
.p-card-header img {
   min-height: 300px;
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