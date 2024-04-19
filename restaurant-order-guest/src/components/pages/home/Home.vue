<template>
   <div class="home">
      <h1 class="sr-only">Startseite</h1>
      <div class="logo-container">
         <img src="/src/assets/favicon/vue.svg" alt="Logo des Restaurants" width="200" height="100">
      </div>
      <div class="grid-2--tablet-landscape-up">
         <router-link class="grid-item" v-for="item in internLink" :key="item.id" :to="item.link">
            <Card>
               <template #header>
                  <div class="home-p-icon">
                     <font-awesome-icon :icon="item.icon" />
                  </div>
               </template>
               <template #content>
                  {{ item.category }}
               </template>
            </Card>
         </router-link>
         <a class="grid-item" v-for="item in externLink" :key="item.id" :href="item.link">
            <Card>
               <template #header>
                  <div class="home-p-icon">
                     <font-awesome-icon :icon="item.icon" />
                  </div>
               </template>
               <template #content>
                  {{ item.category }}
               </template>
            </Card>
         </a>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         internLink: [
            {
               icon: 'utensils',
               category: 'Speisen',
               link: '/food'
            },
            {
               icon: 'wine-glass',
               category: 'Getränke',
               link: '/drinks'
            },
            {
               icon: 'gift',
               category: 'Gutschein',
               link: '/voucher'
            },
         ],
         externLink: [
            {
               icon: 'globe',
               category: 'Unsere Website',
               link: 'https://aroi-dresden.de'
            },
            {
               icon: 'fa-brands fa-facebook',
               category: 'Facebook',
               link: 'https://www.facebook.com/anamit.restaurant/'
            },
            {
               icon: 'fa-brands fa-instagram',
               category: 'Instagram',
               link: 'https://www.instagram.com/ramen1974dresden/'
            },
            {
               icon: 'fa-brands fa-tiktok',
               category: 'TikTok',
               link: 'https://www.instagram.com/ramen1974dresden/'
            },
         ]
      }
   },
}
</script>

<style lang="scss" scoped>
.p-card {
   transition: filter 0.3s ease-in-out;
   &:hover {
      filter: brightness(1.2);
   }
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