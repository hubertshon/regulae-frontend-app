<template>
  <div class="category-show">
    <h2>{{ category.name }}</h2>
    <h5>{{ category.statement }}</h5>
    <p>{{ category.image_url }}</p>

    <div class="container">
      <div v-for="(habit, habitIndex) in category.habits" class="category-habits">
        <button type="button" class="btn btn-link  btn-lg" v-on:click="setCurrentHabit(habitIndex)">{{ habit.name }}</button>
      </div>
      <div class="current-habit">
        <p>Progress: {{ (currentHabit.habit_progress) * 100 }} %</p>
        <p>Notes: {{ currentHabit.notes }}</p>
        <p>Frequency: {{ currentHabit.frequency }} times </p>
        <p>Total: {{ currentHabit.total }}</p>
        <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#habitModal">
        Edit Habit
      </button>
      </div>
    </div>

        <!--Habit Modal -->
    <div class="modal fade" id="habitModal" tabindex="-1" role="dialog" aria-labelledby="habitModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="habitModalLabel">{{currentHabit.name}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" >
            <p>Habit Name: </p>
            <p>Notes: </p>
            <p>Frequency: </p>
            <p>Factor: </p>
            <p>Duration: </p>
            <p>Complete By: </p>
            <p>Category: </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" v-on:click="deleteCurrentHabit()" data-dismiss="modal">Delete Habit</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Save Changes</button>
            <button type="button" class="btn btn-primary">Close</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style>
.habit-title {
  font-weight: bold;
}

.container {
  margin-top: 10%;
}
.category-habits {
  margin-top: 5%;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      category: [],
      currentHabit: {},
    };
  },
  created: function () {
    axios.get(`/api/categories/${this.$route.params.id}`).then((response) => {
      console.log("Categories: ", response.data);
      this.category = response.data;
      this.currentHabit = this.category.habits[0];
    });
  },
  methods: {
    // habitTranslate: function () {
    //   if (this.category.habit.factor === 4) {
    //     return "Week";
    //   } else if (this.category.habit.factor === 28) {
    //     return "Day";
    //   } else if (this.category.habit.factor === 1) {
    //     return "Month";
    //   }
    // },
    setCurrentHabit: function (index) {
      this.currentHabit = this.category.habits[index];
    },
    deleteCurrentHabit: function () {
      axios.delete(`/api/habits/${this.currentHabit.id}`);
      this.$router.go(`/categories/${this.category.id}`);
    },
  },
};
</script>