<template>
  <div class="home">
    <h1 v-for="category in categories">{{ category }}</h1>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      categories: []
    };
  },
  created: function() {
    axios.get("/api/categories").then(response => {
      console.log("Categories: ", response.data);
      this.categories = response.data;
    });
  },
  methods: {}
};
</script>