<template>
  <div class="categories-new">
    <form v-on:submit.prevent="createCategory()" class="new-category">
      Name:<input type="text" v-model="newCategoryName">
      Statement:<input type="text" v-model="newCategoryStatement">
      Image URL:<input type="text" v-model="newCategoryImageUrl">
      <input type="submit" value="Create Category">
    </form>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newCategoryName: "",
      newCategoryStatement: "",
      newCategoryImageUrl: "",
    };
  },
  methods: {
    createCategory: function () {
      var params = {
        name: this.newCategoryName,
        statement: this.newCategoryStatement,
        image_url: this.newCategoryImageUrl,
      };
      axios.post("/api/categories", params).then((response) => {
        console.log("Success", response.data);
        this.$router.push(`/categories`);
      });
    },
  },
};
</script>