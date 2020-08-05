<template>
  <div class="category-show">
    <div class="container">
      <!--Category Info-->
      <div class="row">
        <div class="mb40">
        <inline-svg :src="category.image_url" class="icon" />
        </div>
        <div class="col-lg">
        <h2 class="display-4">{{ category.name }}</h2>
        <blockquote class="blockquote">{{ category.statement }}</blockquote>
        </div>
      </div>
      <p>{{ noHabitMessage }}</p>
      <div class="row">
        <div class="mb40" id="habit-selector">
          <div v-for="(habit, habitIndex) in category.habits"
            class="category-habits">
            <button
              type="button"
              class="btn btn-link  btn-lg"
              v-on:click="setCurrentHabit(habitIndex)">
              {{ habit.name }}
            </button>
          </div>
        </div>

        <div class="col-lg">
          
          <!-- Habit Info -->
          <div class="habit-container">
            <div v-show="currentHabit.id > 0" class="current-habit">
              <!-- Progress Bar  -->

              <!-- Habit Details -->
              <h5 v-show="currentHabit.habit_progress === 1">
                {{ completeMessage }}
              </h5>
              <h3>{{ currentHabit.name }}</h3>
              <h4>Progress: {{ getHabitProgress(currentHabit.habit_progress) }}%</h4>

              <div class="bar-container">
                <div
                  class="bar"
                  :style="{ width: currentHabit.habit_progress * 100 + '%' }"
                />
              </div>
              </div>
              
              <p>
                Frequency: {{ currentHabit.frequency }} time(s) /
                {{ habitTranslate(currentHabit.factor) }}
              </p>
              <p>
                Completes: {{ currentHabit.completes.length }} / {{ currentHabit.total }}
              </p>
              <p>Date Started: {{ currentHabit.created_at }}</p> 
              <p v-if="currentHabit.notes">Notes: {{ currentHabit.notes }}</p>
              <button
                type="button"
                class="btn btn-secondary"
                data-toggle="modal"
                data-target="#habitModal"
              >
                Edit Habit
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary btn"
                v-on:click="removeComplete()"
              >
                -
              </button>
              <button
                type="button"
                class="btn btn-success btn"
                v-on:click="addComplete()"
              >
                +
              </button>
            
          </div>
          <!--Habit Index-->

        </div>

        <!--Edit Habit Modal -->
        <div
          class="modal fade"
          id="habitModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="habitModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="habitModalLabel">
                  {{ currentHabit.name }}
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

              <form v-on:submit.prevent="editCurrentHabit()" class="edit-habit">
                <div class="modal-body">
                  Name:<input
                    type="text"
                    class="form-control"
                    v-model="currentHabit.name"
                    required
                  />
                  Notes:<input
                    type="text"
                    class="form-control"
                    v-model="currentHabit.notes"
                    required
                  />
                  Frequency:<input
                    type="number"
                    class="form-control"
                    v-model="currentHabit.frequency"
                    required
                  />
                  <label for="factorSelect">Factor:</label>
                  <select
                    class="form-control"
                    id="factorSelect"
                    v-model="currentHabit.factor"
                    required
                  >
                    <option v-bind:value="28">per Day</option>
                    <option v-bind:value="4">per Week</option>
                    <option v-bind:value="1">per Month</option>
                  </select>

                  <!--Duration or Complete By: Date -->
                  <div class="form-group">
                    <div class="form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="1"
                        v-model="durationOrDate"
                      />
                      <label class="form-check-label" for="inlineRadio1"
                        >Number of Months</label
                      >
                    </div>
                    <div class="form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="2"
                        v-model="durationOrDate"
                      />
                      <label class="form-check-label" for="inlineRadio2"
                        >Complete By Date</label
                      >
                    </div>
                    <div class="form-group">
                      Duration:<input
                        type="text"
                        v-model="currentHabit.duration"
                        :disabled="durationOrDate == 2"
                      />
                      Complete By:<input
                        type="date"
                        v-model="currentHabit.complete_by"
                        :disabled="durationOrDate == 1"
                      />
                    </div>
                  </div>

                  <!-- Category Select -->
                  <div class="form-group">
                    <label for="categorySelect">Category:</label>
                    <select
                      class="form-control"
                      id="categorySelect"
                      v-model="currentHabit.category_id"
                      required
                    >
                      <option
                        v-for="category in categories"
                        v-bind:value="category.id"
                        >{{ category.name }}</option
                      >
                    </select>
                  </div>
                  <p v-for="error in errors">{{ error }}</p>
                </div>

                <!-- Buttons -->
                <div class="modal-footer">
                  <button
                    type="button"
                    style="color:red"
                    class="btn btn-link"
                    v-on:click="deleteCurrentHabit()"
                    data-dismiss="modal"
                  >
                    Delete Habit
                  </button>
                  <input
                    type="submit"
                    class="btn btn-success"
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
  </div>
</template>

<style>
/* .habit-title {
  font-weight: bold;
} */

/* .category-show .container {
} */
.category-show .container {
  margin-left: 17vmax;
}
.category-show .habit-container .bar-container {
  text-align: center;
  width: 250px;
  height: 5px;
  margin: 40px 0 0 0;
  background-color: lightgray;
}

.bar {
  background-color: rgb(36, 177, 57);
  height: 100%;
  width: 0%;
}

.category-show .habit-container {
  margin: 40px;
}

.icon {
  fill: rgb(89, 89, 89);
  width: 10vw;
  height: 10vh;
}

#habit-selector .btn {
  margin-left: 0;
  padding-left: 0;
}
</style>

<script>
import axios from "axios";
import InlineSvg from "vue-inline-svg";
export default {
  components: {
    InlineSvg,
  },
  data: function () {
    return {
      category: [],
      categories: [],
      currentHabit: {},
      errors: [],
      durationOrDate: 1,
      noHabitMessage: "",
      completeMessage: "Habit Completed!",
    };
  },
  created: function () {},
  mounted: function () {
    axios.get(`/api/categories`).then((response) => {
      this.categories = response.data;
    });
    axios
      .get(`/api/categories/${this.$route.params.id}`)
      .then((response) => {
        console.log("Categories: ", response.data);
        this.category = response.data;
        this.currentHabit = this.category.habits[0];
      })
      .catch((error) => {
        this.errors = error.response.data.errors;
      });
  },
  methods: {
    habitTranslate: function (hFactor) {
      if (hFactor === 4) {
        return "Week";
      } else if (hFactor === 28) {
        return "Day";
      } else if (hFactor === 1) {
        return "Month";
      }
    },

    setCurrentHabit: function (index) {
      this.currentHabit = this.category.habits[index];
    },
    editCurrentHabit: function () {
      var params = {
        name: this.currentHabit.name,
        notes: this.currentHabit.notes,
        statement: this.currentHabit.statement,
        frequency: this.currentHabit.frequency,
        factor: this.currentHabit.factor,
        duration: this.currentHabit.duration,
        complete_by: this.currentHabit.complete_by,
      };
      if (this.durationOrDate == 1) {
        params["complete_by"] = 0;
      } else if (this.durationOrDate == 2) {
        params["duration"] = 0;
      }
      axios
        .patch(`/api/habits/${this.currentHabit.id}`, params)
        .then((response) => {
          console.log("Habit Saved", response.data);
          this.currentHabit = response.data;
        })
        .catch((response) => (error) => {
          this.errors = error.response.data.errors;
        });
    },
    deleteCurrentHabit: function () {
      axios.delete(`/api/habits/${this.currentHabit.id}`);
      this.$forceUpdate(this.categories);
    },

    addComplete: function () {
      var params = {
        habit_id: this.currentHabit.id,
      };
      axios.post("/api/completes", params).then((response) => {
        console.log("Complete Added", response.data);
        this.currentHabit.habit_progress = response.data.habit_progress;
        this.currentHabit.completes = response.data.completes;
      });
    },

    removeComplete: function () {
      var params = {
        habit_id: this.currentHabit.id,
      };
      axios
        .delete(`/api/completes/${this.currentHabit.id}`)
        .then((response) => {
          console.log("Complete Removed");
          this.currentHabit.habit_progress = response.data.habit_progress;
          this.currentHabit.completes = response.data.completes;
        });
    },
    getHabitProgress: function (progress) {
      return Math.round(progress * 100);
    },
  },
};
</script>
