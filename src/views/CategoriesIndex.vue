<template>
  <!-- Category Info -->
  <div class="categoriesindex">
    <div class="container">
      <!-- <div class="categories">

      </div> -->

      <div class="row special-feature">
        <div class="col-lg-4 margin20 wow animated zoomIn" data-wow-duration=".5s" data-wow-delay=".2s" v-for="(category, categoryIndex) in categories">
          <div class="s-feature-box text-center" :href="`/categories/${category.id}`" :style="{ backgroundColor: category.color }">
            <div class="mask-top">
              <!-- Icon -->
                <progress-ring
                  :progress="getCategoryProgress(category)"
                ></progress-ring>
                <h4>{{ getCategoryProgress(category) }}%</h4>

              <!-- Title -->
              <h1 :href="`/categories/${category.id}`">
                  {{ category.name }}</h1>
            </div>
            <!--HOVER EFFECT-->
            <div class="mask-bottom">
              <inline-svg :src="category.image_url" class="category-icon" />
              <h2 style="color: white;">{{category.statement}}</h2>
              <div class="category-habits-idx" v-for="habit in category.habits">
              <p>{{ habit.name }}</p>
                  <div class="ctg-bar-container">
                    <div
                      class="ctg-bar"
                      :style="{ width: habit.habit_progress * 100 + '%' }"
                    />
                  </div>
                </div>
            </div>
            <!-- <button
                  type="button"
                  :style="{ minWidth: 100 }"
                  class="btn btn-outline-light btn-sm"
                  data-toggle="modal"
                  data-target="#categoryModal"
                  id="edit-category-button"
                  v-on:click="setCurrentCategory(categoryIndex)"
                >
              Edit Category
            </button> -->
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
  </div>
</template>

<style>
.special-feature .s-feature-box {
  margin: 1em;
  box-shadow: 0px 20px 30px 0 rgba(0, 101, 20, 0.16),
    0 5px 5px 0 rgba(0, 0, 0, 0.15);
  text-align: center;
  height: 80vh;
  border-radius: 20px;
}

.s-feature-box h1 {
  padding-bottom: 0.5em;
}

.s-feature-box .mask-bottom p {
  text-align: left;
  margin-left: 0;
  margin-bottom: 5px;
  padding-top: 1em 0 0 0;
  font-size: 1em;
}

.categories .card {
  margin: 1em;
  box-shadow: 0px 20px 30px 0 rgba(0, 101, 20, 0.16),
    0 5px 5px 0 rgba(0, 0, 0, 0.15);
  text-align: center;
  height: 80vh;
  border-radius: 20px;
}

.card h1 {
  padding-bottom: 0.5em;
}

.card p {
  text-align: left;
  margin-left: 0;
  margin-bottom: 5px;
  padding-top: 1em 0 0 0;
  font-size: 1em;
  line-height: 2em;
}
.special-feature .s-feature-box p {
  text-align: left;
  margin-left: 0;
  margin-bottom: 5px;
  padding-top: 1em 0 0 0;
  font-size: 1em;
}

.special-feature .s-feature-box p,
.special-feature .s-feature-box h4,
.special-feature .s-feature-box a,
.special-feature .s-feature-box h1 {
  color: white;
}

.card p,
.card h4,
.card a,
.card h1 {
  color: white;
}

.category-title {
  font-weight: bold;
  font-size: 1.5em;
  margin: 10px;
  padding: 1.5em, 0, 1.5em, 0;
  word-wrap: normal;
}

.category-icon {
  fill: rgb(255, 255, 255);
  width: 10vh;
  height: 10vh;
}

.ctg-bar-container {
  text-align: center;
  width: 6vm;
  height: 3px;
  margin: 0 15px 15px 15px;
  background-color: rgba(255, 255, 255, 0.571);
}
.ctg-bar {
  background-color: rgb(255, 255, 255);
  height: 100%;
  width: 0%;
}

circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
#edit-category-button {
  margin: 15px;
  padding: 5px, 10px, 10px, 10px;
}
</style>

<script>
import axios from "axios";
import ProgressRing from "../components/ProgressRing.vue";
import InlineSvg from "vue-inline-svg";
export default {
  components: {
    ProgressRing,
    InlineSvg,
  },
  data: function () {
    return {
      categories: [],
      currentCategory: {},
      errors: [],
      categoryProgress: "",
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
      var formData = new FormData();
      formData.append("name", this.currentCategory.name);
      formData.append("statement", this.currentCategory.statement);
      formData.append("image_file", this.currentCategory.image);
      // formData.append("color", this.currentCategory.color);
      axios
        .patch(`/api/categories/${this.currentCategory.id}`, formData)
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
    setFile: function () {
      if (event.target.files.length > 0) {
        this.currentCategory.image = event.target.files[0];
      }
    },
  },
};
</script>
