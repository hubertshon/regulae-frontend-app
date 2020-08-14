<template>
  
  <div class="categoriesindex">
    <div class="container">

      <div class="categories">

        <div class="row special-feature">
          <div class="col-lg-4 margin20 wow animated zoomIn" data-wow-duration=".5s" data-wow-delay=".2s" v-for="(category, categoryIndex) in categories">
            <!--Edit Button-->
            <div  class="s-feature-box text-center"  :style="{ backgroundColor: category.color }">
              <i class="icon-Pen-5" type="button" data-toggle="modal"
                data-target="#categoryModal"
                v-on:click="setCurrentCategory(categoryIndex)"> 
              </i>

              <a :href="`/categories/${category.id}`">
                <div class="mask-top">
                  <!-- Progress -->
                    <progress-ring
                      :progress="getCategoryProgress(category)"
                    >
                      </progress-ring>
                      <h4>{{ getCategoryProgress(category) }}%</h4>
                    

                  <!-- Title -->
                  <h1 class="category-name">
                      {{ category.name }}</h1>
                </div>
                <!--HOVER EFFECT-->
                <div class="mask-bottom">
                  <inline-svg :src="category.image_url" class="category-icon" />
                  <h2 class="statement" style="color: white;">{{category.statement}}</h2>
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
              </a>
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
                  Image :
                  <inline-svg :src="currentCategory.image_url" class="category-icon" style="fill: slategray;" /><br>
                  Upload New Image File:
                  <input
                    type="file"
                    id="file-input"
                    class="form-control"
                    v-on:change="setFile($event)"
                    ref="fileInput"
                  />

                  <p class="text-danger" v-for="error in errors">{{ error }}</p>

                  <div class="form-group">
                    <label for="colorSelect">Color:</label>
                    <select class="form-control" id="colors" v-model="currentCategory.color">
                      <option value="#54A3C8">"Maximum Blue"</option>
                      <option value="#384E77">"Y In Mn Blue"</option>
                      <option value="#DE6F4C">"Burnt Sienna (Red)"</option>
                      <option value="#EC5667">"Fiery Rose (Red)"</option>
                      <option value="#F09012">"Carrot Orange"</option>
                      <option value="#65B96E">"Bud Green"</option>
                      <option value="#F3D268">"Orange Yellow Crayola"</option>
                      <option value="#B16AB2">"Pearly Purple"</option>
                      <option value="#626262">"Dim Gray"</option>
                    </select>
                  </div>
                  <div class="modal-messages">
                  <p>{{message}}</p>
                  <p v-for="error in errors">{{error}}</p>
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

                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>

                  <input
                    type="submit"
                    class="btn btn-success"
                    value="Save Changes"
                  />
                </div>
              </form>
            </div>
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
  height: 560px;
  border-radius: 20px;
}

.special-feature .s-feature-box:hover {
  box-shadow: 7px 35px 50px 0 rgba(0, 101, 20, 0.35),
    0 20px 20px 0 rgba(0, 0, 0, 0.25);
  transition: 0.5s;
  transition-timing-function: ease-out;
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
.special-feature .s-feature-box h1,
.special-feature .s-feature-box h3 {
  color: white;
}

.s-feature-box h4 {
  font-size: 1.3em;
}

.s-feature-box .icon-Pen-5 {
  color: white;
  line-height: 10px;
  padding: 10px;
  font-size: 2.5em;
  text-align: left;
  opacity: 0.4;
  bottom: 15px;
  position: absolute;

  right: 5px;
  z-index: 1;
}

.s-feature-box .icon-Pen-5:hover {
  opacity: 1;
}

.category-name {
  font-weight: bold;
  margin: 10px;
  padding: 1.5em, 0, 1.5em, 0;
  word-wrap: normal;
}

.statement {
  margin-top: 1.5em;
}

.category-icon {
  fill: rgb(255, 255, 255);
  width: 10vw !important;
  height: 10vh !important;
  margin: 5vm 5vm 5vm 8vm;
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

.modal-dialog p {
  overflow-wrap: break-word;
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
      newCategoryImage: "",
      errors: [],
      categoryProgress: "",
      catgCongrats: "",
      message: "",
    };
  },
  created: function () {
    axios.get("/api/categories").then((response) => {
      console.log("Categories: ", response.data);
      this.categories = response.data;
    });
  },
  mounted: function () {},

  methods: {
    editCurrentCategory: function () {
      var formData = new FormData();
      formData.append("name", this.currentCategory.name);
      formData.append("statement", this.currentCategory.statement);
      formData.append("color", this.currentCategory.color);
      if (this.newCategoryImage !== "") {
        formData.append("image_file", this.newCategoryImage);
      }
      axios
        .patch(`/api/categories/${this.currentCategory.id}`, formData)
        .then((response) => {
          console.log("Category Edited", response.data);
          this.message = "Changes Saved!";
        })
        .catch((error) => {
          this.message = "Errors!";
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
        this.newCategoryImage = event.target.files[0];
      }
    },
  },
};
</script>
