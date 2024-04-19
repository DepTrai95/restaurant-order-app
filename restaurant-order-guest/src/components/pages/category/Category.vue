<template>
   <div>
      <h1>{{ categoryName }}</h1>
   </div>
</template>

<script>
export default {
   props: ['category'],
   data () {
      return {
         foodCategory: [],
         drinkCategory: [],
      }
   },
   computed: {
      categoryName() {
         return this.category.replace(/-/g, ' ').replace(/\b\w/g, firstLetter => firstLetter.toUpperCase());
      }
   },
   async created() {
      await this.fetchData();
   },
   methods: {
      // async fetchData() {
      //    try {
      //       if (this.$route.path.startsWith('/food')) {
      //          const response = await fetch('/food-category.json');
      //          if (!response.ok) {
      //             throw new Error('Network response was not ok');
      //          }
      //          const data = await response.json();
      //          this.foodCategory = data;
      //       } else if (this.$route.path.startsWith('/drinks')) {
      //          const response = await fetch('/drink-category.json');
      //          if (!response.ok) {
      //             throw new Error('Network response was not ok');
      //          }
      //          const data = await response.json();
      //          this.drinkCategory = data;
      //       }
      //    } catch (error) {
      //       console.error('Error loading category data:', error);
      //    }
      // },
      getCategoryName() {
         // Find category name based on the route
         const categoryData = this.$route.path.startsWith('/food') ? this.foodCategory : this.drinkCategory;
         const matchingCategory = categoryData.find(item => item.link === this.category);
         return matchingCategory ? matchingCategory.categoryName : '';
      }
   },
   watch: {
      '$route'() {
         this.fetchData();
      }
   }
}
</script>

<style lang="scss" scoped>

</style>