<template>
  <li>
    <router-link :class="style" :to="link">
      <font-awesome-icon :icon="icon" class="mr-2" />{{ label }}
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    }
  },
};
</script>

<style lang="scss" scoped>
a {
  color: $color-white;
  font-weight: 500;
  text-decoration: none;
  width: 100%;
}
</style>
