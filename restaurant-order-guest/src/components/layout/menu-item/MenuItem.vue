<template>
   <div class="grid-item">
      <div class="menu-item" :id="dish.id">
         <div class="menu-item__img">
            <img :src="dish.imgUrl" alt="" height="200">
         </div>
         <div class="menu-item__info">
            <h3 class="menu-item__name">{{ dish.name }}</h3>
            <div class="menu-item__description">{{ dish.description }}</div>
            <div class="menu-item__price">{{ dish.price }}€</div>
            <button class="menu-item__button">
               <font-awesome-icon icon="fa-plus"/>
            </button>
         </div>
      </div>
   </div>
</template>

<script> 
   export default {
      props: ['dish']
   }
</script>

<style lang="scss" scoped>
.menu-item {
   background-color: $color-background-card;
   border: 1px solid $color-background-card;
   border-radius: 5px;
   display: flex;
   min-height: 150px;
   padding: 1.5rem;

   @include for-tablet-landscape-up {
      min-height: 150px;
   }

   &__img {
      width: calc(100% / 3);
      
      img {
         aspect-ratio: 1;
         height: auto;
         object-fit: cover;
      }
   }

   &__info {
      display: flex;
      flex-direction: column;
      padding-inline: 1.5rem;
      position: relative;
      width: calc(100% / 1.5);
   }

   &__name {
      margin-top: 0;

      @include for-phone-only {
         margin-bottom: .25em;
      }
   }

   &__description {
      flex: 1 0 auto;
      font-size: 1.5rem;
      font-weight: 300;
      // hide too long texts
      overflow: hidden;

      @include for-tablet-portrait-down {
         text-overflow: ellipsis;
         /* WebKit-Browser */
         display: -webkit-box;
         -webkit-box-orient: vertical;
         -webkit-line-clamp: 3;
      }
   }

   &__button {
      background-color: $color-primary;
      border: $color-primary;
      border-radius: 5px;
      bottom: 0;
      cursor: pointer;
      padding: 0.5rem 0.75rem;
      position: absolute;
      right: 0;
      transition: filter .25s ease-in-out; 

      &:hover {
         filter: brightness(1.2)
      }
   }
}
</style>