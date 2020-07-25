<template>
  <div class="habit">
    <h3>{{ habit.name }}</h3>
    <h5>{{ habit.notes }}</h5>
    <p>Frequency: {{ habit.frequency }}</p>
    <p>Per {{ habit.factor }}</p>
    <p>{{ habit.duration }} months</p>
    <p>Complete By:{{ habit.complete_by }}</p>
    <p>Category: {{ habit.category }}</p>
    <p>Progress: {{ habit.habit_progress }}</p>

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
      habit: [],
      category: "",
    };
  },
  created: function () {
    axios.get(`/api/habits/${this.$route.params.id}`).then((response) => {
      console.log("Habit: ", response.data);
      this.habit = response.data;
    });
  },
  methods: {
    habitTranslate: function () {
      if (this.category.habit.factor === 4) {
        return "Week";
      } else if (this.category.habit.factor === 28) {
        return "Day";
      } else if (this.category.habit.factor === 1) {
        return "Month";
      }
    },
  },
};
</script>