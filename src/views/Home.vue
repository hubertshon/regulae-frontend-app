<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>Upcoming Habits</h2>
    <div class="upcoming-habits" v-for="habit in upcomingHabits">
      <li>{{ habit }}</li>
    </div>

  </div>
</template>

<style>
h1 {
  font-size: 3em;
}

circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>

<script>
import axios from "axios";

export default {
  components: {},
  data: function () {
    return {
      message: "Regulae",
      habits: [],
      upcomingHabits: [],
    };
  },
  created: function () {
    axios.get("/api/habits").then((response) => {
      this.habits = response.data;
      console.log("Habits", response.data);
      var today = new Date();
      var recentCompletes = [];
      const oneDay = 24 * 60 * 60 * 1000;
      console.log(this.habits[0].completes[0]);
      for (var i = 0; i < this.habits.length; i++) {
        if (this.habits[i].factor === 28) {
          for (var c = 0; c < this.habits[i].completes.length; c++) {
            var habitDate = Date.parse(this.habits[i].completes[c].date);
            var dateDifference = Math.floor((today - habitDate) / oneDay);
            if (dateDifference < 7) {
              recentCompletes.push(this.habits[i].completes[c]);
            }
          }
          if (recentCompletes.length < this.habits[i].frequency * 7) {
            this.upcomingHabits.push(this.habits[i].name);
          }
        } else if (this.habits[i].factor === 4) {
          for (var d = 0; d < this.habits[i].completes.length; d++) {
            habitDate = Date.parse(this.habits[i].completes[d].date);
            dateDifference = Math.floor((today - habitDate) / oneDay);
            if (dateDifference < 7) {
              recentCompletes.push(this.habits[i].completes[d]);
            }
          }
          if (recentCompletes.length < this.habits[i].frequency) {
            this.upcomingHabits.push(this.habits[i].name);
          }
        } else if (this.habits[i].factor === 1) {
          for (var m = 0; m < this.habits[i].completes.length; m++) {
            habitDate = Date.parse(this.habits[i].completes[m].date);
            dateDifference = Math.floor((today - habitDate) / oneDay);
            if (dateDifference < 28) {
              recentCompletes.push(this.habits[i].completes[m]);
            }
          }
          if (recentCompletes.length < this.habits[i].frequency) {
            this.upcomingHabits.push(this.habits[i].name);
          }
        }
      }
      console.log("Upcoming Habits", this.upcomingHabits);
    });
  },
  mounted: function () {},

  methods: {},
};
</script>
