<template>
  <!-- Category Info -->
  <div class="categoriesindex">
    <div class="categories" v-for="(category, categoryIndex) in categories">
      <router-link :to="`/categories/${category.id}`" class="category-title">{{ category.name }}</router-link>
      <p>{{ category.statement }}</p>
      <progress-ring radius="75" stroke="2" :progress="getCategoryProgress(category)"></progress-ring>
      
      
      <h4>{{ getCategoryProgress(category) }}%</h4>
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
          <form v-on:submit.prevent="editCurrentCategory()">
            <div class="modal-body" >
            
              Category Name: <input type="text" class="form-control" v-model="currentCategory.name" required>
              Category Statement: <input type="text" class="form-control" v-model="currentCategory.statement" value="Category Name">
              Image URL: <input type="text" class="form-control" v-model="currentCategory.image_url" value="Image URL">
            
              <p class="text-danger" v-for="error in errors"> {{error}} </p>

              <div class="form-group">
                <label for="colorSelect">Color:</label>
                <select class="form-control" id="colors">
                  <option> Blue</option>
                  <option> Red</option>
                  <option> Gray</option>
                  <option> Green</option>
                  <option> Orange</option>
                  <option> Magenta</option>
                </select>
              </div>
            </div>
            

            <div class="modal-footer">
              <button type="button" style="color:red" class="btn btn-link" v-on:click="deleteCurrentCategory()" data-dismiss="modal">Delete Category</button>
              <input type="submit" class="btn btn-secondary" value="Save Changes">
              <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  



  </div>
</template>

<style>
.category-title {
  font-weight: bold;
  font-size: 1.6em;
}

.ctg-idx-bar-container {
  text-align: center;
  width: 175px;
  height: 2px;
  margin: 40px;
  background-color: lightgray;
}

.ctg-idx-bar {
  background-color: rgb(65, 65, 65);
  height: 100%;
  width: 0%;
}

circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>

<script>
import axios from "axios";
import ProgressRing from "../components/ProgressRing.vue";
export default {
  components: {
    ProgressRing,
  },
  data: function () {
    return {
      categories: [],
      currentCategory: {},
      errors: [],
      categoryProgress: "",
      fontcolor: "green",
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
          console.log("Category Edited", response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    deleteCurrentCategory: function () {
      axios.delete(`/api/categories/${this.currentCategory.id}`);
      this.$router.push("/categories");
    },
    setCurrentCategory: function (index) {
      this.currentCategory = this.categories[index];
      console.log(this.currentCategory);
    },
    getCategoryProgress: function (category) {
      return Math.round(category.category_progress * 100);
    },
    getHabitProgress: function (categoryProgress) {
      return Math.round(categoryProgress * 100);
    },
  },
};
</script>