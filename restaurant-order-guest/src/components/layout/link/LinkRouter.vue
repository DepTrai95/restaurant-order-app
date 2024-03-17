<template>
  <li>
    <router-link :to="link">{{ label }}</router-link>
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
  },
};
</script>

<style lang="scss" scoped>

.active-route {
  //wie löst man das mit den routes
  font-weight: 500;
}

</style>
