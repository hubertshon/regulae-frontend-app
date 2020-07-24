<template>
  <div class="home">
    <p v-for="category in categories">{{ category }}</p>
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