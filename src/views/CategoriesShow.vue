<template>
  <div class="category-show">
    <h2>{{ category.name }}</h2>
    <h5>{{ category.statement }}</h5>
    <p>{{ category.image_url }}</p>

    <div class="container">
      <div v-for="(habit, habitIndex) in category.habits" class="category-habits">
        <button class="habit-title" v-on:click="setCurrentHabit(habitIndex)">{{ habit.name }}</button>
      </div>
      <div class="current-habit">
        <p>Progress: {{ (currentHabit.habit_progress) * 100 }} %</p>
        <p>Notes: {{ currentHabit.notes }}</p>
        <p>Frequency: {{ currentHabit.frequency }} times </p>
        <p>Total: {{ currentHabit.total }}</p>
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
  },
};
</script>