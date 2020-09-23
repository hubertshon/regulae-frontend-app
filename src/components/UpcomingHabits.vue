<template>
  <div class="uphabits">
    <h3>UPCOMING</h3>
    <div class="uphabits" v-for="index in upcomingHabits">
      <a
        :href="`/categories/${index.habit.category_id}`"     >{{ index.habit.name }} ({{ index.completesLeft }})
      </a>
    </div>
  </div>
</template>

<style>
.uphabits h3 {
  font-weight: 500;
}

.uphabits a {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.8;
  line-height: 3.2em;
  color: #9999a1;
}

.uphabits a:hover {
  color: rgb(57, 189, 77);
}
</style>

<script>
import axios from "axios";

export default {
  name: "upcoming-habits",
  props: {
    currentHabit: {},
    upcomingHabit: {},
  },
  data: function () {
    return {
      message: "Regulae",
      habits: [],
      upcomingHabits: [],
    };
  },
  created: function () {},
  mounted: function () {
    axios.get("/api/habits").then((response) => {
      this.habits = response.data;
      console.log("Habits", response.data);
      this.upcomingHabitsRender(response.data);
    });
  },

  methods: {
    addComplete: function (habitId) {
      var params = {
        habit_id: habitId,
      };
      axios.post("/api/completes", params).then((response) => {
        console.log("Complete Added", response.data);
        this.upcomingHabitsRender(response.data);
      });
    },
    upcomingHabitsRender: function (habits) {
      console.log("Running");
      var today = new Date();
      var recentCompletes = [];
      this.upcomingHabits = [];
      const oneDay = 24 * 60 * 60 * 1000;
      for (var i = 0; i < habits.length; i++) {
        if (habits[i].factor === 28) {
          for (var c = 0; c < habits[i].completes.length; c++) {
            var habitDate = Date.parse(habits[i].completes[c].date);
            var dateDifference = Math.floor((today - habitDate) / oneDay);
            if (dateDifference < 7) {
              recentCompletes.push(habits[i].completes[c]);
            }
          }
          if (recentCompletes.length < habits[i].frequency * 7) {
            this.upcomingHabits.push({
              habit: habits[i],
              completesLeft: habits[i].frequency * 7 - recentCompletes.length,
            });
          }
          recentCompletes = [];
        } else if (habits[i].factor === 4) {
          for (var d = 0; d < habits[i].completes.length; d++) {
            habitDate = Date.parse(habits[i].completes[d].date);
            dateDifference = Math.floor((today - habitDate) / oneDay);
            if (dateDifference < 7) {
              recentCompletes.push(habits[i].completes[d]);
            }
          }
          if (recentCompletes.length < habits[i].frequency) {
            this.upcomingHabits.push({
              habit: habits[i],
              completesLeft: habits[i].frequency - recentCompletes.length,
            });
          }
          recentCompletes = [];
        } else if (habits[i].factor === 1) {
          for (var m = 0; m < habits[i].completes.length; m++) {
            habitDate = Date.parse(habits[i].completes[m].date);
            dateDifference = Math.floor((today - habitDate) / oneDay);
            if (dateDifference < 28) {
              recentCompletes.push(habits[i].completes[m]);
            }
          }
          if (recentCompletes.length < habits[i].frequency) {
            this.upcomingHabits.push({
              habit: habits[i],
              completesLeft: habits[i].frequency - recentCompletes.length,
            });
          }
          recentCompletes = [];
        }
      }
      console.log("Upcoming Habits", this.upcomingHabits);
      return this.upcomingHabits;
    },
    findCategory: function () {
      this.$emit("findCategory", this.index);
    },
  },
};
</script>
