<template>
  <div class="categoriesindex">
    <div class="categories" v-for="(category, categoryIndex) in categories">
      <router-link :to="`/categories/${category.id}`" class="category-title">{{ category.name }}</router-link>
      <p>{{ category.statement }}</p>
      <p>{{ category.category_progress}}</p>
      <button type="button" class="btn btn-light" data-toggle="modal" data-target="#categoryModal" v-on:click="setCurrentCategory(categoryIndex)">
        Edit Category
      </button>
    </div>

    <!-- Category Modal -->
    <div class="modal fade" id="categoryModal" tabindex="-1" role="dialog" aria-labelledby="categoryModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="categoryModalLabel">{{ currentCategory.name }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" >
            <form>
              Category Name: <input type="text" class="form-control" v-model="currentCategory.name">
              Category Statement: <input type="text" class="form-control" v-model="currentCategory.statement" value="Category Name">
              Image URL: <input type="text" class="form-control" v-model="currentCategory.image_url" value="Image URL">
            </form>
            <p class="text-danger" v-for="error in errors"> {{error}} </p>
          </div>
          <div class="modal-footer" v-on:submit.prevent="editCurrentCategory()">
            <button type="button" class="btn btn-link" v-on:click="deleteCurrentCategory()" data-dismiss="modal">Delete Category</button>
            <button type="button" class="btn btn-secondary" v-on:click="editCurrentCategory()" data-dismiss="modal">Save Changes</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
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
      currentCategory: {},
      errors: [],
    };
  },
  created: function () {
    axios.get("/api/categories").then((response) => {
      console.log("Categories: ", response.data);
      this.categories = response.data;
    });
  },
  methods: {
    editCurrentCategory: function () {
      var params = {
        name: this.currentCategory.name,
        statement: this.currentCategory.statement,
        image_url: this.currentCategory.image_url,
      };
      axios
        .patch(`/api/categories/${this.currentCategory.id}`, params)
        .then((response) => {
          this.$router.push("/categories");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    deleteCurrentCategory: function () {
      axios.delete(`/api/categories/${this.currentCategory.id}`);
      this.$router.go("/categories");
    },
    setCurrentCategory: function (index) {
      this.currentCategory = this.categories[index];
      console.log(this.currentCategory);
    },
  },
};
</script>