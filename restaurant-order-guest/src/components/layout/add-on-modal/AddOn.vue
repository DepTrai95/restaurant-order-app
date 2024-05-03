<template>
   <div class="grid-2--tablet-portrait-up dialog__menu-item" :id="params && params.id">
      <div class="grid-item">
         <div class="dialog__menu-item__img">
            <Image :src="params && params.img" alt="" height="200" preview />
         </div>
      </div>
      <div class="grid-item">
         <div class="dialog__menu-item__description">
            {{ params && params.description }}
         </div>
         <div class="separator-line"></div>
         <div class="dialog__menu-item__addons">
            <div v-for="addon in addons" :key="addon.name" class="dialog__menu-item__addons__item flex align-items-center">
               <Checkbox v-model="selectedAddons" :inputId="addon.name" :name="addon.name" :value="addon.price" />
               <label :for="addon.name">
                  <span>{{ addon.name }}</span>
                  <span>+{{ parseInt(addon.price).toFixed(2) }}€</span>
               </label>
            </div>
         </div>
         <div class="separator-line"></div>
         <div class="dialog__menu-item__amount">
            <div class="dialog__menu-item__action">
               <button aria-label="Verringere Anzahl" class="dialog__menu-item__amount__decrease"
                  @click="decreaseAmount">
                  <font-awesome-icon icon="fa-minus" />
               </button>
               <span>{{ amount }}</span>
               <button aria-label="Erhöhe Anzahl" class="dialog__menu-item__amount__increase" @click="increaseAmount">
                  <font-awesome-icon icon="fa-plus" />
               </button>
            </div>
            <div class="dialog__menu-item__price">
               <span class="dialog__menu-item__price__info">Preis: {{ params && totalPrice }}€</span>
               <span class="dialog__menu-item__price__info-small">inkl. MwSt.</span>
            </div>
         </div>
         <div class="dialog__menu-item__note">
            <input class="form-control" type="text" v-model="orderNote" placeholder="Anmerkungen">
            <font-awesome-icon icon="fa-x" v-if="orderNote" @click="clearInput" class="clear-icon" />
         </div>
         <div class="dialog__menu-item__action">
            <button class="btn-primary">
               <font-awesome-icon icon="fa-cart-arrow-down" />
               <span>Zum Korb hinzufügen</span>
            </button>
         </div>
      </div>
   </div>
</template>

<script setup>
import { ref, inject, computed, onMounted } from 'vue';
const dialogRef = inject('dialogRef');
const params = ref(null);
const amount = ref(1);
const orderNote = ref(null);

const addons = ref([
   { name: 'Reis', price: 3.00 },
   { name: 'Süßkartoffelpommes', price: 4.99 },
   { name: 'Kimchi', price: 2.99 }
]);

const selectedAddons = ref([]);

function decreaseAmount() {
   if (amount.value > 1) {
      amount.value--;
   }
}

function increaseAmount() {
   amount.value++;
}

const totalPrice = computed(() => {
   return parseFloat(amount.value * params.value.price).toFixed(2);
});

const clearInput = () => {
   orderNote.value = '';
};

onMounted(() => {
  params.value = dialogRef?.value?.options?.props?.data;
});
</script>

<style lang="scss">
.p-dialog-title {
  @include responsive-font-size(2.2rem, 2.4rem);
}

.p-dialog-header-close {
  svg {
    height: 1.5rem;
    width: 1.5rem;
  }
}

.p-image img {
   aspect-ratio: 1;
   border-radius: 5px;
   height: auto;
   object-fit: cover;
}

.p-image-mask {
   --maskbg: rgba(0, 0, 0, 0.5);
}

.p-checkbox .p-checkbox-box {
   border-radius: 3px;
   height: 18px;
   margin: auto;
   width: 18px;
}
</style>

<style lang="scss" scoped>
.btn-primary {
   align-items: center;
   background-color: $color-primary;
   border: 1px solid $color-primary;
   border-radius: 20px;
   cursor: pointer;
   display: flex;
   gap: 1rem;
   padding: 1rem;
   transition: background-color .3s, border-color .3s;

   &:hover,
   &:focus {
      background-color: $color-primary-dark;
      border-color: $color-primary-dark;
   }

   .fa-cart-arrow-down {
      height: 1.8rem;
      width: 1.8rem;
   }
}

.form-control {
   border: 1px solid $color-background-card;
   border-radius: 5px;
   padding: 1.25rem 1rem;
   width: 100%;
}

.dialog__menu-item__note {
   margin-block: 1.5rem;
   position: relative;
}

.clear-icon {
   bottom: 0;
   cursor: pointer;
   height: 1.4rem;
   position: absolute;
   right: 0;
   transform: translate(-100%, -100%);
   width: 1.4rem;
}

.grid-item {
   margin-bottom: 0 !important;

   &:last-child {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      @include for-phone-only {
         margin-top: 1rem;
         gap: 1rem;
      }
   }
}

.separator-line {
   border: 1px solid $color-primary;
   margin-block: 1.5rem;
}

.dialog__menu-item {
  font-family: "DMSans", sans-serif;

   &__description {
      @include responsive-font-size(1.5rem, 1.6rem);
      font-weight: 300;
   }

   &__amount {
      align-items: center;
      display: flex;
      gap: 5rem;
   }

   &__price__info-small {
      @include responsive-font-size(1.3rem, 1.4rem);
      display: block;
      font-weight: 300;
   }

   &__addons {

      &__item {
         margin-bottom: .5rem;
      }

      label {
         @include responsive-font-size(1.5rem, 1.6rem);
         display: flex;
         font-weight: 400;
         justify-content: space-between;
         padding-inline: 1rem;
         width: 100%;
      }
   }

   &__action {
      align-items: center;
      display: flex;
      gap: 1rem;
   }

   &__amount__decrease,
   &__amount__increase {
      background-color: $color-primary;
      border: 1px solid $color-primary;
      border-radius: 100%;
      cursor: pointer;
      padding: 0;

      svg {
         height: 14px;
         padding: 0.5rem;
         width: 14px;
         vertical-align: middle;
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
      transition: filter 0.25s ease-in-out;

      &:hover {
         filter: brightness(1.2);
      }
   }
}
</style>