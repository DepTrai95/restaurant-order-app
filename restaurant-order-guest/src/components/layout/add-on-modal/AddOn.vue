<template>
   <div>
      <h2>{{ params && params.name }}</h2>
      <img :src="params && params.img">
      <h4>{{ params && params.description }}</h4>
      <h4>{{ params && params.price }}</h4>
   </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
const dialogRef = inject('dialogRef');
const params = ref(null);

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
</style>