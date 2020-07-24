<template>
  <div class="categoriesindex">
    <div class="categories" v-for="category in categories">
      <h3>{{ category.name }}</h3>
      <p>{{ category.statement }}</p>
      <p>{{ category.frequency }}</p>
    </div>
  </div>
</template>

<style>
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