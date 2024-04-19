<template>
   <div class="card sidebar">
      <Sidebar v-model:visible="visible">
         <template #container="{ closeCallback }">
            <div class="flex flex-column h-full">
               <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                  <span class="font-semibold text-2xl text-primary">MATJA</span>
                  <Button type="button" @click="closeCallback">
                     <font-awesome-icon icon="fa-times"></font-awesome-icon>
                  </Button>
               </div>
               <div class="overflow-y-auto">
                  <ul class="list-none px-3 py-4 m-0 sidebar-list">
                     <li>
                        <ul class="list-none p-0 m-0 overflow-hidden">
                           <LinkRouter
                              class="flex align-items-center cursor-pointer px-3 py-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                              link="/" label="Home" icon="house" @click="visible = false">
                           </LinkRouter>
                           <LinkRouter
                              class="flex align-items-center cursor-pointer px-3 py-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                              link="/opening-hours" label="Öffnungszeiten" icon="clock" @click="visible = false">
                           </LinkRouter>
                           <LinkRouter
                              class="flex align-items-center cursor-pointer px-3 py-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                              link="/allergies" label="Allergene" icon="fa-wheat-awn" @click="visible = false">
                           </LinkRouter>
                           <li class="flex align-items-center cursor-pointer px-3 py-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                              <Button @click="shareApp()">
                                 <font-awesome-icon icon="share-nodes" class="mr-2" />
                                 <span class="font-medium">App teilen</span>
                              </Button>
                           </li>
                           <li class="flex align-items-center cursor-pointer px-3 py-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                              <Button @click="refreshPage()">
                                 <font-awesome-icon icon="fa-refresh" class="mr-2" />
                                 <span class="font-medium">Neu laden</span>
                              </Button>
                           </li>
                           <LinkRouter
                              class="flex align-items-center cursor-pointer px-3 py-4 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                              link="/settings" label="Einstellungen" icon="cog" @click="visible = false">
                           </LinkRouter>
                        </ul>
                     </li>
                  </ul>

               </div>
               <div class="mt-auto">
                  <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
                  <a class="m-3 flex align-items-center cursor-pointer px-3 py-4 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                     href="https://deptrai.de">
                     <span class="font-bold">Developed by DepTrai</span>
                  </a>
               </div>
            </div>
         </template>
      </Sidebar>
      <Button icon="fa-bars" @click="visible = true">
         <font-awesome-icon icon="fa-bars"></font-awesome-icon>
      </Button>
   </div>
</template>

<script>
import LinkRouter from '../link/LinkRouter.vue';

export default {
  components: {
   LinkRouter,
  },
  data() {
    return {
      visible: false,
    };
  },
   methods: {
      refreshPage() {
         window.location.reload();
      }
   }
};
</script>

<style lang="scss" scoped>
   .sidebar {
      left: 5px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;

   >.p-button {
         @include responsive-font-size(2.2rem, 2.4rem);
         width: 5rem;
      }
   }
   
   .p-button {
      background-color: transparent;
      border: none;
      color: $color-white;
   }
</style>

<style lang="scss">
.p-sidebar {
   width: 30rem;

   li li {
      @include responsive-font-size(2rem, 2.4rem);
      padding: 0 !important;

      > a,
      > .p-button {
         padding-block: 1.5rem;
         padding-inline: 1rem
      }
   }
   
   .p-button {
      @include responsive-font-size(2rem, 2.4rem);
      width: 100%;
   }
}
</style>