<template>
   <header class="header">
      <nav aria-label="Hauptnavigation">
         <Sidebar></Sidebar>
         <Menubar mobileActive="false" :model="items">
            <template #item="{ item, props }">
               <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                  <a :href="href" v-bind="props.action" @click="navigate">
                     <font-awesome-icon :icon="item.icon" />
                     <span :class="{'hidden' : isMobile }" class="ml-2">{{ item.label }}</span>
                  </a>
               </router-link>
            </template>
         </Menubar>
      </nav>
   </header>
</template>

<script>
import Sidebar from '../sidebar/Sidebar.vue';

export default {
   components: {
      Sidebar,
   },
   data() {
      return {
         isMobile: '',
         items: [
            {
               label: 'Home',
               icon: 'house',
               route: '/'
            },
            {
               label: 'Speisen',
               icon: 'utensils',
               route: '/food'

            },
            {
               label: 'Getränke',
               icon: 'wine-glass',
               route: '/drinks'
            },
            {
               label: 'Bestellt',
               icon: 'history',
               route: '/orders'
            },
            {
               label: 'Warenkorb',
               icon: 'cart-shopping',
               route: '/cart'
            }
         ]
      };
   },
   methods: {
      throttledCheckIsMobile() {
         if (!this.throttleTimeout) {
            this.throttleTimeout = setTimeout(() => {
               this.checkIsMobile();
               this.throttleTimeout = null;
            }, 250);
         }
      },
      checkIsMobile() {
         this.isMobile = window.innerWidth <= 700;
      },
   },
   mounted() {
      //loading page check size
      this.checkIsMobile();
      window.addEventListener("resize", this.checkIsMobile);
   },
   destroyed() {
      window.removeEventListener("resize", this.throttledCheckIsMobile);
   },
};
</script>

<style lang="scss">
.header {
   position: fixed;
   left: 0;
   right: 0;
   top: 0;
   z-index: 1000;
}

.p-menubar {
   justify-content: flex-end;
   padding: 1.5rem;
   
   @include for-phone-only {
      font-size: 2.4rem !important;
      padding: 1rem;
   }

   .ml-2 {
      margin-left: .5rem;
   }
}

.p-menuitem-content {
   @media (max-width: (700px - 1px)) {
      align-items: center;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      height: 48px;
      transition: background-color .3s;
      width: 48px;
   }
}

.p-menuitem-link {
   justify-content: center;
}

.p-menubar-button {
   display: none;
}

.p-menubar-root-list {
   @include for-tablet-landscape-down {
      border: none;
      box-shadow: none;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      overflow-x: auto;
      position: relative;
      width: unset;
   }
}
</style>