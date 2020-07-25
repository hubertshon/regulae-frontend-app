<template>
  <div class="categoriesindex">
    <div class="categories" v-for="category in categories">
      <router-link :to="`/categories/${category.id}`" class="category-title">{{ category.name }}</router-link>
      <p>{{ category.statement }}</p>
      <p>{{ category.frequency }}</p>
    </div>
  </div>
</template>

<style>
.category-title {
  font-weight: bold;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      categories: [],
    };
  },
  created: function () {
    axios.get("/api/categories").then((response) => {
      console.log("Categories: ", response.data);
      this.categories = response.data;
    });
  },
  methods: {},
};
</script>