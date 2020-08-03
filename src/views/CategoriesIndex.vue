<template>
  <!-- Category Info -->
  <div class="categoriesindex">
    <div class="categories" v-for="(category, categoryIndex) in categories">
      <div class="row">
        <div class="col-md-4 mb30">
          <div class="card">
            <router-link
              :to="`/categories/${category.id}`"
              class="category-title"
              >{{ category.name }}</router-link
            >
            <p :style="{ color: category.color }">{{ category.statement }}</p>
            <progress-ring
              :progress="getCategoryProgress(category)"
            ></progress-ring>

            <h4>{{ getCategoryProgress(category) }}%</h4>
            <div v-for="habit in category.habits">
              <p>{{ habit.name }}</p>
              <div class="ctg-bar-container">
                <div
                  class="ctg-bar"
                  :style="{ width: habit.habit_progress * 100 + '%' }"
                />
              </div>
            </div>
            <button
              type="button"
              class="btn btn-light"
              data-toggle="modal"
              data-target="#categoryModal"
              v-on:click="setCurrentCategory(categoryIndex)"
            >
              Edit Category
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Modal -->
    <div
      class="modal fade"
      id="categoryModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="categoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="categoryModalLabel">
              {{ currentCategory.name }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form v-on:submit.prevent="editCurrentCategory()">
            <div class="modal-body">
              Category Name:
              <input
                type="text"
                class="form-control"
                v-model="currentCategory.name"
                required
              />
              Category Statement:
              <input
                type="text"
                class="form-control"
                v-model="currentCategory.statement"
                value="Category Name"
              />
              Image URL:
              <input
                type="file"
                class="form-control"
                v-on:change="setFile($event)"
                ref="fileInput"
              />

              <p class="text-danger" v-for="error in errors">{{ error }}</p>

              <div class="form-group">
                <label for="colorSelect">Color:</label>
                <select class="form-control" id="colors">
                  <option>"Blue"</option>
                  <option>"Red"</option>
                  <option>"Gray"</option>
                  <option>"Green"</option>
                  <option>"Orange"</option>
                  <option>"Magenta"</option>
                </select>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                style="color:red"
                class="btn btn-link"
                v-on:click="deleteCurrentCategory()"
                data-dismiss="modal"
              >
                Delete Category
              </button>
              <input
                type="submit"
                class="btn btn-secondary"
                value="Save Changes"
              />
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#card {
  width: 500px;
  height: 300px;
}
.category-title {
  font-weight: bold;
  font-size: 1.6em;
}

.ctg-bar-container {
  text-align: center;
  width: 175px;
  height: 2px;
  margin: 40px;
  background-color: lightgray;
}
.ctg-bar {
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
  data: function() {
    return {
      categories: [],
      currentCategory: {},
      errors: [],
      categoryProgress: "",
    };
  },
  created: function() {
    axios.get("/api/categories").then((response) => {
      console.log("Categories: ", response.data);
      this.categories = response.data;
    });
  },

  methods: {
    editCurrentCategory: function() {
      var formData = new FormData();
      formData.append("name", this.currentCategory.name);
      formData.append("statement", this.currentCategory.statement);
      formData.append("image_file", this.currentCategory.image);
      formData.append("color", this.currentCategory.color);

      axios
        .patch(`/api/categories/${this.currentCategory.id}`, formData)
        .then((response) => {
          console.log("Category Edited", response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    deleteCurrentCategory: function() {
      axios.delete(`/api/categories/${this.currentCategory.id}`);
      this.$router.push("/categories");
    },
    setCurrentCategory: function(index) {
      this.currentCategory = this.categories[index];
      console.log(this.currentCategory);
    },
    getCategoryProgress: function(category) {
      return Math.round(category.category_progress * 100);
    },
    getHabitProgress: function(categoryProgress) {
      return Math.round(categoryProgress * 100);
    },
    setFile: function() {
      if (event.target.files.length > 0) {
        this.currentCategory.image = event.target.files[0];
      }
    },
  },
};
</script>
