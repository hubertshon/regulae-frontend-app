<template>
  <div class="category-show">
    <div class="container">
      <!--Category Info-->
      <div class="row" id="first-row">
        <h2 class="display-2">{{ category.name }}</h2>
      </div>

      <div class="row" id="second-row">
        <blockquote class="blockquote">{{ category.statement }}</blockquote>
      </div>

      <div class="row">
        <div class="habit-container">
          <p>{{ noHabitMessage }}</p>
          <div v-show="currentHabit.id > 0" class="current-habit">
            <div class="button-container">
              <h1>{{ currentHabit.name }}</h1>

              <button
                class="icon-Arrow-DowninCircle"
                type="button"
                id="remove-complete"
                v-on:click="removeComplete()"
              ></button>
              <button
                type="button"
                class="icon-Bulleted-List"
                id="edit-habit"
                data-toggle="modal"
                data-target="#habitModal"
              ></button>

              <button
                class="icon-Arrow-UpinCircle"
                type="button"
                id="add-complete"
                v-on:click="addComplete()"
              ></button>
            </div>

            <div class="bar-container">
              <div
                class="bar"
                :style="{
                  width: getHabitProgress(currentHabit.habit_progress) + '%',
                }"
              />
            </div>
          </div>

          <h5 v-show="currentHabit.habit_progress === 1">
            {{ completeMessage }}
          </h5>
          <h4>
            Progress: {{ getHabitProgress(currentHabit.habit_progress) }}%
          </h4>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <div class="habit-data">
            <h3>DETAILS</h3>
            <p>
              Frequency: {{ currentHabit.frequency }} time(s) /
              {{ habitTranslate(currentHabit.factor) }}
            </p>
            <p>
              Completes: {{ currentHabit.completes.length }} /
              {{ currentHabit.total }}
            </p>
            <p>
              Date Started:
              {{ currentHabit.created_at | moment("MMMM Do YYYY, h:mm a") }}
            </p>
            <p v-if="currentHabit.notes">Notes: {{ currentHabit.notes }}</p>
            <p v-if="currentLastComplete">
              Last Complete: {{ currentLastComplete }}
            </p>
          </div>
        </div>

        <div class="col-sm">
          <h3 id="habits-header">HABITS</h3>
          <div
            v-for="(habit, habitIndex) in category.habits"
            class="category-habits"
          >
            <p v-on:click="setCurrentHabit(habitIndex)">
              {{ habit.name }}
            </p>
          </div>
        </div>

        <div class="col-sm">
          <upcoming-habits :currentHabit="this.currentHabit"></upcoming-habits>
        </div>
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
                <p>{{ saveMessage }}</p>
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

      <!--Habit Congrats Modal-->
      <div
        class="modal fade"
        id="habitCongratsModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="habitCongratsModal"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <h2 class="display-4">Congratulations!</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.931 10.245l2.021-2.042-2.778-.403-1.223-2.653-1.222 2.653-2.778.402 2.021 2.042-.492 2.903 2.471-1.391 2.472 1.391-.492-2.902zm-9.481 4.518c-.866-1.382-1.374-3.012-1.374-4.763 0-4.971 4.029-9 9-9s9 4.029 9 9c0 1.792-.53 3.458-1.433 4.861-.607-.31-1.228-.585-1.862-.819.812-1.143 1.295-2.536 1.295-4.042 0-3.86-3.141-7-7-7s-7 3.14-7 7c0 1.476.462 2.844 1.244 3.974-.636.225-1.26.488-1.87.789zm15.307 2.45l-2.334 3.322c-1.603-.924-3.448-1.464-5.423-1.473-1.975.009-3.82.549-5.423 1.473l-2.334-3.322c2.266-1.386 4.912-2.202 7.757-2.211 2.845.009 5.491.825 7.757 2.211zm4.243 2.787h-2.359l-.566 3c-.613-1.012-1.388-1.912-2.277-2.68l2.343-3.335c1.088.879 2.052 1.848 2.859 3.015zm-21.14-3.015l2.343 3.335c-.89.769-1.664 1.668-2.277 2.68l-.566-3h-2.36c.807-1.167 1.771-2.136 2.86-3.015z"
              />
            </svg>
            <h3>You have completed a habit!</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.category-show .container {
  margin: 15rem auto;
}

#second-row {
  height: 6rem;
}

.category-show .col-lg {
  margin-left: 0;
  padding-left: 0;
}
.category-show .bar-container {
  text-align: center;
  width: 1000px;
  height: 7px;
  margin: 5px 0 0 0;
  background-color: rgb(233, 233, 233);
}

.category-show h4 {
  margin-top: 1em;
  margin-bottom: 1.5em;
}

.category-show .display-2 {
  font-weight: 400;
  color: #65b96e;
}
.category-show blockquote {
  font-size: 2em;
  margin-left: 0px;
}
.category-show h1 {
  font-weight: 600;
}
.category-show p {
  font-size: 1em;
  text-transform: uppercase;
  font-weight: 500;
}

.habit-data h3 {
  font-weight: 500;
}
.habit-data p {
  /* margin-top: 2.5em; */
  font-weight: 500;
  color: #466365;
}

#habits-header {
  font-weight: 500;
}

.category-show .col-md-4 {
  padding-left: 0;
}

.bar {
  background-color: #e6af2e;
  height: 100%;
  width: 0%;
  transition: 0.3s ease-in-out;
}

#category-heading {
  margin: 0;
}

.category-show .i {
  fill: rgb(89, 89, 89);
  width: 10vw;
  height: 10vh;
  line-height: 20px;
  font-size: 20px;
}

#habit-selector {
  margin-left: 0;
  padding-left: 0;
}

#habit-selector {
  font-weight: 400;
}

.category-habits {
  margin-left: 0;
  padding-left: 0;
  cursor: pointer;
}

.category-habits p {
  margin-left: 0;
  padding-left: 0;
  font-weight: 700;
  cursor: pointer;
  font-size: 1em;
  line-height: 2.1em;
  color: #9999a1;
}

.category-habits p:hover {
  color: rgb(57, 189, 77);
}

.habit-container h1 {
  margin-bottom: 0px;
  position: absolute;
  padding-bottom: 0px;
}

.habit-container button {
  background: none;
  margin: 1em, auto, 1em auto;
  text-align: bottom;
  line-height: 20px;
  padding: 30px;
  border: none;
  font-size: 3rem;
  color: darkslategray;
  z-index: 1;
  cursor: pointer;
}

.button-container {
  align-items: center;
  text-align: right;
  margin-right: 0px;
}

.button-container h1 {
  position: absolute;
  margin-bottom: 1px;
  font-weight: 700;
}

.habit-container #add-complete:hover {
  color: rgb(40, 208, 65);
}

.habit-container button:hover {
  color: rgb(115, 141, 208);
  translate: 10px;
  transform: scale(1.5, 1.5);
  transition: 0.4s;
}

.habit-container .icon-Arrow-Down:hover {
  color: rgb(222, 118, 118);
  translate: 10px;
  transform: scale(1.5, 1.5);
}

#habitCongratsModal .modal-content {
  height: 60vh;
  width: 40vw;
}
#habitCongratsModal .display-4 {
  padding: 10px;
  font-size: 3.5em;
  margin: auto;
  text-align: center;
}
#habitCongratsModal h3 {
  padding: 20px;
  margin: auto;
  text-align: center;
  font-weight: 200;
}

#habitCongratsModal svg {
  width: 200px;
  height: 200px;
  font-size: 8em;
  margin: auto;
  fill: rgb(116, 199, 104);
}
</style>

<script>
import axios from "axios";
import InlineSvg from "vue-inline-svg";
import * as moment from "moment/moment";
import UpcomingHabits from "../components/UpcomingHabits.vue";
export default {
  components: {
    InlineSvg,
    UpcomingHabits,
  },
  data: function () {
    return {
      category: [],
      categories: [],
      currentHabit: {},
      habits: [],
      errors: [],
      durationOrDate: 1,
      noHabitMessage: "",
      completeMessage: "Habit Completed!",
      saveMessage: "",
      currentLastComplete: "",
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
        console.log("Category: ", response.data);
        this.category = response.data;
        this.currentHabit = this.category.habits[0];
        this.currentLastComplete = this.lastItem(
          this.category.habits[0].completes
        ).created_at;
      })
      .catch((error) => {
        this.errors = error.response.data.errors;
      });

    axios.get("/api/habits").then((response) => {
      this.habits = response.data;
      console.log("Habits", response.data);
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
      this.currentLastComplete = "";
      this.currentHabit = this.category.habits[index];
      this.currentHabit.created_at = this.category.habits[index].created_at;
      this.currentLastComplete = this.lastItem(
        this.category.habits[index].completes
      ).created_at;
      var today = new Date();
      console.log(this.currentLastComplete);
      console.log(this.currentHabit);
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
          this.saveMessage = "Changes Saved!";
        })
        .catch((response) => (error) => {
          this.errors = error.response.data.errors;
        });
    },
    deleteCurrentHabit: function () {
      axios.delete(`/api/habits/${this.currentHabit.id}`);
      this.$forceUpdate(this.categories); // add refreshmethod
    },

    addComplete: function () {
      var params = {
        habit_id: this.currentHabit.id,
      };
      axios.post("/api/completes", params).then((response) => {
        console.log("Complete Added", response.data);
        this.currentHabit.habit_progress = response.data.habit_progress;
        this.currentHabit.completes = response.data.completes;
        if (response.data.habit_progress >= 1) {
          console.log("YES");
          $("#habitCongratsModal").modal("show");
        }
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
      if (progress > 1) {
        var result = 1;
      } else {
        result = progress;
      }
      return Math.round(result * 100);
    },
    lastItem: function (array) {
      return array[array.length - 1];
    },
  },
};
</script>
