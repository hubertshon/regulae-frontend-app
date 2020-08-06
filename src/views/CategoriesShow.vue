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
              >
              </button>
              <button
                type="button"
                class="icon-Bulleted-List"
                id="edit-habit"
                data-toggle="modal"
                data-target="#habitModal"
              >
              </button>
              
              <button
                class="icon-Arrow-UpinCircle"
                type="button"
                id="add-complete"
                v-on:click="addComplete()"
              >
              </button>
            </div>
                  <div class="bar-container">
                    <div
                    class="bar"
                    :style="{ width: currentHabit.habit_progress * 100 + '%' }"
                    />
                  </div>
                </div>
                            <h5 v-show="currentHabit.habit_progress === 1">{{ completeMessage }}</h5>
              <h4>Progress: {{ getHabitProgress(currentHabit.habit_progress) }}%</h4>
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
                Completes: {{ currentHabit.completes.length }} / {{ currentHabit.total }}
              </p>
              <p>Date Started: {{ currentHabit.created_at }}</p> 
              <p v-if="currentHabit.notes">Notes: {{ currentHabit.notes }}</p>
            </div>
          </div>
            <div class="col-sm">
            <h3 id="habits-header">HABITS</h3>
            <div v-for="(habit, habitIndex) in category.habits"
            class="category-habits">
              <p
              v-on:click="setCurrentHabit(habitIndex)">
              {{ habit.name }}
              </p>
            </div>
          </div>
          <div class="col-sm">
            <upcoming-habits :currentHabit="this.currentHabit"></upcoming-habits>
          </div>
        </div>
        <div>
          <!--Edit Habit Modal -->


        </div>

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
                  <p>{{this.saveMessage = "Changes Saved!"}}</p>
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
        
          <!--Congrats Modal-->
        <!-- <div class="modal fade" tabindex="-1" role="dialog" id="habitCongratsModal" aria-labelledby="habitCongratsModalLabel" aria-hidden="true">
          <div class="modal-dialog"> 

            <div class="modal-content">
              <h5 class="modal-title" id="exampleModalLongTitle">Habit Complete!</h5>
              <p>Congratulations! You've completed a habit!</p>
              <i class="icon-Medal-3" style="color:green"></i>
              <button type="button" class="btn btn-success" data-dismiss="modal" aria-label="Close">OK</button>
              <span aria-hidden="true">&times;</span>
            </div> 
          </div>
        </div> -->
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

.category-show .container {
  margin: 15rem auto;
}

#second-row {
  height: 6rem;
}

/* #first-row {
} */

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

/* #habit-container {
  margin: 0 auto 0 auto;
} */

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

/* #modal-dialog {
  height: 15vh;
  width: 15vw;
}
#habitCongratsModal p {
  font-size: 2em;
  margin: auto;
  text-align: center;
}

#habitCongratsModal i {
  font-size: 8em;
  text-align: center;
} */
</style>

<script>
import axios from "axios";
import InlineSvg from "vue-inline-svg";
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
      this.currentHabit = this.category.habits[index];
      this.currentHabit.created_at = this.category.habits[index].created_at;
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
      return Math.round(progress * 100);
    },
  },
};
</script>



